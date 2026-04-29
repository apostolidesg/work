// playwright/e2e/eurojackpot/ejpSimpleBetEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/eurojackpot/ejpSimpleBet_common.spec';

test.describe('Game Eurojackpot - Greek', () => {
  world.setLang('el');
  runTests();
});
