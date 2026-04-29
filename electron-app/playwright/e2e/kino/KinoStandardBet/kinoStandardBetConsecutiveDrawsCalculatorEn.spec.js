// playwright/e2e/kino/kinoStandardBet/kinoStandardBetConsecutiveDrawsCalculatorEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/kino/kinoStandardBet/kinoStandardBetConsecutiveDrawsCalculator_common.spec';

test.describe('Game Kino - English', () => {
  world.setLang('en');
  runTests();
});
