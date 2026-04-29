// playwright/common/bettie/_shared/play/consecutiveDraws.shared.js
import { test } from '@playwright/test';
import { screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import playGame from '#/pageObjects/bettie/play/playGame';
import quickBet from '#/pageObjects/bettie/play/quickBets';

export function definePlayConsecutiveDrawsInfoButton(game, getPage = () => undefined) {
  let page;

  test.beforeEach(async () => {
    page = getPage();
  });

  test('Select elements of QuickBets Cards on 1st, 2nd and 3rd card — Info btn', async ({}, testInfo) => {
    try {
      // cardIndex card
      for (const cardIndex of [0, 1, 2]) {
        await playGame.quickPlay.get(page, game, cardIndex).click();

        await quickBet.consecutiveDraws.button.shouldContain(page);
        await quickBet.consecutiveDraws.button.info.notExists(page);
        await lobbyHeader.digitalPay.get(page).click();

        await quickBet.consecutiveDraws.button.shouldContain(page);
        await quickBet.consecutiveDraws.button.info.isVisible(page);
        await quickBet.consecutiveDraws.button.info.get(page).click();
        await quickBet.consecutiveDraws.button.info.text.shouldHaveText(page);

        await lobbyHeader.balance.refresh.get(page).click();
        await quickBet.consecutiveDraws.button.shouldContain(page);
        await quickBet.consecutiveDraws.button.info.notExists(page);

        await lobby.goBack.get(page).click();
      }
    } catch (error) {
      await screenshotError(page, testInfo);
      throw error;
    }
  });
}
