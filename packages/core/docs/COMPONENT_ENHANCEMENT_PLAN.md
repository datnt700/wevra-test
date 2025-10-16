# Component Enhancement Plan - Emotion Best Practices

Systematic plan to enhance all 50+ UI components with Emotion best practices.

## ✅ Completed Components (3/54)

1. **Alert** - Already follows best practices ✓
2. **Button** - Enhanced with variant system ✓
3. **Badge** - Enhanced with interactive states ✓

## 📋 Enhancement Checklist

For each component:

- [ ] Import theme tokens directly (`cssVars`, `styleVars`)
- [ ] Use TypeScript types for variants and props
- [ ] Create variant helper functions (if applicable)
- [ ] Use transient props with `$` prefix
- [ ] Add comprehensive JSDoc documentation
- [ ] Define styles outside component for performance
- [ ] Export in `Styled` object pattern
- [ ] Test with type-check
- [ ] Verify in Storybook

## 🎯 Priority Groups

### 1. High Priority - Form Components (13)

Most user-facing interactive elements:

- [ ] **Input** - Text input with validation states
- [ ] **InputNumber** - Number input with steppers
- [ ] **InputSearch** - Search input with icons
- [ ] **InputTags** - Multi-value tag input
- [ ] **TextArea** - Multi-line text input
- [ ] **Select** - Dropdown select
- [ ] **Combobox** - Searchable select with autocomplete
- [ ] **Checkbox** / **CheckboxCard** - Checkbox inputs
- [ ] **Radio** / **RadioGroup** / **RadioCard** - Radio inputs
- [ ] **Switch** - Toggle switches
- [ ] **Slider** - Range sliders
- [ ] **Label** - Form labels
- [ ] **Field** - Form field wrapper

### 2. Medium Priority - Layout & Dialog (11)

Essential for app structure:

- [ ] **Card** - Card containers
- [ ] **Modal** - Dialog modals
- [ ] **Drawer** - Side panel drawers
- [ ] **Tooltip** - Hover tooltips
- [ ] **Popover** - Floating content panels
- [ ] **DropdownMenu** - Context menus and dropdowns
- [ ] **Divider** - Visual dividers
- [ ] **Tabs** - Tab navigation
- [ ] **Accordion** - Collapsible content sections
- [ ] **Toast** - Toast notifications
- [ ] **MenuBar** - Menu bar navigation

### 3. Standard Priority - Display Components (10)

Visual elements:

- [ ] **Avatar** - User avatars
- [ ] **Icon** - Lucide icon wrapper
- [ ] **Image** - Responsive images
- [ ] **Code** - Inline code snippets
- [ ] **Tag** - Removable tags/chips
- [ ] **Spinner** - Loading spinners
- [ ] **ProgressBar** - Progress indicators
- [ ] **Skeleton** - Loading skeletons
- [ ] **Breadcrumb** - Breadcrumb trails
- [ ] **Link** - Navigation links

### 4. Standard Priority - State Components (5)

State displays:

- [ ] **EmptyState** - Empty state placeholders
- [ ] **ErrorState** - Error state displays
- [ ] **LoadingState** - Loading state with spinner
- [ ] **LoadingLogo** - Animated logo loader
- [ ] **LoadingScreen** - Full-screen loaders

### 5. Lower Priority - Complex Components (6)

Specialized functionality:

- [ ] **DataTable** - Data table with TanStack Table
- [ ] **Table** - Feature-rich table
- [ ] **RichTextEditor** - WYSIWYG editor (TipTap)
- [ ] **FileUpload** - File upload with drag & drop
- [ ] **ImageUpload** - Image upload with cropping
- [ ] **Form** - Form wrapper with validation

### 6. Layout & Container Components (6)

Structure components:

- [ ] **ButtonGroup** - Button groups
- [ ] **Pagination** - Page navigation
- [ ] **Sidebar** - Collapsible sidebars
- [ ] **ScrollBox** - Scrollable containers
- [ ] **ThemeProvider** - Theme context wrapper (already good)

## 🔧 Standard Enhancement Pattern

### File: `Component.styles.ts`

```typescript
/**
 * Component styles using Emotion
 * Follows Emotion best practices with direct theme token access
 * @module Component.styles
 */
import styled from '@emotion/styled';
import { cssVars } from '../../../theme/tokens/colors';
import { styleVars } from '../../../theme/tokens/variables';

// 1. Define TypeScript types
type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
type ComponentSize = 'sm' | 'md' | 'lg';

interface VariantColors {
  bg: string;
  color: string;
  border: string;
  hover: string;
}

// 2. Create variant helper function (outside component)
const getVariantColors = (
  variant: ComponentVariant = 'primary'
): VariantColors => {
  const variantMap: Record<ComponentVariant, VariantColors> = {
    primary: {
      bg: cssVars.mainColor,
      color: cssVars.light,
      border: cssVars.mainColor,
      hover: cssVars.mainColorDark,
    },
    secondary: {
      bg: cssVars.gray200,
      color: cssVars.dark,
      border: cssVars.gray300,
      hover: cssVars.gray300,
    },
    success: {
      bg: cssVars.colorSuccess,
      color: cssVars.light,
      border: cssVars.colorSuccess,
      hover: cssVars.colorGreenDark,
    },
    warning: {
      bg: cssVars.colorWarning,
      color: cssVars.dark,
      border: cssVars.colorWarning,
      hover: cssVars.colorYellowDark,
    },
    danger: {
      bg: cssVars.colorDanger,
      color: cssVars.light,
      border: cssVars.colorDanger,
      hover: cssVars.colorRedDark,
    },
  };

  return variantMap[variant];
};

// 3. Create size helper function (if applicable)
const getSizeStyles = (size: ComponentSize = 'md'): string => {
  const sizeMap: Record<ComponentSize, string> = {
    sm: 'padding: 0.25rem 0.5rem; font-size: 0.875rem;',
    md: 'padding: 0.5rem 1rem; font-size: 1rem;',
    lg: 'padding: 0.75rem 1.5rem; font-size: 1.125rem;',
  };

  return sizeMap[size];
};

// 4. Styled component with transient props ($)
const StyledComponent = styled.div<{
  $variant?: ComponentVariant;
  $size?: ComponentSize;
  $isDisabled?: boolean;
}>`
  ${({ $variant = 'primary', $size = 'md', $isDisabled = false }) => {
    const colors = getVariantColors($variant);
    const sizeStyles = getSizeStyles($size);

    return `
      /* Base styles */
      display: flex;
      align-items: center;
      border-radius: ${styleVars.borderRadiusMedium};
      transition: all 0.2s ease-in-out;

      /* Size styles */
      ${sizeStyles}

      /* Color styles */
      background-color: ${colors.bg};
      color: ${colors.color};
      border: 1px solid ${colors.border};

      /* Interactive states */
      ${
        !$isDisabled
          ? `
        cursor: pointer;

        &:hover {
          background-color: ${colors.hover};
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(0);
        }

        &:focus-visible {
          outline: 2px solid ${colors.border};
          outline-offset: 2px;
        }
      `
          : `
        opacity: 0.6;
        cursor: not-allowed;
      `
      }
    `;
  }}
