// playwright/common/powerspinOnFire/psOnFireBetslit_common.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyGames from '#/pageObjects/lobbyGames';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import settings from '#/pageObjects/powerspinOnFire/psOnFireSettings';
import playArea from '#/pageObjects/powerspinOnFire/psOnFirePlayArea';
import sideScreen from '#/pageObjects/powerspinOnFire/psOnFireSideScreen';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
    await lobbyGames.powerspinOnFire.get(page).click();
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Prepare a full betslip to check all betslip fields', () => {
    test('Check empty betslip fields', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        for (let area = 1; area <= 3; area++) {
          await sideScreen.sideScreenBet.betslipArea.isHidden(page, area);
        }
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
        await sideScreen.sideScreenBet.addBetslip.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (A Area), Add new bet (B Area) and Check options', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
        await settings.optionsButtons.isActive(page, 1);
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await settings.optionsButtons.isDisabled(page, 1);
        await settings.optionsButtons.isActive(page, 2);
        await settings.optionsButtons.isEnabled(page, 4);
        await settings.optionsButtons.isEnabled(page, 8);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (B Area), Add new bet (C Area) and Check options', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
        await settings.optionsButtons.isActive(page, 2);
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await settings.optionsButtons.isDisabled(page, 1);
        await settings.optionsButtons.isDisabled(page, 2);
        await settings.optionsButtons.isActive(page, 4);
        await settings.optionsButtons.isEnabled(page, 8);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (C Area), Add new bet (D Area) and Check options', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
        await settings.optionsButtons.isActive(page, 4);
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await settings.optionsButtons.isDisabled(page, 1);
        await settings.optionsButtons.isDisabled(page, 2);
        await settings.optionsButtons.isDisabled(page, 4);
        await settings.optionsButtons.isActive(page, 8);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (D Area) and Check options', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
        await settings.optionsButtons.isDisabled(page, 1);
        await settings.optionsButtons.isDisabled(page, 2);
        await settings.optionsButtons.isDisabled(page, 4);
        await settings.optionsButtons.isActive(page, 8);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Add new bet not allowed after 4 bets', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check filled betslip fields (A - D Area)', async ({}, testInfo) => {
      try {
        for (let i = 0; i <= 3; i++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, i);
          await sideScreen.sideScreenBet.betslipArea.options.shouldHaveText(page, i);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, i, '0.5€');
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, i);
        }
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);

        await sideScreen.submit.betslipCost.shouldHaveText(page, '2€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('PowerspinOnFire Modal Clear all previous betslip fields', () => {
    const clearAreas = ['D', 'C', 'B', 'A'];

    clearAreas.forEach((area, index) => {
      test(`Select Clear Area ${area} and discard Clear Area ${area} from betslip`, async ({}, testInfo) => {
        try {
          console.log(`Clear Area ${area}`);
          await sideScreen.sideScreenBet.betslipArea.clear.get(page, 3 - index).click();
          console.log(`Discard Clear Area ${area}`);
          await sideScreen.clearModal.title.shouldHaveText(page);
          await sideScreen.clearModal.message.shouldHaveText(page);
          await sideScreen.clearModal.yes.shouldHaveText(page);
          await sideScreen.clearModal.no.shouldHaveText(page);
          await sideScreen.clearModal.no.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    });

    test('Select Clear All and Discard', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.shouldHaveText(page);
        await lobbyHeader.clearAll.get(page).click();

        await lobbyHeader.clearAll.txt.shouldHaveText(page);
        await lobbyHeader.clearAll.no.shouldHaveText(page);
        await lobbyHeader.clearAll.yes.shouldHaveText(page);
        await lobbyHeader.clearAll.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check filled betslip fields', async ({}, testInfo) => {
      try {
        for (let i = 0; i <= 3; i++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, i);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, i, '0.5€');
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, i);
        }
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);
        console.log('Check submit fields');
        await sideScreen.submit.betslipCost.shouldHaveText(page, '2€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Clear D from sidescreen', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 3).click();

        await sideScreen.sideScreenBet.betslipArea.clear.txt.shouldHaveText(page);
        await sideScreen.sideScreenBet.betslipArea.clear.no.shouldHaveText(page);
        await sideScreen.sideScreenBet.betslipArea.clear.yes.shouldHaveText(page);
        await sideScreen.sideScreenBet.betslipArea.clear.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check filled betslip fields A B and C and options', async ({}, testInfo) => {
      try {
        for (let i = 0; i <= 2; i++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, i);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, i, '0.5€');
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, i);
        }
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);
        console.log('Check submit fields');
        await sideScreen.submit.betslipCost.shouldHaveText(page, '1.5€');
        console.log('Check settings options fields');
        await settings.optionsButtons.isDisabled(page, 1);
        await settings.optionsButtons.isDisabled(page, 2);
        await settings.optionsButtons.isActive(page, 4);
        await settings.optionsButtons.isEnabled(page, 8);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Clear C from play area', async ({}, testInfo) => {
      try {
        await playArea.clear.icon.get(page).click();

        await sideScreen.sideScreenBet.betslipArea.clear.txt.shouldHaveText(page);
        await sideScreen.sideScreenBet.betslipArea.clear.no.shouldHaveText(page);
        await sideScreen.sideScreenBet.betslipArea.clear.yes.shouldHaveText(page);
        await sideScreen.sideScreenBet.betslipArea.clear.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check filled betslip fields A and B and options', async ({}, testInfo) => {
      try {
        for (let i = 0; i <= 1; i++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, i);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, i, '0.5€');
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, i);
        }
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);
        console.log('Check submit fields');
        await sideScreen.submit.betslipCost.shouldHaveText(page, '1€');
        console.log('Check settings options fields');
        await settings.optionsButtons.isDisabled(page, 1);
        await settings.optionsButtons.isActive(page, 2);
        await settings.optionsButtons.isEnabled(page, 4);
        await settings.optionsButtons.isEnabled(page, 8);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Clear All and Confirm', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.shouldHaveText(page);
        await lobbyHeader.clearAll.get(page).click();

        await lobbyHeader.clearAll.txt.shouldHaveText(page);
        await lobbyHeader.clearAll.no.shouldHaveText(page);
        await lobbyHeader.clearAll.yes.shouldHaveText(page);
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Side Screen inside PowerspinOnFire - Empty', async ({}, testInfo) => {
      try {
        console.log('Check bet slip fields');
        await sideScreen.sideScreenBet.isVisible(page);
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
        await sideScreen.sideScreenBet.addBetslip.shouldHaveText(page);

        for (let i = 1; i <= 3; i++) {
          await sideScreen.sideScreenBet.betslipArea.isHidden(page, i);
        }

        console.log('Check submit fields');
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.info.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€');

        console.log('Check settings options fields');
        await settings.optionsButtons.isActive(page, 1);
        await settings.optionsButtons.isEnabled(page, 2);
        await settings.optionsButtons.isEnabled(page, 4);
        await settings.optionsButtons.isEnabled(page, 8);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('PowerspinOnFire Consecutive Draws Calculator Flow', () => {
    test('Open consecutive draws fields calculator', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check consecutive draws fields calculator', async ({}, testInfo) => {
      try {
        for (let i = 0; i <= 9; i++) {
          await sideScreen.consecutiveDraws.keypadDraws.isVisible(page, i);
          await sideScreen.consecutiveDraws.keypadDraws.shouldHaveText(page, i);
        }
        await sideScreen.consecutiveDraws.keypadDrawsClear.isVisible(page);
        await sideScreen.consecutiveDraws.keypadDrawsOK.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a value out of allowed range i.e. 888 and check msg', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();

        await sideScreen.consecutiveDraws.keypadDrawsMessage.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Clear value of consecutive draws fields calculator', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsClear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check default value of consecutive draws fields calculator', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
