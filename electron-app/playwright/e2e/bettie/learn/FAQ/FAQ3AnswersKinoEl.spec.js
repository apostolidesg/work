// playwright/e2e/bettie/learn/FAQ/FAQ3AnswersKinoEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/learn/FAQ/FAQ3AnswersGame_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'kino';
  runTests(game);
});
