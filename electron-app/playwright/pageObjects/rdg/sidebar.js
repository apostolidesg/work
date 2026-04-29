// playwright/pageObjects/rdg/sidebar.js
import { expect } from '@playwright/test';
import world from '#/pageObjects/lib/world';

const page = {
  toggle: {
    get: function (page) {
      return page.locator('.sidebar__toggle');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    shouldBeOpen: async function (page) {
      await expect(this.get(page)).toHaveAttribute('aria-pressed', 'true');
    },
    shouldBeClosed: async function (page) {
      await expect(this.get(page)).toHaveAttribute('aria-pressed', 'false');
    },
    icon: {
      get: function (page) {
        return page.locator('.sidebar__toggle .sidebar__icon-img');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      open: {
        get: function (page) {
          return page.locator('.sidebar__toggle[aria-pressed="true"] .sidebar__icon-img');
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
        notExists: async function (page, game) {
          await expect(this.get(page, game)).toHaveCount(0);
        },
      },
      close: {
        get: function (page) {
          return page.locator('.sidebar__toggle[aria-pressed="false"] .sidebar__icon-img');
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
        notExists: async function (page, game) {
          await expect(this.get(page, game)).toHaveCount(0);
        },
      },
    },
  },
  brand: {
    get: function (page) {
      return page.locator('.sidebar__brand');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    icon: {
      get: function (page) {
        return page.locator('.sidebar__brand-icon');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    text: {
      get: function (page) {
        return page.locator('.sidebar__brand-text');
      },
      shouldBeOpen: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      shouldBeClosed: async function (page) {
        await expect(this.get(page)).toBeHidden();
      },
    },
  },
  home: {
    get: function (page) {
      return page.locator('#nav-home');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    icon: {
      get: function (page) {
        return page.locator('#nav-home .nav-item__icon');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    text: {
      get: function (page) {
        return page.locator('#nav-home .nav-item__label');
      },
      text: {
        el: 'Αρχική',
        en: 'Home',
      },
      shouldBeClosed: async function (page) {
        await expect(this.get(page)).toBeHidden();
      },
      shouldBeOpen: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  games: {
    get: function (page) {
      return page.locator('#nav-games');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    icon: {
      get: function (page) {
        return page.locator('#nav-games .nav-item__icon');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    text: {
      get: function (page) {
        return page.locator('#nav-games .nav-item__label');
      },
      text: {
        el: 'Παιχνίδια',
        en: 'Games',
      },
      shouldBeClosed: async function (page) {
        await expect(this.get(page)).toBeHidden();
      },
      shouldBeOpen: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  help: {
    get: function (page) {
      return page.locator('#nav-help');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    icon: {
      get: function (page) {
        return page.locator('#nav-help .nav-item__icon');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    text: {
      get: function (page) {
        return page.locator('#nav-help .nav-item__label');
      },
      text: {
        el: 'Βοήθεια',
        en: 'Help',
      },
      shouldBeClosed: async function (page) {
        await expect(this.get(page)).toBeHidden();
      },
      shouldBeOpen: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
  },
  language: {
    get: function (page) {
      return page.locator('#nav-language');
    },
    isVisible: async function (page) {
      await expect(this.get(page)).toBeVisible();
    },
    icon: {
      get: function (page) {
        return page.locator('#nav-language .nav-item__icon');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
    },
    text: {
      get: function (page) {
        return page.locator('#nav-language .nav-item__label');
      },
      text: {
        el: 'Ελληνικά',
        en: 'English',
      },
      shouldBeClosed: async function (page) {
        await expect(this.get(page)).toBeHidden();
      },
      shouldBeOpen: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      shouldHaveText: async function (page) {
        await expect(this.get(page)).toHaveText(this.text[world.lang]);
      },
    },
    languageMenu: {
      get: function (page) {
        return page.locator('[role="dialog"]');
      },
      isVisible: async function (page) {
        await expect(this.get(page)).toBeVisible();
      },
      switchLanguage: async function (page, language) {
        if (language === 'el') {
          await this.greek.get(page).click();
        } else if (language === 'en') {
          await this.english.get(page).click();
        } else {
          throw new Error('Invalid language specified. Use "el" or "en".');
        }
      },
      greek: {
        get: function (page) {
          return page.locator('#lang-el');
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
        shouldBeSelected: async function (page) {
          await expect(this.get(page)).toHaveClass(/language-menu__item--selected/);
        },
        shouldNotBeSelected: async function (page) {
          await expect(this.get(page)).not.toHaveClass(/language-menu__item--selected/);
        },
        icon: {
          get: function (page) {
            return page.locator('#lang-el .language-menu__item--image');
          },
          isVisible: async function (page) {
            await expect(this.get(page)).toBeVisible();
          },
        },
        text: {
          get: function (page) {
            return page.locator('#lang-el');
          },
          text: {
            el: 'Ελληνικά',
            en: 'Ελληνικά',
          },
          shouldHaveText: async function (page) {
            await expect(this.get(page)).toHaveText(this.text[world.lang]);
          },
        },
      },
      english: {
        get: function (page) {
          return page.locator('#lang-en');
        },
        isVisible: async function (page) {
          await expect(this.get(page)).toBeVisible();
        },
        shouldBeSelected: async function (page) {
          await expect(this.get(page)).toHaveClass(/language-menu__item--selected/);
        },
        shouldNotBeSelected: async function (page) {
          await expect(this.get(page)).not.toHaveClass(/language-menu__item--selected/);
        },
        icon: {
          get: function (page) {
            return page.locator('#lang-en .language-menu__item--image');
          },
          isVisible: async function (page) {
            await expect(this.get(page)).toBeVisible();
          },
        },
        text: {
          get: function (page) {
            return page.locator('#lang-en');
          },
          text: {
            el: 'English',
            en: 'English',
          },
          shouldHaveText: async function (page) {
            await expect(this.get(page)).toHaveText(this.text[world.lang]);
          },
        },
      },
    },
  },
};

module.exports = page;
