/**
 * InputText Component Tests
 * Tests basic rendering, variants, error states, and user interactions
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { InputText } from './InputText';
import { describe, it, expect, vi } from 'vitest';

describe('InputText Component', () => {
  describe('Basic Rendering', () => {
    it('renders input element', () => {
      render(<InputText />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<InputText placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
    });

    it('renders with default value', () => {
      render(<InputText value="Test value" onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Test value');
    });
  });

  describe('Variants', () => {
    it('renders with default variant', () => {
      render(<InputText variant="default" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with success variant', () => {
      render(<InputText variant="success" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with warning variant', () => {
      render(<InputText variant="warning" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('renders with error message', () => {
      render(<InputText errorMessage="This is an error" />);
      const errorMessage = screen.getByText('This is an error');
      expect(errorMessage).toBeInTheDocument();
    });

    it('applies danger variant when error message is present', () => {
      render(<InputText errorMessage="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('renders as disabled', () => {
      render(<InputText isDisabled />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('applies disabled styling variant', () => {
      render(<InputText isDisabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toBeDisabled();
    });
  });

  describe('Read-Only State', () => {
    it('renders as read-only', () => {
      render(<InputText isReadOnly />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.readOnly).toBe(true);
    });
  });

  describe('Clear Button', () => {
    it('renders clear button when hasClearButton is true', () => {
      render(<InputText hasClearButton />);
      const input = screen.getByRole('textbox');
      const closeButton = screen.getByRole('button');
      expect(input).toBeInTheDocument();
      expect(closeButton).toBeInTheDocument();
    });

    it('does not render clear button by default', () => {
      render(<InputText />);
      const buttons = screen.queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when user types', () => {
      const handleChange = vi.fn();
      render(<InputText onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Hello' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('updates value on change', () => {
      const { rerender } = render(<InputText value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');

      rerender(<InputText value="New value" onChange={() => {}} />);
      expect(input.value).toBe('New value');
    });
  });

  describe('Accessibility', () => {
    it('has correct role', () => {
      render(<InputText />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('accepts id prop', () => {
      render(<InputText id="test-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('accepts name prop', () => {
      render(<InputText name="test-name" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'test-name');
    });

    it('has correct data-testid', () => {
      render(<InputText />);
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
    });
  });
});
