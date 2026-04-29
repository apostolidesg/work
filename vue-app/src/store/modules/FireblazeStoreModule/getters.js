import types from './types';
import ConfigurationStoreModuleTypes from '../ConfigurationStoreModule/types';
import FireblazeBetslipUtilities from '../../../util/fireblazeBetslipUtils';

const getters = {
  [types.getters.GET_BETSLIP]: ({ betslip }) => betslip,
  [types.getters.GET_SELECTED_BOARD_INDEX]: ({ selectedBoardIndex }) => selectedBoardIndex,
  [types.getters.GET_SELECTED_BOARD]: ({ betslip, selectedBoardIndex }) => betslip.wager?.boards[selectedBoardIndex],
  [types.getters.GET_BETSLIP_CONSECUTIVE_DRAWS]: ({ betslip }) => betslip.wager.participatingDraws.multipleDraws,
  [types.getters.GET_BOARD_COST]: ({ betslip }, _, __, rootGetters) => ({ index }) => {
    const board = betslip.wager.boards[index];

    const columnCost = rootGetters[ConfigurationStoreModuleTypes.namespaceMapper.GET_FIREBLAZE_COLUMN_PRICE];
    return board.isValid() ? FireblazeBetslipUtilities.calculateBoardCost(board, columnCost) : 0;
  },
  [types.getters.GET_BETSLIP_COST]: ({ betslip }, _, __, rootGetters) => {
    const columnCost = rootGetters[ConfigurationStoreModuleTypes.namespaceMapper.GET_FIREBLAZE_COLUMN_PRICE];

    return (
      betslip.wager.boards
        .filter(board => board.isValid())
        .reduce((acc, board) => acc + FireblazeBetslipUtilities.calculateBoardCost(board, columnCost), 0) *
      betslip.wager.participatingDraws.multipleDraws
    );
  },
  [types.getters.GET_IS_BETSLIP_EMPTY]: ({ betslip }) => {
    return betslip.isEmpty();
  },
};

export default getters;
