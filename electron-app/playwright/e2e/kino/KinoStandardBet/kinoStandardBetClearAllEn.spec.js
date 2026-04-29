// playwright/e2e/kino/kinoStandardBet/kinoStandardBetClearAllEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/kino/kinoStandardBet/kinoStandardBetClearAll_common.spec';

test.describe('Game Kino - English', () => {
  world.setLang('en');
  runTests();
});
