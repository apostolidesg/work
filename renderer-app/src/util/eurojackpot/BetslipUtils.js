import EurojackpotConstants from './Constants';
import GlobalBetslipUtils from '../BetslipUtils';

/**
 * Eurojackpot-specific betslip utilities
 * Handles board validation, cost calculation, and draw status
 */

/**
 * Check if the systemId is valid for the Eurojackpot game.
 *
 * @param {string | number} systemId - The systemId to be checked
 * @return {boolean} - True if the systemId is valid, false otherwise
 */
const isSystemIdValid = (systemId) => {
  return Object.keys(EurojackpotConstants.SYSTEMS).includes(systemId.toString());
};

/**
 * Check if the board is valid for the Eurojackpot game.
 *
 * @description The board is valid if the number of main
 * numbers is equal to the number of main numbers of the system and the number of euro numbers is
 * equal or greater than the minimum number of euro numbers. If the board has no systemId, then the number of
 * main numbers must be greater or equal to the minimum number of main numbers and the number of
 * euro numbers must be greater or equal to the minimum number of euro numbers.
 * The function assumes that the systemId is valid.
 *
 * @param  {object} board - The board to be checked
 * @return {boolean} - True if the board is valid, false otherwise
 */
const isBoardValid = (board) => {
  if (board.systemId) {
    return (
      board.panels[0].selection.length === EurojackpotConstants.SYSTEMS[board.systemId].numbers &&
      board.panels[1].selection.length >= EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MIN
    );
  }
  return (
    board.panels[0].selection.length >= EurojackpotConstants.BOARD_NUMBERS.MAIN.MIN &&
    board.panels[1].selection.length >= EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MIN
  );
};

/**
 * Calculate the cost of an Eurojackpot board.
 *
 * @description The cost is calculated by multiplying the number of
 * main numbers columns with the number of euro numbers columns and then multiplying the result with
 * the basic column price. If the board has a systemId, then the number of main numbers columns
 * is equal to the number of columns of the system. Otherwise, the number of main numbers columns
 * is equal to the number of combinations of the main numbers. The number of euro numbers columns
 * is equal to the number of combinations of the euro numbers.
 * The function assumes that the board is valid.
 *
 * @example
 * const board = {
 *    panels: [
 *      { selection: [1, 2, 3, 4, 5, 6] },
 *      { selection: [1, 2] },
 *    ],
 *  };
 *  const cost = EurojackpotBetslipUtils.calculateBoardCost(board, 2);
 *  console.log(cost); // 12
 *
 * @param {object} board - The board to be checked
 * @param {number} columnCost - The cost of a column
 * @return {number} - The cost of the board
 */
const calculateBoardCost = (board, columnCost) => {
  const { systemId } = board;

  const mainNumbersColumns = systemId
    ? EurojackpotConstants.SYSTEMS[systemId.toString()].columns
    : GlobalBetslipUtils.combinations(board.panels[0].selection.length, EurojackpotConstants.BOARD_NUMBERS.MAIN.MIN);

  const euroNumbersColumns = GlobalBetslipUtils.combinations(
    board.panels[1].selection.length,
    EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MIN
  );

  return mainNumbersColumns * euroNumbersColumns * columnCost;
};

/**
 * Get the title of the draw days of the Eurojackpot game based on the draw days array.
 *
 *@example
 * const drawDays = [0];
 * const title = EurojackpotBetslipUtils.getDrawDaysTitle(drawDays, t);
 * console.log(title); // "Sunday"
 *
 * @example
 * const drawDays = [0, 1];
 * const title = EurojackpotBetslipUtils.getDrawDaysTitle(drawDays, t);
 * console.log(title); // "Sunday & Monday"
 *
 * @example
 * const drawDays = [0, 1, 2]
 * const title = EurojackpotBetslipUtils.getDrawDaysTitle(drawDays, t);
 * console.log(title); // "Sunday, Monday & Tuesday"
 *
 * @param {array} drawDays - The draw days array (0- Sunday, 6- Saturday)
 * @param {function} t - The translation function
 * */
const getDrawDaysTitle = (drawDays, t) => {
  const days = drawDays.sort().map((day) => t(`days.${day}`));

  if (days.length === 1) {
    return days[0];
  }

  return `${days.slice(0, -1).join(', ')} & ${days.slice(-1)}`;
};

export default {
  isBoardValid,
  isSystemIdValid,
  calculateBoardCost,
  getDrawDaysTitle,
};
