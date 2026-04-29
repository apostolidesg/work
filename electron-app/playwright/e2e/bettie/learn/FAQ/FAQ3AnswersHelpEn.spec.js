// playwright/e2e/bettie/learn/FAQ/FAQ3AnswersHelpEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/learn/FAQ/FAQ3AnswersGame_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'help';
  runTests(game);
});
