// playwright/e2e/rdg/scannerEn.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { runTests } from '#/common/rdg/scanner_common.spec';

test.describe('Game Scanner - English', () => {
  world.setLang('en');
  runTests();
});
