import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxCard } from '../components/CheckboxCard';

describe('CheckboxCard', () => {
  describe('Basic Rendering', () => {
    it('should render with label', () => {
      render(<CheckboxCard label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('should render with label and description', () => {
      render(<CheckboxCard label="Enable notifications" description="Get updates via email" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
      expect(screen.getByText('Get updates via email')).toBeInTheDocument();
    });

    it('should render without description when not provided', () => {
      const { container } = render(<CheckboxCard label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
      expect(container.textContent).not.toContain('Get updates via email');
    });
  });

  describe('Checked State', () => {
    it('should render unchecked by default', () => {
      const { container } = render(<CheckboxCard label="Enable notifications" />);
      const checkbox = container.querySelector('[role="checkbox"]');
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });

    it('should render checked when checked prop is true', () => {
      const { container } = render(<CheckboxCard label="Enable notifications" checked={true} />);
      const checkbox = container.querySelector('[role="checkbox"]');
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });

    it('should render unchecked when checked prop is false', () => {
      const { container } = render(<CheckboxCard label="Enable notifications" checked={false} />);
      const checkbox = container.querySelector('[role="checkbox"]');
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });
  });

  describe('User Interactions', () => {
    it('should call onCheckedChange when wrapper is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<CheckboxCard label="Enable notifications" onCheckedChange={handleChange} />);

      const wrapper = screen.getByText('Enable notifications').closest('div');
      await user.click(wrapper!);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should call onCheckedChange with false when clicking checked checkbox', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <CheckboxCard label="Enable notifications" checked={true} onCheckedChange={handleChange} />
      );

      const wrapper = screen.getByText('Enable notifications').closest('div');
      await user.click(wrapper!);

      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('should call onCheckedChange with true when clicking unchecked checkbox', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <CheckboxCard label="Enable notifications" checked={false} onCheckedChange={handleChange} />
      );

      const wrapper = screen.getByText('Enable notifications').closest('div');
      await user.click(wrapper!);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should call onCheckedChange when clicking on label', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<CheckboxCard label="Enable notifications" onCheckedChange={handleChange} />);

      await user.click(screen.getByText('Enable notifications'));

      expect(handleChange).toHaveBeenCalled();
    });

    it('should call onCheckedChange when clicking on description', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <CheckboxCard
          label="Enable notifications"
          description="Get updates"
          onCheckedChange={handleChange}
        />
      );

      await user.click(screen.getByText('Get updates'));

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Controlled Behavior', () => {
    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender, container } = render(
        <CheckboxCard label="Enable notifications" checked={false} onCheckedChange={handleChange} />
      );

      const wrapper = screen.getByText('Enable notifications').closest('div');
      await user.click(wrapper!);

      expect(handleChange).toHaveBeenCalledWith(true);

      // Simulate parent updating checked state
      rerender(
        <CheckboxCard label="Enable notifications" checked={true} onCheckedChange={handleChange} />
      );

      const checkbox = container.querySelector('[role="checkbox"]');
      expect(checkbox).toHaveAttribute('data-state', 'checked');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing onCheckedChange callback', async () => {
      const user = userEvent.setup();
      render(<CheckboxCard label="Enable notifications" />);

      const wrapper = screen.getByText('Enable notifications').closest('div');

      // Should not throw error
      await expect(user.click(wrapper!)).resolves.not.toThrow();
    });

    it('should render with empty description', () => {
      render(<CheckboxCard label="Enable notifications" description="" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('should handle long labels', () => {
      const longLabel =
        'This is a very long label that should still render correctly without any issues';
      render(<CheckboxCard label={longLabel} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle long descriptions', () => {
      const longDescription =
        'This is a very long description that provides detailed information about what this checkbox option does and why you might want to enable or disable it';
      render(<CheckboxCard label="Option" description={longDescription} />);
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have checkbox role', () => {
      const { container } = render(<CheckboxCard label="Enable notifications" />);
      const checkbox = container.querySelector('[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('should have correct aria-checked attribute when checked', () => {
      const { container } = render(<CheckboxCard label="Enable notifications" checked={true} />);
      const checkbox = container.querySelector('[role="checkbox"]');
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('should have correct aria-checked attribute when unchecked', () => {
      const { container } = render(<CheckboxCard label="Enable notifications" checked={false} />);
      const checkbox = container.querySelector('[role="checkbox"]');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });
  });
});
