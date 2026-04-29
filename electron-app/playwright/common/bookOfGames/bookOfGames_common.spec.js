// playwright/common/bookOfGames/bookOfGames_common.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import bookOfGames from '#/pageObjects/bookOfGames/bookOfGames';

function runTests() {
  test.describe('Book of Games Page', () => {
    let electronApp, page;

    test.beforeAll(async () => {
      ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
    });

    test.afterAll(async () => {
      if (electronApp) await electronApp.close();
    });

    test('Select BookOfGames', async ({}, testInfo) => {
      try {
        await lobbyHeader.gamesGuide.shouldHaveText(page);
        await lobbyHeader.gamesGuide.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Lobby Header inside BookOfGames', async ({}, testInfo) => {
      try {
        await lobbyHeader.OPAPLogo.isVisible(page);
        await lobbyHeader.backToLobby.shouldHaveText(page);
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

    test('Check header text', async ({}, testInfo) => {
      try {
        await bookOfGames.header.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check BookOfGames images and QR codes', async ({}, testInfo) => {
      try {
        await bookOfGames.BookOfGamesBackgroungImg.shouldHaveImg(page);
        await bookOfGames.BookOfGamesImage0.isVisible(page);
        await bookOfGames.BookOfGamesQRCode0.isVisible(page);
        await bookOfGames.BookOfGamesImage1.isVisible(page);
        await bookOfGames.BookOfGamesQRCode1.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Exit BookOfGames - Return to Lobby', async ({}, testInfo) => {
      try {
        await lobbyHeader.backToLobby.get(page).click();
        await lobbyGames.eurojackpot.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
