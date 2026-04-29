// playwright/common/bettie/vertical/learn/howTo/howTo2Game_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';
import howTo from '#/pageObjects/bettie/learn/howTo/howTo1';
import howToGame from '#/pageObjects/bettie/learn/howTo/howTo2Game';
import playGame from '#/pageObjects/bettie/play/playGame';

function runTests(game) {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({ width: 1080, height: 1920, fullscreen: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Bettie - Check elements of Learn howTo2Game Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGameVertical.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
      await howTo.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGameVertical.isVisible(page);
    });

    defineHeaderCheck(game, () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn howTo2Game Page', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGameVertical.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
      await howTo.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGameVertical.isVisible(page);
    });

    test('Check elements of Learn howTo2Game Page', async ({}, testInfo) => {
      try {
        await lobby.goBack.shouldContainText(page);
        // Behavioral differences in vertical, change to notExists
        await howToGame.tapHereToPlay.notExists(page, game);

        await howToGame.video.shouldHaveVideo(page, game, 0);
        await howToGame.video.progressTime.shouldHaveText(page);
        await howToGame.video.progressBar.isVisible(page);
        await howToGame.video.rewind.isVisible(page);
        await howToGame.video.play.isVisible(page);
        await howToGame.video.forward.isVisible(page);

        await howToGame.wrapper.isActive(page, game, 0);
        await howToGame.wrapper.video.shouldHaveVideo(page, game, 0);
        await howToGame.wrapper.video.label.shouldHaveText(page, 0);
        await howToGame.wrapper.video.icon.isVisible(page, 0);
        await howToGame.wrapper.video.txt.shouldHaveText(page, 0);

        await howToGame.wrapper.isDisabled(page, 1);
        await howToGame.wrapper.video.shouldHaveVideo(page, game, 1);
        await howToGame.wrapper.video.label.notExists(page, 1);
        await howToGame.wrapper.video.icon.notExists(page, 1);
        await howToGame.wrapper.video.txt.shouldHaveText(page, 1);

        // Behavioral differences in vertical, change to isHidden
        await howToGame.toggle.isHidden(page);
        // Behavioral differences in vertical, change to shouldHavegif
        await howToGame.banner.shouldHavegif(page, game);
        // Behavioral differences in vertical, change to isVisible
        await howToGame.bannerSeparator.isVisible(page);
        // Behavioral differences in vertical, change to isVisible & shouldHaveText
        await howToGame.linkToPlay.logo.isVisible(page, game);
        await howToGame.linkToPlay.textGame.shouldHaveText(page);

        await lobby.terminalInfo.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    // Behavioral differences in vertical, change to click
    test('Select elements of Learn howTo2Game Page - linkToPlay click', async ({}, testInfo) => {
      try {
        await howToGame.linkToPlay.get(page, game).click();
        // check playGame area
        await playGame.infoTitle.shouldHaveText(page);
        await playGame.customContainer.notExists(page, game);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
