// playwright/common/kino/kinoStandardBet/kinoStandardBetReturnToMainMenu_common.spec.js
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

  test.describe('Check functionality of Return to Main Menu option if user has no balance', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select a KINO number 1', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 1', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 1 Bonus', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const selectedRowIndex = 1;
        for (let i = 0; i <= 12; i++) {
          const expectedClass = i === selectedRowIndex ? 'selected' : '';
          await settings.winningsTable.row(i).row.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '1,25€', bonus: '26,25€' },
          { num: '2', win: '-', bonus: '-' },
          { num: '3', win: '-', bonus: '-' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Add new bet for Area B', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 2); // Confirm Area B is now visible
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 2', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus checkbox B', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const selectedRowIndex = 1;
        for (let i = 0; i <= 12; i++) {
          const expectedClass = i === selectedRowIndex ? 'selected' : '';
          await settings.winningsTable.row(i).row.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '1,25€', bonus: '26,25€' },
          { num: '2', win: '-', bonus: '-' },
          { num: '3', win: '-', bonus: '-' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field B', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);

        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];
        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }

        const selected = ['0.5€'];
        for (const label of selected) {
          await settings.betMultiplier.isChecked(page, label);
        }

        const enabled = expectedLabels.filter(label => !selected.includes(label));
        for (const label of enabled) {
          await settings.betMultiplier.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Odd/Even game from KINO Standard game and opened model', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Even option', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.options.even.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Odd/Even modal and checked is closed', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab  1€ even', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Columns game from KINO Standard game and opened model', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Column 1 option', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.options.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Columns modal and checked is closed', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab  1€ 1', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Open consecutive draws fields calculator -8', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a value of consecutive draws fields calculator 8', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 32', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '32€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select digital play in order to have zero balance', async ({}, testInfo) => {
      try {
        await lobbyHeader.digitalPay.get(page).click();
        await page.waitForTimeout(1000);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Check Lobby Header - Back To Lobby - No', async ({}, testInfo) => {
      try {
        await lobbyHeader.backToLobby.get(page).click();
        await lobbyHeader.backToLobby.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - B -no', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const selectedRowIndex = 1;
        for (let i = 0; i <= 12; i++) {
          const expectedClass = i === selectedRowIndex ? 'selected' : '';
          await settings.winningsTable.row(i).row.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '1,25€', bonus: '26,25€' },
          { num: '2', win: '-', bonus: '-' },
          { num: '3', win: '-', bonus: '-' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field B -no', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);

        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];
        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }

        const selected = ['0.5€'];
        for (const label of selected) {
          await settings.betMultiplier.isChecked(page, label);
        }

        const enabled = expectedLabels.filter(label => !selected.includes(label));
        for (const label of enabled) {
          await settings.betMultiplier.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab  1€ even -no', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab  1€ 1 -no', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check value of consecutive draws fields calculator 8 - no', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '8');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 32 -no', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '32€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Check Lobby Header - Back To Lobby - Yes', async ({}, testInfo) => {
      try {
        await lobbyHeader.backToLobby.get(page).click();
        await lobbyHeader.backToLobby.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino', async ({}, testInfo) => {
      try {
        await lobbyGames.kino.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table -yes', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);
        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        for (let i = 0; i <= 12; i++) {
          const expectedClass = i === 0 ? 'selected' : '';
          await settings.winningsTable.row(i).row.shouldHaveClass(page, expectedClass);
          await settings.winningsTable.row(i).number.shouldHaveText(page, i.toString());
          await settings.winningsTable.row(i).winning.shouldHaveText(page, '-');
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, '-');
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field -yes', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);

        for (const label of Object.keys(settings.betMultiplier.expected)) {
          await settings.betMultiplier.shouldHaveText(page, label);
          await settings.betMultiplier.isDisabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab  0€ -yes', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '0€');
        await sideScreen.oddEven.value.shouldHaveValue(page, '');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab  0€ -yes', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '0€');
        await sideScreen.columns.value.shouldHaveValue(page, '');
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

    test('Check approve and print fields - 0 -yes', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
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
  });

  test.describe('Check return to Main Menu from Kino Standard Bet after idle time', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select a KINO number 1 ', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 1', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Wait for idle timeout > 2 mins (kinoconfig "IDLE_TIME": 8000,)', async ({}, testInfo) => {
      test.setTimeout(130000); // Set to 130 seconds
      try {
        await new Promise(resolve => setTimeout(resolve, 125000));
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Wait for idle timeout > 1 mins (kinoconfig "IDLE_TIME": 8000,)', async ({}, testInfo) => {
      test.setTimeout(130000); // Set to 130 seconds
      try {
        await new Promise(resolve => setTimeout(resolve, 75000));
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Lobby after idle screen', async ({}, testInfo) => {
      try {
        await lobbyGames.kino.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino', async ({}, testInfo) => {
      try {
        await lobbyGames.kino.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 0', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€'); //0 only when user has no money
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
