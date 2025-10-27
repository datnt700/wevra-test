/**
 * Unit tests for ClientProviders component
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock @tavia/taviad
vi.mock('@tavia/taviad', () => ({
  GlobalStyles: () => <style data-testid="global-styles" />,
}));

// Import after mocks
const { ClientProviders } = await import('../ClientProviders');

describe('ClientProviders', () => {
  it('should render children', () => {
    render(
      <ClientProviders>
        <div>Test Content</div>
      </ClientProviders>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render GlobalStyles component', () => {
    render(
      <ClientProviders>
        <div>Test</div>
      </ClientProviders>
    );

    expect(screen.getByTestId('global-styles')).toBeInTheDocument();
  });

  it('should render both GlobalStyles and children', () => {
    render(
      <ClientProviders>
        <div data-testid="child">Child Component</div>
      </ClientProviders>
    );

    expect(screen.getByTestId('global-styles')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
