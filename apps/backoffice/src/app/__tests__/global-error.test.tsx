/**
 * Unit tests for global error page
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

// Mock @tavia/taviad
vi.mock('@tavia/taviad', () => ({
  Button: ({
    children,
    onClick,
    variant,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
  }) => (
    <button data-variant={variant} onClick={onClick} {...props}>
      {children}
    </button>
  ),
  cssVars: {
    colorError: '#dc2626',
    colorErrorLight: '#fee2e2',
  },
  radii: {
    xl: '1rem',
  },
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'errors.globalError': {
        title: 'Critical Error',
        message: 'A critical error occurred in the application.',
      },
      'errors.error': {
        tryAgain: 'Try Again',
        goHome: 'Go Home',
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

// Import after mocks
const GlobalErrorPage = (await import('../global-error')).default;

describe('Global Error Page', () => {
  const mockReset = vi.fn();
  const mockError = new Error('Critical test error');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render error title', () => {
    render(<GlobalErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('Critical Error')).toBeInTheDocument();
  });

  it('should render error message', () => {
    render(<GlobalErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('A critical error occurred in the application.')).toBeInTheDocument();
  });

  it('should render try again button', () => {
    render(<GlobalErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should render go home button', () => {
    render(<GlobalErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('should call reset when try again button is clicked', async () => {
    render(<GlobalErrorPage error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByText('Try Again');
    await userEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('should log error to console on mount', () => {
    render(<GlobalErrorPage error={mockError} reset={mockReset} />);

    expect(console.error).toHaveBeenCalledWith('Global Application Error:', mockError);
  });

  it('should render html and body structure', () => {
    const { container } = render(<GlobalErrorPage error={mockError} reset={mockReset} />);

    // Check for container structure
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should navigate to home when go home button is clicked', async () => {
    // Mock window.location
    const mockLocation = { href: '' };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
      configurable: true,
    });

    render(<GlobalErrorPage error={mockError} reset={mockReset} />);

    const goHomeButton = screen.getByText('Go Home');
    await userEvent.click(goHomeButton);

    expect(mockLocation.href).toBe('/');
  });

  it('should render error icon SVG', () => {
    const { container } = render(<GlobalErrorPage error={mockError} reset={mockReset} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('should have correct button variants', () => {
    render(<GlobalErrorPage error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByText('Try Again');
    const goHomeButton = screen.getByText('Go Home');

    expect(tryAgainButton).toHaveAttribute('data-variant', 'primary');
    expect(goHomeButton).toHaveAttribute('data-variant', 'secondary');
  });

  it('should render with digest property', () => {
    const errorWithDigest = Object.assign(new Error('Test error'), { digest: 'abc123' });
    render(<GlobalErrorPage error={errorWithDigest} reset={mockReset} />);

    expect(screen.getByText('Critical Error')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith('Global Application Error:', errorWithDigest);
  });
});
