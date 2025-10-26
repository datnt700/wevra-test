/**
 * Unit tests for AnalyticsProvider component
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock @tavia/analytics
vi.mock('@tavia/analytics', () => ({
  AnalyticsProvider: ({
    children,
    config,
  }: {
    children: React.ReactNode;
    config: Record<string, unknown>;
  }) => (
    <div data-testid="analytics-provider" data-config={JSON.stringify(config)}>
      {children}
    </div>
  ),
}));

// Import after mocks
const { AnalyticsProvider } = await import('../AnalyticsProvider');

describe('AnalyticsProvider', () => {
  it('should render children', () => {
    render(
      <AnalyticsProvider>
        <div>Test Content</div>
      </AnalyticsProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should pass correct config to TaviaAnalyticsProvider', () => {
    render(
      <AnalyticsProvider>
        <div>Test</div>
      </AnalyticsProvider>
    );

    const provider = screen.getByTestId('analytics-provider');
    const config = JSON.parse(provider.getAttribute('data-config') || '{}');

    expect(config).toEqual({
      endpoint: '/api/analytics',
      debug: process.env.NODE_ENV === 'development',
      batchSize: 10,
      flushInterval: 5000,
    });
  });

  it('should set debug to true in development mode', () => {
    // Mock NODE_ENV using vi.stubEnv
    vi.stubEnv('NODE_ENV', 'development');

    render(
      <AnalyticsProvider>
        <div>Test</div>
      </AnalyticsProvider>
    );

    const provider = screen.getByTestId('analytics-provider');
    const config = JSON.parse(provider.getAttribute('data-config') || '{}');

    expect(config.debug).toBe(true);

    vi.unstubAllEnvs();
  });

  it('should set debug to false in production mode', () => {
    // Mock NODE_ENV using vi.stubEnv
    vi.stubEnv('NODE_ENV', 'production');

    render(
      <AnalyticsProvider>
        <div>Test</div>
      </AnalyticsProvider>
    );

    const provider = screen.getByTestId('analytics-provider');
    const config = JSON.parse(provider.getAttribute('data-config') || '{}');

    expect(config.debug).toBe(false);

    vi.unstubAllEnvs();
  });
});
