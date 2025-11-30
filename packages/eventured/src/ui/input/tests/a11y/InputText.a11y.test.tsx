import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect, beforeAll } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../../theme/theme';
import { InputText } from '../../components/InputText';

// Extend Vitest matchers
beforeAll(() => {
  expect.extend(toHaveNoViolations);
});

// Helper to render with theme
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('InputText Accessibility', () => {
  it('should have no accessibility violations (default)', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="username">Username</label>
        <InputText id="username" placeholder="Enter username" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (required field)', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="email">Email</label>
        <InputText id="email" required placeholder="Enter email" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (with error)', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="password">Password</label>
        <InputText
          id="password"
          errorMessage="Password is required"
          placeholder="Enter password"
          aria-invalid="true"
        />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (disabled)', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="disabled">Disabled Input</label>
        <InputText id="disabled" isDisabled placeholder="Disabled" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations (with helper text)', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="description">Description</label>
        <InputText id="description" placeholder="Description" aria-describedby="helper-desc" />
        <span id="helper-desc">Enter a brief description</span>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper label association', async () => {
    const { getByLabelText } = renderWithTheme(
      <div>
        <label htmlFor="fullname">Full Name</label>
        <InputText id="fullname" placeholder="Enter your name" />
      </div>
    );
    const input = getByLabelText('Full Name');
    expect(input).toBeTruthy();
  });

  it('should have proper ARIA attributes for errors', async () => {
    const { container, getByRole } = renderWithTheme(
      <div>
        <label htmlFor="email-error">Email</label>
        <InputText
          id="email-error"
          errorMessage="Invalid email format"
          aria-invalid="true"
          aria-describedby="error-email"
        />
      </div>
    );
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes for required fields', async () => {
    const { container, getByRole } = renderWithTheme(
      <div>
        <label htmlFor="required">Required Field</label>
        <InputText id="required" required aria-required="true" />
      </div>
    );
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('aria-required', 'true');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes for helper text', async () => {
    const { container, getByRole } = renderWithTheme(
      <div>
        <label htmlFor="username-help">Username</label>
        <InputText id="username-help" aria-describedby="helper-username" />
        <span id="helper-username">Must be at least 3 characters</span>
      </div>
    );
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should maintain color contrast (normal state)', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="contrast">Contrast Test</label>
        <InputText id="contrast" />
      </div>
    );
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should maintain color contrast (error state)', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="error-test">Error Test</label>
        <InputText id="error-test" errorMessage="This field has an error" />
      </div>
    );
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard accessible', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="keyboard">Keyboard Test</label>
        <InputText id="keyboard" />
      </div>
    );
    const results = await axe(container, {
      rules: {
        'focus-order-semantics': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should have accessible placeholder', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="search">Search</label>
        <InputText id="search" placeholder="Search for items..." />
      </div>
    );
    const results = await axe(container, {
      rules: {
        'label-title-only': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });

  it('should handle different input types', async () => {
    const { container } = renderWithTheme(
      <div>
        <label htmlFor="email-type">Email</label>
        <InputText id="email-type" type="email" placeholder="email@example.com" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
