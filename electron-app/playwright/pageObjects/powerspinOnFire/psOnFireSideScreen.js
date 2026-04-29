// playwright/pageObject/powerspinOnFire/psOnFireSideScree.js
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
      get: function (page, area) {
        // area = 0, 1, 2, 3
        return page.locator(`#fireblaze-selections-${area}`);
      },
      isVisible: async function (page, area) {
        await expect(this.get(page, area)).toBeVisible();
      },
      isHidden: async function (page, area) {
        await expect(this.get(page, area)).toBeHidden();
      },
      cost: {
        get: function (page, area) {
          return page.locator(`#fireblaze-selections-${area} > div > div.fireblaze-selections__header > div > span`);
        },
        shouldHaveText: async function (page, area, costValue) {
          await expect(this.get(page, area)).toHaveText(costValue);
        },
      },
      options: {
        get: function (page, value) {
          // value = [0, 1, 2, 3]
          return page.locator(`#fireblaze-selections-${value} .fireblaze-selections__header-system`);
        },
        isVisible: async function (page, value) {
          await expect(this.get(page, value)).toBeVisible();
        },
        text: {
          0: {
            el: 'Αριθμός',
            en: 'Number',
          },
          1: {
            el: '2άδα',
            en: 'Double',
          },
          2: {
            el: '4άδα',
            en: 'Quadruple',
          },
          3: {
            el: '8άδα',
            en: 'Octuple',
          },
        },
        shouldHaveText: async function (page, value) {
          const expectedText = this.text[value][world.lang];
          await expect(this.get(page, value)).toHaveText(expectedText);
        },
      },
      clear: {
        get: function (page, area) {
          return page.locator(`#fireblaze-selections-delete-${area}`);
        },
        isVisible: async function (page, area) {
          await expect(this.get(page, area)).toBeVisible();
        },
        txt: {
          get: function (page) {
            return page.locator('#info-modal-container');
          },
          text: {
            el: 'ΚΑΘΑΡΙΣΜΟΣ ΠΕΡΙΟΧΗΣ Όλες οι επιλογές αυτής της περιοχής θα διαγραφούν. Είστε σίγουρος/η ότι θέλετε να συνεχίσετε; Όχι Ναι',
            en: 'CLEAR AREA All selections of this area will be lost. Are you sure you want to proceed? No Yes',
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
      },
    },
    addBetslip: {
      get: function (page) {
        return page.locator('#fireblaze_preview_add_new_game');
      },
      isHidden: async function (page) {
        await expect(this.get(page)).toBeHidden();
      },
      isVisible: async function (page, area) {
        await expect(this.get(page, area)).toBeVisible();
      },
      text: {
        el: 'ΠΡΟΣΘΗΚΗ ΝΕΑΣ ΣΤΗΛΗΣ',
        en: 'ADD NEW BOARD',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  clearModal: {
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
        el: 'Δυνατές επιλογές: 1-400',
        en: 'Select from 1 to 400!',
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
