// playwright/pageObject/kino/kinoPlayArea.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  numbersGrid: {
    get: function (page) {
      return page.locator('#numbers');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    text: {
      el: 'ΕΠΙΛΟΓΗ ΑΡΙΘΜΩΝ  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80',
      en: 'NUMBERS SELECTION  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    label: {
      get: function (page) {
        return page.locator('#numbers-choose-title');
      },
      text: {
        el: 'ΕΠΙΛΟΓΗ ΑΡΙΘΜΩΝ',
        en: 'NUMBERS SELECTION',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  numberBtn: {
    get: function (page, value) {
      // value = [1, 2, 3, 4, 5, 6, ..., 80]
      return page.locator(`#kino_number_${value}_label`);
    },
    isVisible: async function (page, value) {
      await expect(this.get(page, value)).toBeVisible();
    },
    shouldHaveText: async function (page, value) {
      await expect(this.get(page, value)).toHaveText(value.toString());
    },
    isTrue: async function (page, value) {
      await expect(this.get(page, value)).toHaveClass(/input_label_checked/);
    },
    isFalse: async function (page, value) {
      await expect(this.get(page, value)).not.toHaveClass(/input_label_checked/);
    },
  },
};

module.exports = page;
