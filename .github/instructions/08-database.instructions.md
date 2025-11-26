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
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tavia"

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
│   "tavia"       │
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

## Seed Data

- 10 events (Tech, Music, Sports, Arts)
- 5 groups (2 Free, 3 Premium)
- 5 users: 1 admin, 2 organizers, 2 attendees
- 20+ RSVPs
- Sample analytics data

**Test Users:**

- Admin: `admin@tavia.io` (admin123)
- Organizer (Free): `organizer.free@tavia.io` (organizer123)
- Organizer (Premium): `organizer.pro@tavia.io` (organizer123)
- Attendee: `attendee1@tavia.io`, `attendee2@tavia.io` (attendee123)
