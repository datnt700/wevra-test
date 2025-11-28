import { test as setup } from '@playwright/test';
import { fillInput, waitForHydration } from './helpers';

/**
 * Authentication setup for frontoffice tests (optional)
 * Frontoffice is public-facing, so authentication is optional
 * This can be used for testing authenticated attendee features
 *
 * See: https://playwright.dev/docs/auth
 */

const ATTENDEE_EMAIL = 'attendee1@tavia.io';
const ATTENDEE_PASSWORD = 'attendee123';
const AUTH_FILE = '.auth/attendee.json';

setup('authenticate as attendee (optional)', async ({ page }) => {
  console.log('Setting up attendee authentication state...');

  // Navigate to login page (if frontoffice has authentication)
  try {
    await page.goto('/login');
    await waitForHydration(page);

    // Fill login form
    await fillInput(page, /Email/i, ATTENDEE_EMAIL);
    await fillInput(page, /Password/i, ATTENDEE_PASSWORD);

    // Click sign in and wait for redirect
    await page.getByRole('button', { name: /Sign In|Login/i }).click();
    await page.waitForURL(/\/(home|dashboard|events)/);

    // Save authentication state
    await page.context().storageState({ path: AUTH_FILE });

    console.log('Attendee authentication state saved to', AUTH_FILE);
  } catch {
    console.log('Frontoffice authentication not available or not needed');
  }
});
