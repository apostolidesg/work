// playwright/e2e/bettie/learn/howTo/howTo2PowerspinEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/learn/howTo/howTo2Game_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'powerspin';
  runTests(game);
});
