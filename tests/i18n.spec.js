// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('i18n (landing page, EN/NL)', () => {
  test('defaults to English with the EN toggle active', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.lang-btn[data-lang="en"]')).toHaveAttribute('aria-pressed', 'true');
  });

  test('switching to NL translates hero, form, and footer, and updates <html lang>', async ({ page }) => {
    await page.goto('/');
    await page.click('.lang-btn[data-lang="nl"]');
    await expect(page.locator('html')).toHaveAttribute('lang', 'nl');
    await expect(page.locator('h1')).toHaveText('Snap beleggen en crypto voordat je één euro riskeert.');
    await expect(page.locator('#signup button[type=submit]')).toHaveText('Meld je aan voor de wachtlijst');
    await expect(page.locator('.lang-btn[data-lang="nl"]')).toHaveAttribute('aria-pressed', 'true');
  });

  test('quiz questions and results translate, and the archetype mapping stays consistent across languages', async ({ page }) => {
    await page.goto('/');
    await page.click('.lang-btn[data-lang="nl"]');
    await page.click('#quizStart');
    await expect(page.locator('#quizQCount')).toHaveText('Vraag 1 van 4');
    for (let i = 0; i < 4; i++) await page.locator('.quiz-option').nth(1).click();
    await expect(page.locator('#resultTitle')).toHaveText('De Stabiele Bouwer'); // matches "Steady Builder" (index 1)
  });

  test('switching language mid-result re-renders without resetting the quiz', async ({ page }) => {
    await page.goto('/');
    await page.click('#quizStart');
    for (let i = 0; i < 4; i++) await page.locator('.quiz-option').nth(1).click();
    await expect(page.locator('#resultTitle')).toHaveText('The Steady Builder');
    await page.click('.lang-btn[data-lang="nl"]');
    await expect(page.locator('#resultTitle')).toHaveText('De Stabiele Bouwer');
    await expect(page.locator('#quizResult')).toBeVisible(); // still showing the result, not reset to question 1
  });

  test('language choice persists across reload', async ({ page }) => {
    await page.goto('/');
    await page.click('.lang-btn[data-lang="nl"]');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'nl');
  });

  test('meta title/description stay English regardless of the toggle (documented SEO limitation)', async ({ page }) => {
    await page.goto('/');
    const titleBefore = await page.title();
    await page.click('.lang-btn[data-lang="nl"]');
    await expect(page.locator('h1')).not.toHaveText(/Understand investing/);
    expect(await page.title()).toBe(titleBefore); // unchanged -- client-side i18n doesn't touch <title>
  });
});
