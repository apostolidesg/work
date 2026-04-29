// playwright/common/bettie/play/quickBetsPowerspin_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect, definePlayConsecutiveDrawsInfoButton } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import playGame from '#/pageObjects/bettie/play/playGame';
import quickBet from '#/pageObjects/bettie/play/quickBets';

function runTests(game) {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp());
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe(`Bettie - Check elements of QuickBets Header (${game})`, () => {
    test.beforeEach(async () => {
      await lobby.gameCard.get(page, game).click();
      await playGame.quickPlay.get(page, game, 0).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderCheck(game, () => page);
  });

  test.describe(`Bettie - Check elements of QuickBets Cards (${game})`, () => {
    test.beforeEach(async () => {
      await lobby.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check elements of QuickBets Cards on 1st, 2nd and 3rd card', async ({}, testInfo) => {
      try {
        console.log('1st card with 1 number');
        await playGame.quickPlay.get(page, game, 0).click();

        await lobby.goBack.shouldContainText(page);
        await lobby.goBack.chevron.isVisible(page);

        await quickBet.cardPowerSpin.title.shouldHaveText(page, 'num', 1);
        await quickBet.cardPowerSpin.selection.number.shouldHaveCount(page);
        await quickBet.cardPowerSpin.quickPick.isVisible(page);
        await quickBet.cardPowerSpin.quickPick.get(page).click();
        await quickBet.cardPowerSpin.selection.number.shouldHaveCount(page);
        await quickBet.cardPowerSpin.price.shouldHaveText(page, 'num');

        await quickBet.consecutiveDraws.title.shouldHaveText(page);
        await quickBet.consecutiveDraws.container.shouldHaveText(page);
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€1');

        await lobby.terminalInfo.shouldHaveText(page);

        await lobby.goBack.get(page).click();

        console.log('2nd card with symbol');
        await playGame.quickPlay.get(page, game, 1).click();

        await lobby.goBack.shouldContainText(page);
        await lobby.goBack.chevron.isVisible(page);

        await quickBet.cardPowerSpin.title.shouldHaveText(page, 'symbol');
        await quickBet.cardPowerSpin.selection.symbol.isVisible(page);
        await quickBet.cardPowerSpin.quickPick.notExists(page);
        await quickBet.cardPowerSpin.price.shouldHaveText(page, 'symbol');

        await quickBet.consecutiveDraws.title.shouldHaveText(page);
        await quickBet.consecutiveDraws.container.shouldHaveText(page, 2);
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€2');

        await lobby.terminalInfo.shouldHaveText(page);

        await lobby.goBack.get(page).click();

        console.log('3rd card with color');
        await playGame.quickPlay.get(page, game, 2).click();

        await lobby.goBack.shouldContainText(page);
        await lobby.goBack.chevron.isVisible(page);

        await quickBet.cardPowerSpin.title.shouldHaveText(page, 'color');
        await quickBet.cardPowerSpin.selection.color.shouldHaveColor(page);
        await quickBet.cardPowerSpin.selection.color.shouldHaveRBG(page);
        await quickBet.cardPowerSpin.quickPick.isVisible(page);
        await quickBet.cardPowerSpin.quickPick.get(page).click();
        await quickBet.cardPowerSpin.selection.color.shouldHaveColor(page);
        await quickBet.cardPowerSpin.selection.color.shouldHaveRBG(page);
        await quickBet.cardPowerSpin.price.shouldHaveText(page, 'color');

        await quickBet.consecutiveDraws.title.shouldHaveText(page);
        await quickBet.consecutiveDraws.container.shouldHaveText(page, 2);
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€5');

        await lobby.terminalInfo.shouldHaveText(page);

        await lobby.goBack.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe(`Bettie - Select Elements of QuickBets Header (${game})`, () => {
    test.beforeEach(async () => {
      await lobby.gameCard.get(page, game).click();
      await playGame.quickPlay.get(page, game, 0).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Select and Check Lobby Header - Back To Lobby', async ({}, testInfo) => {
      try {
        await lobbyHeader.home.get(page).click();
        await lobby.learnTheGame.isVisible(page);
        await lobby.gameCard.get(page, game).click();
        await lobbyHeader[`${game}Logo`].isVisible(page);
        await playGame.quickPlay.get(page, game, 0).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    defineHeaderSelect(game, () => page);
  });

  test.describe(`Bettie - Select Elements of QuickBets Consecutive draws (${game})`, () => {
    test.beforeEach(async () => {
      console.log(`Select (${game})`);
      await lobby.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      console.log(`Exit (${game})`);
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Select elements of QuickBets Cards on 1st, 2nd and 3rd card Consecutive draws 1,3,5,100', async ({}, testInfo) => {
      try {
        console.log('1st card with 1 number');
        await playGame.quickPlay.get(page, game, 0).click();

        const drawTests0 = [
          { consecutiveDrawsIndex: 0, payment: '€1' },
          { consecutiveDrawsIndex: 2, payment: '€3' },
          { consecutiveDrawsIndex: 4, payment: '€5' },
        ];

        for (const { consecutiveDrawsIndex, payment } of drawTests0) {
          await quickBet.consecutiveDraws.container.number.get(page, consecutiveDrawsIndex).click();
          await quickBet.consecutiveDraws.container.number.onlyOneActive(page, consecutiveDrawsIndex);
          await quickBet.consecutiveDraws.container.selector.shouldHaveText(page, consecutiveDrawsIndex + 1);
          await quickBet.consecutiveDraws.container.selector.chevron.isVisible(page);
          await quickBet.consecutiveDraws.container.selector.get(page).click();
          await quickBet.consecutiveDraws.container.selector.draws.shouldHaveText(page);
          await quickBet.consecutiveDraws.container.selector.draws.number.onlyOneActive(page, consecutiveDrawsIndex);
          await quickBet.consecutiveDraws.container.selector.get(page).click();
          await quickBet.consecutiveDraws.button.shouldHaveText(page, payment);
        }

        // { consecutiveDrawsIndex: 11, payment: '€100' },
        await quickBet.consecutiveDraws.container.selector.get(page).click();
        await quickBet.consecutiveDraws.container.selector.draws.number.get(page, 11).click();
        await quickBet.consecutiveDraws.container.selector.shouldHaveText(page, 100);
        await quickBet.consecutiveDraws.container.selector.chevron.isVisible(page);
        await quickBet.consecutiveDraws.container.selector.get(page).click();
        await quickBet.consecutiveDraws.container.selector.draws.shouldHaveText(page);
        await quickBet.consecutiveDraws.container.selector.draws.number.onlyOneActive(page, 11);
        await quickBet.consecutiveDraws.container.selector.get(page).click();
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€100');

        // check default values
        await quickBet.cardPowerSpin.title.shouldHaveText(page, 'num', 100);
        await quickBet.cardPowerSpin.selection.number.shouldHaveCount(page);
        await quickBet.cardPowerSpin.quickPick.isVisible(page);
        await quickBet.cardPowerSpin.price.shouldHaveText(page, 'num');

        await quickBet.consecutiveDraws.title.shouldHaveText(page);
        await quickBet.consecutiveDraws.container.shouldHaveText(page, 100);

        await lobby.goBack.get(page).click();

        console.log('2nd card with symbol');
        await playGame.quickPlay.get(page, game, 1).click();

        await quickBet.consecutiveDraws.container.number.onlyOneActive(page, 1);
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€2');

        await quickBet.consecutiveDraws.container.number.get(page, 0).click();
        await quickBet.cardPowerSpin.title.shouldHaveText(page, 'symbol', 1);
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€1');

        await quickBet.consecutiveDraws.container.number.get(page, 4).click();
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€5');

        // { consecutiveDrawsIndex: 11, payment: '€100' },
        await quickBet.consecutiveDraws.container.selector.get(page).click();
        await quickBet.consecutiveDraws.container.selector.draws.number.get(page, 11).click();
        await quickBet.consecutiveDraws.container.selector.shouldHaveText(page, 100);
        await quickBet.consecutiveDraws.container.selector.chevron.isVisible(page);
        await quickBet.consecutiveDraws.container.selector.get(page).click();
        await quickBet.consecutiveDraws.container.selector.draws.shouldHaveText(page);
        await quickBet.consecutiveDraws.container.selector.draws.number.onlyOneActive(page, 11);
        await quickBet.consecutiveDraws.container.selector.get(page).click();
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€100');

        // check default values
        await quickBet.cardPowerSpin.title.shouldHaveText(page, 'symbol', 100);
        await quickBet.cardPowerSpin.selection.symbol.isVisible(page);
        await quickBet.cardPowerSpin.quickPick.notExists(page);
        await quickBet.cardPowerSpin.price.shouldHaveText(page, 'symbol');

        await quickBet.consecutiveDraws.title.shouldHaveText(page);
        await quickBet.consecutiveDraws.container.shouldHaveText(page, 100);

        await lobby.goBack.get(page).click();

        console.log('3rd card with color');
        await playGame.quickPlay.get(page, game, 2).click();

        await quickBet.consecutiveDraws.container.number.onlyOneActive(page, 1);
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€5');

        await quickBet.consecutiveDraws.container.number.get(page, 0).click();
        await quickBet.cardPowerSpin.title.shouldHaveText(page, 'color', 1);
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€2.5');

        await quickBet.consecutiveDraws.container.number.get(page, 4).click();
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€12.5');

        // { consecutiveDrawsIndex: 11, payment: '€100' },
        await quickBet.consecutiveDraws.container.selector.get(page).click();
        await quickBet.consecutiveDraws.container.selector.draws.number.get(page, 13).click();
        await quickBet.consecutiveDraws.container.selector.shouldHaveText(page, 400);
        await quickBet.consecutiveDraws.container.selector.chevron.isVisible(page);
        await quickBet.consecutiveDraws.container.selector.get(page).click();
        await quickBet.consecutiveDraws.container.selector.draws.shouldHaveText(page);
        await quickBet.consecutiveDraws.container.selector.draws.number.onlyOneActive(page, 13);
        await quickBet.consecutiveDraws.container.selector.get(page).click();
        await quickBet.consecutiveDraws.button.shouldHaveText(page, '€1000');

        // check default values
        await quickBet.cardPowerSpin.title.shouldHaveText(page, 'color', 400);
        await quickBet.cardPowerSpin.selection.color.shouldHaveColor(page);
        await quickBet.cardPowerSpin.selection.color.shouldHaveRBG(page);
        await quickBet.cardPowerSpin.quickPick.isVisible(page);
        await quickBet.cardPowerSpin.price.shouldHaveText(page, 'color');

        await quickBet.consecutiveDraws.title.shouldHaveText(page);
        await quickBet.consecutiveDraws.container.shouldHaveText(page, 400);

        await lobby.goBack.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    definePlayConsecutiveDrawsInfoButton(game, () => page);
  });
}

module.exports = { runTests };
