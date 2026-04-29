import EurojackpotConstants from './eurojackpotConstants';
import BetslipUtils from './betslipUtils';
import moment from 'moment';
import dayjs from 'dayjs';

/**
 * Check if the systemId is valid for the Eurojackpot game.
 *
 * @param {string | number} systemId - The systemId to be checked
 * @return {boolean} - True if the systemId is valid, false otherwise
 */
const isSystemIdValid = systemId => {
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
const isBoardValid = board => {
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
    : BetslipUtils.combinations(board.panels[0].selection.length, EurojackpotConstants.BOARD_NUMBERS.MAIN.MIN);

  const euroNumbersColumns = BetslipUtils.combinations(
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
 * const title = EurojackpotBetslipUtils.getDwawDaysTitle(drawDays, t);
 * console.log(title); // "Sunday"
 *
 * @example
 * const drawDays = [0, 1];
 * const title = EurojackpotBetslipUtils.getDwawDaysTitle(drawDays, t);
 * console.log(title); // "Sunday & Monday"
 *
 * @example
 * const drawDays = [0, 1, 2]
 * const title = EurojackpotBetslipUtils.getDwawDaysTitle(drawDays, t);
 * console.log(title); // "Sunday, Monday & Tuesday"
 *
 * @param {array} drawDays - The draw days array (0- Sunday, 6- Saturday)
 * @param {function} t - The translation function
 * */
const getDrawDaysTitle = (drawDays, t) => {
  const days = drawDays.sort().map(day => t(`days.${day}`));

  if (days.length === 1) {
    return days[0];
  }

  return `${days.slice(0, -1).join(', ')} & ${days.slice(-1)}`;
};

/**
 * Get the number of calendar days until the next draw. If now is greater than the start of day of the draw day then
 * returns 0
 * @param drawTime - The draw time in milliseconds
 * @param currentTime - The current time in milliseconds
 * @return {number} - The number of days until the next draw or -1 if the draw time is in the past
 *
 * @example
 * const now = 1697459277471; // Mon Oct 16 2023 15:27:57 GMT+0300
 * const nextDrawTime = 1697470309673; // Mon Oct 16 2023 18:31:49 GMT+0300
 * const days = EurojackpotBetslipUtils.daysUntilNextDraw(nextDrawTime, now);
 * console.log(days); // 0
 *
 * @example
 * const now = 1697459277471; // Mon Oct 16 2023 15:27:57 GMT+0300
 * const nextDrawTime = 1697544000000; // Tue Oct 17 2023 15:00:00 GMT+0300
 * const days = EurojackpotBetslipUtils.daysUntilNextDraw(nextDrawTime, now);
 * console.log(days); // 1
 */
const daysUntilNextDraw = (drawTime, currentTime = new Date().getTime()) => {
  if (moment(currentTime).isAfter(moment(drawTime))) {
    return -1;
  }

  const drawDay = moment(drawTime).startOf('day');
  const current = moment(currentTime).startOf('day');

  return drawDay.diff(current, 'days');
};

/**
 * Get the draw status from the response of the draw info API.
 * @param last An object containing the last draw information
 * @param last An object containing the last draw information
 * @param salesStart The sales start object containing the hour and minute
 * @param active An object containing the active draw information
 * @returns {string} EurojackpotConstants.DRAW_STATUS
 */
const getDrawStatusFromResponse = ({ last = {}, active = {} }, salesStart) => {
  const drawDiff = active.drawId - last.drawId;

  if (drawDiff > 1) {
    return EurojackpotConstants.DRAW_STATUS.SALES_CLOSED;
  }

  const activeDrawTime = dayjs(active.drawTime);
  const lastDrawTime = dayjs(last.drawTime);

  const isDrawToday = dayjs().isSame(activeDrawTime, 'day');
  const wasDrawToday = dayjs().isSame(lastDrawTime, 'day');

  if (!isDrawToday && !wasDrawToday) {
    return EurojackpotConstants.DRAW_STATUS.SALES_OPEN;
  }

  if (isDrawToday) {
    const salesEndTime = dayjs(activeDrawTime).subtract(active.drawBreak, 'milliseconds');

    return dayjs().isBefore(salesEndTime)
      ? EurojackpotConstants.DRAW_STATUS.SALES_OPEN
      : EurojackpotConstants.DRAW_STATUS.SALES_CLOSED;
  }

  if (wasDrawToday) {
    const salesStartTime = dayjs()
      .startOf('day')
      .add(salesStart.hours, 'hours')
      .add(salesStart.minutes, 'minutes');

    return dayjs().isAfter(salesStartTime)
      ? EurojackpotConstants.DRAW_STATUS.SALES_OPEN
      : EurojackpotConstants.DRAW_STATUS.SALES_CLOSED;
  }
};

/**
 * Get the status for the first draw of the Eurojackpot game.
 * @param active An object containing the active draw information
 * @returns {string} EurojackpotConstants.DRAW_STATUS
 */
const getStatusForFirstDraw = (active = {}) => {
  const { drawBreak } = active;
  const drawTime = dayjs(active.drawTime);
  const salesEndTime = drawTime.subtract(drawBreak, 'milliseconds');
  const isSalesOpen = dayjs().isBefore(salesEndTime);
  return isSalesOpen ? EurojackpotConstants.DRAW_STATUS.SALES_OPEN : EurojackpotConstants.DRAW_STATUS.SALES_CLOSED;
};

export default {
  isBoardValid,
  isSystemIdValid,
  calculateBoardCost,
  getDrawDaysTitle,
  daysUntilNextDraw,
  getDrawStatusFromResponse,
  getStatusForFirstDraw,
};
