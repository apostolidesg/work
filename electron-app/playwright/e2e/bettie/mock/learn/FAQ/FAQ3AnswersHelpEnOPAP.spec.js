// playwright/e2e/bettie/mock/learn/FAQ/FAQ3AnswersHelpEnOPAP.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/mock/learn/FAQ/FAQ3AnswersGameOPAP_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'help';
  const brand = 'opapHelp';
  runTests(game, brand);
});
