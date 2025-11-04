# Tavia - AI Agent Instructions

Tavia is a Next.js 15 café/restaurant booking platform built as a
**microservices-first monorepo** with a production-ready component library.

## 🎯 Project Overview

**Core Architecture:**

- **@tavia/taviad**: 60+ UI components (Emotion + Radix UI) - **PRIMARY for ALL
  web UI** ⭐
- **apps/backoffice**: Next.js 15 admin platform with Auth.js, Prisma, Docker
  PostgreSQL (port 3000)
- **apps/frontoffice**: Next.js 15 customer restaurant discovery (port 3003) -
  **shared database with backoffice**
- **apps/analytics**: Fastify 5 event tracking API (port 3001)
- **apps/restaurant-service**: NestJS 11 microservice with Swagger (port 3002)
- **Generator scripts**: Systematic scaffolding via `pnpm create:app`,
  `create:api`, `create:mobile`

**Tech Stack:**

- Next.js 15 (App Router) + React 19 | Node.js 22.17.1+ (`.nvmrc`: 18.18.0 for
  CI)
- Styling: 100% Emotion (NO SCSS) + Radix UI primitives
- Package Manager: pnpm v10.19.0+ (exact: 10.19.0+sha512) with **catalog
  dependencies**
- Build: Turborepo | Testing: Vitest (15-50 tests/component), Playwright
- Linting: ESLint 9 flat config (NOT .eslintrc) | Git: Husky + Commitizen

**Monorepo Structure:**

```
apps/
  ├── backoffice/           # Next.js 15 admin (port 3000) - ADMIN/OWNER roles only
  ├── frontoffice/          # Next.js 15 customer app (port 3003) - Shared DB with backoffice
  ├── analytics/            # Fastify API (port 3001)
  ├── restaurant-service/   # NestJS (port 3002)
  └── docs/                 # Storybook (port 6006)
packages/
  ├── taviad/               # @tavia/taviad - 60+ web components (Emotion + Radix) ⭐
  ├── mobile-ui/            # @tavia/mobile-ui - React Native components
  ├── analytics/            # @tavia/analytics SDK
  ├── module-generator/     # @tavia/module-generator - Feature module scaffolding
  ├── eslint-config/        # Shared ESLint 9 configs
  └── typescript-config/    # Shared tsconfig
templates/                  # For generators (webapp, simple-api, complex-api, mobile-app)
scripts/                    # create-app.js, create-api.js, create-mobile.js
pnpm-workspace.yaml         # ⚠️ CRITICAL - Catalog dependencies
turbo.json                  # Build pipeline config
```

## ⚠️ CRITICAL RULE: Always Use @tavia/taviad First

**BEFORE creating ANY UI component or using HTML elements, ALWAYS:**

1. ✅ **Check if @tavia/taviad has the component** - See "Available Components"
   section below
2. ✅ **Read the component's Props file** in
   `packages/taviad/src/ui/{component}/types/`
3. ✅ **Use ONLY the documented props** - Never add props that don't exist in
   the type definition
4. ❌ **DO NOT create custom styled components** if taviad has it
5. ❌ **DO NOT use native HTML** (`<button>`, `<input>`, `<a>`) - use taviad
   equivalents

**Examples:**

```tsx
// ❌ WRONG - Using native HTML
<button onClick={handleClick}>Click me</button>
<a href="/home">Home</a>
<input type="text" placeholder="Search" />

// ✅ CORRECT - Using @tavia/taviad
import { Button, Link, InputText } from '@tavia/taviad';

<Button onClick={handleClick}>Click me</Button>
<Link href="/home">Home</Link>
<InputText placeholder="Search" />
```

**Props Validation Workflow:**

```tsx
// 1. BEFORE using a component, read its props file:
// packages/taviad/src/ui/button/types/ButtonProps.ts

// 2. Check valid prop names and types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'dark' | 'link' | 'tertiary' | 'info';
  shape?: 'default' | 'rounded' | 'circle';
  onClick?: () => void;
  children?: React.ReactNode;
  // ... etc
}

// 3. Use ONLY these props
<Button variant="primary" onClick={handleClick}>Save</Button>

// ❌ WRONG - "outline" is NOT a valid variant
<Button variant="outline">Save</Button>

// ❌ WRONG - "label" prop doesn't exist
<ErrorState action={{ label: 'Retry', onClick: handleRetry }} />

// ✅ CORRECT - action expects React.ReactNode
<ErrorState action={<Button onClick={handleRetry}>Retry</Button>} />
```

