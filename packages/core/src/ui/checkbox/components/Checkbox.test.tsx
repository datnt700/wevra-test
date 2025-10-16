import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('Basic Rendering', () => {
    it('should render the checkbox', () => {
      render(<Checkbox id="test-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Checkbox id="test" label="Accept terms" />);
      const label = screen.getByText('Accept terms');
      expect(label).toBeInTheDocument();
    });

    it('should render without label', () => {
      render(<Checkbox id="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render with small size', () => {
      const { container } = render(<Checkbox id="test" size="sm" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with default size', () => {
      const { container } = render(<Checkbox id="test" size="default" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with medium size', () => {
      const { container } = render(<Checkbox id="test" size="md" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with large size', () => {
      const { container } = render(<Checkbox id="test" size="lg" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('should render unchecked by default', () => {
      render(<Checkbox id="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('should render checked when checked prop is true', () => {
      render(<Checkbox id="test" checked={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should render unchecked when checked prop is false', () => {
      render(<Checkbox id="test" checked={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when isDisabled is true', () => {
      render(<Checkbox id="test" isDisabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('should not have disabled attribute by default', () => {
      render(<Checkbox id="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeDisabled();
    });
  });

  describe('Required State', () => {
    it('should have required attribute when isRequired is true', () => {
      render(<Checkbox id="test" isRequired />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeRequired();
    });

    it('should not have required attribute by default', () => {
      render(<Checkbox id="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeRequired();
    });
  });

  describe('User Interactions', () => {
    it('should call onCheckedChange when clicked', () => {
      const handleChange = vi.fn();
      render(<Checkbox id="test" onCheckedChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalled();
    });

    it('should toggle checked state on click', () => {
      const handleChange = vi.fn();
      render(<Checkbox id="test" onCheckedChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should not call onCheckedChange when disabled', () => {
      const handleChange = vi.fn();
      render(<Checkbox id="test" isDisabled onCheckedChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Label Interactions', () => {
    it('should check checkbox when label is clicked', () => {
      const handleChange = vi.fn();
      render(<Checkbox id="test" label="Click me" onCheckedChange={handleChange} />);

      const label = screen.getByText('Click me');
      fireEvent.click(label);

      expect(handleChange).toHaveBeenCalled();
    });

    it('should associate label with checkbox via htmlFor', () => {
      render(<Checkbox id="test-id" label="Test Label" />);

      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveAttribute('for', 'test-id');
    });
  });

  describe('Accessibility', () => {
    it('should have checkbox role', () => {
      render(<Checkbox id="test" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should have correct id attribute', () => {
      render(<Checkbox id="test-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    });

    it('should have correct value attribute', () => {
      render(<Checkbox id="test" value="accepted" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('value', 'accepted');
    });
  });

  describe('Default Checked', () => {
    it('should render checked when defaultChecked is true', () => {
      render(<Checkbox id="test" defaultChecked={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should render unchecked when defaultChecked is false', () => {
      render(<Checkbox id="test" defaultChecked={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });
  });
});
