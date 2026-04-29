import { AppToHALCommands } from '@/constants/AppToHALCommands';
import { logger as mainLogger } from '@/util/Logger';
import to from 'await-to-js';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

/**
 * @class PrinterService
 * @description The printer service
 */
export class PrinterService {
  /**
   * @constructor
   * @param {WSRequestManager} WSRequestManager - The WSRequestManager instance
   */
  constructor(WSRequestManager) {
    this.wsRequestManager = WSRequestManager;
    this._resizeOptions = {
      width: 640,
    };
  }

  /**
   * Initialize the printer service
   * @returns {Promise<HalResponse>} A Promise that resolves with the HAL middleware response.
   * @throws If an error occurs initializing the printer service
   */
  async initializeService() {
    logger.info('Initializing Printer Service...');
    if (!this.wsRequestManager) {
      logger.error('Printer Service: WSRequestManager is not initialized');
      throw new Error('Printer Service: WSRequestManager is not initialized');
    }

    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.INIT_PRINTER));

    if (err) {
      logger.error(`Error initializing Printer Service: ${JSON.stringify(err)}`);
      throw new Error(`Error initializing Printer Service: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info('Printer Service Initialized OK!')
      : logger.error(`Printer Service Initialization failed: ${JSON.stringify(response.error)}`);

    return response;
  }

  /**
   * Get the printer specs
   * @returns {Promise<Object>} A Promise that resolves with the printer specs.
   * @throws If an error occurs getting the printer specs
   */
  async getPrinterSpecs() {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.GET_PRINTER_SPECS));

    if (err) {
      logger.error(`Error getting Printer Specs: ${JSON.stringify(err)}`);
      throw new Error(`Error getting Printer Specs: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info(`Printer Specs: ${JSON.stringify(response.specs)}`)
      : logger.error(`Printer Specs Error: ${JSON.stringify(response.error)}`);

    const printerSpecs = response.specs;

    return printerSpecs;
  }

  /**
   * Get the printer status
   * @returns {Promise<number>} A Promise that resolves with the printer status.
   * @throws If an error occurs getting the printer status
   */
  async getPrinterStatus() {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.GET_PRINTER_STATUS));

    if (err) {
      logger.error(`Error getting Printer Status: ${JSON.stringify(err)}`);
      throw new Error(`Error getting Printer Status: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info(`Printer Status: ${JSON.stringify(response.status)}`)
      : logger.error(
          `Printer Status Error: ${JSON.stringify(response.error)} | Status: ${JSON.stringify(response.status)}`,
        );

    const printerStatus = response.status;

    return printerStatus;
  }

  /**
   * Print a bitmap from base64
   * @param {string} base64 - The base64 string
   * @param {number} [threshold=170] - The threshold for the bitmap
   * @param {string} [wagerID='NO'] - The wager ID
   * @param {boolean} [includePrinterInfo=false] - Whether to include printer info
   * @returns {Promise<HalResponse>} A Promise that resolves with the HAL middleware response.
   * @throws If an error occurs printing the bitmap
   */
  async printBitmapFromBase64(base64, threshold = 170, wagerID = 'NO', includePrinterInfo = false) {
    try {
      if (!base64 || typeof base64 !== 'string' || base64.length === 0) {
        logger.error('Invalid base64 string');
        throw new Error('Invalid base64 string');
      }

      const payload = {
        base64: base64.split(',')[1],
        threshold,
        wagerID,
        ...(includePrinterInfo && { rmsPrinterInfo: true }),
      };

      const response = await this.wsRequestManager.sendRequest(AppToHALCommands.PRINT_BITMAP_FROM_BASE64, payload);

      const errorMessages = {
        1: 'Reprint allowed error',
        2: 'Reprint not allowed error',
        default: 'Unknown print error',
      };

      if (response.reply !== 'OK') {
        const { error } = response;
        const errorMsg = errorMessages[error] || errorMessages.default;
        logger.error(`Print failed: ${errorMsg}`);
        throw new Error(`Print failed: ${errorMsg}`);
      }

      return response;
    } catch (err) {
      logger.error(`Print failed: ${err.message}`);
      throw new Error(`Print failed: ${err.message}`);
    }
  }
}
