# Emotion Best Practices for @tavia/core

Based on official
[Emotion documentation](https://emotion.sh/docs/best-practices) and applied to
our component library.

## 🎯 Core Principles

### 1. **Use TypeScript and Object Styles**

✅ **DO**: Use object styles for type safety and IntelliSense

```typescript
const styles = css({
  color: 'blue',
  fontSize: '16px',
  display: 'flex',
});
```

❌ **DON'T**: Use template string styles (no type checking)

```typescript
const styles = css`
  color: blue;
  font-size: 16px;
`;
```

### 2. **Colocate Styles with Components**

Keep styles in the same file or adjacent `.styles.ts` file:

```
button/
├── components/
│   ├── Button.tsx        # Component logic
│   └── Button.styles.ts  # Component styles
├── types/
│   └── index.ts
└── index.ts
```

### 3. **Use Direct Theme Token Access (NOT CSS Variables)**

✅ **DO**: Import and use theme tokens directly

```typescript
import { cssVars } from '../../../theme/tokens/colors';

const StyledButton = styled.button`
  background-color: ${cssVars.mainColor};
  color: ${cssVars.light};
`;
```

❌ **DON'T**: Use CSS custom properties (not type-safe)

```typescript
const StyledButton = styled.button`
  background-color: var(--main-color);
  color: var(--light);
`;
```

### 4. **Define Styles Outside Components**

✅ **DO**: Define styles outside for performance (serialized once)

```typescript
const buttonStyles = css({
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  fontWeight: 500
});

export const Button = () => <button css={buttonStyles}>Click me</button>;
```

❌ **DON'T**: Define styles inline (serialized on every render)

```typescript
export const Button = () => (
  <button css={{ padding: '0.5rem 1rem', borderRadius: '6px' }}>
    Click me
  </button>
);
```

### 5. **Use `style` Prop for Dynamic Styles**

✅ **DO**: Use inline styles for frequently changing values

```typescript
<div
  css={avatarStyles}
  style={{ transform: `translate(${x}px, ${y}px)` }}
/>
```

❌ **DON'T**: Pass dynamic styles through css prop (creates duplicate CSS)

```typescript
<div css={css({ transform: `translate(${x}px, ${y}px)` })} />
```

### 6. **Composition with Arrays**

Use array composition for style precedence:

```typescript
const baseStyles = css({ color: 'blue' });
const dangerStyles = css({ color: 'red' });

// Red wins (last in array)
<div css={[baseStyles, dangerStyles]} />
```

### 7. **Variant Pattern with Helper Functions**

✅ **DO**: Create helper functions for variant mapping

```typescript
type Variant = 'primary' | 'secondary' | 'danger';

interface VariantColors {
  bg: string;
  color: string;
  hover: string;
}

const getVariantColors = (variant: Variant): VariantColors => {
  const map: Record<Variant, VariantColors> = {
    primary: {
      bg: cssVars.mainColor,
      color: cssVars.light,
      hover: cssVars.mainColorDark,
    },
    // ... other variants
  };
  return map[variant];
};

const StyledButton = styled.button<{ $variant: Variant }>`
  ${({ $variant }) => {
    const colors = getVariantColors($variant);
    return `
      background-color: ${colors.bg};
      color: ${colors.color};
      &:hover {
        background-color: ${colors.hover};
      }
    `;
  }}
`;
```

### 8. **Transient Props (Prefix with $)**

Always prefix style-only props with `$` to prevent DOM warnings:

```typescript
✅ const Styled = styled.div<{ $isActive?: boolean }>`
  opacity: ${({ $isActive }) => $isActive ? 1 : 0.5};
`;

❌ const Styled = styled.div<{ isActive?: boolean }>`
  opacity: ${({ isActive }) => isActive ? 1 : 0.5};
`;
// ⚠️ Warning: React does not recognize the `isActive` prop on a DOM element
```

### 9. **Export Pattern to Avoid TypeScript Errors**

✅ **DO**: Export in `Styled` object

```typescript
const StyledButton = styled.button`...`;
const StyledIcon = styled.span`...`;

export const Styled = {
  Button: StyledButton,
  Icon: StyledIcon,
};
```

❌ **DON'T**: Direct inline styled calls in export

```typescript
export const Styled = {
  Button: styled.button`...`, // TS declaration errors
};
```

### 10. **Theme Usage**

Only use theme if you support multiple themes (light/dark mode):

```typescript
import { useTheme } from '@emotion/react';

const Component = () => {
  const theme = useTheme();
  return <div css={{ color: theme.colors.primary }} />;
};
```

For single theme apps, use JavaScript constants instead.

## 📋 Component Checklist

When creating/updating components:

- [ ] Use TypeScript with proper interfaces
- [ ] Define styles outside component function
- [ ] Use object styles (not template literals)
- [ ] Import theme tokens directly (no CSS variables)
- [ ] Use transient props ($) for styled-only props
- [ ] Create variant helper functions for dynamic styles
- [ ] Use `style` prop for truly dynamic values
- [ ] Export styled components in `Styled` object
- [ ] Add comprehensive JSDoc documentation
- [ ] Use `as const` for type literals

## 🎨 Real-World Examples

### Button Component

```typescript
/**
 * Button component styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

type Variant = 'primary' | 'secondary' | 'danger';

interface VariantColors {
  bg: string;
  color: string;
  hoverBg: string;
}

const getVariantColors = (variant: Variant): VariantColors => {
  const map: Record<Variant, VariantColors> = {
    primary: {
      bg: cssVars.mainColor,
      color: cssVars.light,
      hoverBg: cssVars.mainColorDark,
    },
    secondary: {
      bg: cssVars.gray200,
      color: cssVars.dark,
      hoverBg: cssVars.gray300,
    },
    danger: {
      bg: cssVars.colorDanger,
      color: cssVars.light,
      hoverBg: cssVars.colorRedDark,
    },
  };
  return map[variant];
};

const StyledButton = styled.button<{ $variant?: Variant }>`
  ${({ $variant = 'primary' }) => {
    const colors = getVariantColors($variant);
    return `
      background-color: ${colors.bg};
      color: ${colors.color};
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background-color: ${colors.hoverBg};
        transform: translateY(-1px);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;
  }}
`;

export const Styled = {
  Button: StyledButton,
};
```

### Alert Component

```typescript
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

type AlertVariant = 'success' | 'warning' | 'danger' | 'info';

interface VariantColors {
  base: string;
  light: string;
  bg: string;
}

const getVariantColors = (variant: AlertVariant): VariantColors => {
  const map: Record<AlertVariant, VariantColors> = {
    success: {
      base: cssVars.colorSuccess,
      light: cssVars.colorSuccessLight,
      bg: cssVars.colorSuccessLight + '20',
    },
    // ... other variants
  };
  return map[variant];
};

const StyledWrapper = styled.div<{
  $variant?: AlertVariant;
  $isFilled?: boolean;
}>`
  ${({ $variant = 'info', $isFilled = false }) => {
    const colors = getVariantColors($variant);
    return `
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid ${$isFilled ? colors.light : colors.base};
      background-color: ${$isFilled ? colors.bg : 'transparent'};
      color: ${colors.base};
    `;
  }}
`;

export const Styled = {
  Wrapper: StyledWrapper,
};
```

## 🚀 Performance Tips

1. **Memoize expensive computations**

```typescript
const expensiveStyles = useMemo(
  () =>
    css({
      /* complex styles */
    }),
  [dependency]
);
```

2. **Use CSS variables for animation** (via style prop)

```typescript
<div
  css={staticStyles}
  style={{ '--x': x, '--y': y } as React.CSSProperties}
/>
```

3. **Avoid inline arrow functions in styled**

```typescript
// ✅ Good
const getColor = (isActive: boolean) => (isActive ? 'red' : 'blue');
const Styled = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive }) => getColor($isActive)};
`;

// ❌ Bad (creates new function each render)
const Styled = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? 'red' : 'blue')};
`;
```

## 📚 Additional Resources

- [Official Emotion Best Practices](https://emotion.sh/docs/best-practices)
- [Object Styles](https://emotion.sh/docs/object-styles)
- [Composition](https://emotion.sh/docs/composition)
- [TypeScript](https://emotion.sh/docs/typescript)
- [Performance](https://emotion.sh/docs/performance)

## ❓ When Do You Need `/** @jsxImportSource @emotion/react */`?

### ✅ **YES - You NEED the pragma when:**

You use the **`css` prop** directly on JSX elements:

```typescript
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const Tag = () => (
  <div css={css({ padding: '0.5rem', color: 'blue' })}>
    Content
  </div>
);
```

**Why?** The pragma tells TypeScript to use Emotion's JSX factory instead of
React's default. Without it, you'll get:

```
Property 'css' does not exist on type 'DetailedHTMLProps<...>'
```

### ❌ **NO - You DON'T NEED the pragma when:**

You ONLY use **styled components** (no `css` prop):

```typescript
// ❌ Unnecessary pragma - no css prop used
/** @jsxImportSource @emotion/react */
import { Styled } from './Button.styles';

