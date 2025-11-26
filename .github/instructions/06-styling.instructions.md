---
applyTo: '**/*.styles.{ts,tsx}'
---

# Emotion Styling Patterns

## ALL Components Use Emotion (NO SCSS)

**Web:** `@emotion/styled` **Mobile:** `@emotion/native`

## Styled Components Pattern

```typescript
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { radii } from '../../../theme/tokens/radii';

type Variant = 'success' | 'warning' | 'danger';

const getVariantColors = (variant: Variant = 'success') =>
  ({
    success: { base: cssVars.colorSuccess, light: cssVars.colorSuccessLight },
    warning: { base: cssVars.colorWarning, light: cssVars.colorWarningLight },
    danger: { base: cssVars.colorDanger, light: cssVars.colorDangerLight },
  })[variant];

/**
 * MUST use this export pattern
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

## Theme Tokens

**Colors:**

```typescript
import { cssVars } from '../../../theme/tokens/colors';

// Brand
cssVars.mainColor
cssVars.mainColorLight
cssVars.mainColorDark

// Signals
cssVars.colorSuccess
cssVars.colorWarning
cssVars.colorDanger
cssVars.colorInfo

// Grays
gray0, gray100, gray200, ..., gray1000

// Light/Dark
light, light2, light3, ..., light6
dark, dark2, dark3
```

**Border Radii:**

```typescript
import { radii } from '../../../theme/tokens/radii';

radii.none; // 0px
radii.sm; // 4px
radii.md; // 6px
radii.lg; // 8px
radii.xl; // 12px
radii.full; // 9999px
```

**Spacing:**

```typescript
// Use rem, NOT px
0.25rem  // 4px
0.5rem   // 8px
0.75rem  // 12px
1rem     // 16px
1.5rem   // 24px
2rem     // 32px
```

## Critical Emotion Rules

1. ✅ Import tokens: `import { cssVars } from '../../../theme/tokens/colors'`
2. ✅ Export as `Styled` object:
   `export const Styled = { Wrapper: styled.div`...` }`
3. ✅ Transient props use `$` prefix: `$variant`, `$isActive`
4. ✅ Use `radii` tokens: `${radii.md}` NOT `8px`
5. ✅ Hex opacity: `${colors.light}20` (20 = 12%)
6. ❌ Don't hardcode colors/radii
7. ❌ Don't use props without `$` in styled components

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
