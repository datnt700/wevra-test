# Tavia - AI Agent Instructions

Tavia is a Next.js 15 serverless café/restaurant booking platform with dual
interfaces for clients (booking tables) and owners (managing bookings and
venues). Built as a Turborepo monorepo with pnpm workspaces.

## Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router) with React Server Components
- **Auth**: Auth.js (NextAuth) with role-based access (client/owner)
- **Database**: PostgreSQL via Prisma ORM (Supabase or Neon)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Realtime**: Supabase Realtime or Pusher Channels for live booking updates
- **Notifications**: Resend/SendGrid (email) + FCM (push)
- **Payments**: Stripe (optional, for deposits)
- **Package Manager**: pnpm v10.17.1 with catalog dependencies
- **Monorepo**: Turborepo for build orchestration and caching
- **Deployment**: Vercel (fully serverless)
- **Dev Tools**: ESLint 9, Prettier, Husky, Commitlint, Lint-staged, Commitizen
- **CI/CD**: GitHub Actions for automated testing, linting, and deployment

## Monorepo Structure

```
tavia/
├── apps/
│   ├── web/              # Next.js 15 app (client + owner interfaces + API routes)
│   └── docs/             # Storybook documentation
├── packages/
│   ├── core/             # Shared UI components library
│   ├── types/            # Shared TypeScript types & DTOs
│   ├── utils/            # Shared validation & formatting logic
│   ├── config/           # Shared configs (ESLint, TS, Prettier)
│   ├── eslint-config/    # ESLint configurations
│   └── typescript-config/ # TypeScript configurations
├── pnpm-workspace.yaml   # Workspace config with catalogs
├── turbo.json            # Turborepo pipeline config
└── package.json          # Root package with catalog dependencies
```

## Critical Patterns

### pnpm Catalog Dependencies (ALWAYS USE)

**NEVER use specific versions in package.json** - use `catalog:` or named
catalogs instead for consistency across the monorepo.

**Available Catalogs**:

- `catalog:` - Main catalog (most dependencies)
- `catalog:react18` - React 18.x ecosystem
- `catalog:emotion` - Emotion styling library
- `catalog:next14` - Next.js 14.x (legacy)
- `catalog:next15` - Next.js 15.x with React 19 RC

**Common Patterns**:

```json
{
  "dependencies": {
    "next": "catalog:",
    "react": "catalog:",
    "@tanstack/react-query": "catalog:",
    "@tavia/core": "workspace:*" // Internal workspace packages
  },
  "devDependencies": {
    "@types/node": "catalog:",
    "typescript": "catalog:",
    "eslint": "catalog:"
  }
}
```

**Catalog Definition** (in `pnpm-workspace.yaml`):

```yaml
catalog:
  next: ^15.5.0
  react: ^19.1.0
  '@types/node': ^22.15.3
  typescript: ^5.6.3
  # ... see pnpm-workspace.yaml for complete list
```

**Rules**:

- Use `catalog:` for all dependencies defined in the root catalog
- Use `workspace:*` for internal package dependencies (`@tavia/core`,
  `@repo/typescript-config`)
- When adding new dependencies, add them to `pnpm-workspace.yaml` catalog first
- Run `pnpm install` from root after catalog changes

### Serverless-First Architecture

**All backend logic runs as serverless functions** via Next.js API routes. No
traditional server or long-running processes.

**API Route Structure**:

```
apps/web/src/app/api/
├── auth/
│   └── [...nextauth]/route.ts    # NextAuth handlers
├── bookings/
│   ├── route.ts                  # GET /api/bookings, POST /api/bookings
│   ├── [id]/route.ts             # GET/PUT/DELETE /api/bookings/:id
│   └── [id]/confirm/route.ts     # POST /api/bookings/:id/confirm
├── cafes/
│   ├── route.ts                  # GET /api/cafes, POST /api/cafes (owner)
│   ├── [id]/route.ts             # GET/PUT/DELETE /api/cafes/:id
│   └── [id]/availability/route.ts # GET /api/cafes/:id/availability
└── owner/
    ├── dashboard/route.ts        # GET /api/owner/dashboard
    └── bookings/route.ts         # GET /api/owner/bookings
```

**Server Action Pattern** (preferred over API routes for mutations):

```typescript
'use server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { bookingSchema } from '@/schemas/booking';

export async function createBooking(input: unknown) {
  // 1. Authentication
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' };
  }

  // 2. Validation
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  // 3. Authorization (role check)
  if (session.user.role !== 'CLIENT') {
    return { success: false, error: 'Only clients can create bookings' };
  }

  // 4. Business logic with transaction (atomic booking)
  try {
    const booking = await prisma.$transaction(async (tx) => {
      // Check availability
      const existingBooking = await tx.booking.findFirst({
        where: {
          cafeId: parsed.data.cafeId,
          date: parsed.data.date,
          timeSlot: parsed.data.timeSlot,
          status: { in: ['PENDING', 'CONFIRMED'] },
        },
      });

      if (existingBooking) {
        throw new Error('Time slot not available');
      }

      // Create booking
      return tx.booking.create({
        data: {
          ...parsed.data,
          userId: session.user.id,
          status: 'PENDING',
        },
      });
    });

    revalidatePath('/bookings');
    return { success: true, data: booking };
  } catch (error) {
    console.error('Booking error:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create booking',
    };
  }
}
```

**Key Principles**:

- **Stateless**: No server-side sessions or long-running state
- **Atomic operations**: Use Prisma transactions for bookings to prevent
  double-booking
- **Edge-compatible**: Avoid Node.js-specific APIs when possible
- **Short execution**: Keep functions under 10s execution time (Vercel limit)
- **Return structured responses**: `{ success: boolean, data?, error? }`

### Database Schema (Prisma)

**Core Models**:

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          UserRole  @default(CLIENT) // CLIENT | OWNER
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  bookings      Booking[]
  ownedCafes    Cafe[]
  notifications Notification[]
}

