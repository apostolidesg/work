// playwright/e2e/bettie/mock/learn/FAQ/FAQ2QuestionsPowerspinEnOPAP.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/mock/learn/FAQ/FAQ2QuestionsGameOPAP_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'powerspin';
  const brand = 'opapPowerspin';
  runTests(game, brand);
});
