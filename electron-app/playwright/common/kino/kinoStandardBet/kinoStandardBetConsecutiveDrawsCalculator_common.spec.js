// playwright/common/kino/kinoStandardBet/kinoStandardBetConsecutiveDrawsCalculator_common.spec.js
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

  test.describe('Check functionality of Consecutive Draws Calculator', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Check default value of consecutive draws fields calculator', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
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

    test('Select a value of consecutive draws fields calculator -8', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator by clicking outside keepad', async ({}, testInfo) => {
      try {
        await settings.quickPickBtn.img.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check default value of consecutive draws fields calculator again', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
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

    // Select a quick pick for Area A
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

    //Check functionality of calculator
    test('Open consecutive draws fields calculator - 7', async ({}, testInfo) => {
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

    test('Select a value of consecutive draws fields calculator - 7', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 7).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator by selecting OK - 7', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check inserted value of consecutive draws fields calculator - 7', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '7');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 7', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '3.5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - 7', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 1, '0,50€');
        await sideScreen.sideScreenBet.betslipArea.kinoBonus.isHidden(page, 1);
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1');

        for (let area = 2; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isHidden(page, area);
        }

        await sideScreen.sideScreenBet.addBetslip.isVisible(page);
        await sideScreen.oddEven.amount.shouldHaveText(page, '0€');
        await sideScreen.columns.amount.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field - 7', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);
        // Check each multiplier's text
        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];

        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }
        // Check 0.5€ is selected
        await settings.betMultiplier.isChecked(page, '0.5€');
        // Check the rest are enabled
        for (const label of expectedLabels.slice(1)) {
          await settings.betMultiplier.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 7', async ({}, testInfo) => {
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

    test('Open consecutive draws fields calculator - 8', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a value of consecutive draws fields calculator - 8', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator by selecting OK - 8', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check inserted value of consecutive draws fields calculator - 8', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '8');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 8', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '4€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - 8', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 1, '0,50€');
        await sideScreen.sideScreenBet.betslipArea.kinoBonus.isHidden(page, 1);
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1');

        for (let area = 2; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isHidden(page, area);
        }

        await sideScreen.sideScreenBet.addBetslip.isVisible(page);
        await sideScreen.oddEven.amount.shouldHaveText(page, '0€');
        await sideScreen.columns.amount.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field - 8', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);
        // Check each multiplier's text
        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];

        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }
        // Check 0.5€ is selected
        await settings.betMultiplier.isChecked(page, '0.5€');
        // Check the rest are enabled
        for (const label of expectedLabels.slice(1)) {
          await settings.betMultiplier.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 8', async ({}, testInfo) => {
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

    test('Open consecutive draws fields calculator - 2', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a value of consecutive draws fields calculator - 2', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator by clicking on OK - 2', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Increase value of consecutive draws calculator by 1 (first click) (second click)', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.plusBtn.get(page).click();
        await sideScreen.consecutiveDraws.plusBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Decrease value of consecutive draws calculator by 1', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.minusBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check value of consecutive draws calculator - 3', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '3'); // Adjust expected value as needed
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Open consecutive draws calculator again - 3', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws calculator by selecting OK - 1', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check default value of consecutive draws calculator 1', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 1', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0.5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betslip fields - 1', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 1, '0,50€');
        await sideScreen.sideScreenBet.betslipArea.kinoBonus.isHidden(page, 1);
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 1);
        await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '1');

        for (let area = 2; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isHidden(page, area);
        }

        await sideScreen.sideScreenBet.addBetslip.isVisible(page);
        await sideScreen.oddEven.amount.shouldHaveText(page, '0€');
        await sideScreen.columns.amount.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field - 1', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.label.shouldHaveText(page);
        // Check each multiplier's text
        const expectedLabels = ['0.5€', '1€', '1.5€', '2€', '2.5€', '3€', '4€', '5€', '10€', '20€'];

        for (const label of expectedLabels) {
          await settings.betMultiplier.shouldHaveText(page, label);
        }
        // Check 0.5€ is selected
        await settings.betMultiplier.isChecked(page, '0.5€');
        // Check the rest are enabled
        for (const label of expectedLabels.slice(1)) {
          await settings.betMultiplier.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 1', async ({}, testInfo) => {
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

    test('Open consecutive draws fields calculator - 1 ', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator by clicking on OK - 1 ', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check default value of consecutive draws fields calculator - 1 ', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 1 ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0.5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Open consecutive draws fields calculator - 5', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a value of consecutive draws fields calculator - 5', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 5).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Clear consecutive draws fields calculator by selecting CE - 5', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsClear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check default value of consecutive draws fields calculator - 5', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 5', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0.5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Open consecutive draws fields calculator - 4', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a value of consecutive draws fields calculator - 4', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 4).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator by selecting OK - 4', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check inserted value of consecutive draws fields calculator - 4', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '4');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 4', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '2€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Open consecutive draws fields calculator - 800', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a value of consecutive draws fields calculator - 800', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 0).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 0).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator by selecting OK - 800', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check inserted value of consecutive draws fields calculator - 800', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '800');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 800', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '400€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Open consecutive draws fields calculator -1', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select the lower limit of consecutive draws fields calculator -1', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Close consecutive draws fields calculator by selecting OK -1', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check inserted value of consecutive draws fields calculator -1', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields -1', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0.5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Open consecutive draws fields calculator - 801', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select an out of range value of consecutive draws fields calculator - 801', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 0).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check message of consecutive draws fields calculator - 801', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsMessage.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Clear value of consecutive draws fields calculator - 801', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsClear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check default value of consecutive draws fields calculator - 801', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 801', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0.5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Check all possible consecutive draws values', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    // Select a quick pick for Area A
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

    test('Increment consecutive draws from 2 to 800 and verify cost', async ({}, testInfo) => {
      try {
        console.log('Increment consecutive draws from 2 to 20 and verify cost');
        for (let i = 2; i <= 20; i++) {
          // Click the "+" button
          await sideScreen.consecutiveDraws.plusBtn.get(page).click();

          // Check updated input value
          await sideScreen.consecutiveDraws.input.shouldHaveValue(page, i.toString());

          // Check cost: format as "X.X€"
          const raw = i * 0.5;
          const expectedCost = raw % 1 === 0 ? `${raw.toFixed(0)}€` : `${raw.toString()}€`;
          await sideScreen.submit.betslipCost.shouldHaveText(page, expectedCost);
        }

        console.log('Select consecutive draws fields calculator - 780');
        await sideScreen.consecutiveDraws.input.get(page).click();

        await page.waitForTimeout(500);
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 7).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 8).click();
        await sideScreen.consecutiveDraws.keypadDraws.get(page, 0).click();

        await sideScreen.consecutiveDraws.keypadDrawsOK.get(page).click();

        console.log('Increment consecutive draws from 780 to 800 and verify cost');
        for (let i = 781; i <= 800; i++) {
          // Click the "+" button
          await sideScreen.consecutiveDraws.plusBtn.get(page).click();

          // Check updated input value
          await sideScreen.consecutiveDraws.input.shouldHaveValue(page, i.toString());

          // Check cost: format as "X.X€"
          const raw = i * 0.5;
          const expectedCost = raw % 1 === 0 ? `${raw.toFixed(0)}€` : `${raw.toString()}€`;
          await sideScreen.submit.betslipCost.shouldHaveText(page, expectedCost);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to increase value of consecutive draws fields calculator more than 800', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.plusBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check default value of consecutive draws fields calculator - 800', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '800');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    test('Check approve and print fields - 800', async ({}, testInfo) => {
      try {
        await sideScreen.submit.betslipCost.shouldHaveText(page, '400€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