## 🔥 Critical Patterns

### Pattern 0: Shared Database Architecture

**Frontoffice and backoffice share the SAME PostgreSQL database (`tavia`)**:

```
┌─────────────────┐
│  PostgreSQL DB  │
│   "tavia"       │  ← Single source of truth
│  Port: 5432     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼────┐ ┌──▼──────┐
│Backoffice│ │Frontoffice│
│Port 3000│ │Port 3003│
│ADMIN/    │ │USER role │
│OWNER     │ │only      │
└─────────┘ └─────────┘
```

**Critical implications:**

- ✅ Restaurant data managed in backoffice appears **instantly** in frontoffice
  (no sync)
- ✅ Prisma schema lives in **both** `apps/backoffice/prisma` and
  `apps/frontoffice/prisma` (must stay in sync)
- ✅ **Only ONE database container** runs - typically from backoffice
- ⚠️ Schema changes in backoffice? **Must copy to frontoffice**
  `prisma/schema.prisma`
- ⚠️ Migrations run from backoffice, frontoffice uses `prisma generate` only

**Database commands workflow:**

```bash
# 1. Start database (from backoffice)
cd apps/backoffice
pnpm docker:up

# 2. Migrate schema (from backoffice)
pnpm db:migrate

# 3. Sync frontoffice Prisma Client (from frontoffice)
cd apps/frontoffice
pnpm db:generate  # NOT migrate - just generate client
```

### Pattern 1: Next.js 15 Server Actions (Frontoffice)

**Frontoffice uses server actions** for type-safe database operations:

```typescript
// apps/frontoffice/src/actions/restaurant.actions.ts
'use server';

import prisma from '@/lib/prisma';

export async function searchRestaurantsAction(
  params: SearchRestaurantsParams
): Promise<SearchRestaurantsResponse> {
  const where = { isActive: true };

  const [restaurants, total] = await Promise.all([
    prisma.restaurant.findMany({ where, skip, take: limit }),
    prisma.restaurant.count({ where }),
  ]);

  return { restaurants, total, page, totalPages };
}
```

**Server actions live in `apps/frontoffice/src/actions/`** and are called from:

- React Query hooks (`src/hooks/`)
- Client components directly

**Pattern:**

1. ✅ Always add `'use server'` directive at top
2. ✅ Use `prisma` for database operations
3. ✅ Return plain objects (no functions, React nodes, etc.)
4. ✅ Handle errors with try/catch and throw meaningful errors
5. ✅ Use Prisma transactions for atomic operations
6. ✅ Return plain objects (no functions, React nodes, etc.)
7. ✅ Handle errors with try/catch and throw meaningful errors
8. ✅ Use Prisma transactions for atomic operations

### Pattern 2: Route-Based Layouts (Next.js 15 App Router)

**Use route groups for different layouts** - prevents Emotion hydration errors:

```
apps/{app}/src/app/
├── layout.tsx              # ⚠️ ROOT - Providers only, NO Emotion components
├── (auth)/                 # Route group - auth layout
│   ├── layout.tsx          # Can use Emotion styled components
│   └── login/page.tsx
├── (dashboard)/            # Route group - dashboard layout
│   ├── layout.tsx          # Header + Sidebar layout
│   ├── dashboard/page.tsx
│   └── restaurants/page.tsx
└── (public)/               # Route group - public layout
    ├── layout.tsx          # Header only
    └── page.tsx
```

**Root layout pattern** (`apps/{app}/src/app/layout.tsx`):

```typescript
export const dynamic = 'force-dynamic'; // ⚠️ Required for client-side dependencies

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning> {/* ⚠️ Required for Emotion */}
      <body>
        <ClientProviders>  {/* GlobalStyles here */}
          <NextIntlClientProvider messages={messages}>
            <AnalyticsProvider>
              {children}  {/* ⚠️ NO Header/Sidebar - causes hydration errors */}
            </AnalyticsProvider>
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
```

**Route group layout pattern** (`apps/{app}/src/app/(dashboard)/layout.tsx`):

