import Constants from '../util/Constants';
import modalEventConstants from '../util/modalEventConstants';
import infoModalMessages from '../util/infoModalMessages';

export const PlaceBetErrorMessages = {
  HAL_UNAVAILABLE: 'HAL_UNAVAILABLE',
  PRINTER_UNAVAILABLE: 'PRINTER_UNAVAILABLE',
  BALANCE_INSUFFICIENT: 'BALANCE_INSUFFICIENT',
  MAX_CAP: 'MAX_CAP',
  MAX_CONSECUTIVE_DRAWS: 'MAX_CONSECUTIVE_DRAWS',
  GENERIC: 'GENERIC',
  GET_ACCESS_TOKEN: 'GET_ACCESS_TOKEN',
  DRAW_UNAVAILABLE: 'DRAW_UNAVAILABLE',
};

/*
 * @typedef {object} PlaceBetError
 * @description Place bet error. This class is used to handle the errors that can occur when placing a bet.
 * It acts as data model class, and it is used to pass the error code and the modal configuration to the modal component.
 * @param {string} errorCode - error code
 * @param {object} modal - modal object
 * @param {string} modal.type - modal type
 * @param {object} modal.configuration - modal configuration
 * */
class PlaceBetError {
  constructor(
    {
      errorCode = PlaceBetErrorMessages.GENERIC,
      modal: { type = modalEventConstants.OPEN.INFO, configuration = infoModalMessages.placeBetError },
    } = { modal: {} }
  ) {
    this.errorCode = errorCode;
    this.modal = { type, ...(configuration && Object.keys(configuration).length > 0 && { configuration }) };
  }

  /**
   * @description Factory static method to create a PlaceBetError object when hal is unavailable.
   * @returns {PlaceBetError}
   */
  static halUnavailable() {
    return new PlaceBetError({
      errorCode: PlaceBetErrorMessages.HAL_UNAVAILABLE,
      modal: {
        type: modalEventConstants.OPEN.INFO,
        configuration: infoModalMessages.technicalProblemWarning,
      },
    });
  }

  /**
   * @description Factory static method to create a PlaceBetError object when printer is unavailable.
   * @returns {PlaceBetError}
   */
  static printerUnavailable() {
    return new PlaceBetError({
      errorCode: PlaceBetErrorMessages.PRINTER_UNAVAILABLE,
      modal: {
        type: modalEventConstants.OPEN.INFO,
        configuration: infoModalMessages.printerErrorWarning,
      },
    });
  }

  /**
   * @description Factory static method to create a PlaceBetError object when the getAccessToken request fails.
   * @returns {PlaceBetError}
   */
  static getAccessTokenError() {
    return new PlaceBetError({
      errorCode: PlaceBetErrorMessages.GET_ACCESS_TOKEN,
      modal: {
        type: modalEventConstants.OPEN.INFO,
        configuration: infoModalMessages.operationFailed,
      },
    });
  }

  /**
   * @description Factory static method to create a PlaceBetError object from a response.
   * @param {object} response - response object
   * @returns {PlaceBetError} PlaceBetError object
   * */
  static fromResponse(response) {
    if (response.data && Constants.PLACE_BET.ERROR.BALANCE_INSUFFICIENT === response.data.errorId) {
      return new PlaceBetError({
        errorCode: PlaceBetErrorMessages.BALANCE_INSUFFICIENT,
        modal: {
          type: modalEventConstants.OPEN.INFO,
          configuration: infoModalMessages.insufficientBalance,
        },
      });
    }
    if (response.data && Constants.PLACE_BET.ERROR.UNAVAILABLE_DRAW_ERROR === response.data.errorId) {
      return new PlaceBetError({
        errorCode: PlaceBetErrorMessages.DRAW_UNAVAILABLE,
        modal: {
          type: modalEventConstants.OPEN.INFO,
          configuration: infoModalMessages.placeBetUnavailable,
        },
      });
    }
    if (response.data && response.data.description?.includes(Constants.PLACE_BET.ERROR.MAX_CAP_ERROR_CODE)) {
      return new PlaceBetError({
        errorCode: PlaceBetErrorMessages.MAX_CAP,
        modal: {
          type: modalEventConstants.OPEN.WAGER_CAP,
          configuration: {},
        },
      });
    }
    if (response.data && response.data.description?.includes(Constants.PLACE_BET.ERROR.MAX_CONSECUTIVE_DRAWS_ERROR)) {
      return new PlaceBetError({
        errorCode: PlaceBetErrorMessages.MAX_CONSECUTIVE_DRAWS,
        modal: {
          type: modalEventConstants.OPEN.INFO,
          configuration: infoModalMessages.maxConsecutiveDrawsError,
        },
      });
    }
    return new PlaceBetError();
  }
}

export default PlaceBetError;
