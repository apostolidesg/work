// playwright/pageObject/eurojackpot/ejpSettings.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  quickPickInfo: {
    get: function (page) {
      return page.locator('.eurojackpot-quickpick__info');
    },
    text: {
      el: 'Εδώ δημιουργείς μια απλή στήλη με τυχαίους αριθμούς',
      en: 'Here you create a simple column of random numbers',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  quickPickBtn: {
    get: function (page) {
      return page.locator('#ejp-quickpick-btn');
    },
    text: {
      el: 'ΤΥΧΑΙΑ ΕΠΙΛΟΓΗ',
      en: 'RANDOM PICK',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  systemHeaderTitle: {
    get: function (page) {
      return page.locator('.eurojackpot-systems__header-title');
    },
    text: {
      el: 'ΣΥΣΤΗΜΑΤΑ',
      en: 'Systems',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  systemHeaderInfo: {
    get: function (page) {
      return page.locator('.eurojackpot-systems__header-info');
    },
    text: {
      el: 'Εδώ επιλέγεις να παίξεις με περισσότερους από 5 αριθμούς και με περισσότερες στήλες',
      en: 'Here you choose to play with more than 5 numbers and with more columns',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  systemNumbers: {
    get: function (page) {
      return page.locator('.eurojackpot-systems__numbers');
    },
    text: {
      el: '12 ΣΤΗΛΕΣ 118 13 ΣΤΗΛΕΣ 54 14 ΣΤΗΛΕΣ 38 15 ΣΤΗΛΕΣ 22 23 ΣΤΗΛΕΣ 51 24 ΣΤΗΛΕΣ 14 25 ΣΤΗΛΕΣ 30 34 ΣΤΗΛΕΣ 9 35 ΣΤΗΛΕΣ 6 45 ΣΤΗΛΕΣ 5',
      en: '12 COLUMNS 118 13 COLUMNS 54 14 COLUMNS 38 15 COLUMNS 22 23 COLUMNS 51 24 COLUMNS 14 25 COLUMNS 30 34 COLUMNS 9 35 COLUMNS 6 45 COLUMNS 5',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  systemButtons: {
    get: function (page, value) {
      // value = [12, 13, 14, 15, 23, 24, 25, 34, 35, 45]
      return page.locator(`#ejp-system-btn-${value}`);
    },
    isVisible: async function (page, value) {
      await expect(this.get(page, value)).toBeVisible();
    },
    shouldHaveText: async function (page, value) {
      await expect(this.get(page, value)).toHaveText(value.toString());
    },
  },
  nextDraw: {
    get: function (page) {
      return page.locator('.euro-jackpot-next-draw__wrapper');
    },
    timer: {
      get: function (page) {
        return page.locator('.draw-count-down__wrapper');
      },
    },
  },
};

module.exports = page;
