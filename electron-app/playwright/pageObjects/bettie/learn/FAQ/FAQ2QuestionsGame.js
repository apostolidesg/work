// playwright/pageObject/bettie/learn/FAQ/FAQ2QuestionsGame.js
const { expect } = require('@playwright/test');
const world = require('#/pageObjects/lib/world');

const pages = {
  goBack: {
    // can be found on /bettie/lobbyBettie.js
  },
  question: {
    get: function (page, index) {
      return page.locator('.content-box__title').nth(index);
    },
    text: {
      kino: {
        el: [
          'Πώς Παίζεται;',
          'Γιατί να παίξω;',
          'Πόσους αριθμούς να διαλέξω;',
          'Το κόστος συμμετοχής εξαρτάται από τους αριθμούς που θα παίξω;',
          'Πώς πληρώνω;',
        ],
        en: [
          'How do I play?',
          'Why should I play?',
          'How many numbers should I select?',
          'Participation cost depends on the numbers I select?',
          'How do I pay?',
        ],
      },
      powerspin: {
        el: [
          'Πώς Παίζεται;',
          'Γιατί να παίξω;',
          'Εαν επιλέξω να παίξω με αριθμούς, πόσους αριθμούς να διαλέξω;',
          'Ποιο είναι το κόστος συμμετοχής;',
          'Πώς πληρώνω;',
        ],
        en: [
          'How do I play?',
          'Why should I play?',
          'How many numbers should I select?',
          'What is the participation cost?',
          'How do I pay?',
        ],
      },
      help: {
        el: [' Έχει η Bettie Instagram/Facebook;', 'Δεν ξέρω ποιο παιχνίδι να παίξω! Ποιο προτείνεις;'],
        en: ['Does Bettie have an Instagram/Facebook?', 'I don’t know which game to play! Any recommendations?'],
      },
    },
    shouldHaveCount: async function (page, game) {
      await expect(page.locator('.content-box__title')).toHaveCount(this.text[game][world.lang].length);
    },
    shouldHaveTextAt: async function (page, game, index) {
      await expect(this.get(page, index)).toHaveText(this.text[game][world.lang][index]);
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
      kino: {
        el: '/assets/el/faq-kino-questions.mp4',
        en: '/assets/en/faq-kino-questions.mp4',
      },
      powerspin: {
        el: '/assets/el/faq-powerspin-questions.mp4',
        en: '/assets/en/faq-powerspin-questions.mp4',
      },
      help: {
        el: '/assets/el/faq-other-questions.mp4',
        en: '/assets/en/faq-other-questions.mp4',
      },
    },
    shouldHaveVideo: async function (page, game) {
      await expect(this.get(page, game)).toHaveAttribute('src', new RegExp(this.videoSrc[game][world.lang]));
    },
  },
};

module.exports = pages;
