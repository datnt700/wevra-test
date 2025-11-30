---
applyTo: 'packages/eventured/**/*.{ts,tsx}'
---

# @eventure/eventured Web Components

## Component Structure

**Flat structure** - All components in
`packages/eventured/src/ui/<component-name>/`

```
ui/button/                           # ⚠️ lowercase-with-dashes
├── components/
│   ├── Button.tsx                   # PascalCase
│   ├── Button.styles.ts             # Emotion styles
│   └── index.ts
├── types/
│   ├── ButtonProps.ts               # ⚠️ Separate props file
│   └── index.ts
├── tests/
│   └── Button.test.tsx              # ⚠️ 15-50 tests MINIMUM
└── index.ts                         # Barrel export
```

## Import Patterns

```typescript
// ✅ PREFERRED - Package imports
import { Button, Modal, Input } from '@eventure/eventured';

// ✅ Also correct - Direct imports
import { Button } from '@eventure/eventured/ui/button';

// ❌ DEPRECATED - Old categorized paths
import { Button } from '@eventure/eventured/components/form/Button';
```

## Available Components (60+)

- **Base** (9): Avatar, Badge, Button, ButtonGroup, Code, Icon, Image, Spinner,
  Tag
- **Radix** (8): Accordion, Checkbox, DropdownMenu, Modal, Popover, Radio, Tabs,
  Tooltip
- **Form** (19): Calendar, Field, Form, Input, InputNumber, InputSearch,
  InputTags, Label, Select, Combobox, Switch, Slider, TextArea, FileUpload,
  ImageUpload, RichTextEditor, Text
- **Dialog** (4): Alert, Drawer, MenuBar, Toast
- **Layout** (10): Card, Divider, GoogleMap, LeafletMap, MapboxMap,
  LoadingScreen, ScrollBox, Skeleton, Stack, ThemeProvider
- **Navigation** (4): Breadcrumb, Link, Pagination, Sidebar
- **State** (5): EmptyState, ErrorState, LoadingLogo, LoadingState, Progress
- **Table** (2): DataTable, Table

## Component Implementation

**ComponentName.tsx:**

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

**ComponentName.styles.ts:**

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

export const Styled = {
  Wrapper: styled.div<{ $variant?: Variant }>`
    padding: 0.75rem 1rem;
    border-radius: ${radii.md}; // ⚠️ Use tokens, NOT px

    ${({ $variant = 'success' }) => {
      const colors = getVariantColors($variant);
      return `
        color: ${colors.base};
        background-color: ${colors.light}20;  // 20 = 12% opacity
      `;
    }}
  `,
};
```

**ComponentNameProps.ts:**

```typescript
export interface ComponentNameProps {
  variant?: 'success' | 'warning' | 'danger';
  className?: string;
  children?: React.ReactNode;
}
```

## Testing Requirements

**Minimum 15-50 tests per component:**

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

**Coverage Threshold: 80%**

```bash
cd packages/eventured
pnpm test                   # Run tests
pnpm test:coverage          # Coverage report
pnpm test:watch             # Watch mode
```

## Critical Rules

1. ✅ Export as `Styled` object:
   `export const Styled = { Wrapper: styled.div`...` }`
2. ✅ Transient props use `$` prefix: `$variant`, `$isActive`
3. ✅ Use `radii` tokens: `${radii.md}` NOT `8px`
4. ✅ Hex opacity: `${colors.light}20` (20 = 12%)
5. ✅ Always add `displayName`
6. ✅ Prefix unused variables with `_`
7. ❌ Don't hardcode colors/radii
8. ❌ Don't use props without `$` in styled components
