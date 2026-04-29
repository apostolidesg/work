import Constants from '../Constants';

/**
 * Kino-specific betslip utilities
 * Handles Kino bet type determination and validation
 */

/**
 * Returns the bet type based on the Kino board
 *
 * @param {object} board - The Kino board/bet area
 * @returns {number} The bet type constant
 */
const getBetTypeFromKinoBoard = (board) => {
  const kinoBonus = board.kinoBonusActive;
  const kinoClose2Win = board.kinoClose2WinActive;

  if (kinoBonus && kinoClose2Win) {
    return Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN_AND_KINO_BONUS;
  }
  if (kinoBonus) {
    return Constants.ILOT_GAMETYPES.BET_WITH_KINO_BONUS;
  }
  if (kinoClose2Win) {
    return Constants.ILOT_GAMETYPES.BET_WITH_CLOSE_2_WIN;
  }
  return Constants.ILOT_GAMETYPES.BET_WITHOUT_KINO_BONUS;
};

export default {
  getBetTypeFromKinoBoard,
};
