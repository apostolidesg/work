import types from './types';

const actions = {
  [types.actions.SET_BETSLIP]({ commit }, { betslip }) {
    commit(types.mutations.SET_BETSLIP, { betslip });
  },

  [types.actions.SET_SELECTED_BOARD_INDEX]({ commit }, { index }) {
    commit(types.mutations.SET_SELECTED_BOARD_INDEX, { index });
  },

  [types.actions.TOGGLE_NUMBER]({ commit }, { number, panelType }) {
    commit(types.mutations.TOGGLE_NUMBER, { number, panelType });
  },

  [types.actions.SET_SYSTEM]({ commit }, { systemId }) {
    commit(types.mutations.SET_SYSTEM, { systemId });
  },

  [types.actions.QUICK_PICK]({ commit }, { mainCount, tzokerCount } = {}) {
    commit(types.mutations.QUICK_PICK, { mainCount, tzokerCount });
  },

  [types.actions.CLEAR_WORKING_BOARD]({ commit }) {
    commit(types.mutations.CLEAR_WORKING_BOARD);
  },

  [types.actions.ADD_BOARD_TO_CART]({ commit }) {
    commit(types.mutations.ADD_BOARD_TO_CART);
  },

  [types.actions.REMOVE_BOARD]({ commit }, { boardId }) {
    commit(types.mutations.REMOVE_BOARD, { boardId });
  },

  [types.actions.SHUFFLE_BOARD]({ commit }, { boardId }) {
    commit(types.mutations.SHUFFLE_BOARD, { boardId });
  },

  [types.actions.CLEAR_ALL_BOARDS]({ commit }) {
    commit(types.mutations.CLEAR_ALL_BOARDS);
  },

  [types.actions.SET_CONSECUTIVE_DRAWS]({ commit }, { consecutiveDraws = 1 }) {
    commit(types.mutations.SET_CONSECUTIVE_DRAWS, { consecutiveDraws });
  },

  [types.actions.ADD_MULTIPLE_RANDOM_BOARDS]({ commit }, { count = 6, options = { mainCount: 5, tzokerCount: 1 } }) {
    commit(types.mutations.ADD_MULTIPLE_RANDOM_BOARDS, { count, options });
  },

  [types.actions.ADD_ALL_20_TZOKER]({ commit }) {
    commit(types.mutations.ADD_ALL_20_TZOKER);
  },

  [types.actions.COPY_BOARD_TO_WORKING]({ commit }, { boardId }) {
    commit(types.mutations.COPY_BOARD_TO_WORKING, { boardId });
  },

  [types.actions.UPDATE_BOARD_FROM_WORKING]({ commit }, { boardId }) {
    commit(types.mutations.UPDATE_BOARD_FROM_WORKING, { boardId });
  },

  [types.actions.RESET_BETSLIP]({ commit }) {
    commit(types.mutations.RESET_BETSLIP);
  },

  [types.actions.SET_STATISTICS_SELECTION]({ commit }, { selection }) {
    commit(types.mutations.SET_STATISTICS_SELECTION, { selection });
  },

  [types.actions.GET_STATISTICS]({ commit }) {
    // TODO: Implement statistics API call when ready
    commit(types.mutations.SET_STATISTICS, { statistics: null });
  },
};

export default actions;
