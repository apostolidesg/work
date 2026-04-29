import { EventTypes } from '@/constants/EventTypes';
import { HALEventHandlerIDs } from '@/constants/HALEventHandlerIDs';

/**
 * Identifies the barcode and checks its validity
 * @param {string} barcode
 * @returns {string} The event type
 */
export function processAndValidateBcrData(barcode) {
  if (barcode === HALEventHandlerIDs.BARCODE_DATA.OPAP_BET_CARD) {
    return EventTypes.SCAN_OPAP_BET_CARD_EVENT_TYPE;
  }

  let prefix = barcode[0];

  if (!isNumber(prefix) && isNumber(barcode.substring(1))) {
    switch (prefix) {
      case HALEventHandlerIDs.BARCODE_DATA.SPORTS_VOUCHER_PREFIX:
        return EventTypes.SCAN_SPORTS_VOUCHER_EVENT_TYPE;
      case HALEventHandlerIDs.BARCODE_DATA.SPORTS_TICKET_PREFIX:
        return EventTypes.SCAN_SPORTS_TICKET_EVENT_TYPE;
      default:
        break;
    }
  } else if (isNumber(barcode)) {
    switch (barcode.length) {
      case HALEventHandlerIDs.BARCODE_DATA.L5_CODE_LENGTH:
      case HALEventHandlerIDs.BARCODE_DATA.L10_CODE_LENGTH:
        return EventTypes.FIND_WINNINGS_EVENT_TYPE;
      case HALEventHandlerIDs.BARCODE_DATA.LOTTERY_CODE_LENGTH:
        return EventTypes.FIND_WINNINGS_EVENT_TYPE;
      case HALEventHandlerIDs.BARCODE_DATA.SCRATCH_CODE_LENGTH:
        return EventTypes.FIND_WINNINGS_EVENT_TYPE;
      case HALEventHandlerIDs.BARCODE_DATA.VOUCHER_CODE_LENGTH:
        return EventTypes.SCAN_VOUCHER_EVENT_TYPE;
      case HALEventHandlerIDs.BARCODE_DATA.VOUCHER_PROMO_CODE_LENGTH:
        return EventTypes.SCAN_PROMOTION_VOUCHER_EVENT_TYPE;
      default:
        break;
    }
  }
  return EventTypes.SCAN_INVALID_BARCODE_EVENT_TYPE;
}

/**
 * Checks if the data is a number
 * @param {string} data
 * @returns {boolean}
 */
export function isNumber(data) {
  return /^\d+$/.test(data);
}
