# CSS Variables to Direct Token Access Migration Guide

## Why Migrate?

**CSS Variables** (`var(--xxx)`) vs **Direct Token Access** (`cssVars.xxx`):

| Aspect            | CSS Variables `var(--xxx)`    | Direct Tokens `cssVars.xxx`     |
| ----------------- | ----------------------------- | ------------------------------- |
| **Performance**   | ❌ Slower (runtime lookup)    | ✅ Faster (compile-time)        |
| **Type Safety**   | ❌ No TypeScript              | ✅ Full TypeScript autocomplete |
| **Debugging**     | ❌ Hard to trace              | ✅ Easy to trace                |
| **Theme Support** | ⚠️ Requires CSS regeneration  | ✅ Direct Emotion theme access  |
| **Bundle Size**   | ❌ Larger (CSS vars + tokens) | ✅ Smaller (tokens only)        |

## Migration Steps

### 1. Colors

**❌ Before (CSS Variables)**:

```typescript
import styled from '@emotion/styled';

const StyledButton = styled.button`
  color: var(--dark);
  background: var(--main-color);
  border: 1px solid var(--light);

  &:hover {
    background: var(--main-color-dark);
  }
`;
```

**✅ After (Direct Tokens)**:

```typescript
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';

const StyledButton = styled.button`
  color: ${cssVars.gray900};
  background: ${cssVars.mainColor};
  border: 1px solid ${cssVars.gray0};

  &:hover {
    background: ${cssVars.mainColorDark};
  }
`;
```

### 2. Border Radius

**❌ Before (CSS Variables)**:

```typescript
const StyledCard = styled.div`
  border-radius: var(--border-radius-medium);
`;
```

**✅ After (Direct Tokens)**:

```typescript
import { radii } from '../../../theme/tokens/radii';

const StyledCard = styled.div`
  border-radius: ${radii.md};
`;
```

### 3. Spacing & Layout

**❌ Before (Hardcoded or CSS vars)**:

```typescript
const StyledContainer = styled.div`
  padding: 16px;
  gap: 8px;
`;
```

**✅ After (Theme tokens)**:

```typescript
const StyledContainer = styled.div`
  padding: 1rem; /* Or ${({ theme }) => theme.spacing.md} */
  gap: 0.5rem; /* Or ${({ theme }) => theme.spacing.sm} */
`;
```

## Token Reference

### Available Imports

```typescript
// Colors (all color tokens)
import { cssVars } from '../../../theme/tokens/colors';

// Border radius
import { radii } from '../../../theme/tokens/radii';

// Full theme access (for spacing, sizing, etc.)
import { theme } from '../../../theme/theme';
```

### Color Token Mapping

| CSS Variable              | Direct Token              | Value                 |
| ------------------------- | ------------------------- | --------------------- |
| `var(--main-color)`       | `cssVars.mainColor`       | Primary brand color   |
| `var(--dark)`             | `cssVars.gray900`         | Dark text/backgrounds |
| `var(--light)`            | `cssVars.gray0`           | Light backgrounds     |
| `var(--light-2)`          | `cssVars.gray100`         | Light backgrounds     |
| `var(--light-3)`          | `cssVars.gray200`         | Light backgrounds     |
| `var(--light-4)`          | `cssVars.gray300`         | Light borders         |
| `var(--background-color)` | `cssVars.backgroundColor` | Page background       |

### Border Radius Mapping

| CSS Variable                  | Direct Token | Value          |
| ----------------------------- | ------------ | -------------- |
| `var(--border-radius-small)`  | `radii.sm`   | 4px (0.25rem)  |
| `var(--border-radius-medium)` | `radii.md`   | 8px (0.5rem)   |
| `var(--border-radius-large)`  | `radii.lg`   | 12px (0.75rem) |
| `var(--border-radius-round)`  | `radii.full` | 9999px         |

## Components To Migrate

**Priority 1 - High Usage**:

- [ ] Tooltip
- [ ] Toast / ToastContainer
- [ ] Table
- [ ] Tabs
- [ ] Spinner

**Priority 2 - Medium Usage**:

- [ ] Modal
- [ ] Drawer
- [ ] Popover
- [ ] MenuBar
- [ ] DropdownMenu (already has some radii)

**Priority 3 - Lower Usage**:

- [ ] RichTextEditor
- [ ] FileUpload
- [ ] ImageUpload
- [ ] Combobox
- [ ] Select

## Migration Checklist

For each component:

- [ ] Replace `var(--xxx)` with `cssVars.xxx` or `radii.xxx`
- [ ] Update imports to include token files
- [ ] Remove hardcoded px values for border-radius
- [ ] Use rem units for spacing instead of px
- [ ] Test component in light/dark mode
- [ ] Run type-check: `pnpm type-check`
- [ ] Run tests: `pnpm test -- <component-name>`
- [ ] Verify in Storybook

## Dark Mode Support

### Current Issue

Components using `cssVars.gray0` are **not theme-aware**:

```typescript
// ❌ Always white, even in dark mode
background: ${cssVars.gray0};
```

### Better Approach

Use Emotion theme for semantic tokens:

```typescript
// ✅ Theme-aware via Emotion theme
background: ${({ theme }) => theme.colors.surface};
color: ${({ theme }) => theme.colors.text.primary};
```

## Future: Full Theme Migration

Eventually, we should migrate to a complete theme-aware system:

```typescript
// Future state - full theme integration
const StyledButton = styled.button`
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.primary.base};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md};
`;
```

This requires:

1. Exporting theme from ThemeProvider
2. Using `<ThemeProvider theme={theme}>` wrapper
3. Accessing theme via props in styled components

## Questions?

See:

- `docs/EMOTION_GUIDELINES.md` - Emotion best practices
- `docs/COMPONENT_ENHANCEMENT_PLAN.md` - Systematic enhancement plan
- `.github/copilot-instructions.md` - Complete guidelines
