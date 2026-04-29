// playwright/e2e/bookOfGames/bookOfGamesEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bookOfGames/bookOfGames_common.spec';

test.describe('Game BookOfGames - Greek', () => {
  world.setLang('el');
  runTests();
});
