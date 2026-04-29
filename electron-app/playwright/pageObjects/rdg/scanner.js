// playwright/pageObjects/rdg/scanner.js
import { expect } from '@playwright/test';
import world from '#/pageObjects/lib/world';

const page = {
  close: {
    get: function (page) {
      return page.locator('button[aria-label="Close info Modal"]');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  header: {
    get: function (page) {
      return page.locator('.modal__header');
    },
    text: {
      el: 'Σφάλμα συσκευής σάρωσης',
      en: 'Barcode reader error',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  body: {
    get: function (page) {
      return page.locator('.modal__body');
    },
    text: {
      el: 'Παρουσιάστηκε σφάλμα με την συσκευή σάρωσης.',
      en: 'Error on the barcode reader device.',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    icon: {
      get: function (page) {
        return page.locator('.modal-body__icon');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
  },
  footer: {
    get: function (page) {
      return page.locator('.modal__footer');
    },
    text: {
      el: 'Εντάξει',
      en: 'OK',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
};

module.exports = page;
