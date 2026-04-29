// playwright/e2e/powerspin/psStandardPageEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/powerspin/psStandardPage_common.spec';

test.describe('Game Powerspin - Greek', () => {
  world.setLang('el');
  runTests();
});
