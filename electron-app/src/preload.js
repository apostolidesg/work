import { WsConnectionEventNames } from '@/constants/WsConnectionEventNames';
import { contextBridge, ipcRenderer } from 'electron';

/**
 * @typedef {Object} ElectronAPI
 * @property {function(string): void} connectWebSocket - Connect to WebSocket server
 * @property {function(string, Object): void} sendMessage - Send a message over WebSocket
 * @property {function(): void} disconnectWebSocket - Disconnect from WebSocket
 * @property {function(function(string, Object): void): () => void} onWebSocketStatus - Listen for connection status
 * @property {function(function(Object): void): () => void} onWebSocketMessage - Listen for messages
 * @property {function(function(HalResponse): void): () => void} onWebSocketHalResponse - Listen for HAL responses
 * @property {function(string, function(...any): void): () => void} onMainProcessEvent - Listen for specific events
 * @property {function(function(Error): void): () => void} onWebSocketError - Listen for errors
 * @property {function(string, Object): Promise<HalResponse>} wsRequest - Send a request and wait for response
 * @property {function(string, ...any): Promise<any>} invokeMain - Invoke main process and get response
 * @property {function(string, ...any): void} sendMain - Send to main process without waiting for response
 */

/**
 * Validates that a URL string is properly formatted
 * @param {string} url - The URL to validate
 * @returns {boolean} Whether the URL is valid
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Connect to WebSocket
   * @param {string} serverUrl - The WebSocket server URL
   * @returns {void}
   */
  connectWebSocket: serverUrl => {
    if (!isValidUrl(serverUrl)) {
      return;
    }
    ipcRenderer.send(WsConnectionEventNames.CONNECT_WS, serverUrl);
  },

  /**
   * Send a message to the server
   * @param {string} request - The request type
   * @param {Object} payload - The request payload
   * @returns {void}
   */
  sendMessage: (request, payload = {}) => {
    if (!request || typeof request !== 'string') {
      console.error('Invalid request type provided');
      return;
    }
    ipcRenderer.send(WsConnectionEventNames.SEND_WS_MESSAGE, request, payload);
  },

  /**
   * Disconnect from WebSocket
   * @returns {void}
   */
  disconnectWebSocket: () => {
    ipcRenderer.send(WsConnectionEventNames.DISCONNECT_WS);
  },

  /**
   * Listen for WebSocket status updates
   * @param {function(string, Object): void} callback - Status callback function
   * @returns {() => void} Function to remove this specific listener
   */
  onWebSocketStatus: callback => {
    if (typeof callback !== 'function') {
      console.error('Callback must be a function');
      return () => {};
    }

    const subscription = (_event, status, details) => callback(status, details);
    ipcRenderer.on(WsConnectionEventNames.WS_STATUS, subscription);
    return () => ipcRenderer.removeListener(WsConnectionEventNames.WS_STATUS, subscription);
  },

  /**
   * Listen for WebSocket messages
   * @param {function(Object): void} callback - Message callback function
   * @returns {() => void} Function to remove this specific listener
   */
  onWebSocketMessage: callback => {
    if (typeof callback !== 'function') {
      console.error('Callback must be a function');
      return () => {};
    }

    const subscription = (_event, message) => callback(message);
    ipcRenderer.on('ws-message', subscription);
    return () => ipcRenderer.removeListener('ws-message', subscription);
  },

  /**
   * Listen for WebSocket HAL responses
   * @param {function(HalResponse): void} callback - HAL response callback function
   * @returns {() => void} Function to remove this specific listener
   */
  onWebSocketHalResponse: callback => {
    if (typeof callback !== 'function') {
      console.error('Callback must be a function');
      return () => {};
    }

    const subscription = (_event, message) => callback(message);
    ipcRenderer.on(WsConnectionEventNames.WS_HAL_RESPONSE, subscription);
    return () => ipcRenderer.removeListener(WsConnectionEventNames.WS_HAL_RESPONSE, subscription);
  },

  /**
   * Listen for a specific event on its dedicated channel
   * @param {string} channel - The channel to listen on
   * @param {function(...any): void} callback - The callback to execute when the event occurs
   * @returns {() => void} Function to remove this specific listener
   */
  onMainProcessEvent: (channel, callback) => {
    if (!channel || typeof channel !== 'string') {
      console.error('Invalid channel provided');
      return () => {};
    }

    if (typeof callback !== 'function') {
      console.error('Callback must be a function');
      return () => {};
    }

    const subscription = (_event, ...args) => callback(...args);
    ipcRenderer.on(channel, subscription);
    return () => ipcRenderer.removeListener(channel, subscription);
  },

  /**
   * Listen for WebSocket errors
   * @param {function(Error): void} callback - Error callback function
   * @returns {() => void} Function to remove this specific listener
   */
  onWebSocketError: callback => {
    if (typeof callback !== 'function') {
      console.error('Callback must be a function');
      return () => {};
    }

    const subscription = (_event, error) => callback(error);
    ipcRenderer.on(WsConnectionEventNames.WS_ERROR, subscription);
    return () => ipcRenderer.removeListener(WsConnectionEventNames.WS_ERROR, subscription);
  },

  /**
   * Send a request to the server and wait for a response
   * @param {string} request - The request type
   * @param {Object} payload - The request payload
   * @returns {Promise<HalResponse>} Resolves with the HAL middleware response
   */
  wsRequest: async (request, payload = {}) => {
    if (!request || typeof request !== 'string') {
      return {
        uuid: `error-${Date.now()}`,
        error: 'Invalid request type provided',
        status: 400,
      };
    }

    try {
      return await ipcRenderer.invoke(WsConnectionEventNames.WS_REQUEST, request, payload);
    } catch (error) {
      return {
        uuid: `error-${Date.now()}`,
        error: error.message || 'Unknown error occurred',
        status: 500,
      };
    }
  },

  /**
   * Invoke an IPC message to the main process and wait for a response
   * @param {string} channel - The channel to send the message on
   * @param {...any} args - Arguments to send
   * @returns {Promise<any>} Resolves with the response from the main process
   */
  invokeMain: async (channel, ...args) => {
    if (!channel || typeof channel !== 'string') {
      throw new Error('Invalid channel provided');
    }

    try {
      return await ipcRenderer.invoke(channel, ...args);
    } catch (error) {
      console.error(`Error invoking main process on channel ${channel}:`, error);
      throw error;
    }
  },

  /**
   * Send an IPC message to the main process without waiting for a response
   * @param {string} channel - The channel to send the message on
   * @param {...any} args - Arguments to send
   * @returns {void}
   */
  sendMain: (channel, ...args) => {
    if (!channel || typeof channel !== 'string') {
      console.error('Invalid channel provided');
      return;
    }

    ipcRenderer.send(channel, ...args);
  },
});
