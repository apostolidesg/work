import { configEnv } from '@/config/env';
import { app } from 'electron';
import { existsSync, readFileSync } from 'fs';
import { hasIn, isEmpty, merge } from 'lodash';
import { createDecipheriv } from 'node:crypto';
import { join } from 'path';
import { logger as mainLogger } from './Logger';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

export class PropertiesLoader {
  constructor() {
    this._electronConfiguration = {};
    this._vueConfiguration = {};
    this._testConfiguration = {};
    this.initializePaths();
  }

  initializePaths() {
    const isWindows = process.platform === 'win32';
    const nonWindowsDir = app.getPath('home');
    const basePath = isWindows ? 'C:/' : nonWindowsDir;

    this.CONFIG_PATH = basePath;
    this.DEFAULT_CONFIG_FOLDER = 'KinoSSBT';
    this.CONFIG_FILENAME = '.kinoconfig';
    this.DEFAULT_CONFIG_FILEPATH = join(this.CONFIG_PATH, this.DEFAULT_CONFIG_FOLDER, this.CONFIG_FILENAME);
    this.ALTERNATIVE_CONFIG_FILEPATH = join(this.CONFIG_PATH, this.CONFIG_FILENAME);
  }

  loadProperties() {
    logger.info('Searching for .kinoconfig file to override environment configuration.');
    let configFilePath = null;
    if (existsSync(this.DEFAULT_CONFIG_FILEPATH)) {
      configFilePath = this.DEFAULT_CONFIG_FILEPATH;
    } else if (existsSync(this.ALTERNATIVE_CONFIG_FILEPATH)) {
      configFilePath = this.ALTERNATIVE_CONFIG_FILEPATH;
    }

    let obj = {};
    if (configFilePath) {
      logger.info('Loading configuration from ' + configFilePath);
      try {
        obj = JSON.parse(readFileSync(configFilePath, 'utf8'));
      } catch (error) {
        logger.error(`Error parsing config file ${configFilePath}: ${error.message}`);
        return; // or throw the error, depending on how you want to handle it
      }
      if (hasIn(obj, 'electron')) {
        this._electronConfiguration = obj.electron;
      }
      if (hasIn(obj, 'vue')) {
        this._vueConfiguration = obj.vue;
      }
      if (hasIn(obj, 'test')) {
        this._testConfiguration = obj.test;
      }
      this.finalizePropertiesImport();
    } else {
      logger.info(
        'Additional configuration not found in the specified path. To override default configuration, please' +
          ' provide a ' +
          this.CONFIG_FILENAME +
          ' file in ' +
          this.CONFIG_PATH +
          ' directory.',
      );
    }
  }

  finalizePropertiesImport() {
    if (hasIn(this._electronConfiguration, 'pamProperties.authPass')) {
      this._electronConfiguration.pamProperties.authPass = this.decryptProperty(
        this._electronConfiguration.pamProperties.authPass,
      );
    }
    if (hasIn(this._electronConfiguration, 'influxProperties.password')) {
      this._electronConfiguration.influxProperties.password = this.decryptProperty(
        this._electronConfiguration.influxProperties.password,
      );
    }

    if (hasIn(this._vueConfiguration, 'AUTH_PASS')) {
      this._vueConfiguration.AUTH_PASS = this.decryptProperty(this._vueConfiguration.AUTH_PASS);
    }
  }

  decryptProperty(propertyValue) {
    let translator = createDecipheriv('aes-256-cbc', configEnv.spice, configEnv.iv);
    return Buffer.concat([translator.update(propertyValue, 'base64'), translator.final()]).toString();
  }

  mergeConfigurations(baseConfig, customConfig) {
    return merge(baseConfig, customConfig);
  }

  hasElectronConfiguration() {
    return !isEmpty(this._electronConfiguration);
  }

  hasVueConfiguration() {
    return !isEmpty(this._vueConfiguration);
  }

  hasTestConfiguration() {
    return !isEmpty(this.testConfiguration) && hasIn(this._testConfiguration, 'voucher');
  }

  get electronConfiguration() {
    return this._electronConfiguration;
  }

  get vueConfiguration() {
    return this._vueConfiguration;
  }

  get testConfiguration() {
    return this._testConfiguration;
  }
}
