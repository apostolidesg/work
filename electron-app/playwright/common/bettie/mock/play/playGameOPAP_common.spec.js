// playwright/common/bettie/mock/play/playGameOPAP_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import playGame from '#/pageObjects/bettie/play/playGame';

function runTests(game, brand) {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { BRAND_NAME: 'OPAP' }));
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

  test.describe(`Bettie - Select Elements of Play Game Header (${game})`, () => {
    test.beforeEach(async () => {
      await lobby.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderSelect(game, brand, () => page);
  });
}

module.exports = { runTests };
