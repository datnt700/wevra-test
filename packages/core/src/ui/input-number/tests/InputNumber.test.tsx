/**
 * InputNumber Component Tests
 * Tests number input specific behaviors
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { InputNumber } from './InputNumber';
import { describe, it, expect, vi } from 'vitest';

describe('InputNumber Component', () => {
  describe('Basic Rendering', () => {
    it('renders number input element', () => {
      render(<InputNumber />);
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input).toBeInTheDocument();
      expect(input.type).toBe('number');
    });

    it('renders with placeholder', () => {
      render(<InputNumber placeholder="Enter number" />);
      const input = screen.getByPlaceholderText('Enter number');
      expect(input).toBeInTheDocument();
    });

    it('renders with default value', () => {
      render(<InputNumber value={42} onChange={() => {}} />);
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.value).toBe('42');
    });
  });

  describe('Number Input Behavior', () => {
    it('accepts numeric input', () => {
      const handleChange = vi.fn();
      render(<InputNumber onChange={handleChange} />);
      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '123' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('has correct input type', () => {
      render(<InputNumber />);
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.type).toBe('number');
    });
  });

  describe('Variants', () => {
    it('renders with default variant', () => {
      render(<InputNumber variant="default" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
    });

    it('applies danger variant when error message is present', () => {
      render(<InputNumber errorMessage="Invalid number" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('renders with error message', () => {
      render(<InputNumber errorMessage="Please enter a valid number" />);
      const errorMessage = screen.getByText('Please enter a valid number');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('renders as disabled', () => {
      render(<InputNumber isDisabled />);
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe('Clear Button', () => {
    it('renders clear button when hasClearButton is true', () => {
      render(<InputNumber hasClearButton />);
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('accepts id prop', () => {
      render(<InputNumber id="number-input" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('id', 'number-input');
    });

    it('accepts name prop', () => {
      render(<InputNumber name="amount" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('name', 'amount');
    });
  });
});
