// playwright.config.ts
import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
  reporter: [['html', { outputFolder: 'reports/html' }]], 

  use: {
    baseURL: process.env.BASE_URL || 'https://www.demoblaze.com',
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure', 
  },

  
  outputDir: 'reports/traces',

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
