import types from './types';
import ConfigurationStoreModuleTypes from '../ConfigurationStoreModule/types';
import EurojackpotBetslipUtilities from '../../../util/eurojackpotBetslipUtilities';
import eurojackpotConstants from '../../../util/eurojackpotConstants';

const getters = {
  [types.getters.GET_BETSLIP]: ({ betslip }) => betslip,
  [types.getters.GET_SELECTED_BOARD_INDEX]: ({ selectedBoardIndex }) => selectedBoardIndex,
  [types.getters.GET_SELECTED_BOARD]: ({ betslip, selectedBoardIndex }) => betslip.wager.boards[selectedBoardIndex],
  [types.getters.GET_BETSLIP_CONSECUTIVE_DRAWS]: ({ betslip }) => betslip.wager.participatingDraws.multipleDraws,
  [types.getters.GET_BOARD_COST]: ({ betslip }, _, __, rootGetters) => ({ index }) => {
    const board = betslip.wager.boards[index];

    const columnCost = rootGetters[ConfigurationStoreModuleTypes.namespaceMapper.GET_EUROJACKPOT_COLUMN_PRICE];

    return board.isValid() ? EurojackpotBetslipUtilities.calculateBoardCost(board, columnCost) : 0;
  },
  [types.getters.GET_BETSLIP_COST]: ({ betslip }, _, __, rootGetters) => {
    const columnCost = rootGetters[ConfigurationStoreModuleTypes.namespaceMapper.GET_EUROJACKPOT_COLUMN_PRICE];

    return (
      betslip.wager.boards
        .filter(board => board.isValid())
        .reduce((acc, board) => acc + EurojackpotBetslipUtilities.calculateBoardCost(board, columnCost), 0) *
      betslip.wager.participatingDraws.multipleDraws
    );
  },
  [types.getters.GET_IS_BETSLIP_VALID]: ({ betslip }) => {
    return betslip.wager.boards.every(board => board.isValid());
  },
  [types.getters.GET_IS_BETSLIP_EMPTY]: ({ betslip }) => {
    return betslip.isEmpty();
  },
  [types.getters.GET_DRAW_DAYS]: (_, __, ___, rootGetters) => {
    return (
      rootGetters[ConfigurationStoreModuleTypes.namespaceMapper.GET_EUROJACKPOT_DRAW_DAYS] ||
      eurojackpotConstants.DRAW_DAYS
    );
  },
  [types.getters.GET_ACTIVE_DRAW_TIME]: ({ activeDrawTime }) => activeDrawTime,
  [types.getters.GET_SALES_CLOSE_TIME]: ({ salesCloseTime }) => salesCloseTime,
  [types.getters.GET_ACTIVE_DRAW_ID]: ({ activeDrawId }) => activeDrawId,
  [types.getters.GET_JACKPOT_AMOUNT]: ({ jackpotAmount, salesStatus }) => {
    return salesStatus === eurojackpotConstants.DRAW_STATUS.SALES_OPEN ? jackpotAmount : null;
  },
  [types.getters.GET_IS_SALES_OPEN]: ({ salesStatus }) => salesStatus === eurojackpotConstants.DRAW_STATUS.SALES_OPEN,
  [types.getters.GET_IS_SALES_CLOSED]: ({ salesStatus }) =>
    salesStatus === eurojackpotConstants.DRAW_STATUS.SALES_CLOSED,
};

export default getters;
