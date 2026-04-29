// playwright/common/bettie/learn/howTo/howTo1_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';
import howTo from '#/pageObjects/bettie/learn/howTo/howTo1';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp());
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Bettie - Check elements of Learn HowTo1 Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderCheck('lobby', () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn HowTo1 Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Select and Check Learn Lobby Header - Back To Lobby', async ({}, testInfo) => {
      try {
        await lobbyHeader.home.get(page).click();
        await lobbyHeader.logo.isVisible(page, 'lobby');
        await lobby.learnTheGame.isVisible(page);
        await lobby.learnTheGame.get(page).click();
        await lobbyLearn.card.get(page, 'howto').click();
        await lobbyHeader.logo.isVisible(page, 'lobby');
        await howTo.video.shouldHaveVideo(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    defineHeaderSelect('lobby', () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn HowTo1 Page', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check elements of Learn HowTo1 Page', async ({}, testInfo) => {
      try {
        //similar to ./playwright/common/bettie/lobbyBettie_common.spec.js
        await lobby.goBack.shouldContainText(page);

        await howTo.gameCard.isVisible(page, 'kino');
        await howTo.gameCard.img.isVisible(page, 'kino');
        await howTo.gameCard.btn.shouldHaveText(page, 'kino');
        await howTo.gameCard.btn.shouldHaveBackground(page, 'kino');

        await howTo.gameCard.isVisible(page, 'powerspin');
        await howTo.gameCard.img.isVisible(page, 'powerspin');
        await howTo.gameCard.btn.shouldHaveText(page, 'powerspin');

        await lobby.terminalInfo.shouldHaveText(page);

        await howTo.video.shouldHaveVideo(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select elements of Learn HowTo1 Page - Back', async ({}, testInfo) => {
      try {
        await lobby.goBack.get(page).click();
        await lobbyLearn.card.textContent.shouldHaveText(page, 'howto');
        await lobbyLearn.card.get(page, 'howto').click();
        await howTo.gameCard.isVisible(page, 'powerspin');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Bettie screenshot - howTo1', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'howto').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check screenshot - howTo1 @visual', async ({}, testInfo) => {
      try {
        await screenshotMatch(page, 'howTo1.png');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