```typescript
'use client';  // ⚠️ Required for Emotion styled components

import { BackofficeLayoutClient } from '@/components/layouts/BackofficeLayoutClient';

export default function DashboardLayout({ children }) {
  return (
    <BackofficeLayoutClient>  {/* Header + Sidebar */}
      {children}
    </BackofficeLayoutClient>
  );
}
```

**Critical rules:**

1. ✅ Root layout: `export const dynamic = 'force-dynamic'` for all apps
2. ✅ Root layout: `suppressHydrationWarning` on `<html>` tag
3. ✅ Root layout: Providers only (NextIntl, Analytics, Emotion GlobalStyles)
4. ❌ Root layout: NO Emotion styled components (Header, Sidebar, etc.)
5. ✅ Route group layouts: `'use client'` + Emotion components allowed
6. ✅ Page components: Can be server or client components

### Pattern 3: Auth.js RBAC (Backoffice)

**Backoffice uses Auth.js (NextAuth v5)** with role-based access:

```typescript
// apps/backoffice/src/lib/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      /* ... */
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only ADMIN and RESTAURANT_OWNER can access backoffice
      const allowedRoles = [USER_ROLES.ADMIN, USER_ROLES.RESTAURANT_OWNER];
      if (!user.role || !allowedRoles.includes(user.role)) {
        throw new Error('Access denied');
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});
```

**User roles** (defined in `prisma/schema.prisma`):

- **ADMIN**: Full system access (all restaurants, IAM management)
- **RESTAURANT_OWNER**: Manage own restaurants only
- **USER**: Frontoffice only (no backoffice access)

**Auth setup:**

1. Route handlers: `apps/backoffice/src/app/api/auth/[...nextauth]/route.ts`
2. Auth config: `apps/backoffice/src/lib/auth.ts`
3. Middleware: `apps/backoffice/middleware.ts` (protects routes)
4. Protected routes: All under `(backoffice)` route group

**Session access:**

```typescript
// Server component
import { auth } from '@/lib/auth';
const session = await auth();

// Client component
import { useSession } from 'next-auth/react';
const { data: session } = useSession();
```

### Pattern 4: Centralized Constants

**All apps use centralized constants** - NEVER hardcode routes or roles:

```typescript
// apps/{app}/src/lib/constants/index.ts
export * from './roles';
export * from './routes';

// apps/{app}/src/lib/constants/routes.ts
export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  DASHBOARD: {
    HOME: '/dashboard',
  },
  RESTAURANT: {
    LIST: '/restaurants',
    NEW: '/restaurants/new',
    DETAIL: (id: string) => `/restaurants/${id}`, // ⚠️ Function for dynamic routes
    EDIT: (id: string) => `/restaurants/${id}/edit`,
  },
} as const;

// apps/{app}/src/lib/constants/roles.ts
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  RESTAURANT_OWNER: 'RESTAURANT_OWNER',
  USER: 'USER',
} as const;
```

**Usage:**

```typescript
import { ROUTES, USER_ROLES } from '@/lib/constants';

// ✅ CORRECT
<Link href={ROUTES.RESTAURANT.NEW}>Add Restaurant</Link>
<Link href={ROUTES.RESTAURANT.DETAIL(id)}>View</Link>

if (user.role === USER_ROLES.ADMIN) { /* ... */ }

// ❌ WRONG - hardcoded
<Link href="/restaurants/new">Add Restaurant</Link>
if (user.role === 'ADMIN') { /* ... */ }
```

### Pattern 5: Directory Structure (Next.js Apps)

**Frontoffice and backoffice follow `src/` structure:**

```
apps/{app}/src/
├── actions/              # Server actions (frontoffice only - 'use server')
├── app/                  # Next.js App Router
│   ├── (auth)/          # Route group - auth layout
│   ├── (dashboard)/     # Route group - dashboard layout
│   ├── api/             # API routes
│   ├── layout.tsx       # Root layout (providers only)
│   ├── page.tsx         # Home page
│   ├── loading.tsx      # Global loading UI
│   ├── error.tsx        # Global error UI
│   └── not-found.tsx    # 404 page
├── components/
│   ├── layouts/         # Layout components (Header, Sidebar, etc.)
│   ├── backoffice/      # App-specific components
│   └── AnalyticsProvider.tsx
├── hooks/               # Custom React hooks (frontoffice: React Query wrappers)
├── i18n/                # i18n config (request.ts, routing.ts)
├── lib/
│   ├── auth.ts          # Auth.js config (backoffice only)
│   ├── prisma.ts        # Prisma client singleton
│   ├── constants/       # Routes, roles, etc.
│   └── utils/           # Utility functions
├── messages/            # i18n translations
│   ├── en/              # 7 modules: common, navigation, home, actions, auth, dashboard, errors
│   └── vi/
├── services/            # API client functions (frontoffice only)
├── types/               # TypeScript types and interfaces
└── middleware.ts        # Auth middleware (backoffice only)
```

