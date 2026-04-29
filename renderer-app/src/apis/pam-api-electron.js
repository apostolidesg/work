// import to from 'await-to-js';
import qs from 'qs';
import EventSenderService from '@/util/handler/EventSenderService';
import EventTypes from '@/util/handler/EventTypes';
import RequestType from '@/constants/RequestTypes';
import ApiUrls from '@/util/api-urls';
import Constants from '@/util/Constants';
import Utilities from '@/util/Utilities';

export default class PamApiElectron {
  constructor(config) {
    this.config = config;
    this.apiUrls = new ApiUrls(this.config.PAM_HOST, '');
  }

  getAccessToken(ssbtId, requestType, ...callbackArgs) {
    EventSenderService.sendAsyncRequest(
      EventTypes.SEND_REQUEST,
      requestType,
      {
        baseURL: this.apiUrls.PAM_HOST_URL,
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
      },
      ...callbackArgs
    );
  }

  // Response data include : voucherId, amount, type, status, voucherProvider, operatorId, guid
  // getVoucherInfo({ accessToken, voucherCode }) {
  //   EventSenderService.sendAsyncRequest(
  //     EventTypes.SEND_REQUEST,
  //     RequestType.GET_VOUCHER_INFO,
  //     {
  //       baseURL: this.apiUrls.PAM_HOST_URL,
  //       url: this.apiUrls.PAM_GET_VOUCHER_INFO + voucherCode,
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     },
  //     voucherCode
  //   );
  // }

  // Response data include : amount, status, currency
  // depositVoucher({ accessToken, voucherCode, selectedGame }) {
  //   EventSenderService.sendAsyncRequest(
  //     EventTypes.SEND_REQUEST,
  //     RequestType.DEPOSIT_VOUCHER,
  //     {
  //       baseURL: this.apiUrls.PAM_HOST_URL,
  //       url: this.apiUrls.PAM_DEPOSIT_VOUCHER + voucherCode,
  //       method: 'POST',
  //       headers: Object.assign({}, Constants.CSRF, {
  //         Authorization: `Bearer ${accessToken}`,
  //       }),
  //     },
  //     selectedGame
  //   );
  // }

  // async rolloverWager(accessToken, wagerId, callback, doReplay) {
  //   const data = { isecure: [] };
  //   if (Utilities.isL10Version(wagerId, 1)) {
  //     const wagerIdObj = Utilities.extractFromL10SerialNumber(wagerId);
  //     const [err, iSecure] = await to(EventSenderService.sendSyncRequest(EventTypes.REQUEST_ISECURE_HASH, wagerIdObj));
  //     if (!err) {
  //       data.isecure = iSecure.hashes;
  //     }
  //     wagerId = wagerIdObj.serialNumber;
  //   }
  //   EventSenderService.sendAsyncRequest(
  //     EventTypes.SEND_REQUEST,
  //     RequestType.ROLLOVER,
  //     {
  //       baseURL: this.apiUrls.PAM_HOST_URL,
  //       url: this.apiUrls.PAM_ROLLOVER.replace('{wagerId}', wagerId),
  //       method: 'POST',
  //       headers: Object.assign({}, Constants.CSRF, {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Content-Type': Constants.CONTENT_TYPE.JSON,
  //       }),
  //       data: JSON.stringify(data),
  //     },
  //     wagerId,
  //     doReplay
  //   );
  // }

  // Response data include : transactions, balance, currency, id
  getBalance(accessToken) {
    EventSenderService.sendAsyncRequest(EventTypes.SEND_REQUEST, RequestType.GET_BALANCE, {
      baseURL: this.apiUrls.PAM_HOST_URL,
      url: this.apiUrls.PAM_GET_BALANCE,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  /**
   * Place a bet for a specific game
   * @param {Object} params - The bet parameters
   * @param {string} params.accessToken - The access token for authentication
   * @param {string} params.gameType - The game type (e.g., EUROJACKPOT, TZOKER, FIREBLAZE)
   * @param {Object} params.betslip - The betslip object with ilotFormat() method
   */
  placeBet({ accessToken, gameType, betslip }) {
    EventSenderService.sendAsyncRequest(
      EventTypes.SEND_REQUEST,
      RequestType.PLACE_BET,
      {
        baseURL: this.apiUrls.PAM_HOST_URL,
        url: this.apiUrls.getPlaceBetUrlByGameType(gameType),
        method: 'POST',
        headers: Object.assign({}, Constants.CSRF, {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': Constants.CONTENT_TYPE.JSON,
        }),
        data: betslip.ilotFormat(),
      },
      gameType,
      betslip
    );
  }

  cashOut(accessToken, switchApp) {
    EventSenderService.sendAsyncRequest(
      EventTypes.SEND_REQUEST,
      RequestType.CASH_OUT,
      {
        baseURL: this.apiUrls.PAM_HOST_URL,
        url: this.apiUrls.PAM_CASH_OUT,
        method: 'POST',
        headers: Object.assign({}, Constants.CSRF, {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': Constants.CONTENT_TYPE.JSON,
        }),
      },
      switchApp
    );
  }

  findWinnings(genericAccessToken, terminalId, barcode) {
    const serialNumber = Utilities.serialNumberFromBarcode(barcode);

    EventSenderService.sendAsyncRequest(
      EventTypes.SEND_REQUEST,
      RequestType.FIND_WINNINGS,
      {
        baseURL: this.apiUrls.PAM_HOST_URL,
        url: this.apiUrls.FIND_WINNINGS.replace('{serialNumber}', serialNumber),
        method: 'GET',
        headers: Object.assign({}, Constants.CSRF, {
          Authorization: `Bearer ${genericAccessToken}`,
          'Content-Type': Constants.CONTENT_TYPE.JSON,
        }),
        params: {
          terminalId,
        },
      },
      barcode
    );
  }

  logOut(accessToken, switchApp, applicationType) {
    EventSenderService.sendAsyncRequest(
      EventTypes.SEND_REQUEST,
      RequestType.LOG_OUT,
      {
        baseURL: this.apiUrls.PAM_HOST_URL,
        url: this.apiUrls.PAM_LOGOUT,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      switchApp,
      applicationType
    );
  }

  // getWager(genericAccessToken, terminalId, barcode, callbackArgs) {
  //   EventSenderService.sendAsyncRequest(
  //     EventTypes.SEND_REQUEST,
  //     RequestType.GET_WAGER,
  //     {
  //       baseURL: this.apiUrls.PAM_HOST_URL,
  //       url: this.apiUrls.PAM_GET_WAGER.replace('{serialNumber}', barcode),
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${genericAccessToken}`,
  //         'Content-Type': Constants.CONTENT_TYPE.URLENCODED,
  //       },
  //       params: {
  //         replayWager: true,
  //         terminalId,
  //       },
  //     },
  //     barcode,
  //     callbackArgs
  //   );
  // }
}
