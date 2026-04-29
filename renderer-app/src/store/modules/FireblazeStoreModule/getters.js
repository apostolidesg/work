import types from './types';
import FireblazeBetslipUtils from '@/util/fireblaze/BetslipUtils';
import ConfigurationStoreModuleTypes from '../ConfigurationStoreModule/types';

const getters = {
  [types.getters.GET_BETSLIP]: (state) => state.betslip,

  [types.getters.GET_SELECTED_BOARD_INDEX]: (state) => state.selectedBoardIndex,

  [types.getters.GET_SELECTED_BOARD]: (state) => state.betslip.wager?.boards[state.selectedBoardIndex],

  [types.getters.GET_CONSECUTIVE_DRAWS]: (state) => state.betslip.wager.participatingDraws.multipleDraws,

  [types.getters.GET_STATISTICS]: (state) => state.statistics,

  [types.getters.GET_STATISTICS_SELECTION]: (state) => state.statisticsSelection,

  [types.getters.GET_BOARD_COST]: (state, _getters, _rootState, rootGetters) => (index) => {
    const board = state.betslip.wager.boards[index];
    const columnCost = rootGetters[ConfigurationStoreModuleTypes.namespaceMapper.GET_FIREBLAZE_COLUMN_PRICE];
    return board.isValid() ? FireblazeBetslipUtils.calculateBoardCost(board, columnCost) : 0;
  },

  [types.getters.GET_BETSLIP_COST]: (state, _getters, _rootState, rootGetters) => {
    const columnCost = rootGetters[ConfigurationStoreModuleTypes.namespaceMapper.GET_FIREBLAZE_COLUMN_PRICE];

    return (
      state.betslip.wager.boards
        .filter((board) => board.isValid())
        .reduce((acc, board) => acc + FireblazeBetslipUtils.calculateBoardCost(board, columnCost), 0) *
      state.betslip.wager.participatingDraws.multipleDraws
    );
  },

  [types.getters.GET_IS_BETSLIP_VALID]: (state) => state.betslip.isValidBetslip(),

  [types.getters.GET_IS_BETSLIP_EMPTY]: (state) => state.betslip.isEmpty(),
};

export default getters;