**Component file naming:**

```
apps/{app}/src/app/{route}/_components/
├── ComponentName.tsx        # Main component
├── ComponentName.styles.ts  # Emotion styles (if complex)
└── ComponentName.test.tsx   # Tests (optional in apps - required in packages/taviad)
```

**⚠️ Underscore prefix (`_components/`):**

- Next.js 15 ignores `_folders` in routing
- Use for co-located components, utils, constants
- Examples: `_components/`, `_types/`, `_hooks/`, `_constants/`

### Pattern 6: @tavia/taviad Component Usage (MOST IMPORTANT)

**NEVER hardcode versions in package.json.** Always use `catalog:` references
from `pnpm-workspace.yaml`.

```json
// ✅ CORRECT
{
  "dependencies": {
    "next": "catalog:",              // Main catalog
    "@emotion/react": "catalog:emotion",  // Named catalog
    "@tavia/taviad": "workspace:*"     // Internal package
  }
}

// ❌ WRONG - Hardcoded version
{ "dependencies": { "next": "^15.5.0" } }
```

**Adding dependencies:**

1. Add to `pnpm-workspace.yaml` catalog first: `new-package: ^1.0.0`
2. Reference in package.json: `"new-package": "catalog:"`
3. Run `pnpm install` from root

**Available catalogs:** `catalog:`, `catalog:emotion`, `catalog:next14`,
`catalog:next15`, `catalog:expo`

**Exceptions (not in catalog):**

- App-specific dependencies (e.g., `sonner` in backoffice) can be added directly
  with versions
- These should be rare - prefer adding to catalog for reusability

### Pattern 7: @tavia/taviad Component Structure

**Flat structure** - All 60+ components in
`packages/taviad/src/ui/<component-name>/` (lowercase-with-dashes).

**For web apps only.** Mobile apps use `@tavia/mobile-ui` with React Native
components (StyleSheet, not Emotion).

```
ui/button/                           # ⚠️ lowercase-with-dashes
├── components/
│   ├── Button.tsx                   # PascalCase component
│   ├── Button.styles.ts             # Emotion styles
│   └── index.ts
├── types/
│   ├── ButtonProps.ts               # ⚠️ Separate props file
│   └── index.ts
├── tests/
│   └── Button.test.tsx              # ⚠️ 15-50 tests MINIMUM
└── index.ts                         # Barrel export
```

**Import patterns:**

```typescript
// ✅ PREFERRED - Package imports
import { Button, Modal, Input } from '@tavia/taviad';

// ✅ Also correct - Direct imports
import { Button } from '@tavia/taviad/ui/button';

// ❌ DEPRECATED - Old categorized paths
import { Button } from '@tavia/taviad/components/form/Button';
```

**Component categories** (documentation only - all in flat `ui/`):

- **Base** (9): Avatar, Badge, Button, ButtonGroup, Code, Icon, Image, Spinner,
  Tag
- **Radix** (8): Accordion, Checkbox, DropdownMenu, Modal, Popover, Radio, Tabs,
  Tooltip
- **Form** (19): Calendar, Field, Form, Input, InputNumber, InputSearch,
  InputTags, Label, Select, Combobox, Switch, Slider, TextArea, FileUpload,
  ImageUpload, RichTextEditor, Text
- **Dialog** (4): Alert, Drawer, MenuBar, Toast
- **Layout** (10): Card, Divider, GoogleMap, LeafletMap, MapboxMap,
  LoadingScreen, ScrollBox, Skeleton, Stack, ThemeProvider
