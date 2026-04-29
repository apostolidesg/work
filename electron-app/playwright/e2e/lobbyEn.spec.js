// playwright/e2e/lobbyEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/lobby_common.spec';

test.describe('Game Lobby - English', () => {
  world.setLang('el');
  runTests();
});
