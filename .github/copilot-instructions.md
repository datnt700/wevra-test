# Tavia - AI Agent Instructions

Tavia is a Next.js 15 café/restaurant booking platform in early development
(v0.0.1-rc1). Current focus: building `@tavia/core`, a comprehensive UI
component library with 54+ components.

## 🎯 What Exists Today

- ✅ **@tavia/core**: 54+ production-ready UI components (Emotion + Radix UI)
- ✅ **Turborepo monorepo** with pnpm v10.17.1 workspaces & catalog dependencies
- ✅ **Storybook** documentation (`apps/docs`)
- ✅ **Next.js 15 app shell** (`apps/web`, basic only)
- ✅ **Dev tooling**: ESLint 9 flat config, Prettier, Husky, Commitizen,
  lint-staged
- ✅ **CI/CD**: GitHub Actions (lint, typecheck, build, test, commitlint)
- ✅ **Testing**: Vitest + Testing Library with 15-50 tests per component
- ❌ **NOT implemented**: Database, Auth, API routes, booking logic

## Tech Stack

- **Runtime**: Node.js 18.18.0+ (see `.nvmrc`)
- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: 100% Emotion (NO SCSS) + Radix UI primitives
- **Package Manager**: pnpm v10.17.1 with catalog dependencies
- **Build**: Turborepo for caching & orchestration
- **Linting**: ESLint 9 flat config (NOT .eslintrc)
- **Testing**: Vitest + Testing Library with 15-50 tests per component
- **Docs**: Storybook 8.4.2

## Structure

```
tavia/
├── apps/
│   ├── web/              # Next.js 15 app shell
│   └── docs/             # Storybook
├── packages/
│   ├── core/             # @tavia/core - 54+ components ⭐ PRIMARY FOCUS
│   ├── ui/               # @repo/ui - Legacy minimal UI
│   ├── eslint-config/    # Shared ESLint 9 configs
│   └── typescript-config/
├── pnpm-workspace.yaml   # 🔥 CRITICAL - Catalog dependencies
├── turbo.json            # Build pipeline config
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
```

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
- Runs TypeScript type-check across workspace
- Commit-msg hook validates commit message format

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
# - Subject: short description
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

1. **Add dependencies to catalog first** - Update `pnpm-workspace.yaml` before
   package.json
2. **Use ESLint 9 flat config** - Extend shared configs from
   `@repo/eslint-config`
3. **Commit with Commitizen** - `pnpm commit` for conventional commits
4. **Don't create summary docs** - No `COMPLETE.md`, `MIGRATION.md` files
5. **Write comprehensive tests** - 15-50 tests per component minimum
6. **Follow Emotion patterns** - Direct token imports, `$` prefix, `Styled`
   object export

---

**Remember:** This is a **component library-first** project. Backend features
(Prisma, Auth, API routes) are planned but not implemented. Focus on building
reusable, accessible, well-tested UI components.
