// playwright/pageObject/bookOfGames/bookOfGames.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  header: {
    get: function (page) {
      return page.locator('.book-of-games__header');
    },
    text: {
      el: 'ΟΔΗΓΟΙ ΠΑΙΓΝΙΩΝ Σκανάρεις τους ακόλουθους κωδικούς QR και διαβάζεις τον αντίστοιχο οδηγό παιγνίων',
      en: "GAMES' GUIDE Scan the following QR codes and read the corresponding game guides",
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  BookOfGamesBackgroungImg: {
    get: function (page) {
      return page.locator('.book-of-games');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    img: {
      el: 'data:image/jpeg;base64',
      en: 'data:image/jpeg;base64',
    },
    shouldHaveImg: async function (page) {
      await expect(this.get(page)).toHaveCSS('background-image', new RegExp(this.img[world.lang]));
    },
  },
  BookOfGamesImage0: {
    get: function (page) {
      return page.locator('#book-of-games-image-0');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  BookOfGamesQRCode0: {
    get: function (page) {
      return page.locator('#books-of-games-qrcode-0');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  BookOfGamesImage1: {
    get: function (page) {
      return page.locator('#book-of-games-image-1');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  BookOfGamesQRCode1: {
    get: function (page) {
      return page.locator('#books-of-games-qrcode-1');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
};

module.exports = page;
