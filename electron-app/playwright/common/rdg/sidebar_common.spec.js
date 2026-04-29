// playwright/common/rdg/sidebar_common.spec.js
import { test } from '@playwright/test';
import world from '#/pageObjects/lib/world';
import { launchElectronApp, screenshotError } from '#/support/commands';
import sidebar from '#/pageObjects/rdg/sidebar';

function runTests() {
  test.describe('Sidebar', () => {
    let electronApp, page;

    test.beforeAll(async () => {
      ({ electronApp, page } = await launchElectronApp());
    });

    test.afterAll(async () => {
      if (electronApp) await electronApp.close();
    });

    test('Sidebar closed', async ({}, testInfo) => {
      try {
        await sidebar.toggle.isVisible(page);
        await sidebar.toggle.shouldBeClosed(page);
        await sidebar.toggle.icon.close.isVisible(page);
        await sidebar.toggle.icon.open.notExists(page);

        await sidebar.brand.isVisible(page);
        await sidebar.brand.icon.isVisible(page);
        await sidebar.brand.text.shouldBeClosed(page);

        await sidebar.home.isVisible(page);
        await sidebar.home.icon.isVisible(page);
        await sidebar.home.text.shouldBeClosed(page);

        await sidebar.games.isVisible(page);
        await sidebar.games.icon.isVisible(page);
        await sidebar.games.text.shouldBeClosed(page);

        await sidebar.help.isVisible(page);
        await sidebar.help.icon.isVisible(page);
        await sidebar.help.text.shouldBeClosed(page);

        await sidebar.language.isVisible(page);
        await sidebar.language.icon.isVisible(page);
        await sidebar.language.text.shouldBeClosed(page);

        await sidebar.language.get(page).click();
        await sidebar.language.languageMenu.isVisible(page);
        await sidebar.language.languageMenu.greek.isVisible(page);
        await sidebar.language.languageMenu.greek.icon.isVisible(page);
        await sidebar.language.languageMenu.greek.text.shouldHaveText(page);
        await sidebar.language.languageMenu.english.isVisible(page);
        await sidebar.language.languageMenu.english.icon.isVisible(page);
        await sidebar.language.languageMenu.english.text.shouldHaveText(page);
        if (world.lang === 'el') {
          await sidebar.language.languageMenu.greek.shouldBeSelected(page);
          await sidebar.language.languageMenu.english.shouldNotBeSelected(page);
        } else if (world.lang === 'en') {
          await sidebar.language.languageMenu.greek.shouldNotBeSelected(page);
          await sidebar.language.languageMenu.english.shouldBeSelected(page);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });

    test('Sidebar opened', async ({}, testInfo) => {
      try {
        await sidebar.toggle.get(page).click();

        await sidebar.toggle.isVisible(page);
        await sidebar.toggle.shouldBeOpen(page);
        await sidebar.toggle.icon.close.notExists(page);
        await sidebar.toggle.icon.open.isVisible(page);

        await sidebar.brand.isVisible(page);
        await sidebar.brand.icon.isVisible(page);
        await sidebar.brand.text.shouldBeOpen(page);

        await sidebar.home.isVisible(page);
        await sidebar.home.icon.isVisible(page);
        await sidebar.home.text.shouldBeOpen(page);
        await sidebar.home.text.shouldHaveText(page);

        await sidebar.games.isVisible(page);
        await sidebar.games.icon.isVisible(page);
        await sidebar.games.text.shouldBeOpen(page);
        await sidebar.games.text.shouldHaveText(page);

        await sidebar.help.isVisible(page);
        await sidebar.help.icon.isVisible(page);
        await sidebar.help.text.shouldBeOpen(page);
        await sidebar.help.text.shouldHaveText(page);

        await sidebar.language.isVisible(page);
        await sidebar.language.icon.isVisible(page);
        await sidebar.language.text.shouldBeOpen(page);
        await sidebar.language.text.shouldHaveText(page);

        await sidebar.language.get(page).click();
        await sidebar.language.languageMenu.isVisible(page);
        await sidebar.language.languageMenu.greek.isVisible(page);
        await sidebar.language.languageMenu.greek.icon.isVisible(page);
        await sidebar.language.languageMenu.greek.text.shouldHaveText(page);
        await sidebar.language.languageMenu.english.isVisible(page);
        await sidebar.language.languageMenu.english.icon.isVisible(page);
        await sidebar.language.languageMenu.english.text.shouldHaveText(page);
        if (world.lang === 'el') {
          await sidebar.language.languageMenu.greek.shouldBeSelected(page);
          await sidebar.language.languageMenu.english.shouldNotBeSelected(page);
        } else if (world.lang === 'en') {
          await sidebar.language.languageMenu.greek.shouldNotBeSelected(page);
          await sidebar.language.languageMenu.english.shouldBeSelected(page);
        }
      } catch (error) {
        await screenshotError(page, testInfo);
        throw error;
      }
    });
  });
}

module.exports = { runTests };
