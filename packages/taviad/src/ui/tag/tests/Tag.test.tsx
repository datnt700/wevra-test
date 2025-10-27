import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tag } from '../components/Tag';

describe('Tag', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(<Tag>Test Tag</Tag>);
      expect(screen.getByText('Test Tag')).toBeInTheDocument();
    });

    it('renders without children', () => {
      const { container } = render(<Tag />);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('accepts custom className for body', () => {
      render(<Tag className="custom-tag">Content</Tag>);
      const body = screen.getByText('Content').parentElement;
      expect(body).toHaveClass('custom-tag');
    });

    it('accepts custom wrapperClassName', () => {
      const { container } = render(<Tag wrapperClassName="custom-wrapper">Content</Tag>);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-wrapper');
    });
  });

  describe('Click Behavior', () => {
    it('calls onClick when tag is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = render(<Tag onClick={handleClick}>Clickable</Tag>);

      const wrapper = container.firstChild as HTMLElement;
      await user.click(wrapper);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders clickable tag when onClick is provided', () => {
      const handleClick = vi.fn();
      render(<Tag onClick={handleClick}>Clickable</Tag>);
      expect(screen.getByText('Clickable')).toBeInTheDocument();
    });

    it('renders non-clickable tag without onClick', () => {
      render(<Tag>Not Clickable</Tag>);
      expect(screen.getByText('Not Clickable')).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('renders close button when hasClose is true', () => {
      const { container } = render(<Tag hasClose>Closable</Tag>);
      const closeIcon = container.querySelector('svg');
      expect(closeIcon).toBeInTheDocument();
    });

    it('does not render close button by default', () => {
      const { container } = render(<Tag>No Close</Tag>);
      const closeIcon = container.querySelector('svg');
      expect(closeIcon).not.toBeInTheDocument();
    });

    it('calls onCloseClick when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      const { container } = render(
        <Tag hasClose onCloseClick={handleClose}>
          Closable
        </Tag>
      );

      const closeIcon = container.querySelector('svg') as SVGElement;
      await user.click(closeIcon);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('URL Behavior', () => {
    it('renders as link when url is provided', () => {
      render(<Tag url="https://example.com">Link Tag</Tag>);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('opens link in new tab', () => {
      render(<Tag url="https://example.com">Link Tag</Tag>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });

    it('renders with URL prop when url is provided', () => {
      const { container } = render(<Tag url="https://example.com">Link</Tag>);
      const wrapper = container.firstChild as HTMLElement;
      const link = screen.getByRole('link');
      expect(wrapper).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });

    it('renders as div when no url', () => {
      render(<Tag>No Link</Tag>);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('renders close button in link tag', () => {
      const { container } = render(
        <Tag url="https://example.com" hasClose>
          Link with Close
        </Tag>
      );
      const link = screen.getByRole('link');
      const closeIcon = container.querySelector('svg');
      expect(link).toBeInTheDocument();
      expect(closeIcon).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(
        <Tag data-testid="custom-tag" id="tag-1">
          Content
        </Tag>
      );
      const tag = screen.getByTestId('custom-tag');
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveAttribute('id', 'tag-1');
    });

    it('supports data-* attributes', () => {
      const { container } = render(<Tag data-custom="value">Content</Tag>);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveAttribute('data-custom', 'value');
    });

    it('supports aria attributes', () => {
      render(<Tag aria-label="Custom tag">Content</Tag>);
      expect(screen.getByLabelText('Custom tag')).toBeInTheDocument();
    });
  });

  describe('Complex Content', () => {
    it('renders with JSX children', () => {
      render(
        <Tag>
          <strong>Bold</strong> and <em>italic</em>
        </Tag>
      );
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('italic')).toBeInTheDocument();
    });

    it('handles long text with ellipsis', () => {
      render(<Tag>This is a very long tag text that should overflow</Tag>);
      expect(screen.getByText(/This is a very long tag text/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string children', () => {
      render(<Tag>{''}</Tag>);
      const { container } = render(<Tag>{''}</Tag>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<Tag>{null}</Tag>);
      const { container } = render(<Tag>{null}</Tag>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('handles both onClick and url', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Tag onClick={handleClick} url="https://example.com">
          Both
        </Tag>
      );

      const wrapper = container.firstChild as HTMLElement;
      const link = screen.getByRole('link');
      expect(wrapper).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });

    it('handles click without onClick handler', async () => {
      const user = userEvent.setup();
      const { container } = render(<Tag>No Handler</Tag>);
      const wrapper = container.firstChild as HTMLElement;

      // Should not throw error
      await user.click(wrapper);
      expect(wrapper).toBeInTheDocument();
    });

    it('handles close click without onCloseClick handler', async () => {
      const user = userEvent.setup();
      const { container } = render(<Tag hasClose>No Handler</Tag>);
      const closeIcon = container.querySelector('svg') as SVGElement;

      // Should not throw error
      await user.click(closeIcon);
      expect(closeIcon).toBeInTheDocument();
    });
  });

  describe('Multiple Tags', () => {
    it('renders multiple tags independently', () => {
      render(
        <div>
          <Tag>Tag 1</Tag>
          <Tag>Tag 2</Tag>
          <Tag>Tag 3</Tag>
        </div>
      );

      expect(screen.getByText('Tag 1')).toBeInTheDocument();
      expect(screen.getByText('Tag 2')).toBeInTheDocument();
      expect(screen.getByText('Tag 3')).toBeInTheDocument();
    });
  });
});
