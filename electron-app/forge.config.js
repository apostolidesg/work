const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const fs = require('fs-extra');
const path = require('node:path');

const versionFilePath = path.join(__dirname, 'version.txt');
const appVersion = fs.readFileSync(versionFilePath, 'utf-8').trim();
const appName = 'opap-lottery-games';

module.exports = {
  outDir: 'release',
  packagerConfig: {
    asar: true,
    name: appName,
    icon: path.join(__dirname, 'src', 'assets', 'icons', 'icon'),
    extraResource: ['.env.production', 'version.txt'],
    afterCopy: [
      (buildPath, _electronVersion, _platform, _arch, callback) => {
        const rendererSource = path.join(__dirname, 'dist', 'renderer');
        const rendererDest = path.join(buildPath, '.vite', 'renderer', 'main_window');

        const errorPageSource = path.join(__dirname, 'error.html');
        const errorPageDest = path.join(buildPath, '.vite', 'renderer', 'error_window', 'error.html');

        try {
          fs.removeSync(errorPageDest);
          fs.copySync(errorPageSource, errorPageDest);
          console.log(`Copied error page to: ${errorPageDest}`);

          fs.removeSync(rendererDest);
          fs.copySync(rendererSource, rendererDest);
          console.log(`Copied renderer output to: ${rendererDest}`);

          callback();
        } catch (err) {
          console.error('Error copying renderer output:', err);
          callback(err);
        }
      },
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
    },
  ],
  hooks: {
    postMake: async (forgeConfig, results) => {
      // Find the zip file, rename it, and move it to the release folder
      for (const result of results) {
        const platform = result.platform;
        const arch = result.arch;
        for (const artifact of result.artifacts) {
          if (artifact.endsWith('.zip')) {
            const releaseDir = path.resolve(__dirname, 'release');
            const newName = path.join(releaseDir, `${appName}-${appVersion}-${platform}-${arch}.zip`);

            try {
              // Ensure the release directory exists
              await fs.ensureDir(releaseDir);
            } catch (err) {
              console.error('Error finding release directory:', err);
              continue;
            }

            // Copy the file to the new location with the new name
            await fs.copy(artifact, newName);
            console.log(`Copied ${artifact} to ${newName}`);

            // Optionally remove the original file
            await fs.remove(artifact);
            console.log(`Removed original file ${artifact}`);

            // Update the artifact path in the results
            const index = result.artifacts.indexOf(artifact);
            if (index !== -1) {
              result.artifacts[index] = newName;
            }
          }
        }
      }

      try {
        // Then clean up the package folder
        const packageOutDir = path.join(forgeConfig.outDir, `${appName}-${process.platform}-${process.arch}`);
        await fs.remove(packageOutDir);
        console.log(`Removed packaged app directory: ${packageOutDir}`);
        const makeDir = path.join(forgeConfig.outDir, 'make');
        await fs.remove(makeDir);
        console.log(`Removed make directory: ${makeDir}`);
      } catch (err) {
        console.error('Error cleaning up package folder:', err);
      }

      return results;
    },
  },
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: 'src/main.js',
            config: 'vite.main.config.mjs',
            target: 'main',
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs',
            target: 'preload',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs',
          },
        ],
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: true,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
