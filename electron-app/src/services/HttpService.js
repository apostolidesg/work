import { logger as mainLogger } from '@/util/Logger';
import axios from 'axios';
import https from 'node:https';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

/**
 * @class HttpService
 * @description The http service
 */
export class HttpService {
  constructor() {
    this.client = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      timeout: 10000,
    });
  }
  /**
   * Sends a request over the HTTP connection and returns a Promise that resolves with the matching response.
   * @param {Object} requestParams - The request parameters.
   * @returns {Promise<Object>} Resolves with the HTTP server's response.
   */
  async sendRequest(requestParams) {
    try {
      const response = await this.client.request(requestParams);
      logger.info(
        `REQUEST: ${response.config.method.toUpperCase()} ${response.config.url} ||| ` +
          `RESPONSE: ${response.status} ${response.statusText}; ==> ${JSON.stringify(response.data)}`,
      );
      return response;
    } catch (error) {
      logger.error(
        `REQUEST: ${error.config.method.toUpperCase()} ${error.config.url} ||| ` +
          `An error occured while sending the HTTP request. Reason: ${error.code}, Message: ${error.message}`,
      );
      throw error instanceof Error ? error : new Error(JSON.stringify(error));
    }
  }
}
