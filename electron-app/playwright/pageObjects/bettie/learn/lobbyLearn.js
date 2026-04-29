// playwright/pageObject/bettie/learn/lobbyLearn.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const pages = {
  card: {
    get: function (page, type) {
      // type = 'FAQ' | 'HowTo'
      return page.getByTestId(`${type}-item`);
    },
    textContent: {
      get: function (page, type) {
        return pages.card.get(page, type).locator('.how-to-page-faqs__text');
      },
      text: {
        faq: {
          el: 'Εδώ ρωτάς και σου απαντάω',
          en: 'Ask your questions and I’ll give you my answer',
        },
        howto: {
          el: 'Σύντομα videos',
          en: 'Short videos',
        },
      },
      shouldHaveText: async function (page, type) {
        await expect(this.get(page, type)).toHaveText(this.text[type][world.lang]);
      },
    },
    img: {
      get: function (page, type) {
        // type = 'FAQ' | 'HowTo'
        return pages.card.get(page, type).getByTestId(`${type}-image`);
      },
      isVisible: async function (page, type) {
        await expect(this.get(page, type)).toBeVisible();
      },
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
      el: '/assets/el/digital-assistant.mp4',
      en: '/assets/en/digital-assistant.mp4',
    },
    shouldHaveVideo: async function (page) {
      await expect(this.get(page)).toHaveAttribute('src', new RegExp(this.videoSrc[world.lang]));
    },
  },
};

module.exports = pages;
