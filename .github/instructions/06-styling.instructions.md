---
applyTo: '**/*.styles.{ts,tsx}'
---

# Emotion Styling Patterns

## ALL Components Use Emotion (NO SCSS)

**Web:** `@emotion/styled` **Mobile:** `@emotion/native`

## Styled Components Pattern

```typescript
import styled from '@emotion/styled';
import { theme } from '@tavia/taviad';

type Variant = 'success' | 'warning' | 'danger';

/**
 * MUST use this export pattern
 */
export const Styled = {
  Wrapper: styled.div<{ $variant?: Variant; $isFilled?: boolean }>`
    padding: 0.75rem 1rem;
    border-radius: ${theme.radii.md}; // ⚠️ Use theme.radii, NOT px
    background-color: ${({ $variant = 'success' }) => {
      const colors = {
        success: theme.colors.successLight,
        warning: theme.colors.warningLight,
        danger: theme.colors.dangerLight,
      };
      return colors[$variant];
    }};
    color: ${({ $variant = 'success' }) => {
      const colors = {
        success: theme.colors.success,
        warning: theme.colors.warning,
        danger: theme.colors.danger,
      };
      return colors[$variant];
    }};
  `,
};
```

## Theme Object (MANDATORY)

**⚠️ CRITICAL: NEVER use `cssVars` or raw tokens directly. ALWAYS use `theme`
object.**

```typescript
import { theme } from '@tavia/taviad';

// ✅ CORRECT - Use theme object
theme.colors.primary;
theme.colors.text.primary;
theme.colors.border.default;
theme.radii.md;
theme.spacing.md;

// ❌ WRONG - Never use cssVars directly
import { cssVars } from '@tavia/taviad/theme/tokens/colors';
cssVars.mainColor; // ❌ FORBIDDEN
cssVars.gray600; // ❌ FORBIDDEN

// ❌ WRONG - Never use raw values
color: '#ff695c'; // ❌ FORBIDDEN
border-radius: 8px; // ❌ FORBIDDEN
```

## Available Theme Properties

**Colors:**

```typescript
// Brand
theme.colors.primary;
theme.colors.primaryHover;
theme.colors.primaryActive;

// Semantic
theme.colors.success;
theme.colors.successLight;
theme.colors.warning;
theme.colors.warningLight;
theme.colors.danger;
theme.colors.dangerLight;
theme.colors.info;
theme.colors.infoLight;

// Text
theme.colors.text.primary;
theme.colors.text.secondary;
theme.colors.text.tertiary;
theme.colors.text.disabled;
theme.colors.text.inverse;

// Borders
theme.colors.border.default;
theme.colors.border.hover;
theme.colors.border.focus;

// Backgrounds
theme.colors.background;
theme.colors.surface;
theme.colors.surfaceHover;
theme.colors.overlay;
```

**Border Radii:**

```typescript
theme.radii.none; // 0px
theme.radii.sm; // 4px
theme.radii.md; // 6px
theme.radii.lg; // 8px
theme.radii.xl; // 12px
theme.radii.full; // 9999px
```

**Spacing:**

```typescript
theme.spacing.xs; // 0.25rem (4px)
theme.spacing.sm; // 0.5rem (8px)
theme.spacing.md; // 0.75rem (12px)
theme.spacing.lg; // 1rem (16px)
theme.spacing.xl; // 1.5rem (24px)
theme.spacing['2xl']; // 2rem (32px)
```

## Critical Emotion Rules

1. ✅ Import theme: `import { theme } from '@tavia/taviad'`
2. ✅ Export as `Styled` object:
   `export const Styled = { Wrapper: styled.div`...` }`
3. ✅ Transient props use `$` prefix: `$variant`, `$isActive`
4. ✅ Use theme properties: `${theme.radii.md}`, `${theme.colors.primary}`
5. ❌ **NEVER** import or use `cssVars` from `@tavia/taviad/theme/tokens/colors`
6. ❌ **NEVER** hardcode colors: `#ff695c`, `rgb()`, `rgba()`
7. ❌ **NEVER** hardcode radii: `8px`, `border-radius: 0.5rem`
8. ❌ Don't use props without `$` in styled components

## Emotion SSR (Server-Side Rendering)

Emotion 10+ works with Next.js 15 SSR **out of the box**:

✅ **Already configured:**

- `next.config.ts`: `compiler: { emotion: true }`
- Root layout: `<html suppressHydrationWarning>`
- Client components: `'use client'` on all Emotion styled components

❌ **Do NOT use advanced SSR setup** (CacheProvider, extractCritical) - only for
custom servers

## Layout Pattern (Prevent Hydration Errors)

```tsx
// ✅ CORRECT - Root layout (minimal)
export default async function RootLayout({ children }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ClientProviders>
          {' '}
          {/* GlobalStyles here */}
          {children} {/* ← No Emotion components */}
        </ClientProviders>
      </body>
    </html>
  );
}

// ✅ CORRECT - Page-level layout (client component)
('use client');

export function DefaultLayout({ children }) {
  return (
    <>
      <Header /> {/* Emotion styled */}
      <Sidebar /> {/* Emotion styled */}
      {children}
    </>
  );
}

// ❌ WRONG - Styled components in root layout
export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header /> {/* ❌ Causes hydration errors */}
        {children}
      </body>
    </html>
  );
}
```

## Key SSR Rules

1. ✅ Root layout: Providers only, no Emotion styled components
2. ✅ Add `suppressHydrationWarning` to `<html>` tag
3. ✅ Use `'use client'` on all components with styled components
4. ✅ Apply layouts at page level or via route groups
5. ✅ Keep `compiler: { emotion: true }` in next.config.ts
6. ❌ Never render Emotion styled components in server layouts
7. ❌ Don't use CacheProvider unless custom server
