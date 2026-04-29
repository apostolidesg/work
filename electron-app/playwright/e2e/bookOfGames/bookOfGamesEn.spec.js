// playwright/e2e/bookOfGames/bookOfGamesEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bookOfGames/bookOfGames_common.spec';

test.describe('Game BookOfGames - English', () => {
  world.setLang('en');
  runTests();
});
