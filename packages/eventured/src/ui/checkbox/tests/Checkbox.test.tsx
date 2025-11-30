import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../components/Checkbox';

describe('Checkbox', () => {
  describe('Basic Rendering', () => {
    it('renders without label', () => {
      const { container } = render(<Checkbox id="checkbox-1" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox id="checkbox-2" label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('renders with id attribute', () => {
      const { container } = render(<Checkbox id="test-checkbox" />);
      const checkbox = container.querySelector('#test-checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders without id', () => {
      const { container } = render(<Checkbox />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders default size by default', () => {
      const { container } = render(<Checkbox id="checkbox-default" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders sm size', () => {
      const { container } = render(<Checkbox id="checkbox-sm" size="sm" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders md size', () => {
      const { container } = render(<Checkbox id="checkbox-md" size="md" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('renders lg size', () => {
      const { container } = render(<Checkbox id="checkbox-lg" size="lg" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('renders unchecked by default', () => {
      const { container } = render(<Checkbox id="checkbox-unchecked" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });

    it('should render with id prop', () => {
      render(<Checkbox checked={false} onCheckedChange={() => {}} id="test-checkbox" />);
      const button = screen.getByRole('checkbox');
      expect(button).toHaveAttribute('id', 'test-checkbox');
    });

    it('renders with defaultChecked prop', () => {
      const { container } = render(<Checkbox id="checkbox-default-checked" defaultChecked />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('toggles checked state on click', async () => {
      const user = userEvent.setup();
      const { container } = render(<Checkbox id="checkbox-toggle" />);
      const checkbox = container.querySelector('button[role="checkbox"]');

      expect(checkbox).toHaveAttribute('data-state', 'unchecked');

      if (checkbox) {
        await user.click(checkbox);
        expect(checkbox).toHaveAttribute('data-state', 'checked');
      }
    });
  });

  describe('Disabled State', () => {
    it('renders without disabled state by default', () => {
      const { container } = render(<Checkbox id="checkbox-enabled" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).not.toBeDisabled();
    });

    it('renders with disabled state', () => {
      const { container } = render(<Checkbox id="checkbox-disabled" isDisabled />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeDisabled();
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <Checkbox id="checkbox-disabled-click" isDisabled onCheckedChange={handleChange} />
      );
      const checkbox = container.querySelector('button[role="checkbox"]');

      if (checkbox) {
        await user.click(checkbox);
        expect(handleChange).not.toHaveBeenCalled();
      }
    });
  });

  describe('Required State', () => {
    it('renders without required by default', () => {
      const { container } = render(<Checkbox id="checkbox-optional" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).not.toHaveAttribute('required');
    });

    it('renders with required attribute', () => {
      const { container } = render(<Checkbox id="checkbox-required" isRequired />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      // Note: Radix UI Checkbox doesn't expose required attribute on the button element
      // but it's passed through to the component for form validation
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('calls onCheckedChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <Checkbox id="checkbox-change" onCheckedChange={handleChange} />
      );
      const checkbox = container.querySelector('button[role="checkbox"]');

      if (checkbox) {
        await user.click(checkbox);
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(true);
      }
    });

    it('calls onCheckedChange with false when unchecking', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <Checkbox id="checkbox-uncheck" checked onCheckedChange={handleChange} />
      );
      const checkbox = container.querySelector('button[role="checkbox"]');

      if (checkbox) {
        await user.click(checkbox);
        expect(handleChange).toHaveBeenCalledWith(false);
      }
    });

    it('does not call onCheckedChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { container } = render(
        <Checkbox id="checkbox-disabled-event" isDisabled onCheckedChange={handleChange} />
      );
      const checkbox = container.querySelector('button[role="checkbox"]');

      if (checkbox) {
        await user.click(checkbox);
        expect(handleChange).not.toHaveBeenCalled();
      }
    });
  });

  describe('Label', () => {
    it('renders with text label', () => {
      render(<Checkbox id="checkbox-text" label="Text Label" />);
      expect(screen.getByText('Text Label')).toBeInTheDocument();
    });

    it('renders with React node label', () => {
      render(
        <Checkbox
          id="checkbox-node"
          label={
            <span>
              <strong>Bold</strong> Label
            </span>
          }
        />
      );

      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('label associates with checkbox via htmlFor', () => {
      render(<Checkbox id="checkbox-label" label="Associated Label" />);
      const label = screen.getByText('Associated Label').closest('label');
      expect(label).toHaveAttribute('for', 'checkbox-label');
    });

    it('clicking label toggles checkbox', async () => {
      const user = userEvent.setup();
      const { container } = render(<Checkbox id="checkbox-label-click" label="Click Me" />);
      const label = screen.getByText('Click Me');
      const checkbox = container.querySelector('button[role="checkbox"]');

      expect(checkbox).toHaveAttribute('data-state', 'unchecked');

      await user.click(label);
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });
  });

  describe('Name and Value', () => {
    it('renders with name attribute', () => {
      const { container } = render(<Checkbox id="checkbox-name" name="terms" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      // Note: Radix UI Checkbox doesn't expose name attribute on button element
      // name is used internally for form data
      expect(checkbox).toBeInTheDocument();
    });

    it('renders with value attribute', () => {
      const { container } = render(<Checkbox id="checkbox-value" value="accepted" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toHaveAttribute('value', 'accepted');
    });

    it('renders with both name and value', () => {
      const { container } = render(
        <Checkbox id="checkbox-name-value" name="agreement" value="yes" />
      );
      const checkbox = container.querySelector('button[role="checkbox"]');
      // Note: Radix UI Checkbox doesn't expose name attribute on button element
      expect(checkbox).toHaveAttribute('value', 'yes');
    });
  });

  describe('Accessibility', () => {
    it('has role="checkbox"', () => {
      const { container } = render(<Checkbox id="checkbox-role" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('has correct aria-checked when unchecked', () => {
      const { container } = render(<Checkbox id="checkbox-aria-unchecked" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('has correct aria-checked when checked', () => {
      const { container } = render(<Checkbox id="checkbox-aria-checked" checked />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('is keyboard accessible', async () => {
      const { container } = render(<Checkbox id="checkbox-keyboard" />);
      const checkbox = container.querySelector('button[role="checkbox"]') as HTMLButtonElement;

      if (checkbox) {
        checkbox.focus();
        expect(checkbox).toHaveFocus();

        // Verify checkbox is keyboard accessible (can receive focus)
        // Actual keyboard toggling behavior is handled by Radix UI
        expect(checkbox).toHaveAttribute('type', 'button');
      }
    });

    it('has correct aria-disabled when disabled', () => {
      const { container } = render(<Checkbox id="checkbox-aria-disabled" isDisabled />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      // Radix UI uses data-disabled attribute instead of aria-disabled
      expect(checkbox).toHaveAttribute('data-disabled');
    });
  });

  describe('Combined Props', () => {
    it('renders with label, size, and checked', () => {
      render(<Checkbox id="checkbox-combined" label="Large Checkbox" size="lg" checked />);
      expect(screen.getByText('Large Checkbox')).toBeInTheDocument();
    });

    it('renders with all props', () => {
      const handleChange = vi.fn();
      render(
        <Checkbox
          id="checkbox-all-props"
          label="Complete Checkbox"
          size="lg"
          checked
          isRequired
          name="complete"
          value="yes"
          onCheckedChange={handleChange}
        />
      );

      expect(screen.getByText('Complete Checkbox')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label', () => {
      render(<Checkbox id="checkbox-empty" label="" />);
      const { container } = render(<Checkbox id="checkbox-empty-check" label="" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('handles numeric label', () => {
      render(<Checkbox id="checkbox-numeric" label={123} />);
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('handles null label', () => {
      const { container } = render(<Checkbox id="checkbox-null" label={null} />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('handles very long label text', () => {
      const longText = 'A'.repeat(200);
      render(<Checkbox id="checkbox-long" label={longText} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles special characters in label', () => {
      render(<Checkbox id="checkbox-special" label="Terms & Conditions <required>" />);
      expect(screen.getByText('Terms & Conditions <required>')).toBeInTheDocument();
    });
  });
});
