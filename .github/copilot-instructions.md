# Tavia - AI Agent Instructions

Tavia is a Next.js 15 café/restaurant booking platform built as a
**microservices-first monorepo** with a production-ready component library.

## 🎯 Project Overview

**Core Architecture:**

- **@tavia/core**: 54+ UI components (Emotion + Radix UI) - PRIMARY FOCUS FOR UI
  WORK
- **apps/backoffice**: Next.js 15 booking platform with Auth.js, Prisma, Docker
  PostgreSQL (port 3000)
- **apps/analytics**: Fastify 5 event tracking API (port 3001)
- **apps/restaurant-service**: NestJS 11 microservice with Swagger (port 3002)
- **Generator scripts**: Systematic scaffolding via `pnpm create:app`,
  `create:api`, `create:mobile`

**Tech Stack:**

- Next.js 15 (App Router) + React 19 | Node.js 18.18.0+
- Styling: 100% Emotion (NO SCSS) + Radix UI primitives
- Package Manager: pnpm v10.17.1 with **catalog dependencies**
- Build: Turborepo | Testing: Vitest (15-50 tests/component), Playwright
- Linting: ESLint 9 flat config (NOT .eslintrc) | Git: Husky + Commitizen

**Monorepo Structure:**

```
apps/
  ├── backoffice/           # Next.js 15 (port 3000)
  ├── analytics/            # Fastify API (port 3001)
  ├── restaurant-service/   # NestJS (port 3002)
  └── docs/                 # Storybook (port 6006)
packages/
  ├── core/                 # @tavia/core - 54+ web components (Emotion + Radix) ⭐
  ├── mobile-ui/            # @tavia/mobile-ui - React Native components
  ├── analytics/            # @tavia/analytics SDK
  ├── ui/                   # @repo/ui - Legacy minimal UI
  ├── eslint-config/        # Shared ESLint 9 configs
  └── typescript-config/    # Shared tsconfig
templates/                  # For generators (webapp, simple-api, complex-api, mobile-app)
scripts/                    # create-app.js, create-api.js, create-mobile.js
pnpm-workspace.yaml         # ⚠️ CRITICAL - Catalog dependencies
turbo.json                  # Build pipeline config
```

## 🔥 Critical Patterns

### Pattern 1: pnpm Catalog Dependencies

**NEVER hardcode versions in package.json.** Always use `catalog:` references
from `pnpm-workspace.yaml`.

```json
// ✅ CORRECT
{
  "dependencies": {
    "next": "catalog:",              // Main catalog
    "@emotion/react": "catalog:emotion",  // Named catalog
    "@tavia/core": "workspace:*"     // Internal package
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

### Pattern 2: @tavia/core Component Structure

**Flat structure** - All 54 components in
`packages/core/src/ui/<component-name>/` (lowercase-with-dashes).

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
import { Button, Modal, Input } from '@tavia/core';

// ✅ Also correct - Direct imports
import { Button } from '@tavia/core/ui/button';

// ❌ DEPRECATED - Old categorized paths
import { Button } from '@tavia/core/components/form/Button';
```

**Component categories** (documentation only - all in flat `ui/`):

- **Base** (8): Avatar, Badge, Button, Code, Icon, Image, Spinner, Tag
- **Radix** (8): Accordion, Checkbox, DropdownMenu, Modal, Popover, Radio, Tabs,
  Tooltip
- **Form** (16): Input, Select, Combobox, Switch, Slider, TextArea, FileUpload,
  RichTextEditor
- **Dialog** (4): Alert, Drawer, MenuBar, Toast
- **Layout** (6): Card, Divider, LoadingScreen, ScrollBox, Skeleton,
  ThemeProvider
- **Navigation** (4): Breadcrumb, Link, Pagination, Sidebar
- **State** (5): EmptyState, ErrorState, LoadingLogo, LoadingState, ProgressBar
- **Table** (2): DataTable, Table

### Pattern 3: Emotion Styling (NO SCSS)

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

### Pattern 0: Generator Scripts

**ALWAYS use generators** - never copy existing apps. Ensures correct ports,
dependencies, configs.

**Generate Next.js apps:**

```bash
pnpm create:app admin              # Creates apps/admin on port 3089
pnpm create:app customer-portal    # Creates apps/customer-portal on port 3042
```

Creates: Next.js 15 + TypeScript + modular i18n + Prisma + @tavia/core +
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

# Testing (packages/core)
cd packages/core
pnpm test                   # Run tests
pnpm test:coverage          # Coverage (80% threshold)
pnpm test:watch             # Watch mode

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
- @tavia/core allows `--max-warnings 10`
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

## Key Files Reference

- `pnpm-workspace.yaml` - Catalog dependencies (read first!)
- `turbo.json` - Build pipeline
- `packages/core/src/ui/` - 54 components (flat)
- `packages/core/src/theme/tokens/` - Theme tokens
- `.github/workflows/ci.yml` - CI/CD
- `eslint.config.js` - Root ESLint
- `packages/eslint-config/` - Shared configs

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
via `packages/` (@tavia/core, @tavia/analytics).
