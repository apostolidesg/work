// playwright/e2e/bettie/mock/play/playPowerspinElOPAP.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/mock/play/playGameOPAP_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'powerspin';
  const brand = 'opapPowerspin';
  runTests(game, brand);
});
