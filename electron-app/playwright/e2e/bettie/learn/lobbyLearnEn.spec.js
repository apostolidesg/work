// playwright/e2e/bettie/learn/lobbyLearnEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/learn/lobbyLearn_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  runTests();
});
