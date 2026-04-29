// playwright/common/lobby_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';

function runTests() {
  test.describe('Book of Games Page', () => {
    let electronApp, page;

    test.beforeAll(async () => {
      ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
    });

    test.afterAll(async () => {
      if (electronApp) await electronApp.close();
    });

    test('Check elements of Lobby Header', async ({}, testInfo) => {
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
        await lobbyGames.eurojackpot.isVisible(page);
        await lobbyGames.eurojackpot.text.shouldHaveText(page);
        await lobbyGames.pameStoixima.isVisible(page);
        await lobbyGames.pameStoixima.shouldHaveImg(page);
        await lobbyGames.kino.isVisible(page);
        await lobbyGames.kino.shouldHaveImg(page);
        await lobbyGames.powerspin.isVisible(page);
        await lobbyGames.powerspin.shouldHaveImg(page);
        await lobbyGames.virtuals.isVisible(page);
        await lobbyGames.virtuals.shouldHaveImg(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
