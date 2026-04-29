'use strict';
//This configuration file is used when packaging the vue application with development parameters (i.e. urls, functionalities, etc)
module.exports = {
  NODE_ENV: '"development"',
  APP_VERSION: '',
  IPC_RENDERER_ENABLED: true,
  DRAW_API_HOST: '"apigatewayjh.l10.ilotdev.dc.opap/api/opap/v3.0/draws"',
  STATISTICS_API_HOST: '"apigatewayjh.l10.ilotdev.dc.opap/api/v1.0/games"',
  PAM_HOST: '"localhost.opap.gr"',
  AUTH_PASS: '"https://jira.betware.com/browse/BWIMDCD-371"',
  DIGITAL_ASSISTANT: {
    ENABLED: false,
    ASSETS: {
      URL: '"https://media.opap.gr/ssbt/lottery/portrait-app/uat"',
      VIDEOS: {
        SCREENSAVER: '"screensaver.mp4"',
      },
    },
    SCREENSAVER_IDLE_TIME: 10000,
    IS_SCREENSAVER_ENABLED: false,
  },
  IDLE_TIME: 180000,
  WALLET_LIMIT: 1500,
  GTAG: {
    MEASUREMENT_ID: '"G-CGWDF0BC4K"',
    API_SECRET: '"y5ryEo9kSjuBwjCOEvcjHQ"',
  },
  KINO: {
    LIVE_DRAW: {
      ENABLED: true,
      OLISOFT_API: '"https://dsuat.opap.gr/ssbt_kino/kino/html/Internet_UAT/"',
      DIALOG_TIMEOUT: 9000,
      AUTO_CLEAR_BETS_BEFORE_NEXT_DRAW_MILLIS: 180000,
      ENABLE_BETSLIP_IMPORT_BEFORE_NEXT_DRAW_MILLIS: 150000,
      AVAILABLE_TIME_FRAME_BEFORE_AUTO_REDIRECT_POPUP_TRIGGERS_MILLIS: 20000,
      THEMES: {
        simple: {
          image: '"kino-logo"',
          list: {
            classic: {
              id: '"KinoDraw"',
              imageUrl: '"https://ds.opap.gr/ssbt_kino/images/kino_debug/kino_draw.jpg"',
              caption_el: '"Κλασσικό"',
              caption_en: '"Classic"',
            },
          },
        },
        sidebets: {
          image: '"sidebets"',
          list: {
            classic: {
              id: '"SideBets"',
              imageUrl: '"https://ds.opap.gr/ssbt_kino/images/kino_debug/sidebets.jpg"',
              caption_el: '"Κλασσικό"',
              caption_en: '"Classic"',
            },
          },
        },
      },
    },
    CLOSE_2_WIN: {
      ENABLED: true,
    },
  },
  EUROJACKPOT: {
    COLUMN_PRICE: 2,
    DRAW_DAYS: [2, 5], // 2: Tuesday, 5: Friday
    JACKPOT_API_CALL_RETRY_INTERVAL: 60000 * 120, // 2 hours
    SALES_OPEN: {
      hour: 23,
      minute: 0,
    },
  },
  FIREBLAZE: {
    HIDE_ADVERTISEMENT_ICON: false,
    COLUMN_PRICE: 0.5,
  },
  VOUCHER_MESSAGE: {
    en: '"Placeholder text"',
    el: '"Δείγμα μηνύματος"',
  },
};
