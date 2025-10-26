import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnalyticsDemoPage from '../page';

// Mock @tavia/analytics hooks
vi.mock('@tavia/analytics', () => ({
  useTrackClick: () => vi.fn(() => () => undefined),
  useTrack: () => vi.fn(),
  usePageView: vi.fn(),
  TrackClick: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('AnalyticsDemoPage', () => {
  describe('page structure', () => {
    it('should render page title', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('heading', { name: /Analytics Demo/, level: 1 })).toBeInTheDocument();
    });

    it('should render page description', () => {
      render(<AnalyticsDemoPage />);
      expect(
        screen.getByText(/Test the @tavia\/analytics SDK with various tracking methods/)
      ).toBeInTheDocument();
    });

    it('should render all section headings', () => {
      render(<AnalyticsDemoPage />);
      expect(
        screen.getByRole('heading', { name: /Hook-based Tracking/, level: 2 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /Component-based Tracking/, level: 2 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /Custom Event Tracking/, level: 2 })
      ).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Link Tracking/, level: 2 })).toBeInTheDocument();
    });

    it('should render info panel', () => {
      render(<AnalyticsDemoPage />);
      expect(
        screen.getByRole('heading', { name: /How to View Tracked Events/, level: 3 })
      ).toBeInTheDocument();
    });
  });

  describe('hook-based tracking section', () => {
    it('should render section description', () => {
      render(<AnalyticsDemoPage />);
      expect(
        screen.getByText(/Click these buttons to track events using the useTrackClick hook/)
      ).toBeInTheDocument();
    });

    it('should render primary CTA button', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('button', { name: 'Primary CTA' })).toBeInTheDocument();
    });

    it('should render secondary CTA button', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('button', { name: 'Secondary CTA' })).toBeInTheDocument();
    });

    it('should render delete action button', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('button', { name: 'Delete Action' })).toBeInTheDocument();
    });
  });

  describe('component-based tracking section', () => {
    it('should render section description', () => {
      render(<AnalyticsDemoPage />);
      expect(
        screen.getByText(/Click these buttons wrapped with the TrackClick component/)
      ).toBeInTheDocument();
    });

    it('should render sign up button', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    });

    it('should render login button', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('should render contact support button', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('button', { name: 'Contact Support' })).toBeInTheDocument();
    });
  });

  describe('custom event tracking section', () => {
    it('should render section description', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByText(/Track custom events with arbitrary data/)).toBeInTheDocument();
    });

    it('should display initial counter value of 0', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByText('Counter: 0')).toBeInTheDocument();
    });

    it('should render trigger custom event button', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('button', { name: 'Trigger Custom Event' })).toBeInTheDocument();
    });

    it('should increment counter when custom event button is clicked', async () => {
      const user = userEvent.setup();
      render(<AnalyticsDemoPage />);

      const button = screen.getByRole('button', { name: 'Trigger Custom Event' });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Counter: 1')).toBeInTheDocument();
      });
    });

    it('should increment counter multiple times', async () => {
      const user = userEvent.setup();
      render(<AnalyticsDemoPage />);

      const button = screen.getByRole('button', { name: 'Trigger Custom Event' });
      await user.click(button);
      await user.click(button);
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Counter: 3')).toBeInTheDocument();
      });
    });

    it('should render helper text', () => {
      render(<AnalyticsDemoPage />);
      expect(
        screen.getByText(/This tracks a custom event with counter value and timestamp/)
      ).toBeInTheDocument();
    });
  });

  describe('link tracking section', () => {
    it('should render section description', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByText(/Track clicks on navigation links/)).toBeInTheDocument();
    });

    it('should render home link', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('link', { name: 'Go to Home' })).toBeInTheDocument();
    });

    it('should render animations link', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('link', { name: 'View Animations' })).toBeInTheDocument();
    });

    it('should render GitHub external link', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('link', { name: /GitHub Repository/ })).toBeInTheDocument();
    });

    it('should have correct href for home link', () => {
      render(<AnalyticsDemoPage />);
      const link = screen.getByRole('link', { name: 'Go to Home' });
      expect(link).toHaveAttribute('href', '/');
    });

    it('should have correct href for animations link', () => {
      render(<AnalyticsDemoPage />);
      const link = screen.getByRole('link', { name: 'View Animations' });
      expect(link).toHaveAttribute('href', '/animations');
    });

    it('should have correct href for GitHub link', () => {
      render(<AnalyticsDemoPage />);
      const link = screen.getByRole('link', { name: /GitHub Repository/ });
      expect(link).toHaveAttribute('href', 'https://github.com/tavia-io/tavia');
    });

    it('should have target blank for external link', () => {
      render(<AnalyticsDemoPage />);
      const link = screen.getByRole('link', { name: /GitHub Repository/ });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('info panel section', () => {
    it('should render instructions list', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByText(/Open browser DevTools/)).toBeInTheDocument();
      expect(screen.getByText(/Go to Console tab/)).toBeInTheDocument();
      expect(screen.getByText(/Click any button or link above/)).toBeInTheDocument();
    });

    it('should render analytics log instruction', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByText(/logs showing captured events/)).toBeInTheDocument();
    });

    it('should render batching information', () => {
      render(<AnalyticsDemoPage />);
      expect(
        screen.getByText(/Events are batched and sent every 5 seconds or after 10 events/)
      ).toBeInTheDocument();
    });

    it('should render note about backend implementation', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByText(/Backend API endpoint/)).toBeInTheDocument();
      expect(screen.getByText(/is not yet implemented/)).toBeInTheDocument();
    });

    it('should render code element for analytics logs', () => {
      render(<AnalyticsDemoPage />);
      const codeElements = screen.getAllByText('[Analytics]');
      const firstElement = codeElements[0];
      if (firstElement) {
        expect(firstElement.tagName).toBe('CODE');
      }
    });

    it('should render code element for API endpoint', () => {
      render(<AnalyticsDemoPage />);
      const codeElement = screen.getByText('/api/analytics');
      expect(codeElement.tagName).toBe('CODE');
    });
  });

  describe('accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<AnalyticsDemoPage />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('should have all buttons enabled', () => {
      render(<AnalyticsDemoPage />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toBeEnabled();
      });
    });

    it('should have ordered list for instructions', () => {
      render(<AnalyticsDemoPage />);
      const list = screen.getByRole('list');
      expect(list.tagName).toBe('OL');
    });
  });

  describe('component displayName', () => {
    it('should have correct function name', () => {
      expect(AnalyticsDemoPage.name).toBe('AnalyticsDemoPage');
    });
  });
});
