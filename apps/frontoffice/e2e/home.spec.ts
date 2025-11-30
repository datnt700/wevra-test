import { test, expect } from '@playwright/test';
import { waitForHydration } from './helpers';

/**
 * Basic E2E tests for Frontoffice home page
 * Tests actual implementation: Header with Eventure logo, EventSearch component
 *
 * Note: Tests only desktop viewport to avoid mobile responsive issues
 */

test.use({ viewport: { width: 1280, height: 720 } }); // Desktop only

test.describe('Home Page - Basic', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);

    // Verify page loads
    await expect(page).toHaveTitle(/Eventure/i);
  });

  test('should display header with Eventure logo', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);

    // Verify logo is visible (text "Eventure")
    const logo = page.getByText('Eventure', { exact: true });
    await expect(logo).toBeVisible();
  });

  test('should display login button when not authenticated', async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);

    // Login button should be visible
    const loginButton = page.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
  });
});
