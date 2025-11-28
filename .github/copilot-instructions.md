# Tavia - AI Coding Agent Instructions

Tavia is a **Freemium community networking platform** built as a
**microservices-first monorepo**. Two-sided platform: Organizers (B2B) create
groups/events, Attendees (B2C) discover and join activities.

> **Note:** Detailed patterns in `.github/instructions/*.instructions.md`
> auto-load based on file paths you're editing.

## 🎯 Critical Rules (Never Break These)

### 1. ALWAYS Use Internal Packages

```tsx
// ✅ Web: import { Button, Input } from '@tavia/taviad'; import { env } from '@/lib/env';
// ✅ Mobile: import { Button, Text } from '@tavia/taviax'; import styled from '@emotion/native';
// ✅ Styling: import { theme } from '@tavia/taviad'; // Use theme.colors.primary, theme.radii.md
// ❌ NEVER: <button>, process.env.*, cssVars.mainColor, @emotion/styled in mobile
```

### 2. Shared Database (backoffice + frontoffice)

- ONE PostgreSQL database `tavia` for both apps (instant sync)
- Migrate from backoffice: `pnpm db:migrate` → Copy schema to frontoffice →
  `pnpm db:generate`

### 3. Use Generators (Never Copy Apps)

```bash
pnpm create:app <name>   # Next.js (auto-port 3000-3099)
pnpm create:api <name>   # Fastify/NestJS (auto-port 4000-4099)
```

### 4. Catalog Dependencies (Never Hardcode Versions)

```json
{ "dependencies": { "next": "catalog:", "@emotion/react": "catalog:emotion" } }
```

## 🏗️ Architecture

**Apps:** backoffice (3000, Auth.js, ADMIN/ORGANIZER/MODERATOR) | frontoffice
(3003, Server Actions, ATTENDEE) | mobile (Expo, JWT, ATTENDEE) **Packages:**
@tavia/taviad (60+ web UI) | @tavia/taviax (mobile UI) | @tavia/env (MANDATORY
for env vars)

**Freemium:** Free (1 group, 50 members, 2 events/month) | Premium (unlimited +
analytics) - See `apps/backoffice/src/lib/features/planLimits.ts`

## 🚀 Essential Commands

```bash
pnpm dev:backoffice     # Port 3000
pnpm dev:frontoffice    # Port 3003
pnpm db:setup           # Docker + migrate + seed (first time, from backoffice/)
pnpm commit             # ALWAYS use (Commitizen)
```

## 📖 Key Files

1. `pnpm-workspace.yaml` - Catalog deps (read before adding)
2. `.github/instructions/*.instructions.md` - Auto-loaded patterns
3. `apps/backoffice/DATABASE.md` - Shared DB setup

**Stack:** Next.js 15, React 19, pnpm 10.19.0, Emotion (NO SCSS), Prisma, Docker
PostgreSQL 16

---

## 📋 Instruction Files Reference

Context-specific patterns auto-load based on file paths:

| File                                   | Applies To                                    | Content                                        |
| -------------------------------------- | --------------------------------------------- | ---------------------------------------------- |
| `01-architecture.instructions.md`      | `**/*`                                        | Freemium model, shared database, microservices |
| `02-web-apps.instructions.md`          | `apps/{backoffice,frontoffice}/**/*.{ts,tsx}` | Server Actions, Auth.js, API errors, env vars  |
| `03-mobile.instructions.md`            | `apps/mobile/**/*.{ts,tsx}`                   | Expo, platform storage, API config             |
| `04-components-web.instructions.md`    | `packages/taviad/**/*.{ts,tsx}`               | Component structure, testing (80% coverage)    |
| `05-components-mobile.instructions.md` | `packages/taviax/**/*.{ts,tsx}`               | React Native components (70% coverage)         |
| `06-styling.instructions.md`           | `**/*.styles.{ts,tsx}`                        | Emotion patterns, theme object, SSR            |
| `07-api.instructions.md`               | `apps/*/api/**/*.ts`                          | Response format, error handling, CORS          |
| `08-database.instructions.md`          | `apps/*/prisma/**/*`                          | Migrations, Docker, shared schema              |
| `09-testing.instructions.md`           | `**/*.test.{ts,tsx}`                          | Vitest patterns, coverage thresholds           |
| `10-dev-workflow.instructions.md`      | `**/*`                                        | Generators, Git workflow, commands             |

