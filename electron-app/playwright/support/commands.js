// playwright/support/commands.js
const fs = require('fs');
const os = require('os');
const path = require('path');
import lobbyHeader from '#/pageObjects/lobbyHeader';
import settings from '#/pageObjects/eurojackpot/ejpSettings';
import scanner from '#/pageObjects/rdg/scanner';
import sidebar from '#/pageObjects/rdg/sidebar';
const world = require('#/pageObjects/lib/world');
const { _electron: electron } = require('playwright');
const { expect } = require('@playwright/test');

const appPath = path.resolve(__dirname, '../../release/opap-lottery-games-win32-x64/opap-lottery-games.exe');
const KINO_CONFIG = 'C:\\KinoSSBT\\.kinoconfig';
const ALLOWED_HOSTNAMES = ['dev-testing-02', 'PC5170-test']; // for screenshotMatch

async function config(cfg = {}) {
  const keys = Object.keys(cfg || {});
  if (keys.length !== 1) {
    return async () => {};
  } // one change only, no override; return a no-op restore

  const key = keys[0];
  const val = cfg[key];

  // local helpers (scoped to this function)
  const read = () => fs.readFileSync(KINO_CONFIG, 'utf8');
  const write = text => {
    const fd = fs.openSync(KINO_CONFIG, 'w');
    try {
      fs.writeFileSync(fd, text, 'utf8');
      fs.fsyncSync(fd);
    } finally {
      fs.closeSync(fd);
    }
  };

  // capture original
  let original = read();

  // build the new literal: "text" or true/false
  const literal = typeof val === 'string' ? `"${val}"` : val ? 'true' : 'false';

  // capture current value (string or boolean) so we can log old → new
  const re = new RegExp(`("${key}"\\s*:\\s*)(?:"([^"]*)"|(true|false))`, 'i');
  const m = re.exec(original);
  const oldRaw = m ? (m[2] !== undefined ? `"${m[2]}"` : m[3]) : '<not found>';

  console.log(`MOCK: .kinoconfig will be changed and then restored! ${key} : ${oldRaw}  ->  ${literal}  ->  ${oldRaw}`);

  // if key not found, do nothing (keeps it simple)
  const patched = m ? original.replace(re, (_, head) => `${head}${literal}`) : original;

  if (patched !== original) {
    write(patched);
    await new Promise(r => setTimeout(r, 60)); // small settle for watchers
  }

  // return restore() that puts file back exactly as it was
  return async () => {
    if (patched !== original) {
      write(original);
      await new Promise(r => setTimeout(r, 60));
    }
  };
}

async function display(electronApp, page, opts = {}) {
  const { width, height, fullscreen = true, center = true } = opts || {};

  // Turn off fullscreen & set size from the MAIN process
  await electronApp.evaluate(
    async ({ BrowserWindow }, params) => {
      const win = BrowserWindow.getAllWindows()[0];
      if (!win) throw new Error('No BrowserWindow');

      // Disable fullscreen first so size changes take effect
      win.setFullScreen(Boolean(params.fullscreen));
      if (!params.fullscreen && params.width && params.height) {
        win.setResizable(true);
        // Content size avoids OS chrome differences
        win.setContentSize(params.width, params.height);
        if (params.center) win.center();
      }
    },
    { width, height, fullscreen, center },
  );

  // keep page viewport consistent with window content size
  if (!fullscreen && width && height) {
    await page.setViewportSize({ width, height });
  }
}

async function launchElectronApp(displayOpts = {}, configOverride = {}) {
  // await launchElectronApp({ width: 1080, height: 1920, fullscreen: false }, { DIGITAL_ASSISTANT_ENABLED: true });
  // displayOpts = { width, height, fullscreen = true, center = true }
  // configOverride = { <single key>: <value> }

  const restore = await config(configOverride); // returns a restore() no matter what

  const electronApp = await electron.launch({
    executablePath: appPath,
    env: {
      ...process.env,
      ELECTRON_ENABLE_LOGGING: 'true',
      ELECTRON_ENABLE_STACK_DUMPING: 'true',
    },
  });

  const windows = await electronApp.windows();
  console.log(`Windows found: ${windows.length}`);
  if (windows.length === 0) throw new Error('❌ No Electron window detected!');
  const page = windows[0];

  await restore(); // put .kinoconfig back
  await display(electronApp, page, displayOpts);

  await page.waitForTimeout(2000);
  if (await page.locator('aside[aria-label="Navigation sidebar collapsed"]').isVisible()) {
    console.log('✅ Launch successful RDG — Close scanner modal - Language:', world.getLang());
    await scanner.close.get(page).click();
    if (world.lang === 'en') {
      await sidebar.language.get(page).click();
      await sidebar.language.languageMenu.switchLanguage(page, world.getLang());
    }
  } else {
    console.log('✅ Launch successful OLD app — switching language to:', world.getLang());
    await lobbyHeader.languageSwitcher.switchLanguage(page, world.getLang());
  }

  return { electronApp, page };
}

