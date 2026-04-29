// electron-app/playwright/playwright.bettiefalse.config.js
const base = require('./playwright.config');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  ...base,
  testIgnore: ['**/bettie/**'], // exclude BETTIE tests anywhere in the tree
};
