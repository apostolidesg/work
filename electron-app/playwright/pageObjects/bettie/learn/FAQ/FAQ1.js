// playwright/pageObject/bettie/learn/FAQ/FAQ1.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const pages = {
  goBack: {
    // can be found on /bettie/lobbyBettie.js
  },
  faqSection: {
    get: function (page) {
      return page.locator('.main-faq__sections');
    },
    img: {
      // game = 'kino' | 'powerspin' | 'help'
      get: function (page, game) {
        return page.getByTestId(`faq-image-${game}`);
      },
      isVisible: async function (page, game) {
        await expect(this.get(page, game)).toBeVisible();
      },
      notExists: async function (page, game) {
        await expect(this.get(page, game)).toHaveCount(0);
      },
    },
    txt: {
      get: function (page, game) {
        return page.getByTestId(`faq-text-${game}`);
      },
      text: {
        kino: {
          el: 'Θέλω να ρωτήσω για το KINO',
          en: 'I want to ask about KINO',
        },
        powerspin: {
          el: 'Θέλω να ρωτήσω για το POWERSPIN',
          en: 'I want to ask about POWERSPIN',
        },
        help: {
          el: 'Θέλω να ρωτήσω κάτι άλλο',
          en: 'I want to ask something else',
        },
      },
      shouldHaveText: async function (page, game) {
        await expect(this.get(page, game)).toHaveText(this.text[game][world.lang]);
      },
    },
  },
  terminalInfo: {
    // can be found on /bettie/lobbyBettie.js
  },
  video: {
    get: function (page) {
      return page.locator('.video-container > video');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    videoSrc: {
      el: '/assets/el/faq-lobby.mp4',
      en: '/assets/en/faq-lobby.mp4',
    },
    shouldHaveVideo: async function (page) {
      await expect(this.get(page)).toHaveAttribute('src', new RegExp(this.videoSrc[world.lang]));
    },
  },
};

module.exports = pages;