- **Navigation** (4): Breadcrumb, Link, Pagination, Sidebar
- **State** (5): EmptyState, ErrorState, LoadingLogo, LoadingState, Progress
- **Table** (2): DataTable, Table

### Pattern 8: Emotion Styling (NO SCSS)

**ALL components use Emotion.** No CSS modules, no SCSS.

**ComponentName.styles.ts pattern:**

```typescript
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

type Variant = 'success' | 'warning' | 'danger';

const getVariantColors = (variant: Variant = 'success') =>
  ({
    success: { base: cssVars.colorSuccess, light: cssVars.colorSuccessLight },
    // ... more variants
  })[variant];

/**
 * Styled components - MUST use this export pattern
 */
export const Styled = {
  Wrapper: styled.div<{ $variant?: Variant; $isFilled?: boolean }>`
    padding: 0.75rem 1rem;
    border-radius: ${radii.md}; // ⚠️ Use tokens, NOT px

    ${({ $variant = 'success', $isFilled }) => {
      const colors = getVariantColors($variant);
      return `
        color: ${colors.base};
        background-color: ${colors.light}20;  // 20 = 12% opacity
      `;
    }}
  `,
};
```

**ComponentName.tsx pattern:**

```typescript
import { Styled } from './ComponentName.styles';
import { ComponentNameProps } from '../types';

export const ComponentName = ({
  variant = 'success',
  className: _className,  // Prefix unused with _
  ...other
}: ComponentNameProps) => (
  <Styled.Wrapper $variant={variant} {...other}>
    {/* content */}
  </Styled.Wrapper>
);

ComponentName.displayName = 'ComponentName';
```

**Critical Emotion rules:**

- ✅ Import tokens: `import { cssVars } from '../../../theme/tokens/colors'`
- ✅ Export as `Styled` object:
  `export const Styled = { Wrapper: styled.div\`...\` }`
- ✅ Transient props use `$` prefix: `$variant`, `$isActive`
- ✅ Use `radii` tokens: `${radii.md}` NOT `8px`
- ✅ Hex opacity: `${colors.light}20` (20 = 12%)
- ❌ Don't hardcode colors/radii
- ❌ Don't use props without `$` in styled components

**Theme tokens:**

- **Colors**: `cssVars.colorSuccess`, `gray0-gray1000`, `mainColor`,
  `mainColorLight1-9`
- **Radii**: `radii.none`, `radii.sm`, `radii.md`, `radii.lg`, `radii.xl`,
  `radii.full`
- **Spacing**: Use rem (`0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`,
  `2rem`)

**Emotion SSR (Server-Side Rendering):**

Emotion 10+ works with Next.js 15 SSR **out of the box** with proper
configuration:

✅ **Already configured correctly:**

- `next.config.ts`: `compiler: { emotion: true }` enables Next.js Emotion
  support
- Root layout: `<html suppressHydrationWarning>` handles minor class name
  differences
- Client components: `'use client'` directive on all Emotion styled components

❌ **Do NOT use advanced SSR setup** (CacheProvider, extractCritical) - only
needed for:

- Custom servers (Express, Fastify) - not Next.js
- nth-child/nth-of-type selectors with SSR conflicts
- Manual critical CSS extraction

📚 **Reference:** https://emotion.sh/docs/ssr

> "For v10 and above, SSR just works in Next.js."

**Layout Pattern to Prevent Hydration Errors:**

```tsx
// ✅ CORRECT - Root layout (minimal, no styled components)
// apps/{app}/src/app/layout.tsx
export default async function RootLayout({ children }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ClientProviders>
          <NextIntlClientProvider messages={messages}>
            <AnalyticsProvider>
              {children} {/* ← No layout wrapper with styled components */}
            </AnalyticsProvider>
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}

// ✅ CORRECT - Page-level layout (client component)
// apps/{app}/src/components/layouts/DefaultLayout.tsx
('use client');

export function DefaultLayout({ children }) {
  return (
    <>
      <Header /> {/* Emotion styled component */}
      <Sidebar /> {/* Emotion styled component */}
      {children}
    </>
  );
}

// ✅ CORRECT - Use in pages
// apps/{app}/src/app/dashboard/page.tsx
import { DefaultLayout } from '@/components/layouts/DefaultLayout';

export default function DashboardPage() {
  return (
    <DefaultLayout>
      <h1>Content</h1>
    </DefaultLayout>
  );
}

// ❌ WRONG - Styled components in root layout cause hydration errors
export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header /> {/* ❌ Causes class name mismatch */}
        {children}
      </body>
    </html>
  );
}
```

