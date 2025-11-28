import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Frontoffice E2E tests
 * Following best practices:
 * - Trace viewer on CI failures
 * - HTML reporter with attachments
 * - Parallel execution for speed
 * - Screenshot/video on failure
 * - Authentication state storage
 *
 * See https://playwright.dev/docs/test-configuration
 * See https://playwright.dev/docs/best-practices
 */
export default defineConfig({
  testDir: './e2e',

  /* Only match spec files, not helpers or setup */
  testMatch: '**/*.spec.ts',
  testIgnore: ['**/helpers.ts', '**/utils/**'],

  /* Run tests in files in parallel */
  fullyParallel: true /* Fail the build on CI if you accidentally left test.only in the source code. */,
  forbidOnly: !!process.env.CI,

  /* Retry on CI only (2 retries for flaky tests) */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI for stability */
  workers: process.env.CI ? 1 : undefined,

  /* Global timeout for each test */
  timeout: 30 * 1000,

  /* Expect timeout for assertions */
  expect: {
    timeout: 5000,
  },

  /* Reporter configuration - HTML report with detailed information */
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'], // Console output
    process.env.CI ? ['github'] : ['list'], // GitHub Actions integration
  ],

  /* Shared settings for all projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3003',

    /* Collect trace when retrying failed tests (best practice for debugging CI) */
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure (disabled by default for speed, enable if needed) */
    video: process.env.CI ? 'retain-on-failure' : 'off',

    /* Maximum time each action can take */
    actionTimeout: 10 * 1000,

    /* Navigation timeout - increased to 30s for server warmup */
    navigationTimeout: 30 * 1000,
  },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Configure projects for major browsers */
  projects: [
    /* Desktop browsers */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Mobile viewports */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Branded browsers (uncomment if needed) */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    //   dependencies: ['setup'],
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    // Use production build in CI for faster, more stable tests
    command: process.env.CI ? 'pnpm build && pnpm start' : 'pnpm dev',
    url: 'http://localhost:3003',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    // Suppress Next.js deprecation warnings in test output
    stdout: 'ignore',
    stderr: 'ignore',
  },
});
