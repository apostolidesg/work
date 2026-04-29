// playwright/common/kino/kinoStandardBet/kinoStandardBetEditSelectionBetslip_common.spec.js
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

  test.describe('Check Edit selection functionality from Betslip', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    // Prepare a full betslip with all 6 Areas filled in
    test('Select a KINO number 1', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus checkbox A', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - A', async ({}, testInfo) => {
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

    test('Check betting amount field A', async ({}, testInfo) => {
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

    test('Add new bet for Area C', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 3); // Confirm Area C is now visible
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 3', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 3).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus checkbox C', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - C', async ({}, testInfo) => {
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

    test('Check betting amount field C', async ({}, testInfo) => {
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

    test('Add new bet for Area D', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 4); // Confirm Area D is now visible
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 4', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 4).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus checkbox D', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - D', async ({}, testInfo) => {
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

    test('Check betting amount field D', async ({}, testInfo) => {
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

    test('Add new bet for Area E', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 5); // Confirm Area E is now visible
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 5', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 5).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus checkbox E', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - E', async ({}, testInfo) => {
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

    test('Check betting amount field E', async ({}, testInfo) => {
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

    test('Add new bet for Area F', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 6); // Confirm Area F is now visible
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 6', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 6).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus checkbox F', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - F', async ({}, testInfo) => {
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

    test('Check betting amount field F', async ({}, testInfo) => {
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

    test('Unselect default betting amount 1 Euro and select 2 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, '1').click();
        await oddEvenColumns.oddEven.amounts.get(page, '2').click();
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

    test('Check cost and selection on Odd/Even tab  2€ even', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
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

    test('Unselect default betting amount 1 Euro and select 2 Euro ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, '1').click();
        await oddEvenColumns.columns.amounts.get(page, '2').click();
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
        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Check full betslip information
    test('Check betslip fields - Full', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check standard Areas A–F (1–6)
        for (let area = 1; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '1,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        for (let area = 2; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
        }

        await sideScreen.sideScreenBet.addBetslip.isHidden(page);
        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field Full', async ({}, testInfo) => {
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

    test('Check Winnings table - Full', async ({}, testInfo) => {
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

    test('Check approve and print fields - 10', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '10€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Edit Area A from Areas
    test('Select Area A from Areas', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area A = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field A', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 10 A', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 10).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - A', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '0,50€', bonus: '8,00€' },
          { num: '2', win: '2,50€', bonus: '35,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus checkbox A', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field A', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1,2–6', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, 1);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 1, '2,00€');
        await sideScreen.sideScreenBet.betslipArea.kinoBonus.isHidden(page, 1);
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '2');

        // Check standard Areas B–F (2–6)
        for (let area = 2; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '1,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - A ', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '2,00€', bonus: '32,00€' },
          { num: '2', win: '10,00€', bonus: '140,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '6,00€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '36,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field A ', async ({}, testInfo) => {
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

    test('Check approve and print fields - 11', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '11€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    // Edit Area B from Areas
    test('Select Area B from Areas', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 2).click(); // Area B = 2
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field B', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 2, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 20 B', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 20).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '0,50€', bonus: '8,00€' },
          { num: '2', win: '2,50€', bonus: '35,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect Kino Bonus checkbox B', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field B', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1-2, 3–6', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        for (let areas = 1; areas <= 2; areas++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, areas);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, areas);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, areas, '2,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isHidden(page, areas);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, areas);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areas, '2');
        }

        // Check standard Areas C–F (3–6)
        for (let area = 3; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '1,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - B ', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '2,00€', bonus: '32,00€' },
          { num: '2', win: '10,00€', bonus: '140,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '6,00€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '36,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field B ', async ({}, testInfo) => {
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

    test('Check approve and print fields - 12', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '12€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Edit Area C from Areas
    test('Select Area C from Areas', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 3).click(); // Area C = 3
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field C', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 3, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 30 C', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 30).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - C', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '0,50€', bonus: '8,00€' },
          { num: '2', win: '2,50€', bonus: '35,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect Kino Bonus checkbox C', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field C', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1-3, 4–6', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        for (let areas = 1; areas <= 3; areas++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, areas);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, areas);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, areas, '2,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isHidden(page, areas);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, areas);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areas, '2');
        }

        // Check standard Areas E–F (4–6)
        for (let area = 4; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '1,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - C ', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '2,00€', bonus: '32,00€' },
          { num: '2', win: '10,00€', bonus: '140,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '6,00€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '36,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field C ', async ({}, testInfo) => {
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

    test('Check approve and print fields - 13', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '13€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Edit Area D from Areas
    test('Select Area D from Areas', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 4).click(); // Area D = 4
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field D', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 4, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 40 D', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 40).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - D', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '0,50€', bonus: '8,00€' },
          { num: '2', win: '2,50€', bonus: '35,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect Kino Bonus checkbox D', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field D', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1-4, 5–6', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        for (let areas = 1; areas <= 4; areas++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, areas);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, areas);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, areas, '2,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isHidden(page, areas);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, areas);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areas, '2');
        }

        // Check standard Areas E–F (5–6)
        for (let area = 5; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '1,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - D ', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '2,00€', bonus: '32,00€' },
          { num: '2', win: '10,00€', bonus: '140,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '6,00€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '36,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field D ', async ({}, testInfo) => {
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

    test('Check approve and print fields - 14', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '14€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Edit Area E from Areas
    test('Select Area E from Areas', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 5).click(); // Area E = 5
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field E', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 5, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 50 E', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 50).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - E', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '0,50€', bonus: '8,00€' },
          { num: '2', win: '2,50€', bonus: '35,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect Kino Bonus checkbox E', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field E', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1-5, 6', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        for (let areas = 1; areas <= 5; areas++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, areas);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, areas);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, areas, '2,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isHidden(page, areas);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, areas);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, areas, '2');
        }

        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 6);
        await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, 6);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 6, '1,00€');
        await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, 6);
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 6);
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 6, '1');

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - E ', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '2,00€', bonus: '32,00€' },
          { num: '2', win: '10,00€', bonus: '140,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '6,00€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '36,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field E ', async ({}, testInfo) => {
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

    test('Check approve and print fields - 15', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '15€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Edit Area F from Areas
    test('Select Area F from Areas', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 6).click(); // Area F = 6
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field F', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 6, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 60 F', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 60).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - F', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '0,50€', bonus: '8,00€' },
          { num: '2', win: '2,50€', bonus: '35,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect Kino Bonus checkbox F', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field F', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1-6 ', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        for (let area = 1; area <= 5; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '2,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isHidden(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '2');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table with C2W - F ', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '2,00€', bonus: '32,00€' },
          { num: '2', win: '10,00€', bonus: '140,00€' },
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

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '6,00€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '36,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field F ', async ({}, testInfo) => {
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

    test('Check approve and print fields - 16', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '16€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Select Clear All
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

    test('Check Winnings table empty', async ({}, testInfo) => {
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

    test('Check betting amount field - Disabled', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);

        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];
        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }

        for (const label of expectedLabels) {
          await settings.betMultiplier.isDisabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Kino Bonus field', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.icon.isVisible(page);
        await settings.kinoBonus.checkbox.isVisible(page);
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 0', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
