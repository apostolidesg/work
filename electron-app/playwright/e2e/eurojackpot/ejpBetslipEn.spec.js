// playwright/e2e/eurojackpot/ejpBetslpiEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/eurojackpot/ejpBetslit_common.spec';

test.describe('Game Eurojackpot - English', () => {
  world.setLang('en');
  runTests();
});
