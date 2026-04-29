import { logger as mainLogger } from '@/util/Logger';
import axios from 'axios';
import HttpStatus from 'http-status';
import https from 'node:https';
import querystring from 'node:querystring';

const logger = process.env.FORGE_NODE_ENV === 'development' ? console : mainLogger;

const PAM_URLS = {
  ACCESS: {
    genericTokenUrl: '/web/access/oidc/token',
  },
  CUSTOMER: {
    registerUrl: '/web/customer/rest/v1-opap/players/ssbt',
  },
};

/**
 * @class SsbtApi
 * @description The ssbt api
 */
export class SsbtApi {
  /**
   * @constructor
   * @param {Object} config - The configuration object.
   */
  constructor(config) {
    this.config = config;
    this.instance = axios.create({
      baseURL: this.config.pamProperties.protocol + '://' + this.config.pamProperties.host,
      timeout: 10000,
      headers: {
        'x-csrftoken': 'X',
        Cookie: 'csrftoken=X',
        'Cache-Control': 'no-cache',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }

  /**
   * Get the token.
   * @returns {Promise<any>} A promise that resolves with the token.
   */
  async getToken() {
    return await this.instance
      .request({
        url: PAM_URLS.ACCESS.genericTokenUrl,
        method: 'POST',
        data: querystring.stringify({ grant_type: 'client_credentials' }),
        auth: {
          username: 'ssbts',
          password: this.config.pamProperties.authPass,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(function (response) {
        logger.info(
          'REQUEST: ' +
            response.config.method.toUpperCase() +
            ' ' +
            response.config.url +
            ' ||| RESPONSE: ' +
            response.status +
            ' ' +
            response.statusText +
            '; ==> ' +
            JSON.stringify(response.data),
        );
        return response.data.access_token;
      })
      .catch(error => {
        if (error.response) {
          logger.error(
            'REQUEST: ' +
              error.config.method.toUpperCase() +
              ' ' +
              error.config.url +
              ' ||| RESPONSE: ' +
              error.response.status +
              ' ' +
              error.response.statusText +
              '; ==> ' +
              JSON.stringify(error.response.data),
          );
        } else {
          logger.error(
            'REQUEST: ' +
              error.config.method.toUpperCase() +
              ' ' +
              error.config.url +
              ' ||| An error occured while sending the HTTP request. Reason: ' +
              error.code +
              ', Message: ' +
              error.message,
          );
        }
        return null;
      });
  }

  /**
   * Register the terminal.
   * @param {string} terminalId - The terminal ID.
   * @param {string} token - The token.
   * @returns {Promise<boolean>} A promise that resolves with the registration status.
   */
  async register(terminalId, token) {
    return await this.instance
      .request({
        url: PAM_URLS.CUSTOMER.registerUrl,
        method: 'POST',
        data: {
          username: terminalId,
        },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(function (response) {
        logger.info(
          'REQUEST: ' +
            response.config.method.toUpperCase() +
            ' ' +
            response.config.url +
            ' ||| RESPONSE: ' +
            response.status +
            ' ' +
            response.statusText +
            '; ==> ' +
            JSON.stringify(response.data),
        );
        return response.status === HttpStatus.OK;
      })
      .catch(function (error) {
        if (error.response)
          logger.error(
            'REQUEST: ' +
              error.config.method.toUpperCase() +
              ' ' +
              error.config.url +
              ' ||| RESPONSE: ' +
              error.response.status +
              ' ' +
              error.response.statusText +
              '; ==> ' +
              JSON.stringify(error.response.data),
          );
        else
          logger.error(
            'REQUEST: ' +
              error.config.method.toUpperCase() +
              ' ' +
              error.config.url +
              ' ||| An error occured while sending the HTTP request. Reason: ' +
              error.code +
              ', Message: ' +
              error.message,
          );
        return false;
      });
  }
}
