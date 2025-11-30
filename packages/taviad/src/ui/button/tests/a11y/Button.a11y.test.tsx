import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect, beforeAll } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../../theme/theme';
import { Button } from '../../components/Button';

// Extend Vitest matchers
beforeAll(() => {
  expect.extend(toHaveNoViolations);
});

// Helper to render with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Button Accessibility', () => {
  it('should have no accessibility violations (default)', async () => {
    const { container } = renderWithTheme(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (primary variant)', async () => {
    const { container } = renderWithTheme(<Button variant="primary">Primary</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (secondary variant)', async () => {
    const { container } = renderWithTheme(<Button variant="secondary">Secondary</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (tertiary variant)', async () => {
    const { container } = renderWithTheme(<Button variant="tertiary">Tertiary</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (danger variant)', async () => {
    const { container } = renderWithTheme(<Button variant="danger">Danger</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (disabled state)', async () => {
    const { container } = renderWithTheme(<Button disabled>Disabled</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (loading state)', async () => {
    const { container } = renderWithTheme(<Button isLoading>Loading</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (with icon)', async () => {
    const { container } = renderWithTheme(<Button icon={<span>🔥</span>}>With Icon</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes when disabled', async () => {
    const { container, getByRole } = renderWithTheme(<Button disabled>Disabled</Button>);
    const button = getByRole('button');
    expect(button).toHaveAttribute('disabled');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (loading button)', async () => {
    const { container } = renderWithTheme(<Button isLoading>Loading</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should maintain focus visibility', async () => {
    const { container } = renderWithTheme(<Button>Focus Test</Button>);
    const results = await axe(container, {
      rules: {
        'focus-order-semantics': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should have sufficient color contrast (primary)', async () => {
    const { container } = renderWithTheme(<Button variant="primary">Contrast Test</Button>);
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should have sufficient color contrast (danger)', async () => {
    const { container } = renderWithTheme(<Button variant="danger">Danger</Button>);
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard accessible', async () => {
    const { container } = renderWithTheme(<Button>Keyboard Test</Button>);
    const results = await axe(container, {
      rules: {
        'focus-order-semantics': { enabled: true },
        'button-name': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
