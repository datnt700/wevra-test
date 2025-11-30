---
applyTo: 'packages/eventurex/**/*.{ts,tsx}'
---

# @eventure/eventurex Mobile Components

## Component Structure

```
src/components/Button/
├── components/
│   ├── Button.tsx
│   ├── Button.styles.ts    # Emotion Native
│   └── index.ts
├── types/
│   ├── ButtonProps.ts
│   └── index.ts
├── tests/
│   └── Button.test.tsx
└── index.ts
```

## Available Components

- **Button** (7 variants, 5 shapes, 3 sizes, loading state)
- **Text** (customizable typography with design tokens)
- **TextInput** (with icons, error states, validation)
- **SocialButton** (OAuth providers: Google, Apple, Facebook)

_More coming:_ Card, Modal, Toast, Avatar, Badge, Switch, Checkbox, Radio,
Select/Picker

## Component Implementation

**Button.tsx:**

```typescript
import styled from '@emotion/native';
import { ActivityIndicator } from 'react-native';
import { colors, spacing, radii } from '@eventure/eventurex';

const StyledButton = styled.TouchableOpacity<{ $variant?: ButtonVariant }>`
  background-color: ${({ $variant }) =>
    $variant === 'primary' ? colors.mainColor : colors.gray200};
  padding: ${spacing.md}px ${spacing.lg}px;
  border-radius: ${radii.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${colors.light};
  font-size: 16px;
  font-weight: 600;
`;

export const Button = ({
  variant = 'primary',
  isLoading,
  children,
  ...props
}: ButtonProps) => (
  <StyledButton $variant={variant} {...props}>
    {isLoading ? (
      <ActivityIndicator color={colors.light} />
    ) : (
      <StyledText>{children}</StyledText>
    )}
  </StyledButton>
);

Button.displayName = 'Button';
```

## Design Tokens

**Shared with @eventure/eventured:**

```typescript
import { colors, spacing, radii, typography } from '@eventure/eventurex';

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

**Available Tokens:**

- **Colors**: `mainColor`, `colorSuccess`, `colorWarning`, `colorDanger`,
  `gray0-gray1000`
- **Spacing**: `xs` (4), `sm` (8), `md` (12), `base` (16), `lg` (24), `xl` (32)
- **Radii**: `none` (0), `sm` (4), `md` (6), `lg` (8), `xl` (12), `full` (9999)
- **Typography**: Font sizes (`xs` to `4xl`), weights, line heights

## Testing Requirements

**Coverage Threshold: 70%** (lower than web's 80%)

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@eventure/eventurex';

it('should call onPress when pressed', () => {
  const handlePress = jest.fn();
  const { getByRole } = render(<Button onPress={handlePress}>Press</Button>);

  fireEvent.press(getByRole('button'));
  expect(handlePress).toHaveBeenCalledTimes(1);
});
```

**vitest.config.ts:**

```typescript
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web', // For web testing
    },
  },
});
```

## Critical Rules

1. ✅ Import from `@emotion/native`, NOT `@emotion/styled`
2. ✅ Use React Native components (`View`, `Text`, `TouchableOpacity`)
3. ✅ Share design tokens with @eventure/eventured
4. ✅ Same API design as @eventure/eventured (developer familiarity)
5. ✅ Use `react-native-web` alias for testing
6. ✅ Coverage threshold: 70%
7. ❌ Never use web-specific components
8. ❌ Don't use `@emotion/styled`

## Commands

```bash
cd packages/eventurex
pnpm test                   # Run tests
pnpm test:coverage          # Coverage report
pnpm test:watch             # Watch mode
```
