// playwright/e2e/lobbyEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/lobby_common.spec';

test.describe('Game Lobby - Greek', () => {
  world.setLang('el');
  runTests();
});
