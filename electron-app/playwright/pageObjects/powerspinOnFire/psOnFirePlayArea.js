// playwright/pageObject/powerspinOnFire/psOnFirePlayArea.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  mainNumberHeader: {
    get: function (page) {
      return page.locator('.number-selection-layout__header');
    },
    text: {
      el: 'ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ 1 ΑΡΙΘΜΟΥ',
      en: 'SELECT AT LEAST 1 NUMBER',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  mainNumberSystemHeader: {
    get: function (page) {
      return page.locator('.number-selection-layout__header');
    },
    text: {
      el: number => `ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ${number} ΑΡΙΘΜΩΝ`,
      en: number => `SELECT AT LEAST ${number} NUMBERS`,
    },
    shouldHaveText: async function (page, number) {
      await expect(this.get(page)).toHaveText(this.text[world.lang](number));
    },
  },
  alternateView: {
    get: function (page) {
      return page.locator('.fireblaze-numbers__alternate-view');
    },
  },
  wheelCircle: {
    get: function (page) {
      return page.locator('.fireblaze-wheel__center-circle');
    },
    isVisible: async function (page, value) {
      await expect(this.get(page, value)).toBeVisible();
    },
  },
  mainNumbersTxt: {
    get: function (page) {
      return page.locator('.number-selection-layout__number-wrapper');
    },
    text: {
      default: {
        el: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34',
        en: '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34',
      },
      alternateView: {
        el: '9 34 22 18 29 7 28 12 3 26 30 15 19 32 4 21 2 25 17 6 27 13 11 8 23 10 5 24 16 33 1 20 14 31',
        en: '9 34 22 18 29 7 28 12 3 26 30 15 19 32 4 21 2 25 17 6 27 13 11 8 23 10 5 24 16 33 1 20 14 31',
      },
    },
    shouldHaveText: async function (page, view = 'default') {
      await expect(this.get(page)).toHaveText(this.text[view][world.lang]);
    },
  },
  mainNumberBtn: {
    get: function (page, value) {
      // value = [1, 2, 3, 4, 5, 6, ..., 34]
      return page.locator(`#fireblaze-number-btn-${value}`);
    },
    shouldHaveText: async function (page, value) {
      await expect(this.get(page, value)).toHaveText(value.toString());
    },
  },
  stakes: {
    get: function (page) {
      return page.locator('.fireblaze-stakes-selection__title');
    },
    text: {
      el: 'ΠΟΣΟ (€)',
      en: 'BET AMOUNT (€)',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    selections: {
      get: function (page) {
        return page.locator('.fireblaze-stakes-selection__stakes');
      },
      text: {
        // num, doub, quad, oct
        num: {
          el: '0.5€ 1€ 1.5€ 2€ 3€ 5€ 7€ 10€ 20€ 50€',
          en: '0.5€ 1€ 1.5€ 2€ 3€ 5€ 7€ 10€ 20€ 50€',
        },
        doub: {
          el: '0.5€ 1€ 1.5€ 2€ 3€ 5€ 7€ 10€ 20€ 50€ 100€',
          en: '0.5€ 1€ 1.5€ 2€ 3€ 5€ 7€ 10€ 20€ 50€ 100€',
        },
        quad: {
          el: '0.5€ 1€ 1.5€ 2€ 3€ 5€ 7€ 10€ 20€ 50€ 100€ 200€',
          en: '0.5€ 1€ 1.5€ 2€ 3€ 5€ 7€ 10€ 20€ 50€ 100€ 200€',
        },
        oct: {
          el: '0.5€ 1€ 1.5€ 2€ 3€ 5€ 7€ 10€ 20€ 50€ 100€ 200€ 400€',
          en: '0.5€ 1€ 1.5€ 2€ 3€ 5€ 7€ 10€ 20€ 50€ 100€ 200€ 400€',
        },
      },
      shouldHaveText: async function (page, options) {
        await expect(this.get(page)).toHaveText(this.text[options][world.lang]);
      },
    },
    betMultipliers: {
      expected: {
        0.5: { index: 1, text: '0.5€' },
        1: { index: 2, text: '1€' },
        1.5: { index: 3, text: '1.5€' },
        2: { index: 4, text: '2€' },
        3: { index: 6, text: '3€' },
        5: { index: 10, text: '5€' },
        7: { index: 14, text: '7€' },
        10: { index: 20, text: '10€' },
        20: { index: 40, text: '20€' },
        50: { index: 100, text: '50€' },
      },
      get: function (page, label) {
        const index = this.expected[label].index;
        return page.locator(`#fireblaze-stake-btn-${index}`);
      },
      shouldHaveText: async function (page, label) {
        await expect(this.get(page, label)).toHaveText(this.expected[label].text);
      },
      isActive: async function (page, label) {
        await expect(this.get(page, label)).toHaveClass(/--active/);
      },
      isNotActive: async function (page, label) {
        await expect(this.get(page, label)).not.toHaveClass(/--active/);
      },
    },
  },
  mainNumbersStatisticsTxt: {
    get: function (page, value) {
      return page.locator(`#fireblaze-number-btn-${value} .fireblaze-number-button__stat`);
    },
    isVisible: async function (page, value) {
      await expect(this.get(page, value)).toBeVisible();
    },
  },
  statistics: {
    title: {
      get: function (page) {
        return page.locator('.fireblaze-play-area__statistics-title');
      },
      text: {
        el: 'ΣΤΑΤΙΣΤΙΚΑ',
        en: 'STATISTICS',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    switch: {
      get: function (page) {
        return page.locator('.tristate-switch');
      },
      text: {
        el: 'ΕΜΦΑΝΙΣΕΙΣ ΚΑΘΥΣΤΕΡΗΣΕΙΣ',
        en: 'OCCURRENCES DELAYS',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
      occurance: {
        get: function (page) {
          return page.locator('.tristate-switch > div:nth-child(1)');
        },
      },
      middle: {
        get: function (page) {
          return page.locator('.tristate-switch > div:nth-child(2)');
        },
      },
      delays: {
        get: function (page) {
          return page.locator('.tristate-switch > div:nth-child(3)');
        },
      },
    },
    text: {
      get: function (page) {
        return page.locator('.fireblaze-play-area__alert-text');
      },
      text: {
        occurrences: {
          el: 'Οι εμφανίσεις αφορούν τις τελευταίες 250 κληρώσεις.',
          en: 'The appearances refer to the last 250 draws.',
        },
        delays: {
          el: 'Οι εμφανίσεις αφορούν τις τελευταίες 7 ημέρες.',
          en: 'The appearances refer to the last 7 days.',
        },
      },
      shouldHaveText: async function (page, statisticsType) {
        await expect(this.get(page)).toHaveText(this.text[statisticsType][world.lang]);
      },
      notExist: async function (page) {
        await expect(this.get(page)).toHaveCount(0);
      },
    },
  },
  clear: {
    text: {
      get: function (page) {
        return page.locator('.fireblaze-play-area__footer-clear');
      },
      text: {
        el: 'ΚΑΘΑΡΙΣΜΟΣ',
        en: 'CLEAR',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    icon: {
      get: function (page) {
        return page.locator('#fireblaze-play-area-clear-betslip-btn');
      },
      isVisible: async function (page, value) {
        await expect(this.get(page, value)).toBeVisible();
      },
    },
  },
};

module.exports = page;
