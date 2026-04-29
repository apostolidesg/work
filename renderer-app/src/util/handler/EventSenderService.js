import {
  TERMINAL_NAME_EVENT_TYPE,
  PRINTER_STATUS_EVENT_TYPE,
  BCR_STATUS_EVENT_TYPE,
  HAL_INITIALIZED_EVENT_TYPE,
  APP_VERSION,
  LOAD_CONFIGURATION,
  REQUEST_ISECURE_HASH,
  REQUEST_CRC,
  GET_ENV_SYNC,
  PRINT_EVENT_TYPE,
  SWITCH_APPLICATION,
  SWITCH_APPLICATION_ACK,
  SWITCH_APPLICATION_NACK,
  SEND_REQUEST,
  OLISOFT_IFRAME_EVENT,
  LOG_FROM_RENDERER,
  RENDERER_READY,
} from './EventTypes';

const getElectronAPI = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  return window.electronAPI || {};
};

const hasMethod = (api, method) => typeof api[method] === 'function';

const syncHandlers = {
  [TERMINAL_NAME_EVENT_TYPE]: (api) => api.invokeMain(TERMINAL_NAME_EVENT_TYPE),
  [PRINTER_STATUS_EVENT_TYPE]: (api) => api.invokeMain(PRINTER_STATUS_EVENT_TYPE),
  [BCR_STATUS_EVENT_TYPE]: (api) => api.invokeMain(BCR_STATUS_EVENT_TYPE),
  [HAL_INITIALIZED_EVENT_TYPE]: (api) => api.invokeMain(HAL_INITIALIZED_EVENT_TYPE),
  [APP_VERSION]: (api) => api.invokeMain(APP_VERSION),
  [LOAD_CONFIGURATION]: (api) => api.invokeMain(LOAD_CONFIGURATION),
  [REQUEST_ISECURE_HASH]: (api, data) => api.invokeMain(REQUEST_ISECURE_HASH, data[0]),
  [REQUEST_CRC]: (api, data) => api.invokeMain(REQUEST_CRC, data[0]),
  [GET_ENV_SYNC]: (api) => api.invokeMain(GET_ENV_SYNC),
};

const asyncHandlers = {
  [PRINT_EVENT_TYPE]: (api, data) => {
    api.sendMain(PRINT_EVENT_TYPE, data[0]);
  },
  [SWITCH_APPLICATION]: (api) => {
    api.sendMain(SWITCH_APPLICATION);
  },
  [SWITCH_APPLICATION_ACK]: (api, data) => {
    const eventData = Array.isArray(data) && data.length > 0 ? data[0] : undefined;
    api.sendMain(SWITCH_APPLICATION_ACK, eventData);
  },
  [SWITCH_APPLICATION_NACK]: (api) => {
    api.sendMain(SWITCH_APPLICATION_NACK);
  },
  [SEND_REQUEST]: (api, data) => {
    api.sendMain(SEND_REQUEST, data[0], data[1], ...data.slice(2));
  },
  [OLISOFT_IFRAME_EVENT]: (api, data) => {
    const [loggerMessageObject] = data;
    api.sendMain(OLISOFT_IFRAME_EVENT, loggerMessageObject);
  },
  [LOG_FROM_RENDERER]: (api, data) => {
    api.sendMain(LOG_FROM_RENDERER, data[0], data[1]);
  },
  [RENDERER_READY]: (api) => {
    api.sendMain(RENDERER_READY);
  },
};

export async function sendSyncRequest(eventType, ...data) {
  const electronAPI = getElectronAPI();
  const handler = syncHandlers[eventType];

  if (!handler) {
    const error = new Error(`Unsupported sync event type: ${eventType}`);
    console.error(error.message);
    throw error;
  }

  if (!hasMethod(electronAPI, 'invokeMain')) {
    const error = new Error('Electron API invokeMain is not available');
    console.error(error.message);
    throw error;
  }

  try {
    return await handler(electronAPI, data);
  } catch (err) {
    console.error(`IPC sync request failed for ${eventType}:`, err);
    throw err;
  }
}

export function sendAsyncRequest(eventType, ...data) {
  const electronAPI = getElectronAPI();
  const handler = asyncHandlers[eventType];

  if (!handler) {
    const error = new Error(`Unsupported async event type: ${eventType}`);
    console.error(error.message);
    throw error;
  }

  if (!hasMethod(electronAPI, 'sendMain')) {
    console.warn('Electron API sendMain is not available, skipping async request');
    return;
  }

  try {
    handler(electronAPI, data);
  } catch (err) {
    console.error(`IPC async request failed for ${eventType}:`, err);
    throw err;
  }
}

export function getSupportedSyncEventTypes() {
  return Object.keys(syncHandlers);
}

export function getSupportedAsyncEventTypes() {
  return Object.keys(asyncHandlers);
}

export default {
  sendSyncRequest,
  sendAsyncRequest,
  getSupportedSyncEventTypes,
  getSupportedAsyncEventTypes,
};
