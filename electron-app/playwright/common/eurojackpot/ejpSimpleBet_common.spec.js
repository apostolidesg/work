// playwright/common/eurojackpot/ejpSimpleBet_common.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import playArea from '#/pageObjects/eurojackpot/ejpPlayArea';
import sideScreen from '#/pageObjects/eurojackpot/ejpSideScreen';
import settings from '#/pageObjects/eurojackpot/ejpSettings';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
    await lobbyGames.eurojackpot.get(page).click();
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Check Statistics', () => {
    test('Check Statistics fields (main and euro numbers)', async ({}, testInfo) => {
      try {
        await playArea.statisticsTitle.shouldHaveText(page);
        await playArea.statisticsSwitch.shouldHaveText(page);

        for (let value = 1; value <= 50; value++) {
          await playArea.mainNumbersStatisticsTxt.shouldBeEmpty(page, value);
        }

        for (let value = 1; value <= 12; value++) {
          await playArea.euroNumbersStatisticsTxt.shouldBeEmpty(page, value);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Statistics Occurance', async ({}, testInfo) => {
      try {
        await playArea.statisticsSwitch.occurance.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check select Eurojackpot Statistics main and euro numbers field (Occurance)', async ({}, testInfo) => {
      try {
        for (let value = 1; value <= 50; value++) {
          await playArea.mainNumbersStatisticsTxt.isVisible(page, value);
        }
        for (let value = 1; value <= 12; value++) {
          await playArea.euroNumbersStatisticsTxt.isVisible(page, value);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Statistics Delays', async ({}, testInfo) => {
      try {
        await playArea.statisticsSwitch.delays.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check select Eurojackpot Statistics main and euro numbers field (Delays)', async ({}, testInfo) => {
      try {
        for (let value = 1; value <= 50; value++) {
          await playArea.mainNumbersStatisticsTxt.isVisible(page, value);
        }
        for (let value = 1; value <= 12; value++) {
          await playArea.euroNumbersStatisticsTxt.isVisible(page, value);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Statistics Middle Default', async ({}, testInfo) => {
      try {
        await playArea.statisticsSwitch.middle.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check select Eurojackpot NOT Statistics main and euro numbers field (Default)', async ({}, testInfo) => {
      try {
        for (let value = 1; value <= 50; value++) {
          await playArea.mainNumbersStatisticsTxt.shouldBeEmpty(page, value);
        }
        for (let value = 1; value <= 12; value++) {
          await playArea.euroNumbersStatisticsTxt.shouldBeEmpty(page, value);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Prepare a simple betslip to check all betslip fields', () => {
    // check simple 4+1, 4+2, 4+3, 5+1, 5+2, 6+2, 6+3, 7+3, 8+4, 30+7 + random pick
    const testCases = [
      { title: '4+1', main: [1, 2, 3, 4], euro: [1], cost: '0€' },
      { title: '4+2', main: [1, 2, 3, 4], euro: [1, 2], cost: '0€' },
      { title: '4+3', main: [1, 2, 3, 4], euro: [1, 2, 3], cost: '0€' },
      { title: '5+1', main: [1, 2, 3, 4, 5], euro: [1], cost: '0€' },
      { title: '5+2', main: [1, 2, 3, 4, 5], euro: [1, 2], cost: '2€' },
      { title: '6+2', main: [1, 2, 3, 4, 5, 6], euro: [1, 2], cost: '12€' },
      { title: '6+3', main: [1, 2, 3, 4, 5, 6], euro: [1, 2, 3], cost: '36€' },
      { title: '7+3', main: [1, 2, 3, 4, 5, 6, 7], euro: [1, 2, 3], cost: '126€' },
      { title: '8+4', main: [1, 2, 3, 4, 5, 6, 7, 8], euro: [1, 2, 3, 4], cost: '672€' },
      {
        title: '30+7',
        main: Array.from({ length: 30 }, (_, i) => i + 1),
        euro: [1, 2, 3, 4, 5, 6, 7],
        cost: '5985252€',
      },
    ];

    testCases.forEach(({ title, main, euro, cost }) => {
      test(`Clear All before ${title} betslip`, async ({}, testInfo) => {
        try {
          await lobbyHeader.clearAll.get(page).click();
          await lobbyHeader.clearAll.yes.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select Eurojackpot numbers for ${title}`, async ({}, testInfo) => {
        try {
          for (const m of main) await playArea.mainNumberBtn.get(page, m).click();
          for (const e of euro) await playArea.euroNumberBtn.get(page, e).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip fields for ${title}`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, cost);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    });

    test('Select Random Pick table', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields for Random Pick', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '5985252€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

export { runTests };
