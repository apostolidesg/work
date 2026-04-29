// playwright/e2e/powerspin/psStandardPageEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/powerspin/psStandardPage_common.spec';

test.describe('Game Powerspin - English', () => {
  world.setLang('en');
  runTests();
});
