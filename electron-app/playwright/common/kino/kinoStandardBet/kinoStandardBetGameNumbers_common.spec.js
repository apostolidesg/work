// playwright/common/kino/kinoStandardBet/kinoStandardBetGameNumbers_common.spec.js
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

  test.describe('Check KINO Bet Game Numbers functionality', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    // Area A is selected by default
    test('Check no game numbers are selected', async ({}, testInfo) => {
      try {
        for (let i = 1; i <= 80; i++) {
          await playArea.numberBtn.isFalse(page, i);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    const areaNames = ['A', 'B', 'C', 'D', 'E', 'F'];
    const betCosts = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€'];

    for (let areaIndex = 1; areaIndex <= 6; areaIndex++) {
      const areaLetter = areaNames[areaIndex - 1];
      const expectedCost = betCosts[areaIndex - 1];

      const testCases = [75, 13, 5, 80, 79, 78, 77, 40, 41, 42, 43, 44];
      const selectedSoFar = [];

      for (const selectedNumber of testCases) {
        const visibleCount = selectedSoFar.length + 1;
        const selectedNumbers = [...selectedSoFar, selectedNumber]; // preview before mutation

        test(`Select a KINO number ${selectedNumbers} (Area ${areaLetter})`, async ({}, testInfo) => {
          try {
            await playArea.numberBtn.get(page, selectedNumber).click();
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });

        test(`Check Quick Pick tab fields empty ${selectedNumbers} (Area ${areaLetter})`, async ({}, testInfo) => {
          try {
            await settings.quickPickBtn.input.shouldHaveText(page, '');
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });

        test(`Check no game numbers are selected ${selectedNumbers} (Area ${areaLetter})`, async ({}, testInfo) => {
          try {
            for (let i = 1; i <= 80; i++) {
              if (selectedNumbers.includes(i)) {
                await playArea.numberBtn.isTrue(page, i);
              } else {
                await playArea.numberBtn.isFalse(page, i);
              }
            }
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });

        test(`Check approve and print fields ${expectedCost} ${selectedNumbers} (Area ${areaLetter})`, async ({}, testInfo) => {
          try {
            await sideScreen.submit.isVisible(page);
            await sideScreen.submit.placeBet.shouldHaveText(page);
            await sideScreen.submit.betslipCost.shouldHaveText(page, expectedCost);
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });

        test(`Check that the appropriate number of KINO numbers are randomly selected ${selectedNumbers} (Area ${areaLetter})`, async ({}, testInfo) => {
          try {
            await sideScreen.sideScreenBet.betslipArea.isVisible(page, areaIndex);
            await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areaIndex, visibleCount);

            for (let i = 1; i <= 12; i++) {
              if (i <= visibleCount) {
                await sideScreen.sideScreenBet.betslipArea.numberBall.isVisible(page, areaIndex, i);
                await sideScreen.sideScreenBet.betslipArea.numberBall.shouldHaveText(page, areaIndex, i);
              } else {
                await sideScreen.sideScreenBet.betslipArea.numberBall.isHidden(page, areaIndex, i);
              }
            }
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });

        selectedSoFar.push(selectedNumber); // now we push AFTER test generation
      }

      test(`Select a KINO number 45 (Area ${areaLetter})`, async ({}, testInfo) => {
        try {
          await playArea.numberBtn.get(page, 45).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check that number is not selected 45 (Area ${areaLetter})`, async ({}, testInfo) => {
        try {
          for (let i = 1; i <= 80; i++) {
            if (testCases.includes(i)) {
              await playArea.numberBtn.isTrue(page, i);
            } else {
              await playArea.numberBtn.isFalse(page, i);
            }
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check approve and print fields ${expectedCost} 45 (Area ${areaLetter})`, async ({}, testInfo) => {
        try {
          await sideScreen.submit.isVisible(page);
          await sideScreen.submit.placeBet.shouldHaveText(page);
          await sideScreen.submit.betslipCost.shouldHaveText(page, expectedCost);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check that the appropriate number of KINO numbers are randomly selected 45 (Area ${areaLetter})`, async ({}, testInfo) => {
        try {
          const visibleCount1 = testCases.length;

          await sideScreen.sideScreenBet.betslipArea.isVisible(page, areaIndex);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areaIndex, visibleCount1);

          for (let i = 1; i <= 13; i++) {
            if (i <= visibleCount1) {
              await sideScreen.sideScreenBet.betslipArea.numberBall.isVisible(page, areaIndex, i);
              await sideScreen.sideScreenBet.betslipArea.numberBall.shouldHaveText(page, areaIndex, i);
            } else {
              await sideScreen.sideScreenBet.betslipArea.numberBall.isHidden(page, areaIndex, i);
            }
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
  });

  test.describe('Check that all 80 numbers are selectable/unselectable', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select Clear All from betslip and Confirm', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    // Area A is selected by default
    test('Check no game numbers are selected', async ({}, testInfo) => {
      try {
        for (let i = 1; i <= 80; i++) {
          await playArea.numberBtn.isFalse(page, i);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    for (let num = 0; num <= 70; num += 10) {
      // const testCases = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const testCases = [1 + num, 2 + num, 3 + num, 4 + num, 5 + num, 6 + num, 7 + num, 8 + num, 9 + num, 10 + num];
      const selectedSoFar = [];

      for (const selectedNumber of testCases) {
        const selectedNumbers = [...selectedSoFar, selectedNumber]; // preview before mutation

        test(`Select a KINO number ${selectedNumbers}  (Area A)`, async ({}, testInfo) => {
          try {
            await playArea.numberBtn.get(page, selectedNumber).click();
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });
        selectedSoFar.push(selectedNumber); // now we push AFTER test generation
      }

      test(`Check no game numbers are selected ${testCases}  (Area A)`, async ({}, testInfo) => {
        try {
          for (let i = 1; i <= 80; i++) {
            if (testCases.includes(i)) {
              await playArea.numberBtn.isTrue(page, i);
            } else {
              await playArea.numberBtn.isFalse(page, i);
            }
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check that the appropriate number of KINO numbers are randomly selected ${testCases}  (Area A)`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, 10);

          for (let i = 1; i <= 12; i++) {
            if (i <= 10) {
              await sideScreen.sideScreenBet.betslipArea.numberBall.isVisible(page, 1, i);
              await sideScreen.sideScreenBet.betslipArea.numberBall.shouldHaveText(page, 1, i);
            } else {
              await sideScreen.sideScreenBet.betslipArea.numberBall.isHidden(page, 1, i);
            }
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      const unSelectedSoFar = [];

      for (const unSelectedNumber of testCases) {
        const unSelectedNumbers = [...unSelectedSoFar, unSelectedNumber]; // preview before mutation

        test(`UnSelect a KINO number ${unSelectedNumbers}  (Area A)`, async ({}, testInfo) => {
          try {
            await playArea.numberBtn.get(page, unSelectedNumber).click();
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });
        unSelectedSoFar.push(unSelectedNumber); // now we push AFTER test generation
      }

      test(`Check no game numbers are unselected ${testCases}  (Area A)`, async ({}, testInfo) => {
        try {
          for (let i = 1; i <= 80; i++) {
            await playArea.numberBtn.isFalse(page, i);
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test(`Check that the appropriate number of KINO numbers are randomly unselected ${testCases}  (Area A)`, async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, 0);

          for (let i = 1; i <= 12; i++) {
            if (i <= 0) {
              await sideScreen.sideScreenBet.betslipArea.numberBall.isVisible(page, 1, i);
              await sideScreen.sideScreenBet.betslipArea.numberBall.shouldHaveText(page, 1, i);
            } else {
              await sideScreen.sideScreenBet.betslipArea.numberBall.isHidden(page, 1, i);
            }
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
