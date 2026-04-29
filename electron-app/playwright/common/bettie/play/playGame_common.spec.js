// playwright/common/bettie/play/playGame_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import playGame from '#/pageObjects/bettie/play/playGame';

function runTests(game) {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp());
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
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderCheck(game, () => page);
  });

  test.describe(`Bettie - Check elements of Play Game Cards (${game})`, () => {
    test.beforeEach(async () => {
      await lobby.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
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
              await playGame.quickPlay.button.shouldHaveText(page, game, i);
              await playGame.quickPlay.button.chevron.isVisible(page, game, i);
            }
            break;
          }
          case 'powerspin':
            const titleCategory2 = ['num', 'symbol', 'color'];
            const prices2 = ['1€', '2€', '5€'];

            for (let i = 0; i < titleCategory2.length; i++) {
              await playGame.quickPlay.title.shouldHaveText(page, game, i, undefined, titleCategory2[i]);
              await playGame.quickPlay.price.shouldHaveText(page, game, i, prices2[i]);
              await playGame.quickPlay.button.shouldHaveText(page, game, i);
              await playGame.quickPlay.button.chevron.isVisible(page, game, i);
            }
            break;
        }

        await playGame.customContainer.shouldHaveText(page, game);
        await playGame.customContainer.shouldHaveBackground(page, game);

        await lobby.terminalInfo.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe(`Bettie - Select Elements of Play Game Header (${game})`, () => {
    test.beforeEach(async () => {
      await lobby.gameCard.get(page, game).click();
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
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    defineHeaderSelect(game, () => page);
  });

  test.describe(`Bettie - Select Elements of Play Game Cards (${game})`, () => {
    test.beforeEach(async () => {
      await lobby.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Select and Check Play Game Cards - Info', async ({}, testInfo) => {
      try {
        await playGame.infoTitle.img.get(page).click();
        await playGame.infoTitle.txt.shouldHaveText(page, game);
        await playGame.infoTitle.close.get(page).click();
        await playGame.infoTitle.img.get(page).click();
        await playGame.infoTitle.OK.shouldHaveText(page);
        await playGame.infoTitle.OK.get(page).click();
        await playGame.infoTitle.OK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    switch (game) {
      case 'kino':
        test('Select and Check Play Game Cards - Select Numbers Opens', async ({}, testInfo) => {
          try {
            await playGame.selectNumber.draws.notExists(page);
            await playGame.selectNumber.get(page).click();
            await playGame.selectNumber.draws.shouldHaveText(page);
            await playGame.selectNumber.get(page).click();
            await playGame.selectNumber.draws.notExists(page);
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });

        test('Select and Check Play Game Cards - Select Numbers Pick', async ({}, testInfo) => {
          try {
            await playGame.selectNumber.get(page).click();
            await playGame.selectNumber.draws.numbers.onlyOneActive(page, 5); // default
            await playGame.selectNumber.draws.numbers.get(page, 0).click();
            await playGame.selectNumber.draws.numbers.onlyOneActive(page, 0);
            await playGame.selectNumber.draws.notExists(page);

            const titleNumbers1 = [2, 6, 6];
            const prices1 = ['1€', '3€', '6€'];

            for (let i = 0; i < titleNumbers1.length; i++) {
              await playGame.quickPlay.title.shouldHaveText(page, game, i, titleNumbers1[i]);
              if (i === 2) {
                await playGame.quickPlay.title.bonusKino.isVisible(page, game, i); // only on 2
              }
              await playGame.quickPlay.price.shouldHaveText(page, game, i, prices1[i]);
              await playGame.quickPlay.button.shouldHaveText(page, game, i);
              await playGame.quickPlay.button.chevron.isVisible(page, game, i);
            }

            await playGame.selectNumber.get(page).click();
            await playGame.selectNumber.draws.numbers.get(page, 8).click();
            await playGame.selectNumber.get(page).click();
            await playGame.selectNumber.draws.numbers.onlyOneActive(page, 8);

            const titleNumbers2 = [2, 6, 6];
            const prices2 = ['1€', '3€', '6€'];

            for (let i = 0; i < titleNumbers2.length; i++) {
              await playGame.quickPlay.title.shouldHaveText(page, game, i, titleNumbers2[i]);
              if (i === 2) {
                await playGame.quickPlay.title.bonusKino.isVisible(page, game, i); // only on 2
              }
              await playGame.quickPlay.price.shouldHaveText(page, game, i, prices2[i]);
              await playGame.quickPlay.button.shouldHaveText(page, game, i);
              await playGame.quickPlay.button.chevron.isVisible(page, game, i);
            }
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });
        break;
    }
  });
}

module.exports = { runTests };
