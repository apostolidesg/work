import { checkApi } from '@/apis/check-api';
import { logger as mainLogger } from '@/util/Logger';
import { HttpService } from './HttpService';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

/**
 * @class ServiceStatusChecker
 * @description The service status checker
 */
export class ServiceStatusChecker {
  /**
   * @constructor
   * @param {Object} config - The configuration object.
   * @param {string} terminalId - The terminal ID.
   */
  constructor(config, terminalId) {
    this.httpService = new HttpService();
    this.config = config;
    this.terminalId = terminalId;
  }

  /**
   * Get the service status.
   * @returns {Promise<Object>} A promise that resolves to the service status.
   */
  async getServiceStatus() {
    logger.info('Starting service connectivity check.');
    return await this.httpService
      .sendRequest({
        baseURL: `${this.config.pamProperties.protocol}://${this.config.pamProperties.host}`,
        url: checkApi.statusCheck,
        headers: {
          'Cache-Control': 'no-cache',
        },
        params: {
          terminalId: this.terminalId,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}
