// playwright/common/bettie/mock/learn/FAQ/FAQ2QuestionsGameOPAP_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';
import faq from '#/pageObjects/bettie/learn/FAQ/FAQ1';
import faq2Questions from '#/pageObjects/bettie/learn/FAQ/FAQ2QuestionsGame';
const world = require('#/pageObjects/lib/world');

function runTests(game, brand) {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { BRAND_NAME: 'OPAP' }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Bettie - Check elements of Learn FAQ Questions Lobby Header - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderCheck(game, () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn FAQ Questions Lobby Header - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderSelect(game, brand, () => page);
  });

  test.describe('Bettie screenshot - FAQ2 - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check screenshot - FAQ2 @visual', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(2000);
        await screenshotMatch(page, `FAQ2-OPAP-${game}.png`);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
