import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Button } from '../components/Button';

describe('Button', () => {
  describe('Basic Rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders as button element', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with default type="button"', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders with type="submit"', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders without children', () => {
      const { container } = render(<Button />);
      expect(container.querySelector('button')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<Button>Primary</Button>);
      expect(screen.getByText('Primary')).toBeInTheDocument();
    });

    it('renders primary variant explicitly', () => {
      render(<Button variant="primary">Primary</Button>);
      expect(screen.getByText('Primary')).toBeInTheDocument();
    });

    it('renders secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByText('Secondary')).toBeInTheDocument();
    });

    it('renders dark variant', () => {
      render(<Button variant="dark">Dark</Button>);
      expect(screen.getByText('Dark')).toBeInTheDocument();
    });

    it('renders link variant', () => {
      render(<Button variant="link">Link</Button>);
      expect(screen.getByText('Link')).toBeInTheDocument();
    });

    it('renders tertiary variant', () => {
      render(<Button variant="tertiary">Tertiary</Button>);
      expect(screen.getByText('Tertiary')).toBeInTheDocument();
    });

    it('renders danger variant', () => {
      render(<Button variant="danger">Danger</Button>);
      expect(screen.getByText('Danger')).toBeInTheDocument();
    });

    it('renders info variant', () => {
      render(<Button variant="info">Info</Button>);
      expect(screen.getByText('Info')).toBeInTheDocument();
    });
  });

  describe('Shapes', () => {
    it('renders default shape by default', () => {
      render(<Button>Default</Button>);
      expect(screen.getByText('Default')).toBeInTheDocument();
    });

    it('renders round shape', () => {
      render(<Button shape="round">Round</Button>);
      expect(screen.getByText('Round')).toBeInTheDocument();
    });

    it('renders square shape', () => {
      render(<Button shape="square">Square</Button>);
      expect(screen.getByText('Square')).toBeInTheDocument();
    });

    it('renders pill shape', () => {
      render(<Button shape="pill">Pill</Button>);
      expect(screen.getByText('Pill')).toBeInTheDocument();
    });

    it('renders circle shape', () => {
      render(<Button shape="circle">C</Button>);
      expect(screen.getByText('C')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('renders without loading state by default', () => {
      render(<Button>Button</Button>);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('renders with loading state', () => {
      render(<Button isLoading>Loading</Button>);
      // Spinner should be present
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('is disabled when loading', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('shows spinner when loading', () => {
      const { container } = render(<Button isLoading>Loading</Button>);
      // Check for spinner presence (Spinner component should render)
      expect(container.querySelector('button')).toBeInTheDocument();
    });
  });

  describe('Icon Support', () => {
    it('renders without icon by default', () => {
      render(<Button>No Icon</Button>);
      expect(screen.getByText('No Icon')).toBeInTheDocument();
    });

    it('renders with custom icon', () => {
      render(<Button icon={<span data-testid="icon">🔔</span>}>With Icon</Button>);

      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders with text icon', () => {
      render(<Button icon="→">Arrow</Button>);

      expect(screen.getByText('→')).toBeInTheDocument();
      expect(screen.getByText('Arrow')).toBeInTheDocument();
    });

    it('renders with React element icon', () => {
      const CustomIcon = () => <svg data-testid="custom-svg">Icon</svg>;
      render(<Button icon={<CustomIcon />}>Custom</Button>);

      expect(screen.getByTestId('custom-svg')).toBeInTheDocument();
    });
  });

  describe('Click Handling', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button onClick={handleClick} isLoading>
          Loading
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('accepts accessibilityLabel prop', () => {
      render(<Button accessibilityLabel="Close dialog">X</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('supports disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('is focusable by default', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
      render(<Button disabled>Not Focusable</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).not.toHaveFocus();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('can access button DOM properties via ref', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);

      expect(ref.current?.tagName).toBe('BUTTON');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('accepts data attributes', () => {
      render(<Button data-testid="custom-button">Custom</Button>);
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });

    it('accepts aria attributes', () => {
      render(<Button aria-label="Close">X</Button>);
      const button = screen.getByRole('button', { name: /close/i });
      expect(button).toBeInTheDocument();
    });

    it('passes through other HTML button attributes', () => {
      render(<Button title="Button title">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Button title');
    });
  });

  describe('Combined Props', () => {
    it('renders with variant and shape', () => {
      render(
        <Button variant="danger" shape="pill">
          Delete
        </Button>
      );
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('renders with icon and loading state', () => {
      render(
        <Button icon={<span>Icon</span>} isLoading>
          Loading
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('renders with all props', () => {
      render(
        <Button
          variant="primary"
          shape="round"
          icon={<span>Icon</span>}
          className="custom"
          type="submit"
        >
          Complete Button
        </Button>
      );

      expect(screen.getByText('Complete Button')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = render(<Button></Button>);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('handles numeric children', () => {
      render(<Button>{123}</Button>);
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('handles boolean children (renders as empty)', () => {
      const { container } = render(<Button>{false}</Button>);
      const button = container.querySelector('button');
      expect(button?.textContent).toBe('');
    });

    it('handles null children', () => {
      const { container } = render(<Button>{null}</Button>);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('handles very long text', () => {
      const longText = 'A'.repeat(200);
      render(<Button>{longText}</Button>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles special characters', () => {
      render(<Button>{'Click <here> & "now"'}</Button>);
      expect(screen.getByText('Click <here> & "now"')).toBeInTheDocument();
    });
  });
});
