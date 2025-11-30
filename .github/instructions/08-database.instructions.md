---
applyTo: 'apps/*/prisma/**/*'
---

# Database Workflows (Docker + Prisma)

## Quick Start (New Developer)

```bash
cd apps/backoffice
pnpm db:setup  # Docker up + migrate + seed
```

## Schema Changes

```bash
# 1. Edit prisma/schema.prisma

# 2. Create migration
pnpm db:migrate  # Prompts for name

# 3. Verify in Prisma Studio
pnpm db:studio

# 4. Commit migration files
git add prisma/migrations/
```

## Docker Compose Pattern

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

## Environment Variables

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eventure"

# Generate secure JWT secret (32+ characters)
# Run: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
JWT_SECRET="YCOCS7wRIczdIfSbIaDf7vkx5r6R7vQvRNItJAV/OOM="
NEXTAUTH_SECRET="YCOCS7wRIczdIfSbIaDf7vkx5r6R7vQvRNItJAV/OOM="
```

## Generating Secure Secrets

```bash
# Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Copy output to JWT_SECRET and NEXTAUTH_SECRET
```

## Database Commands

```bash
# Automated Setup
pnpm db:setup             # Complete: Docker + migrate + seed

# Docker PostgreSQL
cd apps/backoffice
pnpm docker:up            # Start container
pnpm docker:down          # Stop container
pnpm docker:logs          # View logs
pnpm docker:restart       # Restart
pnpm docker:clean         # ⚠️ Remove container + data

# Prisma Migrations
pnpm db:generate          # Generate client
pnpm db:migrate           # Create migration (dev)
pnpm db:migrate:deploy    # Apply migrations (prod)
pnpm db:seed              # Seed data
pnpm db:studio            # Open GUI
pnpm db:push              # Push schema (no migration)

# Complete Reset (dev only)
pnpm docker:clean
pnpm docker:up
pnpm db:migrate
pnpm db:seed
```

## Shared Database Architecture

**CRITICAL:** Backoffice and frontoffice share the SAME database

```
┌─────────────────┐
│  PostgreSQL     │
│   "eventure"       │
│  Port: 5432     │
└────────┬────────┘
         │
    ┌────┴────┐
┌───▼────┐ ┌──▼──────┐
│Backoffice│ │Frontoffice│
│Port 3000│ │Port 3003│
└─────────┘ └─────────┘
```

**Workflow:**

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

**Rules:**

- ✅ Prisma schema in BOTH apps (must stay in sync)
- ✅ Migrations run from backoffice only
- ⚠️ Schema changes? Copy to frontoffice `prisma/schema.prisma`
- ⚠️ Frontoffice uses `pnpm db:generate` only

## Shared Types (@eventure/database)

**ALWAYS use shared types from `@eventure/database` package** - NEVER define
local interfaces

**Available Types:**

```typescript
// Group types
import type {
  GroupDetail,
  GroupWithOwner,
  GroupWithCounts,
  GroupMemberWithUser,
} from '@eventure/database';

// Common types
import type { ActionResponse } from '@eventure/database';

// Enums
import {
  MembershipStatus,
  UserRole,
  SubscriptionStatus,
} from '@eventure/database';

// Prisma selects (for queries)
import { groupDetailSelect, groupWithOwnerSelect } from '@eventure/database';
```

**Usage Pattern:**

```typescript
// ✅ CORRECT - Use shared types and enums
import type { GroupDetail } from '@eventure/database';
import { MembershipStatus, groupDetailSelect } from '@eventure/database';

const group = await prisma.group.findUnique({
  where: { id },
  select: groupDetailSelect,
});

// Use enum values, not string literals
if (membershipStatus === MembershipStatus.ACTIVE) {
  // Member logic
}

// ❌ WRONG - Don't use string literals for enums
if (membershipStatus === 'ACTIVE') {
  // ❌ Don't do this
  // ...
}

// ❌ WRONG - Don't define local interfaces
interface GroupData {
  id: string;
  name: string;
  // ...
}
```

**Rules:**

1. ✅ **ALWAYS** import types from `@eventure/database`
2. ✅ **ALWAYS** use enum values (e.g., `MembershipStatus.ACTIVE`) instead of
   strings
3. ✅ Import enums without `type` keyword:
   `import { MembershipStatus } from '@eventure/database'`
4. ✅ Use Prisma select validators (`groupDetailSelect`) for consistent queries
5. ✅ Define new shared types in `packages/database/src/types/`
6. ✅ Use `ActionResponse<T>` for server actions and API routes
7. ❌ **NEVER** define duplicate interfaces in app code
8. ❌ **NEVER** use string literals for enum values (`'ACTIVE'` ❌, use
   `MembershipStatus.ACTIVE` ✅)
9. ❌ **NEVER** import types directly from `@prisma/client` (use database
   package)
10. ✅ Use `ActionResponse<T>` for server actions and API routes
11. ❌ **NEVER** define duplicate interfaces in app code
12. ❌ **NEVER** use `@prisma/client` directly for types (use database package)

**Adding New Types:**

```typescript
// packages/database/src/types/group.ts
export const newGroupSelect = Prisma.validator<Prisma.GroupSelect>()({
  // Define select fields
});

export type NewGroupType = Prisma.GroupGetPayload<{
  select: typeof newGroupSelect;
}>;
```

## Seed Data

- 10 events (Tech, Music, Sports, Arts)
- 5 groups (2 Free, 3 Premium)
- 5 users: 1 admin, 2 organizers, 2 attendees
- 20+ RSVPs
- Sample analytics data

**Seeded Users:**

- Admin: `admin@eventure.so` (admin123)
- Organizer (Free): `organizer.free@eventure.so` (organizer123)
- Organizer (Premium): `organizer.pro@eventure.so` (organizer123)
- Attendee: `attendee1@eventure.so`, `attendee2@eventure.so` (attendee123)
