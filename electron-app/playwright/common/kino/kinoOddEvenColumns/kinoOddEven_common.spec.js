// playwright/common/kino/kinoOddEvenColumns/kinoOddEven_common.spec.js
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

  test.describe('Play Kino Odd/Even from Kino Page', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
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

    test('Check Kino Odd/Even elements from KINO Standard game', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.labels.selection.shouldHaveText(page);
        await oddEvenColumns.oddEven.options.odd.shouldHaveText(page);
        await oddEvenColumns.oddEven.options.even.shouldHaveText(page);
        await oddEvenColumns.oddEven.options.draw.shouldHaveText(page);
        await oddEvenColumns.oddEven.labels.betAmount.shouldHaveText(page);
        await oddEvenColumns.oddEven.amounts.shouldHaveText(page);
        await oddEvenColumns.oddEven.buttons.clear.shouldHaveText(page);
        await oddEvenColumns.oddEven.buttons.add.shouldHaveText(page);
        await oddEvenColumns.oddEven.buttons.close.isVisible(page);
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
    test('Click clear option in Odd/Even modal', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.clear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that modal of Odd/Even is opened (again)', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.isVisible(page);
        await oddEvenColumns.oddEven.gameLogo.isVisible(page);
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

    test('Check add option in Odd/Even modal is Disabled', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.isDisabled(page);
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

    test('Select Odd option', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.options.odd.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect default betting amount 1 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, '1').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check add option in Odd/Even modal is Disabled ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.isDisabled(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that modal of Odd/Even is opened ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.isVisible(page);
        await oddEvenColumns.oddEven.gameLogo.isVisible(page);
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
        await oddEvenColumns.oddEven.amounts.get(page, '1').click();
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

    test('Check cost and selection on Odd/Even tab  1€ odd', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'odd');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Odd/Even game from KINO Standard game and opened model ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.gameLogo.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Kino Odd/Event elements ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.labels.selection.shouldHaveText(page);
        await oddEvenColumns.oddEven.options.odd.shouldHaveText(page);
        await oddEvenColumns.oddEven.options.even.shouldHaveText(page);
        await oddEvenColumns.oddEven.options.draw.shouldHaveText(page);
        await oddEvenColumns.oddEven.labels.betAmount.shouldHaveText(page);
        await oddEvenColumns.oddEven.amounts.shouldHaveText(page);
        await oddEvenColumns.oddEven.buttons.clear.shouldHaveText(page);
        await oddEvenColumns.oddEven.buttons.add.shouldHaveText(page);
        await oddEvenColumns.oddEven.buttons.close.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Odd/Even modal and checked is closed ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab 1€ odd ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '1€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'odd');
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

    test('Select Kino Odd/Even game from KINO Standard game and opened model  ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
        await oddEvenColumns.oddEven.gameLogo.isVisible(page);
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

    test('Unselect Betting amount 1 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check add option in Odd/Even modal is Disabled  ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.isDisabled(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Odd/Even modal is still open', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Betting amount 2 and 3 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, 2).click();
        await oddEvenColumns.oddEven.amounts.get(page, 3).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option (final)', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Odd/Even modal is closed ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab 5€ even', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '5€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
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

    test('Select Kino Odd/Even game from KINO Standard game and opened model   ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Even option ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.options.even.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Betting amounts 1€, 5€, 10€, 15€', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, 1).click(); // 1€
        await oddEvenColumns.oddEven.amounts.get(page, 4).click(); // 5€
        await oddEvenColumns.oddEven.amounts.get(page, 5).click(); // 10€
        await oddEvenColumns.oddEven.amounts.get(page, 6).click(); // 15€
        await oddEvenColumns.oddEven.amounts.get(page, 7).click(); // 20€
        await oddEvenColumns.oddEven.amounts.get(page, 8).click(); // 30€
        await oddEvenColumns.oddEven.amounts.get(page, 9).click(); // 50€
        await oddEvenColumns.oddEven.amounts.get(page, 10).click(); // 100€
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option - 236€ even', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check that Odd/Even modal is closed - 236€ even', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab 236€ even', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '236€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 236€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '236€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Odd/Even game from KINO Standard game and opened model    ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Draw option', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.options.draw.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Odd/Even modal and checked is closed - 236€ draw', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab - 236€ draw', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '236€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'draw');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 236€ ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '236€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Odd/Even game from KINO Standard game and opened model     ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Betting amount 1 Euro ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Odd/Even modal and checked is closed  - 235€ draw', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab - 235€ draw', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '235€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'draw');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 235€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '235€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Odd/Even game from KINO Standard game and opened model.', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Even option  ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.options.even.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Odd/Even modal and model is closed - 235€ even ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab - 235€ even ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '235€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields - 235€ ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '235€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Odd/Even game from KINO Standard game and opened model. ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click clear button in Odd/Even modal', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.clear.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check add option in Odd/Even modal is Disabled   ', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.isDisabled(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click close button in Odd/Even modal and checked that is closed', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.close.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even tab - 0€ 0 ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '0€');
        await sideScreen.oddEven.value.shouldHaveValue(page, '');
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

  test.describe('Check that multiplier does not affect cost of Odd/Even ', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select Kino Odd/Even  game from KINO Standard game and opened model', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Odd option', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.options.odd.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Betting amount 2and 3 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, 2).click();
        await oddEvenColumns.oddEven.amounts.get(page, 3).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Odd/Even  modal and model is closed - 6€ odd', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even  tab 6€ odd', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '6€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'odd');
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

    test('Check cost and selection on Odd/Even  tab 6€ odd ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '6€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'odd');
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
    // Check that KINO Bonus does not affect cost of Odd/Even
    test('Select Kino Odd/Even  game from KINO Standard game and opened model ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
        await oddEvenColumns.oddEven.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Betting amount 1 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Odd/Even  modal and model is closed - 5€ 1', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
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

    test('Check cost and selection on Odd/Even  tab 5€ odd ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '5€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'odd');
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
    // Check that consecutive draws works ok for Odd/Even
    test('Select Kino Odd/Even  game from KINO Standard game and opened model  ', async ({}, testInfo) => {
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

    test('Unselect Betting amount 3 Euro', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.amounts.get(page, 3).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Click add option in Odd/Even  modal and model is closed - 2€ even', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.buttons.add.get(page).click();
        await oddEvenColumns.oddEven.isHidden(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on Odd/Even  tab 2€ even ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 5€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '3€');
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

    test('Check cost and selection on Odd/Even  tab 2€ even  ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 24€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '24€');
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

    test('Check cost and selection on Odd/Even  tab 2€ even   ', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.amount.shouldHaveText(page, '2€');
        await sideScreen.oddEven.value.shouldHaveValue(page, 'even');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 3€ ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.isVisible(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '3€');
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
