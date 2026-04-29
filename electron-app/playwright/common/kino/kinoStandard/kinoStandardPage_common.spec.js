// playwright/common/kino/kinoStandard/kinoStandardPage_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError, screenshotMatch } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import settings from '#/pageObjects/kino/kinoSettings';
import playArea from '#/pageObjects/kino/kinoPlayArea';
import sideScreen from '#/pageObjects/kino/kinoSideScreen';

function runTests() {
  let electronApp, page;

  test.beforeAll(async () => {
    ({ electronApp, page } = await launchElectronApp({}, { DIGITAL_ASSISTANT_ENABLED: false }));
  });

  test.afterAll(async () => {
    if (electronApp) await electronApp.close();
  });

  test.describe('Kino Page - Check Elements', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test.describe('Check elements of Settings inside Kino', () => {
      test('Check elements of Lobby Header inside Kino', async ({}, testInfo) => {
        try {
          await lobbyHeader.kinoLogo.isVisible(page);
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

      test('Check Winnings table', async ({}, testInfo) => {
        try {
          await settings.winningsTable.isVisible(page);
          await settings.winningsTable.headers.numbers.shouldHaveText(page);
          await settings.winningsTable.headers.winnings.shouldHaveText(page);
          await settings.winningsTable.headers.bonus.shouldHaveText(page);

          for (let i = 0; i <= 12; i++) {
            const expectedClass = i === 0 ? 'selected' : '';
            await settings.winningsTable.row(i).row.shouldHaveClass(page, expectedClass);
            await settings.winningsTable.row(i).number.shouldHaveText(page, i.toString());
            await settings.winningsTable.row(i).winning.shouldHaveText(page, '-');
            await settings.winningsTable.row(i).bonus.shouldHaveText(page, '-');
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check Quick Pick field', async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.shouldHaveText(page);
          await settings.quickPickBtn.up.isVisible(page);
          await settings.quickPickBtn.down.isVisible(page);
          await settings.quickPickBtn.input.shouldBeEmpty(page);
          await settings.quickPickBtn.table.shouldBeHidden(page);
          await settings.quickPickBtn.img.isVisible(page);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Open Quick Pick tab', async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.get(page).click();
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check Quick Pick tab fields', async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.input.shouldBeEmpty(page);

          for (let number = 1; number <= 12; number++) {
            await settings.quickPickNumberBtn.shouldHaveText(page, number);
            await settings.quickPickNumberBtn.isFalse(page, number);
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Close Quick Pick tab', async ({}, testInfo) => {
        try {
          await settings.quickPickBtn.get(page).click(); // toggle again
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check betting amount field', async ({}, testInfo) => {
        try {
          await settings.betMultiplier.label.shouldHaveText(page);

          for (const label of Object.keys(settings.betMultiplier.expected)) {
            await settings.betMultiplier.shouldHaveText(page, label);
            await settings.betMultiplier.isDisabled(page, label);
          }

          // // Optionally mark expected checked buttons (update this list as needed)
          // const checked = ['0.5€'];
          // for (const label of checked) {
          //   await settings.betMultiplier.isChecked(page, label);
          // }
          //
          // for (const label of Object.keys(settings.betMultiplier.expected).filter(
          //     l => !checked.includes(l),
          // )) {
          //   await settings.betMultiplier.isEnabled(page, label);
          // }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check Kino Bonus field', async ({}, testInfo) => {
        try {
          await settings.kinoBonus.icon.isVisible(page);
          await settings.kinoBonus.checkbox.isVisible(page);
          await settings.kinoBonus.checkbox.isFalse(page);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check Close-2-Win field', async ({}, testInfo) => {
        try {
          await settings.close2Win.shouldHaveText(page);
          await settings.close2Win.new.isVisible(page);
          await settings.close2Win.icon.isVisible(page);
          await settings.close2Win.checkbox.isVisible(page);
          await settings.close2Win.checkbox.isFalse(page);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check Clear button', async ({}, testInfo) => {
        try {
          await settings.clearArea.isVisible(page);
          await settings.clearArea.label.shouldHaveText(page);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });
    });

    test('Check elements of Play Area inside Kino', async ({}, testInfo) => {
      try {
        await playArea.numbersGrid.isVisible(page);
        await playArea.numbersGrid.label.shouldHaveText(page);
        await playArea.numbersGrid.shouldHaveText(page);

        for (let number = 1; number <= 80; number++) {
          await playArea.numberBtn.isVisible(page, number);
          await playArea.numberBtn.shouldHaveText(page, number);
          await playArea.numberBtn.isFalse(page, number);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test.describe('Check elements of Side Screen inside Kino', () => {
      test('Check field of game Odd/Even', async ({}, testInfo) => {
        try {
          await sideScreen.oddEven.icon.isVisible(page);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check field of game Columns', async ({}, testInfo) => {
        try {
          await sideScreen.columns.icon.isVisible(page);
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check betslip fields', async ({}, testInfo) => {
        try {
          await sideScreen.sideScreenBet.isVisible(page);
          await sideScreen.sideScreenBet.betslipArea.isVisible(page, 1);
          await sideScreen.sideScreenBet.betslipArea.cost.shouldHaveText(page, 1, '0,00€');
          await sideScreen.sideScreenBet.betslipArea.numbers.shouldHaveText(page, 1, '0');
          await sideScreen.sideScreenBet.betslipArea.clear.isVisible(page, 1);
          await sideScreen.sideScreenBet.addBetslip.shouldHaveText(page);

          for (let i = 2; i <= 6; i++) {
            await sideScreen.sideScreenBet.betslipArea.isHidden(page, i);
          }
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check consecutive draws fields', async ({}, testInfo) => {
        try {
          await sideScreen.consecutiveDraws.isVisible(page);
          await sideScreen.consecutiveDraws.label.shouldHaveText(page);
          await sideScreen.consecutiveDraws.plusBtn.isVisible(page);
          await sideScreen.consecutiveDraws.minusBtn.isVisible(page);
          await sideScreen.consecutiveDraws.input.shouldHaveValue(page, '1');
        } catch (error) {
          await screenshotError(page, testInfo);
          throw error;
        }
      });

      test('Check approve and print fields', async ({}, testInfo) => {
        try {
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
  });

  test.describe('Kino Page - Select Elements', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select and Check Lobby Header - Terms & Conditions', async ({}, testInfo) => {
      try {
        await lobbyHeader.termsAndConditions.get(page).click();
        await lobbyHeader.termsAndConditions.txt.shouldHaveText(page, 'kino');
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
        await lobbyGames.kino.isVisible(page);
        await lobbyGames.kino.get(page).click();
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

  test.describe('Old screenshot - Kino', () => {
    test.beforeAll(async () => {
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Check screenshot - Kino @visual', async ({}, testInfo) => {
      try {
        await screenshotMatch(page, 'Kino.png');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
