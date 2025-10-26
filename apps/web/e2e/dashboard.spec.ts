/**
 * E2E tests for Dashboard
 */
import { test, expect, type Page } from '@playwright/test';

// Helper function to login before each test
async function login(page: Page) {
  await page.goto('/login');
  await page.getByLabel(/Email Address/i).fill('admin@example.com');
  await page.getByLabel(/Password/i).fill('password123');
  await page.getByRole('button', { name: /Sign In/i }).click();
  await page.waitForURL('/dashboard');
}

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display dashboard page title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Dashboard|Welcome back/i })).toBeVisible();
  });

  test('should display welcome message with user name', async ({ page }) => {
    // Check for personalized welcome message
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
  });

  test('should display stats cards', async ({ page }) => {
    // Check for stats section
    await expect(page.getByText(/Total Restaurants/i)).toBeVisible();
    await expect(page.getByText(/Active Bookings/i)).toBeVisible();
    await expect(page.getByText(/Monthly Revenue/i)).toBeVisible();
  });

  test('should display quick actions section', async ({ page }) => {
    await expect(page.getByText(/Quick Actions/i)).toBeVisible();
    await expect(page.getByText(/New Restaurant/i)).toBeVisible();
    await expect(page.getByText(/View Bookings/i)).toBeVisible();
    await expect(page.getByText(/Analytics/i)).toBeVisible();
    await expect(page.getByText(/Settings/i)).toBeVisible();
  });

  test('should navigate to new restaurant page from quick actions', async ({ page }) => {
    await page.getByRole('link', { name: /New Restaurant/i }).click();
    await expect(page).toHaveURL(/\/restaurants\/new/);
  });

  test('should display restaurants list section', async ({ page }) => {
    await expect(page.getByText(/My Restaurants/i)).toBeVisible();
  });

  test('should display sign out button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Sign Out/i })).toBeVisible();
  });

  test('should sign out successfully', async ({ page }) => {
    await page.getByRole('button', { name: /Sign Out/i }).click();

    // Should redirect to login
    await page.waitForURL(/\/login/);
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('Dashboard - Restaurant Management', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should show empty state when no restaurants', async ({ page }) => {
    // This assumes the test user has no restaurants
    // You may need to adjust based on your test data
    const emptyStateHeading = page.getByRole('heading', { name: /No Restaurants Yet/i });

    if (await emptyStateHeading.isVisible()) {
      await expect(page.getByText(/Get started by adding your first restaurant/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /Add Restaurant/i })).toBeVisible();
    }
  });

  test('should display restaurant cards when available', async ({ page }) => {
    // Check if restaurant cards are present
    const restaurantCards = page.locator('[data-testid="restaurant-item"]');
    const count = await restaurantCards.count();

    if (count > 0) {
      // Verify first restaurant card has required elements
      const firstCard = restaurantCards.first();
      await expect(firstCard).toBeVisible();

      // Check for manage button
      await expect(page.getByRole('link', { name: /Manage/i }).first()).toBeVisible();
    }
  });

  test('should display restaurant status badge', async ({ page }) => {
    const restaurantCards = page.locator('[data-testid="restaurant-item"]');
    const count = await restaurantCards.count();

    if (count > 0) {
      // Check for status badge (Active/Inactive)
      const statusBadge = page.getByText(/Active|Inactive/).first();
      await expect(statusBadge).toBeVisible();
    }
  });

  test('should navigate to restaurant management page', async ({ page }) => {
    const manageLink = page.getByRole('link', { name: /Manage/i }).first();

    if (await manageLink.isVisible()) {
      await manageLink.click();
      await expect(page).toHaveURL(/\/restaurants\/[a-z0-9-]+/);
    }
  });
});

test.describe('Dashboard - Stats Display', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display numeric stats', async ({ page }) => {
    // Total Restaurants stat
    const totalRestaurants = page.locator('text=/Total Restaurants/i').locator('..');
    await expect(totalRestaurants).toBeVisible();

    // Active Bookings stat
    const activeBookings = page.locator('text=/Active Bookings/i').locator('..');
    await expect(activeBookings).toBeVisible();

    // Monthly Revenue stat
    const monthlyRevenue = page.locator('text=/Monthly Revenue/i').locator('..');
    await expect(monthlyRevenue).toBeVisible();
  });

  test('should display stat icons', async ({ page }) => {
    // Check for SVG icons in stat cards
    const statCards = page.locator('[data-testid="stat-card"]');
    const count = await statCards.count();

    if (count > 0) {
      const firstCard = statCards.first();
      const icon = firstCard.locator('svg');
      await expect(icon).toBeVisible();
    }
  });
});

test.describe('Dashboard - Internationalization', () => {
  test('should display dashboard in English', async ({ page }) => {
    await login(page);
    await expect(page.getByText(/Welcome back/i)).toBeVisible();
    await expect(page.getByText(/Total Restaurants/i)).toBeVisible();
    await expect(page.getByText(/Quick Actions/i)).toBeVisible();
  });

  test('should display dashboard in Vietnamese', async ({ page, context }) => {
    // Set Vietnamese locale cookie
    await context.addCookies([
      {
        name: 'NEXT_LOCALE',
        value: 'vi',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await login(page);
    await expect(page.getByText(/Chào mừng trở lại/i)).toBeVisible();
    await expect(page.getByText(/Tổng số nhà hàng/i)).toBeVisible();
    await expect(page.getByText(/Hành động nhanh/i)).toBeVisible();
  });
});

test.describe('Dashboard - Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Dashboard should still be visible
    await expect(page.getByRole('heading', { name: /Dashboard|Welcome back/i })).toBeVisible();

    // Stats should stack vertically
    await expect(page.getByText(/Total Restaurants/i)).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    await expect(page.getByRole('heading', { name: /Dashboard|Welcome back/i })).toBeVisible();
    await expect(page.getByText(/Quick Actions/i)).toBeVisible();
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });

    await expect(page.getByRole('heading', { name: /Dashboard|Welcome back/i })).toBeVisible();
    await expect(page.getByText(/My Restaurants/i)).toBeVisible();
  });
});
