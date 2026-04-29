import axios from 'axios';
import https from 'https';
import ApiUrls from '../util/api-urls';
import Constants from '../util/Constants';
import qs from 'qs';
import Utilities from '../util/Utilities';

export default class PamApi {
  constructor(config) {
    this.config = config;
    this.apiUrls = new ApiUrls(this.config.PAM_HOST, '');
    this.instance = axios.create({
      baseURL: this.apiUrls.PAM_HOST_URL,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }

  getAccessToken(ssbtId, requestType, callback, callbackArgs) {
    this.instance
      .request({
        url: this.apiUrls.PAM_GET_TOKEN,
        method: 'POST',
        auth: {
          username: Constants.SSBT_GET_GENERIC_TOKEN.AUTHORIZATION.USERNAME,
          password: this.config.AUTH_PASS,
        },
        headers: {
          'Content-Type': Constants.CONTENT_TYPE.URLENCODED,
        },
        data: qs.stringify({
          grant_type: Constants.SSBT_GET_TOKEN.GRANT_TYPE_TERMINAL,
          scope: Constants.SSBT_GET_TOKEN.SCOPE,
          ssbtId,
        }),
      })
      .then(response => {
        response.success = true;
        callback(response, callbackArgs);
      })
      .catch(error => {
        error.response = { ...error.response, success: false };
        callback(error.response, callbackArgs);
      });
  }

  // Response data include : voucherId, amount, type, status, voucherProvider, operatorId, guid
  getVoucherInfo({ accessToken, voucherCode, callback }) {
    this.instance
      .request({
        url: this.apiUrls.PAM_GET_VOUCHER_INFO + voucherCode,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          channelId: Constants.SSBT_GET_VOUCHER_INFO.CHANNELID,
        },
      })
      .then(response => {
        response.success = true;
        callback(response, voucherCode);
      })
      .catch(error => {
        error.response = { ...error.response, success: false };
        callback(error.response, voucherCode);
      });
  }

  // Response data include : amount, status, currency
  depositVoucher({ accessToken, voucherCode, selectedGame, callback }) {
    this.instance
      .request({
        url: this.apiUrls.PAM_DEPOSIT_VOUCHER + voucherCode,
        method: 'POST',
        headers: Object.assign({}, Constants.CSRF, {
          Authorization: `Bearer ${accessToken}`,
        }),
      })
      .then(response => {
        response.success = true;
        callback(response, selectedGame);
      })
      .catch(error => {
        error.response = { ...error.response, success: false };
        callback(error.response, selectedGame);
      });
  }

  rolloverWager(accessToken, wagerId, callback) {
    this.instance
      .request({
        url: this.apiUrls.PAM_ROLLOVER.replace('{wagerId}', wagerId),
        method: 'POST',
        headers: Object.assign({}, Constants.CSRF, {
          Authorization: `Bearer ${accessToken}`,
        }),
      })
      .then(response => {
        response.success = true;
        callback(response);
      })
      .catch(error => {
        error.response = { ...error.response, success: false };
        callback(error.response);
      });
  }

  // Response data include : transactions, balance, currency, id
  getBalance(accessToken, callback) {
    this.instance
      .request({
        url: this.apiUrls.PAM_GET_BALANCE,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        response.success = true;
        callback(response);
      })
      .catch(error => {
        error.response = { ...error.response, success: false };
        callback(error.response);
      });
  }

  placeBet({ accessToken, gameType, betslip, callback }) {
    this.instance
      .request({
        url: this.apiUrls.getPlaceBetUrlByGameType(gameType),
        method: 'POST',
        headers: Object.assign({}, Constants.CSRF, {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': Constants.CONTENT_TYPE.JSON,
        }),
        data: betslip.ilotFormat(),
      })
      .then(response => {
        response.success = true;
        callback(response);
      })
      .catch(error => {
        console.log(`placeBetVoucher - ${error}`);
        error.response = { ...error.response, success: false };
        callback(error.response);
      });
  }

  cashOut(accessToken, switchApp, callback) {
    this.instance
      .request({
        url: this.apiUrls.PAM_CASH_OUT,
        method: 'POST',
        headers: Object.assign({}, Constants.CSRF, {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': Constants.CONTENT_TYPE.JSON,
        }),
      })
      .then(response => {
        callback(response, switchApp);
      })
      .catch(error => {
        console.log(`cashOut - ${error}`);
        error.response = { ...error.response, success: false };
        callback(error.response, switchApp);
      });
  }

  findWinnings(genericAccessToken, findWinnings, barcode, callback) {
    const serialNumber = Utilities.setupL5Barcode(barcode);
    this.instance
      .request({
        url: this.apiUrls.FIND_WINNINGS.replace('{serialNumber}', serialNumber),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${genericAccessToken}`,
        },
      })
      .then(response => {
        response.success = true;
        callback(response, barcode);
      })
      .catch(error => {
        throw error.response;
      });
  }

  logOut(accessToken, switchApp, callback) {
    this.instance
      .request({
        url: this.apiUrls.PAM_LOGOUT,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        response.success = true;
        callback(response, switchApp);
      })
      .catch(error => {
        error.response = { ...error.response, success: false };
        callback(error.response, switchApp);
      });
  }

  getWager(genericAccessToken, terminalId, barcode, callbackArgs, callback) {
    this.instance
      .request({
        url: this.apiUrls.PAM_GET_WAGER.replace('{serialNumber}', barcode),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${genericAccessToken}`,
        },
        params: {
          replayWager: true,
          terminalId,
        },
      })
      .then(response => {
        response.success = true;
        callback(response, barcode, callbackArgs);
      })
      .catch(error => {
        error.response = { ...error.response, success: false };
        callback(error.response, barcode, callbackArgs);
      });
  }
}
