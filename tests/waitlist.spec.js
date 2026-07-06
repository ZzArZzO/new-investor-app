// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('landing page — waitlist + attribution', () => {
  test('captures UTM params from the URL as hidden fields on the signup form', async ({ page }) => {
    await page.goto('/?utm_source=reddit&utm_medium=organic&utm_campaign=investing&utm_content=dutchfire');
    const hidden = await page.$$eval('form#signup input[type=hidden]', els =>
      Object.fromEntries(els.map(e => [e.name, e.value]))
    );
    expect(hidden).toMatchObject({
      utm_source: 'reddit',
      utm_medium: 'organic',
      utm_campaign: 'investing',
      utm_content: 'dutchfire',
    });
  });

  test('defaults attribution to direct/none when no UTM params are present', async ({ page }) => {
    await page.goto('/');
    const hidden = await page.$$eval('form#signup input[type=hidden]', els =>
      Object.fromEntries(els.map(e => [e.name, e.value]))
    );
    expect(hidden.utm_source).toBe('direct');
    expect(hidden.utm_medium).toBe('none');
  });

  test('would-you-pay pills are present and mutually exclusive', async ({ page }) => {
    await page.goto('/');
    const radios = page.locator('form#signup input[name="would_pay"]');
    await expect(radios).toHaveCount(3);
    await page.check('form#signup input[name="would_pay"][value="maybe"]');
    await expect(page.locator('form#signup input[name="would_pay"]:checked')).toHaveValue('maybe');
  });

  test('has an Open Graph image so shared links get a preview', async ({ page }) => {
    await page.goto('/');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toContain('og-image.png');
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');
  });

  test('exposes exactly one h1 and a working skip link', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText(/Skip to content/);
  });
});