**Quick Reference:**

- 🎯 Business model → `01-architecture.instructions.md`
- 🌐 Web app patterns → `02-web-apps.instructions.md`
- 📱 Mobile patterns → `03-mobile.instructions.md`
- 🎨 Styling rules → `06-styling.instructions.md`
- 🗄️ Database workflows → `08-database.instructions.md`

- **Organizers (B2B)**: Community managers who create groups, host events, and
  grow communities
- **Attendees (B2C)**: Individuals discovering and joining activities (unlimited
  access)

**Business Model:**

- **Free Plan**: Organizers get 1 group (50 members max), 2 events/month, basic
  tools
- **Premium Plan**: Unlimited groups/events, advanced analytics, custom
  branding, automation
- **Attendees**: Always free with unlimited joining and participation

**Conversion Strategy:**

- Generous Free tier attracts organizers
- Clear limits trigger upsell (50 members, 2 events/month, no analytics)
- High-value Premium features drive conversions
- More groups → more events → more attendees → more paid organizers

## 🎯 Project Overview

**Core Architecture:**

- **@tavia/taviad**: 60+ UI components (Emotion + Radix UI) - **PRIMARY for ALL
  web UI** ⭐
- **apps/backoffice**: Next.js 15 organizer platform with Auth.js, Prisma,
  Stripe, Docker PostgreSQL (port 3000)
- **apps/frontoffice**: Next.js 15 attendee event discovery (port 3003) -
  **shared database with backoffice**
- **apps/analytics**: Fastify 5 event tracking API (port 3001)
- **apps/event-service**: NestJS 11 microservice with Swagger (port 3002)
- **Generator scripts**: Systematic scaffolding via `pnpm create:app`,
  `create:api`, `create:mobile`

**Tech Stack:**

- Next.js 15 (App Router) + React 19 | Node.js 22.17.1+ (`.nvmrc`: 18.18.0 for
  CI)
- Payments: Stripe subscription billing (Monthly/Annual plans)
- Styling: 100% Emotion (NO SCSS) + Radix UI primitives
- Package Manager: pnpm v10.19.0+ (exact: 10.19.0+sha512) with **catalog
  dependencies**
- Build: Turborepo | Testing: Vitest (15-50 tests/component), Playwright
- Linting: ESLint 9 flat config (NOT .eslintrc) | Git: Husky + Commitizen

**Monorepo Structure:**

```
apps/
  ├── backoffice/           # Next.js 15 organizer (port 3000) - ADMIN/ORGANIZER/MODERATOR roles
  ├── frontoffice/          # Next.js 15 attendee app (port 3003) - ATTENDEE role, unlimited access
  ├── mobile/               # Expo 54 mobile app for ATTENDEE users (React Native)
  ├── analytics/            # Fastify API (port 3001)
  ├── event-service/        # NestJS (port 3002)
  └── docs/                 # Storybook (port 6006)
packages/
  ├── taviad/               # @tavia/taviad - 60+ web components (Emotion + Radix) ⭐
  ├── taviax/               # @tavia/taviax - React Native components (Emotion Native) 📱
  ├── analytics/            # @tavia/analytics SDK
  ├── module-generator/     # @tavia/module-generator - Feature module scaffolding
  ├── env/                  # @tavia/env - Type-safe environment variables
  ├── logger/               # @tavia/logger - Structured logging
  ├── eslint-config/        # Shared ESLint 9 configs
  └── typescript-config/    # Shared tsconfig
templates/                  # For generators (webapp, simple-api, complex-api, mobile-app)
scripts/                    # create-app.js, create-api.js, create-mobile.js
pnpm-workspace.yaml         # ⚠️ CRITICAL - Catalog dependencies
turbo.json                  # Build pipeline config
```

## ⚠️ CRITICAL RULE: Component Library Selection

**Web Apps** (backoffice, frontoffice, any Next.js app):

- ✅ **ALWAYS use @tavia/taviad** - 60+ components with Emotion + Radix UI
- ✅ Check `packages/taviad/src/ui/{component}/types/` for available props
- ❌ NEVER use native HTML elements (`<button>`, `<input>`, `<a>`)

**Mobile Apps** (apps/mobile, any Expo app):

