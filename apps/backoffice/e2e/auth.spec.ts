/**
 * E2E tests for Authentication
 */
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login page elements', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: /Welcome Back/i })).toBeVisible();

    // Check form elements
    await expect(page.getByLabel(/Email Address/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    // Click sign in without filling form
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Wait for validation messages
    await expect(page.getByText(/Email is required/i)).toBeVisible();
    await expect(page.getByText(/Password is required/i)).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Fill invalid email
    await page.getByLabel(/Email Address/i).fill('notanemail');
    await page.getByLabel(/Password/i).fill('password123');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Check for email validation error
    await expect(page.getByText(/Please enter a valid email address/i)).toBeVisible();
  });

  test('should show validation error for short password', async ({ page }) => {
    // Fill short password
    await page.getByLabel(/Email Address/i).fill('test@example.com');
    await page.getByLabel(/Password/i).fill('12345');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Check for password validation error
    await expect(page.getByText(/Password must be at least 6 characters/i)).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Fill invalid credentials
    await page.getByLabel(/Email Address/i).fill('wrong@example.com');
    await page.getByLabel(/Password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Wait for error message
    await expect(page.getByText(/Invalid email or password/i)).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Note: This requires seeded test data in the database
    // Fill valid credentials (adjust based on your test data)
    await page.getByLabel(/Email Address/i).fill('admin@example.com');
    await page.getByLabel(/Password/i).fill('password123');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Should redirect to dashboard
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should toggle "Remember me" checkbox', async ({ page }) => {
    const checkbox = page.getByLabel(/Remember me/i);

    // Initially unchecked
    await expect(checkbox).not.toBeChecked();

    // Check the box
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Uncheck the box
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('should have forgot password link', async ({ page }) => {
    const forgotLink = page.getByText(/Forgot password/i);
    await expect(forgotLink).toBeVisible();
  });

  test('should display copyright text', async ({ page }) => {
    const currentYear = new Date().getFullYear();
    await expect(page.getByText(new RegExp(`© ${currentYear} Eventure`))).toBeVisible();
  });
});

test.describe('Authentication - Internationalization', () => {
  test('should display login page in English by default', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('Welcome Back')).toBeVisible();
    await expect(page.getByText('Restaurant Backoffice')).toBeVisible();
  });

  test('should display login page in Vietnamese', async ({ page, context }) => {
    // Set Vietnamese locale cookie
    await context.addCookies([
      {
        name: 'NEXT_LOCALE',
        value: 'vi',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/login');
    await expect(page.getByText('Chào mừng trở lại')).toBeVisible();
    await expect(page.getByText('Hệ thống quản lý nhà hàng')).toBeVisible();
  });
});

test.describe('Protected Routes', () => {
  test('should redirect to login when accessing dashboard without auth', async ({ page }) => {
    await page.goto('/dashboard');

    // Should redirect to login
    await page.waitForURL(/\/login/);
    await expect(page).toHaveURL(/\/login/);
  });

  test('should access dashboard after successful login', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByLabel(/Email Address/i).fill('admin@example.com');
    await page.getByLabel(/Password/i).fill('password123');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Wait for redirect
    await page.waitForURL('/dashboard');

    // Verify dashboard is accessible
    await expect(page.getByRole('heading', { name: /Dashboard|Welcome back/i })).toBeVisible();
  });
});
