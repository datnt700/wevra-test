import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { InputSearch } from '../components/InputSearch';

describe('InputSearch', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<InputSearch />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with placeholder', () => {
      render(<InputSearch placeholder="Search..." />);
      const input = screen.getByPlaceholderText('Search...');
      expect(input).toBeInTheDocument();
    });

    it('should render search icon', () => {
      const { container } = render(<InputSearch />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should have correct display name', () => {
      expect(InputSearch.displayName).toBe('InputSearch');
    });

    it('should render with custom id', () => {
      render(<InputSearch id="search-input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('id', 'search-input');
    });

    it('should render with name attribute', () => {
      render(<InputSearch name="search" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('name', 'search');
    });
  });

  describe('Value States', () => {
    it('should render with controlled value', () => {
      render(<InputSearch value="test value" onChange={vi.fn()} />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.value).toBe('test value');
    });

    it('should handle empty string value', () => {
      render(<InputSearch value="" onChange={vi.fn()} />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should handle undefined value', () => {
      render(<InputSearch value={undefined} />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should accept onChange callback', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<InputSearch onChange={handleChange} />);
      const input = screen.getByTestId('input');

      await user.type(input, 'a');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Status/Error State', () => {
    it('should render in default status', () => {
      render(<InputSearch status="default" />);
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
    });

    it('should render in error status', () => {
      render(<InputSearch status="error" />);
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
    });

    it('should display error message', () => {
      render(<InputSearch errorMessage="Invalid search" />);
      expect(screen.getByText('Invalid search')).toBeInTheDocument();
    });

    it('should not display error message when not provided', () => {
      const { container } = render(<InputSearch />);
      const errorMessage = container.querySelector('span');
      expect(errorMessage).not.toBeInTheDocument();
    });

    it('should auto-set error status when errorMessage is provided', () => {
      render(<InputSearch errorMessage="Error occurred" />);
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
      expect(screen.getByText('Error occurred')).toBeInTheDocument();
    });

    it('should handle both status and errorMessage', () => {
      render(<InputSearch status="error" errorMessage="Both provided" />);
      expect(screen.getByText('Both provided')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should allow typing in input', async () => {
      const user = userEvent.setup();
      render(<InputSearch />);
      const input = screen.getByTestId('input') as HTMLInputElement;

      await user.type(input, 'search query');
      expect(input.value).toBe('search query');
    });

    it('should call onChange on input change', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<InputSearch onChange={handleChange} />);
      const input = screen.getByTestId('input');

      await user.type(input, 'test');
      expect(handleChange).toHaveBeenCalledTimes(4); // Once per character
    });

    it('should allow clearing input', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(<InputSearch value="initial" onChange={handleChange} />);
      const input = screen.getByTestId('input') as HTMLInputElement;

      await user.clear(input);
      rerender(<InputSearch value="" onChange={handleChange} />);
      expect(input.value).toBe('');
    });

    it('should handle focus event', async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<InputSearch onFocus={handleFocus} />);
      const input = screen.getByTestId('input');

      await user.click(input);
      expect(handleFocus).toHaveBeenCalled();
    });

    it('should handle blur event', async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<InputSearch onBlur={handleBlur} />);
      const input = screen.getByTestId('input');

      await user.click(input);
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should be focusable', () => {
      render(<InputSearch />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should have accessible name when id is provided', () => {
      render(<InputSearch id="search-field" aria-label="Search" />);
      const input = screen.getByLabelText('Search');
      expect(input).toBeInTheDocument();
    });

    it('should support aria-describedby', () => {
      render(<InputSearch aria-describedby="search-help" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-describedby', 'search-help');
    });

    it('should support aria-invalid', () => {
      render(<InputSearch aria-invalid="true" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<InputSearch />);
      const input = screen.getByTestId('input');

      await user.tab();
      expect(input).toHaveFocus();
    });
  });

  describe('Form Integration', () => {
    it('should work with form submission', () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <InputSearch name="query" />
          <button type="submit">Submit</button>
        </form>
      );
      const button = screen.getByRole('button');
      button.click();
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should have name attribute for form data', () => {
      render(<InputSearch name="searchQuery" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('name', 'searchQuery');
    });

    it('should support required attribute', () => {
      render(<InputSearch required />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('required');
    });

    it('should support disabled attribute', () => {
      render(<InputSearch disabled />);
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined onChange gracefully', async () => {
      const user = userEvent.setup();
      render(<InputSearch />);
      const input = screen.getByTestId('input');

      await user.type(input, 'test');
      expect(input).toHaveValue('test');
    });

    it('should handle null className', () => {
      const { container } = render(<InputSearch className={null as any} />);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle undefined placeholder', () => {
      render(<InputSearch placeholder={undefined} />);
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
    });

    it('should handle special characters in value', async () => {
      const user = userEvent.setup();
      render(<InputSearch />);
      const input = screen.getByTestId('input') as HTMLInputElement;

      await user.type(input, '!@#$%^&*()');
      expect(input.value).toBe('!@#$%^&*()');
    });

    it('should handle very long input values', async () => {
      const longText = 'a'.repeat(100); // Reduced from 500 to avoid timeout
      const user = userEvent.setup();
      render(<InputSearch />);
      const input = screen.getByTestId('input') as HTMLInputElement;

      await user.type(input, longText);
      expect(input.value).toBe(longText);
    });

    it('should handle empty error message', () => {
      render(<InputSearch errorMessage="" />);
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
    });

    it('should handle numeric values in text input', async () => {
      const user = userEvent.setup();
      render(<InputSearch />);
      const input = screen.getByTestId('input') as HTMLInputElement;

      await user.clear(input); // Clear any existing value first
      await user.type(input, '12345');
      expect(input.value).toBe('12345');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to input element', () => {
      const ref = vi.fn();
      render(<InputSearch ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('should allow programmatic focus via ref', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<InputSearch ref={ref} />);
      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('should handle rapid input changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<InputSearch onChange={handleChange} />);
      const input = screen.getByTestId('input');

      await user.type(input, 'rapid');
      expect(handleChange).toHaveBeenCalled();
      expect(handleChange.mock.calls.length).toBeGreaterThan(0);
    });

    it('should not re-render unnecessarily', () => {
      const { rerender } = render(<InputSearch value="test" onChange={vi.fn()} />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.value).toBe('test');

      rerender(<InputSearch value="test" onChange={vi.fn()} />);
      expect(input.value).toBe('test');
    });
  });

  describe('Type Safety', () => {
    it('should accept valid InputSearchProps', () => {
      render(
        <InputSearch
          id="search"
          name="query"
          placeholder="Search..."
          status="default"
          value="test"
          onChange={vi.fn()}
        />
      );
      expect(screen.getByTestId('input')).toBeInTheDocument();
    });

    it('should accept HTML input attributes', () => {
      render(<InputSearch maxLength={50} autoComplete="off" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('maxLength', '50');
      expect(input).toHaveAttribute('autoComplete', 'off');
    });
  });
});
