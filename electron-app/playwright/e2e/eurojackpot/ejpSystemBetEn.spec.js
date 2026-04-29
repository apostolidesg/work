// playwright/e2e/eurojackpot/ejpSystemBetEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/eurojackpot/ejpSystemBet_common.spec';

test.describe('Game Eurojackpot - English', () => {
  world.setLang('en');
  runTests();
});
