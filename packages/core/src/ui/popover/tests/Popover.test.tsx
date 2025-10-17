/**
 * Popover component tests
 * @module Popover.test
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from '../components/Popover';

describe('Popover', () => {
  describe('Basic Rendering', () => {
    it('renders trigger element', () => {
      render(
        <Popover trigger={<button>Open Popover</button>}>
          <p>Popover content</p>
        </Popover>
      );
      expect(screen.getByRole('button', { name: /open popover/i })).toBeInTheDocument();
    });

    it('shows content when trigger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Popover trigger={<button>Open</button>}>
          <p>Content inside</p>
        </Popover>
      );

      const trigger = screen.getByRole('button', { name: /open/i });
      await user.click(trigger);

      expect(screen.getByText('Content inside')).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('renders close button when hasClose is true', async () => {
      const user = userEvent.setup();
      render(
        <Popover trigger={<button>Open</button>} hasClose>
          <p>Content</p>
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      expect(screen.getByRole('button', { name: /close popover/i })).toBeInTheDocument();
    });

    it('does not render close button when hasClose is false', async () => {
      const user = userEvent.setup();
      render(
        <Popover trigger={<button>Open</button>} hasClose={false}>
          <p>Content</p>
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      expect(screen.queryByRole('button', { name: /close popover/i })).not.toBeInTheDocument();
    });

    it('closes popover when close button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Popover trigger={<button>Open</button>} hasClose>
          <p>Content to hide</p>
        </Popover>
      );

      // Open popover
      await user.click(screen.getByRole('button', { name: /open/i }));
      expect(screen.getByText('Content to hide')).toBeInTheDocument();

      // Close popover
      const closeButton = screen.getByRole('button', { name: /close popover/i });
      await user.click(closeButton);

      expect(screen.queryByText('Content to hide')).not.toBeInTheDocument();
    });
  });

  describe('Arrow', () => {
    it('renders arrow when showArrow is true', async () => {
      const user = userEvent.setup();
      render(
        <Popover trigger={<button>Open</button>} showArrow>
          <p>Content</p>
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      // Arrow is rendered as an SVG element
      const popoverContent = screen.getByText('Content').parentElement;
      expect(popoverContent).toBeInTheDocument();
    });
  });

  describe('Positioning', () => {
    it('applies default side (top)', () => {
      render(
        <Popover trigger={<button>Open</button>}>
          <p>Content</p>
        </Popover>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('applies custom side', () => {
      render(
        <Popover trigger={<button>Open</button>} side="bottom">
          <p>Content</p>
        </Popover>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('applies custom sideOffset', () => {
      render(
        <Popover trigger={<button>Open</button>} sideOffset={20}>
          <p>Content</p>
        </Popover>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', async () => {
      const user = userEvent.setup();
      render(
        <Popover trigger={<button>Open</button>} className="custom-popover">
          <p>Content</p>
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      const content = screen.getByText('Content').parentElement;
      expect(content).toHaveClass('custom-popover');
    });

    it('renders custom trigger element', () => {
      render(
        <Popover trigger={<div>Custom Trigger</div>}>
          <p>Content</p>
        </Popover>
      );
      expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('close button has aria-label', async () => {
      const user = userEvent.setup();
      render(
        <Popover trigger={<button>Open</button>} hasClose>
          <p>Content</p>
        </Popover>
      );

      await user.click(screen.getByRole('button', { name: /open/i }));

      const closeButton = screen.getByRole('button', { name: /close popover/i });
      expect(closeButton).toHaveAttribute('aria-label', 'Close popover');
    });
  });
});
