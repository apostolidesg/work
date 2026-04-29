// playwright/e2e/powerspinOnFire/psOnFireSimpleBetEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/powerspinOnFire/psOnFireSimpleBet_common.spec';

test.describe('Game PowerspinOnFire - Greek', () => {
  world.setLang('el');
  runTests();
});
