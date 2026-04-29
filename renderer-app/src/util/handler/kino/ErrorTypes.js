/**
 * Kino-specific error types and error object builder
 * Used for validating Kino betslips
 */
export default {
  EMPTY_BET_AREAS_ERROR_TYPE: 'EMPTY_BET_AREAS',
  PICKED_NUMBERS_INCONSISTENT_LENGTH_ERROR_TYPE: 'PICKED_NUMBERS_INCONSISTENT_LENGTH',
  COLUMNS_AMOUNT_EMPTY_VALUE_ERROR_TYPE: 'COLUMNS_AMOUNT_EMPTY_VALUE',
  ODDEVEN_AMOUNT_EMPTY_VALUE_ERROR_TYPE: 'ODDEVEN_AMOUNT_EMPTY_VALUE',
  BET_AREA_FIELD: 'BET_AREA',
  COLUMNS_FIELD: 'COLUMNS',
  ODDEVEN_FIELD: 'ODDEVEN',

  /**
   * Creates an error object with type and field information
   * @param {string} eventType - The error type constant
   * @param {string} field - The field identifier
   * @returns {object} Error object with errorType and field
   */
  prepareErrorTypeObject(eventType, field) {
    if (typeof eventType === 'undefined' || eventType === null) {
      throw 'EventHandler obj can not be initialized!';
    }
    return {
      errorType: eventType,
      field: field,
    };
  },
};