**Route Groups for Multiple Layouts:**

```
app/
├── (public)/              # Route group - no sidebar
│   ├── layout.tsx         # Uses DefaultLayout (Header only)
│   └── page.tsx
├── (dashboard)/           # Route group - with sidebar
│   ├── layout.tsx         # Uses DashboardLayout (Header + Sidebar)
│   ├── dashboard/page.tsx
│   └── settings/page.tsx
└── layout.tsx             # Root (minimal, providers only)
```

**Key SSR Rules:**

1. ✅ Root layout: Providers only, no Emotion styled components
2. ✅ Add `suppressHydrationWarning` to `<html>` tag
3. ✅ Use `'use client'` on all components with styled components
4. ✅ Apply layouts at page level or via route groups
5. ✅ Keep `compiler: { emotion: true }` in next.config.ts
6. ❌ Never render Emotion styled components in server layouts
7. ❌ Don't use CacheProvider unless you have a custom server

### Pattern 9: Generator Scripts

**ALWAYS use generators** - never copy existing apps. Ensures correct ports,
dependencies, configs.

**Generate Next.js apps:**

```bash
pnpm create:app admin              # Creates apps/admin on port 3089
pnpm create:app customer-portal    # Creates apps/customer-portal on port 3042
```

Creates: Next.js 15 + TypeScript + modular i18n + Prisma + @tavia/taviad +
@tavia/analytics + Emotion + Vitest + Docker PostgreSQL + deterministic port
(3000-3099)

**Template structure (templates/webapp):**

