---
applyTo: '**/*'
---

# Development Workflow

## Generator Scripts (ALWAYS USE)

**Never copy existing apps** - use generators for correct ports, dependencies,
configs.

```bash
# Next.js apps (port 3000-3099)
pnpm create:app admin              # Creates apps/admin on port 3089
pnpm create:app customer-portal    # Port 3042

# APIs (port 4000-4099)
pnpm create:api notifications      # Interactive: Fastify or NestJS

# Mobile apps
pnpm create:mobile customer-app    # Expo + TypeScript

# Feature modules (Next.js apps)
cd apps/backoffice
pnpm generate:module               # Interactive: Creates feature module
```

**Generated apps include:**

- Next.js 15 + TypeScript + Turbopack
- Modular i18n (7 modules)
- Docker PostgreSQL + Prisma
- @eventure/eventured + @eventure/analytics
- Emotion GlobalStyles + React Query
- Vitest + Playwright
- Deterministic ports

## Catalog Dependencies (CRITICAL)

**NEVER hardcode versions** - always use `catalog:` from `pnpm-workspace.yaml`

```json
// ✅ CORRECT
{
  "dependencies": {
    "next": "catalog:",
    "@emotion/react": "catalog:emotion",
    "@eventure/eventured": "workspace:*"
  }
}

// ❌ WRONG - Hardcoded version
{ "dependencies": { "next": "^15.5.5" } }
```

**Adding dependencies:**

1. Add to `pnpm-workspace.yaml` catalog: `new-package: ^1.0.0`
2. Reference in package.json: `"new-package": "catalog:"`
3. Run `pnpm install` from root

**Available catalogs:**

- `catalog:` - Main dependencies
- `catalog:emotion` - Emotion packages
- `catalog:next15` - Next.js 15
- `catalog:expo` - React Native/Expo

**Exceptions:** App-specific dependencies (e.g., `sonner`) can be added with
versions

## Using Internal Packages (CRITICAL)

**ALWAYS check internal packages BEFORE adding new dependencies or writing
custom code:**

**Available Internal Packages:**

- **`@eventure/env`** - Type-safe environment variables (MANDATORY for all env
  access)
- **`@eventure/eventured`** - 60+ web UI components (MANDATORY for web apps)
- **`@eventure/eventurex`** - React Native components (MANDATORY for mobile
  apps)
- **`@eventure/analytics`** - Event tracking SDK
- **`@eventure/logger`** - Structured logging
- **`@eventure/module-generator`** - Feature scaffolding

**Critical Rules:**

1. ✅ **ALWAYS** use `@eventure/env` for environment variables
2. ✅ **ALWAYS** use `@eventure/eventured` for web UI components
3. ✅ **ALWAYS** use `@eventure/eventurex` for mobile UI components
4. ✅ Check if functionality exists in packages BEFORE implementing
5. ✅ Extend existing packages instead of duplicating
6. ✅ Use `workspace:*` for internal package dependencies
7. ❌ **NEVER** access `process.env` directly (use `@eventure/env`)
8. ❌ **NEVER** use native HTML elements in apps (use component libraries)
9. ❌ **NEVER** duplicate functionality from internal packages

**Examples:**

```typescript
// ✅ CORRECT - Use @eventure/env
import { env } from '@/lib/env';
const secret = env.WEBHOOK_SECRET;

// ✅ CORRECT - Use @eventure/eventured
import { Button, Modal, Input } from '@eventure/eventured';

// ✅ CORRECT - Use @eventure/analytics
import { trackEvent } from '@eventure/analytics';

// ❌ WRONG - Direct process.env
const secret = process.env.WEBHOOK_SECRET;

// ❌ WRONG - Native HTML
<button onClick={handleClick}>Click</button>

// ❌ WRONG - Custom implementation
function myCustomLogger() { /* use @eventure/logger instead */ }
```

// ❌ WRONG - Hardcoded version { "dependencies": { "next": "^15.5.5" } }

````

**Adding dependencies:**

1. Add to `pnpm-workspace.yaml` catalog: `new-package: ^1.0.0`
2. Reference in package.json: `"new-package": "catalog:"`
3. Run `pnpm install` from root

**Available catalogs:**

- `catalog:` - Main dependencies
- `catalog:emotion` - Emotion packages
- `catalog:next15` - Next.js 15
- `catalog:expo` - React Native/Expo

