export const ElectronEvents = {
  // GENERAL LIFECYCLE EVENTS

  LOADING_FINISHED: {
    EVENT: 'did-finish-load',
    MSG: 'APPLICATION STARTED',
  },
  GPU_CRASHED: {
    EVENT: 'gpu-process-crashed',
    MSG: 'GPU CRASHED',
  },
  CLOSED: {
    EVENT: 'closed',
    MSG: 'APPLICATION CLOSED',
  },
  READY: {
    EVENT: 'ready',
    MSG: 'APPLICATION IS READY',
  },
  ALL_WINDOWS_CLOSED: {
    EVENT: 'window-all-closed',
    MSG: 'ALL APPLICATION WINDOWS HAVE BEEN CLOSED',
  },
  BEFORE_QUIT: {
    EVENT: 'before-quit',
    MSG: 'BEFORE QUITING',
  },
  SHOW: {
    EVENT: 'show',
    MSG: 'SHOW APP WINDOW',
  },
  ACTIVATE: {
    EVENT: 'activate',
    MSG: 'ACTIVATE APP WINDOW',
  },

  // ERROR EVENTS

  UNRESPONSIVE: {
    EVENT: 'unresponsive',
    MSG: 'APPLICATION IS UNRESPONSIVE',
  },
  UNCAUGHT_EXCEPTION: {
    EVENT: 'uncaughtException',
    MSG: 'UNCAUGHT EXCEPTION',
  },
  CRASHED: {
    EVENT: 'crashed',
    MSG: 'APPLICATION CRASHED',
  },
  LOADING_FAILED: {
    EVENT: 'did-fail-load',
    MSG: 'APPLICATION LOADING FAILED',
  },
  PLUGIN_CRASHED: {
    EVENT: 'plugin-crashed',
    MSG: 'A PLUGIN CRASHED',
  },
  DESTROYED: {
    EVENT: 'destroyed',
    MSG: 'APPLICATION DESTROYED',
  },
  ERROR: {
    EVENT: 'error',
    MSG: 'UNSPECIFIED ERROR',
  },
};

export const WebContentsEvents = {
  BEFORE_INPUT: {
    EVENT: 'before-input-event',
    MSG: 'BEFORE INPUT EVENT',
  },
};
