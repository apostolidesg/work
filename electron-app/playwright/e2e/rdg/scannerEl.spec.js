// playwright/e2e/rdg/scannerEl.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/rdg/scanner_common.spec';

test.describe('Game Scanner - Greek', () => {
  world.setLang('el');
  runTests();
});
