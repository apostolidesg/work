// playwright/e2e/powerspin/psSimpleBetEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/powerspin/psSimpleBet_common.spec';

test.describe('Game Powerspin - Greek', () => {
  world.setLang('el');
  runTests();
});
