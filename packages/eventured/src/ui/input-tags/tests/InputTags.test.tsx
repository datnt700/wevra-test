import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputTags } from '../components/InputTags';

const mockTags = [
  { id: '1', name: 'React' },
  { id: '2', name: 'TypeScript' },
];

const mockSuggestions = [
  { id: '3', name: 'JavaScript' },
  { id: '4', name: 'Node.js' },
];

describe('InputTags', () => {
  describe('Basic Rendering', () => {
    it('renders with placeholder', () => {
      render(<InputTags placeholder="Add tags..." />);
      expect(screen.getByPlaceholderText('Add tags...')).toBeInTheDocument();
    });

    it('renders existing tags', () => {
      render(<InputTags tags={mockTags} />);
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      const { container } = render(<InputTags className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders input with correct type', () => {
      render(<InputTags type="email" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.type).toBe('email');
    });
  });

  describe('Tag Input', () => {
    it('adds tag on Enter key press', () => {
      const handleChange = vi.fn();
      render(<InputTags onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'New Tag' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalledWith({ name: 'New Tag' });
    });

    it('clears input after adding tag', () => {
      const handleChange = vi.fn();
      render(<InputTags onChange={handleChange} />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'New Tag' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(input.value).toBe('');
    });

    it('does not add empty tags', () => {
      const handleChange = vi.fn();
      render(<InputTags onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('trims whitespace from tag names', () => {
      const handleChange = vi.fn();
      render(<InputTags onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '  Trimmed Tag  ' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalledWith({ name: 'Trimmed Tag' });
    });

    it('does not add tag on other key presses', () => {
      const handleChange = vi.fn();
      render(<InputTags onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Tag' } });
      fireEvent.keyDown(input, { key: 'Tab' });

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Tag Removal', () => {
    it('calls removeTag when tag close button is clicked', () => {
      const handleRemove = vi.fn();
      render(<InputTags tags={mockTags} removeTag={handleRemove} />);

      // Find close icon/div by class or SVG
      const closeDivs = document.querySelectorAll('svg.lucide-x');
      if (closeDivs[0]) {
        fireEvent.click(closeDivs[0]);
        expect(handleRemove).toHaveBeenCalledWith('1');
      }
    });

    it('renders tags with close buttons when removeTag is provided', () => {
      const handleRemove = vi.fn();
      render(<InputTags tags={mockTags} removeTag={handleRemove} />);

      // Should have close icons for each tag
      const closeIcons = document.querySelectorAll('svg.lucide-x');
      expect(closeIcons.length).toBe(2);
    });
  });
  describe('Suggestions', () => {
    it('shows suggestions on input focus', () => {
      render(<InputTags tagsSuggestion={mockSuggestions} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });

    it('does not show suggestions when empty', () => {
      render(<InputTags tagsSuggestion={[]} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    });

    it('adds tag when suggestion is clicked', () => {
      const handleChange = vi.fn();
      render(<InputTags tagsSuggestion={mockSuggestions} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      const suggestion = screen.getByText('JavaScript');
      fireEvent.click(suggestion);

      expect(handleChange).toHaveBeenCalledWith({ name: 'JavaScript' });
    });

    it('hides suggestions after selecting one', () => {
      const handleChange = vi.fn();
      render(<InputTags tagsSuggestion={mockSuggestions} onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);

      const suggestion = screen.getByText('JavaScript');
      fireEvent.click(suggestion);

      expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
    });
  });

  describe('Status Prop', () => {
    it('renders with default status', () => {
      const { container } = render(<InputTags status="default" />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });

    it('renders with error status', () => {
      const { container } = render(<InputTags status="error" />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });

    it('uses default status when not specified', () => {
      const { container } = render(<InputTags />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Input Attributes', () => {
    it('renders with id attribute', () => {
      render(<InputTags id="tag-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'tag-input');
    });

    it('handles input value changes', () => {
      render(<InputTags />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'Test' } });

      expect(input.value).toBe('Test');
    });
  });

  describe('Edge Cases', () => {
    it('renders without tags', () => {
      render(<InputTags tags={[]} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('handles undefined tags array', () => {
      render(<InputTags />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('handles onChange not provided', () => {
      render(<InputTags />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Tag' } });

      expect(() => {
        fireEvent.keyDown(input, { key: 'Enter' });
      }).not.toThrow();
    });

    it('handles removeTag not provided', () => {
      render(<InputTags tags={mockTags} />);
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('prevents default on Enter key', () => {
      const handleChange = vi.fn();
      render(<InputTags onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Tag' } });

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      input.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('renders multiple tags correctly', () => {
      const manyTags = Array.from({ length: 10 }, (_, i) => ({
        id: `${i}`,
        name: `Tag ${i}`,
      }));

      render(<InputTags tags={manyTags} />);

      manyTags.forEach((tag) => {
        expect(screen.getByText(tag.name)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('input is accessible via role', () => {
      render(<InputTags />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      const handleChange = vi.fn();
      render(<InputTags onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      input.focus();

      fireEvent.change(input, { target: { value: 'Keyboard Tag' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalled();
    });
  });
});
