// playwright/common/rdg/scanner_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import scanner from '#/pageObjects/rdg/scanner';

function runTests() {
  test.describe('Scanner', () => {
    let electronApp, page;

    test.beforeAll(async () => {
      ({ electronApp, page } = await launchElectronApp());
    });

    test.afterAll(async () => {
      if (electronApp) await electronApp.close();
    });

    test('Check elements of Scanner ', async ({}, testInfo) => {
      try {
        // we should open the modal
        // pageObject for the heade is not ready yet, so the locator was put here for now
        await page.locator('.barcode-reader-error').click();

        await scanner.header.shouldHaveText(page);
        await scanner.body.shouldHaveText(page);
        await scanner.body.icon.isVisible(page);
        await scanner.footer.shouldHaveText(page);

        // await scanner.close.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