**Exceptions:** App-specific dependencies (e.g., `sonner`) can be added with
versions

## Development Commands

```bash
# Development
pnpm dev                    # All apps (backoffice + docs)
pnpm dev:backoffice         # Backoffice (localhost:3000)
pnpm dev:frontoffice        # Frontoffice (localhost:3003)
pnpm dev:storybook          # Storybook (localhost:6006)

# Mobile
cd apps/mobile
set EXPO_OFFLINE=1          # Windows
pnpm start                  # Metro bundler

# Build & Quality
pnpm build                  # Build all
pnpm build --filter=backoffice  # Build specific
pnpm lint                   # ESLint 9
pnpm lint:fix               # Auto-fix
pnpm format                 # Prettier
pnpm type-check             # TypeScript

# Testing
cd packages/eventured
pnpm test                   # Run tests
pnpm test:coverage          # Coverage (80%)
pnpm test:watch             # Watch mode

cd packages/eventurex
pnpm test                   # Run tests
pnpm test:coverage          # Coverage (70%)

# Dependencies
pnpm add <pkg> --filter=backoffice
pnpm add -w <pkg>           # Root

# Database
cd apps/backoffice
pnpm db:setup               # Docker + migrate + seed
pnpm docker:up              # Start PostgreSQL
pnpm db:migrate             # Create migration
pnpm db:studio              # Prisma Studio
````

## Git Workflow (Conventional Commits)

**ALWAYS use Commitizen:**

```bash
git checkout -b feat/your-feature
git add .
pnpm commit  # Interactive prompt
git push origin feat/your-feature
```

**Pre-commit hooks** (`.lintstagedrc.js`):

- Prettier on all staged files
- TypeScript type-check

**Commit types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructure
- `perf`: Performance
- `test`: Tests
- `build`: Build system
- `ci`: CI/CD
- `chore`: Maintenance

**Examples:**

- `feat(core): add Button component with variants`
- `fix(booking): prevent double booking race condition`
- `refactor(core): migrate to Lucide icons`

## TypeScript & ESLint Best Practices

```typescript
// ✅ Infer return types (don't use `: JSX.Element`)
export const Component = ({ children }: Props) => <div>{children}</div>;

// ✅ Prefix unused with _
export const Component = ({ value, variant: _variant }: Props) =>
  <div>{value}</div>;

// ✅ Omit unused error params
try { new URL(input); } catch { return { success: false }; }

// ✅ Add JSX pragma for css prop
/** @jsxImportSource @emotion/react */
export const Tag = () => <div css={styles}>...</div>;
```

**ESLint 9 flat config:**

- Extend from `@repo/eslint-config/react-internal` (no `.js`)
- @eventure/eventured allows `--max-warnings 10`
- Each workspace has own `eslint.config.js`

## Common Gotchas

1. **Always use catalog dependencies** - Never hardcode versions
2. **Import ESLint configs without `.js`** -
   `@repo/eslint-config/react-internal`
3. **Prefix unused with `_`** - Avoids warnings
4. **Add `@jsxImportSource @emotion/react`** for `css` prop
5. **Use `workspace:*` for internal packages**
6. **Infer return types** - Don't use `: JSX.Element`
7. **Radix uses `data-*` attributes**
8. **Use `radii` tokens** - Never `border-radius: 8px`
9. **Transient props need `$` prefix**
10. **Avoid hydration errors** - No Emotion in root layout
11. **Use `suppressHydrationWarning`** on `<html>` tag
12. **Apply layouts at page level** - Use route groups

## CI/CD Pipeline

**GitHub Actions** (`.github/workflows/ci.yml`):

- Triggers: Push to `main`/`develop`, all PRs
- Parallel jobs: `lint`, `typecheck`, `build`, `test`, `commitlint`
- Caching: pnpm store + Turborepo
- Node version from `.nvmrc` (18.18.0)

**Dependabot:** Weekly updates (Mondays)

## Key Files

- `pnpm-workspace.yaml` - Catalog dependencies
- `turbo.json` - Build pipeline
- `packages/eventured/src/ui/` - 60+ web components
- `packages/eventurex/src/components/` - Mobile components
- `packages/eventured/src/theme/tokens/` - Theme tokens
- `.github/workflows/ci.yml` - CI/CD
- `eslint.config.js` - Root ESLint
- `.nvmrc` - Node 18.18.0 (CI)