`;

// 5. Export in Styled object
export const Styled = {
  Component: StyledComponent,
};
```

### File: `Component.tsx`

```typescript
/** @jsxImportSource @emotion/react */
import { Styled } from './Component.styles';
import { ComponentProps } from '../types';

export const Component = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...other
}: ComponentProps) => {
  return (
    <Styled.Component
      $variant={variant}
      $size={size}
      $isDisabled={disabled}
      {...other}
    >
      {children}
    </Styled.Component>
  );
};
```

## 📊 Progress Tracking

**Total Components**: 54 **Completed**: 3 (5.6%) **Remaining**: 51 (94.4%)

**By Priority**:

- High Priority (Form): 0/13 (0%)
- Medium Priority (Layout/Dialog): 0/11 (0%)
- Standard Priority (Display): 0/10 (0%)
- Standard Priority (State): 0/5 (0%)
- Lower Priority (Complex): 0/6 (0%)
- Container: 0/6 (0%)
- Already Complete: 3/3 (100%)

## 🚀 Implementation Strategy

### Phase 1: Form Components (Week 1)

Focus on most user-facing components first. Batch in groups of 3-5 similar
components.

**Batch 1.1**: Text Inputs

- Input, InputNumber, InputSearch, TextArea

**Batch 1.2**: Select Components

- Select, Combobox

**Batch 1.3**: Toggle Components

- Checkbox, CheckboxCard, Radio, RadioGroup, RadioCard, Switch

**Batch 1.4**: Other Form Elements

- Slider, Label, Field, InputTags

### Phase 2: Layout & Dialog (Week 2)

Essential structural components.

**Batch 2.1**: Containers

- Card, Divider, ScrollBox

**Batch 2.2**: Overlays

- Modal, Drawer, Popover, Tooltip

**Batch 2.3**: Menus & Navigation

- DropdownMenu, MenuBar, Tabs, Accordion

**Batch 2.4**: Notifications

- Toast, Alert (already done ✓)

### Phase 3: Display Components (Week 2-3)

Visual elements.

**Batch 3.1**: Media

- Avatar, Icon, Image

**Batch 3.2**: Text & Code

- Code, Tag

**Batch 3.3**: Loading

- Spinner, ProgressBar, Skeleton

**Batch 3.4**: Navigation

- Breadcrumb, Link, Pagination

### Phase 4: State Components (Week 3)

State displays.

**Batch 4.1**: All State Components

- EmptyState, ErrorState, LoadingState, LoadingLogo, LoadingScreen

### Phase 5: Complex Components (Week 3-4)

Specialized functionality - most time-consuming.

**Batch 5.1**: Tables

- Table, DataTable

**Batch 5.2**: Rich Editors & Uploads

- RichTextEditor, FileUpload, ImageUpload, Form

### Phase 6: Container Components (Week 4)

Final structural components.

**Batch 6.1**: All Container Components

- ButtonGroup, Pagination, Sidebar, ThemeProvider

## ✅ Validation Steps (Per Batch)

After each batch:

1. **Type Check**: `pnpm type-check` - Must pass with 0 errors
2. **Lint**: `pnpm lint` - Should pass with max 10 warnings
3. **Build**: `pnpm build` - Must succeed
4. **Storybook**: Test components visually
5. **Theme Switching**: Verify light/dark mode works
6. **Responsive**: Check mobile/tablet/desktop
7. **Accessibility**: Test keyboard navigation, ARIA, focus states

## 🎓 Key Principles

1. **TypeScript First** - Use proper types, interfaces, and generics
2. **Direct Token Access** - Import from `cssVars` and `styleVars`, no CSS
   variables
3. **Performance** - Define styles outside component functions
4. **Consistency** - Follow established patterns from Alert/Button/Badge
5. **Documentation** - Add comprehensive JSDoc comments
6. **Accessibility** - Include focus states, ARIA attributes, keyboard support
7. **Theme Support** - Use theme tokens for light/dark mode support

## 📝 Notes

- Some components may already follow best practices (like Alert)
- Complex components (DataTable, RichTextEditor) may need special handling
- ThemeProvider should not be heavily modified (core functionality)
- Each batch should be committed separately with descriptive commit messages
- Update CHANGELOG.md after each significant phase

---

**Started**: [Date] **Target Completion**: 4 weeks **Last Updated**: [Date]
