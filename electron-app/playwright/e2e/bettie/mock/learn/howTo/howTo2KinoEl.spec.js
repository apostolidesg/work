// playwright/e2e/bettie/mock/learn/howTo/howTo2KinoElOPAP.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/mock/learn/howTo/howTo2GameOPAP_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'kino';
  const brand = 'opapKino';
  runTests(game, brand);
});
