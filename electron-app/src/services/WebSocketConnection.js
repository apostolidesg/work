import { WsConnectionEventNames } from '@/constants/WsConnectionEventNames';
import { ErrorCodes } from '@/mappings/ErrorCodes';
import { logger as mainLogger } from '@/util/Logger';
import { randomUUID } from 'node:crypto';
import EventEmitter from 'node:events';
import WebSocket from 'ws';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

/**
 * @class WebSocketConnection
 * @description Manages WebSocket connection and event handling
 */
export class WebSocketConnection extends EventEmitter {
  /**
   * @constructor
   * @param {Object} [options={}] - Configuration options
   */
  constructor(options = {}) {
    super();

    this.config = {
      ...options,
    };

    this.socket = null;
    this.serverUrl = null;
    this.manualDisconnect = false;
    this.isConnecting = false;
  }

  /**
   * Create a standardized WebSocket message for HAL requests
   * @param {string} request - The request type
   * @param {Object} [payload={}] - Additional message payload
   * @returns {string} Stringified JSON message
   */
  createHalMessage(request, payload = {}) {
    return JSON.stringify(
      {
        uuid: randomUUID(),
        request,
        ...payload,
      },
      null,
      2,
    );
  }

  /**
   * Establish WebSocket connection
   * @param {string} serverUrl - WebSocket server URL
   */
  connect(serverUrl) {
    logger.info('Connecting to WebSocket server');
    if (this.isConnecting) {
      logger.info('Connection attempt already in progress');
      return;
    }

    this.manualDisconnect = false;
    this.isConnecting = true;
    this.serverUrl = serverUrl;

    try {
      if (this.socket) {
        this.socket.removeAllListeners();
        this.socket = null;
      }

      this.socket = new WebSocket(serverUrl);

      this.socket.on('open', this._onOpen.bind(this));
      this.socket.on('message', this._onMessage.bind(this));
      this.socket.on('close', this._onClose.bind(this));
      this.socket.on('error', this._onError.bind(this));
    } catch (error) {
      logger.error(`WebSocket connection error: ${error.message}`);
      this.isConnecting = false;
      this._handleConnectionFailure();
    }
  }

