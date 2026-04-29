'use strict';
const { merge } = require('webpack-merge');
const prodDevEnv = require('./prod.dev.env');

module.exports = merge(prodDevEnv, {
  NODE_ENV: '"production"',
  PAM_HOST: '"cf-janus.nls.dc.opap"',
  KINO: {
    LIVE_DRAW: {
      ENABLED: true,
      DIALOG_TIMEOUT: 9000,
      AUTO_CLEAR_BETS_BEFORE_NEXT_DRAW_MILLIS: 180000,
    },
  },
});
