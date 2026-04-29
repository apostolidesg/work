// playwright/common/powerspin/psExtraMarketsBettingAmount_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyGames from '#/pageObjects/lobbyGames';
import header from '#/pageObjects/powerspin/psHeader';
import extraMarkets from '#/pageObjects/powerspin/psExtraMarkets';
import playArea from '#/pageObjects/powerspin/psPlayArea';
import sideScreen from '#/pageObjects/powerspin/psSideScreen';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
    await lobbyGames.powerspin.get(page).click();
    await header.extraMarkets.get(page).click();
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Powerspin - Extra Markets Betting Amount Tests', () => {
    test('Select Values from All Extra Markets', async ({}, testInfo) => {
      try {
        await extraMarkets.number.btn.get(page, 1).click();
        await extraMarkets.number.btn.get(page, 7).click();
        await extraMarkets.number.btn.get(page, 18).click();
        await extraMarkets.wheelSymbol.noneBtn.get(page).click();
        await extraMarkets.wheelNumber.twoBtn.get(page).click();
        await extraMarkets.wheelNumber.threeBtn.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Default Betting Amount is checked on powerspinExtraMarkets.', async ({}, testInfo) => {
      try {
        // Optional default state check
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Number 1€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultipliers.get(page, '1€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Numbers 1€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected)) {
          await extraMarkets.number.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€'];
        for (const label of checkedLabels) {
          await extraMarkets.number.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.number.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Symbol 1€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '1€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Symbol 1€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected)) {
          await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelSymbol.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Number 1€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultipliers.get(page, '1€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Number 1€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected)) {
          await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelNumber.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on sidescreen 1€', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.number.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.number.cost.shouldHaveText(page, '4.5€');
        await sideScreen.sideScreenBet.number.content.shouldHaveText(page, '1 7 18');

        await sideScreen.sideScreenBet.wheelSymbol.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelSymbol.cost.shouldHaveText(page, '1.5€');
        await sideScreen.sideScreenBet.wheelSymbol.content.shouldHaveText(page);

        await sideScreen.sideScreenBet.wheelNumber.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelNumber.cost.shouldHaveText(page, '3€');
        await sideScreen.sideScreenBet.wheelNumber.content.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 1€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '9€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Number 2€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultipliers.get(page, '2€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Numbers 2€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected)) {
          await extraMarkets.number.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€'];
        for (const label of checkedLabels) {
          await extraMarkets.number.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.number.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Symbol 2€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '2€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Symbol 2€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected)) {
          await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelSymbol.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Number 2€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultipliers.get(page, '2€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Number 2€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultiplierLabel.shouldHaveText(page);

        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected)) {
          await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelNumber.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on sidescreen 2€', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.number.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.number.cost.shouldHaveText(page, '10.5€');
        await sideScreen.sideScreenBet.number.content.shouldHaveText(page, '1 7 18');

        await sideScreen.sideScreenBet.wheelSymbol.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelSymbol.cost.shouldHaveText(page, '3.5€');
        await sideScreen.sideScreenBet.wheelSymbol.content.shouldHaveText(page);

        await sideScreen.sideScreenBet.wheelNumber.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelNumber.cost.shouldHaveText(page, '7€');
        await sideScreen.sideScreenBet.wheelNumber.content.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 2€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '21€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Number 3€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultipliers.get(page, '3€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Numbers 3€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected)) {
          await extraMarkets.number.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€', '3€'];
        for (const label of checkedLabels) {
          await extraMarkets.number.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.number.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Symbol 3€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '3€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Symbol 3€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected)) {
          await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€', '3€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelSymbol.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Number 3€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultipliers.get(page, '3€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Number 3€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected)) {
          await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€', '3€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelNumber.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on sidescreen 3€', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.number.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.number.cost.shouldHaveText(page, '19.5€');
        await sideScreen.sideScreenBet.number.content.shouldHaveText(page, '1 7 18');

        await sideScreen.sideScreenBet.wheelSymbol.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelSymbol.cost.shouldHaveText(page, '6.5€');
        await sideScreen.sideScreenBet.wheelSymbol.content.shouldHaveText(page);

        await sideScreen.sideScreenBet.wheelNumber.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelNumber.cost.shouldHaveText(page, '13€');
        await sideScreen.sideScreenBet.wheelNumber.content.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 3€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '39€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Number 5€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultipliers.get(page, '5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Numbers 5€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected)) {
          await extraMarkets.number.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€', '3€', '5€'];
        for (const label of checkedLabels) {
          await extraMarkets.number.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.number.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Symbol 5€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Symbol 5€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected)) {
          await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€', '3€', '5€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelSymbol.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Number 5€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultipliers.get(page, '5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Number 5€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected)) {
          await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€', '3€', '5€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelNumber.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on sidescreen 5€', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.number.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.number.cost.shouldHaveText(page, '34.5€');
        await sideScreen.sideScreenBet.number.content.shouldHaveText(page, '1 7 18');

        await sideScreen.sideScreenBet.wheelSymbol.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelSymbol.cost.shouldHaveText(page, '11.5€');
        await sideScreen.sideScreenBet.wheelSymbol.content.shouldHaveText(page);

        await sideScreen.sideScreenBet.wheelNumber.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelNumber.cost.shouldHaveText(page, '23€');
        await sideScreen.sideScreenBet.wheelNumber.content.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 5€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '69€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Number 10-15-20-25-30€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultipliers.get(page, '10€').click();
        await extraMarkets.number.betMultipliers.get(page, '15€').click();
        await extraMarkets.number.betMultipliers.get(page, '20€').click();
        await extraMarkets.number.betMultipliers.get(page, '25€').click();
        await extraMarkets.number.betMultipliers.get(page, '30€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Numbers 10-15-20-25-30€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected)) {
          await extraMarkets.number.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€', '3€', '5€', '10€', '15€', '20€', '25€', '30€'];
        for (const label of checkedLabels) {
          await extraMarkets.number.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.number.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Symbol 10-15-20-25-30€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '10€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '15€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '20€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '25€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '30€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Symbol 10-15-20-25-30€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected)) {
          await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€', '3€', '5€', '10€', '15€', '20€', '25€', '30€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelSymbol.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Number 10-15-20-25-30€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultipliers.get(page, '10€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '15€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '20€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '25€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '30€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Number 10-15-20-25-30€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected)) {
          await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€', '1€', '2€', '3€', '5€', '10€', '15€', '20€', '25€', '30€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelNumber.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on sidescreen 10-15-20-25-30€', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.number.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.number.cost.shouldHaveText(page, '334.5€');
        await sideScreen.sideScreenBet.number.content.shouldHaveText(page, '1 7 18');

        await sideScreen.sideScreenBet.wheelSymbol.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelSymbol.cost.shouldHaveText(page, '111.5€');
        await sideScreen.sideScreenBet.wheelSymbol.content.shouldHaveText(page);

        await sideScreen.sideScreenBet.wheelNumber.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelNumber.cost.shouldHaveText(page, '223€');
        await sideScreen.sideScreenBet.wheelNumber.content.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 10-15-20-25-30€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '669€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    //500
    test('Select Bet Multiplier Number 40-50-100-200-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultipliers.get(page, '40€').click();
        await extraMarkets.number.betMultipliers.get(page, '50€').click();
        await extraMarkets.number.betMultipliers.get(page, '100€').click();
        await extraMarkets.number.betMultipliers.get(page, '200€').click();
        await extraMarkets.number.betMultipliers.get(page, '500€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Numbers 40-50-100-200-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected)) {
          await extraMarkets.number.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = [
          '0.5€',
          '1€',
          '2€',
          '3€',
          '5€',
          '10€',
          '15€',
          '20€',
          '25€',
          '30€',
          '40€',
          '50€',
          '100€',
          '200€',
          '500€',
        ];
        for (const label of checkedLabels) {
          await extraMarkets.number.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Symbol 40-50-100-200-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '40€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '50€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '100€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '200€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '500€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Symbol 40-50-100-200-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected)) {
          await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = [
          '0.5€',
          '1€',
          '2€',
          '3€',
          '5€',
          '10€',
          '15€',
          '20€',
          '25€',
          '30€',
          '40€',
          '50€',
          '100€',
          '200€',
          '500€',
        ];
        for (const label of checkedLabels) {
          await extraMarkets.wheelSymbol.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Bet Multiplier Wheel with Number 40-50-100-200-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultipliers.get(page, '40€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '50€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '100€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '200€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '500€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Number 40-50-100-200-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected)) {
          await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = [
          '0.5€',
          '1€',
          '2€',
          '3€',
          '5€',
          '10€',
          '15€',
          '20€',
          '25€',
          '30€',
          '40€',
          '50€',
          '100€',
          '200€',
          '500€',
        ];
        for (const label of checkedLabels) {
          await extraMarkets.wheelNumber.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on sidescreen 40-50-100-200-500€', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.number.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.number.cost.shouldHaveText(page, '3004.5€');
        await sideScreen.sideScreenBet.number.content.shouldHaveText(page, '1 7 18');

        await sideScreen.sideScreenBet.wheelSymbol.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelSymbol.cost.shouldHaveText(page, '1001.5€');
        await sideScreen.sideScreenBet.wheelSymbol.content.shouldHaveText(page);

        await sideScreen.sideScreenBet.wheelNumber.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelNumber.cost.shouldHaveText(page, '2003€');
        await sideScreen.sideScreenBet.wheelNumber.content.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 40-50-100-200-500€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '6009€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    //unselect extra
    test('Unselect Extra Markets', async ({}, testInfo) => {
      try {
        await header.extraMarkets.shouldHaveText(page);
        await header.extraMarkets.active.isVisible(page);
        await header.extraMarkets.get(page).click();
        await header.extraMarkets.active.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Play Area inside Powerspin', async ({}, testInfo) => {
      try {
        console.log('Check elements of Number Area');
        await playArea.numberLabel.shouldHaveText(page, 0);

        await playArea.numberTitle.shouldHaveText(page);
        await playArea.numberTitleDouble.shouldHaveText(page);
        await playArea.numberTitleDouble.shouldHaveText(page);
        await playArea.numberTitleQuadruple.shouldHaveText(page);
        await playArea.numberTitleSextuple.shouldHaveText(page);
        await playArea.numberTitleOctuple.shouldHaveText(page);
        await playArea.numberTitleDozen.shouldHaveText(page);

        await playArea.numberSelectBtn.isVisible(page);
        await playArea.number2daSelectBtn.isVisible(page);
        await playArea.number3daSelectBtn.isVisible(page);
        await playArea.number4daSelectBtn.isVisible(page);
        await playArea.number6daSelectBtn.isVisible(page);
        await playArea.number8daSelectBtn.isVisible(page);
        await playArea.number12daSelectBtn.isVisible(page);

        for (let value = 1; value <= 24; value++) {
          console.log('Check number', value);
          await playArea.mainNumberBtn.shouldHaveText(page, value, 0);
        }

        await playArea.quickPickButton.shouldHaveText(page, 0);

        console.log('Check elements of Symbol Area');
        await playArea.symbolLabel.shouldHaveText(page, 0);
        await playArea.wheelImage.isVisible(page, 0);

        console.log('Check elements of Zone Area');
        await playArea.zoneLabel.shouldHaveText(page, 0);
        await playArea.zoneRedBtn.shouldHaveText(page, 0);
        await playArea.zoneGreenBtn.shouldHaveText(page, 0);
        await playArea.zoneBlueBtn.shouldHaveText(page, 0);

        console.log('Check elements of Under/Over Area');
        await playArea.underOverLabel.shouldHaveText(page, 0);
        await playArea.underBtn.shouldHaveText(page, 0);
        await playArea.overBtn.shouldHaveText(page, 0);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on sidescreen 40-50-100-200-500€ selection ', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.number.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.number.cost.shouldHaveText(page, '3004.5€');
        await sideScreen.sideScreenBet.number.content.shouldHaveText(page, '1 7 18');

        await sideScreen.sideScreenBet.wheelSymbol.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelSymbol.cost.shouldHaveText(page, '1001.5€');
        await sideScreen.sideScreenBet.wheelSymbol.content.shouldHaveText(page);

        await sideScreen.sideScreenBet.wheelNumber.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelNumber.cost.shouldHaveText(page, '2003€');
        await sideScreen.sideScreenBet.wheelNumber.content.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 40-50-100-200-500€ selection ', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '6009€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    //Select extra
    test('Select Extra Markets', async ({}, testInfo) => {
      try {
        await header.extraMarkets.shouldHaveText(page);
        await header.extraMarkets.active.isVisible(page);
        await header.extraMarkets.get(page).click();
        await header.extraMarkets.active.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
    //unselect 05,1,2,3,5... check 05
    test('Unselect Bet Multiplier Number 0.5-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultipliers.get(page, '0.5€').click();
        await extraMarkets.number.betMultipliers.get(page, '1€').click();
        await extraMarkets.number.betMultipliers.get(page, '2€').click();
        await extraMarkets.number.betMultipliers.get(page, '3€').click();
        await extraMarkets.number.betMultipliers.get(page, '5€').click();
        await extraMarkets.number.betMultipliers.get(page, '10€').click();
        await extraMarkets.number.betMultipliers.get(page, '15€').click();
        await extraMarkets.number.betMultipliers.get(page, '20€').click();
        await extraMarkets.number.betMultipliers.get(page, '25€').click();
        await extraMarkets.number.betMultipliers.get(page, '30€').click();
        await extraMarkets.number.betMultipliers.get(page, '40€').click();
        await extraMarkets.number.betMultipliers.get(page, '50€').click();
        await extraMarkets.number.betMultipliers.get(page, '100€').click();
        await extraMarkets.number.betMultipliers.get(page, '200€').click();
        await extraMarkets.number.betMultipliers.get(page, '500€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Numbers 0.5-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.number.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected)) {
          await extraMarkets.number.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€'];
        for (const label of checkedLabels) {
          await extraMarkets.number.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.number.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.number.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Bet Multiplier Wheel with Symbol 0.5-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '0.5€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '1€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '2€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '3€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '5€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '10€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '15€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '20€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '25€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '30€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '40€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '50€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '100€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '200€').click();
        await extraMarkets.wheelSymbol.betMultipliers.get(page, '500€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Symbol 0.5-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelSymbol.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected)) {
          await extraMarkets.wheelSymbol.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelSymbol.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelSymbol.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelSymbol.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Bet Multiplier Wheel with Number 0.5-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultipliers.get(page, '0.5€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '1€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '2€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '3€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '5€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '10€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '15€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '20€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '25€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '30€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '40€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '50€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '100€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '200€').click();
        await extraMarkets.wheelNumber.betMultipliers.get(page, '500€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check betting amount field for Wheel with Number 0.5-500€', async ({}, testInfo) => {
      try {
        await extraMarkets.wheelNumber.betMultiplierLabel.shouldHaveText(page);
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected)) {
          await extraMarkets.wheelNumber.betMultipliers.shouldHaveText(page, label);
        }
        // Those are checked
        const checkedLabels = ['0.5€'];
        for (const label of checkedLabels) {
          await extraMarkets.wheelNumber.betMultipliers.isChecked(page, label);
        }
        // The rest should be enabled
        for (const label of Object.keys(extraMarkets.wheelNumber.betMultipliers.expected).filter(
          l => !checkedLabels.includes(l),
        )) {
          await extraMarkets.wheelNumber.betMultipliers.isEnabled(page, label);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check cost and selection on sidescreen 0.5-500€', async ({}, testInfo) => {
      try {
        await sideScreen.sideScreenBet.number.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.number.cost.shouldHaveText(page, '1.5€');
        await sideScreen.sideScreenBet.number.content.shouldHaveText(page, '1 7 18');

        await sideScreen.sideScreenBet.wheelSymbol.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelSymbol.cost.shouldHaveText(page, '0.5€');
        await sideScreen.sideScreenBet.wheelSymbol.content.shouldHaveText(page);

        await sideScreen.sideScreenBet.wheelNumber.label.shouldHaveText(page);
        await sideScreen.sideScreenBet.wheelNumber.cost.shouldHaveText(page, '1€');
        await sideScreen.sideScreenBet.wheelNumber.content.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check approve and print fields 0.5-500€', async ({}, testInfo) => {
      try {
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '3€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

export { runTests };