model Cafe {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique
  description   String?
  address       String
  city          String
  country       String
  cuisine       String[]
  images        String[]
  openingHours  Json      // { monday: { open: "09:00", close: "22:00" }, ... }
  capacity      Int
  ownerId       String
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  owner         User      @relation(fields: [ownerId], references: [id])
  bookings      Booking[]
  reviews       Review[]

  @@index([city, cuisine])
  @@index([ownerId])
}

model Booking {
  id            String         @id @default(cuid())
  date          DateTime       // Booking date
  timeSlot      String         // "12:00", "12:30", etc.
  partySize     Int
  status        BookingStatus  @default(PENDING) // PENDING | CONFIRMED | CANCELLED | COMPLETED
  specialRequest String?
  userId        String
  cafeId        String
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  user          User          @relation(fields: [userId], references: [id])
  cafe          Cafe          @relation(fields: [cafeId], references: [id])

  @@unique([cafeId, date, timeSlot]) // Prevent double booking
  @@index([userId])
  @@index([cafeId, date, status])
}

model Review {
  id        String   @id @default(cuid())
  rating    Int      // 1-5
  comment   String?
  userId    String
  cafeId    String
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
  cafe      Cafe     @relation(fields: [cafeId], references: [id])

  @@unique([userId, cafeId]) // One review per user per cafe
}

model Notification {
  id        String           @id @default(cuid())
  type      NotificationType // BOOKING_CONFIRMED | BOOKING_CANCELLED | REMINDER | etc.
  title     String
  message   String
  isRead    Boolean          @default(false)
  userId    String
  metadata  Json?            // { bookingId, cafeId, etc. }
  createdAt DateTime         @default(now())

  user      User             @relation(fields: [userId], references: [id])

  @@index([userId, isRead])
}

enum UserRole {
  CLIENT
  OWNER
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

enum NotificationType {
  BOOKING_CONFIRMED
  BOOKING_CANCELLED
  BOOKING_REMINDER
  BOOKING_REQUEST
}
```

**Migration Workflow**:

```bash
# ALWAYS use migrate dev (creates migration files for production)
npx prisma migrate dev --name add_booking_table

# NEVER use db push (doesn't create migration files)
# ❌ npx prisma db push

# Apply migrations in production
npx prisma migrate deploy
```

### Role-Based Access Control

**Two primary roles**: CLIENT (books tables) and OWNER (manages cafés).

**Server Action Pattern**:

```typescript
export async function createCafe(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' };
  }

  // OWNER role required
  if (session.user.role !== 'OWNER') {
    return { success: false, error: 'Only owners can create cafés' };
  }

