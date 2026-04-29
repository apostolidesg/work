import FireblazeConstants from './Constants';
import BetslipUtils from '@/util/BetslipUtils';

/**
 * Check if a system ID is valid
 * @param {string|number} systemId - The system ID to validate
 * @returns {boolean} Whether the system ID is valid
 */
const isSystemIdValid = (systemId) => {
  return Object.keys(FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT).includes(systemId.toString());
};

/**
 * Check if a board is valid based on its bet type and selections
 * @param {Object} board - The board to validate
 * @returns {boolean} Whether the board is valid
 */
const isBoardValid = (board) => {
  if (board.betType) {
    return board.panels[0].selection.length >= FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT[board.betType];
  }
  return board.panels[0].selection.length >= FireblazeConstants.BOARD_NUMBERS.MIN;
};

/**
 * Calculate the cost of a board
 * @param {Object} board - The board to calculate cost for
 * @param {number} columnCost - The cost per column
 * @returns {number} The total cost of the board
 */
const calculateBoardCost = (board, columnCost) => {
  const numbersColumns = BetslipUtils.combinations(
    board.panels[0].selection.length,
    FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT[board.betType]
  );
  const multipliers = board.multipliers.reduce((acc, mul) => acc + mul, 0);

  return numbersColumns * columnCost * multipliers;
};

export default {
  isBoardValid,
  isSystemIdValid,
  calculateBoardCost,
};
