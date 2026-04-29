// playwright/common/kino/kinoStandardBet/kinoStandardBetClearArea_common.spec.js
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

  test.describe('Check Clear Area functionality', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select game type 1 (A Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.up.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (A Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.img.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select KINO Bonus', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);
        // Check each multiplier's text
        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];

        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }

        const selected = ['0.5€', '1.5€'];
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

    test('Check Winnings table', async ({}, testInfo) => {
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
          { num: '1', win: '5,00€', bonus: '105,00€' },
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

    test('Add new bet (B Area)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 2); // Area B
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select game type 1 (B Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.up.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (B Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.img.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field (B Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select KINO Bonus (B Area)', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field (B Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);
        // Check each multiplier's text
        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];

        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }

        const selected = ['0.5€', '1.5€'];
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

    test('Check Winnings table (B Area)', async ({}, testInfo) => {
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
          { num: '1', win: '5,00€', bonus: '105,00€' },
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

    test('Add new bet (C Area)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 3); // Area C
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select game type 1 (C Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.up.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (C Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.img.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field (C Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select KINO Bonus (C Area)', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field (C Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);
        // Check each multiplier's text
        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];

        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }

        const selected = ['0.5€', '1.5€'];
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

    test('Check Winnings table (C Area)', async ({}, testInfo) => {
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
          { num: '1', win: '5,00€', bonus: '105,00€' },
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

    test('Add new bet (D Area)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 4); // Area D
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select game type 1 (D Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.up.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (D Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.img.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field (D Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select KINO Bonus (D Area)', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field (D Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);
        // Check each multiplier's text
        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];

        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }

        const selected = ['0.5€', '1.5€'];
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

    test('Check Winnings table (D Area)', async ({}, testInfo) => {
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
          { num: '1', win: '5,00€', bonus: '105,00€' },
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

    test('Add new bet (E Area)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 5); // Area E
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select game type 1 (E Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.up.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (E Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.img.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field (E Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select KINO Bonus (E Area)', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field (E Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);
        // Check each multiplier's text
        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];

        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }

        const selected = ['0.5€', '1.5€'];
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

    test('Check Winnings table (E Area)', async ({}, testInfo) => {
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
          { num: '1', win: '5,00€', bonus: '105,00€' },
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

    test('Add new bet (F Area)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 6); // Area B
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select game type 1 (F Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.up.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select quick pick (F Area)', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.img.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field (F Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select KINO Bonus (F Area)', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field (F Area)', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);
        // Check each multiplier's text
        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];

        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }

        const selected = ['0.5€', '1.5€'];
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

    test('Check Winnings table (F Area)', async ({}, testInfo) => {
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
          { num: '1', win: '5,00€', bonus: '105,00€' },
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

    test('Select Kino Odd/Even game from KINO Standard game', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Even option of Kino Odd/Even game', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.options.even.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Odd/Even default betting amount 1 Euro and select 2 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, '1').click();
        await oddEvenColumns.oddEven.amounts.get(page, '2').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option and Check that modal of Odd/Even is closed', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    //
    test('Select Kino Columns game from KINO Standard game', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select 1st Columns of Kino Columns game', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.options.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Columns default betting amount 1 Euro and select 2 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, '1').click();
        await oddEvenColumns.columns.amounts.get(page, '2').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option and Check that modal of Columns is closed', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select 2 consecutive draws', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.plusBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check inserted value of consecutive draws fields calculator 2', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1–6', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check standard Areas A–F (1–6)
        for (let area = 1; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '4,00€');
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

    test('Check approve and print fields - Areas 1–6', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '56€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Delete Areas 1–6 and check betslip fields - Area A
    test('Select Area A from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area A = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1'); // Assuming 1 number was picked
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area A from Areas and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 56 ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '56€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area A from Areas and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1–5', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check standard Areas (1–5)
        for (let area = 1; area <= 5; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '4,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 48 ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '48€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    // Delete Areas 1–5 and check betslip fields - Area B
    test('Select Area B from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area A = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field - Area B', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1'); // Assuming 1 number was picked
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area B from Areas and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area B', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '48€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area B from Areas and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1–4', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check standard Areas (1–4)
        for (let area = 1; area <= 4; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '4,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area B 40', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '40€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Delete Areas 1–4 and check betslip fields - Area C
    test('Select Area C from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area A = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field - Area C', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1'); // Assuming 1 number was picked
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area C from Areas and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area C', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '40€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area C from Areas and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1–3', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check standard Areas (1–3)
        for (let area = 1; area <= 3; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '4,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area C 32', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '32€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Delete Areas 1–3 and check betslip fields - Area D
    test('Select Area D from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area A = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field - Area D', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1'); // Assuming 1 number was picked
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area D from Areas and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area D', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '32€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area D from Areas and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1–2', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check standard Areas (1–2)
        for (let area = 1; area <= 2; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '4,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area D 26', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '24€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Delete Areas 1–2 and check betslip fields - Area E
    test('Select Area E from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area A = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field - Area E', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1'); // Assuming 1 number was picked
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area E from Areas and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area E', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '24€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area E from Areas and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas 1–1', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check standard Areas (1–1)
        for (let area = 1; area <= 1; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '4,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area E 18', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '16€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Delete Areas 1–1 and check betslip fields - Area F
    test('Select Area F from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area A = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check quick pick field - Area F', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1'); // Assuming 1 number was picked
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area F from Areas and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area F', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '16€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area F from Areas and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas empty', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check empty Areas
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, 1);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 1, '0,00€');
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '0');

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Area F 8', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '8€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Clear Odd/Even
    test('Select Kino Odd/Even game from KINO Standard game ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that modal of Odd/Even is opened', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.isVisible(page);
        await oddEvenColumns.oddEven.gameLogo.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select clear button in Odd/Even modal', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.clear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select close button in Odd/Even modal', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.close.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Odd/Even empty', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check empty Areas
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, 1);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 1, '0,00€');
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '0');

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '2€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '0€');
        await sideScreen.oddEven.value.shouldHaveValue(page, '');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Odd/Even empty 4', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '4€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Clear Odd/Even
    test('Select Kino Columns game from KINO Standard game ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that modal of Columns is opened', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.isVisible(page);
        await oddEvenColumns.columns.gameLogo.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select clear button in Columns modal', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.clear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select close button in Columns modal', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.close.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Columns empty', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check empty Areas
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, 1);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 1, '0,00€');
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '0');

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '0€');
        await sideScreen.columns.value.shouldHaveValue(page, '');
        await sideScreen.oddEven.amount.shouldHaveText(page, '0€');
        await sideScreen.oddEven.value.shouldHaveValue(page, '');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Columns empty 0', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.info.isVisible(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
