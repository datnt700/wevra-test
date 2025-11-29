/**
 * E2E Test Helpers for Backoffice
 * Inlined helpers to avoid Playwright double-import issues
 */
import type { Page } from '@playwright/test';

/**
 * Wait for React hydration to complete
 */
export async function waitForHydration(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500); // Give React time to hydrate
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function clickAndWaitForNavigation(
  page: Page,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selector: string | { role: string; name: string } | any
): Promise<void> {
  if (typeof selector === 'string') {
    await Promise.all([page.waitForNavigation(), page.click(selector)]);
  } else if (selector && typeof selector.click === 'function') {
    // It's a Locator
    await Promise.all([page.waitForNavigation(), selector.click()]);
  } else {
    await Promise.all([
      page.waitForNavigation(),
      page.getByRole(selector.role as any, { name: selector.name }).click(),
    ]);
  }
}
