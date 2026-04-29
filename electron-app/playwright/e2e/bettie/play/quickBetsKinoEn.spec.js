// playwright/e2e/bettie/play/quickBetsKinoEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/play/quickBetsKino_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'kino';
  runTests(game);
});
