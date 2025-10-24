# Tavia - AI Agent Instructions

Tavia is a Next.js 15 café/restaurant booking platform transitioning from early
development (v0.0.1-rc1) to a full-stack microservices architecture.

## 🎯 What Exists Today

**Frontend:**

- ✅ **@tavia/core**: 54+ production-ready UI components (Emotion + Radix UI) -
  PRIMARY FOCUS
- ✅ **apps/web**: Next.js 15 app with Auth.js, Prisma, i18n, Docker PostgreSQL
- ✅ **apps/docs**: Storybook documentation for component library
- ✅ **@tavia/analytics**: Click tracking SDK with React Context API

**Backend Microservices:**

- ✅ **apps/analytics**: Fastify 5 API for event tracking (port 3001)
- ✅ **apps/restaurant-service**: NestJS 11 microservice with Swagger docs
  (port 3002)

**Infrastructure:**

- ✅ **Turborepo monorepo** with pnpm v10.17.1 catalog dependencies
- ✅ **Generator scripts**: `pnpm create:app`, `pnpm create:api`, and
  `pnpm create:mobile` for systematic scaffolding
- ✅ **CI/CD**: GitHub Actions (lint, typecheck, build, test, commitlint)
- ✅ **Testing**: Vitest (15-50 tests per component), Playwright (E2E), Jest
  (mobile)
- ✅ **Dev tooling**: ESLint 9 flat config, Prettier, Husky, Commitizen

## Tech Stack

- **Runtime**: Node.js 18.18.0+ (see `.nvmrc`)
- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: 100% Emotion (NO SCSS) + Radix UI primitives
- **Package Manager**: pnpm v10.17.1 with catalog dependencies
- **Build**: Turborepo for caching & orchestration
- **Linting**: ESLint 9 flat config (NOT .eslintrc)
- **Testing**: Vitest + Testing Library with 15-50 tests per component
- **Docs**: Storybook 8.4.2

## Monorepo Structure

```
tavia/
├── apps/
│   ├── web/                  # Next.js 15 booking platform (port 3000)
│   ├── analytics/            # Fastify event tracking API (port 3001)
│   ├── restaurant-service/   # NestJS CRUD microservice (port 3002)
│   └── docs/                 # Storybook documentation (port 6006)
├── packages/
│   ├── core/                 # @tavia/core - 54+ UI components ⭐ PRIMARY
│   ├── analytics/            # @tavia/analytics - Click tracking SDK
│   ├── ui/                   # @repo/ui - Legacy minimal UI (deprecated)
│   ├── eslint-config/        # Shared ESLint 9 flat configs
│   └── typescript-config/    # Shared TypeScript configs
├── templates/                # Generic templates for generators
│   ├── webapp/               # Next.js 15 template (used by create:app)
│   ├── simple-api/           # Fastify 5 template (used by create:api option 1)
│   ├── complex-api/          # NestJS 11 template (used by create:api option 2)
│   └── mobile-app/           # Expo template (used by create:mobile)
├── scripts/
│   ├── create-app.js         # Generate Next.js apps systematically
│   ├── create-api.js         # Generate Fastify/NestJS APIs interactively
│   └── create-mobile.js      # Generate Expo mobile apps interactively
├── pnpm-workspace.yaml       # 🔥 CRITICAL - Catalog dependencies
├── turbo.json                # Build pipeline config
└── package.json
```

## 🔥 Critical Pattern #1: pnpm Catalog Dependencies

**NEVER hardcode versions in package.json.** Always use `catalog:` references
defined in `pnpm-workspace.yaml`.

```json
// ✅ CORRECT
{
  "dependencies": {
    "next": "catalog:",           // Reference main catalog
    "react": "catalog:",
    "@emotion/react": "catalog:emotion",  // Named catalog
    "@tavia/core": "workspace:*"  // Internal workspace package
  }
}

// ❌ WRONG
{
  "dependencies": {
    "next": "^15.5.0"  // Hardcoded version
  }
}
```

