// playwright/pageObject/powerspin/psSideScreen.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  sideScreenBet: {
    get: function (page) {
      return page.locator('.sidescreen-layout__content');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    betslipArea: {
      get: function (page) {
        return page.locator(`.powerspin-selections-list`);
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    number: {
      label: {
        get: function (page) {
          return page.locator(
            '.powerspin-selections-list > div:nth-child(1) .powerspin-market-selection-item__selection > span',
          );
        },
        text: {
          el: 'ΑΡΙΘΜΟΣ (ΟΤ) :',
          en: 'NUMBER (AW) :',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      content: {
        get: function (page) {
          return page.locator(
            '.powerspin-selections-list > div:nth-child(1) .powerspin-market-selection-item__selection__content',
          );
        },
        shouldHaveText: async function (page, contentNum) {
          await expect(this.get(page)).toHaveText(contentNum);
        },
      },
      cost: {
        get: function (page) {
          return page.locator('.powerspin-selections-list > div:nth-child(1) .powerspin-market-selection-item__cost');
        },
        text: {
          el: 'ΠΟΣΟ: ',
          en: 'AMOUNT: ',
        },
        shouldHaveText: async function (page, amount) {
          await expect(this.get(page)).toHaveText(`${this.text[world.lang]}${amount}`);
        },
      },
      clear: {
        get: function (page) {
          return page.locator('.base-clear-button__btn').nth(1);
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
      },
    },
    wheelSymbol: {
      label: {
        get: function (page) {
          return page.locator(
            '.powerspin-selections-list > div:nth-child(2) .powerspin-market-selection-item__selection > span',
          );
        },
        text: {
          el: 'ΣΥΜΒΟΛΟ ΣΕ :',
          en: 'SYMBOL IN :',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      content: {
        get: function (page) {
          return page.locator(
            '.powerspin-selections-list > div:nth-child(2) .powerspin-market-selection-item__selection__content',
          );
        },
        text: {
          el: 'ΚΑΝΕΝΑΝ ΤΡΟΧΟ',
          en: 'NONE',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      cost: {
        get: function (page) {
          return page.locator('.powerspin-selections-list > div:nth-child(2) .powerspin-market-selection-item__cost');
        },
        text: {
          el: 'ΠΟΣΟ: ',
          en: 'AMOUNT: ',
        },
        shouldHaveText: async function (page, amount) {
          await expect(this.get(page)).toHaveText(`${this.text[world.lang]}${amount}`);
        },
      },
      clear: {
        get: function (page) {
          return page.locator('.base-clear-button__btn').nth(2);
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
      },
    },
    wheelNumber: {
      label: {
        get: function (page) {
          return page.locator(
            '.powerspin-selections-list > div:nth-child(3) .powerspin-market-selection-item__selection > span',
          );
        },
        text: {
          el: 'ΙΔΙΟΣ ΑΡΙΘΜΟΣ ΣΕ :',
          en: 'SAME NUMBER IN :',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      content: {
        get: function (page) {
          return page.locator(
            '.powerspin-selections-list > div:nth-child(3) .powerspin-market-selection-item__selection__content',
          );
        },
        text: {
          el: '2 ΤΡΟΧΟΥΣ\n3 ΤΡΟΧΟΥΣ',
          en: '2 WHEELS\n3 WHEELS',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
      cost: {
        get: function (page) {
          return page.locator('.powerspin-selections-list > div:nth-child(3) .powerspin-market-selection-item__cost');
        },
        text: {
          el: 'ΠΟΣΟ: ',
          en: 'AMOUNT: ',
        },
        shouldHaveText: async function (page, amount) {
          await expect(this.get(page)).toHaveText(`${this.text[world.lang]}${amount}`);
        },
      },
      clear: {
        get: function (page) {
          return page.locator('.base-clear-button__btn').nth(3);
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
      },
    },
  },

  // need to check below
  clearModal: {
    // need to check
    get: function (page) {
      return page.locator('#info-modal-container');
    },
    title: {
      get: function (page) {
        return page.locator('#info-modal-title');
      },
      text: {
        el: 'ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ',
        en: 'CLEAR AREA',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    message: {
      get: function (page) {
        return page.locator('#info-modal-message');
      },
      text: {
        el: 'Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε;',
        en: 'All selections of this area will be lost. Are you sure you want to proceed?',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    yes: {
      get: function (page) {
        return page.locator('#yes-option');
      },
      text: {
        el: 'Ναι',
        en: 'Yes',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    no: {
      get: function (page) {
        return page.locator('#no-option');
      },
      text: {
        el: 'Όχι',
        en: 'No',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  // consecutive draws
  consecutiveDraws: {
    get: function (page) {
      return page.locator('.consecutive-draws');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    label: {
      get: function (page) {
        return page.locator('#ssbt_consecutive_draws_header_text');
      },
      text: {
        el: 'ΣΥΝΕΧΟΜΕΝΕΣ ΚΛΗΡΩΣΕΙΣ',
        en: 'CONSECUTIVE DRAWS',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    plusBtn: {
      get: function (page) {
        return page.locator('#ssbt_increase_consecutive_draws_button');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    minusBtn: {
      get: function (page) {
        return page.locator('#ssbt_decrease_consecutive_draws_button');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    input: {
      get: function (page) {
        return page.locator('#consecutive-draws-input');
      },
      shouldHaveValue: async function (page, expectedValue) {
        await expect(this.get(page)).toHaveValue(expectedValue);
      },
    },
    keypadDraws: {
      get: function (page, index) {
        return page.locator(`#consDraws_keypad_${index}`);
      },
      isVisible: async function (page, index) {
        await expect(this.get(page, index)).toBeVisible();
      },
      shouldHaveText: async function (page, index) {
        await expect(this.get(page, index)).toHaveText(index.toString());
      },
    },
    keypadDrawsClear: {
      get: function (page) {
        return page.locator('#consDraws_ce_button');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    keypadDrawsOK: {
      get: function (page) {
        return page.locator('#consDraws_ok_button');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    keypadDrawsMessage: {
      get: function (page) {
        return page.locator('#sidescreen_consDraws_toastrMsg');
      },
      text: {
        el: 'Δυνατές επιλογές: 1-4000',
        en: 'Select from 1 to 4000!',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  // submit area
  submit: {
    get: function (page) {
      return page.locator('.submit-button__printBetslip');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    shouldHaveAttribute: async function (page, attr, expectedValue) {
      await expect(this.get(page)).toHaveAttribute(attr, expectedValue);
    },
    info: {
      get: function (page) {
        return page.locator('.submit-button__info');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      text: {
        get: function (page) {
          return page.locator('strong').last();
        },
        text: {
          el: 'Οι επιλογές σας δεν είναι σωστές!',
          en: 'Wrong Selections!',
        },
        shouldHaveText: async function (page) {
          await expect(this.get(page)).toHaveText(this.text[world.lang]);
        },
      },
    },
    placeBet: {
      get: function (page) {
        return page.locator('#ssbt_place_bet_text');
      },
      text: {
        el: 'ΑΠΟΔΟΧΗ',
        en: 'PLACE BET',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    betslipCost: {
      get: function (page) {
        return page.locator('.submit-button__printBetslip-cost');
      },
      text: {
        el: 'ΚΟΣΤΟΣ ΔΕΛΤΙΟΥ ',
        en: 'BETSLIP COST ',
      },
      shouldHaveText: async function (page, costValue) {
        await expect(this.get(page)).toHaveText(this.text[world.lang] + costValue);
      },
    },
  },
};

module.exports = page;
