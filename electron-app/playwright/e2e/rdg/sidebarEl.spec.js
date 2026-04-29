// playwright/e2e/rdg/sidebarEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/rdg/sidebar_common.spec';

test.describe('Game Sidebar - Greek', () => {
  world.setLang('el');
  runTests();
});
