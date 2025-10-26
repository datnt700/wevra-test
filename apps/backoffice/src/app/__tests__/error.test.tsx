/**
 * Unit tests for error page
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

// Mock @tavia/core - include cssVars and radii for styled components
vi.mock('@tavia/core', () => ({
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
      'errors.error': {
        title: 'Something went wrong!',
        message: 'We encountered an unexpected error.',
        tryAgain: 'Try Again',
        goHome: 'Go Home',
        detailsTitle: 'Error Details',
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

// Import after mocks
const ErrorPage = (await import('../error')).default;

describe('Error Page', () => {
  const mockReset = vi.fn();
  const mockError = new Error('Test error message');

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to avoid noise in test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render error title', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('should render error message', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('We encountered an unexpected error.')).toBeInTheDocument();
  });

  it('should render try again button', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should render go home button', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('should call reset when try again button is clicked', async () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByText('Try Again');
    await userEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('should log error to console on mount', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    expect(console.error).toHaveBeenCalledWith('Application Error:', mockError);
  });

  it('should render error SVG icon', () => {
    const { container } = render(<ErrorPage error={mockError} reset={mockReset} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have primary variant on try again button', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByText('Try Again');
    expect(tryAgainButton).toHaveAttribute('data-variant', 'primary');
  });

  it('should have secondary variant on go home button', () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    const goHomeButton = screen.getByText('Go Home');
    expect(goHomeButton).toHaveAttribute('data-variant', 'secondary');
  });
});
