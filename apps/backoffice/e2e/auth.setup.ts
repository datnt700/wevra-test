import { test as setup } from '@playwright/test';
import { waitForHydration } from './helpers';

/**
 * Authentication setup for backoffice tests
 *
 * Benefits:
 * - Faster test execution (login once, reuse state)
 * - More reliable tests (avoid repetitive login flows)
 * - Better test isolation (each test starts with clean state)
 *
 * See: https://playwright.dev/docs/auth
 */

const ADMIN_EMAIL = 'admin@eventure.so';
const ADMIN_PASSWORD = 'admin123';
const AUTH_FILE = '.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  console.log('Setting up admin authentication state...');

  // Navigate to login page
  await page.goto('/login');
  await waitForHydration(page);

  // Fill login form using input IDs (more reliable than labels)
  await page.fill('#email', ADMIN_EMAIL);
  await page.fill('#password', ADMIN_PASSWORD);

  // Click sign in and wait for redirect
  await page.getByRole('button', { name: /Sign In/i }).click();
  await page.waitForURL('/dashboard');

  // Save authentication state
  await page.context().storageState({ path: AUTH_FILE });

  console.log('Admin authentication state saved to', AUTH_FILE);
});
