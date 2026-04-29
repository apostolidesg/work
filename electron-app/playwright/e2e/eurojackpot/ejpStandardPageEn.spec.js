// playwright/e2e/eurojackpot/ejpStandardPageEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/eurojackpot/ejpStandardPage_common.spec';

test.describe('Game Eurojackpot - English', () => {
  world.setLang('en');
  runTests();
});
