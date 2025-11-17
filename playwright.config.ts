// playwright.config.ts
// Nota: Este archivo no se usa en BAM v0.1.3
// El control del navegador se realiza desde CustomWorld (Cucumber + Playwright core)
import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
  reporter: [['html', { outputFolder: 'reports/html' }]], 

  use: {
    baseURL: process.env.BASE_URL || 'about:blank',
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
