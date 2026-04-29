import FireblazeConstants from './fireblazeConstants';
import BetslipUtils from './betslipUtils';

const isSystemIdValid = systemId => {
  return Object.keys(FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT).includes(systemId.toString());
};

const isBoardValid = board => {
  if (board.betType) {
    return board.panels[0].selection.length >= FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT[board.betType];
  }
  return board.panels[0].selection.length >= FireblazeConstants.BOARD_NUMBERS.MIN;
};

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
