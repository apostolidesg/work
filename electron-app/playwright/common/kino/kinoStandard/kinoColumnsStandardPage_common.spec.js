// playwright/common/kino/kinoStandard/kinoColumnsStandardPage_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import oddEvenColumns from '#/pageObjects/kino/kinoOddEvenColumns';
import settings from '#/pageObjects/kino/kinoSettings';
import playArea from '#/pageObjects/kino/kinoPlayArea';
import sideScreen from '#/pageObjects/kino/kinoSideScreen';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Kino Page - Check Columns Elements', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      // await oddEvenColumns.columns.buttons.close.get(page).click();
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select Kino Columns game from KINO Standard game', async ({}, testInfo) => {
      try {
        await sideScreen.columns.icon.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Kino Columns Logo from KINO Standard game', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.isVisible(page);
        await oddEvenColumns.columns.gameLogo.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Kino Columns elements from KINO Standard game', async ({}, testInfo) => {
      try {
        await oddEvenColumns.columns.labels.selection.shouldHaveText(page);
        await oddEvenColumns.columns.labels.selectionInfo.shouldHaveText(page);
        await oddEvenColumns.columns.options.shouldHaveText(page);
        await oddEvenColumns.columns.labels.betAmount.shouldHaveText(page);
        await oddEvenColumns.columns.amounts.shouldHaveText(page);
        await oddEvenColumns.columns.buttons.clear.shouldHaveText(page);
        await oddEvenColumns.columns.buttons.add.shouldHaveText(page);
        await oddEvenColumns.columns.buttons.close.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
