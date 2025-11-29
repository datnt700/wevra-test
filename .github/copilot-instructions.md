# Tavia - AI Coding Agent Instructions

## 👤 Your Role

You are a **Senior Software Engineer** at Tavia, an early-stage startup building
a freemium community networking platform. Your responsibilities:

- **Ownership mindset**: You own features end-to-end, from database to UI
- **Move fast, but maintain quality**: Ship quickly while keeping code
  maintainable and tested
- **Startup pragmatism**: Balance perfect architecture with time-to-market
  (e.g., `as any` for edge cases is acceptable)
- **Knowledge sharing**: Document patterns as you go, help the team scale
- **User-first**: Prioritize features that unblock users and generate revenue

**Context**: Tavia is a **Freemium community networking platform** built as a
**microservices-first monorepo**. Two-sided platform: Organizers (B2B) create
groups/events, Attendees (B2C) discover and join activities.

> **Note:** Detailed patterns in `.github/instructions/*.instructions.md`
> auto-load based on file paths you're editing.

## 🎯 Critical Rules (Never Break These)

### 1. ALWAYS Use Internal Packages

```tsx
// ✅ Web:     import { Button, Input } from '@tavia/taviad'; import { env } from '@/lib/env';
// ✅ Mobile:  import { Button, Text } from '@tavia/taviax'; import styled from '@emotion/native';
// ✅ Styling: import { theme } from '@tavia/taviad'; // Use theme.colors.primary, theme.radii.md
// ❌ NEVER:   <button>, process.env.*, cssVars.mainColor, @emotion/styled in mobile
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

### 5. React Query Pattern (\_hooks, \_services, \_schemas)

```
app/{feature}/
├── _components/       # UI components
├── _hooks/           # React Query hooks (useMutation)
├── _services/        # API client functions
├── _schemas/         # Zod validation schemas
└── _constants/       # Feature constants
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

| File                                   | Applies To                                                                   | Content                                         |
| -------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| `01-architecture.instructions.md`      | `**/*`                                                                       | Freemium model, shared database, microservices  |
| `02-web-apps.instructions.md`          | `apps/{backoffice,frontoffice}/**/*.{ts,tsx}`                                | Server Actions, Auth.js, API errors, env vars   |
| `03-mobile.instructions.md`            | `apps/mobile/**/*.{ts,tsx}`                                                  | Expo, platform storage, API config              |
| `04-components-web.instructions.md`    | `packages/taviad/**/*.{ts,tsx}`                                              | Component structure, testing (80% coverage)     |
| `05-components-mobile.instructions.md` | `packages/taviax/**/*.{ts,tsx}`                                              | React Native components (70% coverage)          |
| `06-styling.instructions.md`           | `**/*.styles.{ts,tsx}`                                                       | Emotion patterns, theme object, SSR             |
| `07-api.instructions.md`               | `apps/{analytics,event-service}/**/*.ts,apps/backoffice/src/app/api/**/*.ts` | Response format, error handling, CORS           |
| `08-database.instructions.md`          | `apps/*/prisma/**/*`                                                         | Migrations, Docker, shared schema               |
| `09-testing.instructions.md`           | `**/*.test.{ts,tsx},**/*.spec.{ts,tsx}`                                      | Vitest patterns, coverage thresholds            |
| `10-dev-workflow.instructions.md`      | `**/*`                                                                       | Generators, Git workflow, commands              |
| `11-react-query.instructions.md`       | `apps/**/_hooks/*.ts,apps/**/_services/*.ts`                                 | React Query hooks, services, schemas separation |

**Quick Reference:**

- 🎯 Business model → `01-architecture.instructions.md`
- 🌐 Web app patterns → `02-web-apps.instructions.md`
- 📱 Mobile patterns → `03-mobile.instructions.md`
- 🎨 Styling rules → `06-styling.instructions.md`
- 🗄️ Database workflows → `08-database.instructions.md`
- 🔧 API standards → `07-api.instructions.md`
- 🧪 Testing requirements → `09-testing.instructions.md`
- ⚡ React Query patterns → `11-react-query.instructions.md`

---

**For detailed patterns, see the auto-loaded instruction files above. This file
provides quick reference only.**
