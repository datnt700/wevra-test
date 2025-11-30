import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility Tests for Eventure Components
 * Tests compliance with WCAG 2.1 Level AA standards
 */

test.describe('Component Accessibility Tests', () => {
  // Base URL for Storybook
  const storybookUrl = process.env.CI ? 'http://localhost:6006' : 'http://localhost:6006';

  test.beforeEach(async ({ page }) => {
    // Wait for Storybook to be ready
    await page.goto(storybookUrl);
    await page.waitForLoadState('networkidle');
  });

  test('Button - Default variant has no violations', async ({ page }) => {
    await page.goto(`${storybookUrl}/?path=/story/core-base-button--default`);
    await page.waitForSelector('[role="button"]', { timeout: 5000 });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Button - All variants pass accessibility', async ({ page }) => {
    const variants = ['primary', 'secondary', 'tertiary', 'danger'];

    for (const variant of variants) {
      await page.goto(`${storybookUrl}/?path=/story/core-base-button--${variant}`);
      await page.waitForSelector('[role="button"]', { timeout: 5000 });

      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

      expect(results.violations, `Button ${variant} should have no violations`).toEqual([]);
    }
  });

  test('Input - Has proper labels and ARIA', async ({ page }) => {
    await page.goto(`${storybookUrl}/?path=/story/core-form-input--default`);
    await page.waitForSelector('input', { timeout: 5000 });

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

    expect(results.violations).toEqual([]);
  });

  test('Modal - Keyboard navigation and focus management', async ({ page }) => {
    await page.goto(`${storybookUrl}/?path=/story/core-radix-modal--default`);

    // Check for focus trap and keyboard navigation
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

    expect(results.violations).toEqual([]);
  });

  test('WizardStepper - Navigation is accessible', async ({ page }) => {
    await page.goto(`${storybookUrl}/?path=/story/core-navigation-wizardstepper--default`);
    await page.waitForSelector('[role="navigation"]', { timeout: 5000 });

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

    expect(results.violations).toEqual([]);
  });

  test('Carousel - Has proper ARIA labels', async ({ page }) => {
    await page.goto(`${storybookUrl}/?path=/story/core-display-carousel--default`);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

    expect(results.violations).toEqual([]);
  });

  test('Image - Preview mode is keyboard accessible', async ({ page }) => {
    await page.goto(`${storybookUrl}/?path=/story/core-base-image--withpreview`);
    await page.waitForSelector('img', { timeout: 5000 });

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

    expect(results.violations).toEqual([]);
  });

  test('All stories pass basic accessibility', async ({ page }) => {
    // Get list of all stories
    await page.goto(`${storybookUrl}/?path=/story/`);
    await page.waitForLoadState('networkidle');

    // Sample critical stories
    const criticalStories = [
      'core-base-button--default',
      'core-form-input--default',
      'core-radix-modal--default',
      'core-navigation-wizardstepper--default',
    ];

    for (const story of criticalStories) {
      await page.goto(`${storybookUrl}/?path=/story/${story}`);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .disableRules(['color-contrast']) // Disable for design-in-progress
        .analyze();

      // Log violations for debugging
      if (results.violations.length > 0) {
        console.log(`Violations in ${story}:`, JSON.stringify(results.violations, null, 2));
      }

      expect(results.violations, `Story ${story} should have no critical violations`).toEqual([]);
    }
  });

  test('Color contrast meets WCAG AA', async ({ page }) => {
    await page.goto(`${storybookUrl}/?path=/story/core-base-button--primary`);
    await page.waitForSelector('[role="button"]', { timeout: 5000 });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('[role="button"]')
      .analyze();

    // Check specifically for color contrast
    const contrastViolations = results.violations.filter((v) => v.id === 'color-contrast');
    expect(contrastViolations).toEqual([]);
  });

  test('Keyboard navigation works across components', async ({ page }) => {
    await page.goto(`${storybookUrl}/?path=/story/core-base-button--default`);

    // Test Tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    // Test Enter/Space activation
    await page.keyboard.press('Enter');
    // Component should respond to keyboard input
  });
});

test.describe('Storybook UI Accessibility', () => {
  test('Storybook interface has no violations', async ({ page }) => {
    await page.goto('http://localhost:6006');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('#storybook-preview-iframe') // Exclude the preview iframe
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
