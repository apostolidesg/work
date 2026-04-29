// playwright/pageObject/bettie/lobbyBettie.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const pages = {
  goBack: {
    get: function (page) {
      return page.getByTestId('goBack-btn');
    },
    text: {
      el: 'Πίσω',
      en: 'Go Back',
    },
    shouldContainText: async function (page, game) {
      await expect(this.get(page, game)).toContainText(this.text[world.lang]);
    },
    chevron: {
      get: function (page) {
        return page.locator('.fa-chevron-left');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
  },
  learnTheGame: {
    get: function (page) {
      return page.locator('.digital-assistant-layout__left-clickable');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  learnTheGameVertical: {
    get: function (page) {
      return page.locator('.digital-assistant-layout__asset-wrapper-container');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
  },
  gameCard: {
    get: function (page, game) {
      // game = 'kino' | 'powerspin'
      return page.locator(`.game-card--${game}`);
    },
    isVisible: async function (page, game) {
      await expect(this.get(page, game)).toBeVisible();
    },
    img: {
      get: function (page, game) {
        return page.getByTestId(`game-card__logo--${game}`);
      },
      isVisible: async function (page, game) {
        await expect(this.get(page, game)).toBeVisible();
      },
    },
    btn: {
      get: function (page, game) {
        return page.locator(`.button--${game}`);
      },
      text: {
        el: 'Παίζεις εδώ',
        en: 'Play here',
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
    },
  },
  terminalInfo: {
    get: function (page) {
      return page.locator('.terminal-info');
    },
    text: {
      el: /^Version:\s+\d+\.\d+\.\d+-\d+\.\d+\.\d+\s+SSBT\s*ID:\s*101023HPT01$/, //  Version: 10.0.1-5.3.0
      en: /^Version:\s+\d+\.\d+\.\d+-\d+\.\d+\.\d+\s+SSBT\s*ID:\s*101023HPT01$/, //  Version: 10.0.1-5.3.0
    },
    shouldHaveText: async function (page) {
      await expect(this.get(page)).toHaveText(this.text[world.lang]);
    },
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
