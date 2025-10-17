import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from '../components/Link';

describe('Link', () => {
  describe('Basic Rendering', () => {
    it('renders link with correct text', () => {
      render(<Link url="#">Click me</Link>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders link with correct href', () => {
      const { container } = render(<Link url="https://example.com">Example</Link>);
      const anchorElement = container.querySelector('a');
      expect(anchorElement).toHaveAttribute('href', 'https://example.com');
    });

    it('renders with default variant', () => {
      const { container } = render(<Link url="#">Default link</Link>);
      const anchorElement = container.querySelector('a');
      expect(anchorElement).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders monochrome variant', () => {
      const { container } = render(
        <Link url="#" variant="monochrome">
          Monochrome link
        </Link>
      );
      const anchorElement = container.querySelector('a');
      expect(anchorElement).toBeInTheDocument();
    });

    it('renders with underline', () => {
      const { container } = render(
        <Link url="#" underlined>
          Underlined link
        </Link>
      );
      const anchorElement = container.querySelector('a');
      expect(anchorElement).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <Link url="#" onClick={onClick}>
          Clickable link
        </Link>
      );

      await user.click(screen.getByText('Clickable link'));
      expect(onClick).toHaveBeenCalledOnce();
    });

    it('prevents default navigation when onClick is provided', async () => {
      const onClick = vi.fn();

      const { container } = render(
        <Link url="/some-page" onClick={onClick}>
          Custom handler
        </Link>
      );

      const link = container.querySelector('a');
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      link?.dispatchEvent(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Target Attribute', () => {
    it('renders with target="_blank"', () => {
      const { container } = render(
        <Link url="https://example.com" target="_blank">
          External link
        </Link>
      );

      const anchorElement = container.querySelector('a');
      expect(anchorElement).toHaveAttribute('target', '_blank');
    });

    it('adds rel="noopener noreferrer" for external links', () => {
      const { container } = render(
        <Link url="https://example.com" target="_blank">
          External link
        </Link>
      );

      const anchorElement = container.querySelector('a');
      expect(anchorElement).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('does not add rel attribute for internal links', () => {
      const { container } = render(<Link url="/about">Internal link</Link>);

      const anchorElement = container.querySelector('a');
      expect(anchorElement).not.toHaveAttribute('rel');
    });
  });

  describe('Accessibility', () => {
    it('renders with aria-label', () => {
      const { container } = render(
        <Link url="#" accessibilityLabel="Go to homepage">
          Home
        </Link>
      );

      const anchorElement = container.querySelector('a');
      expect(anchorElement).toHaveAttribute('aria-label', 'Go to homepage');
    });

    it('has proper focus styles', () => {
      const { container } = render(<Link url="#">Focusable link</Link>);
      const anchorElement = container.querySelector('a');
      expect(anchorElement).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('renders with custom id', () => {
      const { container } = render(
        <Link id="custom-link" url="#">
          Link with ID
        </Link>
      );

      const anchorElement = container.querySelector('#custom-link');
      expect(anchorElement).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Link className="custom-class" url="#">
          Styled link
        </Link>
      );

      const anchorElement = container.querySelector('.custom-class');
      expect(anchorElement).toBeInTheDocument();
    });
  });
});
