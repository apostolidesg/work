// playwright/e2e/bettie/lobbyBettieEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/lobbyBettie_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  runTests();
});
