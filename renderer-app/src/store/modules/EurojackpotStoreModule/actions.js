import types from './types';

const actions = {
  [types.actions.SET_BETSLIP]({ commit }, { betslip } = {}) {
    commit(types.mutations.SET_BETSLIP, { betslip });
  },
  [types.actions.SET_SELECTED_BOARD_INDEX]({ commit }, { selectedBoardIndex } = {}) {
    commit(types.mutations.SET_SELECTED_BOARD_INDEX, { selectedBoardIndex });
  },
  [types.actions.SET_CONSECUTIVE_DRAWS]({ commit }, { multipleDraws } = {}) {
    commit(types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS, { multipleDraws });
  },
  [types.actions.ADD_BOARD]({ commit }) {
    commit(types.mutations.ADD_BOARD);
  },
  [types.actions.REMOVE_BOARD]({ commit }, { boardIndex } = {}) {
    commit(types.mutations.REMOVE_BOARD, { boardIndex });
  },
  [types.actions.CLEAR_SELECTED_BOARD]({ commit }) {
    commit(types.mutations.CLEAR_SELECTED_BOARD);
  },
  [types.actions.TOGGLE_QUICK_PICK]({ commit }) {
    commit(types.mutations.TOGGLE_QUICK_PICK);
  },
  [types.actions.SET_MAIN_SELECTION]({ commit }, { mainSelection } = {}) {
    commit(types.mutations.SET_MAIN_SELECTION, { mainSelection });
  },
  [types.actions.SET_EURO_SELECTION]({ commit }, { euroSelection } = {}) {
    commit(types.mutations.SET_EURO_SELECTION, { euroSelection });
  },
  [types.actions.SET_SYSTEM]({ commit }, { systemId = null } = {}) {
    commit(types.mutations.SET_SYSTEM, { systemId });
  },
  [types.actions.RESET_BETSLIP]({ commit }) {
    commit(types.mutations.RESET_BETSLIP);
  },
  // TODO: Add draw info API actions when needed
  // [types.actions.GET_DRAW_INFO]({ commit, rootGetters, dispatch }) { },
  // [types.actions.SET_SALES_OPEN]({ commit }, { apiResponse } = {}) { },
  // [types.actions.SET_SALES_CLOSED]({ commit }) { },
  // [types.actions.CLEAR_TIMER]({ commit, state }) { },
  // [types.actions.GET_STATISTICS]({ commit, rootGetters }) { },
  [types.actions.SET_STATISTICS_SELECTION]({ commit }, { selection } = {}) {
    commit(types.mutations.SET_STATISTICS_SELECTION, { selection });
  },
};

export default actions;
