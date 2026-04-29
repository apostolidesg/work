import ErrorTypes from './ErrorTypes';

/**
 * Kino-specific validation service
 * Validates Kino betslips (bet areas, odd/even, columns)
 */
export default {
  validateBetslip(betslip) {
    let errors = [];
    let countFilledAreas = 0;

    for (let i = 0; i < betslip.bet_areas.length; i++) {
      let betArea = betslip.bet_areas[i];
      if (betArea.filled) {
        countFilledAreas++;
      }
      if (betArea.gameType !== betArea.pickedNumbers.length) {
        errors.push(
          ErrorTypes.prepareErrorTypeObject(
            ErrorTypes.PICKED_NUMBERS_INCONSISTENT_LENGTH_ERROR_TYPE,
            ErrorTypes.BET_AREA_FIELD.concat('_' + i)
          )
        );
      }
    }

    let oddEvensExist = !(
      typeof betslip.oddEvenGame === 'undefined' ||
      betslip.oddEvenGame === null ||
      betslip.oddEvenGame.oddEven.length === 0
    );
    if (oddEvensExist) {
      let amount =
        betslip.oddEvenGame.oddEvenAmount.length === 0
          ? 0
          : betslip.oddEvenGame.oddEvenAmount.reduce(function (acc, val) {
              return acc + val;
            });

      if (amount === 0) {
        errors.push(
          ErrorTypes.prepareErrorTypeObject(ErrorTypes.ODDEVEN_AMOUNT_EMPTY_VALUE_ERROR_TYPE, ErrorTypes.ODDEVEN_FIELD)
        );
      }
    }

    let columnsExist = !(
      typeof betslip.columnsGame === 'undefined' ||
      betslip.columnsGame === null ||
      betslip.columnsGame.columns.length === 0
    );
    if (columnsExist) {
      let amount =
        betslip.columnsGame.columnsAmount.length === 0
          ? 0
          : betslip.columnsGame.columnsAmount.reduce(function (acc, val) {
              return acc + val;
            });

      if (amount === 0) {
        errors.push(
          ErrorTypes.prepareErrorTypeObject(ErrorTypes.COLUMNS_AMOUNT_EMPTY_VALUE_ERROR_TYPE, ErrorTypes.COLUMNS_FIELD)
        );
      }
    }

    if (countFilledAreas === 0 && !oddEvensExist && !columnsExist) {
      errors.push(ErrorTypes.prepareErrorTypeObject(ErrorTypes.EMPTY_BET_AREAS_ERROR_TYPE, ErrorTypes.BET_AREA_FIELD));
    }

    return errors;
  },
};
