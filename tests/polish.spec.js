// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('UI polish', () => {
  const pages = ['/', '/lessons/index.html', '/comparison/index.html', '/privacy/', '/terms/', '/404.html'];

  for (const p of pages) {
    test(`${p} has a favicon and theme-color`, async ({ page }) => {
      await page.goto(p);
      await expect(page.locator('link[rel~="icon"]')).toHaveCount(2);
      await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0f1712');
    });
  }

  test('favicon and apple-touch-icon assets are reachable', async ({ request }) => {
    for (const asset of ['/favicon.svg', '/favicon.png', '/apple-touch-icon.png']) {
      const res = await request.get(asset);
      expect(res.ok()).toBe(true);
    }
  });

  test('404 page is reachable, noindex, and links home', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    await expect(page.locator('a.home')).toHaveAttribute('href', '/');
  });

  test('hero form shows a pending state while submitting', async ({ page }) => {
    await page.route('https://formspree.io/**', async route => {
      await new Promise(r => setTimeout(r, 200));
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });
    await page.goto('/');
    await page.fill('#signup input[type=email]', 'test@example.com');
    const submitBtn = page.locator('#signup button[type=submit]');
    await submitBtn.click();
    await expect(submitBtn).toBeDisabled();
    await expect(submitBtn).toHaveText(/Joining/);
    await expect(page.locator('#success')).toBeVisible();
  });

  test('feedback form shows a pending state while submitting', async ({ page }) => {
    await page.route('https://formspree.io/**', async route => {
      await new Promise(r => setTimeout(r, 200));
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });
    await page.goto('/lessons/index.html');
    for (let i = 0; i < 15; i++) await page.click('#nextBtn');
    const submitBtn = page.locator('.feedback-submit');
    await submitBtn.click();
    await expect(submitBtn).toBeDisabled();
    await expect(submitBtn).toHaveText(/Sending/);
  });
});
