---
applyTo: '**/*.test.{ts,tsx},**/*.spec.{ts,tsx}'
---

# Testing Patterns

## Component Testing (15-50 tests minimum)

**Web Components (@tavia/taviad - 80% coverage):**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

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

**Mobile Components (@tavia/taviax - 70% coverage):**

```typescript
import { render, fireEvent } from '@testing-library/react-native';

it('should call onPress when pressed', () => {
  const handlePress = jest.fn();
  const { getByRole } = render(<Button onPress={handlePress}>Press</Button>);

  fireEvent.press(getByRole('button'));
  expect(handlePress).toHaveBeenCalledTimes(1);
});
```

## Test Categories

1. **Basic rendering** - Component renders without errors
2. **Props and variants** - All variants render correctly
3. **User interactions** - Click, change, submit events
4. **Accessibility** - ARIA attributes, keyboard navigation
5. **Display names** - Component has correct displayName

## Radix UI Notes

Use `container.querySelector()` for multiple elements:

```typescript
const { container } = render(<RadioGroup />);
const radios = container.querySelectorAll('[role="radio"]');
expect(radios).toHaveLength(3);
```

Check `data-state`, `data-disabled` attributes:

```typescript
expect(screen.getByRole('button')).toHaveAttribute('data-state', 'open');
```

## Coverage Thresholds

**Web (@tavia/taviad):**

```bash
cd packages/taviad
pnpm test                   # Run tests
pnpm test:coverage          # 80% threshold
pnpm test:watch             # Watch mode
```

**Mobile (@tavia/taviax):**

```bash
cd packages/taviax
pnpm test                   # Run tests
pnpm test:coverage          # 70% threshold
pnpm test:watch             # Watch mode
```

## E2E Testing (Playwright)

**Location:** `apps/backoffice/e2e/`, `apps/frontoffice/e2e/`

```bash
cd apps/frontoffice
pnpm test:e2e               # Run Playwright
pnpm test:e2e:ui            # UI mode
pnpm test:e2e:headed        # Headed mode
```

## Critical Rules

1. ✅ 15-50 tests per component (packages/taviad, packages/taviax)
2. ✅ Web: 80% coverage, Mobile: 70% coverage
3. ✅ Always test display name
4. ✅ Test all variants and props
5. ✅ Test user interactions
6. ✅ Test accessibility (ARIA)
7. ✅ For Radix: Use `container.querySelector()` and `data-*` attributes
8. ❌ Don't skip edge cases
9. ❌ Don't test implementation details
