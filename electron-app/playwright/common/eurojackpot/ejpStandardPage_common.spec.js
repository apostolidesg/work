// playwright/common/eurojackpot/ejpStandardPage_common.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import settings from '#/pageObjects/eurojackpot/ejpSettings';
import playArea from '#/pageObjects/eurojackpot/ejpPlayArea';
import sideScreen from '#/pageObjects/eurojackpot/ejpSideScreen';
import lobby from '#/pageObjects/bettie/lobbyBettie';
import lobbyLearn from '#/pageObjects/bettie/learn/lobbyLearn';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Eurojackpot Page - Check Elements', () => {
    test.beforeAll(async () => {
      console.log('Select Eurojackpot');
      await lobbyGames.eurojackpot.text.shouldHaveText(page);
      await lobbyGames.eurojackpot.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Eurojackpot');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.eurojackpot.isVisible(page);
    });

    test('Check elements of Lobby Header inside Eurojackpot', async ({}, testInfo) => {
      try {
        await lobbyHeader.eurojackpotLogo.isVisible(page);
        await lobbyHeader.termsAndConditions.shouldHaveText(page);
        await lobbyHeader.howToPlay.shouldHaveText(page);
        await lobbyHeader.backToLobby.shouldHaveText(page);
        await lobbyHeader.clearAll.shouldHaveText(page);
        await lobbyHeader.cashOut.shouldHaveText(page);
        await lobbyHeader.balance.refresh.get(page).click();
        await lobbyHeader.balance.shouldContain(page);
        await lobbyHeader.languageSwitcher.shouldHaveText(page);
        await lobbyHeader.responsibleGaming.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Settings inside Eurojackpot', async ({}, testInfo) => {
      try {
        await settings.quickPickInfo.shouldHaveText(page);
        await settings.quickPickBtn.shouldHaveText(page);
        await settings.systemHeaderTitle.shouldHaveText(page);
        await settings.systemHeaderInfo.shouldHaveText(page);
        await settings.systemNumbers.shouldHaveText(page);

        for (const value of [12, 13, 14, 15, 23, 24, 25, 34, 35, 45]) {
          console.log('Verify systemButtons = ', value);
          await settings.systemButtons.shouldHaveText(page, value);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Play Area inside Eurojackpot', async ({}, testInfo) => {
      try {
        await playArea.mainNumberHeader.shouldHaveText(page);
        await playArea.mainNumbersTxt.shouldHaveText(page);

        for (let value = 1; value < 51; value++) {
          console.log('Verify mainNumberBtn = ', value);
          await playArea.mainNumberBtn.shouldHaveText(page, value);
        }

        await playArea.euroNumberHeader.shouldHaveText(page);
        await playArea.euroNumbersTxt.shouldHaveText(page);
        for (let value = 1; value < 13; value++) {
          console.log('Verify euroNumberBtn = ', value);
          await playArea.euroNumberBtn.shouldHaveText(page, value);
        }

        console.log('Check Statistics');
        await playArea.statisticsTitle.shouldHaveText(page);
        await playArea.statisticsSwitch.shouldHaveText(page);
        for (let value = 1; value <= 21; value++) {
          await playArea.mainNumbersStatisticsTxt.shouldBeEmpty(page, value);
        }
        for (let value = 1; value <= 6; value++) {
          await playArea.euroNumbersStatisticsTxt.shouldBeEmpty(page, value);
        }

        await playArea.clear.shouldHaveText(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Side Screen inside Eurojackpot', async ({}, testInfo) => {
      try {
        console.log('Check bet slip fields');
        await sideScreen.sideScreenBet.isVisible(page);
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
        await sideScreen.sideScreenBet.addBetslip.shouldHaveText(page);

        for (let i = 1; i <= 5; i++) {
          // area 1, 2, 3, 4, 5
          await sideScreen.sideScreenBet.betslipArea.isHidden(page, i);
        }

        console.log('Check consecutive draws fields');
        await sideScreen.consecutiveDraws.isVisible(page);
        await sideScreen.consecutiveDraws.label.shouldHaveText(page);
        await sideScreen.consecutiveDraws.plusBtn.isVisible(page);
        await sideScreen.consecutiveDraws.minusBtn.isVisible(page);
        await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');

        console.log('Check submit fields and info');
        await sideScreen.submit.isVisible(page);
        // await sideScreen.submit.shouldHaveAttribute(page, 'data-disabled', 'placeBetInfoMsg2');
        await sideScreen.submit.info.isVisible(page);
        await sideScreen.submit.info.get(page).click();
        await sideScreen.submit.info.text.shouldHaveText(page);
        await sideScreen.submit.placeBet.shouldHaveText(page);
        await sideScreen.submit.betslipCost.shouldHaveText(page, '0€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Eurojackpot Page - Select Elements', () => {
    test.beforeAll(async () => {
      console.log('Select Eurojackpot');
      await lobbyGames.eurojackpot.text.shouldHaveText(page);
      await lobbyGames.eurojackpot.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Eurojackpot');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.eurojackpot.isVisible(page);
    });

    test('Select and Check Lobby Header - Terms & Conditions', async ({}, testInfo) => {
      try {
        await lobbyHeader.termsAndConditions.get(page).click();
        await lobbyHeader.termsAndConditions.txt.shouldHaveText(page, 'ejp');
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
        await lobbyHeader.howToPlay.helpIcon.shouldHaveImg(page, 0);
        await lobbyHeader.howToPlay.helpIcon.shouldHaveImg(page, 1);
        await lobbyHeader.howToPlay.helpIcon.shouldHaveImg(page, 2);
        await lobbyHeader.howToPlay.helpIcon.shouldHaveImg(page, 3);
        await lobbyHeader.howToPlay.helpIcon.shouldHaveImg(page, 4);
        await lobbyHeader.howToPlay.close.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Check Lobby Header - Back To Lobby', async ({}, testInfo) => {
      try {
        await lobbyHeader.backToLobby.get(page).click();
        await lobbyGames.eurojackpot.isVisible(page);
        await lobbyGames.eurojackpot.text.shouldHaveText(page);
        await lobbyGames.eurojackpot.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select and Check Lobby Header - Clear All', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.txt.shouldHaveText(page);
        await lobbyHeader.clearAll.no.shouldHaveText(page);
        await lobbyHeader.clearAll.yes.shouldHaveText(page);
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

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
        await lobbyHeader.responsibleGaming.txt.shouldHaveText(page);
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
  });

  test.describe('Old screenshot - Eurojackpot', () => {
    test.beforeAll(async () => {
      await lobbyGames.eurojackpot.text.shouldHaveText(page);
      await lobbyGames.eurojackpot.get(page).click();
    });

    test.afterAll(async () => {
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.eurojackpot.isVisible(page);
    });

    test('Check screenshot - Eurojackpot @visual', async ({}, testInfo) => {
      try {
        await screenshotMatch(page, 'Eurojackpot.png');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
