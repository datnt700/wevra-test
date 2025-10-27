/**
 * Modal component tests
 * @module Modal.test
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../components/Modal';

describe('Modal', () => {
  describe('Basic Rendering', () => {
    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={vi.fn()}>
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          <p>Modal content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('renders with header', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} header="Test Header">
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByText('Test Header')).toBeInTheDocument();
    });

    it('renders with footer', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} footer={<button>Save</button>}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  describe('Position Variants', () => {
    it('renders with center position by default', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders with top position', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} position="top">
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders with bottom position', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} position="bottom">
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} header="Test">
          <p>Content</p>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: /close modal/i });
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when overlay is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );

      // Click on overlay (first element outside dialog)
      const overlay = document.querySelector('[aria-hidden="true"]');
      if (overlay) {
        await user.click(overlay as HTMLElement);
      }

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );

      await user.keyboard('{Escape}');

      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has role="dialog"', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()}>
          <p>Content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-labelledby when header is provided', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} header="Modal Title">
          <p>Content</p>
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-header');
      expect(document.getElementById('modal-header')).toHaveTextContent('Modal Title');
    });

    it('close button has aria-label', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} header="Title">
          <p>Content</p>
        </Modal>
      );
      const closeButton = screen.getByRole('button', { name: /close modal/i });
      expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className to container', () => {
      render(
        <Modal isOpen={true} onClose={vi.fn()} className="custom-modal">
          <p>Content</p>
        </Modal>
      );
      const container = screen.getByRole('dialog').firstChild;
      expect(container).toHaveClass('custom-modal');
    });

    it('handles missing onClose prop gracefully', () => {
      render(
        <Modal isOpen={true} onClose={undefined as any}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});