async function screenshotError(page, testInfo) {
  try {
    const fileNorm = String(testInfo.file).replace(/\\/g, '/'); // normalize for Win paths
    const base = fileNorm
      .split('/')
      .pop()
      .replace(/\.(spec|test)\.[tj]sx?$/i, '');
    const safeTitle = String(testInfo.title).replace(/[^\w.-]+/g, '_'); // sanitize

    const screenshotPath = `playwright/reports/screenshotError/${base}_${safeTitle}_${world.getLang()}.png`;

    console.log('📸 Taking screenshot on error for:', safeTitle);
    await page.screenshot({ path: screenshotPath });

    await testInfo.attach(`Screenshot - ${testInfo.title}`, {
      path: screenshotPath,
      contentType: 'image/png',
    });
  } catch (error) {
    console.error('❌ Failed to capture screenshot:', error);
  }
}

/**
 * Stabilize page for visual snapshots:
 * - Disable CSS animations/transitions/caret
 * - Set prefers-reduced-motion
 * - Stop current & future <video>/<audio> (pause + reset to t=0)
 * - Optionally hides media without reflow (visibility:hidden)
 *   (κρατάμε το hide ενεργό by default για καθαρά screenshots)
 */
async function screenshotFreeze(page) {
  // 1) kill animations/transitions/caret + hide media
  await page.evaluate(() => {
    if (window.__screenshotFreezeStyle) return;
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      :focus { caret-color: transparent !important; }
      video, audio { visibility: hidden !important; }
    `;
    document.head.appendChild(style);
    window.__screenshotFreezeStyle = true;
  });

  // 2) no motion
  await page.emulateMedia({ reducedMotion: 'reduce' });

  // 3) stop media (pause + reset to t=0)
  await page.evaluate(() => {
    document.querySelectorAll('video, audio').forEach(el => {
      try {
        el.autoplay = false;
        el.loop = false;
        el.pause?.();
        el.currentTime = 0;
      } catch {}
    });
    if (!window.__screenshotFreezePlayHook) {
      window.__screenshotFreezePlayHook = true;
      document.addEventListener(
        'play',
        e => {
          try {
            e.target.pause?.();
          } catch {}
        },
        true,
      );
    }
  });

  // media
  await page.evaluate(() => {
    document.querySelectorAll('video, audio').forEach(el => {
      try {
        el.autoplay = false;
        el.loop = false;
        el.pause?.();
        el.currentTime = 0;
      } catch {}
    });
  });
}

async function screenshotMatch(page, name) {
  console.log('current hostname =', os.hostname());
  const RUN_SCREENSHOTS = ALLOWED_HOSTNAMES.some(h => h === os.hostname());
  if (!RUN_SCREENSHOTS) {
    console.log(`Disabled (RUN_SCREENSHOTS=false) — skipping screenshot "${name}"`);
    return; // no-op: test continues, but with no screenshot
  }

  await page.waitForTimeout(500);
  await screenshotFreeze(page); // Stabilize page for visual snapshots
  // masks draw , drawTime, balance
  const masks = [
    lobbyHeader.draw.get(page), // #ssbt_lobbyHeaderNextDrawTimer
    lobbyHeader.drawTime.get(page), // #ssbt_draw_information
    lobbyHeader.balance.get(page), // #ssbt_balance_box
    settings.nextDraw.timer.get(page), // ejp timer
  ];

  await expect(page).toHaveScreenshot(name, {
    animations: 'disabled',
    caret: 'hide',
    mask: masks,
    maxDiffPixelRatio: 0.0001,
  });
}

async function waitForGAEvent(page, expectedEventName, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    let resolved = false;
    let timeoutHandle;

    const handler = async (route, request) => {
      try {
        const body = request.postData();
        if (!body) {
          await route.continue();
          return;
        }

        const data = JSON.parse(body);
        const events = data?.events || [];

        for (const event of events) {
          console.log(`[GA] Found event: ${event.name}`);

          if (event.name === expectedEventName && !resolved) {
            resolved = true;
            clearTimeout(timeoutHandle);

            await page.unroute('**/*collect*', handler);

            resolve(event);
            return;
          }
        }
      } catch (err) {
        console.warn('[GA] Failed to parse GA postData:', err);
      }

      await route.continue();
    };

    page.route('**/*collect*', handler);

    timeoutHandle = setTimeout(async () => {
      if (!resolved) {
        await page.unroute('**/*collect*', handler);
        resolved = true;
        reject(new Error(`GA Event '${expectedEventName}' not detected within ${timeoutMs}ms`));
      }
    }, timeoutMs);
  });
}

module.exports = {
  launchElectronApp,
  screenshotError,
  screenshotMatch,
  waitForGAEvent,
};
