// playwright/e2e/bettie/mock/learn/FAQ/FAQ2QuestionsPowerspinElDigitalPay.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/mock/learn/FAQ/FAQ2QuestionsGameDigitalPay_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'powerspin';
  runTests(game);
});
