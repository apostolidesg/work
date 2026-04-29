// playwright/pageObject/lobbyGames.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  eurojackpot: {
    get: function (page) {
      return page.locator('#lobby-games-eurojackpot-img');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    text: {
      get: function (page) {
        return page.locator('.eurojackpot-draw-days');
      },
      text: {
        el: 'Κληρώνει κάθε Δευτέρα, Τρίτη, Τετάρτη, Πέμπτη & Παρασκευή',
        en: 'Draws every Monday, Tuesday, Wednesday, Thursday & Friday',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  pameStoixima: {
    get: function (page) {
      return page.locator('#lobby-games-pameStoixima-img');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    img: {
      el: 'data:image/png;base64',
      en: 'data:image/png;base64',
    },
    shouldHaveImg: async function (page) {
      await expect(this.get(page)).toHaveAttribute('style', new RegExp(this.img[world.lang]));
    },
  },
  kino: {
    get: function (page) {
      return page.locator('#lobby-games-kino-img');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    img: {
      el: 'data:image/png;base64',
      en: 'data:image/png;base64',
    },
    shouldHaveImg: async function (page) {
      await expect(this.get(page)).toHaveAttribute('style', new RegExp(this.img[world.lang]));
    },
  },
  powerspin: {
    get: function (page) {
      return page.locator('#lobby-games-powerspin-img');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    img: {
      el: 'data:image/jpeg;base64',
      en: 'data:image/jpeg;base64',
    },
    shouldHaveImg: async function (page) {
      await expect(this.get(page)).toHaveAttribute('style', new RegExp(this.img[world.lang]));
    },
  },
  powerspinOnFire: {
    get: function (page) {
      return page.locator('#lobby-games-fireblaze-img');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    img: {
      el: 'data:image/jpeg;base64',
      en: 'data:image/jpeg;base64',
    },
    shouldHaveImg: async function (page) {
      await expect(this.get(page)).toHaveAttribute('style', new RegExp(this.img[world.lang]));
    },
  },
  virtuals: {
    get: function (page) {
      return page.locator('#lobby-games-virtuals-img');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    img: {
      el: 'data:image/png;base64',
      en: 'data:image/png;base64',
    },
    shouldHaveImg: async function (page) {
      await expect(this.get(page)).toHaveCSS('background-image', new RegExp(this.img[world.lang]));
    },
  },
};

module.exports = page;
