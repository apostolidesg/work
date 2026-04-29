// playwright/pageObject/powerspin/psPlayArea.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  numberLabel: {
    get: function (page, comboIndex) {
      return page.locator(`#single-play-wheel-${comboIndex}-category-number .wheel-category-layout__title`);
    },
    text: {
      el: 'ΑΡΙΘΜΟΣ',
      en: 'NUMBER',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
  numberTitle: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-1-wheel-0 > div');
    },
    text: {
      el: 'Αριθμός',
      en: 'Number',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  numberTitleDouble: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-2-wheel-0 > div');
    },
    text: {
      el: '2άδα',
      en: 'Double',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  numberTitleTriple: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-3-wheel-0 > div');
    },
    text: {
      el: '3άδα',
      en: 'Triple',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  numberTitleQuadruple: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-4-wheel-0 > div');
    },
    text: {
      el: '4άδα',
      en: 'Quadruple',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  numberTitleSextuple: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-6-wheel-0 > div');
    },
    text: {
      el: '6άδα',
      en: 'Sextuple',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  numberTitleOctuple: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-8-wheel-0 > div');
    },
    text: {
      el: '8άδα',
      en: 'Octuple',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  numberTitleDozen: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-12-wheel-0 > div');
    },
    text: {
      el: '12άδα',
      en: 'Dozen',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  // ----- Selection Buttons -----
  numberSelectBtn: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-1-wheel-0 > button');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  number2daSelectBtn: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-2-wheel-0 > button');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  number3daSelectBtn: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-3-wheel-0 > button');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  number4daSelectBtn: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-4-wheel-0 > button');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  number6daSelectBtn: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-6-wheel-0 > button');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  number8daSelectBtn: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-8-wheel-0 > button');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  number12daSelectBtn: {
    get: function (page) {
      return page.locator('#powerspin-requested-number-12-wheel-0 > button');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  // ----- Number Buttons -----
  mainNumberBtn: {
    get: function (page, value, comboIndex) {
      return page.locator(`#powerspin-number-${value}-wheel-${comboIndex} > button`);
    },
    shouldHaveText: async function (page, value, comboIndex) {
      await expect(this.get(page, value, comboIndex)).toHaveText(value.toString());
    },
  },
  quickPickButton: {
    get: function (page, comboIndex) {
      return page.locator(`#ssbt_random_button-wheel-${comboIndex} > div`);
    },
    text: {
      el: 'ΤΥΧΑΙΑ ΕΠΙΛΟΓΗ',
      en: 'QUICK PICK',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
  // ----- Symbol Area -----
  symbolLabel: {
    get: function (page, comboIndex) {
      return page.locator(`#single-play-wheel-${comboIndex}-category-symbol .wheel-category-layout__title`);
    },
    text: {
      el: 'ΣΥΜΒΟΛΟ',
      en: 'SYMBOL',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
  wheelImage: {
    get: function (page, comboIndex) {
      return page.locator(`#single-play-wheel-${comboIndex}-category-symbol img`);
    },
    isVisible: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toBeVisible();
    },
  },
  // ----- Zone Area -----
  zoneLabel: {
    get: function (page, comboIndex) {
      return page.locator(`#single-play-wheel-${comboIndex}-category-color .wheel-category-layout__title`);
    },
    text: {
      el: 'ΖΩΝΗ',
      en: 'ZONE',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
  zoneRedBtn: {
    get: function (page, comboIndex) {
      return page.locator(`#option-red-${comboIndex} > button`);
    },
    text: {
      el: 'ΚΟΚΚΙΝΗ',
      en: 'RED',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
  zoneGreenBtn: {
    get: function (page, comboIndex) {
      return page.locator(`#option-green-${comboIndex} > button`);
    },
    text: {
      el: 'ΠΡΑΣΙΝΗ',
      en: 'GREEN',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
  zoneBlueBtn: {
    get: function (page, comboIndex) {
      return page.locator(`#option-blue-${comboIndex} > button`);
    },
    text: {
      el: 'ΜΠΛΕ',
      en: 'BLUE',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
  // ----- Under/Over Area -----
  underOverLabel: {
    get: function (page, comboIndex) {
      return page.locator(`#single-play-wheel-${comboIndex}-category-over_under .wheel-category-layout__title`);
    },
    text: {
      el: 'OVER/UNDER 12.5',
      en: 'OVER/UNDER 12.5',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
  underBtn: {
    get: function (page, comboIndex) {
      return page.locator(
        `#single-play-wheel-${comboIndex}-category-over_under .under-over__rounded-bordered-label--under`,
      );
    },
    text: {
      el: 'UNDER 12.5',
      en: 'UNDER 12.5',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
  overBtn: {
    get: function (page, comboIndex) {
      return page.locator(
        `#single-play-wheel-${comboIndex}-category-over_under .under-over__rounded-bordered-label--over`,
      );
    },
    text: {
      el: 'OVER 12.5',
      en: 'OVER 12.5',
    },
    shouldHaveText: async function (page, comboIndex) {
      await expect(this.get(page, comboIndex)).toHaveText(this.text[world.lang]);
    },
  },
};

module.exports = page;
