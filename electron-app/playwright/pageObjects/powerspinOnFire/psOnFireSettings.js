// playwright/pageObject/powerspinOnFire/psOnFireSettings.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  quickPickInfo: {
    get: function (page) {
      return page.locator('.fireblaze-quickpick__info');
    },
    text: {
      el: 'Εδώ δημιουργείς μια απλή στήλη με τυχαίους αριθμούς!',
      en: 'Here you create a simple column of random numbers!',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  quickPickBtn: {
    get: function (page) {
      return page.locator('#fireblaze-quickpick-btn');
    },
    text: {
      el: 'ΤΥΧΑΙΑ ΕΠΙΛΟΓΗ',
      en: 'QUICK PICK',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  optionsHeaderTitle: {
    get: function (page) {
      return page.locator('.fireblaze-options__header-title');
    },
    text: {
      el: 'ΑΓΟΡΕΣ',
      en: 'OPTIONS',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  optionsHeaderInfo: {
    get: function (page) {
      return page.locator('.fireblaze-options__header-info');
    },
    text: {
      el: 'Εδώ επιλέγεις την αγορά με την οποία θέλεις να συμμετέχεις. Μπορείς να επιλέξεις έως 4 αγορές ανά δελτίο.',
      en: 'Here you select the options you want to participate in. You can choose up to 4 options per slip.',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  optionsNumbers: {
    get: function (page) {
      return page.locator('.fireblaze-options__numbers');
    },
    text: {
      el: 'Αριθμός 2άδα 4άδα 8άδα',
      en: 'Number Double Quadruple Octuple',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
  },
  optionsButtons: {
    get: function (page, value) {
      // value = [1, 2, 4, 8]
      return page.locator(`#fireblaze-system-btn-${value}`);
    },
    isVisible: async function (page, value) {
      await expect(this.get(page, value)).toBeVisible();
    },
    text: {
      1: {
        el: 'Αριθμός',
        en: 'Number',
      },
      2: {
        el: '2άδα',
        en: 'Double',
      },
      4: {
        el: '4άδα',
        en: 'Quadruple',
      },
      8: {
        el: '8άδα',
        en: 'Octuple',
      },
    },
    shouldHaveText: async function (page, value) {
      const expectedText = this.text[value][world.lang];
      await expect(this.get(page, value)).toHaveText(expectedText);
    },
    isActive: async function (page, label) {
      await expect(this.get(page, label)).toHaveClass(/--active/);
    },
    isDisabled: async function (page, label) {
      await expect(this.get(page, label)).toHaveClass(/--disabled/);
    },
    isEnabled: async function (page, label) {
      await expect(this.get(page, label)).not.toHaveClass(/--disabled/);
    },
  },
  advertisement: {
    get: function (page) {
      return page.locator('.fireblaze-settings__advertisement-wrapper');
    },
    text: {
      el: 'Κέρδη έως',
      en: 'Winnings up to',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    psOnFireLogo: {
      get: function (page) {
        return page.locator('.fireblaze-settings__advertisement-logo');
      },
      isVisible: async function (page, value) {
        await expect(this.get(page, value)).toBeVisible();
      },
    },
    amount: {
      get: function (page) {
        return page.locator('.fireblaze-settings__advertisement-amount');
      },
      isVisible: async function (page, value) {
        await expect(this.get(page, value)).toBeVisible();
      },
    },
  },
};

module.exports = page;
