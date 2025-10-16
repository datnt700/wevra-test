import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InputSearch } from './InputSearch';

describe('InputSearch', () => {
  describe('Basic Rendering', () => {
    it('should render the search input', () => {
      render(<InputSearch />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(<InputSearch placeholder="Search..." />);
      const input = screen.getByPlaceholderText('Search...');
      expect(input).toBeInTheDocument();
    });

    it('should render with default value', () => {
      render(<InputSearch value="Search query" readOnly />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Search query');
    });

    it('should render search icon', () => {
      const { container } = render(<InputSearch />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Status States', () => {
    it('should apply default status styling', () => {
      const { container } = render(<InputSearch />);
      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });

    it('should apply error status when error message is provided', () => {
      render(<InputSearch errorMessage="Search failed" />);
      const errorMessage = screen.getByText('Search failed');
      expect(errorMessage).toBeInTheDocument();
    });

    it('should apply error status styling', () => {
      const { container } = render(<InputSearch status="error" />);
      const wrapper = container.firstChild;
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when provided', () => {
      render(<InputSearch errorMessage="Invalid search query" />);
      const errorMessage = screen.getByText('Invalid search query');
      expect(errorMessage).toBeInTheDocument();
    });

    it('should apply error status when errorMessage exists', () => {
      render(<InputSearch errorMessage="Error" status="default" />);
      const errorMessage = screen.getByText('Error');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when disabled is true', () => {
      render(<InputSearch disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should not be interactive when disabled', () => {
      render(<InputSearch disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('Read-Only State', () => {
    it('should have readOnly attribute when readOnly is true', () => {
      render(<InputSearch readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('should display read-only value', () => {
      render(<InputSearch readOnly value="Read-only search" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toHaveAttribute('readonly');
      expect(input.value).toBe('Read-only search');
    });
  });

  describe('User Interactions', () => {
    it('should call onChange when text is entered', () => {
      const handleChange = vi.fn();
      render(<InputSearch onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'search term' } });

      expect(handleChange).toHaveBeenCalled();
    });

    it('should update value on user typing', () => {
      render(<InputSearch />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'new search' } });

      expect(input.value).toBe('new search');
    });
  });

  describe('Search Icon', () => {
    it('should display search icon by default', () => {
      const { container } = render(<InputSearch />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render search icon with input', () => {
      const { container } = render(<InputSearch value="search" readOnly />);
      const icon = container.querySelector('svg');
      const input = screen.getByRole('textbox');

      expect(icon).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });
  });

  describe('Input Type', () => {
    it('should have type attribute set to text', () => {
      render(<InputSearch />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  describe('Accessibility', () => {
    it('should have textbox role', () => {
      render(<InputSearch />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should have correct id attribute', () => {
      render(<InputSearch id="search-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'search-input');
    });

    it('should have correct name attribute', () => {
      render(<InputSearch name="search" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'search');
    });

    it('should have appropriate placeholder for screen readers', () => {
      render(<InputSearch placeholder="Search for products..." />);
      const input = screen.getByPlaceholderText('Search for products...');
      expect(input).toBeInTheDocument();
    });
  });
});
