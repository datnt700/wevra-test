/**
 * Drawer component tests
 * @module Drawer.test
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from '../components/Drawer';

describe('Drawer', () => {
  describe('Basic Rendering', () => {
    it('does not render when isOpen is false', () => {
      render(
        <Drawer isOpen={false} onClose={vi.fn()}>
          <p>Drawer content</p>
        </Drawer>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <p>Drawer content</p>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Drawer content')).toBeInTheDocument();
    });

    it('renders with header', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} header="Drawer Title">
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    });

    it('renders with footer', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} footer={<button>Save</button>}>
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  describe('Position Variants', () => {
    it('renders with right position by default', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders with left position', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} position="left">
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders with top position', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} position="top">
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders with bottom position', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} position="bottom">
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Drawer isOpen={true} onClose={handleClose} header="Test">
          <p>Content</p>
        </Drawer>
      );

      const closeButton = screen.getByRole('button', { name: /close drawer/i });
      await user.click(closeButton);

      // Wait for animation timeout
      await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1), { timeout: 400 });
    });

    it('calls onClose when overlay is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Drawer isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Drawer>
      );

      // Click on overlay
      const overlay = document.querySelector('[aria-hidden="true"]');
      if (overlay) {
        await user.click(overlay as HTMLElement);
      }

      await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1), { timeout: 400 });
    });

    it('calls onClose when Escape key is pressed', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Drawer isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Drawer>
      );

      await user.keyboard('{Escape}');

      await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1), { timeout: 400 });
    });
  });

  describe('Accessibility', () => {
    it('has role="dialog"', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <p>Content</p>
        </Drawer>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()}>
          <p>Content</p>
        </Drawer>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-labelledby when header is provided', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} header="Drawer Title">
          <p>Content</p>
        </Drawer>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'drawer-header');
      expect(document.getElementById('drawer-header')).toHaveTextContent('Drawer Title');
    });

    it('close button has aria-label', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} header="Title">
          <p>Content</p>
        </Drawer>
      );
      const closeButton = screen.getByRole('button', { name: /close drawer/i });
      expect(closeButton).toHaveAttribute('aria-label', 'Close drawer');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className to container', () => {
      render(
        <Drawer isOpen={true} onClose={vi.fn()} className="custom-drawer">
          <p>Content</p>
        </Drawer>
      );
      const container = screen.getByRole('dialog').firstChild;
      expect(container).toHaveClass('custom-drawer');
    });
  });
});
