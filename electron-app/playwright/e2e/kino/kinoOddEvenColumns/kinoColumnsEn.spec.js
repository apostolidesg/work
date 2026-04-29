// playwright/e2e/kino/kinoOddEvenColumns/kinoColumns.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/kino/kinoOddEvenColumns/kinoColumns_common.spec';

test.describe('Game Kino - English', () => {
  world.setLang('en');
  runTests();
});
