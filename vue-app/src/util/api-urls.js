import Constants from './Constants';

export default class ApiUrls {
  constructor(pamApiHost, drawApiHost, gameId, statisticsApiHost, promotionsApiHost) {
    this.pamApiHost = pamApiHost;
    this.drawApiHost = drawApiHost;
    this.statisticsApiHost = statisticsApiHost;
    this.promotionsApiHost = promotionsApiHost;
    this.gameId = gameId;
  }

  get DRAW_API_NEXT_DRAW() {
    return `https://${this.drawApiHost}/${this.gameId}/upcoming/1?property=drawId&property=drawTime`;
  }

  get DRAW_API_LAST_ACTIVE() {
    return `https://${this.drawApiHost}/${this.gameId}/last-result-and-active`;
  }

  get DRAW_API_STATISTICS() {
    return `https://${this.statisticsApiHost}/${this.gameId}/statistics?drawRange={drawRangeNumber}`;
  }

  get DRAW_API_PROMOTIONS() {
    return `/serialNumber/{serialNumber}`;
  }

  get PAM_HOST_URL() {
    return `https://${this.pamApiHost}`;
  }

  get ILOT_HOST_URL() {
    return `https://${this.promotionsApiHost}`;
  }

  get GET_GENERIC_TOKEN() {
    return '/web/access/oidc/token';
  }

  get PAM_GET_TOKEN() {
    return '/web/access/oidc/token';
  }

  get PAM_GET_VOUCHER_INFO() {
    return '/web/voucher/rest/v1/vouchers/';
  }

  get PAM_DEPOSIT_VOUCHER() {
    return '/web/wallet/rest/v1-opap/payments/voucher/';
  }

  get PAM_ROLLOVER() {
    return '/web/wallet/rest/v2-opap/payments/rollover/{wagerId}';
  }

  get PAM_GET_BALANCE() {
    return '/web/wallet/rest/v2-opap/customers/ssbt/accounts';
  }

  get PAM_PLACE_BET() {
    return '/web/wager-service/rest/v2/wagers/play/kino';
  }

  get PAM_PLACE_BET_POWERSPIN() {
    return '/web/wager-service/rest/v2/wagers/play/powerspin';
  }

  get PAM_PLACE_BET_EUROJACKPOT() {
    return '/web/wager-service/rest/v2/wagers/play/eurojackpot';
  }

  get PAM_PLACE_BET_FIREBLAZE() {
    return '/web/wager-service/rest/v2/wagers/play/fireblaze';
  }

  get PAM_CASH_OUT() {
    return '/web/wallet/rest/v1-opap/payments/cashout/voucher';
  }

  get PAM_LOGOUT() {
    return '/web/access/rest/v1/sessions/current/token';
  }

  get FIND_WINNINGS() {
    return '/web/wager-service/rest/v1/wagers/{serialNumber}/winnings';
  }

  get PAM_GET_WAGER() {
    return '/web/wager-service/rest/v1/wagers/{serialNumber}/details';
  }

  getPlaceBetUrlByGameType(gameType = Constants.GENERAL_GAME_TYPES.KINO) {
    switch (gameType) {
      case Constants.GENERAL_GAME_TYPES.POWERSPIN:
        return this.PAM_PLACE_BET_POWERSPIN;
      case Constants.GENERAL_GAME_TYPES.EUROJACKPOT:
        return this.PAM_PLACE_BET_EUROJACKPOT;
      case Constants.GENERAL_GAME_TYPES.FIREBLAZE:
        return this.PAM_PLACE_BET_FIREBLAZE;
      case Constants.GENERAL_GAME_TYPES.KINO:
      default:
        return this.PAM_PLACE_BET;
    }
  }
}
