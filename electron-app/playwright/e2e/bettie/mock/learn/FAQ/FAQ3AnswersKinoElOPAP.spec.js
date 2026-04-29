// playwright/e2e/bettie/mock/learn/FAQ/FAQ3AnswersKinoElOPAP.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/mock/learn/FAQ/FAQ3AnswersGameOPAP_common.spec';

test.describe('Game Bettie - Greek', () => {
  world.setLang('el');
  const game = 'kino';
  const brand = 'opapKino';
  runTests(game, brand);
});
