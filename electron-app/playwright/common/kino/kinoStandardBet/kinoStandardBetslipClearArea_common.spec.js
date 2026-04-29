// playwright/common/kino/kinoStandardBet/kinoStandardBetslipClearArea_common.spec.js
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

  test.describe('Check Clear Area functionality from Betslip', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select Number 15 and Kino Bonus', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 15).click();
        await settings.kinoBonus.checkbox.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Add new bet for Area B', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 2); // Area B
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Number 15, 25 and Kino Bonus and Close2Win (Area B)', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 15).click();
        await playArea.numberBtn.get(page, 25).click();
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Add new bet for Area C', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 3); // Area C
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Number 15, 25, 35 and Kino Bonus (Area C)', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 15).click();
        await playArea.numberBtn.get(page, 25).click();
        await playArea.numberBtn.get(page, 35).click();
        await settings.kinoBonus.checkbox.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Add new bet for Area D', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 4); // Area D
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Number 15, 25, 35, 45 and Kino Bonus(Area D)', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 15).click();
        await playArea.numberBtn.get(page, 25).click();
        await playArea.numberBtn.get(page, 35).click();
        await playArea.numberBtn.get(page, 45).click();
        await settings.kinoBonus.checkbox.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Add new bet for Area E', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 5); // Area E
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Number 15, 25, 35, 45, 55 and Kino Bonus and Close2Win (Area E)', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 15).click();
        await playArea.numberBtn.get(page, 25).click();
        await playArea.numberBtn.get(page, 35).click();
        await playArea.numberBtn.get(page, 45).click();
        await playArea.numberBtn.get(page, 55).click();
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.close2Win.checkbox.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Add new bet for Area F', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.addBetslip.get(page).click();
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 5); // Area E
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Number 15, 25, 35, 45, 55, 65 and Kino Bonus (Area F)', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 15).click();
        await playArea.numberBtn.get(page, 25).click();
        await playArea.numberBtn.get(page, 35).click();
        await playArea.numberBtn.get(page, 45).click();
        await playArea.numberBtn.get(page, 55).click();
        await playArea.numberBtn.get(page, 65).click();
        await settings.kinoBonus.checkbox.get(page).click();
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

    test('Select Even option', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.options.even.get(page).click();
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
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
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
        await sideScreen.columns.amount.shouldHaveText(page, '1€');
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

    test('Check full betslip information', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        const expectedCosts = ['1,00€', '1,50€', '1,00€', '1,00€', '1,50€', '1,00€'];
        const expectedNumbers = ['1', '2', '3', '4', '5', '6'];

        for (let area = 1; area <= 6; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, expectedCosts[area - 1]);
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, expectedNumbers[area - 1]);
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isHidden(page);

        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
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

    test('Check approve and print fields - Areas 1–6', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '18€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    // Delete Area A
    test('Select Area A from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area A = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area A and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check consecutive draws field', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 18', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '18€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area A and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check full betslip information - Areas 1–5', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        const expectedCosts = ['1,50€', '1,00€', '1,00€', '1,50€', '1,00€'];
        const expectedNumbers = ['2', '3', '4', '5', '6'];

        for (let area = 1; area <= 5; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, expectedCosts[area - 1]);
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, expectedNumbers[area - 1]);
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
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

    // Delete Area B
    test('Select Area B from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area B = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area B and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check consecutive draws field Area B', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 16 ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '16€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area B and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check full betslip information - Areas 1–4', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        const expectedCosts = ['1,00€', '1,00€', '1,50€', '1,00€'];
        const expectedNumbers = ['3', '4', '5', '6'];

        for (let area = 1; area <= 4; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, expectedCosts[area - 1]);
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, expectedNumbers[area - 1]);
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
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
    // Delete Area C
    test('Select Area C from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area C = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area C and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check consecutive draws field Area C', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 13 ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '13€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area C and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check full betslip information - Areas 1–3', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        const expectedCosts = ['1,00€', '1,50€', '1,00€'];
        const expectedNumbers = ['4', '5', '6'];

        for (let area = 1; area <= 3; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, expectedCosts[area - 1]);
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, expectedNumbers[area - 1]);
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
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
    // Delete Area D
    test('Select Area D from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area D = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area D and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check consecutive draws field Area D', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 11 ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '11€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area D and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check full betslip information - Areas 1–2', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        const expectedCosts = ['1,50€', '1,00€'];
        const expectedNumbers = ['5', '6'];

        for (let area = 1; area <= 2; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, expectedCosts[area - 1]);
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, expectedNumbers[area - 1]);
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 9', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '9€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Delete Area E
    test('Select Area E from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area E = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area E and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check consecutive draws field Area E', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 9 ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '9€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area E and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check full betslip information - Areas 1–1', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.isVisible(page);

        const expectedCosts = ['1,00€'];
        const expectedNumbers = ['6'];

        for (let area = 1; area <= 1; area++) {
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.costTitle.shouldHaveText(page, area);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, area, expectedCosts[area - 1]);
          await sideScreen.sideScreenBet.betslipArea.kinoBonus.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, area);
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, area, expectedNumbers[area - 1]);
        }

        // Verify Add Betslip is hidden (max reached)
        await sideScreen.sideScreenBet.addBetslip.isVisible(page);

        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 6', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '6€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Delete Area F
    test('Select Area F from Betslip', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.get(page, 1).click(); // Area F = 1
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area F and select NO', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.no.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check consecutive draws field Area F', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 6 ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '6€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Try to clear Area F and select YES', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.betslipArea.clear.get(page, 1).click();
        await sideScreen.clearModal.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check full betslip information - Areas 0', async ({}, testInfo) => {
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

        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 4', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '4€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that selected KINO numbers have been cleared', async ({}, testInfo) => {
      try {
        await playArea.numbersGrid.shouldHaveText(page);

        await playArea.numbersGrid.label.shouldHaveText(page);

        for (let i = 1; i <= 80; i++) {
          await playArea.numberBtn.isFalse(page, i);
        }
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

        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
        await sideScreen.oddEven.amount.shouldHaveText(page, '0€');
        await sideScreen.oddEven.value.shouldHaveValue(page, '');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields Odd/Even empty 2', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '2€');
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