- ✅ **ALWAYS use @tavia/taviax** - React Native components with Emotion Native
- ✅ Shares design tokens with @tavia/taviad (colors, spacing, radii,
  typography)
- ✅ Same API design as @tavia/taviad for developer familiarity
- ❌ NEVER use @tavia/taviad in mobile (web-only)

**Available Components:**

**@tavia/taviad** (Web - 60+ components):

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

**@tavia/taviax** (Mobile - Growing):

- Button (7 variants, 5 shapes, 3 sizes, loading state)
- Text (customizable typography with design tokens)
- TextInput (with icons, error states, validation)
- SocialButton (OAuth providers: Google, Apple, Facebook)
- _More components coming_ (Card, Modal, Toast, Avatar, Badge, Switch, Checkbox,
  Radio, Select/Picker)

**Examples:**

```tsx
// ✅ CORRECT - Web app (Next.js)
import { Button, Link, InputText } from '@tavia/taviad';

<Button variant="primary" onClick={handleClick}>Save</Button>
<Link href="/home">Home</Link>
<InputText placeholder="Search" />

// ✅ CORRECT - Mobile app (Expo)
import { Button, Text, TextInput } from '@tavia/taviax';
import { View } from 'react-native';

<Button variant="primary" onPress={handlePress}>Save</Button>
<Text size="lg" weight="bold">Welcome</Text>
<TextInput placeholder="Search" />

// ❌ WRONG - Native HTML in web
<button onClick={handleClick}>Click me</button>

// ❌ WRONG - @tavia/taviad in mobile
import { Button } from '@tavia/taviad'; // Web-only!
```

**Props Validation Workflow:**

```tsx
// BEFORE using a component, read its props file:
// Web: packages/taviad/src/ui/button/types/ButtonProps.ts
// Mobile: packages/taviax/src/components/Button/types/ButtonProps.ts

// Use ONLY the documented props
<Button variant="primary" onClick={handleClick}>Save</Button>

// ❌ WRONG - "outline" is NOT a valid variant
<Button variant="outline">Save</Button>
```

## 🔥 Critical Patterns

### Pattern 0: Freemium Model & Feature Flags

**Tavia uses a two-sided platform (broker model) with Freemium monetization:**

**Free Plan (Organizers):**

- Create 1 group (max 50 members)
- Host 2 events per month
- Basic tools: RSVP, simple chat, manual member approval
- Platform watermark on pages
- NO analytics or custom branding

**Premium Plan (Organizers):**

- Unlimited groups and members
- Unlimited events per month
- Advanced analytics (growth, retention, engagement)
- Custom branding (logo, colors, domain)
- Moderators and co-hosts
- Automated member management
- Priority support

**Attendees:**

- Always FREE with unlimited access
- Unlimited group joining and event participation

**Feature Flag System:**

Centralized permission checks in `apps/backoffice/src/lib/features/`:

```typescript
// apps/backoffice/src/lib/features/planLimits.ts
export const PLAN_LIMITS = {
  FREE: {
    maxGroups: 1,
    maxMembers: 50,
    maxEventsPerMonth: 2,
    hasAnalytics: false,
    hasCustomBranding: false,
    canAddModerators: false,
  },
  PREMIUM: {
    maxGroups: Infinity,
    maxMembers: Infinity,
    maxEventsPerMonth: Infinity,
    hasAnalytics: true,
    hasCustomBranding: true,
    canAddModerators: true,
  },
} as const;

// Feature flag checks
export function canCreateGroup(user: User): boolean {
  if (user.subscriptionStatus === 'PREMIUM') return true;
  return user.groupCount < PLAN_LIMITS.FREE.maxGroups;
}

export function canCreateEvent(user: User, groupId: string): boolean {
  if (user.subscriptionStatus === 'PREMIUM') return true;
  const eventsThisMonth = getEventsCountThisMonth(user, groupId);
  return eventsThisMonth < PLAN_LIMITS.FREE.maxEventsPerMonth;
}

export function getMaxMembers(group: Group): number {
  return group.isPremium
    ? PLAN_LIMITS.PREMIUM.maxMembers
    : PLAN_LIMITS.FREE.maxMembers;
}

export function canAccessAnalytics(user: User): boolean {
  return user.subscriptionStatus === 'PREMIUM';
}

export function canCustomizeBranding(user: User): boolean {
  return user.subscriptionStatus === 'PREMIUM';
}
```

