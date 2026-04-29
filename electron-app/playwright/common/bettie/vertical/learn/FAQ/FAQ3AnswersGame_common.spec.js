// playwright/common/bettie/vertical/learn/FAQ/FAQ3AnswersGame_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
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
    ({ electronApp, page } = await launchElectronApp({ width: 1080, height: 1920, fullscreen: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Bettie - Check elements of Learn FAQ Answers Lobby Header - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGameVertical.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
      await faq2Questions.question.get(page, '0').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.lobbyVideo.shouldHaveVideo(page);
    });

    defineHeaderCheck(game, () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn FAQ Answers Page - ' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGameVertical.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.lobbyVideo.shouldHaveVideo(page);
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
          // Behavioral differences in vertical, change to notExists
          await faq3Answers.answer.cta.notExists(page, game);

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
  });
}

module.exports = { runTests };
