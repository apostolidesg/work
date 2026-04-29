// playwright/e2e/kino/kinoOddEvenColumns/kinoOddEven.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/kino/kinoOddEvenColumns/kinoOddEven_common.spec';

test.describe('Game Kino - Greek', () => {
  world.setLang('el');
  runTests();
});
