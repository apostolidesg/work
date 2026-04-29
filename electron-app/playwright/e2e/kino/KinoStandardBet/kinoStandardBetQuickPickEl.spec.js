// playwright/e2e/kino/kinoStandardBet/kinoStandardBetQuickPickEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/kino/kinoStandardBet/kinoStandardBetQuickPick_common.spec';

test.describe('Game Kino - Greek', () => {
  world.setLang('el');
  runTests();
});
