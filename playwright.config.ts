import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120 * 1000,
  expect: {
    timeout: 10000
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  fullyParallel: false,
  reporter: [['list'], ['html']],
  
  use: {
    baseURL: 'https://get.preprod.xometry.eu',
    trace: 'retain-on-failure',
    screenshot: 'on',
    viewport: { width: 1920, height: 1080 },
    headless: true,
    ignoreHTTPSErrors: true,
    channel: 'chrome',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    },
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-infobars',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
      ignoreDefaultArgs: ['--enable-automation'],
    },
  },
  projects: [
    {
      name: 'chrome-stealth',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});