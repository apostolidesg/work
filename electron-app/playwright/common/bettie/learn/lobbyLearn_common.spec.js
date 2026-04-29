// playwright/common/bettie/learn/lobbyLearn_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';
import faq from '#/pageObjects/bettie/learn/FAQ/FAQ1';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({ width: 1600, height: 900, fullscreen: false }));
    await lobby.learnTheGame.get(page).click();
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Bettie - Check elements of Learn Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderCheck('lobby', () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
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
        await lobbyHeader.logo.isVisible(page, 'lobby');
        await lobbyLearn.lobbyVideo.shouldHaveVideo(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    defineHeaderSelect('lobby', () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
    });

    test('Check elements of Lobby Page', async ({}, testInfo) => {
      try {
        await lobbyLearn.card.textContent.shouldHaveText(page, 'faq');
        await lobbyLearn.card.img.isVisible(page, 'faq');

        await lobbyLearn.card.textContent.shouldHaveText(page, 'howto');
        await lobbyLearn.card.img.isVisible(page, 'howto');

        await lobby.terminalInfo.shouldHaveText(page);

        await lobbyLearn.lobbyVideo.shouldHaveVideo(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Bettie screenshot - lobbyLearn - ', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check screenshot - lobbyLearn @visual', async ({}, testInfo) => {
      try {
        await screenshotMatch(page, `lobbyLearn.png`);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
