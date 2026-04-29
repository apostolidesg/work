// playwright/common/bettie/vertical/play/playGame_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import playGame from '#/pageObjects/bettie/play/playGame';

function runTests(game) {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({ width: 1080, height: 1920, fullscreen: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe(`Bettie - Check elements of Play Game Header (${game})`, () => {
    test.beforeEach(async () => {
      console.log(`Select (${game})`);
      await lobby.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      console.log(`Exit (${game})`);
      await lobbyHeader.home.get(page).click();
      await lobby.lobbyVideo.shouldHaveVideo(page);
    });

    defineHeaderCheck(game, () => page);
  });

  test.describe(`Bettie - Check elements of Play Game Cards (${game})`, () => {
    test.beforeEach(async () => {
      await lobby.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.lobbyVideo.shouldHaveVideo(page);
    });

    test('Check elements of Play Game Cards', async ({}, testInfo) => {
      try {
        await playGame.infoTitle.shouldHaveText(page);
        await playGame.infoTitle.img.isVisible(page);

        switch (game) {
          case 'kino': {
            await playGame.selectNumber.shuffle.isVisible(page);
            await playGame.selectNumber.number.shouldHaveText(page, '6');
            await playGame.selectNumber.chevron.isVisible(page);

            const titleNumbers1 = [2, 6, 6];
            const prices1 = ['1€', '3€', '6€'];

            for (let i = 0; i < titleNumbers1.length; i++) {
              await playGame.quickPlay.title.shouldHaveText(page, game, i, titleNumbers1[i]);
              if (i === 2) {
                await playGame.quickPlay.title.bonusKino.isVisible(page, game, i); // only on 2
              }
              await playGame.quickPlay.price.shouldHaveText(page, game, i, prices1[i]);
              // Behavioral differences in vertical, change to notExists
              await playGame.quickPlay.button.notExists(page, game, i);
              await playGame.quickPlay.button.chevron.notExists(page, game, i);
            }
            break;
          }
          case 'powerspin':
            const titleCategory2 = ['num', 'symbol', 'color'];
            const prices2 = ['1€', '2€', '5€'];

            for (let i = 0; i < titleCategory2.length; i++) {
              await playGame.quickPlay.title.shouldHaveText(page, game, i, undefined, titleCategory2[i]);
              await playGame.quickPlay.price.shouldHaveText(page, game, i, prices2[i]);
              // Behavioral differences in vertical, change to notExists
              await playGame.quickPlay.button.notExists(page, game, i);
              await playGame.quickPlay.button.chevron.notExists(page, game, i);
            }
            break;
        }

        // Behavioral differences in vertical, change to notExists
        await playGame.customContainer.notExists(page, game);

        await lobby.terminalInfo.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
