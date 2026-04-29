// playwright/common/kino/kinoStandardBet/kinoStandardBetQuickPick_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import oddEvenColumns from '#/pageObjects/kino/kinoOddEvenColumns';
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

  test.describe('Check functionality of Winnings Table by selecting numbers', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    const areaNames = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let areaIndex = 1; areaIndex <= 6; areaIndex++) {
      const areaLetter = areaNames[areaIndex - 1];

      for (let x = 1; x <= 12; x++) {
        test(`Select game type ${x} (Area ${areaLetter})`, async ({}, testInfo) => {
          try {
            await settings.quickPickBtn.up.get(page).click();
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });

        test(`Select quick pick ${x} (Area ${areaLetter})`, async ({}, testInfo) => {
          try {
            await settings.quickPickBtn.img.get(page).click();
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });

        test(`Check that the appropriate number of KINO numbers are randomly selected ${x} (Area ${areaLetter})`, async ({}, testInfo) => {
          try {
            const visibleCount = x;

            await sideScreen.sideScreenBet.betslipArea.isVisible(page, areaIndex);
            await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areaIndex, visibleCount);

            for (let i = 1; i <= visibleCount; i++) {
              await sideScreen.sideScreenBet.betslipArea.numberBall.isVisible(page, areaIndex, i);
              await sideScreen.sideScreenBet.betslipArea.numberBall.shouldHaveText(page, areaIndex, i);
            }

            for (let i = visibleCount + 1; i <= 12; i++) {
              await sideScreen.sideScreenBet.betslipArea.numberBall.isHidden(page, areaIndex, i);
            }
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });
      }

      test(`Select quick pick 12 (${areaLetter} Area) `, async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.img.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check that the appropriate number of KINO numbers are randomly selected 12 (${areaLetter} Area)  `, async ({}, testInfo) => {
        try {
          const visibleCount = 12;

          await sideScreen.sideScreenBet.betslipArea.isVisible(page, areaIndex);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areaIndex, visibleCount);

          for (let i = 1; i <= visibleCount; i++) {
            await sideScreen.sideScreenBet.betslipArea.numberBall.isVisible(page, areaIndex, i);
            await sideScreen.sideScreenBet.betslipArea.numberBall.shouldHaveText(page, areaIndex, i);
          }

          for (let i = visibleCount + 1; i <= 12; i++) {
            await sideScreen.sideScreenBet.betslipArea.numberBall.isHidden(page, areaIndex, i);
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select quick pick 12 (${areaLetter} Area)  `, async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.img.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check that the appropriate number of KINO numbers are randomly selected 12 (${areaLetter} Area) `, async ({}, testInfo) => {
        try {
          const visibleCount = 12;

          await sideScreen.sideScreenBet.betslipArea.isVisible(page, areaIndex);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areaIndex, visibleCount);

          for (let i = 1; i <= visibleCount; i++) {
            await sideScreen.sideScreenBet.betslipArea.numberBall.isVisible(page, areaIndex, i);
            await sideScreen.sideScreenBet.betslipArea.numberBall.shouldHaveText(page, areaIndex, i);
          }

          for (let i = visibleCount + 1; i <= 12; i++) {
            await sideScreen.sideScreenBet.betslipArea.numberBall.isHidden(page, areaIndex, i);
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      if (areaIndex < 6) {
        test(`Add new bet (${areaLetter} Area)`, async ({}, testInfo) => {
          try {
            await sideScreen.sideScreenBet.addBetslip.get(page).click();
            await sideScreen.sideScreenBet.betslipArea.isVisible(page, areaIndex);
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });
      }
    }

    //Check quick pick field for all areas

    const areaNames1 = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let areaIndex1 = 1; areaIndex1 <= 6; areaIndex1++) {
      const areaLetter1 = areaNames1[areaIndex1 - 1];

      test(`Select Area ${areaLetter1} from Betslip`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.get(page, areaIndex1).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check quick pick field (${areaLetter1} Area)`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areaIndex1, 12);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    //Check the quick pick tab

    const areaNames2 = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let areaIndex2 = 1; areaIndex2 <= 6; areaIndex2++) {
      const areaLetter2 = areaNames2[areaIndex2 - 1];

      test(`Select Area ${areaLetter2} from Betslip `, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.get(page, areaIndex2).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Open Quick Pick tab (${areaLetter2} Area)`, async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.input.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select Quick Pick game type 1 (${areaLetter2} Area)`, async ({}, testInfo) => {
        try {
          await settings.quickPickNumberBtn.get(page, 1).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Select quick pick (${areaLetter2} Area)`, async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.img.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check Quick Pick tab fields (${areaLetter2} Area)`, async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.input.shouldHaveText(page, '1');

          for (let number = 1; number <= 12; number++) {
            await settings.quickPickNumberBtn.shouldHaveText(page, number);
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check that the appropriate number of KINO numbers are randomly selected 1 (${areaLetter2} Area)  `, async ({}, testInfo) => {
        try {
          const visibleCount = 1;

          await sideScreen.sideScreenBet.betslipArea.isVisible(page, areaIndex2);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areaIndex2, visibleCount);

          for (let i = 1; i <= visibleCount; i++) {
            await sideScreen.sideScreenBet.betslipArea.numberBall.isVisible(page, areaIndex2, i);
            await sideScreen.sideScreenBet.betslipArea.numberBall.shouldHaveText(page, areaIndex2, i);
          }

          for (let i = visibleCount + 1; i <= 12; i++) {
            await sideScreen.sideScreenBet.betslipArea.numberBall.isHidden(page, areaIndex2, i);
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check quick pick field (${areaLetter2} Area) `, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areaIndex2, 1);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    // Check quick pick field for all areas

    const areaNames3 = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let areaIndex3 = 1; areaIndex3 <= 6; areaIndex3++) {
      const areaLetter3 = areaNames3[areaIndex3 - 1];

      test(`Select Area ${areaLetter3} from Betslip  `, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.get(page, areaIndex3).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check Quick Pick tab fields (${areaLetter3} Area) `, async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.input.shouldHaveText(page, '1');

          for (let number = 1; number <= 12; number++) {
            await settings.quickPickNumberBtn.shouldHaveText(page, number);
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }
  });
}

module.exports = { runTests };
