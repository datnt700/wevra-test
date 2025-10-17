import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Combobox } from '../components/Combobox';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Combobox', () => {
  describe('Basic Rendering', () => {
    it('renders with placeholder', () => {
      render(<Combobox placeholder="Select option" />);
      expect(screen.getByPlaceholderText('Select option')).toBeInTheDocument();
    });

    it('renders without placeholder', () => {
      const { container } = render(<Combobox />);
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with id attribute', () => {
      const { container } = render(<Combobox id="combobox-1" />);
      expect(container.querySelector('#combobox-1')).toBeInTheDocument();
    });

    it('renders with name attribute', () => {
      const { container } = render(<Combobox name="category" />);
      const input = container.querySelector('input[name="category"]');
      expect(input).toBeInTheDocument();
    });

    it('renders as text input', () => {
      const { container } = render(<Combobox />);
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Value', () => {
    it('renders with empty value by default', () => {
      render(<Combobox placeholder="Search" />);
      const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('renders with provided value', () => {
      render(<Combobox value="test value" placeholder="Search" />);
      const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
      expect(input.value).toBe('test value');
    });

    it('updates value on change', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Combobox onChange={handleChange} placeholder="Search" />);
      const input = screen.getByPlaceholderText('Search');

      await user.type(input, 'new value');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Options', () => {
    it('renders without options by default', () => {
      const { container } = render(<Combobox />);
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with options', () => {
      render(<Combobox options={mockOptions} />);
      // Options are rendered in a Popover (may need to be opened to see them)
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders empty options array', () => {
      render(<Combobox options={[]} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant by default', () => {
      render(<Combobox placeholder="Default" />);
      const input = screen.getByPlaceholderText('Default');
      expect(input).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<Combobox variant="success" placeholder="Success" />);
      expect(screen.getByPlaceholderText('Success')).toBeInTheDocument();
    });

    it('renders warning variant', () => {
      render(<Combobox variant="warning" placeholder="Warning" />);
      expect(screen.getByPlaceholderText('Warning')).toBeInTheDocument();
    });

    it('renders danger variant', () => {
      render(<Combobox variant="danger" placeholder="Danger" />);
      expect(screen.getByPlaceholderText('Danger')).toBeInTheDocument();
    });

    it('renders danger variant when errorMessage is provided', () => {
      render(<Combobox errorMessage="Error occurred" placeholder="Error" />);
      expect(screen.getByPlaceholderText('Error')).toBeInTheDocument();
      expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('renders without disabled state by default', () => {
      render(<Combobox placeholder="Enabled" />);
      const input = screen.getByPlaceholderText('Enabled');
      expect(input).not.toBeDisabled();
    });

    it('renders with disabled state', () => {
      render(<Combobox isDisabled placeholder="Disabled" />);
      const input = screen.getByPlaceholderText('Disabled');
      expect(input).toBeDisabled();
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Combobox isDisabled onChange={handleChange} placeholder="Disabled" />);
      const input = screen.getByPlaceholderText('Disabled');

      await user.type(input, 'test');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('ReadOnly State', () => {
    it('renders without readOnly state by default', () => {
      render(<Combobox placeholder="Editable" />);
      const input = screen.getByPlaceholderText('Editable');
      expect(input).not.toHaveAttribute('readonly');
    });

    it('renders with readOnly state', () => {
      render(<Combobox isReadOnly placeholder="ReadOnly" />);
      const input = screen.getByPlaceholderText('ReadOnly');
      expect(input).toHaveAttribute('readonly');
    });

    it('does not call onChange when readOnly', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Combobox isReadOnly onChange={handleChange} placeholder="ReadOnly" />);
      const input = screen.getByPlaceholderText('ReadOnly');

      await user.type(input, 'test');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Error Message', () => {
    it('renders without error message by default', () => {
      const { container } = render(<Combobox />);
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Combobox errorMessage="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders with empty error message', () => {
      render(<Combobox errorMessage="" placeholder="Input" />);
      expect(screen.getByPlaceholderText('Input')).toBeInTheDocument();
    });

    it('renders with long error message', () => {
      const longError = 'A'.repeat(200);
      render(<Combobox errorMessage={longError} />);
      expect(screen.getByText(longError)).toBeInTheDocument();
    });
  });

  describe('Clear Button', () => {
    it('does not render clear button by default', () => {
      const { container } = render(<Combobox value="test" />);
      const clearButton = container.querySelector('button[type="button"]');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('renders clear button when hasClearButton is true and has value', () => {
      const { container } = render(<Combobox hasClearButton value="test" />);
      const clearButton = container.querySelector('button[type="button"]');
      expect(clearButton).toBeInTheDocument();
    });

    it('does not render clear button when value is empty', () => {
      const { container } = render(<Combobox hasClearButton value="" />);
      const clearButton = container.querySelector('button[type="button"]');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('does not render clear button when disabled', () => {
      const { container } = render(<Combobox hasClearButton value="test" isDisabled />);
      const clearButton = container.querySelector('button[type="button"]');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('does not render clear button when readOnly', () => {
      const { container } = render(<Combobox hasClearButton value="test" isReadOnly />);
      const clearButton = container.querySelector('button[type="button"]');
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Combobox ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('can access input DOM properties via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Combobox ref={ref} value="test" />);

      expect(ref.current?.value).toBe('test');
      expect(ref.current?.tagName).toBe('INPUT');
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      const { container } = render(<Combobox className="custom-class" />);
      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toBeInTheDocument();
    });

    it('accepts data attributes', () => {
      render(<Combobox data-testid="custom-combobox" />);
      expect(screen.getByTestId('custom-combobox')).toBeInTheDocument();
    });

    it('accepts aria attributes', () => {
      render(<Combobox aria-label="Search input" />);
      const input = screen.getByLabelText('Search input');
      expect(input).toBeInTheDocument();
    });

    it('passes through other HTML input attributes', () => {
      render(<Combobox title="Combobox title" placeholder="Input" />);
      const input = screen.getByPlaceholderText('Input');
      expect(input).toHaveAttribute('title', 'Combobox title');
    });
  });

  describe('Combined Props', () => {
    it('renders with variant and error message', () => {
      render(<Combobox variant="success" errorMessage="Override to danger" />);
      expect(screen.getByText('Override to danger')).toBeInTheDocument();
    });

    it('renders with options and value', () => {
      render(<Combobox options={mockOptions} value="search term" placeholder="Search" />);
      const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
      expect(input.value).toBe('search term');
    });

    it('renders with all props', () => {
      const handleChange = vi.fn();
      render(
        <Combobox
          id="full-combobox"
          name="search"
          placeholder="Search..."
          value="test"
          onChange={handleChange}
          options={mockOptions}
          variant="success"
          hasClearButton
          className="custom"
        />
      );

      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has textbox role', () => {
      render(<Combobox />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Combobox aria-label="Category selection" />);
      expect(screen.getByLabelText('Category selection')).toBeInTheDocument();
    });

    it('is focusable by default', () => {
      render(<Combobox placeholder="Focus me" />);
      const input = screen.getByPlaceholderText('Focus me');
      input.focus();
      expect(input).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
      render(<Combobox isDisabled placeholder="Cannot focus" />);
      const input = screen.getByPlaceholderText('Cannot focus');
      input.focus();
      expect(input).not.toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty placeholder', () => {
      const { container } = render(<Combobox placeholder="" />);
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
      expect(input?.getAttribute('placeholder')).toBe('');
    });

    it('handles numeric value', () => {
      render(<Combobox value="123" placeholder="Number" />);
      const input = screen.getByPlaceholderText('Number') as HTMLInputElement;
      expect(input.value).toBe('123');
    });

    it('handles very long value', () => {
      const longValue = 'A'.repeat(200);
      render(<Combobox value={longValue} placeholder="Long" />);
      const input = screen.getByPlaceholderText('Long') as HTMLInputElement;
      expect(input.value).toBe(longValue);
    });

    it('handles special characters in value', () => {
      render(<Combobox value="<test> & 'value'" placeholder="Special" />);
      const input = screen.getByPlaceholderText('Special') as HTMLInputElement;
      expect(input.value).toBe("<test> & 'value'");
    });

    it('handles null value gracefully', () => {
      const { container } = render(<Combobox value={undefined} />);
      const input = container.querySelector('input[type="text"]') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('handles options with duplicate values', () => {
      const duplicateOptions = [
        { value: '1', label: 'First' },
        { value: '1', label: 'Duplicate' },
      ];
      render(<Combobox options={duplicateOptions} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });
});