**Premium Upsell Triggers:**

1. **Group hits 50 members** → Show upgrade modal:

   ```typescript
   if (group.memberCount >= 50 && !group.isPremium) {
     showUpgradeModal(
       'Your group is at capacity! Upgrade to add unlimited members.'
     );
   }
   ```

2. **Creating 3rd event of month** → Block + paywall:

   ```typescript
   if (!canCreateEvent(user, groupId)) {
     showPremiumPaywall(
       "You've reached your 2 events/month limit. Go Premium for unlimited events!"
     );
   }
   ```

3. **Accessing analytics** → Premium gate:

   ```typescript
   if (!canAccessAnalytics(user)) {
     return <PremiumFeature feature="Advanced Analytics" />;
   }
   ```

4. **Customizing branding** → Premium gate:
   ```typescript
   if (!canCustomizeBranding(user)) {
     return <PremiumFeature feature="Custom Branding" />;
   }
   ```

**Stripe Subscription Management:**

```typescript
// apps/backoffice/src/lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Subscription plans
export const STRIPE_PLANS = {
  MONTHLY: {
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID,
    amount: 2900, // $29/month
  },
  ANNUAL: {
    priceId: process.env.STRIPE_ANNUAL_PRICE_ID,
    amount: 29000, // $290/year (2 months free)
  },
};

// Upgrade flow
export async function upgradeToPremium(
  userId: string,
  plan: 'MONTHLY' | 'ANNUAL'
) {
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [
      {
        price: STRIPE_PLANS[plan].priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  });

  return session.url;
}

// Downgrade behavior
export async function cancelSubscription(userId: string) {
  // Graceful downgrade: preserve data, freeze premium features
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: 'FREE',
      subscriptionEndDate: new Date(), // Immediate effect
    },
  });

  // Groups remain but premium features disabled
  await prisma.group.updateMany({
    where: { ownerId: userId },
    data: { isPremium: false },
  });
}
```

### Pattern 1: Shared Database Architecture

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
│ADMIN/    │ │ATTENDEE  │
│ORGANIZER │ │role only │
│MODERATOR │ │          │
└─────────┘ └─────────┘
```

**Critical implications:**

- ✅ Event data managed in backoffice appears **instantly** in frontoffice (no
  sync)
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

### Pattern 2: Next.js 15 Server Actions (Frontoffice)

**Frontoffice uses server actions** for type-safe database operations:

```typescript
// apps/frontoffice/src/actions/event.actions.ts
'use server';

import prisma from '@/lib/prisma';

export async function searchEventsAction(
  params: SearchEventsParams
): Promise<SearchEventsResponse> {
  const where = { isActive: true };

  const [events, total] = await Promise.all([
    prisma.event.findMany({ where, skip, take: limit }),
    prisma.event.count({ where }),
  ]);

  return { events, total, page, totalPages };
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
│   └── events/page.tsx
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
      // Only ADMIN, ORGANIZER, and MODERATOR can access backoffice
      const allowedRoles = [
        USER_ROLES.ADMIN,
        USER_ROLES.ORGANIZER,
        USER_ROLES.MODERATOR,
      ];
      if (!user.role || !allowedRoles.includes(user.role)) {
        throw new Error('Access denied');
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.subscriptionStatus = user.subscriptionStatus;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.subscriptionStatus = token.subscriptionStatus;
      return session;
    },
  },
});
```

**User roles** (defined in `prisma/schema.prisma`):

- **ADMIN**: Full system access (all events, user management, subscription
  oversight)
- **ORGANIZER**: Create and manage own events and groups (Free or Premium plan)
- **MODERATOR**: Assist organizers with group management (Premium feature only)
- **ATTENDEE**: Frontoffice only (unlimited joining and participation, no
  backoffice access)

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

### Pattern 4: API Error Handling & Response Format (Backoffice)

**All API routes MUST use standardized error handling and response format:**

**Location:** `apps/backoffice/src/lib/api/`

- `errors.ts` - Custom error classes
- `response.ts` - Response builders and ApiErrors helpers
- `handler.ts` - withApiHandler wrapper with automatic error handling

**Standard Response Format:**

```typescript
// Success response
{
  "success": true,
  "data": { /* endpoint data */ },
  "meta": {  // Optional - for pagination
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}

// Error response
{
  "success": false,
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",  // UNAUTHORIZED, BAD_REQUEST, etc.
    "details": { /* optional context */ }
  }
}
```

**Using Response Builders:**

```typescript
import { apiSuccess, apiError, ApiErrors } from '@/lib/api/response';

