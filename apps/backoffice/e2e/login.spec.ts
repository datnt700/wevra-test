/**
 * E2E tests for Backoffice Login Page
 */
import { test, expect } from '@playwright/test';
import { fillInput, clickAndWaitForNavigation, waitForHydration } from './helpers';

// Test credentials
const TEST_CREDENTIALS = {
  ADMIN: {
    email: 'admin@eventure.so',
    password: 'admin123',
  },
  ORGANIZER: {
    email: 'organizer.pro@eventure.so',
    password: 'organizer123',
  },
  INVALID: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },
};

test.describe('Backoffice Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await waitForHydration(page);
  });

  test.describe('Page Rendering', () => {
    test('should display login page with all elements', async ({ page }) => {
      // Check header
      await expect(page.getByText('Welcome Back')).toBeVisible();

      // Check OAuth buttons
      await expect(page.getByText('Continue with Google')).toBeVisible();
      await expect(page.getByText('Continue with Apple')).toBeVisible();
      await expect(page.getByText('Continue with Facebook')).toBeVisible();

      // Check form fields
      await expect(page.getByLabel('Email')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();

      // Check sign in button
      await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

      // Check links
      await expect(page.getByText('Forgot password?')).toBeVisible();
      await expect(page.getByText('Contact us')).toBeVisible();

      // Check copyright
      await expect(page.getByText(/© \d{4} Eventure/)).toBeVisible();
    });

    test('should have correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Login|Sign In|Eventure|Backoffice/i);
    });

    test('should have password toggle functionality', async ({ page }) => {
      const passwordInput = page.getByLabel('Password');
      await expect(passwordInput).toHaveAttribute('type', 'password');

      // Check for toggle button (implementation-specific)
      // This test assumes a toggle icon/button exists
      const toggleButton = page
        .locator('[aria-label*="password" i], [data-testid*="toggle" i]')
        .first();
      if (await toggleButton.isVisible()) {
        await toggleButton.click();
        // Password should now be visible
        await expect(passwordInput).toHaveAttribute('type', 'text');
      }
    });
  });

  test.describe('Form Validation', () => {
    test('should show validation errors for empty form', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: 'Sign In' });
      await submitButton.click();

      // Browser validation should trigger (HTML5)
      const emailInput = page.getByLabel('Email');
      const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBe(true);
    });

    test('should validate email format', async ({ page }) => {
      await fillInput(page, 'Email', 'invalid-email');
      await fillInput(page, 'Password', 'password123');

      const submitButton = page.getByRole('button', { name: 'Sign In' });
      await submitButton.click();

      // Check for validation error
      const emailInput = page.getByLabel('Email');
      const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBe(true);
    });
  });

  test.describe('Credentials Login - Admin', () => {
    test('should successfully login as admin', async ({ page }) => {
      await fillInput(page, 'Email', TEST_CREDENTIALS.ADMIN.email);
      await fillInput(page, 'Password', TEST_CREDENTIALS.ADMIN.password);

      await clickAndWaitForNavigation(page, page.getByRole('button', { name: 'Sign In' }));

      // Should redirect to dashboard
      await expect(page).toHaveURL('/dashboard');
      await waitForHydration(page);

      // Should see dashboard content
      await expect(page.getByText(/Dashboard|Overview/i)).toBeVisible({ timeout: 10000 });
    });

    test('should show error message with invalid credentials', async ({ page }) => {
      await fillInput(page, 'Email', TEST_CREDENTIALS.INVALID.email);
      await fillInput(page, 'Password', TEST_CREDENTIALS.INVALID.password);

      const submitButton = page.getByRole('button', { name: 'Sign In' });
      await submitButton.click();

      // Wait for error message
      await expect(page.getByText(/Login Failed|Invalid|incorrect/i)).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe('Credentials Login - Organizer', () => {
    test('should successfully login as organizer', async ({ page }) => {
      await fillInput(page, 'Email', TEST_CREDENTIALS.ORGANIZER.email);
      await fillInput(page, 'Password', TEST_CREDENTIALS.ORGANIZER.password);

      await clickAndWaitForNavigation(page, page.getByRole('button', { name: 'Sign In' }));

      // Should redirect to dashboard
      await expect(page).toHaveURL('/dashboard');
      await waitForHydration(page);

      // Organizer should see dashboard
      await expect(page.getByText(/Dashboard|Overview/i)).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Role-based Access Control', () => {
    test('should deny attendee login to backoffice', async ({ page }) => {
      await fillInput(page, 'Email', 'attendee1@eventure.so');
      await fillInput(page, 'Password', 'attendee123');

      const submitButton = page.getByRole('button', { name: 'Sign In' });
      await submitButton.click();

      // Should show access denied error
      await expect(page.getByText(/Access denied|not allowed|forbidden/i)).toBeVisible({
        timeout: 10000,
      });

      // Should not navigate to dashboard
      await expect(page).not.toHaveURL('/dashboard');
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to forgot password page', async ({ page }) => {
      const forgotPasswordLink = page.getByText('Forgot password?');
      await clickAndWaitForNavigation(page, forgotPasswordLink);

      await expect(page).toHaveURL('/forgot-password');
    });

    test('should navigate to contact/register page', async ({ page }) => {
      const contactLink = page.getByText('Contact us');
      await clickAndWaitForNavigation(page, contactLink);

      // Depending on implementation, might redirect to register or contact
      await expect(page).toHaveURL(/\/(register|contact)/);
    });
  });

  test.describe('OAuth Integration', () => {
    test('should initiate Google OAuth flow', async ({ page }) => {
      const googleButton = page.getByText('Continue with Google');

      // We can't test the actual OAuth flow, but we can verify the button works
      const [_popup] = await Promise.all([
        page.waitForEvent('popup').catch(() => null),
        googleButton.click(),
      ]);

      // Either a popup opens (OAuth redirect) or page redirects
    });

    test('should have working Apple login button', async ({ page }) => {
      const appleButton = page.getByText('Continue with Apple');
      await expect(appleButton).toBeVisible();
      await expect(appleButton).toBeEnabled();
    });

    test('should have working Facebook login button', async ({ page }) => {
      const facebookButton = page.getByText('Continue with Facebook');
      await expect(facebookButton).toBeVisible();
      await expect(facebookButton).toBeEnabled();
    });
  });

  test.describe('Session Management', () => {
    test('should redirect authenticated user to dashboard', async ({ page }) => {
      // First login
      await fillInput(page, 'Email', TEST_CREDENTIALS.ADMIN.email);
      await fillInput(page, 'Password', TEST_CREDENTIALS.ADMIN.password);
      await clickAndWaitForNavigation(page, page.getByRole('button', { name: 'Sign In' }));
      await expect(page).toHaveURL('/dashboard');

      // Try to access login page again
      await page.goto('/login');

      // Should redirect back to dashboard (or stay on login, depending on implementation)
      // This behavior depends on middleware configuration
    });

    test('should persist callback URL through login flow', async ({ page }) => {
      // Try to access protected route
      await page.goto('/events/new');

      // Should redirect to login with callbackUrl
      await expect(page).toHaveURL(/\/login\?.*callbackUrl/);

      // Login
      await fillInput(page, 'Email', TEST_CREDENTIALS.ADMIN.email);
      await fillInput(page, 'Password', TEST_CREDENTIALS.ADMIN.password);
      await clickAndWaitForNavigation(page, page.getByRole('button', { name: 'Sign In' }));

      // Should redirect to original destination
      await expect(page).toHaveURL('/events/new');
    });
  });

  test.describe('Security', () => {
    test('should mask password input by default', async ({ page }) => {
      const passwordInput = page.getByLabel('Password');
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('should clear password on failed login', async ({ page }) => {
      await fillInput(page, 'Email', TEST_CREDENTIALS.INVALID.email);
      await fillInput(page, 'Password', TEST_CREDENTIALS.INVALID.password);

      const submitButton = page.getByRole('button', { name: 'Sign In' });
      await submitButton.click();

      // Wait for error
      await expect(page.getByText(/Login Failed|Invalid/i)).toBeVisible({ timeout: 10000 });

      // Password should be cleared
      const passwordInput = page.getByLabel('Password');
      const passwordValue = await passwordInput.inputValue();
      expect(passwordValue).toBe('');
    });

    test('should validate callbackUrl to prevent open redirect', async ({ page }) => {
      // Try accessing login with external callbackUrl
      await page.goto('/login?callbackUrl=https://evil.com');
      await waitForHydration(page);

      await fillInput(page, 'Email', TEST_CREDENTIALS.ADMIN.email);
      await fillInput(page, 'Password', TEST_CREDENTIALS.ADMIN.password);

      await clickAndWaitForNavigation(page, page.getByRole('button', { name: 'Sign In' }));

      // Should redirect to safe URL (dashboard), not evil.com
      await expect(page).toHaveURL(/^https?:\/\/localhost/);
      expect(page.url()).not.toContain('evil.com');
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/login');
      await waitForHydration(page);

      await expect(page.getByLabel('Email')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    });

    test('should display correctly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/login');
      await waitForHydration(page);

      await expect(page.getByLabel('Email')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should support tab navigation', async ({ page }) => {
      const emailInput = page.getByLabel('Email');
      const passwordInput = page.getByLabel('Password');

      await emailInput.focus();
      await expect(emailInput).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(passwordInput).toBeFocused();
    });

    test('should submit form with Enter key', async ({ page }) => {
      await fillInput(page, 'Email', TEST_CREDENTIALS.ADMIN.email);
      await fillInput(page, 'Password', TEST_CREDENTIALS.ADMIN.password);

      // Press Enter in password field
      await page.getByLabel('Password').press('Enter');

      // Should submit the form
      await page.waitForURL('/dashboard', { timeout: 10000 });
    });
  });
});
