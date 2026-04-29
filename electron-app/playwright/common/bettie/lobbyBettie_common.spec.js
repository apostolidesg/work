// playwright/common/bettie/lobbyBettie_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';

function runTests() {
  test.describe('Bettie Page', () => {
    let electronApp, page;

    test.beforeAll(async () => {
      ({ electronApp, page } = await launchElectronApp());
    });

    test.afterAll(async () => {
      if (electronApp) await electronApp.close();
    });

    test('Check elements of Bettie Lobby Header', async ({}, testInfo) => {
      try {
        await lobbyHeader.logo.isVisible(page, 'lobby');
        await lobbyHeader.gamesGuide.shouldHaveText(page);
        await lobbyHeader.languageSwitcher.shouldHaveText(page);
        await lobbyHeader.responsibleGaming.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Check elements of Lobby Header - Responsible Gaming', async ({}, testInfo) => {
      try {
        await lobbyHeader.responsibleGaming.get(page).click();
        await lobbyHeader.responsibleGaming.txt.shouldHaveText(page);
        await lobbyHeader.responsibleGaming.close.get(page).click();
        await lobbyHeader.responsibleGaming.get(page).click();
        await lobbyHeader.responsibleGaming.OK.shouldHaveText(page);
        await lobbyHeader.responsibleGaming.OK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Lobby Page', async ({}, testInfo) => {
      try {
        await lobby.learnTheGame.isVisible(page);

        await lobby.gameCard.isVisible(page, 'kino');
        await lobby.gameCard.img.isVisible(page, 'kino');
        await lobby.gameCard.btn.shouldHaveText(page, 'kino');
        await lobby.gameCard.btn.shouldHaveBackground(page, 'kino');

        await lobby.gameCard.isVisible(page, 'powerspin');
        await lobby.gameCard.img.isVisible(page, 'powerspin');
        await lobby.gameCard.btn.shouldHaveText(page, 'powerspin');

        await lobby.terminalInfo.shouldHaveText(page);

        await lobby.lobbyVideo.shouldHaveVideo(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Bettie screenshot - lobbyBettie', () => {
    let electronApp, page;

    test.beforeAll(async () => {
      ({ electronApp, page } = await launchElectronApp({ width: 1600, height: 900, fullscreen: false }));
    });

    test.afterAll(async () => {
      if (electronApp) await electronApp.close();
    });

    test('Check screenshot - lobbyBettie @visual', async ({}, testInfo) => {
      try {
        await screenshotMatch(page, 'lobbyBettie.png');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
