// playwright/e2e/bettie/play/quickBetsPowerspinEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/play/quickBetsPowerspin_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'powerspin';
  runTests(game);
});
