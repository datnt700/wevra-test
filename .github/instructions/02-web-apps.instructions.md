---
applyTo: 'apps/{backoffice,frontoffice}/**/*.{ts,tsx}'
excludeAgent: 'code-review'
---

# Next.js 15 Web App Patterns

## Server Actions (Frontoffice)

**Location:** `apps/frontoffice/src/actions/`

```typescript
'use server';

import prisma from '@/lib/prisma';

export async function searchEventsAction(params: SearchEventsParams) {
  const [events, total] = await Promise.all([
    prisma.event.findMany({ where, skip, take: limit }),
    prisma.event.count({ where }),
  ]);
  return { events, total, page, totalPages };
}
```

**Rules:**

1. ✅ Always add `'use server'` directive at top
2. ✅ Use `prisma` for database operations
3. ✅ Return plain objects (no functions, React nodes)
4. ✅ Use Prisma transactions for atomic operations

## Route-Based Layouts (Prevent Hydration Errors)

**Structure:**

```
apps/{app}/src/app/
├── layout.tsx              # ROOT - Providers only, NO Emotion
├── (auth)/                 # Route group
│   ├── layout.tsx          # Can use Emotion components
│   └── login/page.tsx
├── (dashboard)/            # Route group
│   ├── layout.tsx          # Header + Sidebar
│   └── dashboard/page.tsx
```

**Root Layout Pattern:**

```typescript
export const dynamic = 'force-dynamic'; // ⚠️ Required

export default async function RootLayout({ children }) {
  return (
    <html lang={locale} suppressHydrationWarning> {/* ⚠️ Required */}
      <body>
        <ClientProviders>  {/* GlobalStyles here */}
          <NextIntlClientProvider messages={messages}>
            {children}  {/* ⚠️ NO Header/Sidebar */}
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
```

**Route Group Layout:**

```typescript
'use client';  // ⚠️ Required for Emotion

export default function DashboardLayout({ children }) {
  return (
    <BackofficeLayoutClient>  {/* Header + Sidebar */}
      {children}
    </BackofficeLayoutClient>
  );
}
```

## Auth.js RBAC (Backoffice)

**Location:** `apps/backoffice/src/lib/auth.ts`

```typescript
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      // Only ADMIN, ORGANIZER, MODERATOR
      const allowedRoles = [
        USER_ROLES.ADMIN,
        USER_ROLES.ORGANIZER,
        USER_ROLES.MODERATOR,
      ];
      if (!allowedRoles.includes(user.role)) {
        throw new Error('Access denied');
      }
      return true;
    },
  },
});
```

**User Roles:**

- **ADMIN**: Full system access
- **ORGANIZER**: Manage own events/groups (Free or Premium)
- **MODERATOR**: Assist organizers (Premium feature)
- **ATTENDEE**: Frontoffice only (no backoffice access)

## API Error Handling

**Location:** `apps/backoffice/src/lib/api/`

**Standard Response Format:**

```typescript
// Success
{ "success": true, "data": {...}, "meta": {...} }

// Error
{ "success": false, "error": { "message": "...", "code": "...", "details": {...} } }
```

**Using Response Builders:**

```typescript
import { apiSuccess, apiError, ApiErrors } from '@/lib/api/response';

return apiSuccess({ token, user });
return ApiErrors.unauthorized();
return ApiErrors.notFound('Event');
return ApiErrors.planLimitReached('Limit exceeded', { needsUpgrade: true });
```

**Error Classes:**

```typescript
import {
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
} from '@/lib/api/errors';

if (!user) throw new UnauthorizedError('Invalid credentials');
if (existingUser) throw new ConflictError('User exists');
```

## Environment Variables (@eventure/env)

**ALWAYS use @eventure/env package** - NEVER access `process.env` directly.

**Location:** `apps/{app}/src/lib/env/index.ts`

```typescript
import { createEnv, envHelpers } from '@eventure/env';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(32),
    JWT_SECRET: z.string().min(32).optional(),
    WEBHOOK_SECRET: z.string().min(32).default('dev-webhook-secret'),
  },
  client: {
    NEXT_PUBLIC_APP_URL: envHelpers.url('http://localhost:3000'),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
```

**Rules:**

