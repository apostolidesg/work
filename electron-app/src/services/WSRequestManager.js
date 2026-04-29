import { WsConnectionEventNames } from '@/constants/WsConnectionEventNames';
import { ErrorCodes } from '@/mappings/ErrorCodes';

/**
 * @class WSRequestManager
 * @description Manages WebSocket requests and responses.
 */
export class WSRequestManager {
  /**
   * @constructor
   * @param {WebSocketConnection} wsConnection - The existing WebSocket connection
   *   instance.
   */
  constructor(wsConnection) {
    this.wsConnection = wsConnection;
    /**
     * @type {Map<string, PendingRequest>}
     */
    this.pendingRequests = new Map();

    this._handleResponse = this._handleResponse.bind(this);
    this._handleConnectionLoss = this._handleConnectionLoss.bind(this);

    this.wsConnection.on(WsConnectionEventNames.HAL_RESPONSE, this._handleResponse);
    this.wsConnection.on(WsConnectionEventNames.DISCONNECTED, this._handleConnectionLoss);
    this.wsConnection.on('error', this._handleConnectionLoss);
  }

  /**
   * Internal handler to process incoming responses.
   * @param {HalResponse} response - The response object from the WS server.
   * @private
   */
  _handleResponse(response) {
    const { uuid } = response;
    const pending = this.pendingRequests.get(uuid);
    if (pending) {
      const { resolve, timeout } = pending;
      clearTimeout(timeout);
      resolve(response);
      this.pendingRequests.delete(uuid);
    }
  }

  /**
   * Internal handler to handle connection loss events. Clears all pending requests and rejects them.
   * @param {string} error - The error message.
   * @private
   */
  _handleConnectionLoss(error) {
    for (const [, { reject, timeout }] of this.pendingRequests.entries()) {
      clearTimeout(timeout);
      const errMsg = error || 'WebSocket connection lost';
      reject(new Error(errMsg));
    }
    this.pendingRequests.clear();
  }

  /**
   * Sends a request over the WS connection and returns a Promise that resolves with the matching response.
   * @param {string} request - The request type.
   * @param {Object} [payload={}] - Optional additional payload data.
   * @param {number} [timeoutMs=9000] - Optional timeout in milliseconds.
   * @returns {Promise<HalResponse>} Resolves with the HAL middleware response.
   */
  async sendRequest(request, payload = {}, timeoutMs = 9000) {
    await this.wsConnection.waitForConnection();

    return new Promise((resolve, reject) => {
      // Pre-generate the message string and extract the UUID.
      const messageString = this.wsConnection.createHalMessage(request, payload);
      const message = JSON.parse(messageString);
      const { uuid } = message;

      // Set up a timeout to reject the Promise if no response is received.
      const timeout = setTimeout(() => {
        if (this.pendingRequests.has(uuid)) {
          this.pendingRequests.delete(uuid);
          this.wsConnection.emit(WsConnectionEventNames.WS_ERROR, {
            message: 'WebSocket request timed out',
            code: ErrorCodes[WsConnectionEventNames.WS_ERROR],
          });
          reject(new Error('WebSocket request timed out'));
        }
      }, timeoutMs);

      this.pendingRequests.set(uuid, { resolve, reject, timeout });

      this.wsConnection.send(request, payload, messageString);
    });
  }
}
