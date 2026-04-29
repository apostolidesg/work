// playwright/e2e/kino/kinoStandardBet/kinoStandardBetGameNumbersEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/kino/kinoStandardBet/kinoStandardBetGameNumbers_common.spec';

test.describe('Game Kino - Greek', () => {
  world.setLang('el');
  runTests();
});
