import { AppToHALCommands } from '@/constants/AppToHALCommands';
import { WsConnectionEventNames } from '@/constants/WsConnectionEventNames';
import { logger as mainLogger } from '@/util/Logger';
import { randomUUID } from 'node:crypto';
import { EventEmitter } from 'node:events';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

/**
 * @class MockWebSocketConnection
 * @description Mock class for WebSocketConnection for testing purposes
 */
export class MockWebSocketConnection extends EventEmitter {
  constructor(options = {}) {
    super();
    this.config = {
      maxReconnectAttempts: 5,
      reconnectInterval: 3000,
      ...options,
    };

    this.readyState = 'CLOSED'; // 'CONNECTING'|'OPEN'|'CLOSING'|'CLOSED'
    this.serverUrl = null;
    this.reconnectAttempts = 0;
    this.reconnectTimer = null;
    this.manualDisconnect = false;
    this.isConnecting = false;
    this.sentMessages = [];
    this.mockResponses = [];
    this.autoRespond = true;
    this.responseDelay = 300;
    this.errorRate = 0;
  }

  /**
   * Create a standardized WebSocket message for HAL requests
   * @param {string} request - The request type
   * @param {Object} [payload={}] - Additional message payload
   * @returns {string} Stringified JSON message
   */
  createHalMessage(request, payload = {}) {
    return JSON.stringify({
      uuid: randomUUID(),
      request,
      ...payload,
    });
  }

  /**
   * Sends a message through the mock WebSocket
   * @param {string} request - Request type
   * @param {Object} [payload={}] - Optional message payload
   * @param {string} [messageString=''] - Optional pre-formatted message
   */
  send(request, payload = {}, messageString = '') {
    const message = { request, payload, raw: messageString || this.createHalMessage(request, payload) };
    const { uuid } = JSON.parse(message.raw);
    this.sentMessages.push(message);

    switch (this.readyState) {
      case 'CONNECTING':
        this.emitError(new Error('Cannot send message: Connecting in progress'));
        return;
      case 'OPEN':
        if (this.autoRespond) {
          setTimeout(() => {
            if (Math.random() < this.errorRate) {
              this.emitError(new Error('Mock error response'));
            } else if (this.mockResponses.length) {
              this.emit(WsConnectionEventNames.HAL_RESPONSE, this.mockResponses.shift());
            } else {
              this.emit(WsConnectionEventNames.HAL_RESPONSE, this._generateAutoResponse(uuid, request));
            }
          }, this.responseDelay);
        }
        break;
      case 'CLOSING':
        this.emitError(new Error('Cannot send message: Connection is closing'));
        break;
      case 'CLOSED':
        this.emitError(new Error('Cannot send message: Connection is closed'));
        break;
    }
  }

  /**
   * Sets up mock responses to be emitted when messages are sent
   * @param {Array<string>} responses - Array of mock responses
   */
  setMockResponses(responses) {
    this.mockResponses = [...responses];
  }

  /**
   * Simulates a connection opening
   * @param {string} serverUrl - WebSocket server URL
   * @param {number} [_timeoutMs=9000] - Connection timeout (unused in mock)
   */
  connect(serverUrl, _timeoutMs = 9000) {
    if (this.isConnecting) {
      logger.info('Connection attempt already in progress');
      return;
    }

    this.serverUrl = serverUrl;
    this.readyState = 'CONNECTING';
    this.isConnecting = true;

    // Simulate connection delay
    setTimeout(() => {
      if (Math.random() < this.errorRate) {
        this._handleConnectionFailure();
      } else {
        this._onOpen();
      }
    }, this.responseDelay);
  }

  /**
   * Simulates a connection closing
   * @param {Object} [options] - Disconnect options
   * @param {boolean} [options.manual=true] - Manual disconnect flag
   */
  disconnect({ manual = true } = {}) {
    this.manualDisconnect = manual;
    this.stopReconnectAttempts();
    this.readyState = 'CLOSED';
    this.isConnecting = false;
    this.emit(WsConnectionEventNames.DISCONNECTED);
  }

  /**
   * Stop reconnection attempts
   */
  stopReconnectAttempts() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * Reset connection state
   */
  reset() {
    logger.info('Resetting connection state');
    this.disconnect({ manual: true });
    this.reconnectAttempts = 0;
    this.isConnecting = false;
    this.manualDisconnect = false;
    this.sentMessages = [];
    this.mockResponses = [];
  }

