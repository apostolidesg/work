// playwright/common/bettie/learn/FAQ/FAQ2QuestionsGame_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';
import faq from '#/pageObjects/bettie/learn/FAQ/FAQ1';
import faq2Questions from '#/pageObjects/bettie/learn/FAQ/FAQ2QuestionsGame';
const world = require('#/pageObjects/lib/world');

function runTests(game) {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp());
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

    test('Select and Check Lobby Header - Back To Lobby', async ({}, testInfo) => {
      try {
        await lobbyHeader.home.get(page).click();
        await lobbyHeader.logo.isVisible(page, 'lobby');
        await lobby.learnTheGame.isVisible(page);
        await lobby.learnTheGame.get(page).click();
        await lobbyLearn.card.get(page, 'faq').click();
        await faq.faqSection.txt.get(page, game).click();
        await lobbyHeader.logo.isVisible(page, game);
        await faq2Questions.video.shouldHaveVideo(page, game);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    defineHeaderSelect(game, () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn FAQ Questions Page - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check elements of Learn FAQ Questions Page', async ({}, testInfo) => {
      try {
        await lobby.goBack.shouldContainText(page);

        await faq2Questions.question.shouldHaveCount(page, game);

        for (let i = 0; i < faq2Questions.question.text[game][world.lang].length; i++) {
          await faq2Questions.question.shouldHaveTextAt(page, game, i);
        }

        await lobby.terminalInfo.shouldHaveText(page);

        await faq2Questions.video.shouldHaveVideo(page, game);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select elements of Learn FAQ Questions Page - Back', async ({}, testInfo) => {
      try {
        await lobby.goBack.get(page).click();

        await faq.faqSection.txt.shouldHaveText(page, game);
        await faq.faqSection.txt.get(page, game).click();

        await faq2Questions.question.shouldHaveCount(page, game);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
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
        await screenshotMatch(page, `FAQ2-${game}.png`);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
