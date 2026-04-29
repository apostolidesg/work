// playwright/e2e/bettie/vertical/play/playPowerspinEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/vertical/play/playGame_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'powerspin';
  runTests(game);
});
