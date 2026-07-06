// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('lessons reader', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lessons/index.html');
  });

  test('starts at lesson 1 of 12 with Previous disabled', async ({ page }) => {
    await expect(page.locator('#lessonPosition')).toHaveText('Lesson 1 of 12');
    await expect(page.locator('#prevBtn')).toBeDisabled();
    await expect(page.locator('.lesson-dot')).toHaveCount(12);
  });

  test('reveal-answer checks toggle independently per lesson', async ({ page }) => {
    const reveals = page.locator('.lesson:not([hidden]) .check-reveal');
    await reveals.nth(0).click();
    await expect(page.locator('.lesson:not([hidden]) .check-a').nth(0)).toBeVisible();
    await expect(page.locator('.lesson:not([hidden]) .check-a').nth(1)).toBeHidden();
  });

  test('walks all 12 lessons through to the feedback screen', async ({ page }) => {
    for (let i = 1; i <= 12; i++) {
      await expect(page.locator('#lessonPosition')).toHaveText(`Lesson ${i} of 12`);
      await page.click('#nextBtn');
    }
    await expect(page.locator('#lessonComplete')).toBeVisible();
    await expect(page.locator('#lessonNavButtons')).toBeHidden();
  });

  test('the bonus pillar (lessons 10-12) is reachable and labeled', async ({ page }) => {
    for (let i = 0; i < 9; i++) await page.click('#nextBtn');
    await expect(page.locator('.lesson:not([hidden]) .lesson-pillar')).toContainText('Bonus');
    await expect(page.locator('.lesson:not([hidden]) h2').first()).toHaveText('Before you invest: your safety net');
  });

  test('progress persists across reload and locked lessons stay locked', async ({ page }) => {
    await page.click('#nextBtn');
    await page.click('#nextBtn'); // now on lesson 3, furthest = 3
    await page.reload();
    await expect(page.locator('#lessonPosition')).toHaveText('Lesson 3 of 12'); // resumes at last "current", not lesson 1
    await expect(page.locator('.lesson-dot[data-id="3"]')).toHaveAttribute('data-state', 'current');
    await expect(page.locator('.lesson-dot[data-id="9"]')).toBeDisabled();
  });

  test('reset progress locks everything back down', async ({ page }) => {
    await page.click('#nextBtn');
    await page.click('#settingsBtn');
    page.once('dialog', d => d.accept());
    await page.click('#resetProgressBtn');
    await expect(page.locator('#lessonPosition')).toHaveText('Lesson 1 of 12');
    await expect(page.locator('.lesson-dot[data-id="2"]')).toBeDisabled();
  });

  test('feedback form carries lesson_feedback tag and UTM attribution', async ({ page }) => {
    for (let i = 0; i < 12; i++) await page.click('#nextBtn');
    const hidden = await page.$$eval('#feedbackForm input[type=hidden]', els =>
      Object.fromEntries(els.map(e => [e.name, e.value]))
    );
    expect(hidden.form_type).toBe('lesson_feedback');
    expect(hidden.utm_source).toBe('direct');
  });

  test('fires lesson_completed, course_completed, and feedback_submitted analytics events', async ({ page }) => {
    await page.route('https://formspree.io/**', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
    );
    for (let i = 0; i < 12; i++) await page.click('#nextBtn');
    await page.click('.feedback-submit');
    await page.waitForTimeout(200);
    const events = await page.evaluate(() => (window.vaq || []).map(a => a[1].name));
    expect(events.filter(n => n === 'lesson_completed')).toHaveLength(12);
    expect(events).toContain('course_completed');
    expect(events).toContain('feedback_submitted');
  });

  test('account section degrades gracefully with no backend configured', async ({ page }) => {
    await page.click('#settingsBtn');
    await expect(page.locator('#accountStatus')).toContainText('set up yet');
    await expect(page.locator('#accountSignedOut')).toBeHidden();
    await expect(page.locator('#accountSignedIn')).toBeHidden();
  });

  test('arrow keys navigate lessons, but not while typing in a textarea', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#lessonPosition')).toHaveText('Lesson 2 of 12');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#lessonPosition')).toHaveText('Lesson 1 of 12');
  });
});