- **src/** based architecture (matches apps/backoffice)
- **Modular i18n**: 7 modules per language (common, navigation, home, actions,
  auth, dashboard, errors)
- **Provider pattern**: ClientProviders (GlobalStyles) + AnalyticsProvider
- **TypeScript configs**: next.config.ts with Emotion compiler + React 19
  resolution
- **Docker PostgreSQL**: Pre-configured with app-specific container names
- **Full scripts**: dev, build, test, coverage, docker, db (migrate, seed,
  studio)

**Generate APIs:**

```bash
pnpm create:api notifications      # Interactive: Fastify or NestJS
# Fastify: Lightweight REST (port 4000-4099)
# NestJS: Full microservice with Swagger
```

**Generate mobile apps:**

```bash
pnpm create:mobile customer-app    # Expo + TypeScript + @tavia/analytics
```

**Generate feature modules (Next.js apps):**

```bash
cd apps/backoffice
pnpm generate:module        # Interactive: Creates feature module (model, services, hooks, UI)
# Example: Creates src/modules/products/ with all boilerplate
```

**Port allocation:**

- Web apps: 3000-3099 (deterministic hash-based)
- APIs: 4000-4099 (deterministic hash-based)
- Same name = same port (reproducible)

**Template i18n structure:**

```
src/messages/
  ├── en/
  │   ├── common.json      # App name, welcome, description
  │   ├── navigation.json  # Menu items
  │   ├── home.json        # Home page content
  │   ├── actions.json     # Save, cancel, delete, etc.
  │   ├── auth.json        # Login, logout, register
  │   ├── dashboard.json   # Dashboard-specific content (apps only)
  │   └── errors.json      # Error messages
  └── vi/                  # Same structure for Vietnamese
```

**i18n loading pattern** (from `src/i18n/request.ts`):

```typescript
// Load modular i18n files with Promise.all for performance
const [common, navigation, home, actions, auth, dashboard, errors] =
  await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/navigation.json`),
    // ... more modules
  ]);

return {
  locale,
  messages: {
    common: common.default,
    navigation: navigation.default,
    // ... spread all modules
  },
};
```

**Locale detection priority:**

1. Cookie (`NEXT_LOCALE`) - highest priority
2. Accept-Language header - fallback
3. Default locale (from config) - final fallback

**Key template patterns:**

- ✅ All files in `src/` directory (app, components, lib, i18n, messages)
- ✅ Modular i18n with Promise.all loading in `src/i18n/request.ts`
- ✅ Locale detection: cookie (`NEXT_LOCALE`) > Accept-Language > default
- ✅ Emotion GlobalStyles wrapped in ClientProviders
- ✅ Analytics auto-configured with debug mode
- ✅ React 19.2.0 with resolution aliases in vitest.config.ts
- ✅ Docker compose with app-name placeholders (e.g., `{app-name}-postgres`)
- ✅ Comprehensive metadata in layout.tsx
- ✅ `forwardRef` pattern for component refs (see Button.tsx)

## Development Commands

```bash
# Development
pnpm dev                    # All apps (backoffice + docs)
pnpm dev:backoffice         # Backoffice app only (localhost:3000)
pnpm dev:storybook          # Storybook (localhost:6006)

# Building & Quality
pnpm build                  # Build all with Turborepo
pnpm build --filter=backoffice  # Build specific app
pnpm lint                   # Lint (ESLint 9)
pnpm lint:fix               # Auto-fix
pnpm format                 # Prettier format
pnpm type-check             # TypeScript

# Testing (packages/taviad)
cd packages/taviad
pnpm test                   # Run tests
pnpm test:coverage          # Coverage (80% threshold)
pnpm test:watch             # Watch mode

# Module Generation (apps/backoffice)
cd apps/backoffice
pnpm generate:module        # Scaffold feature module (interactive)

# Git (ALWAYS USE)
pnpm commit                 # Commitizen (conventional commits)
# Pre-commit hooks auto-run: Prettier + type-check

# Dependencies
pnpm add <pkg> --filter=backoffice  # Add to specific workspace
pnpm add -w <pkg>            # Add to root

# Database (from apps/backoffice)
pnpm db:setup               # Full setup: Docker + migrate + seed
pnpm docker:up              # Start PostgreSQL
pnpm docker:down            # Stop PostgreSQL
pnpm db:migrate             # Create migration (dev)
pnpm db:studio              # Prisma Studio GUI
```

## Component Testing (15-50 tests minimum)

```typescript
// 1. Basic rendering
it('should render with default props', () => {
  const { container } = render(<Component />);
  expect(container.firstChild).toBeTruthy();
});

// 2. Variants
it('should render success variant', () => {
  render(<Component variant="success" />);
  expect(screen.getByTestId('component')).toHaveAttribute('data-variant', 'success');
});

// 3. Events
it('should call onClick when clicked', async () => {
  const handleClick = vi.fn();
  render(<Component onClick={handleClick} />);
  await userEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// 4. Accessibility
it('should have correct ARIA attributes', () => {
  render(<Component label="Test" />);
  expect(screen.getByRole('button')).toHaveAccessibleName('Test');
});

// 5. Display name
it('should have display name', () => {
  expect(Component.displayName).toBe('ComponentName');
});
```

**Radix UI notes:** Use `container.querySelector()` for multiple elements; check
`data-state`, `data-disabled`

## TypeScript & ESLint Best Practices

```typescript
// ✅ Infer return types (don't use `: JSX.Element`)
export const Component = ({ children }: Props) => <div>{children}</div>;

// ✅ Prefix unused variables with _
export const Component = ({ value, variant: _variant }: Props) => <div>{value}</div>;

// ✅ Omit unused error params
try { new URL(input); } catch { return { success: false }; }

// ✅ Add JSX pragma for css prop
/** @jsxImportSource @emotion/react */
export const Tag = () => <div css={styles}>...</div>;
```

**ESLint 9 flat config:**

- Extend from `@repo/eslint-config/react-internal` (no `.js`)
- @tavia/taviad allows `--max-warnings 10`
- Each workspace has own `eslint.config.js`

## Git Workflow (Conventional Commits)

```bash
git checkout -b feat/your-feature
git add .
pnpm commit  # Interactive Commitizen prompt
git push origin feat/your-feature
```

**Pre-commit hooks** (`.lintstagedrc.js`):

- Prettier on all staged files
- TypeScript type-check across workspace

**Commit types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`build`, `ci`, `chore`

**Examples:**

- `feat(core): add Button component with variants`
- `fix(booking): prevent double booking race condition`
- `refactor(core): migrate to Lucide icons`

## Database Workflows (Docker + Prisma)

**Architecture:** Each app has own PostgreSQL container + database

**Quick start (new developer):**

```bash
cd apps/backoffice
pnpm db:setup  # Docker up + migrate + seed
```

**Schema changes:**

```bash
# 1. Edit prisma/schema.prisma
# 2. Create migration
pnpm db:migrate  # Prompts for name
# 3. Verify in Prisma Studio
pnpm db:studio
# 4. Commit migration files
git add prisma/migrations/
```

**Docker Compose pattern:**

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: {app-name}-postgres  # ⚠️ Unique per app
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-{app-name}}
    ports: ['5432:5432']
    volumes: ['{app-name}_postgres_data:/var/lib/postgresql/data']
```