  // ... rest of logic
}
```

**Route Protection** (middleware or layout):

```typescript
// apps/web/src/middleware.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const userRole = req.auth?.user?.role;

  // Owner routes
  if (pathname.startsWith('/owner') && userRole !== 'OWNER') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Client routes
  if (pathname.startsWith('/bookings') && !req.auth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/owner/:path*', '/bookings/:path*'],
};
```

### Atomic Booking Logic (CRITICAL)

**Prevent double-booking** using Prisma transactions and database constraints.

**Pattern**:

```typescript
export async function createBooking(input: BookingInput) {
  // ... auth & validation

  const booking = await prisma.$transaction(async (tx) => {
    // 1. Check availability (within transaction)
    const conflictingBooking = await tx.booking.findFirst({
      where: {
        cafeId: input.cafeId,
        date: input.date,
        timeSlot: input.timeSlot,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (conflictingBooking) {
      throw new Error('Time slot already booked');
    }

    // 2. Check cafe capacity
    const cafe = await tx.cafe.findUnique({
      where: { id: input.cafeId },
      select: { capacity: true },
    });

    const totalBookings = await tx.booking.count({
      where: {
        cafeId: input.cafeId,
        date: input.date,
        timeSlot: input.timeSlot,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (cafe && totalBookings + input.partySize > cafe.capacity) {
      throw new Error('Cafe capacity exceeded');
    }

    // 3. Create booking
    return tx.booking.create({
      data: {
        ...input,
        status: 'PENDING',
      },
    });
  });

  // 4. Send notifications (outside transaction)
  await sendBookingConfirmationEmail(booking.id);

  revalidatePath('/bookings');
  return { success: true, data: booking };
}
```

**Database Constraint**:

```prisma
model Booking {
  // ...
  @@unique([cafeId, date, timeSlot]) // Ensures uniqueness at DB level
}
```

### Timezone Management

**Store all timestamps in UTC**, display in user's local timezone.

**Pattern**:

```typescript
// Store in UTC
const booking = await prisma.booking.create({
  data: {
    date: new Date('2025-10-15T00:00:00Z'), // UTC midnight
    timeSlot: '12:00', // Store as string for simplicity
  },
});

// Display in user's timezone (client-side)
import { formatInTimeZone } from 'date-fns-tz';

export function BookingCard({ booking }: { booking: Booking }) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = formatInTimeZone(
    booking.date,
    userTimezone,
    'PPP' // "Oct 15, 2025"
  );

  return <div>{localDate} at {booking.timeSlot}</div>;
}
```

### Real-time Updates

**Use Supabase Realtime** for live booking updates between clients and owners.

**Setup**:

```typescript
// apps/web/src/lib/realtime.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Subscribe to booking changes
export function useBookingUpdates(cafeId: string) {
  useEffect(() => {
    const channel = supabase
      .channel(`cafe-${cafeId}-bookings`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Booking',
          filter: `cafeId=eq.${cafeId}`,
        },
        (payload) => {
          // Update UI with payload.new
          queryClient.invalidateQueries(['bookings', cafeId]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [cafeId]);
}
```

### Component Architecture

**Follow clean architecture** with services, hooks, and components.

```
apps/web/src/features/bookings/
├── _services/
│   └── booking.service.ts       # API calls to server actions
├── _hooks/
│   └── useBookings.ts            # React Query hooks
├── _components/
│   ├── booking-list.tsx
│   ├── booking-form.tsx
│   └── booking-card.tsx
└── page.tsx                      # Route page
```

**Service Layer**:

```typescript
// _services/booking.service.ts
import { createBooking as createBookingAction } from '@/actions/booking';

export const bookingService = {
  async createBooking(input: BookingInput) {
    const result = await createBookingAction(input);
    if (!result.success) throw new Error(result.error);
    return result.data;
  },
};
```

**Hook Layer**:

```typescript
// _hooks/useBookings.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '../_services/booking.service';

export const bookingKeys = {
  all: ['bookings'] as const,
  list: (userId: string) => [...bookingKeys.all, 'list', userId] as const,
};

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      toast.success('Booking created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
```

**Component Layer**:

```typescript
// _components/booking-form.tsx
'use client';
import { useCreateBooking } from '../_hooks/useBookings';

export function BookingForm({ cafeId }: { cafeId: string }) {
  const createBooking = useCreateBooking();

  const handleSubmit = (data: BookingInput) => {
    createBooking.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={createBooking.isPending}>
        {createBooking.isPending ? 'Creating...' : 'Book Now'}
      </button>
    </form>
  );
}
```

## Development Commands

```bash
# Development
pnpm dev                                        # Start all apps (web + docs)
pnpm dev --filter=web                           # Start web app only
pnpm dev:web                                    # Alias for web app
pnpm dev:storybook                              # Start Storybook

# Building
pnpm build                                      # Build all apps
pnpm build --filter=web                         # Build web app only

# Code Quality
pnpm lint                                       # Lint all packages (ESLint 9)
pnpm lint:fix                                   # Auto-fix linting issues
pnpm format                                     # Format with Prettier
pnpm format:check                               # Check formatting
pnpm type-check                                 # TypeScript type checking

# Git & Commits
pnpm commit                                     # Interactive commit (Commitizen)
# Git hooks run automatically via Husky

# Database
npx prisma migrate dev --name add_feature      # Create & apply migration
npx prisma migrate deploy                      # Apply migrations (production)
npx prisma studio                              # GUI for database
npx prisma generate                            # Generate Prisma Client

# Dependencies
pnpm add <package> --filter=web                # Add to specific workspace
pnpm add -w <package>                          # Add to root workspace

# Cleanup
pnpm clean                                     # Remove build artifacts

# Turbo
pnpm turbo run build                           # Build with caching
pnpm turbo run lint                            # Lint with caching
pnpm turbo run dev --no-cache                  # Dev without cache
```

## Development Tools & Workflow

### ESLint 9 (Flat Config)

**Architecture:**

- Root level: `eslint.config.js` - Workspace-wide baseline rules
- Shared configs: `packages/eslint-config/` - Reusable configs
  - `base.js` - Core rules for all workspaces
  - `next.js` - Next.js app configuration
  - `react-internal.js` - React library configuration
- Workspace configs: Each app/package has its own `eslint.config.js`

**Example workspace config:**

```javascript
import { nextJsConfig } from '@repo/eslint-config/next.js';

export default [
  ...nextJsConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
```

**Key rules:**

- Use ESLint 9 flat config format (not `.eslintrc`)
- Extend shared configs, add workspace-specific overrides
- All workspaces use `catalog:` for ESLint dependencies
- TypeScript ESLint v8.40.0 for type-aware linting
- Import paths: Use bare specifiers (no `.js` extension) when importing from
  `@repo/eslint-config`

**@tavia/core ESLint Configuration:**

```javascript
// packages/core/eslint.config.js
import { config as reactConfig } from '@repo/eslint-config/react-internal';

export default [
  ...reactConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow any for flexibility
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // Allow Emotion css prop
      'react/jsx-no-target-blank': 'warn',
      'react/no-children-prop': 'warn',
      'react-hooks/exhaustive-deps': 'warn', // Warn instead of error
      'react-hooks/set-state-in-effect': 'off', // Disabled - intentional pattern
      'react-hooks/incompatible-library': 'off', // Disabled for TanStack Table
      'react-hooks/use-memo': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.turbo/**',
      'coverage/**',
      'tests/setup.ts',
    ],
  },
];
```

**Package-level lint scripts:**

- `@tavia/core`: `--max-warnings 10` (allows up to 10 warnings for React hooks
  edge cases)
- `@tavia/docs`: `--max-warnings 10` (allows up to 10 warnings for Storybook
  stories)
- `web`, `@repo/ui`: `--max-warnings 0` (strict - no warnings allowed)

**Handling unused variables:**

Prefix unused parameters/variables with `_` to satisfy ESLint:

```typescript
// ✅ Correct
export const Component = ({ value, variant: _variant, ...other }: Props) => {
  // _variant is intentionally unused
  return <div>{value}</div>;
};

// ❌ Wrong
export const Component = ({ value, variant, ...other }: Props) => {
  // Warning: 'variant' is defined but never used
  return <div>{value}</div>;
};
```

### Prettier

**Configuration:** `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Usage:**

- Auto-formats on save (VS Code settings)
- Runs on pre-commit via lint-staged
- Tailwind CSS class sorting integrated
- Manual: `pnpm format`

### Husky (Git Hooks)

**Hooks configured:**

1. **pre-commit** (`.husky/pre-commit`): Runs `pnpm lint-staged`
   - Formats staged files with Prettier
   - Type checks TypeScript files
2. **commit-msg** (`.husky/commit-msg`): Validates commit message format

**Setup:** Husky v9 initialized via `husky init`, runs via `prepare` script

### Lint-staged

**Configuration:** `.lintstagedrc.js`

```javascript
module.exports = {
  '*.{js,jsx,ts,tsx,json,md,mdx,css,scss,yaml,yml}': ['prettier --write'],
  '*.{ts,tsx}': [() => 'pnpm type-check'],
};
```

**Runs on pre-commit:**

- Formats all staged files
- Type checks TypeScript files
- Fast - only processes staged files

### Commitlint (Conventional Commits)

**Configuration:** `commitlint.config.js`

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};
```

**Commit message format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Examples:**

```bash
feat(auth): add Google OAuth login
fix(booking): prevent double booking race condition
docs(readme): update installation instructions
refactor(core): migrate to Lucide icons
chore(deps): update Next.js to v15.5.0
```

### Commitizen

**Interactive commits:**

```bash
# Instead of git commit -m "..."
pnpm commit
# Follow prompts for type, scope, subject, body, footer
```

**Benefits:**

- Ensures conventional commit format
- Prompts for all required fields
- Generates proper commit messages automatically

### VS Code Integration

**Settings** (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.workingDirectories": [{ "mode": "auto" }],
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

**Recommended extensions** (`.vscode/extensions.json`):

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- Error Lens
- Pretty TypeScript Errors

### Turborepo Caching

**Tasks cached:**

- `build` - Build outputs
- `lint` - Linting results
- `type-check` - Type checking results
- `test` - Test results

**Benefits:**

- Only re-runs when relevant files change
- Shared cache across team (with Remote Cache)
- Parallel execution of independent tasks

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feat/your-feature

# 2. Make changes
# Edit files...

# 3. Stage changes
git add .

# 4. Pre-commit hook runs automatically
# - Formats staged files with Prettier
# - Type checks TypeScript

# 5. Commit with Commitizen
pnpm commit
# Select type, enter scope, subject, etc.

# 6. Commit-msg hook validates format

# 7. Push changes
git push origin feat/your-feature

# 8. Open Pull Request
# - CI pipeline runs automatically
# - Code review via PR template
```

### CI/CD Pipeline

**GitHub Actions Workflows:**

1. **CI Workflow** (`.github/workflows/ci.yml`):
   - Triggers on push to `main`/`develop` and all PRs
   - **Jobs:**
     - `lint` - ESLint validation across all workspaces
     - `typecheck` - TypeScript type checking
     - `build` - Build all apps and packages with Turborepo
     - `test` - Run unit tests (Vitest)
     - `commitlint` - Validate conventional commits (PRs only)
   - **Caching:**
     - pnpm store cache
     - Turborepo cache for faster builds
   - **Parallel execution** for faster CI runs

2. **Deploy Workflow** (`.github/workflows/deploy.yml`):
   - Triggers on push to `main` branch
   - Deploys to Vercel production
   - **Required secrets:**
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`

3. **Dependabot** (`.github/dependabot.yml`):
   - Weekly dependency updates (Mondays)
   - Grouped updates for related packages
   - Conventional commit messages
   - **Groups:**
     - Next.js, React, ESLint, Storybook, Prisma, Testing, Dev Tools

**Pull Request Process:**

1. Fill out PR template (`.github/PULL_REQUEST_TEMPLATE.md`)
2. CI pipeline runs all checks
3. Code review by CODEOWNERS
4. Merge to `main` triggers deployment

**Issue Templates:**

- **Bug Report** (`.github/ISSUE_TEMPLATE/bug_report.yml`)
- **Feature Request** (`.github/ISSUE_TEMPLATE/feature_request.yml`)
- **Documentation** (`.github/ISSUE_TEMPLATE/documentation.yml`)

**Code Owners** (`.github/CODEOWNERS`):

- Automatic review requests for specific paths
- Team-based ownership (maintainers, web-team, ui-team, etc.)

# 6. Commit-msg hook validates format

# 7. Push changes

git push origin feat/your-feature

```

### Node.js Version

**Specified in `.nvmrc`:**

```

18.18.0

````

**Use nvm to switch:**

```bash
nvm use
# or
nvm install
````

### pnpm Configuration

**`.npmrc` settings:**

```ini
auto-install-peers=true
strict-peer-dependencies=false
link-workspace-packages=true
prefer-workspace-packages=true
resolve-peers-from-workspace-root=true
```

**Catalog dependencies:** All dev tools use `catalog:` references from
`pnpm-workspace.yaml`

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tavia"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Supabase (Realtime)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Email (Resend)
RESEND_API_KEY="re_xxx"

# Stripe (optional)
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"
```

## Key Files to Reference

- `pnpm-workspace.yaml` - Catalog dependencies and workspace config
- `turbo.json` - Turborepo pipeline configuration
- `apps/web/src/app/api/` - Serverless API routes
- `apps/web/src/actions/` - Server actions (preferred for mutations)
- `apps/web/src/lib/auth.ts` - NextAuth configuration
- `apps/web/src/lib/prisma.ts` - Prisma client singleton
- `packages/core/` - Shared UI component library
- `packages/types/` - Shared TypeScript types
- `prisma/schema.prisma` - Database schema

## @tavia/core - UI Component Library

### Architecture: Flat UI Structure

**IMPORTANT**: `@tavia/core` follows a **Flat UI Structure** inspired by
shadcn/ui and Radix UI. All 54 components are organized in a single `ui/` folder
by component name, NOT by category.

**Directory Structure**:

```
packages/core/
├── src/
│   ├── ui/                    # All 54 UI components (FLAT STRUCTURE)
│   │   ├── avatar/
│   │   ├── badge/
│   │   ├── button/
│   │   ├── modal/
│   │   ├── input/
│   │   └── ... (54 components total)
│   ├── theme/                 # Theme tokens and configuration
│   │   ├── tokens/
│   │   ├── breakpoints.ts
│   │   ├── global.tsx
│   │   └── theme.ts
│   ├── providers/             # React context providers
│   │   └── ThemeContext.tsx
│   ├── lib/                   # Utility functions
│   │   ├── date.ts
│   │   ├── parse.ts
│   │   └── constants/
│   ├── hooks/                 # Custom React hooks
│   │   └── useWindowSize.ts
│   ├── icons/                 # Lucide icon wrapper
│   ├── tokens/                # Design tokens (colors, typography)
│   ├── types/                 # TypeScript type definitions
│   └── main.ts                # Main export file
├── tests/                     # Vitest tests
├── README.md                  # Package documentation
├── CHANGELOG.md               # Version history
├── package.json
└── tsconfig.json
```

### Component Organization (54 Components)

Components are categorized conceptually for documentation purposes, but **ALL
live in `ui/` folder**:

#### Base Components (8)

- `Avatar` - User avatars with images or initials
- `Badge` - Status badges and labels
- `Button` - Primary UI action buttons
- `Code` - Inline code snippets
- `Icon` - Lucide icon wrapper
- `Image` - Responsive images with lazy loading
- `Spinner` - Loading spinners
- `Tag` - Removable tags/chips

#### Radix UI Components (8)

- `Accordion` - Collapsible content sections
- `Checkbox` / `CheckboxCard` - Checkbox inputs
- `DropdownMenu` - Context menus and dropdowns
- `Modal` - Dialog modals
- `Popover` - Floating content panels
- `Radio` / `RadioGroup` / `RadioCard` - Radio inputs
- `Tabs` - Tab navigation
- `Tooltip` - Hover tooltips

#### Form Components (16)

- `Input` / `InputText` - Text inputs with validation
- `InputNumber` / `Stepper` - Numeric inputs with steppers
- `InputSearch` - Search inputs with icons
- `InputTags` - Multi-value tag inputs
- `TextArea` - Multi-line text inputs
- `Select` - Dropdown selects
- `Combobox` - Searchable select with autocomplete
- `Switch` - Toggle switches
- `Slider` - Range sliders
- `Label` - Form labels
- `Field` - Form field wrapper
- `ButtonGroup` - Button groups
- `Form` - Form wrapper with validation
- `FileUpload` - File upload with drag & drop
- `ImageUpload` - Image upload with cropping
- `RichTextEditor` - WYSIWYG editor (TipTap)

#### Dialog Components (4)

- `Alert` - Alert notifications
- `Drawer` - Side panel drawers
- `MenuBar` - Menu bar navigation
- `Toast` - Toast notifications

#### Layout Components (6)

- `Card` - Card containers
- `Divider` - Visual dividers
- `LoadingScreen` - Full-screen loaders
- `ScrollBox` - Scrollable containers
- `Skeleton` - Loading skeletons
- `ThemeProvider` - Theme context wrapper

#### Navigation Components (4)

- `Breadcrumb` - Breadcrumb trails
- `Link` - Navigation links
- `Pagination` - Page navigation
- `Sidebar` - Collapsible sidebars

#### State Components (5)

- `EmptyState` - Empty state placeholders
- `ErrorState` - Error state displays
- `LoadingLogo` - Animated logo loader
- `LoadingState` - Loading state with spinner
- `ProgressBar` - Progress indicators

#### Table Components (2)

- `DataTable` - Data table with TanStack Table
- `Table` - Feature-rich table with sorting, search, pagination

### Import Patterns

**✅ Correct - Package-level imports (PREFERRED)**:

```typescript
import { Button, Modal, Input, Card } from '@tavia/core';
```

**✅ Also Correct - Direct component imports**:

```typescript
import { Button } from '@tavia/core/ui/button';
import { Modal } from '@tavia/core/ui/modal';
```

**❌ WRONG - Old categorized paths (DEPRECATED)**:

```typescript
// These paths no longer exist!
import { Button } from '@tavia/core/components/form/Button';
import { Modal } from '@tavia/core/components/dialogs/Modal';
```

### Component Structure Pattern

Each component MUST follow this exact structure:

```
ui/component-name/
├── components/
│   ├── ComponentName.tsx           # Component implementation
│   ├── ComponentName.styles.ts     # Emotion styles
│   └── index.ts                    # Component exports
├── types/
│   ├── ComponentNameProps.ts       # TypeScript prop types
│   └── index.ts                    # Type exports
├── tests/
│   └── ComponentName.test.tsx      # Vitest tests (15-50 tests)
└── index.ts                        # Barrel export
```

**CRITICAL RULES**:

1. **Folder name**: lowercase-with-dashes (e.g., `empty-state`, `button`)
2. **Component name**: PascalCase (e.g., `EmptyState`, `Button`)
3. **File naming**: `ComponentName.tsx`, `ComponentName.styles.ts`,
   `ComponentName.test.tsx`
4. **Types folder**: MUST have separate `ComponentNameProps.ts` file
5. **Tests folder**: MUST exist with comprehensive tests (minimum 15 tests)

### Styling: 100% Emotion with Theme Tokens

**ALL components use Emotion** for styling:

- `@emotion/react` v11.14.0
- `@emotion/styled` v11.14.1
- `@emotion/cache` v11.14.0

**NO SCSS modules** - All legacy `.module.scss` files have been removed and
converted to Emotion.

#### Emotion Styling Pattern (MUST FOLLOW)

**1. Styles File Structure** (`ComponentName.styles.ts`):

```typescript
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

type Variant = 'success' | 'warning' | 'danger';

interface StyledWrapperProps {
  $variant?: Variant;
  $isFilled?: boolean;
}

/**
 * Helper function for variant color mapping
 */
const getVariantColors = (variant: Variant = 'success') => {
  const variantMap: Record<Variant, VariantColors> = {
    success: {
      base: cssVars.colorSuccess,
      light: cssVars.colorSuccessLight,
      dark: cssVars.colorGreenDark,
    },
    warning: {
      base: cssVars.colorWarning,
      light: cssVars.colorWarningLight,
      dark: cssVars.colorYellowDark,
    },
    danger: {
      base: cssVars.colorDanger,
      light: cssVars.colorDangerLight,
      dark: cssVars.colorRedDark,
    },
  };
  return variantMap[variant];
};

/**
 * Styled components for the ComponentName.
 */
export const Styled: any = {
  Wrapper: styled.div<StyledWrapperProps>`
    padding: 0.75rem 1rem;
    border-radius: ${radii.md};

    ${({ $variant = 'success', $isFilled = false }) => {
      const colors = getVariantColors($variant);

      if ($isFilled) {
        return `
          color: ${colors.dark};
          background-color: ${colors.light};
          border: 1px solid ${colors.base};
        `;
      }

      return `
        color: ${colors.base};
        background-color: ${colors.light}20; // 20 = 12% opacity
        border: 1px solid ${colors.base};
      `;
    }}

    &:hover {
      opacity: 0.9;
    }
  `,

  Content: styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${cssVars.gray900};
  `,
};
```

**2. Component File Structure** (`ComponentName.tsx`):

```typescript
import { Styled } from './ComponentName.styles';
import { ComponentNameProps } from '../types';

/**
 * A reusable ComponentName component designed to [purpose].
 *
 * Features:
 * - [Feature 1]
 * - [Feature 2]
 * - Styled using Emotion's `styled` API with theme tokens for modularity and reusability.
 *
 * Props:
 * - `variant`: The variant of the component (`success`, `warning`, `danger`).
 * - `isFilled`: Boolean indicating whether the component should have a filled background.
 */
export const ComponentName = ({
  variant = 'success',
  isFilled = false,
  children,
  className: _className, // Transient prop (not applied to DOM)
  ...other
}: ComponentNameProps) => {
  return (
    <Styled.Wrapper $variant={variant} $isFilled={isFilled} {...other}>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Wrapper>
  );
};

ComponentName.displayName = 'ComponentName';
```

**3. Types File Structure** (`types/ComponentNameProps.ts`):

```typescript
import React from 'react';

/**
 * Props for the ComponentName component.
 */
export interface ComponentNameProps {
  /**
   * Custom content to display.
   */
  children?: React.ReactNode;

  /**
   * The variant of the component (`success`, `warning`, `danger`).
   * - Default: 'success'
   */
  variant?: 'success' | 'warning' | 'danger';

  /**
   * Boolean indicating whether the component should have a filled background.
   * - Default: false
   */
  isFilled?: boolean;

  /**
   * Additional CSS class for styling (transient prop, not applied to DOM).
   */
  className?: string;
}
```

**4. Types Index** (`types/index.ts`):

```typescript
export * from './ComponentNameProps';
```

#### Critical Emotion Best Practices

**MUST DO**:

1. ✅ **Import theme tokens directly**:

   ```typescript
   import { cssVars } from '../../../theme/tokens/colors';
   import { radii } from '../../../theme/tokens/radii';
   ```

2. ✅ **Use `export const Styled: any = {` pattern** (NOT separate const
   declarations):

   ```typescript
   // ✅ CORRECT
   export const Styled: any = {
     Wrapper: styled.div`...`,
     Content: styled.div`...`,
   };

   // ❌ WRONG
   const StyledWrapper = styled.div`...`;
   const StyledContent = styled.div`...`;
   export const Styled = { Wrapper: StyledWrapper, Content: StyledContent };
   ```

3. ✅ **Prefix transient props with `$`** (avoid DOM warnings):

   ```typescript
   // Component
   <Styled.Wrapper $variant={variant} $isFilled={isFilled} />

   // Styles
   styled.div<{ $variant?: string; $isFilled?: boolean }>`
   ```

4. ✅ **Use helper functions for variant mapping**:

   ```typescript
   const getVariantColors = (variant: Variant) => { ... };
   ```

5. ✅ **Use template literals with destructured props**:

   ```typescript
   ${({ $variant = 'success', $isFilled = false }) => {
     const colors = getVariantColors($variant);
     return `...`;
   }}
   ```

6. ✅ **Use `radii` tokens for border-radius** (NEVER hardcode px):

   ```typescript
   border-radius: ${radii.md}; // ✅ CORRECT
   border-radius: 8px;         // ❌ WRONG
   ```

7. ✅ **Add hex opacity for transparent backgrounds**:

   ```typescript
   background-color: ${colors.light}20; // 20 = 12% opacity
   ```

8. ✅ **Keep Radix CSS variables** (don't replace `--radix-*`):
   ```typescript
   height: var(--radix-accordion-content-height); // ✅ Keep these
   ```

**NEVER DO**:

1. ❌ **Don't use CSS variables** (they don't exist):

   ```typescript
   color: var(--color-${variant}-text); // ❌ WRONG
   ```

2. ❌ **Don't hardcode colors or radii**:

   ```typescript
   color: #ff0000;           // ❌ WRONG
   border-radius: 12px;      // ❌ WRONG
   ```

3. ❌ **Don't use props without `$` prefix for styled components**:

   ```typescript
   styled.div<{ variant?: string }>`  // ❌ Causes DOM warnings
   ```

4. ❌ **Don't export without `Styled` object**:
   ```typescript
   export const Wrapper = styled.div`...`; // ❌ WRONG
   ```

#### Available Theme Tokens

**Colors** (from `theme/tokens/colors.ts`):

**Signal Colors**:

- Success: `cssVars.colorSuccess`, `cssVars.colorSuccessLight`,
  `cssVars.colorGreenDark`
- Warning: `cssVars.colorWarning`, `cssVars.colorWarningLight`,
  `cssVars.colorYellowDark`
- Danger: `cssVars.colorDanger`, `cssVars.colorDangerLight`,
  `cssVars.colorRedDark`
- Info: `cssVars.colorCyan`, `cssVars.colorCyanLight`, `cssVars.colorCyanDark`

**Grays**: `cssVars.gray0` to `cssVars.gray1000` (comprehensive scale)

- Common: `gray100`, `gray200`, `gray300`, `gray400`, `gray500`, `gray600`,
  `gray700`, `gray800`, `gray900`

**Main Colors**: `cssVars.mainColor`, `cssVars.mainColorLight1-9`,
`cssVars.mainColorDark1-6`

**Border Radius** (from `theme/tokens/radii.ts`):

- `radii.none` - 0
- `radii.sm` - 0.25rem (4px)
- `radii.md` - 0.5rem (8px)
- `radii.lg` - 0.75rem (12px)
- `radii.xl` - 1rem (16px)
- `radii.full` - 9999px (fully rounded)

**Spacing** (use rem units):

- `0.25rem` (4px), `0.5rem` (8px), `0.75rem` (12px), `1rem` (16px), `1.5rem`
  (24px), `2rem` (32px)

#### JSDoc Documentation Pattern

**Component JSDoc** (above component function):

```typescript
/**
 * A reusable [ComponentName] component designed to [purpose].
 *
 * Features:
 * - [Feature 1 with details]
 * - [Feature 2 with details]
 * - Styled using Emotion's `styled` API with theme tokens for modularity and reusability.
 * - [Any Radix UI or special implementation details]
 *
 * Props:
 * - `propName`: Brief description with type info.
 * - `variant`: The variant (`value1`, `value2`). Default: 'value1'.
 * - `isActive`: Boolean for state. Default: false.
 */
```

**Types JSDoc** (in `ComponentNameProps.ts`):

```typescript
/**
 * Props for the [ComponentName] component.
 */
export interface ComponentNameProps {
  /**
   * Detailed description of the prop.
   * Include usage examples if needed.
   */
  propName: string;

  /**
   * The variant of the component (`success`, `warning`, `danger`).
   * - Default: 'success'
   */
  variant?: 'success' | 'warning' | 'danger';

  /**
   * @deprecated This prop is not currently implemented.
   */
  deprecatedProp?: string;
}
```

**Styles JSDoc** (above `Styled` export):

```typescript
/**
 * Styled components for the [ComponentName].
 */
export const Styled: any = { ... };
```

### Theme System

**Theme tokens** are defined in:

- `src/theme/tokens/` - Colors, typography, spacing
- `src/theme/theme.ts` - Main theme configuration
- `src/tokens/` - Design system tokens

**Usage**:

```typescript
import { ThemeWrapper, theme } from '@tavia/core';

function App() {
  return (
    <ThemeWrapper theme={theme}>
      {/* Your components */}
    </ThemeWrapper>
  );
}
```

### Storybook Documentation

**Location**: `apps/docs/src/stories/core/`

**Structure** (Category-based, NOT atomic design):

```
apps/docs/src/stories/core/
├── base/           # Base component stories (Button, Badge, etc.)
├── radix/          # Radix UI component stories (Modal, Checkbox, etc.)
├── form/           # Form component stories (Input, Select, etc.)
├── dialog/         # Dialog component stories (Alert, Drawer, etc.)
├── layout/         # Layout component stories (Card, Divider, etc.)
├── navigation/     # Navigation component stories (Link, Pagination, etc.)
├── state/          # State component stories (EmptyState, LoadingState, etc.)
└── table/          # Table component stories (DataTable, Table)
```

**Story metadata pattern**:

```typescript
const meta = {
  title: 'Core/Base/Button', // Core/Category/Component
  component: Button,
  // ...
};
```

**❌ OLD (atomic design) - NO LONGER USED**:

- `atoms/`, `molecules/`, `organisms/` folders deleted
- Story titles like `Core/Atoms/Button` updated to `Core/Base/Button`

### Development Workflow

**Testing**:

```bash
cd packages/core
pnpm test component-name  # Test specific component
pnpm test                  # Run all tests
```

**Component Testing Best Practices**:

1. **Test Coverage** - Each component should have 15-50 tests covering:
   - Basic rendering (3-5 tests)
   - All variants/sizes (1 test per variant)
   - State changes (loading, disabled, active, etc.)
   - Event handlers (click, change, blur, etc.)
   - Accessibility (ARIA attributes, keyboard navigation)
   - Edge cases (empty strings, null values, undefined props)
   - Display name verification

2. **Test Organization** - Group tests with describe blocks:

   ```typescript
   describe('ComponentName', () => {
     describe('Basic Rendering', () => { ... });
     describe('Variants', () => { ... });
     describe('Event Handlers', () => { ... });
     describe('Accessibility', () => { ... });
     describe('Edge Cases', () => { ... });
   });
   ```

3. **Radix UI Testing** - Adjust expectations for Radix UI components:
   - Use `container.querySelector()` for multiple elements of same type
   - Check for Radix-specific attributes (`data-state`, `data-disabled`)
   - Test interactions may require `waitFor` for async behavior
   - Some props (like `name` on Checkbox) may not appear in DOM

4. **Test Examples**:

   ```typescript
   // Basic rendering
   it('should render with default props', () => {
     const { container } = render(<Component />);
     expect(container.firstChild).toBeTruthy();
   });

   // Variants
   it('should render success variant', () => {
     render(<Component variant="success" />);
     const element = screen.getByTestId('component');
     expect(element).toHaveAttribute('data-variant', 'success');
   });

   // Event handlers
   it('should call onClick when clicked', async () => {
     const handleClick = vi.fn();
     render(<Component onClick={handleClick} />);
     await userEvent.click(screen.getByRole('button'));
     expect(handleClick).toHaveBeenCalledTimes(1);
   });

   // Accessibility
   it('should have correct ARIA attributes', () => {
     render(<Component label="Test" />);
     expect(screen.getByRole('button')).toHaveAccessibleName('Test');
   });

   // Edge cases
   it('should handle undefined props gracefully', () => {
     const { container } = render(<Component title={undefined} />);
     expect(container.firstChild).toBeTruthy();
   });
   ```

**Type-checking**:

```bash
cd packages/core
pnpm type-check  # Must pass with 0 errors
```

**TypeScript Best Practices:**

1. **Return Type Inference** - Let TypeScript infer return types instead of
   explicit `: JSX.Element`

   ```typescript
   // ✅ Correct - TypeScript infers return type
   export const Component = ({ children }: Props) => {
     return <div>{children}</div>;
   };

   // ❌ Wrong - Explicit JSX.Element can cause namespace issues
   export const Component = ({ children }: Props): JSX.Element => {
     return <div>{children}</div>;
   };
   ```

2. **Empty Module Files** - Don't export from empty files

   ```typescript
   // ❌ Wrong - Causes "is not a module" errors
   // lib/index.ts
   export * from './parse'; // parse.ts is empty

   // ✅ Correct - Remove export or add content to parse.ts
   export * from './date';
   export * from './emotion-cache';
   ```

3. **Catch Blocks** - Omit unused error parameters

   ```typescript
   // ✅ Correct
   try {
     new URL(input);
   } catch {
     return { success: false, error: 'Invalid URL' };
   }

   // ❌ Wrong
   try {
     new URL(input);
   } catch (error) {
     // error is unused
     return { success: false, error: 'Invalid URL' };
   }
   ```

4. **Emotion css Prop** - Always add JSX pragma for components using css prop

   ```typescript
   // ✅ Correct
   /** @jsxImportSource @emotion/react */
   export const Tag = () => <div css={styles.wrapper}>...</div>;

   // ❌ Wrong - TypeScript error: Property 'css' does not exist
   export const Tag = () => <div css={styles.wrapper}>...</div>;
   ```

**Building**:

```bash
pnpm build  # Uses tsup for bundling
```

**Testing**:

```bash
pnpm test  # Vitest
```

**Storybook**:

```bash
pnpm dev:storybook  # View components interactively
```

### Key Principles

1. **Flat Structure** - All components in `ui/` folder, not categorized folders
2. **Emotion-only** - No SCSS, all styling via Emotion with direct theme token
   access
3. **Radix UI Primitives** - Accessible foundations for complex components
4. **Type-safe** - Full TypeScript coverage with exported types
5. **Tree-shakeable** - Import only what you need
6. **Storybook** - Category-based documentation (Base, Radix, Form, etc.)
7. **Lenient ESLint** - Allow warnings for edge cases (React hooks, TanStack
   Table)
8. **Inferred Types** - Let TypeScript infer return types, avoid explicit
   `: JSX.Element`

## Common Gotchas

1. **Always use catalog dependencies** - Never hardcode versions in package.json
2. **Use Prisma transactions** for bookings to prevent race conditions
3. **Store dates in UTC** - Convert to user timezone only on display
4. **Unique constraint on bookings** - `@@unique([cafeId, date, timeSlot])`
5. **Role-based access** - Always verify user role in server actions
6. **Import paths** - Remove `.js` extension when importing from
   `@repo/eslint-config`
7. **Unused variables** - Prefix with `_` to avoid ESLint warnings
8. **Empty modules** - Don't export from empty files (remove export or add
   content)
9. **Emotion css prop** - Add `/** @jsxImportSource @emotion/react */` pragma
10. **ESLint config imports** - Use bare specifiers:
    `@repo/eslint-config/react-internal` not `react-internal.js`
11. **Revalidate paths** after mutations for UI updates
12. **Handle null values** - Many fields are optional in the schema
13. **Use workspace protocol** - `workspace:*` for internal packages
14. **Atomic operations** - Use `prisma.$transaction()` for multi-step
    operations
15. **Edge compatibility** - Avoid Node.js-specific APIs in API routes

## Security Checklist

- ✅ Authentication required for all booking operations
- ✅ Role-based authorization (client vs owner)
- ✅ HTTPS enforced in production
- ✅ CSRF protection via NextAuth
- ✅ Rate limiting on API routes (via Vercel)
- ✅ Input validation with Zod schemas
- ✅ SQL injection prevention via Prisma ORM
- ✅ GDPR compliance (data export/delete endpoints)

## GDPR Compliance (EU)

**Required Features**:

1. **Consent Management** - Explicit opt-in for marketing emails
2. **Data Export** - Users can download their data as JSON
3. **Right to Deletion** - Users can delete their account and all data
4. **EU Hosting** - Use Supabase EU region or Neon EU

**Implementation**:

```typescript
// apps/web/src/actions/user.ts
export async function exportUserData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      bookings: true,
      reviews: true,
      notifications: true,
      ownedCafes: true,
    },
  });

  return { success: true, data: user };
}

export async function deleteUserAccount(userId: string) {
  await prisma.$transaction([
    prisma.booking.deleteMany({ where: { userId } }),
    prisma.review.deleteMany({ where: { userId } }),
    prisma.notification.deleteMany({ where: { userId } }),
    prisma.user.delete({ where: { id: userId } }),
  ]);

  return { success: true };
}
```

## Code Implementation Guidelines

When implementing new features:

1. **Add dependencies to catalog first** - Update `pnpm-workspace.yaml` before
   package.json
2. **Follow clean architecture** - Services → Hooks → Components
3. **Use Prisma transactions** for atomic operations
4. **Implement real-time updates** for booking-related features
5. **Add Zod validation** for all user inputs
6. **Write type-safe code** - Leverage Prisma types and TypeScript
7. **Test role-based access** - Verify both CLIENT and OWNER flows
8. **Handle edge cases** - Capacity limits, double bookings, timezone edge cases
9. **Add notifications** - Email + push for booking confirmations/cancellations
10. **Use ESLint 9 flat config** - Extend shared configs from
    `@repo/eslint-config`
11. **Commit with Commitizen** - Use `pnpm commit` for conventional commits
12. **Format before committing** - Pre-commit hooks run automatically via Husky
13. **No completion summaries** - Do NOT create migration completion docs,
    summary files, or "COMPLETE.md" files. Keep only essential docs (README,
    CHANGELOG). Documentation should be minimal and on-demand only.

## Testing Strategy (Future)

- **E2E Tests**: Playwright for critical flows (booking, cancellation)
- **Unit Tests**: Vitest for business logic and utilities
- **API Tests**: Test server actions with mock Prisma client
- **Visual Tests**: Chromatic for Storybook components (in `/apps/docs`)

---

**Remember**: This is a **serverless-first**, **role-based**, **real-time**
booking platform. Every feature must be stateless, atomic, and timezone-aware.
