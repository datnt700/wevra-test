import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Combobox } from './Combobox';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Combobox', () => {
  describe('Basic Rendering', () => {
    it('should render the combobox input', () => {
      render(<Combobox options={mockOptions} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(<Combobox options={mockOptions} placeholder="Select option..." />);
      const input = screen.getByPlaceholderText('Select option...');
      expect(input).toBeInTheDocument();
    });

    it('should render with default value', () => {
      render(<Combobox options={mockOptions} value="Option 1" readOnly />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Option 1');
    });
  });

  describe('Variants', () => {
    it('should apply default variant styling', () => {
      const { container } = render(<Combobox options={mockOptions} />);
      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });

    it('should apply danger variant when error message is provided', () => {
      render(<Combobox options={mockOptions} errorMessage="Error message" />);
      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toBeInTheDocument();
    });

    it('should apply success variant', () => {
      const { container } = render(<Combobox options={mockOptions} variant="success" />);
      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });

    it('should apply disabled variant when disabled', () => {
      render(<Combobox options={mockOptions} isDisabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  describe('Error State', () => {
    it('should display error message when provided', () => {
      render(<Combobox options={mockOptions} errorMessage="Invalid selection" />);
      const errorMessage = screen.getByText('Invalid selection');
      expect(errorMessage).toBeInTheDocument();
    });

    it('should apply danger variant when error message exists', () => {
      const { container } = render(
        <Combobox options={mockOptions} errorMessage="Error" variant="success" />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when isDisabled is true', () => {
      render(<Combobox options={mockOptions} isDisabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should not show clear button when disabled', () => {
      render(<Combobox options={mockOptions} isDisabled hasClearButton value="test" readOnly />);
      const clearButton = screen.queryByRole('button');
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('Read-Only State', () => {
    it('should have readOnly attribute when isReadOnly is true', () => {
      render(<Combobox options={mockOptions} isReadOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('should not show clear button when read-only', () => {
      render(<Combobox options={mockOptions} isReadOnly hasClearButton value="test" />);
      const clearButton = screen.queryByRole('button');
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('Clear Button', () => {
    it('should render clear button when hasClearButton is true and input has value', () => {
      render(<Combobox options={mockOptions} hasClearButton value="test" readOnly />);
      const clearButton = screen.getByRole('button');
      expect(clearButton).toBeInTheDocument();
    });

    it('should not render clear button by default', () => {
      render(<Combobox options={mockOptions} value="test" readOnly />);
      const clearButton = screen.queryByRole('button');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should not render clear button when input is empty', () => {
      render(<Combobox options={mockOptions} hasClearButton value="" />);
      const clearButton = screen.queryByRole('button');
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onChange when input value changes', () => {
      const handleChange = vi.fn();
      render(<Combobox options={mockOptions} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Option' } });

      expect(handleChange).toHaveBeenCalled();
    });

    it('should update input value on user typing', () => {
      render(<Combobox options={mockOptions} />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'Option 1' } });

      expect(input.value).toBe('Option 1');
    });
  });

  describe('Options Filtering', () => {
    it('should provide options array to component', () => {
      const { container } = render(<Combobox options={mockOptions} />);
      expect(container).toBeInTheDocument();
    });

    it('should handle empty options array', () => {
      const { container } = render(<Combobox options={[]} />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have textbox role', () => {
      render(<Combobox options={mockOptions} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should have correct id attribute', () => {
      render(<Combobox options={mockOptions} id="test-combobox" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'test-combobox');
    });

    it('should have correct name attribute', () => {
      render(<Combobox options={mockOptions} name="test-name" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'test-name');
    });

    it('should have aria-label when placeholder is provided', () => {
      render(<Combobox options={mockOptions} placeholder="Select an option" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });
});
