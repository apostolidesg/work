// playwright/e2e/kino/kinoStandardBet/kinoStandardBetslipClearAareaEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/kino/kinoStandardBet/kinoStandardBetslipClearArea_common.spec';

test.describe('Game Kino - English', () => {
  world.setLang('en');
  runTests();
});
