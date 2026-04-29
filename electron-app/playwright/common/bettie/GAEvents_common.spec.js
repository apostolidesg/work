// playwright/common/bettie/lobbyBettie_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch, waitForGAEvent } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import playGame from '#/pageObjects/bettie/play/playGame';
import quickBet from '#/pageObjects/bettie/play/quickBets';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';
import faq from '#/pageObjects/bettie/learn/FAQ/FAQ1';
import howTo from '#/pageObjects/bettie/learn/howTo/howTo1';
import howToGame from '#/pageObjects/bettie/learn/howTo/howTo2Game';
import world from '#/pageObjects/lib/world';

function runTests() {
  test.describe('Bettie Page', () => {
    let electronApp, page;
    const games = ['kino', 'powerspin'];

    test.beforeAll(async () => {
      ({ electronApp, page } = await launchElectronApp());
    });

    test.afterAll(async () => {
      if (electronApp) await electronApp.close();
    });

    for (const game of games) {
      test(`Check play GA Event for ${game}`, async ({}, testInfo) => {
        try {
          const gaListenEvent1 = waitForGAEvent(page, `ssbt_lottery_lobby_play_${game}`);
          await lobby.gameCard.get(page, game).click();
          await gaListenEvent1;

          const gaListenEvent2 = waitForGAEvent(page, `ssbt_lottery_${game}_quickplay_card_select`);
          await playGame.quickPlay.get(page, game, 0).click();
          await gaListenEvent2;

          const gaListenEvent3 = waitForGAEvent(page, 'ssbt_lottery_quickbets_back_button_clicked');
          await lobby.goBack.get(page).click();
          await gaListenEvent3;

          const gaListenEvent4 = waitForGAEvent(page, `ssbt_lottery_${game}_quickplay_card_select`);
          await playGame.quickPlay.get(page, game, 1).click();
          await gaListenEvent4;

          const gaListenEvent5 = waitForGAEvent(page, 'ssbt_lottery_quickbets_back_button_clicked');
          await lobby.goBack.get(page).click();
          await gaListenEvent5;

          const gaListenEvent6 = waitForGAEvent(page, `ssbt_lottery_${game}_quickplay_card_select`);
          await playGame.quickPlay.get(page, game, 2).click();
          await gaListenEvent6;

          const gaListenEvent7 = waitForGAEvent(page, 'ssbt_consecutive_draws_changed');
          await quickBet.consecutiveDraws.container.number.get(page, 2).click();
          await gaListenEvent7;

          // await quickBet.consecutiveDraws.button.get(page).click();
          // ssbt_lottery_kino_quickplay_submit

          const gaListenEvent8 = waitForGAEvent(page, 'ssbt_lottery_quickbets_back_button_clicked');
          await lobby.goBack.get(page).click();
          await gaListenEvent8;

          const gaListenEvent9 = waitForGAEvent(page, `ssbt_lottery_go_to_${game}_board_clicked`);
          await playGame.customContainer.get(page, game).click();
          await gaListenEvent9;

          await lobbyHeader.backToLobby.get(page).click();

          const gaListenEvent10 = waitForGAEvent(page, 'ssbt_lottery_home_button_click');
          await lobbyHeader.home.get(page).click();
          await gaListenEvent10;
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }

    test('Check learn FAQ GA Event', async ({}, testInfo) => {
      try {
        const gaListenEvent1 = waitForGAEvent(page, 'ssbt_lottery_lobby_educational');
        await lobby.learnTheGame.get(page).click();
        await gaListenEvent1;

        await lobbyLearn.card.get(page, 'faq').click();

        const gaListenEvent2 = waitForGAEvent(page, 'ssbt_lottery_askme_kino');
        await faq.faqSection.txt.get(page, 'kino').click();
        await gaListenEvent2;

        await lobby.goBack.get(page).click();

        const gaListenEvent3 = waitForGAEvent(page, 'ssbt_lottery_askme_powerspin');
        await faq.faqSection.txt.get(page, 'powerspin').click();
        await gaListenEvent3;

        await lobby.goBack.get(page).click();

        const gaListenEvent4 = waitForGAEvent(page, 'ssbt_lottery_askme_other');
        await faq.faqSection.txt.get(page, 'help').click();
        await gaListenEvent4;

        const gaListenEvent9 = waitForGAEvent(page, 'ssbt_lottery_home_button_click');
        await lobbyHeader.home.get(page).click();
        await gaListenEvent9;

        const gaListenEvent10 = waitForGAEvent(page, 'ssbt_lottery_language_toggle');
        await lobbyHeader.languageSwitcher.switchLanguage(page, 'el');
        await gaListenEvent10;
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    for (const game of games) {
      test(`Check learn howTo GA Event for ${game}`, async ({}, testInfo) => {
        try {
          const gaListenEvent1 = waitForGAEvent(page, 'ssbt_lottery_lobby_educational');
          await lobby.learnTheGame.get(page).click();
          await gaListenEvent1;

          await lobbyLearn.card.get(page, 'howto').click();

          const gaListenEvent2 = waitForGAEvent(page, `ssbt_lottery_${game}_video1`);
          await howTo.gameCard.get(page, game).click();
          await gaListenEvent2;

          const gaListenEvent3 = waitForGAEvent(page, `ssbt_lottery_${game}_video2`);
          await howToGame.wrapper.get(page, 1).click();
          await gaListenEvent3;

          await lobby.goBack.get(page).click();

          const gaListenEvent9 = waitForGAEvent(page, 'ssbt_lottery_home_button_click');
          await lobbyHeader.home.get(page).click();
          await gaListenEvent9;
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    }
  });
}

module.exports = { runTests };
