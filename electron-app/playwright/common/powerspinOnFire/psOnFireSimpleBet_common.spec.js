// playwright/common/powerspinOnFire/psOnFireSimpleBet_common.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
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

  test.describe('Check Statistics', () => {
    test('Check Statistics fields (basic and wheel numbers)', async ({}, testInfo) => {
      try {
        await playArea.statistics.title.shouldHaveText(page);
        await playArea.statistics.switch.shouldHaveText(page);
        await playArea.statistics.text.notExist(page);

        await playArea.mainNumbersTxt.shouldHaveText(page);

        await playArea.alternateView.get(page).click();
        await playArea.mainNumbersTxt.shouldHaveText(page, 'alternateView');
        await playArea.wheelCircle.isVisible(page);

        await playArea.statistics.title.shouldHaveText(page);
        await playArea.statistics.switch.shouldHaveText(page);

        await playArea.mainNumbersTxt.shouldHaveText(page, 'alternateView');
        await playArea.alternateView.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Statistics Occurance', async ({}, testInfo) => {
      try {
        await playArea.statistics.switch.occurance.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check select PowerspinOnFire Statistics main numbers field (Occurance)', async ({}, testInfo) => {
      try {
        for (let value = 1; value <= 34; value++) {
          await playArea.mainNumbersStatisticsTxt.isVisible(page, value);
        }
        await playArea.statistics.text.shouldHaveText(page, 'occurrences');

        await playArea.alternateView.get(page).click();
        await playArea.wheelCircle.isVisible(page);

        for (let value = 1; value <= 34; value++) {
          await playArea.mainNumbersStatisticsTxt.isVisible(page, value);
        }
        await playArea.statistics.text.shouldHaveText(page, 'occurrences');

        await playArea.alternateView.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Statistics Delays', async ({}, testInfo) => {
      try {
        await playArea.statistics.switch.delays.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check select PowerspinOnFire Statistics main numbers field (Delays)', async ({}, testInfo) => {
      try {
        for (let value = 1; value <= 34; value++) {
          await playArea.mainNumbersStatisticsTxt.isVisible(page, value);
        }
        await playArea.statistics.text.shouldHaveText(page, 'delays');
        await playArea.alternateView.get(page).click();
        await playArea.wheelCircle.isVisible(page);

        for (let value = 1; value <= 34; value++) {
          await playArea.mainNumbersStatisticsTxt.isVisible(page, value);
        }
        await playArea.statistics.text.shouldHaveText(page, 'delays');

        await playArea.alternateView.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Statistics Middle - Default', async ({}, testInfo) => {
      try {
        await playArea.statistics.switch.middle.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check select PowerspinOnFire NOT Statistics main numbers field (Default)', async ({}, testInfo) => {
      try {
        await playArea.mainNumbersTxt.shouldHaveText(page);
        await playArea.statistics.text.notExist(page);

        await playArea.alternateView.get(page).click();
        await playArea.wheelCircle.isVisible(page);

        await playArea.mainNumbersTxt.shouldHaveText(page, 'alternateView');
        await playArea.alternateView.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Prepare a simple betslip to check all betslip fields', () => {
    // check simple 1, 1-2, 1-3, 1-4, 1-5, 1-7, 1-8, 1-34 + random pick
    const testCases = [
      { title: '1', main: [1], costN: '0.5€', cost2: '0€', cost4: '0€', cost8: '0€', O: '0€' },
      { title: '1-2', main: [1, 2], costN: '1€', cost2: '0.5€', cost4: '0€', cost8: '0€', O: '0€' },
      { title: '1-3', main: [1, 2, 3], costN: '1.5€', cost2: '1.5€', cost4: '0€', cost8: '0€', O: '0€' },
      { title: '1-4', main: [1, 2, 3, 4], costN: '2€', cost2: '3€', cost4: '0.5€', cost8: '0€', O: '0€' },
      { title: '1-5', main: [1, 2, 3, 4, 5], costN: '2.5€', cost2: '5€', cost4: '2.5€', cost8: '0€', O: '0€' },
      { title: '17', main: [1, 2, 3, 4, 5, 6, 7], costN: '3.5€', cost2: '10.5€', cost4: '17.5€', cost8: '0€', O: '0€' },
      { title: '18', main: [1, 2, 3, 4, 5, 6, 7, 8], costN: '4€', cost2: '14€', cost4: '35€', cost8: '0.5€', O: '0€' },
      {
        title: '1-34',
        main: Array.from({ length: 34 }, (_, i) => i + 1),
        costN: '17€',
        cost2: '280.5€',
        cost4: '23188€',
        cost8: '9078102€',
        O: '0€',
      },
    ];

    testCases.forEach(({ title, main, costN, cost2, cost4, cost8, O }) => {
      test(`Clear All before ${title} betslip`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
          await playArea.alternateView.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select PowerspinOnFire numbers for ${title}`, async ({}, testInfo) => {
        try {
          for (const m of main) await playArea.mainNumberBtn.get(page, m).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for ${title}`, async ({}, testInfo) => {
        try {
          await settings.optionsButtons.get(page, 1).click();
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, costN);
          await settings.optionsButtons.get(page, 2).click();
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, O);
          for (const m of main) await playArea.mainNumberBtn.get(page, m).click();
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost2);
          await settings.optionsButtons.get(page, 4).click();
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, O);
          for (const m of main) await playArea.mainNumberBtn.get(page, m).click();
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost4);
          await settings.optionsButtons.get(page, 8).click();
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, O);
          for (const m of main) await playArea.mainNumberBtn.get(page, m).click();
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost8);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    });

    test('Select Random Pick table - Octuple', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields for Random Pick - Octuple', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0.5€');
        await settings.optionsButtons.get(page, 4).click();
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
        await settings.quickPickBtn.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0.5€');
        await settings.optionsButtons.get(page, 2).click();
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
        await settings.quickPickBtn.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0.5€');
        await settings.optionsButtons.get(page, 1).click();
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
        await settings.quickPickBtn.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0.5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Random Pick table - Number', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields for Random Pick - Number', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0.5€');
        await settings.optionsButtons.get(page, 2).click();
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
        await settings.optionsButtons.get(page, 4).click();
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
        await settings.optionsButtons.get(page, 8).click();
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

export { runTests };
