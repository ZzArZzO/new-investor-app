// @ts-check
const { test, expect } = require('@playwright/test');

async function answerQuiz(page, optionIndex) {
  await page.click('#quizStart');
  for (let i = 0; i < 4; i++) {
    await page.locator('.quiz-option').nth(optionIndex).click();
  }
}

test.describe('landing page — investor-type quiz', () => {
  test('scores consistent answers into the matching archetype', async ({ page }) => {
    await page.goto('/');
    // Index 1 on every question maps to "The Steady Builder" (see QUIZ_TYPES order).
    await answerQuiz(page, 1);
    await expect(page.locator('#quizResult')).toBeVisible();
    await expect(page.locator('#resultTitle')).toHaveText('The Steady Builder');
  });

  test('copy-link produces a UTM-tagged share URL', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await answerQuiz(page, 0);
    await page.click('#copyLink');
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain('utm_source=quiz_share');
    expect(clipboard).toContain('utm_content=cautious');
  });

  test('download-image button triggers a PNG download', async ({ page }) => {
    await page.goto('/');
    await answerQuiz(page, 2);
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#downloadImage'),
    ]);
    expect(download.suggestedFilename()).toMatch(/^my-investor-type-.+\.png$/);
  });

  test('retake resets the quiz to question 1', async ({ page }) => {
    await page.goto('/');
    await answerQuiz(page, 3);
    await page.click('#quizRetake');
    await expect(page.locator('#quizBody')).toBeVisible();
    await expect(page.locator('#quizQCount')).toHaveText('Question 1 of 4');
  });

  test('the draft comparison-table link stays hidden until explicitly enabled', async ({ page }) => {
    // Regression guard for the SHOW_TOOL_COMPARISON_LINK gate in index.html —
    // /comparison/ has unverified data and no legal sign-off yet, so this
    // section must not appear in production until that flag is flipped.
    await page.goto('/');
    await answerQuiz(page, 1);
    await expect(page.locator('#toolExplore')).toBeHidden();
  });
});
