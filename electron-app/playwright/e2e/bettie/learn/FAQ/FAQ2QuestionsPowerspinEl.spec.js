// playwright/e2e/bettie/learn/FAQ/FAQ2QuestionsPowerspinEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/learn/FAQ/FAQ2QuestionsGame_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'powerspin';
  runTests(game);
});
