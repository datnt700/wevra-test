import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnimationsPage from '../page';

// Mock framer-motion to avoid animation complexities in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
}));

describe('AnimationsPage', () => {
  describe('page structure', () => {
    it('should render page title', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Animation Examples', level: 1 })
      ).toBeInTheDocument();
    });

    it('should render page description', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByText('Demonstrating both Emotion and Framer Motion animations')
      ).toBeInTheDocument();
    });

    it('should render both sections', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Emotion (CSS-based) Animations', level: 2 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Framer Motion (Interactive) Animations', level: 2 })
      ).toBeInTheDocument();
    });

    it('should render footer', () => {
      render(<AnimationsPage />);
      expect(screen.getByText(/See/)).toBeInTheDocument();
    });

    it('should render Framer Motion docs link', () => {
      render(<AnimationsPage />);
      const link = screen.getByRole('link', { name: /Framer Motion docs/ });
      expect(link).toHaveAttribute('href', 'https://www.framer.com/motion/');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Emotion animations section', () => {
    it('should render fade in animation section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Fade In Animation', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render fade in card', () => {
      render(<AnimationsPage />);
      expect(screen.getByRole('heading', { name: 'Fade In Card', level: 4 })).toBeInTheDocument();
      expect(
        screen.getByText('This card fades in when the page loads using Emotion keyframes.')
      ).toBeInTheDocument();
    });

    it('should render hover transitions section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Hover Transitions', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render three hover buttons', () => {
      render(<AnimationsPage />);
      expect(screen.getByRole('button', { name: 'Hover Me' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Try Me' })).toBeInTheDocument();
    });

    it('should render staggered slide in section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Staggered Slide In', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render three slide in cards with delays', () => {
      render(<AnimationsPage />);
      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('- Slides in immediately')).toBeInTheDocument();
      expect(screen.getByText('Card 2')).toBeInTheDocument();
      expect(screen.getByText('- Slides in after 100ms')).toBeInTheDocument();
      expect(screen.getByText('Card 3')).toBeInTheDocument();
      expect(screen.getByText('- Slides in after 200ms')).toBeInTheDocument();
    });

    it('should render loading animations section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Loading Animations', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render spinner label', () => {
      render(<AnimationsPage />);
      expect(screen.getByText('Spinner:')).toBeInTheDocument();
    });

    it('should render shimmer label', () => {
      render(<AnimationsPage />);
      expect(screen.getByText('Shimmer (Skeleton):')).toBeInTheDocument();
    });

    it('should render pulse animation section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Pulse Animation', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render pulse box content', () => {
      render(<AnimationsPage />);
      expect(screen.getByText('Pulsing Box')).toBeInTheDocument();
      expect(screen.getByText('This box pulses to draw attention')).toBeInTheDocument();
    });
  });

  describe('Framer Motion section', () => {
    it('should render fade & slide in section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Fade & Slide In', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render smooth entrance card', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Smooth Entrance', level: 4 })
      ).toBeInTheDocument();
      expect(
        screen.getByText('Animated with Framer Motion initial/animate props')
      ).toBeInTheDocument();
    });

    it('should render interactive gestures section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Interactive Gestures', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render gesture buttons', () => {
      render(<AnimationsPage />);
      expect(screen.getByRole('button', { name: 'Hover & Click' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Rotate On Tap' })).toBeInTheDocument();
    });

    it('should render animated counter section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Animated Counter', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render animated visibility toggle section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Animated Visibility Toggle', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render stagger animation section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Stagger Animation', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render four feature items', () => {
      render(<AnimationsPage />);
      expect(screen.getByText('✓ Feature 1')).toBeInTheDocument();
      expect(screen.getByText('✓ Feature 2')).toBeInTheDocument();
      expect(screen.getByText('✓ Feature 3')).toBeInTheDocument();
      expect(screen.getByText('✓ Feature 4')).toBeInTheDocument();
    });

    it('should render draggable element section', () => {
      render(<AnimationsPage />);
      expect(
        screen.getByRole('heading', { name: 'Draggable Element', level: 3 })
      ).toBeInTheDocument();
    });

    it('should render draggable box content', () => {
      render(<AnimationsPage />);
      expect(screen.getByText('Drag Me!')).toBeInTheDocument();
      expect(screen.getByText('You can drag this box around')).toBeInTheDocument();
    });
  });

  describe('counter functionality', () => {
    it('should display initial count of 0', () => {
      render(<AnimationsPage />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should increment counter when increment button is clicked', async () => {
      const user = userEvent.setup();
      render(<AnimationsPage />);

      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      await user.click(incrementButton);

      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument();
      });
    });

    it('should increment counter multiple times', async () => {
      const user = userEvent.setup();
      render(<AnimationsPage />);

      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      await user.click(incrementButton);
      await user.click(incrementButton);
      await user.click(incrementButton);

      await waitFor(() => {
        expect(screen.getByText('3')).toBeInTheDocument();
      });
    });

    it('should reset counter to 0 when reset button is clicked', async () => {
      const user = userEvent.setup();
      render(<AnimationsPage />);

      // Increment first
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      await user.click(incrementButton);
      await user.click(incrementButton);

      // Then reset
      const resetButton = screen.getByRole('button', { name: 'Reset' });
      await user.click(resetButton);

      await waitFor(() => {
        expect(screen.getByText('0')).toBeInTheDocument();
      });
    });

    it('should render increment button', () => {
      render(<AnimationsPage />);
      expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
    });

    it('should render reset button', () => {
      render(<AnimationsPage />);
      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    });
  });

  describe('visibility toggle functionality', () => {
    it('should show box initially', () => {
      render(<AnimationsPage />);
      expect(screen.getByRole('heading', { name: 'Animated Box', level: 4 })).toBeInTheDocument();
      expect(screen.getByText('This box animates in and out smoothly!')).toBeInTheDocument();
    });

    it('should render hide button initially', () => {
      render(<AnimationsPage />);
      expect(screen.getByRole('button', { name: /Hide/ })).toBeInTheDocument();
    });

    it('should hide box when hide button is clicked', async () => {
      const user = userEvent.setup();
      render(<AnimationsPage />);

      const toggleButton = screen.getByRole('button', { name: /Hide/ });
      await user.click(toggleButton);

      await waitFor(() => {
        expect(screen.queryByRole('heading', { name: 'Animated Box' })).not.toBeInTheDocument();
      });
    });

    it('should change button text to Show when box is hidden', async () => {
      const user = userEvent.setup();
      render(<AnimationsPage />);

      const toggleButton = screen.getByRole('button', { name: /Hide/ });
      await user.click(toggleButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Show/ })).toBeInTheDocument();
      });
    });

    it('should show box again when show button is clicked', async () => {
      const user = userEvent.setup();
      render(<AnimationsPage />);

      // Hide first
      const hideButton = screen.getByRole('button', { name: /Hide/ });
      await user.click(hideButton);

      await waitFor(() => {
        expect(screen.queryByRole('heading', { name: 'Animated Box' })).not.toBeInTheDocument();
      });

      // Then show
      const showButton = screen.getByRole('button', { name: /Show/ });
      await user.click(showButton);

      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Animated Box', level: 4 })).toBeInTheDocument();
      });
    });

    it('should toggle visibility multiple times', async () => {
      const user = userEvent.setup();
      render(<AnimationsPage />);

      const toggleButton = screen.getByRole('button', { name: /Hide/ });

      // Hide
      await user.click(toggleButton);
      await waitFor(() => {
        expect(screen.queryByRole('heading', { name: 'Animated Box' })).not.toBeInTheDocument();
      });

      // Show
      await user.click(screen.getByRole('button', { name: /Show/ }));
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Animated Box' })).toBeInTheDocument();
      });

      // Hide again
      await user.click(screen.getByRole('button', { name: /Hide/ }));
      await waitFor(() => {
        expect(screen.queryByRole('heading', { name: 'Animated Box' })).not.toBeInTheDocument();
      });
    });
  });

  describe('styled components', () => {
    it('should render emotion card', () => {
      const { container } = render(<AnimationsPage />);
      expect(container.querySelector('h4')).toHaveTextContent('Fade In Card');
    });

    it('should render emotion buttons', () => {
      render(<AnimationsPage />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should render slide in cards', () => {
      render(<AnimationsPage />);
      expect(screen.getByText(/Card 1/)).toBeInTheDocument();
      expect(screen.getByText(/Card 2/)).toBeInTheDocument();
      expect(screen.getByText(/Card 3/)).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<AnimationsPage />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
      expect(screen.getAllByRole('heading', { level: 3 }).length).toBeGreaterThan(0);
    });

    it('should have interactive buttons', () => {
      render(<AnimationsPage />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeEnabled();
      });
    });

    it('should have external link with proper rel attribute', () => {
      render(<AnimationsPage />);
      const link = screen.getByRole('link', { name: /Framer Motion docs/ });
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('component displayName', () => {
    it('should have correct function name', () => {
      expect(AnimationsPage.name).toBe('AnimationsPage');
    });
  });
});
