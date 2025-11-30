# @eventure/eventurex

> React Native design system for Eventure mobile applications ("X" for
> cross-platform)

A comprehensive React Native component library that shares design tokens **and
styling approach** with `@eventure/eventured` for true cross-platform
consistency.

## Features

- ✅ **@emotion/native**: Same styling library as `@eventure/eventured` (web)
- ✅ **Shared Design Tokens**: Same colors, spacing, and typography as
  `@eventure/eventured`
- ✅ **Unified API**: Component props and patterns match `@eventure/eventured`
- ✅ **TypeScript First**: Fully typed with comprehensive TypeScript support
- ✅ **Accessible**: Built with React Native accessibility best practices
- ✅ **Well Tested**: 70% coverage threshold with comprehensive test suite
- ✅ **Clean Architecture**: Organized structure with types, components, styles,
  and tests

## Installation

```bash
# Install peer dependencies
pnpm add react react-native @emotion/native

# Install @eventure/eventurex
pnpm add @eventure/eventurex
```

## Components

### Button

A flexible button component with multiple variants, sizes, and shapes.

**Features:**

- 7 variants: `primary`, `secondary`, `dark`, `link`, `tertiary`, `danger`,
  `info`
- 5 shapes: `default`, `pill`, `round`, `square`, `circle`
- 3 sizes: `sm`, `md`, `lg`
- Loading state with ActivityIndicator
- Icon support (left and right)
- Full accessibility support

**Usage:**

```tsx
import { Button } from '@eventure/mobile-ui';

// Basic usage
<Button onPress={() => console.log('Pressed!')}>
  Click me
</Button>

// With variant and size
<Button variant="danger" size="lg" onPress={handleDelete}>
  Delete
</Button>

// With loading state
<Button isLoading variant="primary">
  Saving...
</Button>

// With icons
<Button
  variant="primary"
  icon={<Icon name="user" />}
  iconRight={<Icon name="arrow-right" />}
>
  Continue
</Button>

// Custom styling
<Button
  variant="secondary"
  style={{ marginTop: 20 }}
>
  Custom Style
</Button>
```

**Props:**

| Prop                 | Type            | Default     | Description            |
| -------------------- | --------------- | ----------- | ---------------------- |
| `children`           | `ReactNode`     | -           | Button content         |
| `variant`            | `ButtonVariant` | `'primary'` | Visual variant         |
| `shape`              | `ButtonShape`   | `'default'` | Button shape           |
| `size`               | `ButtonSize`    | `'md'`      | Button size            |
| `isLoading`          | `boolean`       | `false`     | Show loading indicator |
| `disabled`           | `boolean`       | `false`     | Disable button         |
| `icon`               | `ReactNode`     | -           | Left icon              |
| `iconRight`          | `ReactNode`     | -           | Right icon             |
| `accessibilityLabel` | `string`        | -           | Accessibility label    |
| `onPress`            | `function`      | -           | Press handler          |
| `style`              | `ViewStyle`     | -           | Custom styles          |
| `testID`             | `string`        | -           | Test identifier        |

## Theme

### Using Design Tokens

```tsx
import { colors, spacing, radii, typography } from '@eventure/mobile-ui';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    padding: spacing.base,
    borderRadius: radii.md,
  },
  text: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.light,
  },
});
```

### Available Tokens

**Colors:**

- Brand: `mainColor`, `mainColorLight`, `mainColorDark`, etc.
- Signals: `colorSuccess`, `colorWarning`, `colorDanger`, `colorInfo`
- Grays: `gray0` to `gray1000`
- Light/Dark: `light`, `light2-6`, `dark`, `dark2-3`

**Spacing:**

- `xs` (4), `sm` (8), `md` (12), `base` (16), `lg` (24), `xl` (32), `2xl` (48),
  `3xl` (64)

**Border Radii:**

- `none` (0), `sm` (4), `md` (6), `lg` (8), `xl` (12), `2xl` (16), `full` (9999)

**Typography:**

- Font Sizes: `xs` to `4xl`
- Font Weights: `normal`, `medium`, `semibold`, `bold`
- Line Heights: `tight`, `normal`, `relaxed`

## Architecture

### Clean Architecture Pattern

Each component follows this structure:

```
Button/
├── components/
│   ├── Button.tsx          # Component implementation
│   ├── Button.styles.ts    # StyleSheet and style helpers
│   └── index.ts            # Component exports
├── types/
│   ├── ButtonProps.ts      # TypeScript types
│   └── index.ts            # Type exports
├── tests/
│   └── Button.test.tsx     # Comprehensive tests
└── index.ts                # Public API
```

This ensures:

- Clear separation of concerns
- Easy testing and maintenance
- Type safety throughout
- Consistent patterns across components

## Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

### Test Coverage

All components maintain **70% minimum coverage** across:

- Branches
- Functions
- Lines
- Statements

### Example Test

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@eventure/mobile-ui';

it('should call onPress when pressed', () => {
  const handlePress = jest.fn();
  const { getByRole } = render(<Button onPress={handlePress}>Press me</Button>);

  fireEvent.press(getByRole('button'));
  expect(handlePress).toHaveBeenCalledTimes(1);
});
```

## Development

```bash
# Lint code
pnpm lint

# Type check
pnpm type-check

# Format code
pnpm format

# Check formatting
pnpm format:check
```

## Design Philosophy

1. **Cross-Platform First**: Same styling approach (Emotion) for web and mobile
2. **Unified API**: Component APIs match `@eventure/eventured` exactly where
   possible
3. **Performance**: Optimized for mobile performance with efficient styles
4. **Consistency**: Shares design tokens AND styling patterns with
   `@eventure/eventured`
5. **Accessibility**: Follows React Native accessibility best practices
6. **Developer Experience**: Comprehensive TypeScript support and documentation

## Comparison with @eventure/eventured

| Aspect              | @eventure/eventured (Web) | @eventure/eventurex (Mobile) |
| ------------------- | ------------------------- | ---------------------------- |
| **Framework**       | React for Web             | React Native                 |
| **Styling**         | @emotion/styled           | @emotion/native              |
| **Base Components** | DOM elements              | RN components                |
| **Icons**           | Lucide React              | RN Vector Icons              |
| **Design Tokens**   | ✅ Shared                 | ✅ Shared                    |
| **Component API**   | ✅ Identical              | ✅ Identical                 |
| **Styling Pattern** | ✅ Styled Components      | ✅ Styled Components         |

**Key Benefit**: Developers can switch between web (`@eventure/eventured`) and
mobile (`@eventure/eventurex`) with minimal code changes, as both use the same
Emotion styling approach and component APIs.

## Roadmap

- [ ] Input component
- [ ] Card component
- [ ] Modal component
- [ ] Toast notifications
- [ ] Avatar component
- [ ] Badge component
- [ ] Switch component
- [ ] Checkbox component
- [ ] Radio component
- [ ] Select/Picker component

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

See [LICENSE](../../LICENSE) for details.

---

**Note**: This package is part of the Eventure monorepo and shares design tokens
with `@eventure/eventured` for cross-platform consistency.
