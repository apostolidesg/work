// playwright/pageObject/bettie/learn/howTo2Game.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const pages = {
  goBack: {
    // can be found on /bettie/lobbyBettie.js
  },
  tapHereToPlay: {
    get: function (page, game) {
      return page.locator(`.play--${game}`);
    },
    text: {
      el: 'Πατάς εδώ για να παίξεις',
      en: 'Tap here to play',
    },
    shouldHaveText: async function (page, game) {
      await expect(this.get(page, game)).toHaveText(this.text[world.lang]);
    },
    notExists: async function (page, index) {
      await expect(this.get(page, index)).toHaveCount(0);
    },
  },

  terminalInfo: {
    // can be found on /bettie/lobbyBettie.js
  },
  video: {
    get: function (page) {
      return page.locator('.video-container > video').first();
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    videoSrc: {
      0: {
        el: game => `/assets/el/how-to-${game}-1.mp4`,
        en: game => `/assets/en/how-to-${game}-1.mp4`,
      },
      1: {
        el: game => `/assets/el/how-to-${game}-2.mp4`,
        en: game => `/assets/en/how-to-${game}-2.mp4`,
      },
    },
    shouldHaveVideo: async function (page, game, index = 0) {
      await expect(this.get(page, index)).toHaveAttribute('src', new RegExp(this.videoSrc[index][world.lang](game)));
    },
    progressTime: {
      get: function (page) {
        return page.locator('.video-controls__time');
      },
      text: {
        el: '0:00 / 1:02',
        en: '0:00 / 1:02',
      },
      shouldHaveText: async function (page, game) {
        await expect(this.get(page, game)).toHaveText(this.text[world.lang]);
      },
    },
    progressBar: {
      get: function (page) {
        return page.locator('.video-controls__seek');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    rewind: {
      get: function (page) {
        return page.locator('.video-controls__action-btn').nth(0);
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    play: {
      get: function (page) {
        return page.locator('.video-controls__center-btn'); //.contains(.material-icons)
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    forward: {
      get: function (page) {
        return page.locator('.video-controls__action-btn').nth(1);
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
  },
  wrapper: {
    get: function (page, index) {
      // index = 0 | 1
      return page.locator('.video-wrapper__thumb').nth(index);
    },
    isActive: async function (page, game, index) {
      await expect(this.get(page, index)).toHaveClass(new RegExp(`--active-${game}`));
    },
    isDisabled: async function (page, index) {
      await expect(this.get(page, index)).toHaveClass(/--inactive/);
    },
    video: {
      get: function (page, index) {
        return pages.wrapper.get(page, index).locator('video');
      },
      videoSrc: {
        0: {
          el: game => `/assets/el/how-to-${game}-1.mp4`,
          en: game => `/assets/en/how-to-${game}-1.mp4`,
        },
        1: {
          el: game => `/assets/el/how-to-${game}-2.mp4`,
          en: game => `/assets/en/how-to-${game}-2.mp4`,
        },
      },
      shouldHaveVideo: async function (page, game, index) {
        await expect(this.get(page, index)).toHaveAttribute('src', new RegExp(this.videoSrc[index][world.lang](game)));
      },
      label: {
        get: function (page, index) {
          return pages.wrapper.get(page, index).locator('.video-wrapper__thumb-label');
        },
        text: {
          el: 'Παίζει Tώρα',
          en: 'Now Playing',
        },
        shouldHaveText: async function (page, index) {
          await expect(this.get(page, index)).toHaveText(this.text[world.lang]);
        },
        notExists: async function (page, index) {
          await expect(this.get(page, index)).toHaveCount(0);
        },
      },
      icon: {
        get: function (page, index) {
          return pages.wrapper.get(page, index).locator('.video-wrapper__thumb-icon');
        },
        isVisible: async function (page, index) {
          await expect(this.get(page, index)).toBeVisible();
        },
        notExists: async function (page, index) {
          await expect(this.get(page, index)).toHaveCount(0);
        },
      },
      txt: {
        get: function (page, index) {
          return pages.wrapper.get(page, index).locator('.video-wrapper__thumb-text');
        },
        text: {
          0: {
            el: 'Τι Πρέπει Να Ξέρω',
            en: 'What I Need To Know',
          },
          1: {
            el: 'Πως Παίζεται',
            en: 'How To Play',
          },
        },
        shouldHaveText: async function (page, index) {
          await expect(this.get(page, index)).toHaveText(this.text[index][world.lang]);
        },
      },
    },
  },
  toggle: {
    get: function (page) {
      return page.locator('.video-wrapper__toggle');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    isHidden: async function (page) {
      await expect(this.get(page)).toBeHidden();
    },
  },
  banner: {
    get: function (page) {
      return page.locator('img[alt="kino-learn-more"]').first();
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    notExists: async function (page, index) {
      await expect(this.get(page, index)).toHaveCount(0);
    },
    gifSrc: {
      el: game => `/assets/el/banner-${game}.gif`,
      en: game => `/assets/en/banner-${game}.gif`,
    },
    shouldHavegif: async function (page, game) {
      await expect(this.get(page)).toHaveAttribute('src', new RegExp(this.gifSrc[world.lang](game)));
    },
  },
  bannerSeparator: {
    get: function (page) {
      return page.locator('.banners__separator');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    notExists: async function (page, index) {
      await expect(this.get(page, index)).toHaveCount(0);
    },
  },
  linkToPlay: {
    get: function (page) {
      return page.locator('.link-to-play-area');
    },
    notExists: async function (page, index) {
      await expect(this.get(page, index)).toHaveCount(0);
    },
    logo: {
      get: function (page, game) {
        return page.locator(`img[alt="${game}-learn-more"]`).last();
      },
      isVisible: async function (page, game) {
        await expect(this.get(page, game)).toBeVisible();
      },
    },
    textGame: {
      get: function (page) {
        return page.locator('.link-to-play-area__text');
      },
      text: {
        el: 'Ώρα για παιχνίδι!  Πατάς εδώ για να παίξεις!',
        en: 'Time to play!  Tap here to play!',
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
};

module.exports = pages;
