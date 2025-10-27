/**
 * Unit tests for not-found page
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock @tavia/taviad
vi.mock('@tavia/taviad', () => ({
  Button: ({ children, variant, ...props }: { children: React.ReactNode; variant?: string }) => (
    <button data-variant={variant} {...props}>
      {children}
    </button>
  ),
  cssVars: {
    gray600: '#475569',
    mainColor: '#3b82f6',
  },
  radii: {
    xl: '1rem',
  },
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'errors.notFoundPage': {
        title: 'Page Not Found',
        message: "Sorry, we couldn't find the page you're looking for.",
        goHomepage: 'Go to Homepage',
        goDashboard: 'Go to Dashboard',
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

// Import after mocks
const NotFoundPage = (await import('../not-found')).default;

describe('Not Found Page', () => {
  it('should render 404 title', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should render not found message', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText("Sorry, we couldn't find the page you're looking for.")
    ).toBeInTheDocument();
  });

  it('should render 404 icon', () => {
    const { container } = render(<NotFoundPage />);
    expect(container.textContent).toContain('404');
  });

  it('should render go to homepage button', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Go to Homepage')).toBeInTheDocument();
  });

  it('should render go to dashboard button', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
  });

  it('should have link to homepage', () => {
    render(<NotFoundPage />);

    const homeButton = screen.getByText('Go to Homepage');
    const homeLink = homeButton.closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should have link to dashboard', () => {
    render(<NotFoundPage />);

    const dashboardButton = screen.getByText('Go to Dashboard');
    const dashboardLink = dashboardButton.closest('a');
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });

  it('should have primary variant on homepage button', () => {
    render(<NotFoundPage />);

    const homeButton = screen.getByText('Go to Homepage');
    expect(homeButton).toHaveAttribute('data-variant', 'primary');
  });

  it('should have secondary variant on dashboard button', () => {
    render(<NotFoundPage />);

    const dashboardButton = screen.getByText('Go to Dashboard');
    expect(dashboardButton).toHaveAttribute('data-variant', 'secondary');
  });
});
