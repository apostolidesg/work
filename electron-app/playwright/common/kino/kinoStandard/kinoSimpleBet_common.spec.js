// playwright/common/kino/kinoStandard/kinoSimpleBet_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import settings from '#/pageObjects/kino/kinoSettings';
import playArea from '#/pageObjects/kino/kinoPlayArea';
import sideScreen from '#/pageObjects/kino/kinoSideScreen';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Prepare a full betslip to check all betslip fields', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    const scenarios = [
      { area: 'A', betslipIndex: 1 },
      { area: 'B', betslipIndex: 2 },
      { area: 'C', betslipIndex: 3 },
      { area: 'D', betslipIndex: 4 },
      { area: 'E', betslipIndex: 5 },
      { area: 'F', betslipIndex: 6 },
    ];

    for (const { area, betslipIndex } of scenarios) {
      test(`Select game type 1 (${area} Area)`, async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.up.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select quick pick (${area} Area)`, async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.img.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select KINO Bonus (${area} Area)`, async ({}, testInfo) => {
        try {
          await settings.kinoBonus.checkbox.get(page).click();
          await settings.kinoBonus.checkbox.isTrue(page);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check betslip field (${area} Area)`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isHidden(page, betslipIndex + 1);
          if (area !== 'F') {
            await sideScreen.sideScreenBet.addBetslip.get(page).click();
            await sideScreen.sideScreenBet.betslipArea.isVisible(page, betslipIndex + 1);
          } else {
            await sideScreen.sideScreenBet.addBetslip.isHidden(page);
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Check betslip fields', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        const areas = ['A', 'B', 'C', 'D', 'E', 'F'];
        for (let i = 1; i < areas.length; i++) {
          const area = i;
          const label = areas[i];

          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '1,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        await sideScreen.sideScreenBet.addBetslip.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

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
        }
        await sideScreen.consecutiveDraws.keypadDrawsClear.isVisible(page);
        await sideScreen.consecutiveDraws.keypadDrawsOK.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a value out of allowed range', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check message of consecutive draws fields calculator', async ({}, testInfo) => {
      try {
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

    test('Check default value of consecutive draws input', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Check modal elements of KINO Standard Bet', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    const areas = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let i = 1; i < areas.length; i++) {
      const area = areas[i];

      test(`Select Clear Area ${area} from betslip`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.clear.get(page, i).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Discard Clear Area ${area} from betslip`, async ({}, testInfo) => {
        try {
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
    }

    test('Select Clear All from betslip and Confirm', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields empty', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, 1);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 1, '0,00€');
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '0');

        await sideScreen.sideScreenBet.addBetslip.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
