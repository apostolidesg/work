// playwright/common/powerspin/psStandardPage_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import header from '#/pageObjects/powerspin/psHeader';
import playArea from '#/pageObjects/powerspin/psPlayArea';
import sideScreen from '#/pageObjects/powerspin/psSideScreen';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Powerspin Page - Check Elements', () => {
    test.beforeAll(async () => {
      console.log('Select Powerspin');
      await lobbyGames.powerspin.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Powerspin');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.powerspin.isVisible(page);
    });

    test('Check elements of Lobby Header inside Powerspin', async ({}, testInfo) => {
      try {
        await lobbyHeader.powerspinLogo.isVisible(page);
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

    test('Check elements of Powerspin Header inside Powerspin', async ({}, testInfo) => {
      try {
        await header.combo.icon.isVisible(page, '0');
        await header.combo.backBtn.isVisible(page, '0');
        await header.combo.icon.isVisible(page, '1');
        await header.combo.icon.isVisible(page, '2');
        await header.extraMarkets.shouldHaveText(page);
        await header.extraMarkets.inactive.isVisible(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Play Area inside Powerspin', async ({}, testInfo) => {
      try {
        console.log('Check elements of Number Area');
        await playArea.numberLabel.shouldHaveText(page, 0);

        await playArea.numberTitle.shouldHaveText(page);
        await playArea.numberTitleDouble.shouldHaveText(page);
        await playArea.numberTitleDouble.shouldHaveText(page);
        await playArea.numberTitleQuadruple.shouldHaveText(page);
        await playArea.numberTitleSextuple.shouldHaveText(page);
        await playArea.numberTitleOctuple.shouldHaveText(page);
        await playArea.numberTitleDozen.shouldHaveText(page);

        await playArea.numberSelectBtn.isVisible(page);
        await playArea.number2daSelectBtn.isVisible(page);
        await playArea.number3daSelectBtn.isVisible(page);
        await playArea.number4daSelectBtn.isVisible(page);
        await playArea.number6daSelectBtn.isVisible(page);
        await playArea.number8daSelectBtn.isVisible(page);
        await playArea.number12daSelectBtn.isVisible(page);

        for (let value = 1; value <= 24; value++) {
          console.log('Check number', value);
          await playArea.mainNumberBtn.shouldHaveText(page, value, 0);
        }

        await playArea.quickPickButton.shouldHaveText(page, 0);

        console.log('Check elements of Symbol Area');
        await playArea.symbolLabel.shouldHaveText(page, 0);
        await playArea.wheelImage.isVisible(page, 0);

        console.log('Check elements of Zone Area');
        await playArea.zoneLabel.shouldHaveText(page, 0);
        await playArea.zoneRedBtn.shouldHaveText(page, 0);
        await playArea.zoneGreenBtn.shouldHaveText(page, 0);
        await playArea.zoneBlueBtn.shouldHaveText(page, 0);

        console.log('Check elements of Under/Over Area');
        await playArea.underOverLabel.shouldHaveText(page, 0);
        await playArea.underBtn.shouldHaveText(page, 0);
        await playArea.overBtn.shouldHaveText(page, 0);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check elements of Side Screen inside Powerspin', async ({}, testInfo) => {
      try {
        console.log('Check bet slip fields');
        await sideScreen.sideScreenBet.isVisible(page);

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

  test.describe('Powerspin Page - Select Elements', () => {
    test.beforeAll(async () => {
      console.log('Select Powerspin');
      await lobbyGames.powerspin.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Powerspin');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.powerspin.isVisible(page);
    });

    test('Select and Check Lobby Header - Terms & Conditions', async ({}, testInfo) => {
      try {
        await lobbyHeader.termsAndConditions.get(page).click();
        await lobbyHeader.termsAndConditions.txt.shouldHaveText(page, 'powerspin');
        await lobbyHeader.termsAndConditions.close.get(page).click();
        await lobbyHeader.termsAndConditions.get(page).click();
        await lobbyHeader.termsAndConditions.OK.shouldHaveText(page);
        await lobbyHeader.termsAndConditions.OK.get(page).click();
        // await lobbyHeader.termsAndConditions.OK.get(page).click();
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
        await lobbyGames.powerspin.isVisible(page);
        await lobbyGames.powerspin.get(page).click();
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

  test.describe('Old screenshot - Powerspin', () => {
    test.beforeAll(async () => {
      await lobbyGames.powerspin.get(page).click();
    });

    test.afterAll(async () => {
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.powerspin.isVisible(page);
    });

    test('Check screenshot - Powerspin @visual', async ({}, testInfo) => {
      try {
        await screenshotMatch(page, 'Powerspin.png');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
