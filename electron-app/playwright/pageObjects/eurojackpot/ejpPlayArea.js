// playwright/pageObject/eurojackpot/ejpPlayArea.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  mainNumberHeader: {
    get: function (page) {
      return page.locator('.number-selection-layout__header').first();
    },
    text: {
      el: 'ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ 5 ΑΡΙΘΜΩΝ',
      en: 'SELECT AT LEAST 5 NUMBERS',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  mainNumberSystemHeader: {
    get: function (page) {
      return page.locator('.number-selection-layout__header').first();
    },
    text: {
      el: number => `ΕΠΙΛΟΓΗ ${number} ΑΡΙΘΜΩΝ`,
      en: number => `SELECT ${number} NUMBERS`,
    },
    shouldHaveText: async function (page, number) {
      await expect(this.get(page)).toHaveText(this.text[world.lang](number));
    },
  },
  mainNumbersTxt: {
    get: function (page) {
      return page.locator('.number-selection-layout__number-wrapper').first();
    },
    text: {
      el: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
      en: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n46\n47\n48\n49\n50',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  mainNumberBtn: {
    get: function (page, value) {
      // value = [1, 2, 3, 4, 5, 6, ..., 50]
      return page.locator(`#ejp-main-number-btn-${value}`);
    },
    shouldHaveText: async function (page, value) {
      await expect(this.get(page, value)).toHaveText(value.toString());
    },
  },
  euroNumberHeader: {
    get: function (page) {
      return page.locator('.number-selection-layout__header').last();
    },
    text: {
      el: 'ΕΠΙΛΟΓΗ ΤΟΥΛΑΧΙΣΤΟΝ ☆ 2 ΑΡΙΘΜΩΝ',
      en: 'SELECT AT LEAST ☆ 2 NUMBERS',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  euroNumbersTxt: {
    get: function (page) {
      return page.locator('.number-selection-layout__number-wrapper').last();
    },
    text: {
      el: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12',
      en: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  euroNumberBtn: {
    get: function (page, value) {
      // value = [1, 2, 3, 4, 5, 6, ..., 12]
      return page.locator(`#ejp-euro-number-btn-${value}`);
    },
    shouldHaveText: async function (page, value) {
      await expect(this.get(page, value)).toHaveText(value.toString());
    },
  },
  mainNumbersStatisticsTxt: {
    get: function (page, value) {
      return page.locator(`#ejp-main-number-btn-${value} > span.eurojackpot-number-button__info`);
    },
    isVisible: async function (page, value) {
      await expect(this.get(page, value)).toBeVisible();
    },
    shouldBeEmpty: async function (page, value) {
      await expect(this.get(page, value)).toHaveText('');
    },
  },
  euroNumbersStatisticsTxt: {
    get: function (page, value) {
      return page.locator(`#ejp-euro-number-btn-${value} > span.eurojackpot-number-button__info`);
    },
    isVisible: async function (page, value) {
      await expect(this.get(page, value)).toBeVisible();
    },
    shouldBeEmpty: async function (page, value) {
      await expect(this.get(page, value)).toHaveText('');
    },
  },
  statisticsTitle: {
    get: function (page) {
      return page.locator('.eurojackpot-play-area__statistics-title');
    },
    text: {
      el: 'ΣΤΑΤΙΣΤΙΚΑ',
      en: 'STATISTICS',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  statisticsSwitch: {
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
  clear: {
    get: function (page) {
      return page.locator('.eurojackpot-play-area__footer-clear');
    },
    text: {
      el: 'ΚΑΘΑΡΙΣΜΟΣ',
      en: 'CLEAR',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
};

module.exports = page;
