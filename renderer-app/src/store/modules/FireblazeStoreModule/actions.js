import types from './types';

const actions = {
  [types.actions.SET_BETSLIP]({ commit }, { betslip } = {}) {
    commit(types.mutations.SET_BETSLIP, { betslip });
  },

  [types.actions.SET_SELECTION]({ commit }, { selection } = {}) {
    commit(types.mutations.SET_SELECTION, { selection });
  },

  [types.actions.SET_MULTIPLIER]({ commit }, { multiplier } = {}) {
    commit(types.mutations.SET_MULTIPLIER, { multiplier });
  },

  [types.actions.QUICK_PICK]({ commit }) {
    commit(types.mutations.QUICK_PICK);
  },

  [types.actions.SET_BOARD_BETTYPE]({ commit }, { betType }) {
    commit(types.mutations.SET_BOARD_BETTYPE, { betType });
  },

  [types.actions.RESET_BETSLIP]({ commit }) {
    commit(types.mutations.RESET_BETSLIP);
  },

  [types.actions.SET_STATISTICS_SELECTION]({ commit }, { selection } = {}) {
    commit(types.mutations.SET_STATISTICS_SELECTION, { selection });
  },

  // Note: GET_STATISTICS action would require API call setup
  // This is a placeholder - implement when statistics API is available
  [types.actions.GET_STATISTICS]({ commit }) {
    // TODO: Implement statistics API call
    // For now, just reset statistics
    commit(types.mutations.RESET_STATISTICS);
  },

  [types.actions.CLEAR_SELECTED_BOARD]({ commit }) {
    commit(types.mutations.CLEAR_SELECTED_BOARD);
  },

  [types.actions.ADD_BOARD]({ commit }) {
    commit(types.mutations.ADD_BOARD);
  },

  [types.actions.REMOVE_BOARD]({ commit }, { boardIndex } = {}) {
    commit(types.mutations.REMOVE_BOARD, { boardIndex });
  },

  [types.actions.SET_SELECTED_BOARD_INDEX]({ commit }, { selectedBoardIndex } = {}) {
    commit(types.mutations.SET_SELECTED_BOARD_INDEX, { selectedBoardIndex });
  },

  [types.actions.SET_CONSECUTIVE_DRAWS]({ commit }, { consecutiveDraws = 1 } = {}) {
    commit(types.mutations.SET_CONSECUTIVE_DRAWS, { consecutiveDraws });
  },
};

export default actions;
