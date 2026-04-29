// playwright/pageObjects/powerspin/psExtraMarkets.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  number: {
    label: {
      get: function (page) {
        return page.locator('#markets-category-number_on_wheel .powerspin-markets-layout__title');
      },
      text: {
        el: 'ΠΟΙΟΣ ΑΡΙΘΜΟΣ ΘΑ ΚΛΗΡΩΘΕΙ ΣΕ ΟΠΟΙΟΝΔΗΠΟΤΕ ΤΡΟΧΟ;',
        en: 'NUMBER IN ANY WHEEL',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    btn: {
      get: function (page, value) {
        return page.locator(`#powerspin-number-${value}-markets`);
      },
      shouldHaveText: async function (page, value) {
        await expect(this.get(page, value)).toHaveText(value.toString());
      },
    },
    betMultiplierLabel: {
      get: function (page) {
        return page.locator('#markets-category-number_on_wheel .betting-amount__title');
      },
      text: {
        el: 'ΠΟΣΟ (€)',
        en: 'BET AMOUNT (€)',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    betMultipliers: {
      expected: {
        '0.5€': { index: '0_5', text: '0.5€' },
        '1€': { index: 1, text: '1€' },
        '2€': { index: 2, text: '2€' },
        '3€': { index: 3, text: '3€' },
        '5€': { index: 5, text: '5€' },
        '10€': { index: 10, text: '10€' },
        '15€': { index: 15, text: '15€' },
        '20€': { index: 20, text: '20€' },
        '25€': { index: 25, text: '25€' },
        '30€': { index: 30, text: '30€' },
        '40€': { index: 40, text: '40€' },
        '50€': { index: 50, text: '50€' },
        '100€': { index: 100, text: '100€' },
        '200€': { index: 200, text: '200€' },
        '500€': { index: 500, text: '500€' },
      },
      get: function (page, label) {
        const index = this.expected[label].index;
        return page.locator(`#markets-category-number_on_wheel .square-button__text-${index}`);
      },
      shouldHaveText: async function (page, label) {
        await expect(this.get(page, label)).toHaveText(this.expected[label].text);
      },
      isChecked: async function (page, label, expectedFragment) {
        await expect(this.get(page, label)).toHaveAttribute('class', new RegExp(expectedFragment));
      },
      isDisabled: async function (page, label) {
        await expect(this.get(page, label)).toHaveClass(/--disabled/);
      },
      isEnabled: async function (page, label) {
        await expect(this.get(page, label)).not.toHaveClass(/--disabled/);
      },
    },
  },

  wheelSymbol: {
    label: {
      get: function (page) {
        return page.locator('#markets-category-wheels_with_symbol .powerspin-markets-layout__title');
      },
      text: {
        el: 'ΤΟ ΣΥΜΒΟΛΟ ΘΑ ΚΛΗΡΩΘΕΙ ΣΕ:',
        en: 'SYMBOL IN HOW MANY WHEELS?',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    noneBtn: {
      get: function (page) {
        return page.locator(
          '#option-markets-markets\\.categories\\.WHEELS_WITH_SYMBOL\\.options\\.noWheel\\.mainScreen > button',
        );
      },
      text: {
        el: 'ΚΑΝΕΝΑΝ ΤΡΟΧΟ',
        en: 'NONE WHEEL',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    atLeastOneBtn: {
      get: function (page) {
        return page.locator(
          '#option-markets-markets\\.categories\\.WHEELS_WITH_SYMBOL\\.options\\.atLeastOnWheel\\.mainScreen > button',
        );
      },
      text: {
        el: 'ΤΟΥΛΑΧΙΣΤΟΝ 1 ΤΡΟΧΟ',
        en: 'AT LEAST ONE WHEEL',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    betMultiplierLabel: {
      get: function (page) {
        return page.locator('#markets-category-wheels_with_symbol .betting-amount__title');
      },
      text: {
        el: 'ΠΟΣΟ (€)',
        en: 'BET AMOUNT (€)',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    betMultipliers: {
      expected: {
        '0.5€': { index: '0_5', text: '0.5€' },
        '1€': { index: 1, text: '1€' },
        '2€': { index: 2, text: '2€' },
        '3€': { index: 3, text: '3€' },
        '5€': { index: 5, text: '5€' },
        '10€': { index: 10, text: '10€' },
        '15€': { index: 15, text: '15€' },
        '20€': { index: 20, text: '20€' },
        '25€': { index: 25, text: '25€' },
        '30€': { index: 30, text: '30€' },
        '40€': { index: 40, text: '40€' },
        '50€': { index: 50, text: '50€' },
        '100€': { index: 100, text: '100€' },
        '200€': { index: 200, text: '200€' },
        '500€': { index: 500, text: '500€' },
      },
      get: function (page, label) {
        const index = this.expected[label].index;
        return page.locator(`#markets-category-wheels_with_symbol .square-button__text-${index}`);
      },
      shouldHaveText: async function (page, label) {
        await expect(this.get(page, label)).toHaveText(this.expected[label].text);
      },
      isChecked: async function (page, label, expectedFragment) {
        await expect(this.get(page, label)).toHaveAttribute('class', new RegExp(expectedFragment));
      },
      isDisabled: async function (page, label) {
        await expect(this.get(page, label)).toHaveClass(/--disabled/);
      },
      isEnabled: async function (page, label) {
        await expect(this.get(page, label)).not.toHaveClass(/--disabled/);
      },
    },
  },

  wheelNumber: {
    label: {
      get: function (page) {
        return page.locator('#markets-category-wheels_with_number .powerspin-markets-layout__title');
      },
      text: {
        el: 'ΣΕ ΠΟΣΟΥΣ ΤΡΟΧΟΥΣ ΘΑ ΚΛΗΡΩΘΕΙ Ο ΙΔΙΟΣ ΑΡΙΘΜΟΣ;',
        en: 'SAME NUMBER IN HOW MANY WHEELS?',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    twoBtn: {
      get: function (page) {
        return page.locator(
          '#option-markets-markets\\.categories\\.WHEELS_WITH_NUMBER\\.options\\.twoWheels\\.mainScreen > button',
        );
      },
      text: {
        el: '2 ΤΡΟΧΟΥΣ',
        en: '2 WHEELS',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    threeBtn: {
      get: function (page) {
        return page.locator(
          '#option-markets-markets\\.categories\\.WHEELS_WITH_NUMBER\\.options\\.threeWheels\\.mainScreen > button',
        );
      },
      text: {
        el: '3 ΤΡΟΧΟΥΣ',
        en: '3 WHEELS',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    betMultiplierLabel: {
      get: function (page) {
        return page.locator('#markets-category-wheels_with_number .betting-amount__title');
      },
      text: {
        el: 'ΠΟΣΟ (€)',
        en: 'BET AMOUNT (€)',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    betMultipliers: {
      expected: {
        '0.5€': { index: '0_5', text: '0.5€' },
        '1€': { index: 1, text: '1€' },
        '2€': { index: 2, text: '2€' },
        '3€': { index: 3, text: '3€' },
        '5€': { index: 5, text: '5€' },
        '10€': { index: 10, text: '10€' },
        '15€': { index: 15, text: '15€' },
        '20€': { index: 20, text: '20€' },
        '25€': { index: 25, text: '25€' },
        '30€': { index: 30, text: '30€' },
        '40€': { index: 40, text: '40€' },
        '50€': { index: 50, text: '50€' },
        '100€': { index: 100, text: '100€' },
        '200€': { index: 200, text: '200€' },
        '500€': { index: 500, text: '500€' },
      },
      get: function (page, label) {
        const index = this.expected[label].index;
        return page.locator(`#markets-category-wheels_with_number .square-button__text-${index}`);
      },
      shouldHaveText: async function (page, label) {
        await expect(this.get(page, label)).toHaveText(this.expected[label].text);
      },
      isChecked: async function (page, label, expectedFragment) {
        await expect(this.get(page, label)).toHaveAttribute('class', new RegExp(expectedFragment));
      },
      isDisabled: async function (page, label) {
        await expect(this.get(page, label)).toHaveClass(/--disabled/);
      },
      isEnabled: async function (page, label) {
        await expect(this.get(page, label)).not.toHaveClass(/--disabled/);
      },
    },
  },
};

module.exports = page;
