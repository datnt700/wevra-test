import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toast } from '../components/Toast';

describe('Toast', () => {
  describe('Basic Rendering', () => {
    it('should render with title and content', () => {
      render(
        <Toast
          isShowing={true}
          title="Success"
          content="Operation completed successfully"
          position="bottom-right"
        />
      );

      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
    });

    it('should render with custom children', () => {
      render(
        <Toast isShowing={true} position="bottom-right">
          <div data-testid="custom-content">Custom notification</div>
        </Toast>
      );

      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom notification')).toBeInTheDocument();
    });

    it('should not render when isShowing is false', () => {
      render(
        <Toast
          isShowing={false}
          title="Hidden"
          content="Should not appear"
          position="bottom-right"
        />
      );

      expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });
  });

  describe('Position Variants', () => {
    it('should render at bottom-right position', () => {
      const { container } = render(
        <Toast isShowing={true} title="Bottom Right" position="bottom-right" />
      );

      const toast = container.querySelector('[data-state="open"]');
      expect(toast).toBeInTheDocument();
    });

    it('should render at top-center position', () => {
      const { container } = render(
        <Toast isShowing={true} title="Top Center" position="top-center" />
      );

      const toast = container.querySelector('[data-state="open"]');
      expect(toast).toBeInTheDocument();
    });

    it('should render at bottom-left position', () => {
      const { container } = render(
        <Toast isShowing={true} title="Bottom Left" position="bottom-left" />
      );

      const toast = container.querySelector('[data-state="open"]');
      expect(toast).toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    it('should render undo button when canUndo is true', () => {
      render(
        <Toast
          isShowing={true}
          title="Item deleted"
          content="The item was removed"
          canUndo
          position="bottom-right"
        />
      );

      expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
    });

    it('should not render undo button when canUndo is false', () => {
      render(
        <Toast
          isShowing={true}
          title="Notification"
          content="Message"
          canUndo={false}
          position="bottom-right"
        />
      );

      expect(screen.queryByRole('button', { name: /undo/i })).not.toBeInTheDocument();
    });

    it('should render close button when canClose is true', () => {
      render(
        <Toast
          isShowing={true}
          title="Notification"
          content="Message"
          canClose
          position="bottom-right"
        />
      );

      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('should not render close button when canClose is false', () => {
      render(
        <Toast
          isShowing={true}
          title="Notification"
          content="Message"
          canClose={false}
          position="bottom-right"
        />
      );

      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should have close button that can be clicked', () => {
      render(
        <Toast
          isShowing={true}
          title="Notification"
          content="Message"
          canClose
          position="bottom-right"
        />
      );

      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('should render both undo and close buttons when both are enabled', () => {
      render(
        <Toast
          isShowing={true}
          title="Item deleted"
          content="The item was removed"
          canUndo
          canClose
          position="bottom-right"
        />
      );

      expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });
  });

  describe('Duration and Auto-dismiss', () => {
    it('should accept custom duration prop', () => {
      render(
        <Toast
          isShowing={true}
          title="Auto dismiss"
          content="Will close in 3 seconds"
          duration={3000}
          position="bottom-right"
        />
      );

      expect(screen.getByText('Auto dismiss')).toBeInTheDocument();
    });

    it('should use default duration when not specified', () => {
      render(
        <Toast
          isShowing={true}
          title="Default"
          content="Default duration"
          position="bottom-right"
        />
      );

      expect(screen.getByText('Default')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on close button', () => {
      render(
        <Toast
          isShowing={true}
          title="Notification"
          content="Message"
          canClose
          position="bottom-right"
        />
      );

      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toHaveAttribute('aria-label', 'Close');
    });
  });

  describe('Edge Cases', () => {
    it('should render without setShowing callback', () => {
      render(
        <Toast isShowing={true} title="No callback" content="Message" position="bottom-right" />
      );

      expect(screen.getByText('No callback')).toBeInTheDocument();
    });

    it('should render with only title (no content)', () => {
      render(<Toast isShowing={true} title="Title only" position="bottom-right" />);

      expect(screen.getByText('Title only')).toBeInTheDocument();
    });

    it('should render with only content (no title)', () => {
      render(<Toast isShowing={true} content="Content only" position="bottom-right" />);

      expect(screen.getByText('Content only')).toBeInTheDocument();
    });
  });
});
