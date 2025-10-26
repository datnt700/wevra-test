/**
 * Unit tests for loading page
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock @tavia/core
vi.mock('@tavia/core', () => ({
  Spinner: ({ size }: { size?: string }) => (
    <div data-testid="spinner" data-size={size}>
      Loading spinner
    </div>
  ),
  cssVars: {
    mainColor: '#3b82f6',
  },
  radii: {
    xl: '1rem',
  },
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'errors.loading': {
        title: 'Loading...',
        message: 'Please wait while we prepare your content',
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

// Import after mocks
const LoadingPage = (await import('../loading')).default;

describe('Loading Page', () => {
  it('should render loading title', () => {
    render(<LoadingPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render loading message', () => {
    render(<LoadingPage />);
    expect(screen.getByText('Please wait while we prepare your content')).toBeInTheDocument();
  });

  it('should render spinner component', () => {
    render(<LoadingPage />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should render spinner with large size', () => {
    render(<LoadingPage />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveAttribute('data-size', 'lg');
  });

  it('should render container structure', () => {
    const { container } = render(<LoadingPage />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
