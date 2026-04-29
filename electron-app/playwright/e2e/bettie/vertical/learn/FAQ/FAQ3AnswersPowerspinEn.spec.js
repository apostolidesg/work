// playwright/e2e/bettie/vertical/learn/FAQ/FAQ3AnswersPowerspinEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/vertical/learn/FAQ/FAQ3AnswersGame_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'powerspin';
  runTests(game);
});
