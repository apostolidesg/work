import { AppToHALCommands } from '@/constants/AppToHALCommands';
import { logger as mainLogger } from '@/util/Logger';
import to from 'await-to-js';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

/**
 * @class BarcodeService
 * @description The barcode service
 */
export class BarcodeService {
  /**
   * @constructor
   * @param {WSRequestManager} WSRequestManager - The WSRequestManager instance
   */
  constructor(WSRequestManager) {
    this.wsRequestManager = WSRequestManager;
  }

  /**
   * Initialize the barcode service
   * @returns {Promise<HalResponse>} A promise that resolves with the HAL middleware response.
   * @throws If an error occurs during initialization.
   */
  async initializeService() {
    logger.info('Initializing Barcode Service...');
    if (!this.wsRequestManager) {
      logger.error('Barcode Service: WSRequestManager is not initialized');
      throw new Error('Barcode Service: WSRequestManager is not initialized');
    }

    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.INIT_BCR));

    if (err) {
      logger.error(`Error initializing Barcode Service: ${JSON.stringify(err)}`);
      throw new Error(`Error initializing Barcode Service: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info('Barcode Service Initialized OK!')
      : logger.error(`Barcode Service Initialization failed: ${JSON.stringify(response.error)}`);

    return response;
  }

  /**
   * Get the barcode status
   * @returns {Promise<number>} A promise that resolves with the barcode status.
   * @throws If an error occurs during status retrieval.
   */
  async getBarcodeStatus() {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.GET_BCR_STATUS));

    if (err) {
      logger.error(`Error getting Barcode Status: ${JSON.stringify(err)}`);
      throw new Error(`Error getting Barcode Status: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info(`Barcode Status: ${JSON.stringify(response.status)}`)
      : logger.error(
          `Barcode Status Error: ${JSON.stringify(response.error)} | Status: ${JSON.stringify(response.status)}`,
        );

    const barcodeStatus = response.status;

    return barcodeStatus;
  }
}
