// playwright/e2e/eurojackpot/ejpBetslpiEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/eurojackpot/ejpBetslit_common.spec';

test.describe('Game Eurojackpot - Greek', () => {
  world.setLang('el');
  runTests();
});