**Environment:**

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/web"
```

## CI/CD Pipeline

**GitHub Actions** (`.github/workflows/ci.yml`):

- Triggers: Push to `main`/`develop`, all PRs
- Parallel jobs: `lint`, `typecheck`, `build`, `test`, `commitlint`
- Caching: pnpm store + Turborepo
- Node version from `.nvmrc` (18.18.0)

**Dependabot:** Weekly updates (Mondays), grouped by ecosystem

## Storybook

**Location:** `apps/docs/src/stories/core/` **Structure:** `base/`, `radix/`,
`form/`, `dialog/`, `layout/`, `navigation/`, `state/`, `table/` **Metadata:**
`title: 'Core/Base/Button'`

## Common Gotchas

1. **Always use catalog dependencies** - Never hardcode versions
2. **Import ESLint configs without `.js`** -
   `@repo/eslint-config/react-internal`
3. **Prefix unused variables with `_`** - Avoids ESLint warnings
4. **Add `@jsxImportSource @emotion/react`** for `css` prop
5. **Use `workspace:*` for internal packages** - Not versions
6. **Infer return types** - Don't use `: JSX.Element`
7. **Radix uses `data-*` attributes** - Check in tests
8. **Use `radii` tokens** - Never `border-radius: 8px`
9. **Transient props need `$` prefix** - `$variant`, not `variant`
10. **Don't export from empty files** - Causes "is not a module" errors
11. **Avoid hydration errors** - Never put Emotion styled components in root
    layout
12. **Use suppressHydrationWarning** - Add to `<html>` tag for Emotion SSR
13. **Apply layouts at page level** - Use route groups or page-level wrappers

## Platform-Specific Notes

### Windows Development

**Shell commands in generators:**

- Generator scripts use Unix-style commands (`cp -r`, `rm -rf`)
- On Windows, ensure Git Bash, WSL, or compatible shell is available
- Or use PowerShell equivalents: `Copy-Item -Recurse`, `Remove-Item -Recurse`

**Line endings:**

- Git auto-converts to CRLF on Windows
- Prettier enforces LF (`"endOfLine": "lf"`)
- Set Git config: `git config --global core.autocrlf input`

**Docker commands:**

- Docker Desktop required for PostgreSQL containers
- Run `pnpm docker:up` from app directories (e.g., `apps/backoffice`)
- Ensure Docker Desktop is running before database commands

## Key Files Reference

- `pnpm-workspace.yaml` - Catalog dependencies (read first!)
- `turbo.json` - Build pipeline
- `packages/taviad/src/ui/` - 60+ components (flat)
- `packages/taviad/src/theme/tokens/` - Theme tokens (colors, radii, typography)
- `packages/taviad/src/main.ts` - Main export file with all public APIs
- `.github/workflows/ci.yml` - CI/CD
- `eslint.config.js` - Root ESLint
- `packages/eslint-config/` - Shared configs
- `.nvmrc` - Node version (18.18.0)

## Implementation Checklist

When adding features:

1. ✅ Use generators (`pnpm create:app`/`create:api`) - never copy apps
2. ✅ Add dependencies to catalog first
3. ✅ Use ESLint 9 flat config
4. ✅ Commit with Commitizen (`pnpm commit`)
5. ✅ Write 15-50 tests per component
6. ✅ Follow Emotion patterns (tokens, `$` prefix, `Styled` export)
7. ✅ No summary docs (`COMPLETE.md`, `MIGRATION.md`)

---

**Remember:** Microservices-first architecture. Use generators (`templates/`)
not production apps (`apps/`). Web apps: 3000-3099, APIs: 4000-4099. Share code
via `packages/` (@tavia/taviad, @tavia/analytics).