**Adding new dependencies:**

1. Add to `pnpm-workspace.yaml` catalog first:
   ```yaml
   catalog:
     new-package: ^1.0.0
   ```
2. Reference in package.json: `"new-package": "catalog:"`
3. Run `pnpm install` from root

**Available catalogs:** `catalog:`, `catalog:react18`, `catalog:emotion`,
`catalog:next14`, `catalog:next15`

## 🔥 Critical Pattern #2: @tavia/core Component Structure

**Flat structure** - All 54 components live in `packages/core/src/ui/` by
component name (NOT categorized folders).

### Required Structure

```
ui/component-name/           # ⚠️ lowercase-with-dashes (e.g., empty-state, button)
├── components/
│   ├── ComponentName.tsx           # PascalCase (e.g., EmptyState, Button)
│   ├── ComponentName.styles.ts     # Emotion styles
│   └── index.ts
├── types/
│   ├── ComponentNameProps.ts       # ⚠️ MUST have separate props file
│   └── index.ts
├── tests/
│   └── ComponentName.test.tsx      # ⚠️ 15-50 tests MINIMUM
└── index.ts                        # Barrel export
```

### Import Patterns

```typescript
// ✅ PREFERRED - Package-level imports
import { Button, Modal, Input, Card } from '@tavia/core';

// ✅ Also correct - Direct component imports
import { Button } from '@tavia/core/ui/button';

// ❌ WRONG - Old categorized paths (DEPRECATED)
import { Button } from '@tavia/core/components/form/Button';
```

### Component Categories (Documentation Only)

All components are in flat `ui/` structure but conceptually grouped as:

- **Base** (8): Avatar, Badge, Button, Code, Icon, Image, Spinner, Tag
- **Radix UI** (8): Accordion, Checkbox, DropdownMenu, Modal, Popover, Radio,
  Tabs, Tooltip
- **Form** (16): Input, Select, Combobox, Switch, Slider, TextArea, FileUpload,
  RichTextEditor, etc.
- **Dialog** (4): Alert, Drawer, MenuBar, Toast
- **Layout** (6): Card, Divider, LoadingScreen, ScrollBox, Skeleton,
  ThemeProvider
- **Navigation** (4): Breadcrumb, Link, Pagination, Sidebar
- **State** (5): EmptyState, ErrorState, LoadingLogo, LoadingState, ProgressBar
- **Table** (2): DataTable, Table

## 🔥 Critical Pattern #3: Emotion Styling (NO SCSS)

**ALL components use Emotion** for styling. No CSS modules, no SCSS.

### Styles File Pattern (`ComponentName.styles.ts`)

```typescript
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

type Variant = 'success' | 'warning' | 'danger';

// Helper function for variant mapping
const getVariantColors = (variant: Variant = 'success') => {
  const variantMap: Record<Variant, VariantColors> = {
    success: {
      base: cssVars.colorSuccess,
      light: cssVars.colorSuccessLight,
      dark: cssVars.colorGreenDark,
    },
    // ... more variants
  };
  return variantMap[variant];
};

/**
 * Styled components for ComponentName.
 */
export const Styled = {
  // ⚠️ MUST use this export pattern
  Wrapper: styled.div<{ $variant?: Variant; $isFilled?: boolean }>`
    // $ prefix
    padding: 0.75rem 1rem;
    border-radius: ${radii.md}; // ⚠️ Use tokens, NEVER px

    ${({ $variant = 'success', $isFilled = false }) => {
      const colors = getVariantColors($variant);
      return `
        color: ${colors.base};
        background-color: ${colors.light}20;  // 20 = 12% hex opacity
        border: 1px solid ${colors.base};
      `;
    }}

    &:hover {
      opacity: 0.9;
    }
  `,

  Content: styled.div`
    display: flex;
    gap: 0.5rem;
    color: ${cssVars.gray900};
  `,
};
```

### Component File Pattern (`ComponentName.tsx`)

