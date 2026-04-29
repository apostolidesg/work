// playwright/e2e/bettie/mock/learn/FAQ/FAQ2QuestionsKinoEnDigitalPay.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/bettie/mock/learn/FAQ/FAQ2QuestionsGameDigitalPay_common.spec';

test.describe('Game Bettie - English', () => {
  world.setLang('en');
  const game = 'kino';
  runTests(game);
});