// Success
return apiSuccess({ token, user });

// Generic error
return apiError('Invalid credentials', 401, 'UNAUTHORIZED');

// Pre-built errors
return ApiErrors.unauthorized(); // 401
return ApiErrors.forbidden(); // 403
return ApiErrors.notFound('Event'); // 404
return ApiErrors.badRequest('Validation error', details); // 400
return ApiErrors.conflict('Email already exists'); // 409
return ApiErrors.planLimitReached('Limit exceeded', { needsUpgrade: true }); // 403
return ApiErrors.internalError(); // 500
```

**Using Error Classes:**

```typescript
import { UnauthorizedError, ForbiddenError, ConflictError, NotFoundError, BadRequestError } from '@/lib/api/errors';

// Throw custom errors (caught by error handler)
if (!user) throw new UnauthorizedError('Invalid email or password');
if (user.role !== 'ATTENDEE') throw new ForbiddenError('Access denied');
if (existingUser) throw new ConflictError('User already exists');
if (!event) throw new NotFoundError('Event');

// In catch block
catch (error) {
  if (error instanceof UnauthorizedError) {
    return apiError(error.message, error.statusCode, error.code);
  }
  if (error instanceof z.ZodError) {
    const details = error.errors.map(e => ({ field: e.path.join('.'), message: e.message }));
    return ApiErrors.badRequest('Validation error', details);
  }
  return ApiErrors.internalError();
}
```

**Using withApiHandler (Advanced):**

```typescript
import { withApiHandler } from '@/lib/api/handler';

export const GET = withApiHandler<EventResponse>(
  async (request, { session, params }) => {
    const event = await prisma.event.findUnique({ where: { id: params.id } });
    return apiSuccess(event);
  },
  {
    requireAuth: true, // Requires authenticated session
    allowedRoles: ['ADMIN', 'ORGANIZER'], // Role-based access
  }
);
```

**Critical Rules:**

1. ✅ Always use `apiSuccess()` for successful responses
2. ✅ Always use `ApiErrors.*` or `apiError()` for errors
3. ✅ Throw custom error classes (`UnauthorizedError`, etc.) - they're caught
   automatically
4. ✅ Handle Zod validation errors with field details
5. ✅ Use `withApiHandler` for routes that need auth/role checks
6. ❌ Never return raw `NextResponse.json()` - breaks standardization
7. ❌ Never hardcode error messages - use error classes

**CORS Configuration for Mobile API:**

The backoffice has CORS enabled for `/api/mobile/*` routes to allow mobile app
requests:

```typescript
// src/middleware.ts - Handles CORS for mobile API routes
export function middleware(request: NextRequest) {
  if (pathname.startsWith('/api/mobile')) {
    // Preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }
    // Add CORS headers to responses
    response.headers.set('Access-Control-Allow-Origin', '*');
  }
}
```

**Production CORS:** Replace `'*'` with specific origins (e.g.,
`'exp://192.168.1.16:8081'`)

### Pattern 5: Environment Variables (@tavia/env)

**All apps use `@tavia/env` for type-safe, validated environment variables:**

**Location:** `apps/{app}/src/lib/env/index.ts`

```typescript
import { createEnv, envHelpers } from '@tavia/env';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(32),
    JWT_SECRET: z.string().min(32).optional(), // Mobile auth
    STRIPE_SECRET_KEY: z.string().startsWith('sk_').optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: envHelpers.url('http://localhost:3000'),
    NEXT_PUBLIC_ENABLE_ANALYTICS: envHelpers.boolean(false),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // ... map all variables
  },
});
```

**Usage:**

```typescript
import { env } from '@/lib/env';

// Server-only (throws error on client)
const dbUrl = env.DATABASE_URL;
const secret = env.JWT_SECRET || env.NEXTAUTH_SECRET; // Fallback pattern

// Client-safe (available everywhere)
const appUrl = env.NEXT_PUBLIC_APP_URL;
```

**Available Helpers:**

```typescript
envHelpers.port(3000); // Port with default
envHelpers.boolean(false); // Boolean flag
envHelpers.url('http://...'); // URL with default
envHelpers.nodeEnv(); // 'development' | 'production' | 'test'
envHelpers.optionalString(); // Optional string
envHelpers.email(); // Email validation
```

**Critical Rules:**

1. ✅ Always import from `@/lib/env`, never `process.env` directly
2. ✅ Client variables MUST start with `NEXT_PUBLIC_`
3. ✅ Use fallback pattern for optional env:
   `env.JWT_SECRET || env.NEXTAUTH_SECRET`
4. ✅ Add defaults with Zod `.default(value)` for local development
5. ❌ Never access server env on client (throws error by design)
6. ❌ Never hardcode secrets - always use env variables

### Pattern 6: Centralized Constants

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
  EVENT: {
    LIST: '/events',
    NEW: '/events/new',
    DETAIL: (id: string) => `/events/${id}`, // ⚠️ Function for dynamic routes
    EDIT: (id: string) => `/events/${id}/edit`,
  },
  GROUP: {
    LIST: '/groups',
    NEW: '/groups/new',
    DETAIL: (id: string) => `/groups/${id}`,
    EDIT: (id: string) => `/groups/${id}/edit`,
  },
} as const;

// apps/{app}/src/lib/constants/roles.ts
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  ORGANIZER: 'ORGANIZER',
  MODERATOR: 'MODERATOR',
  ATTENDEE: 'ATTENDEE',
} as const;

export const SUBSCRIPTION_STATUS = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
  TRIAL: 'TRIAL',
  CANCELED: 'CANCELED',
} as const;
```

**Usage:**

```typescript
import { ROUTES, USER_ROLES, SUBSCRIPTION_STATUS } from '@/lib/constants';

// ✅ CORRECT
<Link href={ROUTES.EVENT.NEW}>Add Event</Link>
<Link href={ROUTES.EVENT.DETAIL(id)}>View</Link>

if (user.role === USER_ROLES.ADMIN) { /* ... */ }
if (user.subscriptionStatus === SUBSCRIPTION_STATUS.PREMIUM) { /* ... */ }

