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

  test('hero form submits via fetch and shows the inline success message, not a redirect', async ({ page }) => {
    // Regression guard: the placeholder-detection guard in index.html once checked
    // for the real Formspree ID instead of the literal placeholder text, which
    // silently disabled this fetch enhancement and sent every signup through a
    // full-page redirect to Formspree instead. See tests/waitlist.spec.js history.
    await page.route('https://formspree.io/**', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
    );
    await page.goto('/');
    await page.fill('#signup input[type=email]', 'test@example.com');
    await page.click('#signup button[type=submit]');
    await expect(page).toHaveURL(/\/$|index\.html$/); // stayed on the page, no redirect
    await expect(page.locator('#success')).toBeVisible();
  });

  test('fires waitlist_signup, quiz_started, and quiz_completed analytics events', async ({ page }) => {
    await page.route('https://formspree.io/**', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
    );
    await page.goto('/');
    await page.click('#quizStart');
    for (let i = 0; i < 4; i++) await page.locator('.quiz-option').nth(0).click();
    await page.fill('#signup input[type=email]', 'test@example.com');
    await page.click('#signup button[type=submit]');
    await page.waitForTimeout(200);
    const events = await page.evaluate(() => (window.vaq || []).map(a => a[1].name));
    expect(events).toEqual(['quiz_started', 'quiz_completed', 'waitlist_signup']);
  });
});
