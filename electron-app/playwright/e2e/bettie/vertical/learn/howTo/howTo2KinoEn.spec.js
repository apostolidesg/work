// playwright/e2e/bettie/vertical/learn/howTo/howTo2KinoEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/vertical/learn/howTo/howTo2Game_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'kino';
  runTests(game);
});
