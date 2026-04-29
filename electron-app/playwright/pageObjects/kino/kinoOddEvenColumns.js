// playwright/pageObject/kino/kinoOddEvenColumns.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  columns: {
    get: function (page) {
      return page.locator('#stiles_modal');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    isHidden: async function (page) {
      await expect(this.get(page)).toBeHidden();
    },
    gameLogo: {
      get: function (page) {
        return page.locator('#columnsModalImgLogo');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    labels: {
      selection: {
        get: function (page) {
          return page.locator('#columnsModalColumnsSelectionTitle');
        },
        text: {
          el: 'ΕΠΙΛΟΓΗ ΣΤΗΛΗΣ',
          en: 'COLUMN SELECTION',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      selectionInfo: {
        get: function (page) {
          return page.locator('#columnsModalColumnsSelectionInfo');
        },
        text: {
          el: 'Μπορείτε να επιλέξετε περισσότερες από μία ΣΤΗΛΕΣ',
          en: 'You can select more than one COLUMNS',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      betAmount: {
        get: function (page) {
          return page.locator('#columnsModalBetAmountTitle');
        },
        text: {
          el: 'ΠΟΝΤΑΡΙΣΜΑ ΑΝΑ ΣΤΗΛΗ',
          en: 'BET AMOUNT PER COLUMN',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
    },
    options: {
      get: function (page, index) {
        return page.locator(`#columns_sidebet_1${index}_label`);
      },
      shouldHaveText: async function (page) {
        const ordinals =
          world.lang === 'el'
            ? ['1η', '2η', '3η', '4η', '5η', '6η', '7η', '8η', '9η', '10η']
            : ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
        for (let i = 1; i <= 10; i++) {
          const locator = page.locator(`#columns_sidebet_1${i}_label`);
          await expect(locator).toHaveText(ordinals[i - 1]);
        }
      },
    },
    amounts: {
      get: function (page, label) {
        return page.locator(`#columns_sidebet_2${label}_label`);
      },
      shouldHaveText: async function (page) {
        const amounts = ['1€', '2€', '3€', '5€', '10€', '15€', '20€', '30€', '50€', '100€'];
        for (let i = 1; i <= 10; i++) {
          const locator = page.locator(`#columns_sidebet_2${i}_label`);
          await expect(locator).toHaveText(amounts[i - 1]);
        }
      },
    },
    buttons: {
      clear: {
        get: function (page) {
          return page.locator('.columns-modal .clearButton');
        },
        text: {
          el: 'ΚΑΘΑΡΙΣΜΟΣ',
          en: 'CLEAR',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      add: {
        get: function (page) {
          return page.locator('#columns-add-to-betslip-button');
        },
        isDisabled: async function (page) {
          await expect(this.get(page)).toBeDisabled();
        },
        text: {
          el: 'ΠΡΟΣΘΗΚΗ',
          en: 'ADD',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      close: {
        get: function (page) {
          return page.locator('#columns-close-button');
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
      },
    },
  },
  oddEven: {
    get: function (page) {
      return page.locator('#mona_ziga_modal');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    isHidden: async function (page) {
      await expect(this.get(page)).toBeHidden();
    },
    gameLogo: {
      get: function (page) {
        return page.locator('#oddEvenModalImgLogo');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    labels: {
      selection: {
        get: function (page) {
          return page.locator('#oddEvenModalSelectionTitle');
        },
        text: {
          el: 'ΕΠΙΛΟΓΗ',
          en: 'SELECTION',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      betAmount: {
        get: function (page) {
          return page.locator('#oddEvenModalBetAmountTitle');
        },
        text: {
          el: 'ΠΟΝΤΑΡΙΣΜΑ',
          en: 'BET AMOUNT',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
    },
    options: {
      odd: {
        get: function (page) {
          return page.locator('#odd_even_sidebet_01_label');
        },
        text: {
          el: 'ΜΟΝΑ',
          en: 'ODD',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      even: {
        get: function (page) {
          return page.locator('#odd_even_sidebet_02_label');
        },
        text: {
          el: 'ΖΥΓΑ',
          en: 'EVEN',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      draw: {
        get: function (page) {
          return page.locator('#odd_even_sidebet_03_label');
        },
        text: {
          el: 'ΙΣΟΠΑΛΙΑ',
          en: 'DRAW',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
    },
    amounts: {
      get: function (page, label) {
        return page.locator(`#odd_even_sidebet_1${label}_label`);
      },
      shouldHaveText: async function (page) {
        const values = ['1€', '2€', '3€', '5€', '10€', '15€', '20€', '30€', '50€', '100€'];
        for (let i = 1; i <= 10; i++) {
          const locator = page.locator(`#odd_even_sidebet_1${i}_label`);
          await expect(locator).toHaveText(values[i - 1]);
        }
      },
    },
    buttons: {
      clear: {
        get: function (page) {
          return page.locator('.oddEven-modal .clearButton');
        },
        text: {
          el: 'ΚΑΘΑΡΙΣΜΟΣ',
          en: 'CLEAR',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      add: {
        get: function (page) {
          return page.locator('#odd-even-add-to-betslip-button');
        },
        isDisabled: async function (page) {
          await expect(this.get(page)).toBeDisabled();
        },
        text: {
          el: 'ΠΡΟΣΘΗΚΗ',
          en: 'ADD',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      close: {
        get: function (page) {
          return page.locator('#odd-even-close-button');
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
      },
    },
  },
};

module.exports = page;