// ❌ WRONG - hardcoded
<Link href="/events/new">Add Event</Link>
if (user.role === 'ADMIN') { /* ... */ }
if (user.subscriptionStatus === 'PREMIUM') { /* ... */ }
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

### Pattern 8: @tavia/taviad Component Usage (MOST IMPORTANT)

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

### Pattern 9: @tavia/taviad Component Structure

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

### Pattern 10: Emotion Styling (NO SCSS)

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

### Pattern 11: Generator Scripts

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

### Pattern 12: Mobile Development (@tavia/taviax)

**React Native apps use @tavia/taviax** - NOT @tavia/taviad (web-only).

**Architecture:**

```
apps/mobile/
├── app/
│   ├── (auth)/              # Authentication flow (login, signup)
│   ├── (tabs)/              # Main app with tab navigation
│   ├── _layout.tsx          # Root layout with providers
│   └── +not-found.tsx       # 404 page
├── components/              # App-specific components
├── utils/
│   └── secureStorage.ts     # Platform-specific storage wrapper
├── hooks/                   # Custom React hooks
├── theme/                   # Extends @tavia/taviax tokens
├── .env                     # API URL (⚠️ use local IP for physical devices)
└── app.json                 # Expo configuration
```

**Platform-Specific Storage:**

```typescript
// utils/secureStorage.ts - Abstraction for platform differences
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const secureStorage = {
  // Web: Uses localStorage (AsyncStorage)
  // iOS/Android: Uses encrypted keychain (SecureStore)
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      return AsyncStorage.setItem(key, value);
    }
    return SecureStore.setItemAsync(key, value);
  },

  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return AsyncStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },

  async removeItem(key: string) {
    if (Platform.OS === 'web') {
      return AsyncStorage.removeItem(key);
    }
    return SecureStore.deleteItemAsync(key);
  },
};
```

**Emotion Native Styling:**

```typescript
// ✅ CORRECT - Use styled from @emotion/native
import styled from '@emotion/native';
import { colors, spacing, radii } from '@tavia/taviax';

const Container = styled.View`
  background-color: ${colors.mainColor};
  padding: ${spacing.base}px;
  border-radius: ${radii.md}px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.light};
