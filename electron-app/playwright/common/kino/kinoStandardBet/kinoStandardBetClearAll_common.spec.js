// playwright/common/kino/kinoStandardBet/kinoStandardBetClearAll_common.spec.js
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

  test.describe('Check functionality of Clear All option', () => {
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
        await settings.betMultiplier.get(page, '1€').click();
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

        const selected = ['0.5€', '1€'];
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
          { num: '1', win: '3,75€', bonus: '78,75€' },
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
        await settings.betMultiplier.get(page, '1€').click();
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

        const selected = ['0.5€', '1€'];
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
          { num: '1', win: '3,75€', bonus: '78,75€' },
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
        await settings.betMultiplier.get(page, '1€').click();
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

        const selected = ['0.5€', '1€'];
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
          { num: '1', win: '3,75€', bonus: '78,75€' },
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
        await settings.betMultiplier.get(page, '1€').click();
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

        const selected = ['0.5€', '1€'];
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
          { num: '1', win: '3,75€', bonus: '78,75€' },
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
        await settings.betMultiplier.get(page, '1€').click();
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

        const selected = ['0.5€', '1€'];
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
          { num: '1', win: '3,75€', bonus: '78,75€' },
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
        await settings.betMultiplier.get(page, '1€').click();
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

        const selected = ['0.5€', '1€'];
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
          { num: '1', win: '3,75€', bonus: '78,75€' },
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

    test('Open consecutive draws fields calculator', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a value of consecutive draws fields calculator', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check inserted value of consecutive draws fields calculator 8', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '8');
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

    test('Select Odd option of Kino Odd/Even game', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.options.odd.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Add selected Kino Odd/Even game to betslip', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

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

    test('Add selected Kino Columns game to betslip', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
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
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '3,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - Areas 1–6', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '160€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Discard Lobby Header - Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check inserted value of consecutive draws fields calculator 8 ', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '8');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - Areas (1–6)', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        // Check standard Areas A–F (1–6)
        for (let area = 1; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, '3,00€');
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, '1');
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - Areas (1–6)', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '160€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Lobby Header - Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check inserted value of consecutive draws fields calculator 1', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields', async ({}, testInfo) => {
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

    test('Check approve and print fields', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.info.isVisible(page);
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
