// playwright/common/bettie/learn/FAQ/FAQ1_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import { defineHeaderCheck, defineHeaderSelect } from '#/common/bettie/_shared';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';
import faq from '#/pageObjects/bettie/learn/FAQ/FAQ1';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp());
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Bettie - Check elements of Learn FAQ Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    defineHeaderCheck('lobby', () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn FAQ Lobby Header', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Select and Check Learn Lobby Header - Back To Lobby', async ({}, testInfo) => {
      try {
        await lobbyHeader.home.get(page).click();
        await lobbyHeader.logo.isVisible(page, 'lobby');
        await lobby.learnTheGame.isVisible(page);
        await lobby.learnTheGame.get(page).click();
        await lobbyLearn.card.get(page, 'faq').click();
        await lobbyHeader.logo.isVisible(page, 'lobby');
        await faq.video.shouldHaveVideo(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    defineHeaderSelect('lobby', () => page);
  });

  test.describe('Bettie - Select and Check elements of Learn FAQ Page', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check elements of Learn FAQ Page', async ({}, testInfo) => {
      try {
        //similar to ./playwright/common/bettie/lobbyBettie_common.spec.js
        await lobby.goBack.shouldContainText(page);

        await faq.faqSection.img.isVisible(page, 'kino');
        await faq.faqSection.txt.shouldHaveText(page, 'kino');

        await faq.faqSection.img.isVisible(page, 'powerspin');
        await faq.faqSection.txt.shouldHaveText(page, 'powerspin');

        await faq.faqSection.img.notExists(page, 'help');
        await faq.faqSection.txt.shouldHaveText(page, 'help');

        await lobby.terminalInfo.shouldHaveText(page);

        await faq.video.shouldHaveVideo(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select elements of Learn FAQ Page - Back', async ({}, testInfo) => {
      try {
        await lobby.goBack.get(page).click();
        await lobbyLearn.card.textContent.shouldHaveText(page, 'faq');
        await lobbyLearn.card.get(page, 'faq').click();
        await faq.faqSection.txt.shouldHaveText(page, 'powerspin');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Bettie screenshot - FAQ1', () => {
    test.beforeEach(async () => {
      await lobby.learnTheGame.get(page).click();
      await lobbyLearn.card.get(page, 'faq').click();
    });

    test.afterEach(async () => {
      await lobbyHeader.home.get(page).click();
      await lobby.learnTheGame.isVisible(page);
    });

    test('Check screenshot - FAQ1 @visual', async ({}, testInfo) => {
      try {
        await page.waitForTimeout(2000);
        await screenshotMatch(page, 'FAQ1.png');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
