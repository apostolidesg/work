// playwright/e2e/powerspinOnFire/psOnFireStandardPageEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/powerspinOnFire/psOnFireStandardPage_common.spec';

test.describe('Game PowerspinOnFire - Greek', () => {
  world.setLang('el');
  runTests();
});
