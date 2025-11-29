import { test as base, Page, BrowserContext } from '@playwright/test';

/**
 * Custom fixtures for backoffice E2E tests
 *
 * Fixtures provide reusable test setup and teardown
 * This file defines common utilities and authenticated pages
 *
 * See: https://playwright.dev/docs/test-fixtures
 */

type BackofficeFixtures = {
  authenticatedPage: Page;
};

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<BackofficeFixtures>({
  /**
   * Authenticated page fixture
   * Automatically loads the admin authentication state
   */
  authenticatedPage: async ({ page, context }: { page: Page; context: BrowserContext }, use) => {
    // Load authentication state if available
    const authFile = '.auth/admin.json';
    try {
      await context.storageState({ path: authFile });
      console.log('Loaded authentication state');
    } catch {
      console.warn('No authentication state found, tests will run without auth');
    }

    await use(page);
  },
});

export { expect } from '@playwright/test';
