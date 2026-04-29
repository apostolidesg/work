// playwright/e2e/bettie/mock/play/playKinoEnOPAP.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/mock/play/playGameOPAP_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'kino';
  const brand = 'opapKino';
  runTests(game, brand);
});
