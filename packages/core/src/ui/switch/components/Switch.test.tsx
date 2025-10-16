import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('Basic Rendering', () => {
    it('should render the switch', () => {
      render(<Switch name="test-switch" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeInTheDocument();
    });

    it('should render with left label', () => {
      render(<Switch name="test" labelLeft="Enable feature" />);
      const label = screen.getByText('Enable feature');
      expect(label).toBeInTheDocument();
    });

    it('should render with right label', () => {
      render(<Switch name="test" labelRight="Feature enabled" />);
      const label = screen.getByText('Feature enabled');
      expect(label).toBeInTheDocument();
    });

    it('should render with both labels', () => {
      render(<Switch name="test" labelLeft="Off" labelRight="On" />);
      const leftLabel = screen.getByText('Off');
      const rightLabel = screen.getByText('On');
      expect(leftLabel).toBeInTheDocument();
      expect(rightLabel).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render with default variant', () => {
      const { container } = render(<Switch name="test" variant="default" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with primary variant', () => {
      const { container } = render(<Switch name="test" variant="primary" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Checked State', () => {
    it('should render unchecked by default', () => {
      render(<Switch name="test" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeChecked();
    });

    it('should render checked when checked prop is true', () => {
      render(<Switch name="test" checked={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeChecked();
    });

    it('should render unchecked when checked prop is false', () => {
      render(<Switch name="test" checked={false} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeChecked();
    });

    it('should render checked when defaultChecked is true', () => {
      render(<Switch name="test" defaultChecked={true} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeChecked();
    });
  });

  describe('Disabled State', () => {
    it('should have disabled attribute when isDisabled is true', () => {
      render(<Switch name="test" isDisabled />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toBeDisabled();
    });

    it('should not have disabled attribute by default', () => {
      render(<Switch name="test" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeDisabled();
    });

    it('should not call onCheckedChange when disabled', () => {
      const handleChange = vi.fn();
      render(<Switch name="test" isDisabled onCheckedChange={handleChange} />);

      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Required State', () => {
    it('should have aria-required when isRequired is true', () => {
      render(<Switch name="test" isRequired />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-required', 'true');
    });

    it('should not have aria-required by default', () => {
      render(<Switch />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('aria-required', 'false');
    });
  });

  describe('Shadow', () => {
    it('should render without shadow by default', () => {
      const { container } = render(<Switch name="test" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with shadow when hasShadow is true', () => {
      const { container } = render(<Switch name="test" hasShadow />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onCheckedChange when clicked', () => {
      const handleChange = vi.fn();
      render(<Switch name="test" onCheckedChange={handleChange} />);

      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);

      expect(handleChange).toHaveBeenCalled();
    });

    it('should toggle checked state on click', () => {
      const handleChange = vi.fn();
      render(<Switch name="test" onCheckedChange={handleChange} />);

      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should toggle from checked to unchecked', () => {
      const handleChange = vi.fn();
      render(<Switch name="test" checked={true} onCheckedChange={handleChange} />);

      const switchElement = screen.getByRole('switch');
      fireEvent.click(switchElement);

      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Label Interactions', () => {
    it('should toggle switch when label is clicked', () => {
      const handleChange = vi.fn();
      render(<Switch name="test" labelLeft="Click me" onCheckedChange={handleChange} />);

      const label = screen.getByText('Click me');
      fireEvent.click(label);

      expect(handleChange).toHaveBeenCalled();
    });

    it('should associate label with switch via htmlFor', () => {
      render(<Switch name="test-id" labelLeft="Test Label" />);

      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveAttribute('for', 'test-id');
    });
  });

  describe('Icons', () => {
    it('should render left icon when unchecked', () => {
      const IconLeft = <span data-testid="icon-left">OFF</span>;
      render(<Switch name="test" iconLeft={IconLeft} checked={false} />);

      const icon = screen.getByTestId('icon-left');
      expect(icon).toBeInTheDocument();
    });

    it('should render right icon when checked', () => {
      const IconRight = <span data-testid="icon-right">ON</span>;
      render(<Switch name="test" iconRight={IconRight} checked={true} />);

      const icon = screen.getByTestId('icon-right');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have switch role', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('should have correct id attribute', () => {
      render(<Switch id="custom-switch" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('id', 'custom-switch');
    });

    it('should have correct value attribute', () => {
      render(<Switch value="custom-value" />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).toHaveAttribute('value', 'custom-value');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component with defaultChecked', () => {
      render(<Switch name="test" defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeChecked();
    });

    it('should work as controlled component with checked prop', () => {
      const { rerender } = render(<Switch name="test" checked={false} />);
      const switchElement = screen.getByRole('switch');
      expect(switchElement).not.toBeChecked();

      rerender(<Switch name="test" checked={true} />);
      expect(switchElement).toBeChecked();
    });
  });
});
