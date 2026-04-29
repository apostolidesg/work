// playwright/common/bettie/mock/learn/FAQ/FAQ2QuestionsGameDigitalPay_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
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
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_PAY_ENABLED: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('mock: Bettie - Check elements of Learn FAQ Questions Lobby Header digitalPay.notExist-' + game, () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
      await faq.faqSection.txt.get(page, game).click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    // defineHeaderCheck(game, () => page); // we mock DIGITAL_PAY
    test('mock: Check elements of QuickBets Header digitalPay.notExist - game=' + game, async ({}, testInfo) => {
      try {
        await lobbyHeader.logo.isVisible(page, game);
        await lobbyHeader.home.shouldHaveText(page);
        await lobbyHeader.home.img.isVisible(page);
        if (game !== 'lobby' && game !== 'help') {
          await lobbyHeader.termsAndConditions.shouldHaveText(page);
          await lobbyHeader.howToPlay.shouldHaveText(page);
        }
        await lobbyHeader.cashOut.shouldHaveText(page);

        // Behavioral differences in mock
        await lobbyHeader.digitalPay.notExists(page);

        await lobbyHeader.balance.eyeIcon.isVisible(page);
        await lobbyHeader.balance.refresh.get(page).click();
        await lobbyHeader.balance.shouldContain(page);
        await lobbyHeader.languageSwitcher.shouldHaveText(page);
        await lobbyHeader.responsibleGaming.isVisible(page);

        // check that we are in the correct page
        await faq2Questions.question.shouldHaveTextAt(page, game, 0);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe(
    'mock: Bettie - Select and Check elements of Learn FAQ Questions Lobby Header digitalPay.notExist- ' + game,
    () => {
      test.beforeEach(async () => {
        await lobby.learnTheGame.get(page).click();
        await lobbyLearn.card.get(page, 'faq').click();
        await faq.faqSection.txt.get(page, game).click();
      });

      test.afterEach(async () => {
        await lobbyHeader.home.get(page).click();
        await lobby.learnTheGame.isVisible(page);
      });

      // defineHeaderSelect(game, () => page); // we mock DIGITAL_PAY
      if (game !== 'lobby' && game !== 'help') {
        test('mock: Select and Check Lobby Header - How To Play', async ({}, testInfo) => {
          try {
            await lobbyHeader.howToPlay.get(page).click();
            // this is false because we mock DIGITAL_PAY
            await lobbyHeader.howToPlay.txt.shouldHaveText(page, 'false');
            for (let i = 0; i <= 3; i++) {
              await lobbyHeader.howToPlay.helpIcon.shouldHaveImg(page, i);
            }
            await lobbyHeader.howToPlay.close.get(page).click();
          } catch (error) {
            await screenshotError(page, testInfo);
            throw error;
          }
        });
      }
    },
  );
}

module.exports = { runTests };