  /**
   * Send a message through the WebSocket
   * @param {string} request - Request type
   * @param {Object} [payload={}] - Optional message payload
   * @param {string} [messageString=''] - Optional message string, using it when sending async requests
   *   to the WebSocket server via WSRequestManager
   */
  send(request, payload = {}, messageString = '') {
    if (!this.socket) {
      this.emit(WsConnectionEventNames.WS_ERROR, {
        message: 'Cannot send message: WebSocket connection is null',
        code: ErrorCodes[WsConnectionEventNames.WS_ERROR],
      });
      return;
    }

    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        this.emit(WsConnectionEventNames.WS_ERROR, {
          message: 'Cannot send message: Connecting in progress',
          code: ErrorCodes[WsConnectionEventNames.WS_ERROR],
        });
        break;
      case WebSocket.OPEN:
        try {
          const messageStr = messageString || this.createHalMessage(request, payload);
          this.socket.send(messageStr);
        } catch (error) {
          this.emit(WsConnectionEventNames.WS_ERROR, {
            message: `Message creation error: ${error.message}`,
            code: ErrorCodes[WsConnectionEventNames.WS_ERROR],
          });
        }
        break;
      case WebSocket.CLOSING:
        this.emit(WsConnectionEventNames.WS_ERROR, {
          message: 'Cannot send message: Connection is closing',
          code: ErrorCodes[WsConnectionEventNames.WS_ERROR],
        });
        break;
      case WebSocket.CLOSED:
        this.emit(WsConnectionEventNames.WS_ERROR, {
          message: 'Cannot send message: Connection is closed',
          code: ErrorCodes[WsConnectionEventNames.WS_ERROR],
        });
        break;
      default:
        this.emit(WsConnectionEventNames.WS_ERROR, {
          message: 'Cannot send message: Unknown socket state',
          code: ErrorCodes[WsConnectionEventNames.WS_ERROR],
        });
        break;
    }
  }

  /**
   * Disconnect from WebSocket
   * @param {Object} options - Options for the disconnection process
   * @param {boolean} [options.manual=true] - Whether to perform a manual disconnection
   */
  disconnect({ manual = true } = {}) {
    logger.info(`Disconnecting from WebSocket server: ${manual ? 'manual' : 'automatic'}`);
    this.manualDisconnect = manual;

    if (this.socket) {
      if (this.socket.readyState === WebSocket.OPEN) {
        try {
          this.socket.close(1000, 'Normal closure');
        } catch (error) {
          logger.error(`Error closing WebSocket connection: ${error.message}`);
          this.socket.terminate();
        } finally {
          this.emit(WsConnectionEventNames.DISCONNECTED);
        }
      }

      this.socket.removeAllListeners();
      this.socket = null;
    }

    this.isConnecting = false;
  }

  /**
   * Waits for the WebSocket connection to open before proceeding.
   * @param {number} [timeoutMs] - Optional timeout in milliseconds.
   * @returns {Promise<void>} Resolves when the connection is established.
   */
  waitForConnection(timeoutMs = 9000) {
    return new Promise((resolve, reject) => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        return resolve();
      }

      if (this.socket?.readyState === WebSocket.CLOSED) {
        this.connect(this.serverUrl);
      }

      const onConnected = () => {
        clearTimeout(timeout);
        this.off(WsConnectionEventNames.CONNECTED, onConnected);
        this.off(WsConnectionEventNames.WS_CONNECTION_FAILED, onConnectionFailed);
        resolve();
      };

      const onConnectionFailed = () => {
        clearTimeout(timeout);
        this.off(WsConnectionEventNames.CONNECTED, onConnected);
        this.off(WsConnectionEventNames.WS_CONNECTION_FAILED, onConnectionFailed);
        reject(new Error('Timeout waiting for WebSocket connection'));
      };

      const timeout = setTimeout(() => {
        this.emit(WsConnectionEventNames.WS_CONNECTION_FAILED, {
          message: 'Timeout waiting for WebSocket connection',
          code: ErrorCodes[WsConnectionEventNames.WS_CONNECTION_FAILED],
        });
      }, timeoutMs);

      this.on(WsConnectionEventNames.CONNECTED, onConnected);
      this.on(WsConnectionEventNames.WS_CONNECTION_FAILED, onConnectionFailed);
    });
  }

  /**
   * Reset connection state
   */
  reset() {
    logger.info('Resetting connection state');
    this.disconnect({ manual: true });
    this.isConnecting = false;
    this.manualDisconnect = false;
  }

  /**
   * Process incoming messages
   * @param {Object} message - The parsed JSON message
   * @private
   */
  _processMessage(message) {
    if (message.event) {
      this.emit(message.event, message);
    } else {
      this.emit(WsConnectionEventNames.HAL_RESPONSE, message);
    }
  }

  /**
   * Handle WebSocket open event
   * @private
   */
  _onOpen() {
    logger.info('WebSocket connection established');
    this.isConnecting = false;
    this.emit(WsConnectionEventNames.CONNECTED);
  }

  /**
   * Handle incoming WebSocket messages
   * @param {Buffer|string} rawData - Raw message data
   * @private
   */
  _onMessage(rawData) {
    try {
      const message = JSON.parse(rawData.toString());
      this._processMessage(message);
    } catch (error) {
      logger.error(`Error parsing WebSocket message: ${error.message}`);
      this.emit(WsConnectionEventNames.WS_ERROR, {
        message: `Message parsing error: ${error.message}`,
        code: ErrorCodes[WsConnectionEventNames.WS_ERROR],
      });
    }
  }

  /**
   * Handle WebSocket close event
   * @param {number} code - The status code explaining why the connection has been closed
   * @param {string|Buffer} reason - Contains a human-readable string explaining why the connection has been closed
   * @private
   */
  _onClose(code, reason) {
    const reasonStr = Buffer.isBuffer(reason) ? reason.toString('utf8') : reason;
    logger.info(`WebSocket connection closed. Code: ${code}, Reason: ${reasonStr}`);

    // Handle the closed connection
    this._handleConnectionFailure();
  }

  /**
   * Handle WebSocket error event
   * @param {Error} error - WebSocket error
   * @private
   */
  _onError(error) {
    const errorMessage = Buffer.isBuffer(error) ? error.toString('utf8') : error.message;
    const message = errorMessage || 'Unknown WebSocket error';
    logger.error(`WebSocket error: ${message}`);
    this.emit(WsConnectionEventNames.WS_ERROR, {
      message: `WebSocket error: ${message}`,
      code: ErrorCodes[WsConnectionEventNames.WS_ERROR],
    });
    this._handleConnectionFailure();
  }

  /**
   * Handle connection failure
   * @private
   */
  _handleConnectionFailure() {
    logger.info('Handling connection failure');
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket = null;
    }

    this.isConnecting = false;

    if (this.manualDisconnect) {
      this.emit(WsConnectionEventNames.DISCONNECTED);
    }
  }
}
