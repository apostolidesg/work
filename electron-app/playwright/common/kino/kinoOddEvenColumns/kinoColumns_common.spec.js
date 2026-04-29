// playwright/common/kino/kinoOddEvenColumns/kinoColumns_common.spec.js
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

  test.describe('Play Kino Columns from Kino Page', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
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

    test('Check Kino Columns elements', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.labels.selection.shouldHaveText(page);
        await oddEvenColumns.columns.labels.selectionInfo.shouldHaveText(page);
        await oddEvenColumns.columns.options.shouldHaveText(page);
        await oddEvenColumns.columns.labels.betAmount.shouldHaveText(page);
        await oddEvenColumns.columns.amounts.shouldHaveText(page);
        await oddEvenColumns.columns.buttons.clear.shouldHaveText(page);
        await oddEvenColumns.columns.buttons.add.shouldHaveText(page);
        await oddEvenColumns.columns.buttons.close.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Kino Standard game is on background', async ({}, testInfo) => {
      try {
        await playArea.numbersGrid.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Check clear and add buttons functionality
    test('Click clear option in Columns modal', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.clear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that modal of Columns is opened (again)', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.isVisible(page);
        await oddEvenColumns.columns.gameLogo.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Kino Standard game is still on background (again)', async ({}, testInfo) => {
      try {
        await playArea.numbersGrid.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check add option in Columns modal is Disabled', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.isDisabled(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Kino Standard game is still on background after add attempt', async ({}, testInfo) => {
      try {
        await playArea.numbersGrid.isVisible(page);
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

    test('Unselect default betting amount 1 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, '1').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check add option in Columns modal is Disabled ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.isDisabled(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that modal of Columns is opened ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.isVisible(page);
        await oddEvenColumns.columns.gameLogo.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Kino Standard game is on background ', async ({}, testInfo) => {
      try {
        await playArea.numbersGrid.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Betting amount 1 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, '1').click();
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

    test('Select Kino Columns game from KINO Standard game and opened model ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.gameLogo.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Kino Columns elements ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.labels.selection.shouldHaveText(page);
        await oddEvenColumns.columns.labels.selectionInfo.shouldHaveText(page);
        await oddEvenColumns.columns.options.shouldHaveText(page);
        await oddEvenColumns.columns.labels.betAmount.shouldHaveText(page);
        await oddEvenColumns.columns.amounts.shouldHaveText(page);
        await oddEvenColumns.columns.buttons.clear.shouldHaveText(page);
        await oddEvenColumns.columns.buttons.add.shouldHaveText(page);
        await oddEvenColumns.columns.buttons.close.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Columns modal and checked is closed ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab 1€ 1 ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '1€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 1', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '1€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Columns game from KINO Standard game and opened model  ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
        await oddEvenColumns.columns.gameLogo.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Column 1 option and select Column 2', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.options.get(page, 1).click();
        await oddEvenColumns.columns.options.get(page, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Betting amount 1 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check add option in Columns modal is Disabled  ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.isDisabled(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Columns modal is still open', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Betting amount 2 and 3 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, 2).click();
        await oddEvenColumns.columns.amounts.get(page, 3).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option (final)', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Columns modal is closed ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab 5€ 2', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '5€');
        await sideScreen.columns.value.shouldHaveValue(page, '2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 5', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Columns game from KINO Standard game and opened model   ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Columns 1, 3, 4, 5, 6, 7, 8, 9, 10', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.options.get(page, 1).click();
        await oddEvenColumns.columns.options.get(page, 3).click();
        await oddEvenColumns.columns.options.get(page, 4).click();
        await oddEvenColumns.columns.options.get(page, 5).click();
        await oddEvenColumns.columns.options.get(page, 6).click();
        await oddEvenColumns.columns.options.get(page, 7).click();
        await oddEvenColumns.columns.options.get(page, 8).click();
        await oddEvenColumns.columns.options.get(page, 9).click();
        await oddEvenColumns.columns.options.get(page, 10).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Betting amounts 1€, 5€, 10€, 15€', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, 1).click(); // 1€
        await oddEvenColumns.columns.amounts.get(page, 4).click(); // 5€
        await oddEvenColumns.columns.amounts.get(page, 5).click(); // 10€
        await oddEvenColumns.columns.amounts.get(page, 6).click(); // 15€
        await oddEvenColumns.columns.amounts.get(page, 7).click(); // 20€
        await oddEvenColumns.columns.amounts.get(page, 8).click(); // 30€
        await oddEvenColumns.columns.amounts.get(page, 9).click(); // 50€
        await oddEvenColumns.columns.amounts.get(page, 10).click(); // 100€
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option - 2360€ 1-10', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Columns modal is closed - 2360€ 1-10', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab 2360€ 1-10', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '2360€');
        await sideScreen.columns.value.shouldHaveValue(page, '1,2,3,4,5,6,7,8,9,10');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 2360', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '2360€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Columns game from KINO Standard game and opened model    ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Column 10 option', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.options.get(page, 10).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Columns modal and checked is closed - 2124€ 1-9', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab - 2124€ 1-9', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '2124€');
        await sideScreen.columns.value.shouldHaveValue(page, '1,2,3,4,5,6,7,8,9');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 2124', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '2124€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Columns game from KINO Standard game and opened model     ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Betting amount 1 Euro ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Columns modal and checked is closed  - 2115€ 1-9', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab - 2115€ 1-9', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '2115€');
        await sideScreen.columns.value.shouldHaveValue(page, '1,2,3,4,5,6,7,8,9');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 2115€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '2115€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Columns game from KINO Standard game and opened model.', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Column 10 option ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.options.get(page, 10).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Columns modal and model is closed - 2350€ 1-10 ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab - 2350€ 1-10 ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '2350€');
        await sideScreen.columns.value.shouldHaveValue(page, '1,2,3,4,5,6,7,8,9,10');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 2350€ ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '2350€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Columns game from KINO Standard game and opened model. ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click clear button in Columns modal', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.clear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check add option in Columns modal is Disabled   ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.isDisabled(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click close button in Columns modal and checked that is closed', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.close.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab - 0€ 0 ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '0€');
        await sideScreen.columns.value.shouldHaveValue(page, '');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 0€ ', async ({}, testInfo) => {
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

  test.describe('Check that multiplier does not affect cost of Columns', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
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

    test('Select Betting amount 2and 3 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, 2).click();
        await oddEvenColumns.columns.amounts.get(page, 3).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Columns modal and model is closed - 6€ 1', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab 6€ 1', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '6€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 6€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '6€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
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

    test('Check betting amount field (A Area)', async ({}, testInfo) => {
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

    test('Check cost and selection on Columns tab 6€ 1 ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '6€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 6.5€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '6.5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Check that KINO Bonus does not affect cost of Columns
    test('Select Kino Columns game from KINO Standard game and opened model ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Betting amount 1 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Columns modal and model is closed - 5€ 1', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select KINO Bonus checkbox', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field (A Area) ', async ({}, testInfo) => {
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

    test('Check cost and selection on Columns tab 5€ 1 ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '5€');
        await sideScreen.columns.value.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 6€ ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '6€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    // Check that consecutive draws works ok for Columns
    test('Select Kino Columns game from KINO Standard game and opened model  ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
        await oddEvenColumns.columns.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Column 2 option', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.options.get(page, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Betting amount 3 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.amounts.get(page, 3).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Columns modal and model is closed - 4€ 1-2', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.buttons.add.get(page).click();
        await oddEvenColumns.columns.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab 4€ 1-2 ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '4€');
        await sideScreen.columns.value.shouldHaveValue(page, '1,2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 5€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '5€');
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

    test('Check value of consecutive draws field calculator 8', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '8');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab 4€ 1-2  ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '4€');
        await sideScreen.columns.value.shouldHaveValue(page, '1,2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 40€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '40€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Open consecutive draws fields calculator ', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Clear consecutive draws field by selecting CE', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.keypadDrawsClear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check default value of consecutive draws fields calculator 1', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Columns tab 4€ 1-2   ', async ({}, testInfo) => {
      try {
        await sideScreen.columns.amount.shouldHaveText(page, '4€');
        await sideScreen.columns.value.shouldHaveValue(page, '1,2');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 5€ ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '5€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    // Clear all from betslip
    test('Select Clear All from betslip and Confirm', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that consecutive draws field is cleared', async ({}, testInfo) => {
      try {
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields after Clear All', async ({}, testInfo) => {
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
