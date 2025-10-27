import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../components/Switch';

describe('Switch', () => {
  describe('Basic Rendering', () => {
    it('should render the switch', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should render with default unchecked state', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
      expect(switchElement).not.toBeChecked();
    });

    it('should render with default variant', () => {
      const { container } = render(<Switch />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with data-state attribute', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('Checked State', () => {
    it('should render with defaultChecked=true', () => {
      render(<Switch defaultChecked={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
      expect(switchElement).toHaveAttribute('data-state', 'checked');
    });

    it('should render with controlled checked=true', () => {
      render(<Switch checked={true} onCheckedChange={vi.fn()} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('should render with controlled checked=false', () => {
      render(<Switch checked={false} onCheckedChange={vi.fn()} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('should toggle checked state on click (uncontrolled)', async () => {
      render(<Switch defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await userEvent.click(switchElement);

      await waitFor(() => {
        expect(switchElement).toHaveAttribute('aria-checked', 'true');
      });
    });

    it('should update data-state on toggle', async () => {
      render(<Switch defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).toHaveAttribute('data-state', 'unchecked');

      await userEvent.click(switchElement);

      await waitFor(() => {
        expect(switchElement).toHaveAttribute('data-state', 'checked');
      });
    });
  });

  describe('Variants', () => {
    it('should render default variant', () => {
      const { container } = render(<Switch variant="default" />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render primary variant', () => {
      const { container } = render(<Switch variant="primary" />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Labels', () => {
    it('should render with labelLeft', () => {
      render(<Switch labelLeft="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('should render with labelRight', () => {
      render(<Switch labelRight="Dark mode" />);
      expect(screen.getByText('Dark mode')).toBeInTheDocument();
    });

    it('should render with both labelLeft and labelRight', () => {
      render(<Switch labelLeft="Off" labelRight="On" />);
      expect(screen.getByText('Off')).toBeInTheDocument();
      expect(screen.getByText('On')).toBeInTheDocument();
    });

    it('should associate label with switch using htmlFor', () => {
      render(<Switch id="test-switch" labelLeft="Test Label" />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'test-switch');
    });

    it('should render with ReactNode as label', () => {
      render(<Switch labelLeft={<span data-testid="custom-label">Custom</span>} />);
      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('should render with iconLeft when unchecked', () => {
      render(<Switch iconLeft={<span data-testid="icon-left">X</span>} checked={false} />);
      expect(screen.getByTestId('icon-left')).toBeInTheDocument();
    });

    it('should render with iconRight when checked', () => {
      render(<Switch iconRight={<span data-testid="icon-right">✓</span>} checked={true} />);
      expect(screen.getByTestId('icon-right')).toBeInTheDocument();
    });

    it('should switch icons on toggle', async () => {
      const { rerender } = render(
        <Switch
          iconLeft={<span data-testid="icon-left">X</span>}
          iconRight={<span data-testid="icon-right">✓</span>}
          checked={false}
        />
      );

      expect(screen.getByTestId('icon-left')).toBeInTheDocument();
      expect(screen.queryByTestId('icon-right')).not.toBeInTheDocument();

      rerender(
        <Switch
          iconLeft={<span data-testid="icon-left">X</span>}
          iconRight={<span data-testid="icon-right">✓</span>}
          checked={true}
        />
      );

      expect(screen.queryByTestId('icon-left')).not.toBeInTheDocument();
      expect(screen.getByTestId('icon-right')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should render enabled by default', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeDisabled();
    });

    it('should render in disabled state', () => {
      render(<Switch isDisabled={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
      expect(switchElement).toHaveAttribute('data-disabled', '');
    });

    it('should not respond to clicks when disabled', async () => {
      const handleChange = vi.fn();
      render(<Switch isDisabled={true} onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole('switch');

      await userEvent.click(switchElement);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should not toggle state when disabled', async () => {
      render(<Switch isDisabled={true} defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await userEvent.click(switchElement);

      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('Event Handlers', () => {
    it('should call onCheckedChange when toggled', async () => {
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole('switch');

      await userEvent.click(switchElement);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(true);
      });
    });

    it('should call onCheckedChange with false when toggled off', async () => {
      const handleChange = vi.fn();
      render(<Switch defaultChecked={true} onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole('switch');

      await userEvent.click(switchElement);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(false);
      });
    });

    it('should call onCheckedChange multiple times', async () => {
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole('switch');

      await userEvent.click(switchElement);
      await userEvent.click(switchElement);
      await userEvent.click(switchElement);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('Form Integration', () => {
    it('should accept name prop for form identification', () => {
      // Note: Radix UI Switch renders as <button>, not <input>
      // The name prop is accepted but may not appear as DOM attribute
      render(<Switch name="notifications" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should support value attribute', () => {
      render(<Switch value="enabled" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('value', 'enabled');
    });

    it('should support id attribute', () => {
      render(<Switch id="my-switch" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('id', 'my-switch');
    });

    it('should have aria-required when isRequired is true', () => {
      render(<Switch isRequired={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-required', 'true');
    });

    it('should use name as fallback for id', () => {
      render(<Switch name="test-name" labelLeft="Label" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('id', 'test-name');
    });

    it('should prefer id over name when both provided', () => {
      render(<Switch id="test-id" name="test-name" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('id', 'test-id');
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA role', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should have aria-checked attribute', () => {
      render(<Switch defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('should update aria-checked on toggle', async () => {
      render(<Switch defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await userEvent.click(switchElement);

      await waitFor(() => {
        expect(switchElement).toHaveAttribute('aria-checked', 'true');
      });
    });

    it('should be keyboard accessible with Space key', async () => {
      render(<Switch defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');

      switchElement.focus();
      await userEvent.keyboard(' ');

      await waitFor(() => {
        expect(switchElement).toHaveAttribute('aria-checked', 'true');
      });
    });

    it('should be keyboard accessible with Enter key', async () => {
      render(<Switch defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');

      switchElement.focus();
      await userEvent.keyboard('{Enter}');

      await waitFor(() => {
        expect(switchElement).toHaveAttribute('aria-checked', 'true');
      });
    });

    it('should support tab navigation', async () => {
      render(
        <>
          <button>Before</button>
          <Switch />
          <button>After</button>
        </>
      );

      const switchElement = screen.getByRole('switch');

      await userEvent.tab();
      await userEvent.tab();

      expect(switchElement).toHaveFocus();
    });

    it('should have aria-required when isRequired is true', () => {
      render(<Switch isRequired={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-required', 'true');
    });

    it('should be focusable', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      switchElement.focus();
      expect(switchElement).toHaveFocus();
    });
  });

  describe('Shadow Effect', () => {
    it('should render without shadow by default', () => {
      const { container } = render(<Switch />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with shadow when hasShadow=true', () => {
      const { container } = render(<Switch hasShadow={true} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined defaultChecked', () => {
      render(<Switch defaultChecked={undefined} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('should handle undefined checked', () => {
      render(<Switch checked={undefined} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('should handle undefined variant', () => {
      const { container } = render(<Switch variant={undefined} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle empty string labels', () => {
      render(<Switch labelLeft="" labelRight="" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should handle undefined labels', () => {
      render(<Switch labelLeft={undefined} labelRight={undefined} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should handle undefined icons', () => {
      render(<Switch iconLeft={undefined} iconRight={undefined} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should handle controlled state without onCheckedChange', () => {
      render(<Switch checked={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
    });

    it('should handle empty string for name prop', () => {
      // Radix UI Switch accepts name prop but may not render it as DOM attribute
      render(<Switch name="" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should handle empty string for value', () => {
      render(<Switch value="" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('value', '');
    });

    it('should handle rapid toggle clicks', async () => {
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole('switch');

      await userEvent.click(switchElement);
      await userEvent.click(switchElement);
      await userEvent.click(switchElement);
      await userEvent.click(switchElement);
      await userEvent.click(switchElement);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledTimes(5);
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle dynamic checked state changes', () => {
      const { rerender } = render(<Switch checked={false} />);
      let switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch checked={true} />);
      switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');

      rerender(<Switch checked={false} />);
      switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('should handle dynamic disabled state changes', () => {
      const { rerender } = render(<Switch isDisabled={false} />);
      let switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeDisabled();

      rerender(<Switch isDisabled={true} />);
      switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
    });

    it('should handle dynamic variant changes', () => {
      const { rerender } = render(<Switch variant="default" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();

      rerender(<Switch variant="primary" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('should handle dynamic label changes', () => {
      const { rerender } = render(<Switch labelLeft="Label 1" />);
      expect(screen.getByText('Label 1')).toBeInTheDocument();

      rerender(<Switch labelLeft="Label 2" />);
      expect(screen.getByText('Label 2')).toBeInTheDocument();
      expect(screen.queryByText('Label 1')).not.toBeInTheDocument();
    });

    it('should handle combined checked and disabled states', () => {
      render(<Switch checked={true} isDisabled={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');
      expect(switchElement).toBeDisabled();
    });

    it('should maintain state with all props combined', async () => {
      const handleChange = vi.fn();
      render(
        <Switch
          variant="primary"
          labelLeft="Off"
          labelRight="On"
          iconLeft={<span>X</span>}
          iconRight={<span>✓</span>}
          defaultChecked={false}
          onCheckedChange={handleChange}
          isRequired={true}
          name="test-switch"
          value="test-value"
          hasShadow={true}
        />
      );

      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
      expect(screen.getByText('Off')).toBeInTheDocument();
      expect(screen.getByText('On')).toBeInTheDocument();

      await userEvent.click(switchElement);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(Switch.displayName).toBe('Switch');
    });
  });
});
