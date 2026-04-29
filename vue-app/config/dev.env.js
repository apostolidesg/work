module.exports = {
  NODE_ENV: '"development"',
  APP_VERSION: '',
  IPC_RENDERER_ENABLED: true,
  TERMINAL_ID: '"101023HPT01"', // 234021HPT01, 101023HPT01
  DRAW_API_HOST: '"apigatewayjh.l10.ilotdev.dc.opap/api/opap/v3.0/draws"',
  STATISTICS_API_HOST: '"apigatewayjh.l10.ilotdev.dc.opap/api/v1.0/games"',
  PROMOTIONS_API_HOST: '"apigatewayjh.l10.ilotdev.dc.opap/api/v1.1/promotions"',
  PAM_HOST: '"localhost.opap.gr"',
  AUTH_PASS: '"https://jira.betware.com/browse/BWIMDCD-371"',
  IDLE_TIME: 180000,
  WALLET_LIMIT: 1500,
  KINO: {
    PLAY_KINO: {
      READY_BETSLIPS_NUMBERS: 6,
      READY_BETSLIPS: [
        {
          columns: 2,
          hasBonus: false,
          multiplier: [2, 6],
        },
        {
          columns: 6,
          hasBonus: false,
          multiplier: [2, 1, 6],
        },
        {
          columns: 6,
          hasBonus: true,
          multiplier: 4,
        },
      ],
    },
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
  POWERSPIN: {
    OLD_COLUMN_PRICE_LAST_DRAW_TIME: 1667472060000,
    LIVE_DRAW: {
      API: {
        powerspin: '"https://ds.vermantiagaming.com/web/uat/#/powerspin"',
        multispin: '"https://ds.vermantiagaming.com/web/uat/#/multispin"',
      },
    },
    READY_BETSLIPS: [
      {
        numbers: 3,
        consecutiveDraws: 1,
        return: 24,
        multiplier: [2, 6],
      },
      {
        symbol: true,
        consecutiveDraws: 2,
        return: 8,
        multiplier: [2, 1, 6],
      },
      {
        color: true,
        consecutiveDraws: 3,
        return: 3,
        multiplier: 2,
      },
    ],
  },
  EUROJACKPOT: {
    COLUMN_PRICE: 2,
    DRAW_DAYS: [2, 5], // 2: Tuesday, 5: Friday
    JACKPOT_API_CALL_RETRY_INTERVAL: 60000 * 120, // 2 hours
    SALES_OPEN: {
      HOURS: 23,
      MINUTES: 0,
    },
  },
  FIREBLAZE: {
    HIDE_ADVERTISEMENT_ICON: false,
    COLUMN_PRICE: 0.5,
    LIVE_DRAW: {
      API: {
        fireblaze: '"https://ds.vermantiagaming.com/web/uat/#/powerspin"',
      },
    },
  },
  VOUCHER_MESSAGE: {
    en: '"Placeholder text"',
    el: '"Δείγμα μηνύματος"',
  },
  DIGITAL_ASSISTANT: {
    ENABLED: true,
    ASSETS: {
      URL: '"https://media.opap.gr/ssbt/lottery/portrait-app/uat"',
      VIDEOS: {
        SCREENSAVER: '"screensaver.mp4"',
      },
    },
    SCREENSAVER_IDLE_TIME: 10000,
    IS_SCREENSAVER_ENABLED: false,
    KINO_BANNER_IMAGE: '"kino-banner.png"',
    POWERSPIN_BANNER_IMAGE: '"powerspin-banner.png"',
  },
  GTAG: {
    MEASUREMENT_ID: '"G-CGWDF0BC4K"',
    API_SECRET: '"y5ryEo9kSjuBwjCOEvcjHQ"',
  },
  DIGITAL_PAY_ENABLED: true,
};
