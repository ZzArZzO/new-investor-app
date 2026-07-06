// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('privacy + terms pages', () => {
  test('privacy policy is reachable and clearly marked as a draft, not legal advice', async ({ page }) => {
    await page.goto('/privacy/');
    await expect(page.locator('h1')).toHaveText('Privacy Policy');
    await expect(page.locator('.draft-banner')).toContainText('not legal advice');
  });

  test('terms page is reachable, clearly marked as a draft, and states the no-advice posture', async ({ page }) => {
    await page.goto('/terms/');
    await expect(page.locator('h1')).toHaveText('Terms of Use');
    await expect(page.locator('.draft-banner')).toContainText('not legal advice');
    await expect(page.locator('.risk-note')).toContainText('high-risk');
  });

  test('both pages are linked from the landing page and lessons preview footers', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer a[href="/privacy/"]')).toBeVisible();
    await expect(page.locator('footer a[href="/terms/"]')).toBeVisible();

    await page.goto('/lessons/index.html');
    await expect(page.locator('footer a[href="/privacy/"]')).toBeVisible();
    await expect(page.locator('footer a[href="/terms/"]')).toBeVisible();
  });

  test('cross-link between privacy and terms works both ways', async ({ page }) => {
    await page.goto('/privacy/');
    await expect(page.locator('footer a[href="/terms/"]')).toBeVisible();
    await page.goto('/terms/');
    await expect(page.locator('a[href="/privacy/"]').first()).toBeVisible();
  });
});
