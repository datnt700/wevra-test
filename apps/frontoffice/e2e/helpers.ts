/**
 * E2E Test Helpers for Frontoffice
 * Inlined helpers to avoid Playwright double-import issues
 */
import type { Page } from '@playwright/test';

/**
 * Wait for React hydration to complete
 */
export async function waitForHydration(page: Page): Promise<void> {
  // Use 'domcontentloaded' instead of 'networkidle' for faster, more reliable tests
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  await page.waitForTimeout(1000); // Give React time to hydrate
}

/**
 * Clear and fill an input field
 */
export async function fillInput(page: Page, label: string | RegExp, value: string): Promise<void> {
  const input = page.getByLabel(label);
  await input.clear();
  await input.fill(value);
}

/**
 * Click and wait for navigation
 */
export async function clickAndWaitForNavigation(
  page: Page,
  locator: { click: () => Promise<void> }
): Promise<void> {
  await Promise.all([page.waitForURL('**/*', { timeout: 10000 }), locator.click()]);
}
