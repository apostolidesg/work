import types from './types';
import TzokerBetslipUtils from '@/util/tzoker/BetslipUtils';
import TzokerConstants from '@/util/tzoker/Constants';

const getters = {
  [types.getters.GET_BETSLIP]: (state) => state.betslip,

  [types.getters.GET_WORKING_BOARD]: (state) => state.betslip?.getBoard(0) || null,

  [types.getters.GET_SELECTED_BOARD_INDEX]: (state) => state.selectedBoardIndex,

  [types.getters.GET_CART_BOARDS]: (state) => {
    if (!state.betslip) return [];
    return state.betslip.boards.slice(1).filter((board) => !board.isEmpty());
  },

  [types.getters.GET_CONSECUTIVE_DRAWS]: (state) => state.betslip?.consecutiveDraws || 1,

  [types.getters.GET_STATISTICS]: (state) => state.statistics,

  [types.getters.GET_STATISTICS_SELECTION]: (state) => state.statisticsSelection,

  [types.getters.GET_BOARD_COST]: (state) => (index) => {
    const board = state.betslip?.getBoard(index);
    return board ? TzokerBetslipUtils.calculateBoardCost(board) : 0;
  },

  [types.getters.GET_BETSLIP_COST]: (state) => {
    if (!state.betslip) return 0;
    return state.betslip.calculateTotalCost();
  },

  [types.getters.GET_IS_BETSLIP_VALID]: (state) => state.betslip?.isValid() || false,

  [types.getters.GET_IS_BETSLIP_EMPTY]: (state) => state.betslip?.isEmpty() || true,

  [types.getters.GET_IS_WORKING_BOARD_VALID]: (state) => {
    const workingBoard = state.betslip?.getBoard(0);
    return workingBoard ? workingBoard.isValid() : false;
  },

  [types.getters.GET_CAN_ADD_BOARDS]:
    (state) =>
    (count = 1) => {
      if (!state.betslip) return false;
      return state.betslip.canAddExactly(count);
    },
};

export default getters;
