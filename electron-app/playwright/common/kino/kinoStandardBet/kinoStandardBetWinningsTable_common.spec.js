// playwright/common/kino/kinoStandardBet/kinoStandardBetWinningTable_common.spec.js
import { test } from '@playwright/test';
import { launchElectronApp, screenshotError } from '#/support/commands';
import lobbyHeader from '#/pageObjects/lobbyHeader';
import lobbyGames from '#/pageObjects/lobbyGames';
import oddEvenColumns from '#/pageObjects/kino/kinoOddEvenColumns';
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

  test.describe('Check functionality of Winnings Table by selecting numbers', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select a KINO number 1', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 1).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Kino Bonus field 1', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.icon.isVisible(page);
        await settings.kinoBonus.checkbox.isVisible(page);
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Close 2 Win field 1', async ({}, testInfo) => {
      try {
        await settings.close2Win.icon.isVisible(page);
        await settings.close2Win.checkbox.isVisible(page);
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 1', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const selectedRowIndex = 1;
        for (let i = 0; i <= 12; i++) {
          const expectedClass = i === selectedRowIndex ? 'selected' : '';
          await settings.winningsTable.row(i).row.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '1,25€', bonus: '26,25€' },
          { num: '2', win: '-', bonus: '-' },
          { num: '3', win: '-', bonus: '-' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 1', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Close 2 Win field 1 ', async ({}, testInfo) => {
      try {
        await settings.close2Win.icon.isVisible(page);
        await settings.close2Win.checkbox.isVisible(page);
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 1 Bonus', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const selectedRowIndex = 1;
        for (let i = 0; i <= 12; i++) {
          const expectedClass = i === selectedRowIndex ? 'selected' : '';
          await settings.winningsTable.row(i).row.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '1,25€', bonus: '26,25€' },
          { num: '2', win: '-', bonus: '-' },
          { num: '3', win: '-', bonus: '-' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus field 1', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 2', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 2).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 2', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '0,50€', bonus: '8,00€' },
          { num: '2', win: '2,50€', bonus: '35,00€' },
          { num: '3', win: '-', bonus: '-' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 2', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 2+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '0,50€', bonus: '8,00€' },
          { num: '2', win: '2,50€', bonus: '35,00€' },
          { num: '3', win: '-', bonus: '-' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Close 2 Win field 2', async ({}, testInfo) => {
      try {
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 2+B+C', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          '1_c2w': 'c2w-border-bottom c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { index: 0, num: '0', win: '-', bonus: '-' },
          { index: 2, num: '2', win: '2,50€', bonus: '35,00€' },
          { index: 3, num: '3', win: '-', bonus: '-' },
          { index: 4, num: '4', win: '-', bonus: '-' },
          { index: 5, num: '5', win: '-', bonus: '-' },
          { index: 6, num: '6', win: '-', bonus: '-' },
          { index: 7, num: '7', win: '-', bonus: '-' },
          { index: 8, num: '8', win: '-', bonus: '-' },
          { index: 9, num: '9', win: '-', bonus: '-' },
          { index: 10, num: '10', win: '-', bonus: '-' },
          { index: 11, num: '11', win: '-', bonus: '-' },
          { index: 12, num: '12', win: '-', bonus: '-' },
        ];

        for (const row of expectedWinnings) {
          await settings.winningsTable.row(row.index).number.shouldHaveText(page, row.num);
          await settings.winningsTable.row(row.index).winning.shouldHaveText(page, row.win);
          await settings.winningsTable.row(row.index).bonus.shouldHaveText(page, row.bonus);
        }

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus and Close 2 Win field 2', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 3', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 3).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 3', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: 'c2w-border-bottom',
          '2_c2w': 'c2w-border-top',
          3: 'selected',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '4,00€' },
          { num: '2', win: '1,25€', bonus: '9,00€' },
          { num: '3', win: '12,50€', bonus: '87,50€' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(2).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(2).winning.shouldHaveText(page, '3,75€');
        await settings.winningsTable.rowC2W(2).bonus.shouldHaveText(page, '11,50€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 3', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 3+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: 'c2w-border-bottom',
          '2_c2w': 'c2w-border-top',
          3: 'selected',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '4,00€' },
          { num: '2', win: '1,25€', bonus: '9,00€' },
          { num: '3', win: '12,50€', bonus: '87,50€' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(2).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(2).winning.shouldHaveText(page, '3,75€');
        await settings.winningsTable.rowC2W(2).bonus.shouldHaveText(page, '11,50€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Close 2 Win field 3', async ({}, testInfo) => {
      try {
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 3+B+C', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          '2_c2w': 'c2w-border-bottom c2w-border-top',
          3: 'selected',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { index: 0, num: '0', win: '-', bonus: '-' },
          { index: 1, num: '1', win: '-', bonus: '4,00€' },
          { index: 3, num: '3', win: '12,50€', bonus: '87,50€' },
          { index: 4, num: '4', win: '-', bonus: '-' },
          { index: 5, num: '5', win: '-', bonus: '-' },
          { index: 6, num: '6', win: '-', bonus: '-' },
          { index: 7, num: '7', win: '-', bonus: '-' },
          { index: 8, num: '8', win: '-', bonus: '-' },
          { index: 9, num: '9', win: '-', bonus: '-' },
          { index: 10, num: '10', win: '-', bonus: '-' },
          { index: 11, num: '11', win: '-', bonus: '-' },
          { index: 12, num: '12', win: '-', bonus: '-' },
        ];

        for (const row of expectedWinnings) {
          await settings.winningsTable.row(row.index).number.shouldHaveText(page, row.num);
          await settings.winningsTable.row(row.index).winning.shouldHaveText(page, row.win);
          await settings.winningsTable.row(row.index).bonus.shouldHaveText(page, row.bonus);
        }

        await settings.winningsTable.row(2).number.notExists(page);
        await settings.winningsTable.row(2).winning.notExists(page);
        await settings.winningsTable.row(2).bonus.notExists(page);

        await settings.winningsTable.rowC2W(2).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(2).winning.shouldHaveText(page, '3,75€');
        await settings.winningsTable.rowC2W(2).bonus.shouldHaveText(page, '11,50€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus and Close 2 Win field 3', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 4', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 4).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 4', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: 'c2w-border-bottom',
          '3_c2w': 'c2w-border-top',
          4: 'selected',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '2,50€' },
          { num: '2', win: '0,50€', bonus: '4,00€' },
          { num: '3', win: '2,00€', bonus: '12,00€' },
          { num: '4', win: '50,00€', bonus: '300,00€' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(3).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(3).winning.shouldHaveText(page, '10,00€');
        await settings.winningsTable.rowC2W(3).bonus.shouldHaveText(page, '20,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 4', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 4+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: 'c2w-border-bottom',
          '3_c2w': 'c2w-border-top',
          4: 'selected',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '2,50€' },
          { num: '2', win: '0,50€', bonus: '4,00€' },
          { num: '3', win: '2,00€', bonus: '12,00€' },
          { num: '4', win: '50,00€', bonus: '300,00€' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(3).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(3).winning.shouldHaveText(page, '10,00€');
        await settings.winningsTable.rowC2W(3).bonus.shouldHaveText(page, '20,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Close 2 Win field 4', async ({}, testInfo) => {
      try {
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 4+B+C', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          '3_c2w': 'c2w-border-bottom c2w-border-top',
          4: 'selected',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;

          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { index: 0, num: '0', win: '-', bonus: '-' },
          { index: 1, num: '1', win: '-', bonus: '2,50€' },
          { index: 2, num: '2', win: '0,50€', bonus: '4,00€' },
          { index: 4, num: '4', win: '50,00€', bonus: '300,00€' },
          { index: 5, num: '5', win: '-', bonus: '-' },
          { index: 6, num: '6', win: '-', bonus: '-' },
          { index: 7, num: '7', win: '-', bonus: '-' },
          { index: 8, num: '8', win: '-', bonus: '-' },
          { index: 9, num: '9', win: '-', bonus: '-' },
          { index: 10, num: '10', win: '-', bonus: '-' },
          { index: 11, num: '11', win: '-', bonus: '-' },
          { index: 12, num: '12', win: '-', bonus: '-' },
        ];

        for (const row of expectedWinnings) {
          await settings.winningsTable.row(row.index).number.shouldHaveText(page, row.num);
          await settings.winningsTable.row(row.index).winning.shouldHaveText(page, row.win);
          await settings.winningsTable.row(row.index).bonus.shouldHaveText(page, row.bonus);
        }

        await settings.winningsTable.row(3).number.notExists(page);
        await settings.winningsTable.row(3).winning.notExists(page);
        await settings.winningsTable.row(3).bonus.notExists(page);

        await settings.winningsTable.rowC2W(3).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(3).winning.shouldHaveText(page, '10,00€');
        await settings.winningsTable.rowC2W(3).bonus.shouldHaveText(page, '20,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus and Close 2 Win field 4', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 5', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 5).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 5', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: 'c2w-border-bottom',
          '4_c2w': 'c2w-border-top',
          5: 'selected',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,50€' },
          { num: '2', win: '-', bonus: '2,50€' },
          { num: '3', win: '1,00€', bonus: '8,50€' },
          { num: '4', win: '10,00€', bonus: '45,00€' },
          { num: '5', win: '225,00€', bonus: '675,00€' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(4).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(4).winning.shouldHaveText(page, '40,00€');
        await settings.winningsTable.rowC2W(4).bonus.shouldHaveText(page, '75,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 5', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 5+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: 'c2w-border-bottom',
          '4_c2w': 'c2w-border-top',
          5: 'selected',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,50€' },
          { num: '2', win: '-', bonus: '2,50€' },
          { num: '3', win: '1,00€', bonus: '8,50€' },
          { num: '4', win: '10,00€', bonus: '45,00€' },
          { num: '5', win: '225,00€', bonus: '675,00€' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(4).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(4).winning.shouldHaveText(page, '40,00€');
        await settings.winningsTable.rowC2W(4).bonus.shouldHaveText(page, '75,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Close 2 Win field 5', async ({}, testInfo) => {
      try {
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 5+B+C', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          '4_c2w': 'c2w-border-bottom c2w-border-top',
          5: 'selected',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;

          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { index: 0, num: '0', win: '-', bonus: '-' },
          { index: 1, num: '1', win: '-', bonus: '1,50€' },
          { index: 2, num: '2', win: '-', bonus: '2,50€' },
          { index: 3, num: '3', win: '1,00€', bonus: '8,50€' },
          { index: 5, num: '5', win: '225,00€', bonus: '675,00€' },
          { index: 6, num: '6', win: '-', bonus: '-' },
          { index: 7, num: '7', win: '-', bonus: '-' },
          { index: 8, num: '8', win: '-', bonus: '-' },
          { index: 9, num: '9', win: '-', bonus: '-' },
          { index: 10, num: '10', win: '-', bonus: '-' },
          { index: 11, num: '11', win: '-', bonus: '-' },
          { index: 12, num: '12', win: '-', bonus: '-' },
        ];

        for (const row of expectedWinnings) {
          await settings.winningsTable.row(row.index).number.shouldHaveText(page, row.num);
          await settings.winningsTable.row(row.index).winning.shouldHaveText(page, row.win);
          await settings.winningsTable.row(row.index).bonus.shouldHaveText(page, row.bonus);
        }

        await settings.winningsTable.row(4).number.notExists(page);
        await settings.winningsTable.row(4).winning.notExists(page);
        await settings.winningsTable.row(4).bonus.notExists(page);

        await settings.winningsTable.rowC2W(4).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(4).winning.shouldHaveText(page, '40,00€');
        await settings.winningsTable.rowC2W(4).bonus.shouldHaveText(page, '75,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus and Close 2 Win field 5', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 6', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 6).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 6', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: 'c2w-border-bottom',
          '5_c2w': 'c2w-border-top',
          6: 'selected',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,50€' },
          { num: '3', win: '0,50€', bonus: '4,50€' },
          { num: '4', win: '3,50€', bonus: '13,50€' },
          { num: '5', win: '25,00€', bonus: '150,00€' },
          { num: '6', win: '800,00€', bonus: '2.050,00€' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(5).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(5).winning.shouldHaveText(page, '140,00€');
        await settings.winningsTable.rowC2W(5).bonus.shouldHaveText(page, '265,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 6', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 6+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: 'c2w-border-bottom',
          '5_c2w': 'c2w-border-top',
          6: 'selected',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,50€' },
          { num: '3', win: '0,50€', bonus: '4,50€' },
          { num: '4', win: '3,50€', bonus: '13,50€' },
          { num: '5', win: '25,00€', bonus: '150,00€' },
          { num: '6', win: '800,00€', bonus: '2.050,00€' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(5).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(5).winning.shouldHaveText(page, '140,00€');
        await settings.winningsTable.rowC2W(5).bonus.shouldHaveText(page, '265,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Close 2 Win field 6', async ({}, testInfo) => {
      try {
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 6+B+C', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          '5_c2w': 'c2w-border-bottom c2w-border-top',
          6: 'selected',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;

          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { index: 0, num: '0', win: '-', bonus: '-' },
          { index: 1, num: '1', win: '-', bonus: '1,00€' },
          { index: 2, num: '2', win: '-', bonus: '1,50€' },
          { index: 3, num: '3', win: '0,50€', bonus: '4,50€' },
          { index: 4, num: '4', win: '3,50€', bonus: '13,50€' },
          { index: 6, num: '6', win: '800,00€', bonus: '2.050,00€' },
          { index: 7, num: '7', win: '-', bonus: '-' },
          { index: 8, num: '8', win: '-', bonus: '-' },
          { index: 9, num: '9', win: '-', bonus: '-' },
          { index: 10, num: '10', win: '-', bonus: '-' },
          { index: 11, num: '11', win: '-', bonus: '-' },
          { index: 12, num: '12', win: '-', bonus: '-' },
        ];

        for (const row of expectedWinnings) {
          await settings.winningsTable.row(row.index).number.shouldHaveText(page, row.num);
          await settings.winningsTable.row(row.index).winning.shouldHaveText(page, row.win);
          await settings.winningsTable.row(row.index).bonus.shouldHaveText(page, row.bonus);
        }

        await settings.winningsTable.row(5).number.notExists(page);
        await settings.winningsTable.row(5).winning.notExists(page);
        await settings.winningsTable.row(5).bonus.notExists(page);

        await settings.winningsTable.rowC2W(5).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(5).winning.shouldHaveText(page, '140,00€');
        await settings.winningsTable.rowC2W(5).bonus.shouldHaveText(page, '265,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus and Close 2 Win field 6', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 7', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 7).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 7', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: 'c2w-border-bottom',
          '6_c2w': 'c2w-border-top',
          7: 'selected',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,50€' },
          { num: '3', win: '0,50€', bonus: '4,00€' },
          { num: '4', win: '1,50€', bonus: '6,50€' },
          { num: '5', win: '10,00€', bonus: '40,00€' },
          { num: '6', win: '50,00€', bonus: '200,00€' },
          { num: '7', win: '2.500,00€', bonus: '7.500,00€' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(6).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(6).winning.shouldHaveText(page, '500,00€');
        await settings.winningsTable.rowC2W(6).bonus.shouldHaveText(page, '650,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 7', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 7+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: 'c2w-border-bottom',
          '6_c2w': 'c2w-border-top',
          7: 'selected',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,50€' },
          { num: '3', win: '0,50€', bonus: '4,00€' },
          { num: '4', win: '1,50€', bonus: '6,50€' },
          { num: '5', win: '10,00€', bonus: '40,00€' },
          { num: '6', win: '50,00€', bonus: '200,00€' },
          { num: '7', win: '2.500,00€', bonus: '7.500,00€' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(6).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(6).winning.shouldHaveText(page, '500,00€');
        await settings.winningsTable.rowC2W(6).bonus.shouldHaveText(page, '650,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Close 2 Win field 7', async ({}, testInfo) => {
      try {
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 7+B+C', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          '6_c2w': 'c2w-border-bottom c2w-border-top',
          7: 'selected',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;

          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { index: 0, num: '0', win: '-', bonus: '-' },
          { index: 1, num: '1', win: '-', bonus: '1,00€' },
          { index: 2, num: '2', win: '-', bonus: '1,50€' },
          { index: 3, num: '3', win: '0,50€', bonus: '4,00€' },
          { index: 4, num: '4', win: '1,50€', bonus: '6,50€' },
          { index: 5, num: '5', win: '10,00€', bonus: '40,00€' },
          { index: 7, num: '7', win: '2.500,00€', bonus: '7.500,00€' },
          { index: 8, num: '8', win: '-', bonus: '-' },
          { index: 9, num: '9', win: '-', bonus: '-' },
          { index: 10, num: '10', win: '-', bonus: '-' },
          { index: 11, num: '11', win: '-', bonus: '-' },
          { index: 12, num: '12', win: '-', bonus: '-' },
        ];

        for (const row of expectedWinnings) {
          await settings.winningsTable.row(row.index).number.shouldHaveText(page, row.num);
          await settings.winningsTable.row(row.index).winning.shouldHaveText(page, row.win);
          await settings.winningsTable.row(row.index).bonus.shouldHaveText(page, row.bonus);
        }

        await settings.winningsTable.row(6).number.notExists(page);
        await settings.winningsTable.row(6).winning.notExists(page);
        await settings.winningsTable.row(6).bonus.notExists(page);

        await settings.winningsTable.rowC2W(6).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(6).winning.shouldHaveText(page, '500,00€');
        await settings.winningsTable.rowC2W(6).bonus.shouldHaveText(page, '650,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus and Close 2 Win field 7', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 8', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 8).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 8', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: 'c2w-border-bottom',
          '7_c2w': 'c2w-border-top',
          8: 'selected',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,50€' },
          { num: '3', win: '-', bonus: '2,00€' },
          { num: '4', win: '1,00€', bonus: '3,50€' },
          { num: '5', win: '5,00€', bonus: '15,00€' },
          { num: '6', win: '25,00€', bonus: '100,00€' },
          { num: '7', win: '500,00€', bonus: '1.500,00€' },
          { num: '8', win: '7.500,00€', bonus: '20.000,00€' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(7).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(7).winning.shouldHaveText(page, '2.600,00€');
        await settings.winningsTable.rowC2W(7).bonus.shouldHaveText(page, '3.600,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 8', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 8+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: 'c2w-border-bottom',
          '7_c2w': 'c2w-border-top',
          8: 'selected',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,50€' },
          { num: '3', win: '-', bonus: '2,00€' },
          { num: '4', win: '1,00€', bonus: '3,50€' },
          { num: '5', win: '5,00€', bonus: '15,00€' },
          { num: '6', win: '25,00€', bonus: '100,00€' },
          { num: '7', win: '500,00€', bonus: '1.500,00€' },
          { num: '8', win: '7.500,00€', bonus: '20.000,00€' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(7).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(7).winning.shouldHaveText(page, '2.600,00€');
        await settings.winningsTable.rowC2W(7).bonus.shouldHaveText(page, '3.600,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Close 2 Win field 8', async ({}, testInfo) => {
      try {
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 8+B+C', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          '7_c2w': 'c2w-border-bottom c2w-border-top',
          8: 'selected',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;

          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { index: 0, num: '0', win: '-', bonus: '-' },
          { index: 1, num: '1', win: '-', bonus: '1,00€' },
          { index: 2, num: '2', win: '-', bonus: '1,50€' },
          { index: 3, num: '3', win: '-', bonus: '2,00€' },
          { index: 4, num: '4', win: '1,00€', bonus: '3,50€' },
          { index: 5, num: '5', win: '5,00€', bonus: '15,00€' },
          { index: 6, num: '6', win: '25,00€', bonus: '100,00€' },
          { index: 8, num: '8', win: '7.500,00€', bonus: '20.000,00€' },
          { index: 9, num: '9', win: '-', bonus: '-' },
          { index: 10, num: '10', win: '-', bonus: '-' },
          { index: 11, num: '11', win: '-', bonus: '-' },
          { index: 12, num: '12', win: '-', bonus: '-' },
        ];

        for (const row of expectedWinnings) {
          await settings.winningsTable.row(row.index).number.shouldHaveText(page, row.num);
          await settings.winningsTable.row(row.index).winning.shouldHaveText(page, row.win);
          await settings.winningsTable.row(row.index).bonus.shouldHaveText(page, row.bonus);
        }

        await settings.winningsTable.row(7).number.notExists(page);
        await settings.winningsTable.row(7).winning.notExists(page);
        await settings.winningsTable.row(7).bonus.notExists(page);

        await settings.winningsTable.rowC2W(7).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(7).winning.shouldHaveText(page, '2.600,00€');
        await settings.winningsTable.rowC2W(7).bonus.shouldHaveText(page, '3.600,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus and Close 2 Win field 8', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 9', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 9).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 9', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: 'c2w-border-bottom',
          '8_c2w': 'c2w-border-top',
          9: 'selected',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,50€' },
          { num: '3', win: '-', bonus: '2,00€' },
          { num: '4', win: '0,50€', bonus: '3,00€' },
          { num: '5', win: '2,50€', bonus: '7,50€' },
          { num: '6', win: '12,50€', bonus: '35,00€' },
          { num: '7', win: '100,00€', bonus: '250,00€' },
          { num: '8', win: '2.000,00€', bonus: '5.000,00€' },
          { num: '9', win: '20.000,00€', bonus: '50.000,00€' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(8).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(8).winning.shouldHaveText(page, '12.000,00€');
        await settings.winningsTable.rowC2W(8).bonus.shouldHaveText(page, '15.000,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 9', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 9+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: 'c2w-border-bottom',
          '8_c2w': 'c2w-border-top',
          9: 'selected',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,50€' },
          { num: '3', win: '-', bonus: '2,00€' },
          { num: '4', win: '0,50€', bonus: '3,00€' },
          { num: '5', win: '2,50€', bonus: '7,50€' },
          { num: '6', win: '12,50€', bonus: '35,00€' },
          { num: '7', win: '100,00€', bonus: '250,00€' },
          { num: '8', win: '2.000,00€', bonus: '5.000,00€' },
          { num: '9', win: '20.000,00€', bonus: '50.000,00€' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(8).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(8).winning.shouldHaveText(page, '12.000,00€');
        await settings.winningsTable.rowC2W(8).bonus.shouldHaveText(page, '15.000,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Close 2 Win field 9', async ({}, testInfo) => {
      try {
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 9+B+C', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          '8_c2w': 'c2w-border-bottom c2w-border-top',
          9: 'selected',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;

          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { index: 0, num: '0', win: '-', bonus: '-' },
          { index: 1, num: '1', win: '-', bonus: '1,00€' },
          { index: 2, num: '2', win: '-', bonus: '1,50€' },
          { index: 3, num: '3', win: '-', bonus: '2,00€' },
          { index: 4, num: '4', win: '0,50€', bonus: '3,00€' },
          { index: 5, num: '5', win: '2,50€', bonus: '7,50€' },
          { index: 6, num: '6', win: '12,50€', bonus: '35,00€' },
          { index: 7, num: '7', win: '100,00€', bonus: '250,00€' },
          { index: 9, num: '9', win: '20.000,00€', bonus: '50.000,00€' },
          { index: 10, num: '10', win: '-', bonus: '-' },
          { index: 11, num: '11', win: '-', bonus: '-' },
          { index: 12, num: '12', win: '-', bonus: '-' },
        ];

        for (const row of expectedWinnings) {
          await settings.winningsTable.row(row.index).number.shouldHaveText(page, row.num);
          await settings.winningsTable.row(row.index).winning.shouldHaveText(page, row.win);
          await settings.winningsTable.row(row.index).bonus.shouldHaveText(page, row.bonus);
        }

        await settings.winningsTable.row(8).number.notExists(page);
        await settings.winningsTable.row(8).winning.notExists(page);
        await settings.winningsTable.row(8).bonus.notExists(page);

        await settings.winningsTable.rowC2W(8).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(8).winning.shouldHaveText(page, '12.000,00€');
        await settings.winningsTable.rowC2W(8).bonus.shouldHaveText(page, '15.000,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus and Close 2 Win field 9', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
        await settings.close2Win.checkbox.get(page).click();
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 10', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 10).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 10', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: 'selected',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '1,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,25€' },
          { num: '3', win: '-', bonus: '1,50€' },
          { num: '4', win: '-', bonus: '2,00€' },
          { num: '5', win: '1,00€', bonus: '3,50€' },
          { num: '6', win: '10,00€', bonus: '30,00€' },
          { num: '7', win: '40,00€', bonus: '90,00€' },
          { num: '8', win: '250,00€', bonus: '750,00€' },
          { num: '9', win: '5.000,00€', bonus: '12.500,00€' },
          { num: '10', win: '50.000,00€', bonus: '125.000,00€' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(9).number.notExists(page);
        await settings.winningsTable.rowC2W(9).winning.notExists(page);
        await settings.winningsTable.rowC2W(9).bonus.notExists(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 10', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 10+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: 'selected',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '1,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,25€' },
          { num: '3', win: '-', bonus: '1,50€' },
          { num: '4', win: '-', bonus: '2,00€' },
          { num: '5', win: '1,00€', bonus: '3,50€' },
          { num: '6', win: '10,00€', bonus: '30,00€' },
          { num: '7', win: '40,00€', bonus: '90,00€' },
          { num: '8', win: '250,00€', bonus: '750,00€' },
          { num: '9', win: '5.000,00€', bonus: '12.500,00€' },
          { num: '10', win: '50.000,00€', bonus: '125.000,00€' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(9).number.notExists(page);
        await settings.winningsTable.rowC2W(9).winning.notExists(page);
        await settings.winningsTable.rowC2W(9).bonus.notExists(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Close 2 Win field 10', async ({}, testInfo) => {
      try {
        await settings.close2Win.icon.isVisible(page);
        await settings.close2Win.checkbox.isVisible(page);
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus field 10', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 11', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 11).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 11', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: 'selected',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '1,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,25€' },
          { num: '3', win: '-', bonus: '1,50€' },
          { num: '4', win: '-', bonus: '2,00€' },
          { num: '5', win: '0,50€', bonus: '3,00€' },
          { num: '6', win: '5,00€', bonus: '12,50€' },
          { num: '7', win: '25,00€', bonus: '52,50€' },
          { num: '8', win: '125,00€', bonus: '275,00€' },
          { num: '9', win: '750,00€', bonus: '1.750,00€' },
          { num: '10', win: '7.500,00€', bonus: '15.500,00€' },
          { num: '11', win: '250.000,00€', bonus: '600.000,00€' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(10).number.notExists(page);
        await settings.winningsTable.rowC2W(10).winning.notExists(page);
        await settings.winningsTable.rowC2W(10).bonus.notExists(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 11', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 11+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: 'selected',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '1,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,25€' },
          { num: '3', win: '-', bonus: '1,50€' },
          { num: '4', win: '-', bonus: '2,00€' },
          { num: '5', win: '0,50€', bonus: '3,00€' },
          { num: '6', win: '5,00€', bonus: '12,50€' },
          { num: '7', win: '25,00€', bonus: '52,50€' },
          { num: '8', win: '125,00€', bonus: '275,00€' },
          { num: '9', win: '750,00€', bonus: '1.750,00€' },
          { num: '10', win: '7.500,00€', bonus: '15.500,00€' },
          { num: '11', win: '250.000,00€', bonus: '600.000,00€' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(10).number.notExists(page);
        await settings.winningsTable.rowC2W(10).winning.notExists(page);
        await settings.winningsTable.rowC2W(10).bonus.notExists(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Close 2 Win field 11', async ({}, testInfo) => {
      try {
        await settings.close2Win.icon.isVisible(page);
        await settings.close2Win.checkbox.isVisible(page);
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus field 11', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 12', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 12).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 12', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: 'selected',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '2,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,25€' },
          { num: '3', win: '-', bonus: '1,50€' },
          { num: '4', win: '-', bonus: '1,75€' },
          { num: '5', win: '-', bonus: '2,00€' },
          { num: '6', win: '2,50€', bonus: '5,00€' },
          { num: '7', win: '12,50€', bonus: '25,00€' },
          { num: '8', win: '75,00€', bonus: '175,00€' },
          { num: '9', win: '500,00€', bonus: '1.100,00€' },
          { num: '10', win: '1.250,00€', bonus: '2.750,00€' },
          { num: '11', win: '12.500,00€', bonus: '37.500,00€' },
          { num: '12', win: '500.000,00€', bonus: '1.000.000,00€' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(11).number.notExists(page);
        await settings.winningsTable.rowC2W(11).winning.notExists(page);
        await settings.winningsTable.rowC2W(11).bonus.notExists(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Kino Bonus field 12', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isTrue(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 12+B', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: 'selected',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '2,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,25€' },
          { num: '3', win: '-', bonus: '1,50€' },
          { num: '4', win: '-', bonus: '1,75€' },
          { num: '5', win: '-', bonus: '2,00€' },
          { num: '6', win: '2,50€', bonus: '5,00€' },
          { num: '7', win: '12,50€', bonus: '25,00€' },
          { num: '8', win: '75,00€', bonus: '175,00€' },
          { num: '9', win: '500,00€', bonus: '1.100,00€' },
          { num: '10', win: '1.250,00€', bonus: '2.750,00€' },
          { num: '11', win: '12.500,00€', bonus: '37.500,00€' },
          { num: '12', win: '500.000,00€', bonus: '1.000.000,00€' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(11).number.notExists(page);
        await settings.winningsTable.rowC2W(11).winning.notExists(page);
        await settings.winningsTable.rowC2W(11).bonus.notExists(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Close 2 Win field 12', async ({}, testInfo) => {
      try {
        await settings.close2Win.icon.isVisible(page);
        await settings.close2Win.checkbox.isVisible(page);
        await settings.close2Win.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Unselect Kino Bonus field 12', async ({}, testInfo) => {
      try {
        await settings.kinoBonus.checkbox.get(page).click();
        await settings.kinoBonus.checkbox.isFalse(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });

  test.describe('Check functionality of Winnings Table by selecting betting amount', () => {
    test.beforeAll(async () => {
      console.log('Select Kino');
      await lobbyGames.kino.get(page).click();
    });

    test.afterAll(async () => {
      console.log('Exit Kino');
      await lobbyHeader.backToLobby.get(page).click();
      await lobbyGames.kino.isVisible(page);
    });

    test('Select Clear All from betslip and Confirm ', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select a KINO number 1,2,3,4,5,6,7,8,9,10,11,12', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 1).click();
        await playArea.numberBtn.get(page, 2).click();
        await playArea.numberBtn.get(page, 3).click();
        await playArea.numberBtn.get(page, 4).click();
        await playArea.numberBtn.get(page, 5).click();
        await playArea.numberBtn.get(page, 6).click();
        await playArea.numberBtn.get(page, 7).click();
        await playArea.numberBtn.get(page, 8).click();
        await playArea.numberBtn.get(page, 9).click();
        await playArea.numberBtn.get(page, 10).click();
        await playArea.numberBtn.get(page, 11).click();
        await playArea.numberBtn.get(page, 12).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field 1€', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 12 1€', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: 'selected',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '6,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '3,00€' },
          { num: '2', win: '-', bonus: '3,75€' },
          { num: '3', win: '-', bonus: '4,50€' },
          { num: '4', win: '-', bonus: '5,25€' },
          { num: '5', win: '-', bonus: '6,00€' },
          { num: '6', win: '7,50€', bonus: '15,00€' },
          { num: '7', win: '37,50€', bonus: '75,00€' },
          { num: '8', win: '225,00€', bonus: '525,00€' },
          { num: '9', win: '1.500,00€', bonus: '3.300,00€' },
          { num: '10', win: '3.750,00€', bonus: '8.250,00€' },
          { num: '11', win: '37.500,00€', bonus: '112.500,00€' },
          { num: '12', win: '1.000.000,00€', bonus: '2.000.000,00€' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field 1.5€', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 12 1.5€', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: 'selected',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '12,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '6,00€' },
          { num: '2', win: '-', bonus: '7,50€' },
          { num: '3', win: '-', bonus: '9,00€' },
          { num: '4', win: '-', bonus: '10,50€' },
          { num: '5', win: '-', bonus: '12,00€' },
          { num: '6', win: '15,00€', bonus: '30,00€' },
          { num: '7', win: '75,00€', bonus: '150,00€' },
          { num: '8', win: '450,00€', bonus: '1.050,00€' },
          { num: '9', win: '3.000,00€', bonus: '6.600,00€' },
          { num: '10', win: '7.500,00€', bonus: '16.500,00€' },
          { num: '11', win: '75.000,00€', bonus: '225.000,00€' },
          { num: '12', win: '1.000.000,00€', bonus: '2.000.000,00€' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field 2€, 2.5€', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '2€').click();
        await settings.betMultiplier.get(page, '2.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 12 2€, 2.5€', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: 'selected',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '30,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '15,00€' },
          { num: '2', win: '-', bonus: '18,75€' },
          { num: '3', win: '-', bonus: '22,50€' },
          { num: '4', win: '-', bonus: '26,25€' },
          { num: '5', win: '-', bonus: '30,00€' },
          { num: '6', win: '37,50€', bonus: '75,00€' },
          { num: '7', win: '187,50€', bonus: '375,00€' },
          { num: '8', win: '1.125,00€', bonus: '2.625,00€' },
          { num: '9', win: '7.500,00€', bonus: '16.500,00€' },
          { num: '10', win: '18.750,00€', bonus: '41.250,00€' },
          { num: '11', win: '187.500,00€', bonus: '562.500,00€' },
          { num: '12', win: '1.000.000,00€', bonus: '2.000.000,00€' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select betting amount field 3€, 4€, 5€, 10€, 20€', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '3€').click();
        await settings.betMultiplier.get(page, '4€').click();
        await settings.betMultiplier.get(page, '5€').click();
        await settings.betMultiplier.get(page, '10€').click();
        await settings.betMultiplier.get(page, '20€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 12 3€, 4€, 5€, 10€, 20€', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: 'selected',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '198,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '99,00€' },
          { num: '2', win: '-', bonus: '123,75€' },
          { num: '3', win: '-', bonus: '148,50€' },
          { num: '4', win: '-', bonus: '173,25€' },
          { num: '5', win: '-', bonus: '198,00€' },
          { num: '6', win: '247,50€', bonus: '495,00€' },
          { num: '7', win: '1.237,50€', bonus: '2.475,00€' },
          { num: '8', win: '7.425,00€', bonus: '17.325,00€' },
          { num: '9', win: '49.500,00€', bonus: '108.900,00€' },
          { num: '10', win: '123.750,00€', bonus: '272.250,00€' },
          { num: '11', win: '1.000.000,00€', bonus: '2.000.000,00€' },
          { num: '12', win: '1.000.000,00€', bonus: '2.000.000,00€' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect betting amount field 3€, 4€, 5€, 10€, 20€', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '3€').click();
        await settings.betMultiplier.get(page, '4€').click();
        await settings.betMultiplier.get(page, '5€').click();
        await settings.betMultiplier.get(page, '10€').click();
        await settings.betMultiplier.get(page, '20€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 12  -3€, 4€, 5€, 10€, 20€', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: 'selected',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '30,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '15,00€' },
          { num: '2', win: '-', bonus: '18,75€' },
          { num: '3', win: '-', bonus: '22,50€' },
          { num: '4', win: '-', bonus: '26,25€' },
          { num: '5', win: '-', bonus: '30,00€' },
          { num: '6', win: '37,50€', bonus: '75,00€' },
          { num: '7', win: '187,50€', bonus: '375,00€' },
          { num: '8', win: '1.125,00€', bonus: '2.625,00€' },
          { num: '9', win: '7.500,00€', bonus: '16.500,00€' },
          { num: '10', win: '18.750,00€', bonus: '41.250,00€' },
          { num: '11', win: '187.500,00€', bonus: '562.500,00€' },
          { num: '12', win: '1.000.000,00€', bonus: '2.000.000,00€' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect betting amount field 2€, 2.5€', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '2€').click();
        await settings.betMultiplier.get(page, '2.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 12 -2€, 2.5€', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: 'selected',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '12,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '6,00€' },
          { num: '2', win: '-', bonus: '7,50€' },
          { num: '3', win: '-', bonus: '9,00€' },
          { num: '4', win: '-', bonus: '10,50€' },
          { num: '5', win: '-', bonus: '12,00€' },
          { num: '6', win: '15,00€', bonus: '30,00€' },
          { num: '7', win: '75,00€', bonus: '150,00€' },
          { num: '8', win: '450,00€', bonus: '1.050,00€' },
          { num: '9', win: '3.000,00€', bonus: '6.600,00€' },
          { num: '10', win: '7.500,00€', bonus: '16.500,00€' },
          { num: '11', win: '75.000,00€', bonus: '225.000,00€' },
          { num: '12', win: '1.000.000,00€', bonus: '2.000.000,00€' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect betting amount field 1€, 1.5€', async ({}, testInfo) => {
      try {
        await settings.betMultiplier.get(page, '1€').click();
        await settings.betMultiplier.get(page, '1.5€').click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 12 -1€, 1.5€', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: 'selected',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '2,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,25€' },
          { num: '3', win: '-', bonus: '1,50€' },
          { num: '4', win: '-', bonus: '1,75€' },
          { num: '5', win: '-', bonus: '2,00€' },
          { num: '6', win: '2,50€', bonus: '5,00€' },
          { num: '7', win: '12,50€', bonus: '25,00€' },
          { num: '8', win: '75,00€', bonus: '175,00€' },
          { num: '9', win: '500,00€', bonus: '1.100,00€' },
          { num: '10', win: '1.250,00€', bonus: '2.750,00€' },
          { num: '11', win: '12.500,00€', bonus: '37.500,00€' },
          { num: '12', win: '500.000,00€', bonus: '1.000.000,00€' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect a KINO number 11, 12', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 11).click();
        await playArea.numberBtn.get(page, 12).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 11, 12', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: 'selected',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '1,00€', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,25€' },
          { num: '3', win: '-', bonus: '1,50€' },
          { num: '4', win: '-', bonus: '2,00€' },
          { num: '5', win: '1,00€', bonus: '3,50€' },
          { num: '6', win: '10,00€', bonus: '30,00€' },
          { num: '7', win: '40,00€', bonus: '90,00€' },
          { num: '8', win: '250,00€', bonus: '750,00€' },
          { num: '9', win: '5.000,00€', bonus: '12.500,00€' },
          { num: '10', win: '50.000,00€', bonus: '125.000,00€' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(9).number.notExists(page);
        await settings.winningsTable.rowC2W(9).winning.notExists(page);
        await settings.winningsTable.rowC2W(9).bonus.notExists(page);
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect a KINO number 10', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 10).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - -10', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: 'c2w-border-bottom',
          '8_c2w': 'c2w-border-top',
          9: 'selected',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '1,00€' },
          { num: '2', win: '-', bonus: '1,50€' },
          { num: '3', win: '-', bonus: '2,00€' },
          { num: '4', win: '0,50€', bonus: '3,00€' },
          { num: '5', win: '2,50€', bonus: '7,50€' },
          { num: '6', win: '12,50€', bonus: '35,00€' },
          { num: '7', win: '100,00€', bonus: '250,00€' },
          { num: '8', win: '2.000,00€', bonus: '5.000,00€' },
          { num: '9', win: '20.000,00€', bonus: '50.000,00€' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(8).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(8).winning.shouldHaveText(page, '12.000,00€');
        await settings.winningsTable.rowC2W(8).bonus.shouldHaveText(page, '15.000,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('UnSelect a KINO number 3, 4, 5, 6, 7, 8, 9', async ({}, testInfo) => {
      try {
        await playArea.numberBtn.get(page, 3).click();
        await playArea.numberBtn.get(page, 4).click();
        await playArea.numberBtn.get(page, 5).click();
        await playArea.numberBtn.get(page, 6).click();
        await playArea.numberBtn.get(page, 7).click();
        await playArea.numberBtn.get(page, 8).click();
        await playArea.numberBtn.get(page, 9).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 2 (no 3, 4, 5, 6, 7, 8, 9)', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const rowClassMap = {
          0: '',
          1: 'c2w-border-bottom',
          '1_c2w': 'c2w-border-top',
          2: 'selected',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
        };

        for (const key of Object.keys(rowClassMap)) {
          const expectedClass = rowClassMap[key];
          const locator =
            typeof key === 'string' && key.includes('_c2w')
              ? settings.winningsTable.rowC2W(Number(key.split('_')[0])).row
              : settings.winningsTable.row(Number(key)).row;
          await locator.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '0,50€', bonus: '8,00€' },
          { num: '2', win: '2,50€', bonus: '35,00€' },
          { num: '3', win: '-', bonus: '-' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }

        await settings.winningsTable.rowC2W(1).number.shouldHaveText(page, '');
        await settings.winningsTable.rowC2W(1).winning.shouldHaveText(page, '1,50€');
        await settings.winningsTable.rowC2W(1).bonus.shouldHaveText(page, '9,00€');
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Select Clear All from betslip and Confirm', async ({}, testInfo) => {
      try {
        await lobbyHeader.clearAll.get(page).click();
        await lobbyHeader.clearAll.yes.get(page).click();
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Check Winnings table - 0', async ({}, testInfo) => {
      try {
        await settings.winningsTable.isVisible(page);

        const selectedRowIndex = 0;
        for (let i = 0; i <= 12; i++) {
          const expectedClass = i === selectedRowIndex ? 'selected' : '';
          await settings.winningsTable.row(i).row.shouldHaveClass(page, expectedClass);
        }

        await settings.winningsTable.headers.numbers.shouldHaveText(page);
        await settings.winningsTable.headers.winnings.shouldHaveText(page);
        await settings.winningsTable.headers.bonus.shouldHaveText(page);

        const expectedWinnings = [
          { num: '0', win: '-', bonus: '-' },
          { num: '1', win: '-', bonus: '-' },
          { num: '2', win: '-', bonus: '-' },
          { num: '3', win: '-', bonus: '-' },
          { num: '4', win: '-', bonus: '-' },
          { num: '5', win: '-', bonus: '-' },
          { num: '6', win: '-', bonus: '-' },
          { num: '7', win: '-', bonus: '-' },
          { num: '8', win: '-', bonus: '-' },
          { num: '9', win: '-', bonus: '-' },
          { num: '10', win: '-', bonus: '-' },
          { num: '11', win: '-', bonus: '-' },
          { num: '12', win: '-', bonus: '-' },
        ];

        for (let i = 0; i < expectedWinnings.length; i++) {
          await settings.winningsTable.row(i).number.shouldHaveText(page, expectedWinnings[i].num);
          await settings.winningsTable.row(i).winning.shouldHaveText(page, expectedWinnings[i].win);
          await settings.winningsTable.row(i).bonus.shouldHaveText(page, expectedWinnings[i].bonus);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
