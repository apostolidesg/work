import axios from 'axios';
import merge from 'lodash.merge';
import EventSenderService from './handler/EventSenderService';
import EventTypes from './handler/EventTypes';
import { logToMainProcess } from '@/util/LoggerService';

const getEnv = () => import.meta.env || {};

function has(obj, path) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, path);
}

export async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
}

function isElectronAPIAvailable() {
  return typeof window !== 'undefined' && window.electronAPI && typeof window.electronAPI.invokeMain === 'function';
}

export async function loadConfiguration() {
  const env = getEnv();
  const currentConfig = { ...env };
  let newConfig;

  if (isElectronAPIAvailable()) {
    const [err, config] = await to(EventSenderService.sendSyncRequest(EventTypes.LOAD_CONFIGURATION));
    if (!err) {
      newConfig = config;
    } else {
      logToMainProcess('ERROR_LOADING_CONFIGURATION', err);
    }
  }

  if (has(newConfig, 'vue')) {
    merge(currentConfig, newConfig.vue);
  }

  return {
    configuration: currentConfig,
    voucher: newConfig?.test?.voucher || null,
    newConfig,
  };
}

export async function fetchCmsConfiguration() {
  const env = getEnv();
  const cmsConfigUrl = env.VITE_CMS_CONFIG_URL;
  if (!cmsConfigUrl) {
    console.warn('VITE_CMS_CONFIG_URL is not defined');
    return null;
  }
  try {
    const response = await axios.get(cmsConfigUrl);
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function loadTerminalId() {
  if (!isElectronAPIAvailable()) {
    return null;
  }

  const [err, terminalId] = await to(EventSenderService.sendSyncRequest(EventTypes.TERMINAL_NAME_EVENT_TYPE));
  if (err) {
    logToMainProcess('ERROR_LOADING_TERMINAL_ID', err);
    return null;
  }
  return terminalId;
}

export async function loadElectronAppVersion() {
  if (!isElectronAPIAvailable()) {
    return null;
  }

  const [err, electronAppVersion] = await to(EventSenderService.sendSyncRequest(EventTypes.APP_VERSION));
  if (err) {
    logToMainProcess('ERROR_LOADING_APP_VERSION', err);
    return null;
  }
  return electronAppVersion;
}

export async function getElectronEnv() {
  if (!isElectronAPIAvailable()) {
    return null;
  }

  const [err, electronEnv] = await to(EventSenderService.sendSyncRequest(EventTypes.GET_ENV_SYNC));
  if (err) {
    return null;
  }
  return electronEnv;
}
