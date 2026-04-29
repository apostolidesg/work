// playwright/pageObject/bettie/play/playGame.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const pages = {
  infoTitle: {
    get: function (page) {
      return page.locator('.quick-play__title');
    },
    text: {
      el: 'Έτοιμα δελτία',
      en: 'Quick picks',
    },
    shouldHaveText: async function (page, game) {
      await expect(this.get(page, game)).toHaveText(this.text[world.lang]);
    },
    img: {
      get: function (page) {
        return page.locator('svg[data-icon="info-circle"]');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    txt: {
      get: function (page) {
        return page.locator('#info-modal-container');
      },
      text: {
        kino: {
          el: 'Έτοιμα δελτία Tα έτοιμα δελτία είναι προ-συμπληρωμένα με αριθμούς τυχαίας επιλογής. Απλά πληρώνεις και συμμετέχεις στο παιχνίδι, χωρίς να χρειάζεται να συμπληρώσεις δικό σου δελτίο. Εντάξει',
          en: 'Quick picks The pre-filled slips are slips with randomly selected numbers. You just pay and join the game, without having to fill in your own slip. OK',
        },
        powerspin: {
          el: 'Έτοιμα δελτία Tα έτοιμα δελτία είναι προ-συμπληρωμένα με αριθμούς/ζώνη τυχαίας επιλογής. Απλά πληρώνεις και συμμετέχεις στο παιχνίδι, χωρίς να χρειάζεται να συμπληρώσεις δικό σου δελτίο. Εντάξει',
          en: 'Quick picks The pre-filled slips are slips with randomly selected numbers/zone. You just pay and join the game, without having to fill in your own slip. OK',
        },
      },
      shouldHaveText: async function (page, game) {
        await expect(this.get(page)).toHaveText(this.text[game][world.lang]);
      },
    },
    close: {
      get: function (page) {
        return page.locator('#close-info-modal');
      },
    },
    OK: {
      get: function (page) {
        return page.locator('#info-modal-ok');
      },
      text: {
        el: 'Εντάξει',
        en: 'OK',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  selectNumber: {
    get: function (page) {
      return page.locator('.kino-quickbets-number-selection');
    },
    shuffle: {
      get: function (page) {
        return page.locator('#shuffle_button_img');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    number: {
      get: function (page) {
        return page.locator('.kino-quickbets-number-selection__selected-numbers');
      },
      text: {
        el: '',
        en: '',
      },
      shouldHaveText: async function (page, number) {
        await expect(this.get(page)).toHaveText(this.text[world.lang] + number);
      },
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
        return page.locator('.kino-quickbets-number-selection__draws');
      },
      notExists: async function (page) {
        await expect(this.get(page)).toHaveCount(0);
      },
      text: {
        el: '1 2 3 4 5 6 7 8 9 10 11 12',
        en: '1 2 3 4 5 6 7 8 9 10 11 12',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
      numbers: {
        get: function (page, index) {
          return page.locator('.kino-quickbets-number-selection__draws-numbers').nth(index);
        },
        isActive: async function (page, label) {
          await expect(this.get(page, label)).toHaveClass(/--active/);
        },
        isNotActive: async function (page, label) {
          await expect(this.get(page, label)).not.toHaveClass(/--active/);
        },
        onlyOneActive: async function (page, activeIndex) {
          for (let i = 0; i < 11; i++) {
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
  quickPlay: {
    get: function (page, game, index) {
      // game = 'kino' | 'powerspin'
      // index = 0 | 1 | 2 cards
      return page.locator(`.quick-play-card--${game}`).nth(index);
    },
    title: {
      get: function (page, game, index) {
        return pages.quickPlay.get(page, game, index).locator('.quick-play-card__title-container');
      },
      text: {
        kino: {
          el: (column, number) => `${column} στήλες με ${number} αριθμ${number === 1 ? 'ό' : 'ούς'}`, // αριθμό or αριθμούς
          en: (column, number) => `${column} columns with ${number} number${number === 1 ? '' : 's'}`, //number or numbers
        },
        powerspin: {
          num: {
            el: '1 τυχαίος αριθμός',
            en: '1 random number',
          },
          symbol: {
            el: 'Σύμβολο για 2 συνεχόμενες κληρώσεις',
            en: 'Symbol for 2 consecutive draws',
          },
          color: {
            el: 'Τυχαίο Χρώμα για 2 συνεχόμενες κληρώσεις',
            en: 'Random Color for 2 consecutive draws',
          },
        },
      },
      shouldHaveText: async function (page, game, index, column, type) {
        // Kino usage:  shouldHaveText(page, 'kino', index, column)
        // Powerspin:   shouldHaveText(page, 'powerspin', index, undefined, 'num'|'symbol'|'color')
        if (game === 'kino') {
          const number = Number(
            ((await page.locator('.kino-quickbets-number-selection__selected-numbers').textContent()) ?? '').trim(),
          );
          await expect(pages.quickPlay.title.get(page, game, index)).toHaveText(
            pages.quickPlay.title.text.kino[world.lang](column, number),
          );
          return;
        }
        if (game === 'powerspin') {
          const variant = pages.quickPlay.title.text.powerspin[type];
          await expect(pages.quickPlay.title.get(page, game, index)).toHaveText(variant[world.lang]);
          return;
        }
      },
      bonusKino: {
        get: function (page, game, index) {
          return pages.quickPlay.title.get(page, game, index).locator('img[alt="bonus"]');
        },
        isVisible: async function (page, game, index) {
          await expect(pages.quickPlay.title.bonusKino.get(page, game, index)).toBeVisible();
        },
      },
    },
    price: {
      get: function (page, game, index) {
        return pages.quickPlay.get(page, game, index).locator('.quick-play-card__price');
      },
      text: {
        el: '', // reflection costValue + ' ' + costValue
        en: '', // reflection costValue + ' ' + costValue
      },
      shouldHaveText: async function (page, game, index, costValue) {
        await expect(this.get(page, game, index)).toHaveText(this.text[world.lang] + costValue + ' ' + costValue);
      },
    },
    button: {
      get: function (page, game, index) {
        return pages.quickPlay.get(page, game, index).locator('.quick-play-card__button');
      },
      text: {
        el: 'Παίζεις άμεσα',
        en: 'Play instantly',
      },
      shouldHaveText: async function (page, game, index) {
        await expect(pages.quickPlay.button.get(page, game, index)).toHaveText(pages.quickPlay.button.text[world.lang]);
      },
      notExists: async function (page) {
        await expect(this.get(page)).toHaveCount(0);
      },
      chevron: {
        get: function (page, game, index) {
          return pages.quickPlay.button.get(page, game, index).locator('.fa-chevron-right');
        },
        isVisible: async function (page, game, index) {
          await expect(pages.quickPlay.button.chevron.get(page, game, index)).toBeVisible();
        },
        notExists: async function (page) {
          await expect(this.get(page)).toHaveCount(0);
        },
      },
    },
  },
  customContainer: {
    get: function (page, game) {
      return page.locator(`.quick-play__button--${game}`);
    },
    text: {
      el: 'Ή παίζεις με δικούς σου αριθμούς',
      en: 'Or play with your own numbers',
    },
    shouldHaveText: async function (page, game) {
      await expect(this.get(page, game)).toHaveText(this.text[world.lang]);
    },
    shouldHaveBackground: async function (page, game) {
      if (game === 'kino') {
        const bgImage = await this.get(page, game).evaluate(n => getComputedStyle(n).backgroundImage);
        expect(bgImage).toContain('rgb(255, 173, 27)');
      } else if (game === 'powerspin') {
        await expect(this.get(page, game)).toHaveCSS('background-color', 'rgb(119, 0, 238)');
      }
    },
    notExists: async function (page) {
      await expect(this.get(page)).toHaveCount(0);
    },
  },
  terminalInfo: {
    // can be found on /bettie/lobbyBettie.js
  },
  lobbyVideo: {
    get: function (page) {
      return page.locator('.video-container > video');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    videoSrc: {
      el: '/assets/el/lobby.mp4',
      en: '/assets/en/lobby.mp4',
    },
    shouldHaveVideo: async function (page) {
      await expect(this.get(page)).toHaveAttribute('src', new RegExp(this.videoSrc[world.lang]));
    },
  },
};

module.exports = pages;