export const Button = () => (
  <Styled.Button>Click me</Styled.Button>
);
```

✅ **Correct version - remove pragma:**

```typescript
// ✅ No pragma needed - styled components only
import { Styled } from './Button.styles';

export const Button = () => (
  <Styled.Button>Click me</Styled.Button>
);
```

### 📋 Quick Decision Tree

```
Do you use css={...} on JSX elements?
├─ YES → Add /** @jsxImportSource @emotion/react */
└─ NO  → Remove pragma (unnecessary)
```

### 🔍 Real Examples from @tavia/core

**Needs Pragma** (uses `css` prop):

```typescript
/** @jsxImportSource @emotion/react */  ✅
import { tagStyles } from './Tag.styles';

export const Tag = () => (
  <div css={tagStyles.wrapper}>  // ← css prop used
    <span css={tagStyles.body}>Content</span>
  </div>
);
```

**Doesn't Need Pragma** (styled components only):

```typescript
// No pragma needed  ✅
import { Styled } from './Button.styles';

export const Button = () => (
  <Styled.Button>  // ← styled component, not css prop
    Click me
  </Styled.Button>
);
```

### ⚠️ Common Mistake

Don't blindly copy the pragma to all files. Check if `css={...}` is actually
used:

```typescript
// ❌ Bad - pragma not needed
/** @jsxImportSource @emotion/react */
import { WrapperStyled } from './Badge.styles';

export const Badge = () => (
  <WrapperStyled>Content</WrapperStyled>
);
```

```typescript
// ✅ Good - pragma removed
import { WrapperStyled } from './Badge.styles';

export const Badge = () => (
  <WrapperStyled>Content</WrapperStyled>
);
```

## 🎓 Migration Guide

When updating legacy components:

1. Replace CSS variables with direct token imports
2. Convert template literal styles to object styles
3. Add proper TypeScript interfaces
4. Implement variant helper functions
5. Use transient props ($) for styled-only props
6. Move styles outside component functions
7. **Remove `@jsxImportSource` pragma if not using `css` prop**
8. Add comprehensive documentation
9. Test with TypeScript strict mode

---

**Last Updated**: October 2025 **Emotion Version**: 11.x **Target**: @tavia/core
component library
