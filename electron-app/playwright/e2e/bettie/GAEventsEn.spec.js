// playwright/e2e/bettie/GAEventsEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/GAEvents_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  runTests();
});
