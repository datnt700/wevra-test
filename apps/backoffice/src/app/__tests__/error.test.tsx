/**
 * Unit tests for error page
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

// Mock @tavia/taviad - include cssVars and radii for styled components
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

  it('should navigate to home when go home button is clicked', async () => {
    // Mock window.location
    const mockLocation = { href: '' };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
      configurable: true,
    });

    render(<ErrorPage error={mockError} reset={mockReset} />);

    const goHomeButton = screen.getByText('Go Home');
    await userEvent.click(goHomeButton);

    expect(mockLocation.href).toBe('/');
  });

  describe('development mode', () => {
    beforeEach(() => {
      vi.stubEnv('NODE_ENV', 'development');
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it('should render error details in development mode', () => {
      render(<ErrorPage error={mockError} reset={mockReset} />);

      expect(screen.getByText('Error Details')).toBeInTheDocument();
    });

    it('should display error message in details', () => {
      render(<ErrorPage error={mockError} reset={mockReset} />);

      expect(screen.getByText(/Test error message/)).toBeInTheDocument();
    });

    it('should display error digest when present', () => {
      const errorWithDigest = new Error('Test error');
      (errorWithDigest as Error & { digest?: string }).digest = 'abc123';

      render(<ErrorPage error={errorWithDigest} reset={mockReset} />);

      expect(screen.getByText(/Digest: abc123/)).toBeInTheDocument();
    });

    it('should display stack trace when present', () => {
      const errorWithStack = new Error('Test error');
      errorWithStack.stack = 'Error: Test error\n  at line 1\n  at line 2';

      render(<ErrorPage error={errorWithStack} reset={mockReset} />);

      expect(screen.getByText(/Stack:/)).toBeInTheDocument();
    });

    it('should display error without digest', () => {
      const errorWithoutDigest = new Error('Test error without digest');
      delete (errorWithoutDigest as Error & { digest?: string }).digest;

      render(<ErrorPage error={errorWithoutDigest} reset={mockReset} />);

      // The error message should be shown, but not the digest
      expect(screen.getByText(/Test error without digest/)).toBeInTheDocument();
      expect(screen.queryByText(/Digest:/)).not.toBeInTheDocument();
    });

    it('should display error without stack trace', () => {
      const errorWithoutStack = new Error('Test error without stack');
      delete errorWithoutStack.stack;

      render(<ErrorPage error={errorWithoutStack} reset={mockReset} />);

      // The error message should be shown, but not the stack
      expect(screen.getByText(/Test error without stack/)).toBeInTheDocument();
      expect(screen.queryByText(/Stack:/)).not.toBeInTheDocument();
    });
  });

  describe('production mode', () => {
    beforeEach(() => {
      vi.stubEnv('NODE_ENV', 'production');
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it('should not render error details in production mode', () => {
      render(<ErrorPage error={mockError} reset={mockReset} />);

      expect(screen.queryByText('Error Details')).not.toBeInTheDocument();
    });

    it('should not display error message in production mode', () => {
      const { container } = render(<ErrorPage error={mockError} reset={mockReset} />);
      const errorCode = container.querySelector('code');

      expect(errorCode).not.toBeInTheDocument();
    });
  });
});
