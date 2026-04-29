import { AppToHALCommands } from '@/constants/AppToHALCommands';
import { HALApplicationTypes } from '@/constants/HALApplicationTypes';
import { logger as mainLogger } from '@/util/Logger';
import to from 'await-to-js';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

/**
 * @class HalService
 * @description The HAL service
 */
export class HalService {
  /**
   * @constructor
   * @param {WSRequestManager} WSRequestManager - The WSRequestManager instance
   */
  constructor(WSRequestManager) {
    this.wsRequestManager = WSRequestManager;
  }

  /**
   * Initialize the HAL service
   * @returns {Promise<HalResponse>} A Promise that resolves with the HAL middleware response
   * @throws  If there is an error initializing the HAL
   */
  async initializeService() {
    logger.info('Initializing HAL...');
    if (!this.wsRequestManager) {
      logger.error('HAL Service: WSRequestManager not initialized');
      throw new Error('HAL Service: WSRequestManager not initialized');
    }

    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(
      this.wsRequestManager.sendRequest(AppToHALCommands.INIT_APP, { appId: HALApplicationTypes.LOTTERY }),
    );

    if (err) {
      logger.error(`Error initializing HAL: ${JSON.stringify(err)}`);
      throw new Error(`Error initializing HAL: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info('HAL Initialized OK!')
      : logger.error(`HAL Initialization failed: ${JSON.stringify(response.error)}`);

    return response;
  }

  /**
   * Shutdown the HAL service
   * @param {0 | 1} type - The shutdown type (0 = shutdown, 1 = reboot)
   * @returns {Promise<HalResponse>} A Promise that resolves with the HAL middleware response
   * @throws If there is an error shutting down the HAL
   */
  async shutdownTerminal(type) {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.SHUTDOWN, { type }));

    if (err) {
      logger.error(`Error shutting down Terminal: ${JSON.stringify(err)}`);
      throw new Error(`Error shutting down Terminal: ${err.message}`);
    }

    if (response && Object.keys(response).length > 0) {
      response.reply === 'OK'
        ? logger.info(`Terminal Shutdown: ${JSON.stringify(response)}`)
        : logger.error(`Terminal Shutdown Error: ${JSON.stringify(response.error)}`);
    }

    return response;
  }

  /**
   *  Get the terminal ID
   * @returns {Promise<{ terminalId: string, computerName: string }>} A Promise that resolves with
   *   an object containing the terminal ID and computer name
   * @throws If there is an error getting the terminal ID
   */
  async getTerminalId() {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.GET_TERMINAL_ID));

    if (err) {
      logger.error(`Error getting Terminal ID: ${JSON.stringify(err)}`);
      throw new Error(`Error getting Terminal ID: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info(`Terminal ID: ${JSON.stringify(response.terminalId)} --- Computer Name: ${response.computerName}`)
      : logger.error(`Terminal ID Error: ${JSON.stringify(response.error)}`);

    return {
      terminalId: response.terminalId,
      computerName: response.computerName,
    };
  }

  /**
   * Get the HAL status
   * @returns {Promise<boolean>} A Promise that resolves with the HAL status.
   * @throws If there is an error getting the HAL status
   */
  async isHALConnected() {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.IS_HAL_CONNECTED));

    if (err) {
      logger.error(`Error getting HAL Status: ${JSON.stringify(err)}`);
      throw new Error(`Error getting HAL Status: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info(`HAL Status: ${JSON.stringify(response.reply)}`)
      : logger.error(`HAL Status Error: ${JSON.stringify(response.error)}`);

    const connected = response.reply === 'OK';

    return connected;
  }

  /**
   * Switch the HAL application
   * @param {number} appId - The application ID
   * @returns {Promise<HalResponse>} A Promise that resolves with the HAL middleware response
   * @throws If there is an error switching the application
   */
  async switchApplication(appId) {
    /**
     * @type {[Error, HalResponse]}
     */
    const [err, response] = await to(this.wsRequestManager.sendRequest(AppToHALCommands.SWITCH_APP, { appId }));

    if (err) {
      logger.error(`Error switching Application: ${JSON.stringify(err)}`);
      throw new Error(`Error switching Application: ${err.message}`);
    }

    response.reply === 'OK'
      ? logger.info(`Application Switched: ${JSON.stringify(response)}`)
      : logger.error(`Application Switch Error: ${JSON.stringify(response.error)}`);

    return response;
  }
}
