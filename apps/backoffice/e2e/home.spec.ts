import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display hero section with correct title', async ({ page }) => {
    await page.goto('/');

    // Check if the hero title is visible
    const heroTitle = page.getByRole('heading', { level: 1 });
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Discover & Book');
  });

  test('should display all three feature cards', async ({ page }) => {
    await page.goto('/');

    // Check for feature titles
    await expect(page.getByText('Easy Search')).toBeVisible();
    await expect(page.getByText('Instant Booking')).toBeVisible();
    await expect(page.getByText('Stay Updated')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Check navigation links
    const homeLink = page.getByRole('link', { name: 'Home' });
    const aboutLink = page.getByRole('link', { name: 'About' });
    const contactLink = page.getByRole('link', { name: 'Contact' });

    await expect(homeLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(contactLink).toBeVisible();
  });

  test('should display CTA button', async ({ page }) => {
    await page.goto('/');

    const ctaButton = page.getByRole('button', { name: 'Get Started' });
    await expect(ctaButton).toBeVisible();
  });

  test('should have locale switcher', async ({ page }) => {
    await page.goto('/');

    const localeSelector = page.getByLabel('Select language');
    await expect(localeSelector).toBeVisible();
  });
});

test.describe('Internationalization', () => {
  test('should display content in English by default', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Discover & Book Amazing Cafés and Restaurants')).toBeVisible();
  });

  test('should switch to Vietnamese when selecting from locale switcher', async ({
    page,
    context,
  }) => {
    await page.goto('/');

    // Change locale using the dropdown
    await page.selectOption('select[aria-label="Select language"]', 'vi');

    // Wait for reload
    await page.waitForLoadState('networkidle');

    // Check Vietnamese content is displayed
    await expect(
      page.getByText('Khám phá & Đặt chỗ Quán cà phê và Nhà hàng Tuyệt vời')
    ).toBeVisible();

    // Verify cookie was set
    const cookies = await context.cookies();
    const localeCookie = cookies.find((c) => c.name === 'NEXT_LOCALE');
    expect(localeCookie?.value).toBe('vi');
  });

  test('should remember locale preference via cookie', async ({ page, context }) => {
    // Set Vietnamese locale cookie
    await context.addCookies([
      {
        name: 'NEXT_LOCALE',
        value: 'vi',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.goto('/');

    // Should display Vietnamese content
    await expect(
      page.getByText('Khám phá & Đặt chỗ Quán cà phê và Nhà hàng Tuyệt vời')
    ).toBeVisible();
  });
});
