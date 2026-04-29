// playwright/e2e/bettie/play/playPowerspinEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/play/playGame_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'powerspin';
  runTests(game);
});
