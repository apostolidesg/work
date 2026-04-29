// playwright/common/bettie/learn/FAQ/FAQ3AnswersGame_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';
import faq from '#/pageObjects/bettie/learn/FAQ/FAQ1';
import faq2Questions from '#/pageObjects/bettie/learn/FAQ/FAQ2QuestionsGame';
import faq3Answers from '#/pageObjects/bettie/learn/FAQ/FAQ3AnswersGame';
const world = require('#/pageObjects/lib/world');

function runTests(game) {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp());
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Bettie - Check elements of Learn FAQ Answers Lobby Header - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
      await faq2Questions.question.get(page, '0').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderCheck(game, () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn FAQ Answers Lobby Header - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
      await faq2Questions.question.get(page, '0').click();
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
        await faq2Questions.question.get(page, '0').click();
        await lobbyHeader.logo.isVisible(page, game);
        // await faq3Questions.video.shouldHaveVideo(page, game);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    defineHeaderSelect(game, () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn FAQ Answers Page - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check elements of Learn FAQ Questions to match FAQ Answers Page', async ({}, testInfo) => {
      try {
        for (let i = 0; i < faq2Questions.question.text[game][world.lang].length; i++) {
          await faq2Questions.question.get(page, i).click();
          await lobby.goBack.shouldContainText(page);

          await faq3Answers.answer.isVisible(page);
          await faq3Answers.answer.title.shouldMatchQuestionAt(page, game, i);
          await faq3Answers.answer.close.isVisible(page);
          await faq3Answers.answer.description.shouldHaveTextAt(page, game, i);
          await faq3Answers.answer.cta.shouldHaveText(page, game);

          await lobby.terminalInfo.shouldHaveText(page);

          await faq3Answers.video.shouldHaveVideo(page, game);

          await lobby.goBack.get(page).click();

          await faq2Questions.question.shouldHaveTextAt(page, game, i);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select elements of Learn FAQ Answers Page - Back', async ({}, testInfo) => {
      try {
        await faq2Questions.question.get(page, 1).click();
        await faq3Answers.answer.title.shouldMatchQuestionAt(page, game, 1);

        await lobby.goBack.get(page).click();
        await faq2Questions.question.shouldHaveTextAt(page, game, 1);

        await faq2Questions.question.get(page, 1).click();
        await faq3Answers.answer.title.shouldMatchQuestionAt(page, game, 1);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select elements of Learn FAQ Answers Page - Close', async ({}, testInfo) => {
      try {
        await faq2Questions.question.get(page, 1).click();
        await faq3Answers.answer.title.shouldMatchQuestionAt(page, game, 1);

        await faq3Answers.answer.close.get(page).click();
        await faq2Questions.question.shouldHaveTextAt(page, game, 1);

        await faq2Questions.question.get(page, 1).click();
        await faq3Answers.answer.title.shouldMatchQuestionAt(page, game, 1);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Bettie screenshot - FAQ3 - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
      await faq2Questions.question.get(page, 0).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check screenshot - FAQ3 @visual', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(2000);
        await screenshotMatch(page, `FAQ3-${game}.png`);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
