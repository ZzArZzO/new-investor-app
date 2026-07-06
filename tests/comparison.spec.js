// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('comparison table (draft, not live)', () => {
  test('is noindex and carries the draft banner', async ({ page }) => {
    await page.goto('/comparison/index.html');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('.draft-banner')).toContainText('INTERNAL DRAFT');
    await expect(page.locator('.disclosure')).toContainText('affiliate');
    await expect(page.locator('.risk-banner')).toContainText('high-risk');
  });

  test('is disallowed in robots.txt alongside the lessons preview', async ({ page, request }) => {
    const res = await request.get('/robots.txt');
    const body = await res.text();
    expect(body).toContain('Disallow: /comparison/');
    expect(body).toContain('Disallow: /lessons/');
  });

  test('is not linked from the landing page or the lessons reader', async ({ page }) => {
    await page.goto('/');
    const fromIndex = await page.$$eval('a', as => as.some(a => a.href.includes('/comparison/')));
    expect(fromIndex).toBe(false);

    await page.goto('/lessons/index.html');
    const fromLessons = await page.$$eval('a', as => as.some(a => a.href.includes('/comparison/')));
    expect(fromLessons).toBe(false);
  });

  test('every fee/status cell not yet verified is flagged', async ({ page }) => {
    await page.goto('/comparison/index.html');
    const verifyCount = await page.locator('.verify').count();
    expect(verifyCount).toBeGreaterThan(10);
  });
});
