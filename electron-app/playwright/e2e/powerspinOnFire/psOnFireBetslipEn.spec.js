// playwright/e2e/powerspinOnFire/psOnFireBetslpiEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/powerspinOnFire/psOnFireBetslit_common.spec';

test.describe('Game PowerspinOnFire - English', () => {
  world.setLang('en');
  runTests();
});
