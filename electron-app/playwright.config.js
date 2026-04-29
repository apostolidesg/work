// playwright.config.js
import { defineConfig } from '@playwright/test';

module.exports = defineConfig({
  workers: 1,
  testDir: './playwright/e2e', // Points to the folder with test files
  outputDir: 'playwright/reports/test-results', // Set the top-level output directory for artifacts
  snapshotPathTemplate:
    'playwright/screenshots/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{-platform}{ext}',
  use: {
    slowMo: 200, // delay between steps
    screenshot: 'only-on-failure', // Capture screenshots only on failure
    trace: 'on', // record test traces which can include screenshots, console logs, network activity, and more
    video: 'retain-on-failure', // Capture video only on failure
    console: 'verbose', // Logs console output in the report
  },
  reporter: [
    ['list'], // console
    ['./playwright/custom-reporter.js'], // console
    ['html', { outputFolder: 'playwright/reports/playwright-report', open: 'never' }],
    ['junit', { outputFile: 'playwright/reports/test-results-junit/results.xml' }], // Junit Reporter (for CI/CD)
  ],
});
