// playwright/e2e/bettie/learn/lobbyLearnEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/learn/lobbyLearn_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  runTests();
});
