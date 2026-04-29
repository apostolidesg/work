// playwright/e2e/bettie/mock/learn/howTo/howTo2PowerspinEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/mock/learn/howTo/howTo2GameOPAP_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'powerspin';
  const brand = 'opapPowerspin';
  runTests(game, brand);
});
