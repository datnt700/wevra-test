# Tavia - AI Agent Instructions

Tavia is a Next.js 15 serverless café/restaurant booking platform with dual interfaces for clients (booking tables) and owners (managing bookings and venues). Built as a Turborepo monorepo with pnpm workspaces.

## Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router) with React Server Components
- **Auth**: Auth.js (NextAuth) with role-based access (client/owner)
- **Database**: PostgreSQL via Prisma ORM (Supabase or Neon)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Realtime**: Supabase Realtime or Pusher Channels for live booking updates
- **Notifications**: Resend/SendGrid (email) + FCM (push)
- **Payments**: Stripe (optional, for deposits)
- **Package Manager**: pnpm with catalog dependencies
- **Monorepo**: Turborepo for build orchestration and caching
- **Deployment**: Vercel (fully serverless)

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

**NEVER use specific versions in package.json** - use `catalog:` or named catalogs instead for consistency across the monorepo.

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
    "@tavia/core": "workspace:*"  // Internal workspace packages
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
  "@types/node": ^22.15.3
  typescript: ^5.6.3
  # ... see pnpm-workspace.yaml for complete list
```

**Rules**:
- Use `catalog:` for all dependencies defined in the root catalog
- Use `workspace:*` for internal package dependencies (`@tavia/core`, `@repo/typescript-config`)
- When adding new dependencies, add them to `pnpm-workspace.yaml` catalog first
- Run `pnpm install` from root after catalog changes

### Serverless-First Architecture

**All backend logic runs as serverless functions** via Next.js API routes. No traditional server or long-running processes.

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
      error: error instanceof Error ? error.message : 'Failed to create booking' 
    };
  }
}
```

**Key Principles**:
- **Stateless**: No server-side sessions or long-running state
- **Atomic operations**: Use Prisma transactions for bookings to prevent double-booking
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
pnpm build                                      # Build all apps
pnpm lint                                       # Lint all packages
pnpm format                                     # Format with Prettier

# Database
npx prisma migrate dev --name add_feature      # Create & apply migration
npx prisma migrate deploy                      # Apply migrations (production)
npx prisma studio                              # GUI for database
npx prisma generate                            # Generate Prisma Client

# Dependencies
pnpm add <package> --filter=web                # Add to specific workspace
pnpm add -w <package>                          # Add to root workspace

# Turbo
pnpm turbo run build                           # Build with caching
pnpm turbo run lint                            # Lint with caching
pnpm turbo run dev --no-cache                  # Dev without cache
```

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

## Common Gotchas

1. **Always use catalog dependencies** - Never hardcode versions in package.json
2. **Use Prisma transactions** for bookings to prevent race conditions
3. **Store dates in UTC** - Convert to user timezone only on display
4. **Unique constraint on bookings** - `@@unique([cafeId, date, timeSlot])`
5. **Role-based access** - Always verify user role in server actions
6. **Revalidate paths** after mutations for UI updates
7. **Handle null values** - Many fields are optional in the schema
8. **Use workspace protocol** - `workspace:*` for internal packages
9. **Atomic operations** - Use `prisma.$transaction()` for multi-step operations
10. **Edge compatibility** - Avoid Node.js-specific APIs in API routes

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

1. **Add dependencies to catalog first** - Update `pnpm-workspace.yaml` before package.json
2. **Follow clean architecture** - Services → Hooks → Components
3. **Use Prisma transactions** for atomic operations
4. **Implement real-time updates** for booking-related features
5. **Add Zod validation** for all user inputs
6. **Write type-safe code** - Leverage Prisma types and TypeScript
7. **Test role-based access** - Verify both CLIENT and OWNER flows
8. **Handle edge cases** - Capacity limits, double bookings, timezone edge cases
9. **Add notifications** - Email + push for booking confirmations/cancellations
10. **Focus on code quality** - Use ESLint, Prettier, and Husky pre-commit hooks

## Testing Strategy (Future)

- **E2E Tests**: Playwright for critical flows (booking, cancellation)
- **Unit Tests**: Vitest for business logic and utilities
- **API Tests**: Test server actions with mock Prisma client
- **Visual Tests**: Chromatic for Storybook components (in `/apps/docs`)

---

**Remember**: This is a **serverless-first**, **role-based**, **real-time** booking platform. Every feature must be stateless, atomic, and timezone-aware.
