---
applyTo: '**/*'
---

# Tavia Architecture Patterns

## Freemium Model & Feature Flags

**Tavia uses a two-sided platform (broker model):**

- **Organizers (B2B)**: Create groups and host events (Free or Premium)
- **Attendees (B2C)**: Always FREE with unlimited access

**Free Plan (Organizers):**

- 1 group (max 50 members)
- 2 events per month
- Basic tools, NO analytics

**Premium Plan (Organizers):**

- Unlimited groups/members/events
- Advanced analytics
- Custom branding
- Moderators

**Feature Flag System:**

Location: `apps/backoffice/src/lib/features/planLimits.ts`

```typescript
// Check permissions before any premium feature
canCreateGroup(user);
canCreateEvent(user, groupId);
canAccessAnalytics(user);
canCustomizeBranding(user);
getMaxMembers(group);
```

**Upsell Triggers:**

1. Group hits 50 members → Upgrade modal
2. Creating 3rd event → Premium paywall
3. Accessing analytics → Premium gate
4. Customizing branding → Premium gate

## Shared Database Architecture

**Critical: Backoffice and frontoffice share the SAME PostgreSQL database
(`tavia`)**

```
┌─────────────────┐
│  PostgreSQL DB  │
│   "tavia"       │  ← Single source of truth
└────────┬────────┘
         │
    ┌────┴────┐
┌───▼────┐ ┌──▼──────┐
│Backoffice│ │Frontoffice│
│Port 3000│ │Port 3003│
└─────────┘ └─────────┘
```

**Implications:**

- ✅ Event data appears instantly in both apps
- ✅ Prisma schema in BOTH `apps/backoffice/prisma` and
  `apps/frontoffice/prisma`
- ⚠️ Schema changes in backoffice? MUST copy to frontoffice
- ⚠️ Migrations run from backoffice only

**Database Workflow:**

```bash
# 1. Start database (from backoffice)
cd apps/backoffice
pnpm docker:up

# 2. Migrate (from backoffice)
pnpm db:migrate

# 3. Sync frontoffice (from frontoffice)
cd apps/frontoffice
pnpm db:generate  # NOT migrate
```

## Microservices Structure

- **apps/backoffice** (3000): Admin/Organizer/Moderator management
- **apps/frontoffice** (3003): Attendee event discovery
- **apps/mobile**: Expo 54 mobile for Attendees
- **apps/analytics** (3001): Fastify event tracking API
- **apps/event-service** (3002): NestJS microservice

**Port Allocation:**

- Web apps: 3000-3099 (deterministic hash)
- APIs: 4000-4099 (deterministic hash)
- Same name = same port (reproducible)