```typescript
import { Styled } from './ComponentName.styles';
import { ComponentNameProps } from '../types';

/**
 * A reusable ComponentName component designed to [purpose].
 *
 * Features:
 * - [Feature 1]
 * - Styled using Emotion with theme tokens
 */
export const ComponentName = ({
  variant = 'success',
  isFilled = false,
  children,
  className: _className,  // Transient prop (prefix with _)
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

### Emotion Critical Rules

**MUST DO:**

- ✅ Import theme tokens directly:
  `import { cssVars } from '../../../theme/tokens/colors'`
- ✅ Use `export const Styled = { Wrapper: styled.div\`...\` }` pattern (NOT
  separate consts)
- ✅ Prefix transient props with `$` to avoid DOM warnings: `$variant`,
  `$isActive`
- ✅ Use helper functions for variant mapping: `getVariantColors()`
- ✅ Use `radii` tokens for border-radius: `${radii.md}` NOT `8px`
- ✅ Add hex opacity for transparent colors: `${colors.light}20` (20 = 12%
  opacity)
- ✅ Keep Radix CSS variables intact:
  `height: var(--radix-accordion-content-height);`

**NEVER DO:**

- ❌ Don't use CSS variables that don't exist: `var(--color-${variant}-text)`
- ❌ Don't hardcode colors: `#ff0000` or radii: `12px`
- ❌ Don't use props without `$` prefix in styled components
- ❌ Don't export styled components without `Styled` object wrapper

### Available Theme Tokens

**Colors** (`theme/tokens/colors.ts`):

- Signal: `colorSuccess`, `colorWarning`, `colorDanger`, `colorCyan` +
  Light/Dark variants
- Grays: `gray0` to `gray1000` (full scale)
- Main: `mainColor`, `mainColorLight1-9`, `mainColorDark1-6`

**Radii** (`theme/tokens/radii.ts`):

- `radii.none`, `radii.sm`, `radii.md`, `radii.lg`, `radii.xl`, `radii.full`

**Spacing** (use rem units):

- `0.25rem` (4px), `0.5rem` (8px), `0.75rem` (12px), `1rem` (16px), `1.5rem`
  (24px), `2rem` (32px)

## Development Commands

```bash
# Development
pnpm dev                    # Start all apps (web + docs)
pnpm dev:web                # Start web app only (localhost:3000)
pnpm dev:storybook          # Start Storybook (localhost:6006)

# Building
pnpm build                  # Build all apps with Turborepo
pnpm build --filter=web     # Build specific app
pnpm build --filter=@tavia/core  # Build core package

# Code Quality
pnpm lint                   # Lint all packages (ESLint 9)
pnpm lint:fix               # Auto-fix linting issues
pnpm format                 # Format with Prettier
pnpm format:check           # Check formatting (used in CI)
pnpm type-check             # TypeScript type checking

# Testing (in packages/core)
cd packages/core
pnpm test                   # Run all tests
pnpm test component-name    # Test specific component
pnpm test:coverage          # Coverage report (80% threshold)
pnpm test:watch             # Watch mode
pnpm test:ui                # Vitest UI

# Git Workflow (ALWAYS USE)
pnpm commit                 # Interactive commit (Commitizen)
# Pre-commit hooks run automatically via Husky

# Dependencies
pnpm add <package> --filter=web  # Add to specific workspace
pnpm add -w <package>            # Add to root workspace

# Database (from apps/web or any app with Prisma)
pnpm db:setup               # Full setup: Docker up + migrate + seed
pnpm docker:up              # Start PostgreSQL container
pnpm docker:down            # Stop PostgreSQL container
pnpm docker:logs            # View PostgreSQL logs
pnpm docker:clean           # Remove container and volumes
pnpm db:generate            # Generate Prisma Client
pnpm db:migrate             # Create and apply migration (dev)
pnpm db:migrate:deploy      # Apply migrations (production)
pnpm db:push                # Push schema changes without migration
pnpm db:seed                # Seed database with sample data
pnpm db:studio              # Open Prisma Studio GUI
```

## 🔥 Critical Pattern #0: Project Scaffolding with Generators

**ALWAYS use generator scripts** to create new apps or APIs. They ensure
systematic setup with correct ports, dependencies, and configurations.

### Generate Next.js Web Apps

```bash
pnpm create:app <app-name>

# Examples:
pnpm create:app admin              # Creates apps/admin on port 3089
pnpm create:app customer-portal    # Creates apps/customer-portal on port 3042
```

**What it creates:**

- Copies from `templates/webapp` (generic template)
- Next.js 15 + TypeScript + i18n (next-intl)
- Prisma ORM with minimal schema
- @tavia/core UI components
- Vitest testing setup
- Auto-assigns unique port (3000-3099 range, deterministic from name hash)
- Creates `.env.local` with correct port and DATABASE_URL
- Example pages (home, about) - **replace with your actual pages**

**Port examples:**

- `web` → 3000 (reserved)
- `admin` → 3089
- `customer-portal` → 3042

**Port allocation algorithm:**

```javascript
// From scripts/create-app.js
const getAppPort = (name) => {
  // Hash-based deterministic port assignment (3000-3099 for web apps)
  // Same name always gets same port
  const hash = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % 100; // Adds to base 3000
};
```

**Why deterministic ports?**

- Same app name always gets same port (reproducible)
- Avoids port conflicts in monorepo
- Easy to remember (admin = 3089, always)
- Web apps: 3000-3099, APIs: 4000-4099

### Generate API Microservices

```bash
pnpm create:api <api-name>

# Interactive prompts:
# 1. Choose API type: Simple (Fastify) or Complex (NestJS)
# 2. For NestJS: Choose transport (REST, GraphQL, Microservice, WebSockets)

# Examples:
pnpm create:api notifications      # Option 1: Fastify (port 4047)
pnpm create:api payments           # Option 2: NestJS REST (port 4023)
```

**Simple API (Fastify)** - Copies from `templates/simple-api`:

- Fastify 5 + TypeScript + ES Modules
- Prisma ORM with minimal schema
- Zod validation
- Security (CORS, Helmet, Rate Limiting)
- Health check endpoints
- Example CRUD routes - **rename and implement your logic**

**Complex API (NestJS)** - Generates with NestJS CLI or copies from
`templates/complex-api`:

- NestJS 11 + TypeScript with decorators
- Prisma ORM (global module)
- Swagger/OpenAPI (REST only)
- class-validator + class-transformer
- Example resource module - **replace with your domain**
- Auto-assigns unique port (4000-4099 range)

**Key differences:**

- **Port ranges**: Web apps (3000-3099), APIs (4000-4099)
- **Templates are minimal**: Remove example code, add your business logic
- **Ports are deterministic**: Same name always gets same port (hash-based)

**After generation:**

1. Navigate: `cd apps/<name>`
2. Update `.env` with your config
3. Edit `prisma/schema.prisma` with your models
4. Run `pnpm db:generate && pnpm db:migrate`
5. Implement your routes/controllers (replace examples)
6. Start: `pnpm dev`

### Generate Mobile Apps (Expo)

```bash
pnpm create:mobile <app-name>

# Interactive prompts:
# 1. Choose template: Blank, Tabs (recommended), or Drawer

# Examples:
pnpm create:mobile customer-app    # Customer-facing mobile app
pnpm create:mobile owner-app       # Restaurant owner mobile app
```

**What it creates:**

- Uses Expo's official generator (`npx create-expo-app`)
- Expo SDK 52+ with TypeScript
- Expo Router for file-based routing (similar to Next.js App Router)
- Customized for Tavia monorepo:
  - @tavia/analytics integration
  - Catalog dependencies from pnpm-workspace.yaml
  - ESLint 9 flat config
  - Jest + React Native Testing Library
  - Environment configuration (.env.example)
  - API client utilities
  - Custom hooks (useColorScheme, etc.)

**Best practices included:**

- TypeScript strict mode
- Testing infrastructure with 70% coverage threshold
- Tavia ESLint and Prettier configs
- Workspace package integration
- Environment variable management
- Example tests and utilities

**After generation:**

1. Navigate: `cd apps/<name>`
2. Update `.env` with your API URLs
3. Run `pnpm install` (if not already run)
4. Start: `pnpm start` (Expo dev server)
5. Run on device:
   - `pnpm ios` (iOS simulator)
   - `pnpm android` (Android emulator)
6. Test: `pnpm test`

## ESLint 9 Flat Config

**Architecture:**

- Root: `eslint.config.js` - Workspace baseline
- Shared: `packages/eslint-config/` - Reusable configs (base, next,
  react-internal)
- Workspace-specific: Each app/package has own `eslint.config.js`

**@tavia/core config** allows warnings for React hooks edge cases:

```bash
# Package-level lint scripts
pnpm lint  # --max-warnings 10 (lenient for component library)
```

**Handling unused variables:**

```typescript
// ✅ Prefix with _ to satisfy ESLint
export const Component = ({ value, variant: _variant }: Props) => {
  return <div>{value}</div>;
};
```

**Key patterns:**

- Use ESLint 9 flat config (NOT `.eslintrc`)
- Extend shared configs from `@repo/eslint-config`
- Import without `.js` extension: `from '@repo/eslint-config/react-internal'`

## Component Testing Best Practices

Each component should have **15-50 tests** covering:

1. **Basic Rendering** (3-5 tests)

   ```typescript
   it('should render with default props', () => {
     const { container } = render(<Component />);
     expect(container.firstChild).toBeTruthy();
   });
   ```

2. **Variants** (1 test per variant)

   ```typescript
   it('should render success variant', () => {
     render(<Component variant="success" />);
     const element = screen.getByTestId('component');
     expect(element).toHaveAttribute('data-variant', 'success');
   });
   ```

3. **Event Handlers**

   ```typescript
   it('should call onClick when clicked', async () => {
     const handleClick = vi.fn();
     render(<Component onClick={handleClick} />);
     await userEvent.click(screen.getByRole('button'));
     expect(handleClick).toHaveBeenCalledTimes(1);
   });
   ```

4. **Accessibility**

   ```typescript
   it('should have correct ARIA attributes', () => {
     render(<Component label="Test" />);
     expect(screen.getByRole('button')).toHaveAccessibleName('Test');
   });
   ```

5. **Edge Cases**

   ```typescript
   it('should handle undefined props gracefully', () => {
     const { container } = render(<Component title={undefined} />);
     expect(container.firstChild).toBeTruthy();
   });
   ```

6. **Display Name**
   ```typescript
   it('should have display name', () => {
     expect(Component.displayName).toBe('ComponentName');
   });
   ```

**Radix UI Testing Notes:**

- Use `container.querySelector()` for multiple elements of same type
- Check Radix-specific attributes: `data-state`, `data-disabled`
- Some props (like `name` on Checkbox) may not appear in DOM

## TypeScript Best Practices

1. **Infer Return Types** (don't use explicit `: JSX.Element`)

   ```typescript
   // ✅ Correct - TypeScript infers return type
   export const Component = ({ children }: Props) => {
     return <div>{children}</div>;
   };

   // ❌ Wrong - Explicit JSX.Element causes issues
   export const Component = ({ children }: Props): JSX.Element => { ... };
   ```

2. **Empty Module Files** (don't export from empty files)

   ```typescript
   // ❌ Wrong - Causes "is not a module" errors
   export * from './parse'; // parse.ts is empty

   // ✅ Correct - Remove export or add content
   ```

3. **Catch Blocks** (omit unused error parameters)

   ```typescript
   // ✅ Correct
   try {
     new URL(input);
   } catch {
     return { success: false };
   }
   ```

4. **Emotion css Prop** (add JSX pragma)
   ```typescript
   // ✅ Correct
   /** @jsxImportSource @emotion/react */
   export const Tag = () => <div css={styles}>...</div>;
   ```

## Git Workflow (Conventional Commits)

**Pre-commit hooks** (configured in `.lintstagedrc.js`):

- Runs Prettier formatting on all staged files
- Runs TypeScript type-check across workspace (`pnpm type-check`)
- Commit-msg hook validates commit message format (conventional commits)

```javascript
// .lintstagedrc.js
module.exports = {
  '*.{js,jsx,ts,tsx,json,md,mdx,css,scss,yaml,yml}': ['prettier --write'],
  '*.{ts,tsx}': [() => 'pnpm type-check'],
};
```

```bash
# 1. Create feature branch
git checkout -b feat/your-feature

# 2. Make changes and stage
git add .

# 3. Commit with Commitizen (ALWAYS USE THIS)
pnpm commit
# Interactive prompt guides you through:
# - Type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
# - Scope: core, web, docs, etc.
# - Subject: short description (max 100 chars)
# - Body: detailed changes
# - Footer: breaking changes, closes issues

# 4. Push (pre-commit hooks run automatically on commit)
git push origin feat/your-feature
```

**Commit types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`build`, `ci`, `chore`, `revert`

**Examples:**

```bash
feat(core): add Button component with variants
fix(booking): prevent double booking race condition
docs(readme): update installation instructions
refactor(core): migrate to Lucide icons
```

## Database Workflows (Docker + Prisma)

**Architecture:**

- Docker Compose for local PostgreSQL (port 5432)
- Prisma ORM for schema management and migrations
- Each app has its own database and docker-compose.yml
- Container naming: `{app-name}-postgres` (e.g., `web-postgres`,
  `analytics-postgres`)

### Quick Start (New Developer)

```bash
cd apps/web
pnpm db:setup  # Starts Docker, runs migrations, seeds data
```

This single command:

1. Starts PostgreSQL container (`docker-compose up -d`)
2. Waits 3 seconds for database to be ready
3. Runs migrations (`prisma migrate dev`)
4. Seeds sample data (`tsx prisma/seed.ts`)

### Database Commands (from app directory)

```bash
# Docker Management
pnpm docker:up        # Start PostgreSQL (detached mode)
pnpm docker:down      # Stop PostgreSQL (keeps data)
pnpm docker:logs      # View container logs
pnpm docker:restart   # Restart PostgreSQL container
pnpm docker:clean     # Remove container AND volumes (⚠️ deletes data)

# Prisma Workflow
pnpm db:generate      # Generate Prisma Client (auto-runs on postinstall)
pnpm db:push          # Push schema changes without migration (dev only)
pnpm db:migrate       # Create and apply migration (dev)
pnpm db:migrate:deploy  # Apply migrations (production)
pnpm db:seed          # Run seed script
pnpm db:studio        # Open Prisma Studio GUI (localhost:5555)
```

### Schema Changes Workflow

```bash
# 1. Edit prisma/schema.prisma
# Add new model or fields

# 2. Create migration
pnpm db:migrate
# Prisma prompts for migration name
# This creates prisma/migrations/TIMESTAMP_migration_name/

# 3. Verify in Prisma Studio
pnpm db:studio

# 4. Commit migration files
git add prisma/migrations/
git commit -m "feat(db): add User table with roles"
```

### Docker Compose Pattern

Each app with Prisma has `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: {app-name}-postgres  # ⚠️ Unique per app
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
      POSTGRES_DB: ${POSTGRES_DB:-{app-name}}  # ⚠️ Matches app name
    ports:
      - '5432:5432'
    volumes:
      - {app-name}_postgres_data:/var/lib/postgresql/data
```

**Key patterns:**

- ✅ Container names are app-specific to avoid conflicts
- ✅ Database name defaults to app name
- ✅ Volume name prefixed with app name
- ✅ Use environment variables from `.env.local`

### Environment Variables

```env
# .env.local (in apps/web or any Prisma app)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/web"
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

**Prisma Client generation:**

- Auto-runs on `pnpm install` via `postinstall` hook
- Manual: `pnpm db:generate`
- Required after schema changes before TypeScript can see new models

## CI/CD Pipeline

**GitHub Actions** (`.github/workflows/ci.yml`):

- Triggers: Push to `main`/`develop`, all PRs
- Jobs run in parallel:
  - `lint`: ESLint + Prettier format check
  - `typecheck`: TypeScript type checking across all packages
  - `build`: Build all apps and packages with Turborepo caching
  - `test`: Run Vitest test suite (packages/core)
  - `commitlint`: Validate commit messages (PR only)
- Caching: pnpm store + Turborepo cache for faster builds
- Uses Node.js version from `.nvmrc` (18.18.0)

**Dependabot** (`.github/dependabot.yml`):

- Weekly updates (Mondays)
- Grouped by ecosystem (Next.js, React, ESLint, Storybook, etc.)

## Storybook Documentation

**Location**: `apps/docs/src/stories/core/`

**Structure** (category-based, NOT atomic design):

```
stories/core/
├── base/           # Button, Badge, Avatar, etc.
├── radix/          # Modal, Checkbox, Accordion, etc.
├── form/           # Input, Select, Switch, etc.
├── dialog/         # Alert, Drawer, Toast
├── layout/         # Card, Divider, LoadingScreen
├── navigation/     # Link, Pagination, Breadcrumb
├── state/          # EmptyState, LoadingState
└── table/          # DataTable, Table
```

**Story metadata:**

```typescript
const meta = {
  title: 'Core/Base/Button', // Core/Category/Component
  component: Button,
};
```

## Common Gotchas

1. **Always use catalog dependencies** - Never hardcode versions
2. **Import ESLint configs without `.js`** -
   `@repo/eslint-config/react-internal` not `react-internal.js`
3. **Prefix unused variables with `_`** - Avoids ESLint warnings
4. **Don't export from empty files** - Causes "is not a module" errors
5. **Add `@jsxImportSource @emotion/react`** for components using `css` prop
6. **Use `workspace:*` for internal packages** - Not version numbers
7. **Infer return types** - Don't use explicit `: JSX.Element`
8. **Radix components use `data-*` attributes** - Check these in tests, not DOM
   attributes
9. **Use `radii` tokens** - Never hardcode `border-radius: 8px`
10. **Transient props need `$` prefix** - `$variant`, not `variant`

## Key Files to Reference

- `pnpm-workspace.yaml` - Catalog dependencies (read this first!)
- `turbo.json` - Build pipeline config
- `packages/core/src/ui/` - All 54 components (flat structure)
- `packages/core/src/theme/tokens/` - Theme tokens (colors, radii)
- `.github/workflows/ci.yml` - CI/CD pipeline
- `eslint.config.js` - Root ESLint config
- `packages/eslint-config/` - Shared ESLint configs

## Implementation Guidelines

When adding features:

1. **Use generators for new projects** - `pnpm create:app` or `pnpm create:api`
   (never copy from existing apps)
2. **Add dependencies to catalog first** - Update `pnpm-workspace.yaml` before
   package.json
3. **Use ESLint 9 flat config** - Extend shared configs from
   `@repo/eslint-config`
4. **Commit with Commitizen** - `pnpm commit` for conventional commits
5. **Don't create summary docs** - No `COMPLETE.md`, `MIGRATION.md` files
6. **Write comprehensive tests** - 15-50 tests per component minimum
7. **Follow Emotion patterns** - Direct token imports, `$` prefix, `Styled`
   object export

---

**Remember:** This is a **microservices-first** project with a focus on UI
components. When creating new services:

- Use generators (`templates/`) not production apps (`apps/`)
- Web apps go in `apps/` (ports 3000-3099)
- APIs go in `apps/` (ports 4000-4099)
- Replace example code with your domain logic
- Share code via `packages/` (e.g., `@tavia/core` for UI, `@tavia/analytics` for
  tracking)
