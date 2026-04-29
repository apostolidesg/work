// playwright/common/bettie/learn/howTo/howTo2Game_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';
import howTo from '#/pageObjects/bettie/learn/howTo/howTo1';
import howToGame from '#/pageObjects/bettie/learn/howTo/howTo2Game';
import faq from '#/pageObjects/bettie/learn/FAQ/FAQ1';

function runTests(game) {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp());
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Bettie - Check elements of Learn howTo2Game Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
      await howTo.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderCheck(game, () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn howTo2Game Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
      await howTo.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Select and Check Lobby Header - Back To Lobby', async ({}, testInfo) => {
      try {
        await lobbyHeader.home.get(page).click();
        await lobbyHeader.logo.isVisible(page, 'lobby');
        await lobby.learnTheGame.isVisible(page);
        await lobby.learnTheGame.get(page).click();
        await lobbyLearn.card.get(page, 'howto').click();
        await howTo.gameCard.get(page, game).click();
        await lobbyHeader.logo.isVisible(page, game);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    defineHeaderSelect(game, () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn howTo2Game Page', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
      await howTo.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check elements of Learn howTo2Game Page', async ({}, testInfo) => {
      try {
        await lobby.goBack.shouldContainText(page);
        await howToGame.tapHereToPlay.shouldHaveText(page, game);

        await howToGame.video.shouldHaveVideo(page, game, 0);
        await howToGame.video.progressTime.shouldHaveText(page);
        await howToGame.video.progressBar.isVisible(page);
        await howToGame.video.rewind.isVisible(page);
        await howToGame.video.play.isVisible(page);
        await howToGame.video.forward.isVisible(page);

        await howToGame.wrapper.isActive(page, game, 0);
        await howToGame.wrapper.video.shouldHaveVideo(page, game, 0);
        await howToGame.wrapper.video.label.shouldHaveText(page, 0);
        await howToGame.wrapper.video.icon.notExists(page, 0);
        await howToGame.wrapper.video.txt.shouldHaveText(page, 0);

        await howToGame.wrapper.isDisabled(page, 1);
        await howToGame.wrapper.video.shouldHaveVideo(page, game, 1);
        await howToGame.wrapper.video.label.notExists(page, 1);
        await howToGame.wrapper.video.icon.notExists(page, 1);
        await howToGame.wrapper.video.txt.shouldHaveText(page, 1);
        // Behavioral differences in vertical, change to isHidden
        await howToGame.toggle.isVisible(page);
        // Behavioral differences in vertical, change to shouldHavegif
        await howToGame.banner.notExists(page, game);
        // Behavioral differences in vertical, change to isVisible
        await howToGame.bannerSeparator.notExists(page);
        // Behavioral differences in vertical, change to isVisible & shouldHaveText
        await howToGame.linkToPlay.notExists(page);

        await lobby.terminalInfo.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select elements of Learn howTo2Game Page - Back', async ({}, testInfo) => {
      try {
        await lobby.goBack.get(page).click();
        await howTo.gameCard.isVisible(page, game);
        await howTo.gameCard.get(page, game).click();
        await howToGame.video.shouldHaveVideo(page, game, 0);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select elements of Learn howTo2Game Page - wrapper 1 2', async ({}, testInfo) => {
      try {
        await howToGame.wrapper.get(page, 1).click();

        await howToGame.wrapper.isDisabled(page, 0);
        await howToGame.wrapper.video.shouldHaveVideo(page, game, 0);
        await howToGame.wrapper.video.label.notExists(page, 0);
        await howToGame.wrapper.video.icon.notExists(page, 0);
        await howToGame.wrapper.video.txt.shouldHaveText(page, 0);

        await howToGame.wrapper.isActive(page, game, 1);
        await howToGame.wrapper.video.shouldHaveVideo(page, game, 1);
        await howToGame.wrapper.video.label.shouldHaveText(page, 1);
        await howToGame.wrapper.video.icon.notExists(page, 1);
        await howToGame.wrapper.video.txt.shouldHaveText(page, 1);

        await howToGame.video.shouldHaveVideo(page, game, 1);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select elements of Learn howTo2Game Page - toggle up down', async ({}, testInfo) => {
      try {
        await howToGame.wrapper.get(page, 0).click();
        await howToGame.toggle.get(page).click();

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

        await howToGame.wrapper.get(page, 1).click();

        await howToGame.wrapper.isDisabled(page, 0);
        await howToGame.wrapper.video.shouldHaveVideo(page, game, 0);
        await howToGame.wrapper.video.label.notExists(page, 0);
        await howToGame.wrapper.video.icon.notExists(page, 0);
        await howToGame.wrapper.video.txt.shouldHaveText(page, 0);

        await howToGame.wrapper.isActive(page, game, 1);
        await howToGame.wrapper.video.shouldHaveVideo(page, game, 1);
        await howToGame.wrapper.video.label.shouldHaveText(page, 1);
        await howToGame.wrapper.video.icon.isVisible(page, 1);
        await howToGame.wrapper.video.txt.shouldHaveText(page, 1);

        await howToGame.video.shouldHaveVideo(page, game, 1);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Bettie screenshot - howTo2 - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
      await howTo.gameCard.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check screenshot - howTo2 @visual', async ({}, testInfo) => {
      try {
        await screenshotMatch(page, `howTo2-${game}.png`);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
