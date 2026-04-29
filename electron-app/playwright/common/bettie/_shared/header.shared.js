// playwright/common/bettie/_shared/header.shared.js
import { test } from '@playwright/test';
import { screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobby from '#/pageObjects/bettie/lobbyBettie';

// A) Bettie - Check elements of Play / QuickBets Header (${game})
export function defineHeaderCheck(game, getPage = {}) {
  // game lobby | kino | powerspin
  let page;

  test.beforeEach(async () => {
    page = getPage();
  });

  test('Check elements of QuickBets Header - game=' + game, async ({}, testInfo) => {
    try {
      await lobbyHeader.logo.isVisible(page, game);
      await lobbyHeader.home.shouldHaveText(page);
      await lobbyHeader.home.img.isVisible(page);
      if (game !== 'lobby' && game !== 'help') {
        await lobbyHeader.termsAndConditions.shouldHaveText(page);
        await lobbyHeader.howToPlay.shouldHaveText(page);
      }
      await lobbyHeader.cashOut.shouldHaveText(page);
      await lobbyHeader.digitalPay.shouldHaveText(page);
      await lobbyHeader.balance.eyeIcon.isVisible(page);
      await lobbyHeader.balance.refresh.get(page).click();
      await lobbyHeader.balance.shouldContain(page);
      await lobbyHeader.languageSwitcher.shouldHaveText(page);
      await lobbyHeader.responsibleGaming.isVisible(page);
    } catch (error) {
      await screenshotError(page, testInfo);
      throw error;
    }
  });
}

// Β) Bettie - Select Elements of Play / QuickBets Header (${game})
export function defineHeaderSelect(game, maybeBrandOrGetPage, maybeGetPage) {
  // allow defineHeaderSelect(game, getPage) OR defineHeaderSelect(game, brand, getPage)
  let brand, getPage;
  if (typeof maybeBrandOrGetPage === 'function') {
    brand = undefined;
    getPage = maybeBrandOrGetPage;
  } else {
    brand = maybeBrandOrGetPage;
    getPage = maybeGetPage;
  }

  // game lobby | kino | powerspin
  let page;

  test.beforeEach(async () => {
    page = getPage();
  });

  // test.skip('Select and Check Lobby Header - Back To Lobby - not here', async ({}, testInfo) => {
  //   try {
  //     // this test must be created before the function defineHeaderSelect
  //
  //     await lobbyHeader.home.get(page).click();
  //     await lobbyHeader.logo.isVisible(page, 'lobby');
  //     await lobby.learnTheGame.isVisible(page);
  //     await lobby.learnTheGame.get(page).click();
  //     await lobbyHeader.logo.isVisible(page, game);
  //   } catch (error) {
  //     await screenshotError(page, testInfo);
  //     throw error;
  //   }
  // });

  if (game !== 'lobby' && game !== 'help') {
    test('Select and Check Lobby Header - Terms & Conditions', async ({}, testInfo) => {
      try {
        await lobbyHeader.termsAndConditions.get(page).click();
        // Use brand (from mock) when provided; otherwise fall back to game
        await lobbyHeader.termsAndConditions.txt.shouldHaveText(page, brand ?? game);
        await lobbyHeader.termsAndConditions.close.get(page).click();
        await lobbyHeader.termsAndConditions.get(page).click();
        await lobbyHeader.termsAndConditions.OK.shouldHaveText(page);
        await lobbyHeader.termsAndConditions.OK.get(page).click();
        await lobbyHeader.termsAndConditions.OK.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Check Lobby Header - How To Play', async ({}, testInfo) => {
      try {
        await lobbyHeader.howToPlay.get(page).click();
        await lobbyHeader.howToPlay.txt.shouldHaveText(page, 'true');
        for (let i = 0; i <= 4; i++) {
          await lobbyHeader.howToPlay.helpIcon.shouldHaveImg(page, i);
        }
        await lobbyHeader.howToPlay.close.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  }

  test('Select and Check Lobby Header - Cash Out', async ({}, testInfo) => {
    try {
      await lobbyHeader.cashOut.get(page).click();
      await lobbyHeader.cashOut.txt.shouldHaveText(page);
      await lobbyHeader.cashOut.no.shouldHaveText(page);
      await lobbyHeader.cashOut.yes.shouldHaveText(page);
      await lobbyHeader.cashOut.no.get(page).click();
    } catch (error) {
      await screenshotError(page, testInfo);
      throw error;
    }
  });

  test('Select and Check Lobby Header - Digital Pay', async ({}, testInfo) => {
    try {
      await lobbyHeader.cashOut.shouldHaveText(page);
      await lobbyHeader.balance.shouldContain(page);
      await lobbyHeader.cashOut.isEnabled(page);
      await lobbyHeader.digitalPay.shouldHaveText(page);
      await lobbyHeader.digitalPay.get(page).click();
      await lobbyHeader.balance.shouldHaveZero(page);
      await lobbyHeader.cashOut.isDisabled(page);
      await lobbyHeader.balance.refresh.get(page).click();
      await lobbyHeader.balance.shouldContain(page);
      await lobbyHeader.cashOut.isEnabled(page);
    } catch (error) {
      await screenshotError(page, testInfo);
      throw error;
    }
  });

  test('Select and Check Lobby Header - Balance', async ({}, testInfo) => {
    try {
      await lobbyHeader.balance.shouldContain(page);
      await lobbyHeader.balance.refresh.get(page).click();
      await lobbyHeader.balance.eyeIcon.get(page).click();
      await lobbyHeader.balance.shouldHaveText(page);
      await lobbyHeader.balance.refresh.notExists(page);
      await lobbyHeader.balance.eyeIcon.get(page).click();
      await lobbyHeader.balance.shouldContain(page);
    } catch (error) {
      await screenshotError(page, testInfo);
      throw error;
    }
  });

  test('Select and Check Lobby Header - Responsible Gaming', async ({}, testInfo) => {
    try {
      await lobbyHeader.responsibleGaming.get(page).click();
      // Use brand (from mock) when provided; otherwise fall back to game
      await lobbyHeader.responsibleGaming.txt.shouldHaveText(
        page,
        (typeof brand !== 'undefined' ? brand : undefined) ??
          (typeof game !== 'undefined' ? game : undefined) ??
          undefined,
      );
      await lobbyHeader.responsibleGaming.close.get(page).click();
      await lobbyHeader.responsibleGaming.get(page).click();
      await lobbyHeader.responsibleGaming.OK.shouldHaveText(page);
      await lobbyHeader.responsibleGaming.OK.get(page).click();
      await lobbyHeader.responsibleGaming.OK.get(page).click();
    } catch (error) {
      await screenshotError(page, testInfo);
      throw error;
    }
  });
}
