// playwright/pageObject/bettie/learn/howTo1.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const pages = {
  goBack: {
    // can be found on /bettie/lobbyBettie.js
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
        el: 'Μαθαίνω για το ',
        en: 'Learn about ',
      },
      shouldHaveText: async function (page, game) {
        await expect(this.get(page, game)).toHaveText(this.text[world.lang] + game.toUpperCase());
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
      el: '/assets/el/how-to-lobby.mp4',
      en: '/assets/en/how-to-lobby.mp4',
    },
    shouldHaveVideo: async function (page) {
      await expect(this.get(page)).toHaveAttribute('src', new RegExp(this.videoSrc[world.lang]));
    },
  },
};

module.exports = pages;
