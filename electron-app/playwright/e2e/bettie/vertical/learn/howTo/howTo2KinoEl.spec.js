// playwright/e2e/bettie/vertical/learn/howTo/howTo2KinoEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/vertical/learn/howTo/howTo2Game_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'kino';
  runTests(game);
});