1. ✅ **ALWAYS** import from `@/lib/env`, NEVER `process.env` directly
2. ✅ Add ALL new env variables to `apps/{app}/src/lib/env/index.ts` first
3. ✅ Client variables MUST start with `NEXT_PUBLIC_`
4. ✅ Use fallback pattern: `env.JWT_SECRET || env.NEXTAUTH_SECRET`
5. ✅ Validate with Zod schemas (`.string().min(32)`, `.url()`, etc.)
6. ✅ Provide defaults for development: `.default('dev-value')`
7. ❌ NEVER use `process.env.VARIABLE_NAME` in app code
8. ❌ NEVER skip validation - add to schema first

## Centralized Constants

**NEVER hardcode routes, roles, or magic strings:**

```typescript
// apps/{app}/src/lib/constants/routes.ts
export const ROUTES = {
  EVENT: {
    LIST: '/events',
    NEW: '/events/new',
    DETAIL: (id: string) => `/events/${id}`, // Dynamic
  },
};

// apps/{app}/src/lib/constants/roles.ts
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  ORGANIZER: 'ORGANIZER',
  MODERATOR: 'MODERATOR',
  ATTENDEE: 'ATTENDEE',
} as const;
```

**Rules:**

1. ✅ Define ALL routes in `lib/constants/routes.ts`
2. ✅ Define ALL roles in `lib/constants/roles.ts`
3. ✅ Use constants for event types, statuses, etc.
4. ❌ NEVER hardcode strings like `'/events'`, `'ADMIN'`, etc.

## Using Internal Packages

**ALWAYS prefer internal packages over duplicating code:**

**Available Packages:**

- `@eventure/env` - Type-safe environment variables (ALWAYS use this)
- `@eventure/eventured` - 60+ web UI components (ALWAYS use for web)
- `@eventure/eventurex` - React Native components (ALWAYS use for mobile)
- `@eventure/analytics` - Event tracking SDK
- `@eventure/logger` - Structured logging
- `@eventure/module-generator` - Feature scaffolding

**Examples:**

```typescript
// ✅ CORRECT - Use @eventure/env
import { env } from '@/lib/env';
const apiKey = env.STRIPE_SECRET_KEY;

// ✅ CORRECT - Use @eventure/eventured
import { Button, Modal, Input } from '@eventure/eventured';

// ✅ CORRECT - Use @eventure/analytics
import { trackEvent } from '@eventure/analytics';

// ❌ WRONG - Direct process.env access
const apiKey = process.env.STRIPE_SECRET_KEY;

// ❌ WRONG - Native HTML elements
<button onClick={handleClick}>Click</button>

// ❌ WRONG - Custom analytics implementation
function trackEvent() { /* duplicate code */ }
```

**Rules:**

1. ✅ Check if functionality exists in internal packages FIRST
2. ✅ Use `@eventure/env` for ALL environment variables
3. ✅ Use `@eventure/eventured` for ALL web UI components
4. ✅ Use `@eventure/analytics` for event tracking
5. ✅ Extend existing packages instead of creating duplicates
6. ❌ NEVER duplicate functionality that exists in packages
7. ❌ NEVER create app-specific versions of shared utilities

## Directory Structure

```
apps/{app}/src/
├── actions/              # Server actions (frontoffice only)
├── app/
│   ├── (auth)/          # Route group
│   ├── (dashboard)/     # Route group
│   ├── api/             # API routes
│   └── layout.tsx       # Root (providers only)
├── components/
│   └── layouts/         # Header, Sidebar, etc.
├── hooks/               # React hooks
├── lib/
│   ├── auth.ts          # Auth.js (backoffice only)
│   ├── prisma.ts        # Prisma client
│   ├── constants/       # Routes, roles
│   └── env/             # Environment variables
├── messages/            # i18n (7 modules: common, navigation, home, actions, auth, dashboard, errors)
└── middleware.ts        # Auth middleware (backoffice only)
```

**Component Naming:**

```
apps/{app}/src/app/{route}/_components/
├── ComponentName.tsx
├── ComponentName.styles.ts  # If complex
└── ComponentName.test.tsx   # Optional in apps
```

⚠️ **Underscore prefix (`_components/`):** Next.js 15 ignores `_folders` in
routing
