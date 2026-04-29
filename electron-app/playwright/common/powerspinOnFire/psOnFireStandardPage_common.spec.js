// playwright/common/powerspinOnFire/psOnFireStandardPage_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import settings from '#/pageObjects/powerspinOnFire/psOnFireSettings';
import playArea from '#/pageObjects/powerspinOnFire/psOnFirePlayArea';
import sideScreen from '#/pageObjects/powerspinOnFire/psOnFireSideScreen';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('powerspinOnFire Page - Check Elements', () => {
    test.beforeAll(async () => {
      console.log('Select PowerspinOnFire');
      await lobbyGames.powerspinOnFire.isVisible(page);
      await lobbyGames.powerspinOnFire.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit powerspinOnFire');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.powerspinOnFire.isVisible(page);
    });

    test('Check elements of Lobby Header inside PowerspinOnFire', async ({}, testInfo) => {
      try {
        await lobbyHeader.powerspinOnFireLogo.isVisible(page);
        await lobbyHeader.termsAndConditions.shouldHaveText(page);
        await lobbyHeader.howToPlay.shouldHaveText(page);
        await lobbyHeader.backToLobby.shouldHaveText(page);
        await lobbyHeader.clearAll.shouldHaveText(page);
        await lobbyHeader.draw.shouldHaveText(page);
        await lobbyHeader.drawTime.shouldHaveText(page);
        await lobbyHeader.drawLive.shouldHaveText(page);
        await lobbyHeader.drawLive.icon.isVisible(page);
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

    test('Check elements of Settings inside PowerspinOnFire', async ({}, testInfo) => {
      try {
        await settings.quickPickInfo.shouldHaveText(page);
        await settings.quickPickBtn.shouldHaveText(page);
        await settings.optionsHeaderTitle.shouldHaveText(page);
        await settings.optionsHeaderInfo.shouldHaveText(page);
        await settings.optionsNumbers.shouldHaveText(page);

        for (const value of [1, 2, 4, 8]) {
          console.log('Verify systemButtons = ', value);
          await settings.optionsButtons.shouldHaveText(page, value);
        }

        await settings.advertisement.shouldHaveText(page);
        await settings.advertisement.psOnFireLogo.isVisible(page);
        await settings.advertisement.amount.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Play Area inside PowerspinOnFire', async ({}, testInfo) => {
      try {
        await playArea.mainNumberHeader.shouldHaveText(page);
        await playArea.mainNumbersTxt.shouldHaveText(page);

        for (let value = 1; value < 35; value++) {
          console.log('Verify mainNumberBtn = ', value);
          await playArea.mainNumberBtn.shouldHaveText(page, value);
        }

        await playArea.alternateView.get(page).click();
        await playArea.mainNumbersTxt.shouldHaveText(page, 'alternateView');
        await playArea.wheelCircle.isVisible(page);
        await playArea.alternateView.get(page).click();

        await playArea.stakes.shouldHaveText(page);
        await playArea.stakes.selections.shouldHaveText(page, 'num');

        for (const label of Object.keys(playArea.stakes.betMultipliers.expected)) {
          await playArea.stakes.betMultipliers.shouldHaveText(page, label);
        }
        // Those are active
        const activeLabels = ['0.5'];
        for (const label of activeLabels) {
          await playArea.stakes.betMultipliers.isActive(page, label);
        }
        // The rest should be not active
        for (const label of Object.keys(playArea.stakes.betMultipliers.expected).filter(
          l => !activeLabels.includes(l),
        )) {
          await playArea.stakes.betMultipliers.isNotActive(page, label);
        }

        console.log('Check Double, Quadruple, Octuple bets');
        await settings.optionsButtons.get(page, 2).click();
        await playArea.stakes.shouldHaveText(page);
        await playArea.stakes.selections.shouldHaveText(page, 'doub');
        await settings.optionsButtons.get(page, 4).click();
        await playArea.stakes.shouldHaveText(page);
        await playArea.stakes.selections.shouldHaveText(page, 'quad');
        await settings.optionsButtons.get(page, 8).click();
        await playArea.stakes.shouldHaveText(page);
        await playArea.stakes.selections.shouldHaveText(page, 'oct');
        console.log('Check bets are reset');
        await playArea.stakes.betMultipliers.get(page, '3').click();
        await settings.optionsButtons.get(page, 1).click();
        await playArea.stakes.shouldHaveText(page);
        await playArea.stakes.selections.shouldHaveText(page, 'num');
        await playArea.stakes.betMultipliers.get(page, '10').click();

        for (const label of Object.keys(playArea.stakes.betMultipliers.expected)) {
          await playArea.stakes.betMultipliers.shouldHaveText(page, label);
        }
        // Those are active
        const activeLabel = ['0.5', '10'];
        for (const label of activeLabel) {
          await playArea.stakes.betMultipliers.isActive(page, label);
        }
        // The rest should be not active
        for (const label of Object.keys(playArea.stakes.betMultipliers.expected).filter(
          l => !activeLabel.includes(l),
        )) {
          await playArea.stakes.betMultipliers.isNotActive(page, label);
        }

        console.log('Check Statistics');
        await playArea.statistics.title.shouldHaveText(page);
        await playArea.statistics.switch.shouldHaveText(page);

        await playArea.clear.text.shouldHaveText(page);
        await playArea.clear.icon.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Side Screen inside PowerspinOnFire', async ({}, testInfo) => {
      try {
        console.log('Check bet slip fields');
        await sideScreen.sideScreenBet.isVisible(page);
        await sideScreen.sideScreenBet.betslipArea.isVisible(page, 0);
        await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 0, '0€');
        await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 0);
        await sideScreen.sideScreenBet.addBetslip.shouldHaveText(page);

        for (let i = 1; i <= 4; i++) {
          // area 1, 2, 3, 4
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

  test.describe('PowerspinOnFire Page - Select Elements', () => {
    test.beforeAll(async () => {
      console.log('Select PowerspinOnFire');
      await lobbyGames.powerspinOnFire.isVisible(page);
      await lobbyGames.powerspinOnFire.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit powerspinOnFire');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.powerspinOnFire.isVisible(page);
    });

    test('Select and Check Lobby Header - Terms & Conditions', async ({}, testInfo) => {
      try {
        await lobbyHeader.termsAndConditions.get(page).click();
        await lobbyHeader.termsAndConditions.txt.shouldHaveText(page, 'psOnFire');
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
        await lobbyGames.powerspinOnFire.isVisible(page);
        await lobbyGames.powerspinOnFire.get(page).click();
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

  test.describe('Old screenshot - PowerspinOnFire', () => {
    test.beforeAll(async () => {
      await lobbyGames.powerspinOnFire.get(page).click();
    });

    test.afterAll(async () => {
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.powerspinOnFire.isVisible(page);
    });

    test('Check screenshot - PowerspinOnFire @visual', async ({}, testInfo) => {
      try {
        await screenshotMatch(page, 'PowerspinOnFire.png');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
