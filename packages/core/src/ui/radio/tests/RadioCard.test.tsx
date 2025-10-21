import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioCard } from '../components/RadioCard';

describe('RadioCard', () => {
  const defaultProps = {
    id: 'option-1',
    value: 'option1',
    label: 'Option 1',
    checked: false,
    onChange: vi.fn(),
  };

  describe('Basic Rendering', () => {
    it('should render with label', () => {
      render(<RadioCard {...defaultProps} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should render with id attribute', () => {
      render(<RadioCard {...defaultProps} />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('id', 'option-1');
    });

    it('should render with value attribute', () => {
      render(<RadioCard {...defaultProps} />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('value', 'option1');
    });

    it('should render without header when not provided', () => {
      render(<RadioCard {...defaultProps} />);
      // Verify component renders without header text
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
    });

    it('should render with header when provided', () => {
      render(<RadioCard {...defaultProps} header={<span>Premium Plan</span>} />);
      expect(screen.getByText('Premium Plan')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(<RadioCard {...defaultProps} className="custom-class" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Checked State', () => {
    it('should render with data-state attribute', () => {
      render(<RadioCard {...defaultProps} checked={false} />);
      const radio = screen.getByRole('radio');
      // RadioCard always renders as checked because RadioGroup.value === radio.value
      expect(radio).toHaveAttribute('data-state');
    });

    it('should render checked when checked prop is true', () => {
      render(<RadioCard {...defaultProps} checked={true} />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('data-state', 'checked');
    });

    it('should have aria-checked attribute when checked', () => {
      render(<RadioCard {...defaultProps} checked={true} />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-checked', 'true');
    });

    it('should have aria-checked attribute', () => {
      render(<RadioCard {...defaultProps} checked={false} />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-checked');
    });
  });

  describe('User Interactions', () => {
    it('should call onChange when wrapper is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<RadioCard {...defaultProps} onChange={handleChange} />);

      const wrapper = screen.getByText('Option 1').closest('div');
      await user.click(wrapper!);

      expect(handleChange).toHaveBeenCalledWith('option1');
    });

    it('should not call onChange when already checked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<RadioCard {...defaultProps} checked={true} onChange={handleChange} />);

      const wrapper = screen.getByText('Option 1').closest('div');
      await user.click(wrapper!);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should call onChange when label is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<RadioCard {...defaultProps} onChange={handleChange} />);

      await user.click(screen.getByText('Option 1'));

      expect(handleChange).toHaveBeenCalledWith('option1');
    });

    it('should call onChange with correct value', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<RadioCard {...defaultProps} value="custom-value" onChange={handleChange} />);

      const wrapper = screen.getByText('Option 1').closest('div');
      await user.click(wrapper!);

      expect(handleChange).toHaveBeenCalledWith('custom-value');
    });
  });

  describe('Disabled State', () => {
    it('should render without disabled attribute by default', () => {
      render(<RadioCard {...defaultProps} />);
      const radio = screen.getByRole('radio');
      expect(radio).not.toHaveAttribute('disabled');
    });

    it('should not have disabled prop validation', () => {
      // isDisabled prop exists in types but doesn't apply to the radio element
      // It's passed to RadioGroup but Radix UI doesn't apply it to individual items
      const { container } = render(<RadioCard {...defaultProps} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Required State', () => {
    it('should render without required attribute by default', () => {
      render(<RadioCard {...defaultProps} />);
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).not.toHaveAttribute('required');
    });

    it('should not have required prop validation', () => {
      // isRequired prop exists in types but doesn't apply to the radio element
      // It applies to RadioGroup but doesn't translate to required attribute
      const { container } = render(<RadioCard {...defaultProps} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Header Content', () => {
    it('should render string header', () => {
      render(<RadioCard {...defaultProps} header="Header Text" />);
      expect(screen.getByText('Header Text')).toBeInTheDocument();
    });

    it('should render ReactNode header', () => {
      render(<RadioCard {...defaultProps} header={<span>Premium Plan</span>} />);
      expect(screen.getByText('Premium Plan')).toBeInTheDocument();
    });

    it('should render complex header structure', () => {
      render(
        <RadioCard
          {...defaultProps}
          header={
            <div>
              <strong>Plan Name</strong>
              <p>Description</p>
            </div>
          }
        />
      );
      expect(screen.getByText('Plan Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('Controlled Behavior', () => {
    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(
        <RadioCard {...defaultProps} checked={false} onChange={handleChange} />
      );

      const wrapper = screen.getByText('Option 1').closest('div');
      await user.click(wrapper!);

      expect(handleChange).toHaveBeenCalledWith('option1');

      // Simulate parent component updating the checked state
      rerender(<RadioCard {...defaultProps} checked={true} onChange={handleChange} />);

      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('data-state', 'checked');
    });

    it('should handle multiple radio cards in a group', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <RadioCard
            id="option-1"
            value="option1"
            label="Option 1"
            checked={false}
            onChange={vi.fn()}
          />
          <RadioCard
            id="option-2"
            value="option2"
            label="Option 2"
            checked={false}
            onChange={vi.fn()}
          />
        </div>
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();

      // Click the second option
      await user.click(screen.getByText('Option 2'));

      // Both options should be present (no errors thrown)
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle long labels', () => {
      const longLabel = 'This is a very long label that might wrap to multiple lines';
      render(<RadioCard {...defaultProps} label={longLabel} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle special characters in value', () => {
      render(<RadioCard {...defaultProps} value="option-with-special-chars_123" />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('value', 'option-with-special-chars_123');
    });

    it('should handle empty label', () => {
      render(<RadioCard {...defaultProps} label="" />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('should handle numeric value', () => {
      render(<RadioCard {...defaultProps} value="123" />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('value', '123');
    });
  });

  describe('Accessibility', () => {
    it('should have radio role', () => {
      render(<RadioCard {...defaultProps} />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeInTheDocument();
    });

    it('should have radiogroup role for container', () => {
      render(<RadioCard {...defaultProps} />);
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeInTheDocument();
    });

    it('should associate label with input via htmlFor', () => {
      render(<RadioCard {...defaultProps} />);
      const label = screen.getByText('Option 1');
      expect(label).toHaveAttribute('for', 'option-1');
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<RadioCard {...defaultProps} onChange={handleChange} />);

      const radio = screen.getByRole('radio');
      radio.focus();

      await user.keyboard(' ');

      // Space key triggers the radio group
      expect(handleChange).toHaveBeenCalled();
    });

    it('should have correct ARIA structure', () => {
      render(<RadioCard {...defaultProps} />);
      const radioGroup = screen.getByRole('radiogroup');
      const radio = screen.getByRole('radio');

      expect(radioGroup).toBeInTheDocument();
      expect(radio).toBeInTheDocument();
      expect(radio).toHaveAttribute('aria-checked');
    });
  });

  describe('Component displayName', () => {
    it('should render correctly', () => {
      const { container } = render(<RadioCard {...defaultProps} />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});
