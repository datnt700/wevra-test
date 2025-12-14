// apps/wevra/tests/e2e/quiz.spec.ts
import { test, expect } from '@playwright/test';

test.describe('QuizChat (e2e)', () => {
  test.beforeEach(async ({ page }) => {
    // Use absolute base URL provided by env or default to localhost:3000
    const base =
      process.env.PLAYWRIGHT_TEST_BASE_URL || process.env.BASE_URL || 'http://localhost:3085';
    await page.goto(`${base}/en/quiz`); // route that mounts QuizChat
  });

  test('sends a message and shows bot reply', async ({ page }) => {
    // Intercept survey submit endpoint (used by QuizChat) and return success
    await page.route('**/api/survey/submit', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      });
    });

    // The first question is multiple-choice. Click the first option to submit.
    const firstOption = page.locator('[data-testid="quiz-option"]').first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    // After selecting, a user message bubble should appear (data-role="user")
    const userMessage = page.locator('[data-testid="chat-message"][data-role="user"]').last();
    await expect(userMessage).toBeVisible();

    // Typing indicator may appear briefly; wait for either typing OR the duo message to become visible.
    const typing = page.locator('[data-testid="chat-typing"]');
    const duoMessage = page.locator('[data-testid="chat-message"][data-role="duo"]').first();
    // race: wait up to a few seconds for either typing or duo message
    await Promise.race([
      typing.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {}),
      duoMessage.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
    ]);
    await expect(duoMessage).toBeVisible();
  });
});
