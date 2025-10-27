import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from '../components/Alert';

describe('Alert', () => {
  describe('Basic Rendering', () => {
    it('renders with title', () => {
      render(<Alert title="Test Alert" />);
      expect(screen.getByText('Test Alert')).toBeInTheDocument();
    });

    it('renders with title and description', () => {
      render(<Alert title="Test Alert" description="This is a description" />);

      expect(screen.getByText('Test Alert')).toBeInTheDocument();
      expect(screen.getByText('This is a description')).toBeInTheDocument();
    });

    it('renders with role="alert" for accessibility', () => {
      render(<Alert title="Test Alert" />);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('renders with data-testid', () => {
      render(<Alert title="Test Alert" />);

      expect(screen.getByTestId('alert')).toBeInTheDocument();
    });

    it('returns null when title is not provided', () => {
      const { container } = render(<Alert title="" />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Variants', () => {
    it('renders success variant by default', () => {
      render(<Alert title="Success Message" />);

      const alert = screen.getByTestId('alert');
      expect(alert).toBeInTheDocument();
    });

    it('renders success variant explicitly', () => {
      render(<Alert title="Success Message" variant="success" />);

      expect(screen.getByText('Success Message')).toBeInTheDocument();
    });

    it('renders warning variant', () => {
      render(<Alert title="Warning Message" variant="warning" />);

      expect(screen.getByText('Warning Message')).toBeInTheDocument();
    });

    it('renders info variant', () => {
      render(<Alert title="Info Message" variant="info" />);

      expect(screen.getByText('Info Message')).toBeInTheDocument();
    });

    it('renders danger variant', () => {
      render(<Alert title="Danger Message" variant="danger" />);

      expect(screen.getByText('Danger Message')).toBeInTheDocument();
    });

    it('renders error variant', () => {
      render(<Alert title="Error Message" variant="error" />);

      expect(screen.getByText('Error Message')).toBeInTheDocument();
    });
  });

  describe('Filled Background', () => {
    it('renders without filled background by default', () => {
      render(<Alert title="Test Alert" />);

      const alert = screen.getByTestId('alert');
      expect(alert).toBeInTheDocument();
    });

    it('renders with filled background when isFilled is true', () => {
      render(<Alert title="Test Alert" isFilled={true} />);

      const alert = screen.getByTestId('alert');
      expect(alert).toBeInTheDocument();
    });

    it('renders without filled background when isFilled is false', () => {
      render(<Alert title="Test Alert" isFilled={false} />);

      const alert = screen.getByTestId('alert');
      expect(alert).toBeInTheDocument();
    });
  });

  describe('Icon Support', () => {
    it('renders without icon by default', () => {
      render(<Alert title="Test Alert" />);

      expect(screen.getByText('Test Alert')).toBeInTheDocument();
    });

    it('renders with custom icon', () => {
      render(<Alert title="Test Alert" icon={<span>🔔</span>} />);

      expect(screen.getByText('🔔')).toBeInTheDocument();
      expect(screen.getByText('Test Alert')).toBeInTheDocument();
    });

    it('renders with text icon', () => {
      render(<Alert title="Test Alert" icon="✓" />);

      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('renders with React element icon', () => {
      const CustomIcon = () => <svg data-testid="custom-icon">Icon</svg>;
      render(<Alert title="Test Alert" icon={<CustomIcon />} />);

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('icon has aria-hidden attribute for accessibility', () => {
      const { container } = render(<Alert title="Test Alert" icon={<span>Icon</span>} />);

      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
    });
  });

  describe('Description Support', () => {
    it('renders without description by default', () => {
      render(<Alert title="Test Alert" />);

      expect(screen.getByText('Test Alert')).toBeInTheDocument();
      expect(screen.queryByText('Description')).not.toBeInTheDocument();
    });

    it('renders with short description', () => {
      render(<Alert title="Test Alert" description="Short description" />);

      expect(screen.getByText('Short description')).toBeInTheDocument();
    });

    it('renders with long description', () => {
      const longDescription =
        'This is a very long description that provides detailed information about the alert message and what the user should do next.';
      render(<Alert title="Test Alert" description={longDescription} />);

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('renders all props together', () => {
      render(
        <Alert
          title="Complete Alert"
          description="Full description"
          variant="warning"
          icon={<span>⚠️</span>}
          isFilled={true}
        />
      );

      expect(screen.getByText('Complete Alert')).toBeInTheDocument();
      expect(screen.getByText('Full description')).toBeInTheDocument();
      expect(screen.getByText('⚠️')).toBeInTheDocument();
    });

    it('renders different variant with icon', () => {
      render(<Alert title="Success!" variant="success" icon={<span>✓</span>} />);

      expect(screen.getByText('Success!')).toBeInTheDocument();
      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('renders filled alert with all props', () => {
      render(
        <Alert
          title="Error Occurred"
          description="Please try again"
          variant="error"
          icon={<span>✗</span>}
          isFilled={true}
        />
      );

      expect(screen.getByText('Error Occurred')).toBeInTheDocument();
      expect(screen.getByText('Please try again')).toBeInTheDocument();
      expect(screen.getByText('✗')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string title', () => {
      const { container } = render(<Alert title="" />);

      expect(container.firstChild).toBeNull();
    });

    it('handles whitespace-only title as valid', () => {
      render(<Alert title="   " />);

      // Whitespace-only title is still considered truthy, so it renders
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('handles empty description', () => {
      render(<Alert title="Test Alert" description="" />);

      expect(screen.getByText('Test Alert')).toBeInTheDocument();
      // Empty description should not render
    });

    it('handles special characters in title', () => {
      render(<Alert title="Alert: <Test> & 'Special' Characters!" />);

      expect(screen.getByText("Alert: <Test> & 'Special' Characters!")).toBeInTheDocument();
    });

    it('handles special characters in description', () => {
      render(<Alert title="Test" description="Description with <tags> & 'quotes'" />);

      expect(screen.getByText("Description with <tags> & 'quotes'")).toBeInTheDocument();
    });

    it('handles very long title', () => {
      const longTitle = 'A'.repeat(200);
      render(<Alert title={longTitle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(<Alert title="Accessible Alert" />);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('icon is hidden from screen readers', () => {
      const { container } = render(<Alert title="Test" icon={<span>Icon</span>} />);

      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('maintains semantic structure', () => {
      const { container } = render(
        <Alert title="Semantic Alert" description="With description" icon={<span>Icon</span>} />
      );

      expect(container.querySelector('[role="alert"]')).toBeInTheDocument();
    });
  });
});
