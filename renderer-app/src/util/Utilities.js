import Constants from './Constants';

export default {
  createDrawCountdown({ getTimeToNextDraw, onTick, onEnd }) {
    let timer = 0;
    let finished = false;

    const tick = () => {
      const target = getTimeToNextDraw();
      const now = Date.now();

      if (!target || !Number.isFinite(target)) {
        onTick({ totalSeconds: 0, minutes: 0, seconds: 0 });
        timer = setTimeout(tick, 500);
        return;
      }
      const count = target - now;

      const totalSeconds = Math.ceil(count / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      onTick({
        totalSeconds,
        minutes,
        seconds,
      });
      if (totalSeconds <= 0 && !finished) {
        finished = true;
        onEnd();
      }
      if (totalSeconds > 0 && finished) {
        finished = false;
      }
      const nextTickDelay = count % 1000 || 1000;
      timer = setTimeout(tick, nextTickDelay);
    };

    return {
      start() {
        tick();
      },
      stop() {
        if (timer) clearTimeout(timer);
      },
    };
  },

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getUniqueRandomArray(min, max, arrLength) {
    const arr = [];
    while (arr.length < arrLength) {
      const randomNumber = this.getRandomInt(min, max);
      !arr.includes(randomNumber) && arr.push(randomNumber);
    }
    return arr;
  },

  /**
   * Adds a number to array or removes it if already in the list
   */
  toggleNumberInArray(number, array, fromSet) {
    if (fromSet && !fromSet.includes(number)) return array;
    if (!Array.isArray(array)) return array;
    const [...cloneArray] = array;
    const selectionIndex = cloneArray.indexOf(number);
    if (selectionIndex < 0) {
      cloneArray.push(number);
      cloneArray.sort((a, b) => a - b);
    } else cloneArray.splice(selectionIndex, 1);
    return cloneArray;
  },

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  // getRandomArbitrary(min, max) {
  //   return Math.random() * (max - min) + min;
  // },
  //
  // getRandomAlphanumeric(length, chars) {
  //   var result = '';
  //   for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  //   return result;
  // },

  /**
   * Format the numbers to be displayed as #.###,##
   *
   * @param value
   * @returns {string}
   */
  formatNumber(value) {
    return Constants.NUMBER_FORMATTER.format(value);
  },

  /**
   * Construct amount from a set of numbers
   *
   * @param amount
   * @param set
   * @returns {Array}
   */
  constructAmountFromSet(amount, set) {
    let amountArray = [];
    let remainingAmount = amount;
    set
      .slice()
      .reverse()
      .some((n) => {
        if (!remainingAmount) return;
        if (n <= remainingAmount) {
          remainingAmount -= n;
          amountArray.push(n);
        }
      });
    return amountArray;
  },

  /**
   * Check if the serialNumber provided is L10 version
   *
   * @param serialNumber
   * @param lengthType
   * @returns {Boolean}
   */
  isL10Version(serialNumber, lengthType) {
    switch (lengthType) {
      case 0:
        return serialNumber && serialNumber.length === Constants.SERIAL_NUMBER_LENGTH.L10;
      case 1:
        return serialNumber && serialNumber.length === Constants.SERIAL_NUMBER_LENGTH.L10_FULL;
      case 2:
        return serialNumber && serialNumber.length === Constants.SERIAL_NUMBER_LENGTH.L10_LOTTO;
      default:
        return false;
    }
  },

  /**
   * Check if the serialNumber provided is Promotion type voucher
   *
   * @param serialNumber
   * @returns {Boolean}
   */

  isPromoVoucher(serialNumber) {
    return serialNumber && serialNumber.length === Constants.SERIAL_NUMBER_LENGTH.VOUCHER_PROMO_CODE_LENGTH;
  },

  /**
   * Extract first 32 chars from provided serialNumber and iSecure numbers 2 X 10 chars after 32 chars serialNumber
   *
   * @param inputSerialNumber
   * @returns {{serialNumber: string, iSecureFirst: string, iSecureSecond: string}}
   */
  extractFromL10SerialNumber(inputSerialNumber) {
    return {
      serialNumber: inputSerialNumber.toString().substring(0, Constants.SERIAL_NUMBER_LENGTH.L10),
      iSecureFirst: inputSerialNumber
        .toString()
        .substring(Constants.SERIAL_NUMBER_LENGTH.L10, Constants.SERIAL_NUMBER_LENGTH.L10 + Constants.ISECURE_LENGTH),
      iSecureSecond: inputSerialNumber
        .toString()
        .substring(
          Constants.SERIAL_NUMBER_LENGTH.L10 + Constants.ISECURE_LENGTH,
          Constants.SERIAL_NUMBER_LENGTH.L10 + Constants.ISECURE_LENGTH * 2
        ),
    };
  },

  /**
   * Extract first serial number from provided barcode for L5 || L10
   *
   * @param barcode
   * @returns {String}
   */
  serialNumberFromBarcode(barcode) {
    return this.extractFromL10SerialNumber(barcode).serialNumber;
  },

  /**
   * Check if board is a game of type bet
   * @param betType
   * @returns {boolean}
   */
  // isBet(betType) {
  //   return [
  //     Constants.ILOT_GAMETYPES.BET_WITHOUT_KINO_BONUS,
  //     Constants.ILOT_GAMETYPES.BET_WITH_KINO_BONUS,
  //     Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN_AND_KINO_BONUS,
  //     Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN,
  //   ].includes(betType);
  // },
  /**
   * Returns whether the bet type is close 2 win
   * @param betType The bet type
   * @returns {boolean} Whether the bet type is close 2 win
   */
  isBetTypeClose2Win(betType) {
    return (
      betType === Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN ||
      betType === Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN_AND_KINO_BONUS
    );
  },
  /**
   * Returns whether the bet type is kino bonus
   * @param betType The bet type
   * @returns {boolean} Whether the bet type is kino bonus
   */
  isBetTypeKinoBonus(betType) {
    return (
      betType === Constants.ILOT_GAMETYPES.BET_WITH_KINO_BONUS ||
      betType === Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN_AND_KINO_BONUS
    );
  },
  /**
   * Check if board is a game of type Odd Even or Draw
   * @param betType
   * @returns {boolean}
   */
  // isOddEvenDraw(betType) {
  //   return [Constants.ILOT_GAMETYPES.ODD, Constants.ILOT_GAMETYPES.EVEN, Constants.ILOT_GAMETYPES.DRAW].includes(
  //     betType
  //   );
  // },
  /**
   * Check if board is a game of type column
   * @param betType
   * @returns {boolean}
   */
  // isColumn(betType) {
  //   return betType === Constants.ILOT_GAMETYPES.COLUMNS;
  // },

  /**
   * Returns the sum of an array of numbers
   * @param array
   * @returns {number}
   */
  arraySum(array) {
    return array.reduce((a, b) => a + b, 0);
  },

  /**
   * Returns a deep copy of an array sorted in ascending order
   * @param array
   * @returns {array}
   */
  arraySort(array) {
    return [...array].sort((a, b) => a - b);
  },
};
