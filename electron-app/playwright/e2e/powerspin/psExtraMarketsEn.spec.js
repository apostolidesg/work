// playwright/e2e/powerspin/psExtraMarketsEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/powerspin/psExtraMarkets_common.spec';

test.describe('Game Powerspin - English', () => {
  world.setLang('en');
  runTests();
});
