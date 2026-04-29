// playwright/e2e/bettie/learn/FAQ/FAQ2QuestionsPowerspinEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/learn/FAQ/FAQ2QuestionsGame_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'powerspin';
  runTests(game);
});
