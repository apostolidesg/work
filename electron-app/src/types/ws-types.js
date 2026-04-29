/**
 * @typedef {Object} HalResponse
 * @property {string} uuid
 * @property {'OK'} [reply]
 * @property {1|2|string|never} [error]
 * @property {number} [status]
 * @property {string} [terminalId]
 * @property {string} [computerName]
 * @property {Object} [specs]
 * @property {Object} [rmsPrinterInfo]
 * @property {string} [base64Image]
 * @property {string} [base64Bitmap]
 * @property {string} [crc]
 * @property {HalISecure} [iSecure]
 */

/**
 * @typedef {Object} HalISecure
 * @property {number[]} hashes
 * @property {number[]} randomNumbers
 */

/**
 * @typedef {Object} ISecure
 * @property {number[]} hashes
 * @property {string[]} randomNumbers
 */

/**
 * @typedef {Object} PendingRequest
 * @property {function(any): void} resolve - The function to call when the response is received.
 * @property {function(Error): void} reject - The function to call when the request times out or an error occurs.
 * @property {NodeJS.Timeout} timeout - The ID of the timeout (returned by setTimeout).
 */

/**
 * @typedef {import('../services/WebSocketConnection').WebSocketConnection} WebSocketConnection
 */

/**
 * @typedef {import('../services/WSRequestManager').WSRequestManager} WSRequestManager
 */

/**
 * @typedef {import('electron').BrowserWindow} BrowserWindow
 */
