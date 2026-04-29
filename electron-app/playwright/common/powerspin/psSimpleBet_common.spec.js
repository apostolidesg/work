// playwright/common/powerspin/psSimpleBet_common.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import header from '#/pageObjects/powerspin/psHeader';
import playArea from '#/pageObjects/powerspin/psPlayArea';
import sideScreen from '#/pageObjects/powerspin/psSideScreen';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
    await lobbyGames.powerspin.get(page).click();
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Select Powerspin Combo 0, 1 and 2', () => {
    // === Base Combo (Index 0) Selections ===
    test('Check Combo 1 elements of Play Area inside Powerspin', async ({}, testInfo) => {
      try {
        console.log('Check elements has been done on powespinStandardPage_common.spec.js file');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select numbers (Combo 1)', async ({}, testInfo) => {
      try {
        await playArea.mainNumberBtn.get(page, 1, 0).click();
        await playArea.mainNumberBtn.get(page, 10, 0).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select symbol (Combo 1)', async ({}, testInfo) => {
      try {
        await playArea.wheelImage.get(page, 0).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select zone (Combo 1)', async ({}, testInfo) => {
      try {
        await playArea.zoneGreenBtn.get(page, 0).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select under/over (Combo 1)', async ({}, testInfo) => {
      try {
        await playArea.underBtn.get(page, 0).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check side screen (Combo 1)', async ({}, testInfo) => {
      try {
        console.log('Was not implemented on spectron. Must be done on playwright');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    // === Combo 2 (Index 1) ===

    test('Select Combo 2 option', async ({}, testInfo) => {
      try {
        await header.combo.icon.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Combo 2 elements of Play Area', async ({}, testInfo) => {
      try {
        console.log('Check elements of Number Area');
        await playArea.numberLabel.shouldHaveText(page, 1);
        for (let i = 1; i <= 24; i++) {
          await playArea.mainNumberBtn.shouldHaveText(page, i, 1);
        }

        await playArea.quickPickButton.shouldHaveText(page, 1);

        console.log('Check elements of Symbol Area');
        await playArea.symbolLabel.shouldHaveText(page, 1);
        await playArea.wheelImage.isVisible(page, 1);

        console.log('Check elements of Zone Area');
        await playArea.zoneLabel.shouldHaveText(page, 1);
        await playArea.zoneRedBtn.shouldHaveText(page, 1);
        await playArea.zoneGreenBtn.shouldHaveText(page, 1);
        await playArea.zoneBlueBtn.shouldHaveText(page, 1);

        console.log('Check elements of Under/Over Area');
        await playArea.underOverLabel.shouldHaveText(page, 1);
        await playArea.underBtn.shouldHaveText(page, 1);
        await playArea.overBtn.shouldHaveText(page, 1);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select number (Combo 2)', async ({}, testInfo) => {
      try {
        await playArea.mainNumberBtn.get(page, 2, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select symbol (Combo 2)', async ({}, testInfo) => {
      try {
        await playArea.wheelImage.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select zone (Combo 2)', async ({}, testInfo) => {
      try {
        await playArea.zoneRedBtn.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select under/over (Combo 2)', async ({}, testInfo) => {
      try {
        await playArea.overBtn.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check side screen (Combo 2)', async ({}, testInfo) => {
      try {
        console.log('Was not implemented on spectron. Must be done on playwright');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    // === Combo 3 (Index 2) ===

    test('Select Combo 3 option', async ({}, testInfo) => {
      try {
        await header.combo.icon.get(page, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Combo 3 elements of Play Area', async ({}, testInfo) => {
      try {
        console.log('Check elements of Number Area');
        await playArea.numberLabel.shouldHaveText(page, 2);
        for (let i = 1; i <= 24; i++) {
          await playArea.mainNumberBtn.shouldHaveText(page, i, 2);
        }

        await playArea.quickPickButton.shouldHaveText(page, 2);

        console.log('Check elements of Symbol Area');
        await playArea.symbolLabel.shouldHaveText(page, 2);
        await playArea.wheelImage.isVisible(page, 2);

        console.log('Check elements of Zone Area');
        await playArea.zoneLabel.shouldHaveText(page, 2);
        await playArea.zoneRedBtn.shouldHaveText(page, 2);
        await playArea.zoneGreenBtn.shouldHaveText(page, 2);
        await playArea.zoneBlueBtn.shouldHaveText(page, 2);

        console.log('Check elements of Under/Over Area');
        await playArea.underOverLabel.shouldHaveText(page, 2);
        await playArea.underBtn.shouldHaveText(page, 2);
        await playArea.overBtn.shouldHaveText(page, 2);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select number (Combo 3)', async ({}, testInfo) => {
      try {
        await playArea.mainNumberBtn.get(page, 20, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select symbol (Combo 3)', async ({}, testInfo) => {
      try {
        await playArea.wheelImage.get(page, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select zone (Combo 3)', async ({}, testInfo) => {
      try {
        await playArea.zoneBlueBtn.get(page, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select under/over (Combo 3)', async ({}, testInfo) => {
      try {
        await playArea.overBtn.get(page, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check side screen (Combo 3)', async ({}, testInfo) => {
      try {
        console.log('Was not implemented on spectron. Must be done on playwright');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test(`Clear All before betslip`, async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await playArea.quickPickButton.get(page, 0).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields for Random Pick', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0.5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

export { runTests };
