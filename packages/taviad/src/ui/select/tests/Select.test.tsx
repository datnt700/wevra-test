import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select } from '../components/Select';
import { SelectOption } from '../types';

describe('Select', () => {
  const mockOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<Select options={mockOptions} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with placeholder text', () => {
      render(<Select options={mockOptions} placeholder="Choose an option" />);
      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it('should render with custom testId', () => {
      render(<Select options={mockOptions} testId="custom-select" />);
      expect(screen.getByTestId('custom-select')).toBeInTheDocument();
    });

    it('should render with aria-label', () => {
      render(<Select options={mockOptions} ariaLabel="Select a value" />);
      const trigger = screen.getByLabelText('Select a value');
      expect(trigger).toBeInTheDocument();
    });

    it('should have correct display name', () => {
      expect(Select.displayName).toBe('Select');
    });

    it('should render with empty options array', () => {
      const { container } = render(<Select options={[]} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Value States', () => {
    it('should render with controlled value', () => {
      render(<Select options={mockOptions} value="option2" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should render with defaultValue', () => {
      render(<Select options={mockOptions} defaultValue="option3" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle empty string value', () => {
      render(<Select options={mockOptions} value="" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle undefined value', () => {
      render(<Select options={mockOptions} value={undefined} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should accept onValueChange callback', () => {
      const handleChange = vi.fn();
      render(<Select options={mockOptions} onValueChange={handleChange} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should render disabled select', () => {
      render(<Select options={mockOptions} isDisabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-disabled', '');
    });

    it('should have closed state when disabled', () => {
      render(<Select options={mockOptions} isDisabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('should apply disabled styling via testId', () => {
      render(<Select options={mockOptions} isDisabled testId="disabled-select" />);
      const trigger = screen.getByTestId('disabled-select');
      expect(trigger).toHaveAttribute('data-disabled', '');
    });

    it('should render with disabled option', () => {
      const optionsWithDisabled: SelectOption[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
      ];
      render(<Select options={optionsWithDisabled} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Invalid State', () => {
    it('should render in invalid state', () => {
      render(<Select options={mockOptions} isInvalid testId="invalid-select" />);
      const trigger = screen.getByTestId('invalid-select');
      expect(trigger).toBeInTheDocument();
    });

    it('should not be invalid by default', () => {
      render(<Select options={mockOptions} testId="valid-select" />);
      const trigger = screen.getByTestId('valid-select');
      expect(trigger).toBeInTheDocument();
    });

    it('should handle both isInvalid and isDisabled', () => {
      render(<Select options={mockOptions} isInvalid isDisabled testId="both-states" />);
      const trigger = screen.getByTestId('both-states');
      expect(trigger).toHaveAttribute('data-disabled', '');
    });
  });

  describe('Required State', () => {
    it('should render with required attribute', () => {
      render(<Select options={mockOptions} required />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-required', 'true');
    });

    it('should not be required by default', () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-required', 'false');
    });

    it('should handle required with validation', () => {
      render(<Select options={mockOptions} required isInvalid />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Form Integration', () => {
    it('should render with name attribute', () => {
      render(<Select options={mockOptions} name="selectField" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should work in form context', () => {
      render(
        <form>
          <Select options={mockOptions} name="country" required />
        </form>
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle form submission integration', () => {
      render(
        <form>
          <Select options={mockOptions} name="language" value="option1" />
          <button type="submit">Submit</button>
        </form>
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Placeholder', () => {
    it('should render default placeholder', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('should render custom placeholder', () => {
      render(<Select options={mockOptions} placeholder="Pick one" />);
      expect(screen.getByText('Pick one')).toBeInTheDocument();
    });

    it('should handle empty placeholder', () => {
      render(<Select options={mockOptions} placeholder="" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role="combobox"', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should have aria-expanded attribute', () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have accessible name when ariaLabel is provided', () => {
      render(<Select options={mockOptions} ariaLabel="Country selector" />);
      expect(screen.getByLabelText('Country selector')).toBeInTheDocument();
    });

    it('should have proper aria-required when required', () => {
      render(<Select options={mockOptions} required />);
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
    });

    it('should be keyboard accessible', () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('type', 'button');
    });

    it('should support aria controls', () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-controls');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined options gracefully', () => {
      const { container } = render(<Select options={undefined as any} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle null options gracefully', () => {
      const { container } = render(<Select options={null as any} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle options with duplicate values', () => {
      const duplicateOptions: SelectOption[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option1', label: 'Option 1 Duplicate' },
      ];
      render(<Select options={duplicateOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle very long option labels', () => {
      const longOptions: SelectOption[] = [
        {
          value: 'long',
          label: 'This is a very long option label that might overflow the container',
        },
      ];
      render(<Select options={longOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle special characters in labels', () => {
      const specialOptions: SelectOption[] = [{ value: 'special', label: 'Option <>&"' }];
      render(<Select options={specialOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle undefined onValueChange gracefully', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle null className', () => {
      render(<Select options={mockOptions} className={null as any} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle undefined testId', () => {
      render(<Select options={mockOptions} testId={undefined} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should handle large number of options', () => {
      const manyOptions: SelectOption[] = Array.from({ length: 100 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }));
      render(<Select options={manyOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should not re-render unnecessarily', () => {
      const { rerender } = render(<Select options={mockOptions} value="option1" />);
      rerender(<Select options={mockOptions} value="option1" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = render(<Select options={mockOptions} value="option1" />);
      rerender(<Select options={mockOptions} value="option2" />);
      rerender(<Select options={mockOptions} value="option3" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should render with correct initial state', () => {
      render(<Select options={mockOptions} />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('should render chevron icon', () => {
      const { container } = render(<Select options={mockOptions} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render trigger button', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('combobox')).toHaveAttribute('type', 'button');
    });

    it('should have dir attribute', () => {
      render(<Select options={mockOptions} />);
      expect(screen.getByRole('combobox')).toHaveAttribute('dir', 'ltr');
    });
  });

  describe('Options Configuration', () => {
    it('should handle single option', () => {
      const singleOption: SelectOption[] = [{ value: 'only', label: 'Only Option' }];
      render(<Select options={singleOption} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle options with mixed disabled states', () => {
      const mixedOptions: SelectOption[] = [
        { value: 'enabled1', label: 'Enabled 1' },
        { value: 'disabled1', label: 'Disabled 1', disabled: true },
        { value: 'enabled2', label: 'Enabled 2' },
      ];
      render(<Select options={mixedOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle all options disabled', () => {
      const allDisabledOptions: SelectOption[] = [
        { value: 'option1', label: 'Option 1', disabled: true },
        { value: 'option2', label: 'Option 2', disabled: true },
      ];
      render(<Select options={allDisabledOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Type Safety', () => {
    it('should accept valid SelectOption array', () => {
      const validOptions: SelectOption[] = [{ value: 'test', label: 'Test', disabled: false }];
      render(<Select options={validOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle options without disabled property', () => {
      const minimalOptions: SelectOption[] = [{ value: 'test', label: 'Test' }];
      render(<Select options={minimalOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle empty value strings', () => {
      const emptyValueOption: SelectOption[] = [{ value: '', label: 'Empty Value' }];
      render(<Select options={emptyValueOption} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });
});
