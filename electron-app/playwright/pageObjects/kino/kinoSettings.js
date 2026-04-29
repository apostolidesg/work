// playwright/pageObject/kino/kinoSettings.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const page = {
  winningsTable: {
    get: function (page) {
      return page.locator('#winnings_table');
    },
    isVisible: async function (page) {
      await this.get(page).isVisible();
    },
    headers: {
      numbers: {
        get: function (page) {
          return page.locator('#winnings_header_numbers');
        },
        text: {
          el: 'ΑΡΙΘΜΟΙ',
          en: 'NUMBERS',
        },
        shouldHaveText: async function (page) {
          const actualText = await this.get(page).innerText();
          if (actualText !== this.text[world.lang]) {
            throw new Error(`Expected header text '${this.text[world.lang]}', but got '${actualText}'`);
          }
        },
      },
      winnings: {
        get: function (page) {
          return page.locator('#winnings_header_kino');
        },
        text: {
          el: 'ΚΕΡΔΟΣ',
          en: 'WINNINGS',
        },
        shouldHaveText: async function (page) {
          const actualText = await this.get(page).innerText();
          if (actualText !== this.text[world.lang]) {
            throw new Error(`Expected header text '${this.text[world.lang]}', but got '${actualText}'`);
          }
        },
      },
      bonus: {
        get: function (page) {
          return page.locator('#winnings_header_kino_bonus');
        },
        text: {
          el: 'KINO BONUS',
          en: 'KINO BONUS',
        },
        shouldHaveText: async function (page) {
          const actualText = await this.get(page).innerText();
          if (actualText !== this.text[world.lang]) {
            throw new Error(`Expected header text '${this.text[world.lang]}', but got '${actualText}'`);
          }
        },
      },
    },
    row: function (index) {
      return {
        row: {
          get: function (page) {
            return page.locator(`#winnings_row_${index}`);
          },
          shouldHaveClass: async function (page, expectedClass) {
            const actualClass = await this.get(page).getAttribute('class');
            if ((actualClass || '') !== expectedClass) {
              throw new Error(`Row ${index} class expected: '${expectedClass}', got: '${actualClass}'`);
            }
          },
        },
        number: {
          get: function (page) {
            return page.locator(`#winnings_number_${index}`);
          },
          notExists: async function (page) {
            await expect(this.get(page)).toHaveCount(0);
          },
          shouldHaveText: async function (page, expected) {
            const actualText = await this.get(page).innerText();
            if (actualText !== expected) {
              throw new Error(`Row ${index} number expected: '${expected}', got: '${actualText}'`);
            }
          },
        },
        winning: {
          get: function (page) {
            return page.locator(`#winnings_kino_${index}`);
          },
          notExists: async function (page) {
            await expect(this.get(page)).toHaveCount(0);
          },
          shouldHaveText: async function (page, expected) {
            const actualText = await this.get(page).innerText();
            if (actualText !== expected) {
              throw new Error(`Row ${index} winning expected: '${expected}', got: '${actualText}'`);
            }
          },
        },
        bonus: {
          get: function (page) {
            return page.locator(`#winnings_kino_bonus_${index}`);
          },
          notExists: async function (page) {
            await expect(this.get(page)).toHaveCount(0);
          },
          shouldHaveText: async function (page, expected) {
            const actualText = await this.get(page).innerText();
            if (actualText !== expected) {
              throw new Error(`Row ${index} bonus expected: '${expected}', got: '${actualText}'`);
            }
          },
        },
      };
    },
    rowC2W: function (index) {
      return {
        row: {
          get: function (page) {
            return page.locator(`#winnings_row_${index}_c2w`);
          },
          shouldHaveClass: async function (page, expectedClass) {
            const actualClass = await this.get(page).getAttribute('class');
            if ((actualClass || '') !== expectedClass) {
              throw new Error(`C2W Row ${index} class expected: '${expectedClass}', got: '${actualClass}'`);
            }
          },
        },
        number: {
          get: function (page) {
            return page.locator(`#winnings_number_${index}_c2w`);
          },
          notExists: async function (page) {
            await expect(this.get(page)).toHaveCount(0);
          },
          shouldHaveText: async function (page, expected) {
            const actualText = await this.get(page).innerText();
            if (actualText !== expected) {
              throw new Error(`C2W Row ${index} number expected: '${expected}', got: '${actualText}'`);
            }
          },
        },
        winning: {
          get: function (page) {
            return page.locator(`#winnings_kino_${index}_c2w`);
          },
          notExists: async function (page) {
            await expect(this.get(page)).toHaveCount(0);
          },
          shouldHaveText: async function (page, expected) {
            const actualText = await this.get(page).innerText();
            if (actualText !== expected) {
              throw new Error(`C2W Row ${index} winning expected: '${expected}', got: '${actualText}'`);
            }
          },
        },
        bonus: {
          get: function (page) {
            return page.locator(`#winnings_kino_bonus_${index}_c2w`);
          },
          notExists: async function (page) {
            await expect(this.get(page)).toHaveCount(0);
          },
          shouldHaveText: async function (page, expected) {
            const actualText = await this.get(page).innerText();
            if (actualText !== expected) {
              throw new Error(`C2W Row ${index} bonus expected: '${expected}', got: '${actualText}'`);
            }
          },
        },
      };
    },
  },
  quickPickBtn: {
    get: function (page) {
      return page.locator('#quick_pick_header');
    },
    text: {
      el: 'ΤΥΧΑΙΑ ΕΠΙΛΟΓΗ',
      en: 'QUICK PICK',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    img: {
      get: function (page) {
        return page.locator('#shuffle_button_img');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    down: {
      get: function (page) {
        return page.locator('#quick_pick_down');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    up: {
      get: function (page) {
        return page.locator('#quick_pick_up');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    input: {
      get: function (page) {
        return page.locator('#quick_pick_input');
      },
      shouldBeEmpty: async function (page) {
        await expect(this.get(page)).toHaveValue('');
      },
      shouldHaveText: async function (page, value) {
        await expect(this.get(page, value)).toHaveText(value.toString());
      },
    },
    table: {
      get: function (page) {
        return page.locator('#__BV_popover_4__');
      },
      shouldBeHidden: async function (page) {
        await expect(this.get(page)).toBeHidden();
      },
    },
  },
  quickPickNumberBtn: {
    get: function (page, value) {
      return page.locator(`#game_type_${value}_label`);
    },
    isSelected: async function (page, value) {
      await expect(this.input.get(page, value)).toBeChecked();
    },
    isFalse: async function (page, value) {
      await expect(this.get(page, value)).not.toBeChecked();
    },
    isTrue: async function (page, value) {
      await expect(this.get(page, value)).toBeChecked();
    },
    input: {
      get: function (page, value) {
        return page.locator(`#game_type_${value}`);
      },
    },
    isVisible: async function (page, value) {
      await expect(this.get(page, value)).toBeVisible();
    },
    shouldHaveText: async function (page, value) {
      await expect(this.get(page, value)).toHaveText(value.toString());
    },
    isFalse: async function (page, value) {
      await expect(this.input.get(page, value)).toHaveValue('false');
    },
  },
  betMultiplier: {
    expected: {
      '0.5€': { index: '0_5', text: '0.5€' },
      '1€': { index: '1', text: '1€' },
      '1.5€': { index: '1_5', text: '1.5€' },
      '2€': { index: '2', text: '2€' },
      '2.5€': { index: '2_5', text: '2.5€' },
      '3€': { index: '3', text: '3€' },
      '4€': { index: '4', text: '4€' },
      '5€': { index: '5', text: '5€' },
      '10€': { index: '10', text: '10€' },
      '20€': { index: '20', text: '20€' },
    },
    label: {
      get: function (page) {
        return page.locator('.betting-amount__title');
      },
      text: {
        el: 'ΠΟΣΟ (€)',
        en: 'BET AMOUNT (€)',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    get: function (page, label) {
      const index = this.expected[label].index;
      return page.locator(`.square-button__text-${index}`);
    },
    shouldHaveText: async function (page, label) {
      await expect(this.get(page, label)).toHaveText(this.expected[label].text);
    },
    isChecked: async function (page, label) {
      await expect(this.get(page, label)).toHaveClass(/--checked/);
    },
    isDisabled: async function (page, label) {
      await expect(this.get(page, label)).toHaveClass(/--disabled/);
    },
    isEnabled: async function (page, label) {
      await expect(this.get(page, label)).not.toHaveClass(/--disabled/);
    },
  },
  kinoBonus: {
    icon: {
      get: function (page) {
        return page.locator('#settings-kino-bonus-img');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    checkbox: {
      get: function (page) {
        return page.locator('#kino_bonus_check');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      isFalse: async function (page) {
        await expect(this.get(page)).not.toBeChecked();
      },
      isTrue: async function (page) {
        await expect(this.get(page)).toBeChecked();
      },
    },
  },
  close2Win: {
    get: function (page) {
      return page.locator('.game-option-toggle').nth(1);
    },
    text: {
      el: 'ΑΠΟ 2-9 ΑΡΙΘΜΟΥΣ ΝEO',
      en: 'FROM 1-9 NUMBERS NEW',
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
    new: {
      get: function (page) {
        return page.locator('.game-option-toggle__tag');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    icon: {
      get: function (page) {
        return page.locator('#settings-close-2-win-img');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    checkbox: {
      get: function (page) {
        return page.locator('#kino_c2w_check');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      isFalse: async function (page) {
        await expect(this.get(page)).not.toBeChecked();
      },
      isTrue: async function (page) {
        await expect(this.get(page)).toBeChecked();
      },
    },
  },
  clearArea: {
    get: function (page) {
      return page.locator('#settings-clear-btn');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    label: {
      get: function (page) {
        return page.locator('.base-clear-button__bottom-label--white');
      },
      text: {
        el: 'ΚΑΘΑΡΙΣΜΟΣ',
        en: 'CLEAR',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
};

module.exports = page;
