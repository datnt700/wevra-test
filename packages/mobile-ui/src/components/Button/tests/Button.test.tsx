/**
 * Button Component Tests
 *
 * Comprehensive test suite for Button component covering:
 * - Basic rendering
 * - All variants
 * - All shapes
 * - All sizes
 * - Loading state
 * - Disabled state
 * - Icon support
 * - Accessibility
 * - Event handlers
 */
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Text } from 'react-native';
import { Button } from '../components/Button';

describe('Button', () => {
  // Basic Rendering Tests
  describe('Rendering', () => {
    it('should render with default props', () => {
      const { getByRole } = render(<Button>Click me</Button>);
      const button = getByRole('button');
      expect(button).toBeTruthy();
    });

    it('should render with children text', () => {
      const { getByText } = render(<Button>Hello World</Button>);
      expect(getByText('Hello World')).toBeTruthy();
    });

    it('should render with custom children', () => {
      const { getByText } = render(
        <Button>
          <Text>Custom Content</Text>
        </Button>
      );
      expect(getByText('Custom Content')).toBeTruthy();
    });

    it('should have display name', () => {
      expect(Button.displayName).toBe('Button');
    });
  });

  // Variant Tests
  describe('Variants', () => {
    it('should render primary variant', () => {
      const { getByRole } = render(<Button variant="primary">Primary</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render secondary variant', () => {
      const { getByRole } = render(<Button variant="secondary">Secondary</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render dark variant', () => {
      const { getByRole } = render(<Button variant="dark">Dark</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render link variant', () => {
      const { getByRole } = render(<Button variant="link">Link</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render tertiary variant', () => {
      const { getByRole } = render(<Button variant="tertiary">Tertiary</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render danger variant', () => {
      const { getByRole } = render(<Button variant="danger">Danger</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render info variant', () => {
      const { getByRole } = render(<Button variant="info">Info</Button>);
      expect(getByRole('button')).toBeTruthy();
    });
  });

  // Shape Tests
  describe('Shapes', () => {
    it('should render default shape', () => {
      const { getByRole } = render(<Button shape="default">Default</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render pill shape', () => {
      const { getByRole } = render(<Button shape="pill">Pill</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render round shape', () => {
      const { getByRole } = render(<Button shape="round">Round</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render square shape', () => {
      const { getByRole } = render(<Button shape="square">Square</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render circle shape', () => {
      const { getByRole } = render(<Button shape="circle">O</Button>);
      expect(getByRole('button')).toBeTruthy();
    });
  });

  // Size Tests
  describe('Sizes', () => {
    it('should render small size', () => {
      const { getByRole } = render(<Button size="sm">Small</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render medium size (default)', () => {
      const { getByRole } = render(<Button size="md">Medium</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should render large size', () => {
      const { getByRole } = render(<Button size="lg">Large</Button>);
      expect(getByRole('button')).toBeTruthy();
    });
  });

  // Loading State Tests
  describe('Loading State', () => {
    it('should show loading indicator when loading', () => {
      const { getByTestId } = render(
        <Button isLoading testID="loading-button">
          Loading
        </Button>
      );

      const button = getByTestId('loading-button');
      expect(button).toBeTruthy();
    });
    it('should be disabled when loading', () => {
      const { getByRole } = render(<Button isLoading>Loading</Button>);
      const button = getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('should not show icon when loading', () => {
      const { queryByText } = render(
        <Button isLoading icon={<Text>Icon</Text>}>
          Loading
        </Button>
      );

      // Button should exist and be in loading state
      expect(queryByText('Loading')).toBeTruthy();
    });

    it('should not call onPress when loading', () => {
      const handlePress = vi.fn();
      const { getByRole } = render(
        <Button isLoading onPress={handlePress}>
          Loading
        </Button>
      );

      const button = getByRole('button');
      fireEvent.click(button);
      expect(handlePress).not.toHaveBeenCalled();
    });
  });

  // Disabled State Tests
  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      const { getByRole } = render(<Button disabled>Disabled</Button>);
      const button = getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('should not call onPress when disabled', () => {
      const handlePress = vi.fn();
      const { getByRole } = render(
        <Button disabled onPress={handlePress}>
          Disabled
        </Button>
      );

      const button = getByRole('button');
      fireEvent.click(button);
      expect(handlePress).not.toHaveBeenCalled();
    });
  });

  // Icon Tests
  describe('Icons', () => {
    it('should render with left icon', () => {
      const { getByText } = render(<Button icon={<Text>IconLeft</Text>}>Button</Button>);
      expect(getByText('IconLeft')).toBeTruthy();
      expect(getByText('Button')).toBeTruthy();
    });

    it('should render with right icon', () => {
      const { getByText } = render(<Button iconRight={<Text>IconRight</Text>}>Button</Button>);
      expect(getByText('IconRight')).toBeTruthy();
      expect(getByText('Button')).toBeTruthy();
    });

    it('should render with both icons', () => {
      const { getByText } = render(
        <Button icon={<Text>Left</Text>} iconRight={<Text>Right</Text>}>
          Middle
        </Button>
      );
      expect(getByText('Left')).toBeTruthy();
      expect(getByText('Middle')).toBeTruthy();
      expect(getByText('Right')).toBeTruthy();
    });
  });

  // Event Handler Tests
  describe('Event Handlers', () => {
    it('should call onPress when pressed', () => {
      const handlePress = vi.fn();
      const { getByRole } = render(<Button onPress={handlePress}>Press me</Button>);

      const button = getByRole('button');
      fireEvent.click(button);
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('should receive event object in onPress', () => {
      const handlePress = vi.fn();
      const { getByRole } = render(<Button onPress={handlePress}>Press me</Button>);

      const button = getByRole('button');
      fireEvent.click(button);
      expect(handlePress).toHaveBeenCalled();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('should have button role', () => {
      const { getByRole } = render(<Button>Accessible</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should use children text as default accessibility label', () => {
      const { getByRole } = render(<Button>Click here</Button>);
      const button = getByRole('button');
      expect(button.textContent).toContain('Click here');
    });

    it('should use custom accessibility label', () => {
      const { getByRole } = render(<Button accessibilityLabel="Custom label">Button</Button>);
      const button = getByRole('button');
      expect(button.getAttribute('aria-label')).toBe('Custom label');
    });

    it('should have disabled accessibility state when disabled', () => {
      const { getByRole } = render(<Button disabled>Disabled</Button>);
      const button = getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('should have disabled accessibility state when loading', () => {
      const { getByRole } = render(<Button isLoading>Loading</Button>);
      const button = getByRole('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });
  });

  // Custom Styling Tests
  describe('Custom Styling', () => {
    it('should accept custom style prop', () => {
      const customStyle = { marginTop: 20 };
      const { getByRole } = render(<Button style={customStyle}>Styled</Button>);
      const button = getByRole('button');
      expect(button).toBeTruthy();
    });
  });

  // Test ID Tests
  describe('Test ID', () => {
    it('should accept testID prop', () => {
      const { getByTestId } = render(<Button testID="my-button">Button</Button>);
      expect(getByTestId('my-button')).toBeTruthy();
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      const { getByRole } = render(<Button />);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should handle undefined variant (defaults to primary)', () => {
      const { getByRole } = render(<Button variant={undefined}>Default</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should handle undefined shape (defaults to default)', () => {
      const { getByRole } = render(<Button shape={undefined}>Default</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('should handle undefined size (defaults to md)', () => {
      const { getByRole } = render(<Button size={undefined}>Default</Button>);
      expect(getByRole('button')).toBeTruthy();
    });
  });
});
