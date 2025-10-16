import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper } from '../components/Stepper';

describe('Stepper', () => {
  describe('Basic Rendering', () => {
    it('renders with default value', () => {
      render(<Stepper value={5} />);
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.value).toBe('5');
    });

    it('renders with placeholder', () => {
      render(<Stepper />);
      expect(screen.getByPlaceholderText('Enter number')).toBeInTheDocument();
    });

    it('renders increment and decrement buttons', () => {
      render(<Stepper value={5} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('accepts custom className', () => {
      const { container } = render(<Stepper className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Increment/Decrement', () => {
    it('increments value on plus button click', () => {
      const handleChange = vi.fn();
      render(<Stepper value={5} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      const incrementButton = buttons[1];

      if (incrementButton) {
        fireEvent.click(incrementButton);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({ value: '6' }),
          })
        );
      }
    });

    it('decrements value on minus button click', () => {
      const handleChange = vi.fn();
      render(<Stepper value={5} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      const decrementButton = buttons[0];

      if (decrementButton) {
        fireEvent.click(decrementButton);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({ value: '4' }),
          })
        );
      }
    });

    it('respects custom step value', () => {
      const handleChange = vi.fn();
      render(<Stepper value={10} step={5} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      const incrementButton = buttons[1];

      if (incrementButton) {
        fireEvent.click(incrementButton);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({ value: '15' }),
          })
        );
      }
    });
  });

  describe('Min/Max Constraints', () => {
    it('does not decrement below min value', () => {
      const handleChange = vi.fn();
      render(<Stepper value={0} min={0} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      if (buttons[0]) fireEvent.click(buttons[0]);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not increment above max value', () => {
      const handleChange = vi.fn();
      render(<Stepper value={10} max={10} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      if (buttons[1]) fireEvent.click(buttons[1]);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('allows decrement when above min', () => {
      const handleChange = vi.fn();
      render(<Stepper value={5} min={0} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      if (buttons[0]) fireEvent.click(buttons[0]);

      expect(handleChange).toHaveBeenCalled();
    });

    it('allows increment when below max', () => {
      const handleChange = vi.fn();
      render(<Stepper value={5} max={10} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      if (buttons[1]) fireEvent.click(buttons[1]);

      expect(handleChange).toHaveBeenCalled();
    });
  });
  describe('Disabled State', () => {
    it('disables buttons when isDisabled is true', () => {
      render(<Stepper value={5} isDisabled />);
      const buttons = screen.getAllByRole('button');

      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('disables input when isDisabled is true', () => {
      render(<Stepper value={5} isDisabled />);
      const input = screen.getByRole('spinbutton');
      expect(input).toBeDisabled();
    });

    it('does not call onChange when disabled button clicked', () => {
      const handleChange = vi.fn();
      render(<Stepper value={5} isDisabled onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      if (buttons[0]) fireEvent.click(buttons[0]);
      if (buttons[1]) fireEvent.click(buttons[1]);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('ReadOnly State', () => {
    it('disables buttons when isReadOnly is true', () => {
      render(<Stepper value={5} isReadOnly />);
      const buttons = screen.getAllByRole('button');

      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('makes input readonly when isReadOnly is true', () => {
      render(<Stepper value={5} isReadOnly />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('readonly');
    });
  });

  describe('Error State', () => {
    it('displays error message when provided', () => {
      render(<Stepper value={5} errorMessage="Invalid value" />);
      expect(screen.getByText('Invalid value')).toBeInTheDocument();
    });

    it('does not display error message when not provided', () => {
      const { container } = render(<Stepper value={5} />);
      const errorElement = container.querySelector('span');
      expect(errorElement).not.toBeInTheDocument();
    });
  });

  describe('Input Interaction', () => {
    it('allows direct input value change', () => {
      const handleChange = vi.fn();
      render(<Stepper value={5} onChange={handleChange} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '10' } });

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '10' }),
        })
      );
    });

    it('updates internal state when value prop changes', () => {
      const { rerender } = render(<Stepper value={5} />);
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.value).toBe('5');

      rerender(<Stepper value={10} />);
      expect(input.value).toBe('10');
    });
  });

  describe('Attributes', () => {
    it('renders with id attribute', () => {
      render(<Stepper id="test-stepper" value={5} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('id', 'test-stepper');
    });

    it('renders with name attribute', () => {
      render(<Stepper name="quantity" value={5} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('name', 'quantity');
    });

    it('renders with min, max, and step attributes', () => {
      render(<Stepper value={5} min={0} max={10} step={2} />);
      const input = screen.getByRole('spinbutton');

      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '10');
      expect(input).toHaveAttribute('step', '2');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined value', () => {
      render(<Stepper />);
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.value).toBe('0');
    });

    it('handles negative values', () => {
      render(<Stepper value={-5} min={-10} />);
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.value).toBe('-5');
    });

    it('handles decimal step values', () => {
      const handleChange = vi.fn();
      render(<Stepper value={1.5} step={0.5} onChange={handleChange} />);

      const buttons = screen.getAllByRole('button');
      const incrementButton = buttons[1];

      if (incrementButton) {
        fireEvent.click(incrementButton);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({ value: '2' }),
          })
        );
      }
    });
  });
});
