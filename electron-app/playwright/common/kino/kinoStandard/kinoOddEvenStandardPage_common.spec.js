// playwright/common/kino/kinoStandard/kinooddEvenStandardPage_common.spec.js
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

  test.describe('Kino Page - Check Odd Event Elements', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      // await oddEvenColumns.oddEven.buttons.close.get(page).click();
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select Kino Odd Event game from KINO Standard game', async ({}, testInfo) => {
      try {
        await sideScreen.oddEven.icon.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Kino Odd Event Logo from KINO Standard game', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.isVisible(page);
        await oddEvenColumns.oddEven.gameLogo.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Kino Odd Event elements from KINO Standard game', async ({}, testInfo) => {
      try {
        await oddEvenColumns.oddEven.labels.selection.shouldHaveText(page);
        await oddEvenColumns.oddEven.options.odd.shouldHaveText(page);
        await oddEvenColumns.oddEven.options.even.shouldHaveText(page);
        await oddEvenColumns.oddEven.options.draw.shouldHaveText(page);
        await oddEvenColumns.oddEven.labels.betAmount.shouldHaveText(page);
        await oddEvenColumns.oddEven.amounts.shouldHaveText(page);
        await oddEvenColumns.oddEven.buttons.clear.shouldHaveText(page);
        await oddEvenColumns.oddEven.buttons.add.shouldHaveText(page);
        await oddEvenColumns.oddEven.buttons.close.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
