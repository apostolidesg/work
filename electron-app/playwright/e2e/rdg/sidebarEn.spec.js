// playwright/e2e/rdg/sidebarEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/rdg/sidebar_common.spec';

test.describe('Game Sidebar - English', () => {
  world.setLang('en');
  runTests();
});
