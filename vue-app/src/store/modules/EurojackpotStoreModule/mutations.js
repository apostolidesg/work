import types from './types';
import Betslip from '../../../model/eurojackpot/Betslip';
import EurojackpotConstants from '../../../util/eurojackpotConstants';

const mutations = {
  [types.mutations.SET_BETSLIP](state, { betslip } = {}) {
    state.betslip = betslip;
    state.selectedBoardIndex = 0;
  },
  [types.mutations.SET_SELECTED_BOARD_INDEX](state, { selectedBoardIndex } = {}) {
    // set the index only if it valid for the boards array
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
  [types.mutations.ADD_BOARD](state) {
    state.betslip.addBoard();
    state.selectedBoardIndex = state.betslip.wager.boards.length - 1;
  },
  [types.mutations.REMOVE_BOARD](state, { boardIndex } = {}) {
    state.betslip.removeBoard(boardIndex);
    // if the removed board has index more or equal than the selected index, then leave the selected index as it is
    // otherwise decrease the selected index by 1
    if (state.betslip.wager.boards.length === 1) {
      state.selectedBoardIndex = 0;
    } else if (boardIndex <= state.selectedBoardIndex) {
      state.selectedBoardIndex > 0 && state.selectedBoardIndex--;
    }
  },
  [types.mutations.CLEAR_SELECTED_BOARD](state) {
    state.betslip.wager.boards[state.selectedBoardIndex].reset();
  },
  [types.mutations.TOGGLE_QUICK_PICK](state) {
    state.betslip.wager.boards[state.selectedBoardIndex].addQuickPick();
  },
  [types.mutations.SET_MAIN_SELECTION](state, { mainSelection } = {}) {
    state.betslip.wager.boards[state.selectedBoardIndex].setMainNumber(mainSelection);
  },
  [types.mutations.SET_EURO_SELECTION](state, { euroSelection } = {}) {
    state.betslip.wager.boards[state.selectedBoardIndex].setEuroNumber(euroSelection);
  },
  [types.mutations.SET_SYSTEM](state, { systemId } = {}) {
    state.betslip.wager.boards[state.selectedBoardIndex].setSystemId(systemId);
  },
  [types.mutations.RESET_BETSLIP](state) {
    state.betslip = new Betslip();
    state.selectedBoardIndex = 0;
  },
  [types.mutations.SET_ACTIVE_DRAW_API_TIMEOUT](state, { activeDrawApiTimeout } = {}) {
    state.activeDrawApiTimeout = activeDrawApiTimeout;
  },
  [types.mutations.RESET_ACTIVE_DRAW_API_TIMEOUT](state) {
    state.activeDrawApiTimeout = null;
  },
  [types.mutations.SET_SALES_OPEN](state, { activeDrawId, activeDrawTime, salesCloseTime, jackpot } = {}) {
    state.activeDrawId = activeDrawId;
    state.activeDrawTime = activeDrawTime;
    state.salesCloseTime = salesCloseTime;
    state.jackpotAmount = jackpot || null;
    state.salesStatus = EurojackpotConstants.DRAW_STATUS.SALES_OPEN;
  },
  [types.mutations.SET_SALES_CLOSED](state) {
    state.activeDrawId = null;
    state.activeDrawTime = null;
    state.salesCloseTime = null;
    state.jackpotAmount = null;
    state.salesStatus = EurojackpotConstants.DRAW_STATUS.SALES_CLOSED;
  },
  [types.mutations.SET_STATISTICS](state, { statistics } = {}) {
    state.statistics = statistics;
  },
  [types.mutations.RESET_STATISTICS](state) {
    state.statistics = null;
  },
  [types.mutations.SET_STATISTICS_SELECTION](
    state,
    { selection } = { selection: EurojackpotConstants.STATISTICS_SELECTIONS.NONE }
  ) {
    state.statisticsSelection = selection;
  },
  [types.mutations.SET_IS_ACTIVE_DRAW_EXTRA](state, { drawPrizeCategories }) {
    state.isActiveDrawExtra = drawPrizeCategories.some(
      (category) => category?.metaDrawResults && category?.metaDrawResults?.type === 'Boosted Primary Categories'
    );
  },
};

export default mutations;