  /**
   * Simulates an error event
   * @param {Error} error - The error to emit
   */
  emitError(error) {
    this.emit('error', error.message ?? error.toString());
  }

  /**
   * Gets the sent messages
   * @returns {Array<Object>} - Array of sent messages
   */
  getSentMessages() {
    return this.sentMessages;
  }

  /**
   * Waits for connection to be established
   * @param {number} [timeoutMs=9000] - Timeout in milliseconds
   * @returns {Promise<void>} Resolves when connected
   */
  async waitForConnection(timeoutMs = 9000) {
    if (this.readyState === 'OPEN') return Promise.resolve();

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.off(WsConnectionEventNames.CONNECTED, onConnected);
        reject(new Error('Timeout waiting for WebSocket connection'));
      }, timeoutMs);

      const onConnected = () => {
        clearTimeout(timeout);
        this.off(WsConnectionEventNames.CONNECTED, onConnected);
        resolve();
      };

      this.on(WsConnectionEventNames.CONNECTED, onConnected);
    });
  }

  /**
   * Configure mock behavior
   * @param {Object} options - Configuration options
   * @param {boolean} [options.autoRespond] - Auto respond to messages
   * @param {number} [options.responseDelay] - Response delay in ms
   * @param {number} [options.errorRate] - Error rate (0-1)
   */
  configure({ autoRespond, responseDelay, errorRate } = {}) {
    this.autoRespond = autoRespond ?? this.autoRespond;
    this.responseDelay = responseDelay ?? this.responseDelay;
    this.errorRate = errorRate ?? this.errorRate;
  }

  /**
   * Handle successful connection
   * @private
   */
  _onOpen() {
    logger.info('Mock WebSocket connection established');
    this.readyState = 'OPEN';
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.stopReconnectAttempts();
    this.emit(WsConnectionEventNames.CONNECTED);
  }

  /**
   * Handle connection failure
   * @private
   */
  _handleConnectionFailure() {
    logger.info('Mock connection failure');
    this.isConnecting = false;
    this.reconnectAttempts++;

    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      logger.info('Max reconnection attempts reached');
      this.emit(WsConnectionEventNames.RECONNECT_FAILED);
    } else {
      this.emit(WsConnectionEventNames.RECONNECTING, {
        attempt: this.reconnectAttempts,
        maxAttempts: this.config.maxReconnectAttempts,
      });

      this.reconnectTimer = setTimeout(() => {
        this.connect(this.serverUrl);
      }, this.config.reconnectInterval);
    }
  }

  /**
   * Generate automatic response
   * @private
   * @param {string} uuid - The UUID of the request
   * @param {string} request - The request type
   * @returns {Object} The automatic response
   */
  _generateAutoResponse(uuid, request) {
    logger.info(`Generating automatic response for ${request} with UUID ${uuid}`);

    const baseResponse = {
      uuid,
      reply: 'OK',
      status: 200,
    };

    switch (request) {
      case AppToHALCommands.GET_TERMINAL_ID:
        return {
          ...baseResponse,
          terminalId: '10102351',
          computerName: '101023HPT01',
        };
      case AppToHALCommands.GET_PRINTER_STATUS:
        return {
          ...baseResponse,
          status: 0,
        };
      case AppToHALCommands.GET_PRINTER_SPECS:
        return {
          ...baseResponse,
          specs: {
            bitsPerWidth: 576,
            bytesPerWidth: 72,
            dpiX: 200,
            dpiY: 200,
            logoLines: 80,
            maxBufferLines: 1661,
          },
        };
      case AppToHALCommands.GET_BCR_STATUS:
        return {
          ...baseResponse,
          status: 0,
        };
      case AppToHALCommands.CALCULATE_CRC:
        return {
          ...baseResponse,
          crc: '53091',
        };
      case AppToHALCommands.GENERATE_ISECURE:
        return {
          ...baseResponse,
          iSecure: {
            hashes: [1367995529, 3408423820, 3675735018, 606890810, 1100399384, 4048235464, 1680657804, 1148678182],
            randomNumbers: [41, 18467],
          },
        };
      case AppToHALCommands.GET_HASH_FROM_RANDOM_NUMBERS:
        return {
          ...baseResponse,
          iSecure: {
            hashes: [4253103642, 374791833, 495044991, 2258102757, 3150558906, 3963564761, 1881678275, 1725441960],
            randomNumbers: [2956442611, 1643044457],
          },
        };
      default:
        return baseResponse;
    }
  }
}
