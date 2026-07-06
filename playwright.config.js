// @ts-check
const fs = require('fs');
const { defineConfig, devices } = require('@playwright/test');

// This sandbox has a pre-installed Chromium at a fixed path (see the repo's
// environment notes) that doesn't match every @playwright/test version's
// bundled browser revision. Use it when present; otherwise fall back to
// Playwright's normal browser resolution so this config stays portable.
const localChromium = '/opt/pw-browsers/chromium';
const executablePath = fs.existsSync(localChromium) ? localChromium : undefined;

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:8123',
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npx http-server . -p 8123 -s',
    port: 8123,
    reuseExistingServer: !process.env.CI,
    timeout: 20000,
  },
});