`;

// ❌ WRONG - Don't use @emotion/styled (web-only)
import styled from '@emotion/styled'; // Web-only!
```

**API Configuration (.env):**

```env
# Physical devices (Expo Go on phone)
EXPO_PUBLIC_API_URL=http://192.168.1.16:3000  # Your computer's local IP

# Web browser / iOS Simulator / Android Emulator
EXPO_PUBLIC_API_URL=http://localhost:3000

# Android Emulator (alternative)
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000
```

**Critical Mobile Rules:**

1. ✅ Use `@tavia/taviax` components, NOT `@tavia/taviad`
2. ✅ Import from `@emotion/native`, NOT `@emotion/styled`
3. ✅ Use `secureStorage` abstraction for auth tokens
4. ✅ Test on physical devices requires local IP (same WiFi network)
5. ✅ Use `react-native-web` alias in vitest.config.ts for testing
6. ✅ Coverage threshold: 70% (lower than @tavia/taviad's 80%)
7. ❌ Never use `@tavia/taviad` in mobile apps
8. ❌ Don't hardcode localhost - use `.env` with `EXPO_PUBLIC_` prefix

**Running Mobile App:**

```bash
cd apps/mobile

# 1. Set offline mode (skip Expo login)
set EXPO_OFFLINE=1  # Windows
# export EXPO_OFFLINE=1  # Mac/Linux

# 2. Start Metro bundler
pnpm start

# 3. Choose platform
# - Press 'w' for web browser (localhost:8081)
# - Press 'i' for iOS simulator (Mac only)
# - Press 'a' for Android emulator
# - Scan QR code with Expo Go app (physical device)
```

**Test Accounts:**

- **Attendees**: `attendee1@tavia.io`, `attendee2@tavia.io` (password:
  `attendee123`)
- **Organizer (Free)**: `organizer.free@tavia.io` (password: `organizer123`)
- **Organizer (Premium)**: `organizer.pro@tavia.io` (password: `organizer123`)
- **Admin**: `admin@tavia.io` (password: `admin123`)

**Mobile uses backoffice API** (`/api/mobile/*` routes with CORS enabled).

## Development Commands

```bash
# Development
pnpm dev                    # All apps (backoffice + docs)
pnpm dev:backoffice         # Backoffice app only (localhost:3000)
pnpm dev:frontoffice        # Frontoffice app only (localhost:3003)
pnpm dev:storybook          # Storybook (localhost:6006)

# Mobile (from apps/mobile)
cd apps/mobile
set EXPO_OFFLINE=1          # Windows - skip Expo login
# export EXPO_OFFLINE=1     # Mac/Linux
pnpm start                  # Start Metro bundler
# Press 'w' for web, 'i' for iOS simulator, 'a' for Android emulator

# Building & Quality
pnpm build                  # Build all with Turborepo
pnpm build --filter=backoffice  # Build specific app
pnpm lint                   # Lint (ESLint 9)
pnpm lint:fix               # Auto-fix
pnpm format                 # Prettier format
pnpm type-check             # TypeScript

# Testing (packages/taviad - 80% coverage threshold)
cd packages/taviad
pnpm test                   # Run tests
pnpm test:coverage          # Coverage report
pnpm test:watch             # Watch mode

# Testing (packages/taviax - 70% coverage threshold)
cd packages/taviax
pnpm test                   # Run tests
pnpm test:coverage          # Coverage report
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

# Generate secure JWT secret (32+ characters)
# Run: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# Example output: YCOCS7wRIczdIfSbIaDf7vkx5r6R7vQvRNItJAV/OOM=
JWT_SECRET="YCOCS7wRIczdIfSbIaDf7vkx5r6R7vQvRNItJAV/OOM="
NEXTAUTH_SECRET="YCOCS7wRIczdIfSbIaDf7vkx5r6R7vQvRNItJAV/OOM="
```

**Generating Secure Secrets:**

```bash
# Generate a secure 32-byte random key
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Output example: YCOCS7wRIczdIfSbIaDf7vkx5r6R7vQvRNItJAV/OOM=
# Copy this to JWT_SECRET and NEXTAUTH_SECRET in .env
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
