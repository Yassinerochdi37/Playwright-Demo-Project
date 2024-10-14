import { defineConfig, devices } from '@playwright/test';

const nowDate = new Date();

export default defineConfig({
  testDir: './tests',
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
      ['list', { printSteps: true }],
      ['json', { outputFile: 'json-test-results/test-results' + nowDate.getTime() + '.json' }]
    ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Navigateur Chrome',
      use: { 
        headless: false,
        browserName: "chromium",
        launchOptions: {
          args: ['--start-maximized']
        },
        viewport: null,
      },
    },
  ],
});
