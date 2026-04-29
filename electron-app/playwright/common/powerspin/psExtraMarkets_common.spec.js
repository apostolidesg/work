// playwright/common/powerspin/psExtraMarkets_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyGames from '#/pageObjects/lobbyGames';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import header from '#/pageObjects/powerspin/psHeader';
import sideScreen from '#/pageObjects/powerspin/psSideScreen';
import extraMarkets from '#/pageObjects/powerspin/psExtraMarkets';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
    await lobbyGames.powerspin.get(page).click();
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Powerspin - Extra Markets', () => {
    test('Select Extra Markets', async ({}, testInfo) => {
      try {
        await header.extraMarkets.shouldHaveText(page);
        await header.extraMarkets.inactive.isVisible(page);
        await header.extraMarkets.get(page).click();
        await header.extraMarkets.active.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Number Market Elements', async ({}, testInfo) => {
      try {
        await extraMarkets.number.label.shouldHaveText(page);
        for (let i = 1; i <= 24; i++) {
          await extraMarkets.number.btn.shouldHaveText(page, i);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Wheel Symbol Market Elements', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.label.shouldHaveText(page);
        await extraMarkets.wheelSymbol.noneBtn.shouldHaveText(page);
        await extraMarkets.wheelSymbol.atLeastOneBtn.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Wheel Number Market Elements', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.label.shouldHaveText(page);
        await extraMarkets.wheelNumber.twoBtn.shouldHaveText(page);
        await extraMarkets.wheelNumber.threeBtn.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Numbers (text + disabled state)', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultiplierLabel.shouldHaveText(page);
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '0.5€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '1€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '2€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '3€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '5€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '10€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '15€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '20€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '25€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '30€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '40€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '50€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '100€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '200€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '500€');

        await extraMarkets.number.betMultipliers.isDisabled(page, '0.5€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '1€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '2€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '3€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '5€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '10€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '15€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '20€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '25€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '30€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '40€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '50€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '100€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '200€');
        await extraMarkets.number.betMultipliers.isDisabled(page, '500€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Symbol (text + disabled state)', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultiplierLabel.shouldHaveText(page);
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '0.5€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '1€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '2€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '3€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '5€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '10€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '15€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '20€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '25€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '30€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '40€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '50€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '100€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '200€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '500€');

        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '0.5€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '1€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '2€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '3€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '5€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '10€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '15€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '20€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '25€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '30€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '40€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '50€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '100€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '200€');
        await extraMarkets.wheelSymbol.betMultipliers.isDisabled(page, '500€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Number (text + disabled state)', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultiplierLabel.shouldHaveText(page);
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '0.5€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '1€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '2€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '3€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '5€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '10€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '15€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '20€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '25€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '30€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '40€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '50€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '100€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '200€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '500€');

        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '0.5€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '1€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '2€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '3€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '5€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '10€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '15€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '20€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '25€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '30€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '40€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '50€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '100€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '200€');
        await extraMarkets.wheelNumber.betMultipliers.isDisabled(page, '500€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    // Check Place bet functionality
    test('Select Values from All Extra Markets', async ({}, testInfo) => {
      try {
        await extraMarkets.number.btn.get(page, 1).click();
        await extraMarkets.number.btn.get(page, 7).click();
        await extraMarkets.number.btn.get(page, 18).click();
        await extraMarkets.wheelSymbol.noneBtn.get(page).click();
        await extraMarkets.wheelNumber.twoBtn.get(page).click();
        await extraMarkets.wheelNumber.threeBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Numbers (text + enabled state)', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultiplierLabel.shouldHaveText(page);
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '0.5€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '1€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '2€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '3€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '5€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '10€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '15€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '20€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '25€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '30€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '40€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '50€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '100€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '200€');
        await extraMarkets.number.betMultipliers.shouldHaveText(page, '500€');

        await extraMarkets.number.betMultipliers.isChecked(page, '0.5€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '1€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '2€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '3€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '5€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '10€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '15€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '20€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '25€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '30€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '40€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '50€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '100€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '200€');
        await extraMarkets.number.betMultipliers.isEnabled(page, '500€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Symbol (text + enabled state)', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultiplierLabel.shouldHaveText(page);
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '0.5€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '1€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '2€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '3€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '5€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '10€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '15€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '20€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '25€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '30€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '40€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '50€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '100€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '200€');
        await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, '500€');

        await extraMarkets.wheelSymbol.betMultipliers.isChecked(page, '0.5€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '1€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '2€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '3€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '5€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '10€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '15€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '20€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '25€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '30€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '40€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '50€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '100€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '200€');
        await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, '500€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Number (text + enabled state)', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultiplierLabel.shouldHaveText(page);
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '0.5€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '1€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '2€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '3€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '5€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '10€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '15€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '20€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '25€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '30€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '40€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '50€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '100€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '200€');
        await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, '500€');

        await extraMarkets.wheelNumber.betMultipliers.isChecked(page, '0.5€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '1€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '2€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '3€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '5€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '10€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '15€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '20€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '25€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '30€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '40€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '50€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '100€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '200€');
        await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, '500€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on sidescreen (localized & detailed)', async ({}, testInfo) => {
      try {
        // === NUMBER (AW) ===
        await sideScreen.sideScreenBet.number.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.number.cost.shouldHaveText(page, '1.5€');
        await sideScreen.sideScreenBet.number.content.shouldHaveText(page, '1 7 18');
        // await sideScreen.sideScreenBet.number.clear.isVisible(); // not working but we click it later

        // === SYMBOL IN ===
        await sideScreen.sideScreenBet.wheelSymbol.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelSymbol.cost.shouldHaveText(page, '0.5€');
        await sideScreen.sideScreenBet.wheelSymbol.content.shouldHaveText(page);
        // await sideScreen.sideScreenBet.wheelSymbol.clear.isVisible(); // not working but we click it later

        // === SAME NUMBER IN ===
        await sideScreen.sideScreenBet.wheelNumber.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelNumber.cost.shouldHaveText(page, '1€');
        await sideScreen.sideScreenBet.wheelNumber.content.shouldHaveText(page);
        // await sideScreen.sideScreenBet.wheelNumber.clear.isVisible(); // not working but we click it later
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Submit Button and Cost Label - 3', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '3€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Clear Submit Button and Cost Label', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.wheelNumber.clear.get(page).click();
        await sideScreen.sideScreenBet.wheelSymbol.clear.get(page).click();
        await sideScreen.sideScreenBet.number.clear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Submit Button and Cost Label - 0', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Values from All Extra Market', async ({}, testInfo) => {
      try {
        await extraMarkets.number.btn.get(page, 1).click();
        await extraMarkets.number.btn.get(page, 7).click();
        await extraMarkets.number.btn.get(page, 18).click();
        await extraMarkets.wheelSymbol.noneBtn.get(page).click();
        await extraMarkets.wheelNumber.twoBtn.get(page).click();
        await extraMarkets.wheelNumber.threeBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Clear All and Verify Reset', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

export { runTests };
