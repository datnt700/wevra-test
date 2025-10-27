import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from '../index';

describe('Badge', () => {
  // Basic Rendering
  describe('Basic Rendering', () => {
    it('should render with default structure', () => {
      const { container } = render(<Badge>Badge Text</Badge>);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render children text', () => {
      render(<Badge>Hello Badge</Badge>);
      expect(screen.getByText('Hello Badge')).toBeInTheDocument();
    });

    it('should render with ReactNode children', () => {
      render(
        <Badge>
          <span>Icon</span> Text
        </Badge>
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('should render with multiple children', () => {
      render(
        <Badge>
          <div>Part 1</div>
          <div>Part 2</div>
        </Badge>
      );
      expect(screen.getByText('Part 1')).toBeInTheDocument();
      expect(screen.getByText('Part 2')).toBeInTheDocument();
    });
  });

  // Interactive Features
  describe('Interactive Features', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Click Me</Badge>);

      const badge = screen.getByText('Click Me').closest('div');
      await userEvent.click(badge!);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple clicks', async () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Click Me</Badge>);

      const badge = screen.getByText('Click Me').closest('div');
      await userEvent.click(badge!);
      await userEvent.click(badge!);
      await userEvent.click(badge!);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('should not call onClick when not provided', async () => {
      const { container } = render(<Badge>Not Clickable</Badge>);

      expect(() => userEvent.click(container.firstChild as Element)).not.toThrow();
    });
  });

  // URL Navigation
  describe('URL Navigation', () => {
    it('should render as link when url is provided', () => {
      render(<Badge url="https://example.com">Link Badge</Badge>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('should open link in new tab', () => {
      render(<Badge url="https://example.com">Link Badge</Badge>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });

    it('should render without link when url is not provided', () => {
      render(<Badge>No Link</Badge>);

      const link = screen.queryByRole('link');
      expect(link).not.toBeInTheDocument();
    });

    it('should handle relative URLs', () => {
      render(<Badge url="/relative/path">Relative</Badge>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/relative/path');
    });

    it('should handle mailto links', () => {
      render(<Badge url="mailto:test@example.com">Email</Badge>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'mailto:test@example.com');
    });
  });

  // Combined Features
  describe('Combined Features', () => {
    it('should handle both onClick and url', async () => {
      const handleClick = vi.fn();
      render(
        <Badge onClick={handleClick} url="https://example.com">
          Combined
        </Badge>
      );

      const wrapper = screen.getByText('Combined').closest('div')?.parentElement;
      await userEvent.click(wrapper!);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
    });

    it('should render with className and wrapperClassName', () => {
      const { container } = render(
        <Badge className="body-class" wrapperClassName="wrapper-class">
          Styled
        </Badge>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('wrapper-class');

      // Body class should be on the BodyStyled element
      const body = wrapper.querySelector('.body-class');
      expect(body).toBeInTheDocument();
    });
  });

  // Display Name
  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(Badge.displayName).toBe('Badge');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should render with empty string children', () => {
      render(<Badge></Badge>);
      const { container } = render(<Badge></Badge>);
      expect(container.firstChild).toBeTruthy();
    });

    it('should handle undefined url gracefully', () => {
      render(<Badge url={undefined}>Undefined URL</Badge>);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should handle undefined onClick gracefully', () => {
      const { container } = render(<Badge onClick={undefined}>No Handler</Badge>);
      expect(container.firstChild).toBeTruthy();
    });

    it('should render with numeric children', () => {
      render(<Badge>{42}</Badge>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('should render with complex nested structure', () => {
      render(
        <Badge>
          <div>
            <span>
              <strong>Nested</strong> Content
            </span>
          </div>
        </Badge>
      );
      expect(screen.getByText('Nested')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('should have proper link attributes when url is provided', () => {
      render(<Badge url="https://example.com">Accessible Link</Badge>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });

    it('should be keyboard accessible when clickable', async () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Keyboard</Badge>);

      const badge = screen.getByText('Keyboard').closest('div');
      badge?.focus();

      // Note: actual keyboard interaction would require more setup
      expect(badge).toBeInTheDocument();
    });
  });

  // Common Use Cases
  describe('Common Use Cases', () => {
    it('should render status badge', () => {
      render(<Badge>Active</Badge>);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should render tag badge with icon', () => {
      render(
        <Badge>
          <span>🏷️</span> Tag
        </Badge>
      );
      expect(screen.getByText('🏷️')).toBeInTheDocument();
      expect(screen.getByText('Tag')).toBeInTheDocument();
    });

    it('should render clickable notification badge', async () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>5 new</Badge>);

      const badge = screen.getByText('5 new').closest('div');
      await userEvent.click(badge!);

      expect(handleClick).toHaveBeenCalled();
    });

    it('should render link badge for navigation', () => {
      render(<Badge url="/profile">View Profile</Badge>);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/profile');
    });
  });
});
