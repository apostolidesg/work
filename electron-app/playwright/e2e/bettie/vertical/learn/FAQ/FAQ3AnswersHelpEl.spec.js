// playwright/e2e/bettie/vertical/learn/FAQ/FAQ3AnswersHelpEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/vertical/learn/FAQ/FAQ3AnswersGame_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'help';
  runTests(game);
});
