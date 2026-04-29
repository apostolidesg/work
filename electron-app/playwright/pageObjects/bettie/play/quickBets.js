// playwright/pageObject/bettie/play/quickBets.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const pages = {
  goBack: {
    // can be found on /bettie/lobbyBettie.js
  },
  cardKino: {
    get: function (page, index) {
      return page.getByTestId(`kino-card-${index}`);
    },
    title: {
      get: function (page, index) {
        return pages.cardKino.get(page, index).locator('.kino-quickbets-cards__card-title');
      },
      text: {
        el: `Στήλη `, // (index + 1)
        en: `Column `, // (index + 1)
      },
      shouldHaveText: async function (page, index) {
        await expect(this.get(page, index)).toHaveText(this.text[world.lang] + (index + 1));
      },
    },
    selection: {
      get: function (page, index) {
        return pages.cardKino.get(page, index).locator('.kino-quickbets-cards__card-price-number');
      },
      shouldHaveCount: async function (page, index, expectedCount) {
        await expect(this.get(page, index)).toHaveCount(expectedCount);
      },
    },
    bonusKino: {
      get: function (page, index) {
        return pages.cardKino.get(page, index).locator('img[alt="bonus"]');
      },
      isVisible: async function (page, index) {
        await expect(pages.cardKino.bonusKino.get(page, index)).toBeVisible();
      },
    },
    price: {
      get: function (page, index) {
        return pages.cardKino.get(page, index).locator('.kino-quickbets-cards-button');
      },
      text: {
        el: '',
        en: '',
      },
      shouldHaveText: async function (page, index, costValue) {
        await expect(this.get(page, index)).toHaveText(this.text[world.lang] + costValue);
      },
    },
  },
  cardPowerSpin: {
    get: function (page) {
      return page.getByTestId(`powerspin-card-0`);
    },
    title: {
      get: function (page) {
        return pages.cardPowerSpin.get(page).locator('.powerspin-quickbets-cards__card-title');
      },
      text: {
        num: {
          el: draws => (draws === 1 ? '1 τυχαίος αριθμός' : `1 τυχαίος αριθμός για ${draws} συνεχόμενες κληρώσεις`),
          en: draws => (draws === 1 ? '1 random number' : `1 random number for ${draws} consecutive draws`),
        },
        symbol: {
          el: draws => (draws === 1 ? 'Σύμβολο' : `Σύμβολο για ${draws} συνεχόμενες κληρώσεις`),
          en: draws => (draws === 1 ? 'Symbol' : `Symbol for ${draws} consecutive draws`),
        },
        color: {
          el: draws => (draws === 1 ? 'Τυχαίο Χρώμα' : `Τυχαίο Χρώμα για ${draws} συνεχόμενες κληρώσεις`),
          en: draws => (draws === 1 ? 'Random Color' : `Random Color for ${draws} consecutive draws`),
        },
      },
      shouldHaveText: async function (page, type, draws = 2) {
        // type = 'num' | 'symbol' | 'color'
        await expect(this.get(page)).toHaveText(this.text[type][world.lang](draws));
      },
    },
    selection: {
      get: function (page) {
        return page.locator('.powerspin-quickbets-cards__card-price');
      },
      number: {
        get: function (page) {
          return page.locator('.powerspin-quickbets-cards__card-price-number');
        },
        shouldHaveCount: async function (page, expectedCount = 1) {
          await expect(this.get(page)).toHaveCount(expectedCount);
        },
      },
      symbol: {
        get: function (page) {
          return page.locator('img[alt="powerspin symbol"]');
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
      },
      color: {
        get: function (page) {
          return page.locator('.powerspin-quickbets-cards__color');
        },
        text: {
          en: ['RED', 'BLUE', 'GREEN'],
          el: ['ΚΟΚΚΙΝΗ', 'ΜΠΛΕ', 'ΠΡΑΣΙΝΗ'],
        },
        shouldHaveColor: async function (page) {
          expect(this.text[world.lang]).toContain(await this.get(page).innerText());
        },
        validRGB: [
          'rgb(226, 9, 28)', // red #e2091c
          'rgb(1, 80, 159)', // blue #01509f
          'rgb(0, 150, 65)', // green #009641
        ],
        shouldHaveRBG: async function (page) {
          expect(this.validRGB).toContain(
            await this.get(page).evaluate(node => getComputedStyle(node).backgroundColor),
          );
        },
      },
    },
    quickPick: {
      get: function (page) {
        return page.locator('img[alt="Quick Pick"]');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      notExists: async function (page) {
        await expect(this.get(page)).toHaveCount(0);
      },
    },
    price: {
      get: function (page, index) {
        return pages.cardPowerSpin.get(page, index).locator('.powerspin-quickbets-cards-button');
      },
      text: {
        num: {
          el: '€1.00 - Απόδοση x24',
          en: '€1.00 - Odd x24',
        },
        symbol: {
          el: '€1.00 - Απόδοση x8',
          en: '€1.00 - Odd x8',
        },
        color: {
          el: '€2.50 - Απόδοση x3',
          en: '€2.50 - Odd x3',
        },
      },
      shouldHaveText: async function (page, type) {
        // type = 'num' | 'symbol' | 'color'
        await expect(this.get(page)).toHaveText(this.text[type][world.lang]);
      },
    },
  },
  consecutiveDraws: {
    get: function (page) {
      return page.locator('.quickbets__footer');
    },
    title: {
      get: function (page) {
        return page.locator('.quickbets__footer-header');
      },
      text: {
        el: 'Συνεχόμενες κληρώσεις',
        en: 'Consecutive draws',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    container: {
      get: function (page) {
        return page.locator('.quickbets__footer-number-container');
      },
      text: {
        el: '12345 ',
        en: '12345 ',
      },
      shouldHaveText: async function (page, drawValue = 1) {
        await expect(this.get(page, drawValue)).toHaveText(this.text[world.lang] + drawValue);
      },
      number: {
        get: function (page, index) {
          return page.locator('.quickbets__footer-number').nth(index);
        },
        isActive: async function (page, label) {
          await expect(this.get(page, label)).toHaveClass(/--active/);
        },
        isNotActive: async function (page, label) {
          await expect(this.get(page, label)).not.toHaveClass(/--active/);
        },
        onlyOneActive: async function (page, activeIndex) {
          for (let i = 0; i < 4; i++) {
            if (i === activeIndex) {
              await this.isActive(page, i);
            } else {
              await this.isNotActive(page, i);
            }
          }
        },
      },
      selector: {
        get: function (page) {
          return page.locator('.quickbets_draw-selector');
        },
        text: {
          el: ``,
          en: ``,
        },
        shouldHaveText: async function (page, value) {
          await expect(this.get(page, value)).toHaveText(this.text[world.lang] + value);
        },
        chevron: {
          get: function (page) {
            return page.locator('.fa-chevron-down');
          },
          isVisible: async function (page) {
            await expect(this.get(page)).toBeVisible();
          },
        },
        draws: {
          get: function (page) {
            return page.locator('.quickbets_draw-selector__draws');
          },
          text: {
            el: '1 2 3 4 5 6 7 8 10 20 50 100 200 400',
            en: '1 2 3 4 5 6 7 8 10 20 50 100 200 400',
          },
          shouldHaveText: async function (page) {
            await expect(this.get(page)).toHaveText(this.text[world.lang]);
          },
          number: {
            get: function (page, index) {
              return page.locator('.quickbets_draw-selector__draws-numbers').nth(index);
            },
            isActive: async function (page, label) {
              await expect(this.get(page, label)).toHaveClass(/--active/);
            },
            isNotActive: async function (page, label) {
              await expect(this.get(page, label)).not.toHaveClass(/--active/);
            },
            onlyOneActive: async function (page, activeIndex) {
              for (let i = 0; i < 13; i++) {
                if (i === activeIndex) {
                  await this.isActive(page, i);
                } else {
                  await this.isNotActive(page, i);
                }
              }
            },
          },
        },
      },
    },
    button: {
      get: function (page) {
        return page.locator('.quick-play-submit-wager__button');
      },
      text: {
        el: ` Πληρωμή`,
        en: ` Payment `,
      },
      shouldHaveText: async function (page, cost) {
        await expect(this.get(page, cost)).toHaveText(cost + this.text[world.lang]);
      },
      shouldContain: async function (page) {
        await expect(this.get(page)).toContainText(this.text[world.lang]);
      },
      info: {
        get: function (page) {
          return page.locator('svg[data-icon="info-circle"]');
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
        notExists: async function (page) {
          await expect(this.get(page)).toHaveCount(0);
        },
        text: {
          get: function (page) {
            return page.locator('.tooltip-inner');
          },
          text: {
            el: `Ανεπαρκές υπόλοιπο!`,
            en: `Insufficient Balance!`,
          },
          shouldHaveText: async function (page) {
            await expect(this.get(page)).toHaveText(this.text[world.lang]);
          },
        },
      },
    },
  },
  terminalInfo: {
    // can be found on /bettie/lobbyBettie.js
  },
};

module.exports = pages;
