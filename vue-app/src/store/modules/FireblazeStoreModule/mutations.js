import types from './types';
import Betslip from '../../../model/fireblaze/Betslip';
import FireblazeConstants from '../../../util/fireblazeConstants';

const mutations = {
  [types.mutations.SET_BETSLIP](state, { betslip } = {}) {
    state.betslip = betslip;
    state.selectedBoardIndex = 0;
  },
  [types.mutations.SET_SELECTION](state, { selection } = {}) {
    state.betslip.wager.boards[state.selectedBoardIndex].setNumber(selection);
  },
  [types.mutations.SET_MULTIPLIER](state, { multiplier } = {}) {
    state.betslip.wager.boards[state.selectedBoardIndex].setMultipliers(multiplier);
  },
  [types.mutations.QUICK_PICK](state) {
    state.betslip.wager.boards[state.selectedBoardIndex].addQuickPick();
  },
  [types.mutations.SET_BOARD_BETTYPE](state, { betType }) {
    state.betslip.wager.boards[state.selectedBoardIndex].setBetType(betType);
  },
  [types.mutations.RESET_BETSLIPS](state) {
    state.betslip = new Betslip();
    state.selectedBoardIndex = 0;
  },
  [types.mutations.SET_STATISTICS_SELECTION](
    state,
    { selection } = { selection: FireblazeConstants.STATISTICS_SELECTIONS.NONE }
  ) {
    state.statisticsSelection = selection;
  },
  [types.mutations.SET_STATISTICS](state, { statistics } = {}) {
    state.statistics = statistics;
  },
  [types.mutations.RESET_STATISTICS](state) {
    state.statistics = null;
  },
  [types.mutations.CLEAR_SELECTED_BOARD](state) {
    state.betslip.wager.boards[state.selectedBoardIndex].reset();
  },
  [types.mutations.ADD_BOARD](state) {
    state.betslip.addBoard();
    state.selectedBoardIndex = state.betslip.wager.boards.length - 1;
  },
  [types.mutations.REMOVE_BOARD](state, { boardIndex } = {}) {
    state.betslip.removeBoard(boardIndex);
    if (state.betslip.wager.boards.length === 1) {
      state.selectedBoardIndex = 0;
    } else if (boardIndex <= state.selectedBoardIndex) {
      state.selectedBoardIndex > 0 && state.selectedBoardIndex--;
    }
  },
  [types.mutations.SET_SELECTED_BOARD_INDEX](state, { selectedBoardIndex } = {}) {
    if (selectedBoardIndex === state.selectedBoardIndex) return;
    const selectedBoard = state.betslip.wager.boards[selectedBoardIndex];

    if (selectedBoard) {
      state.betslip.wager.boards = state.betslip.wager.boards.filter(b => !b.isEmpty());
      const newBoardIndex = state.betslip.wager.boards.findIndex(b => b === selectedBoard);
      state.selectedBoardIndex = newBoardIndex > -1 ? newBoardIndex : 0;
    }
  },
  [types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS](state, { multipleDraws } = {}) {
    state.betslip.wager.participatingDraws.multipleDraws = multipleDraws;
  },
};

export default mutations;
