import types from './types';

const actions = {
  [types.actions.SET_BETSLIP]({ commit }, { betslip }) {
    commit(types.mutations.SET_BETSLIP, { betslip });
  },
  [types.actions.TOGGLE_NUMBER]({ commit }, { number }) {
    commit(types.mutations.TOGGLE_NUMBER, { number });
  },
  [types.actions.ADD_BET_AREA]({ commit }) {
    commit(types.mutations.ADD_BET_AREA);
  },
  [types.actions.CHANGE_ACTIVE_BET_AREA]({ commit }, { activeAreaIndex } = {}) {
    commit(types.mutations.CHANGE_ACTIVE_BET_AREA, { activeAreaIndex });
  },
  [types.actions.DELETE_BET_AREA]({ commit }, { areaIndex } = {}) {
    commit(types.mutations.DELETE_BET_AREA, { areaIndex });
  },
  [types.actions.CLEAR_ACTIVE_BET_AREA]({ commit }) {
    commit(types.mutations.CLEAR_ACTIVE_BET_AREA);
  },
  [types.actions.SET_KINO_BONUS_VALUE]({ commit }, { value }) {
    commit(types.mutations.SET_KINO_BONUS_VALUE, { value });
  },
  [types.actions.SET_KINO_CLOSE_2_WIN_VALUE]({ commit }, { value }) {
    commit(types.mutations.SET_KINO_CLOSE_2_WIN_VALUE, { value });
  },
  [types.actions.RESET_BETSLIP]({ commit }) {
    commit(types.mutations.RESET_BETSLIP);
  },
  [types.actions.TOGGLE_MULTIPLIER]({ commit }, { multipliers }) {
    commit(types.mutations.TOGGLE_MULTIPLIER, { multipliers });
  },
  [types.actions.SET_ODD_EVEN]({ commit }, oddEvenModel) {
    commit(types.mutations.SET_ODD_EVEN, oddEvenModel);
  },
  [types.actions.RESET_ODD_EVEN]({ commit }) {
    commit(types.mutations.RESET_ODD_EVEN);
  },
  [types.actions.SET_COLUMNS]({ commit }, columnsModel) {
    commit(types.mutations.SET_COLUMNS, columnsModel);
  },
  [types.actions.RESET_COLUMNS]({ commit }) {
    commit(types.mutations.RESET_COLUMNS);
  },
  [types.actions.QUICK_PICK]({ commit }, { gameType }) {
    commit(types.mutations.QUICK_PICK, { gameType });
  },
  [types.actions.CLEAR_BETSLIP]({ commit }) {
    commit(types.mutations.CLEAR_BETSLIP);
  },
  [types.actions.SET_CONSECUTIVE_DRAWS]({ commit }, { multipleDraws }) {
    commit(types.mutations.SET_CONSECUTIVE_DRAWS, { multipleDraws });
  },
  [types.actions.SET_READY_BETSLIPS_NUMBERS]({ commit }, { numbers }) {
    commit(types.mutations.SET_READY_BETSLIPS_NUMBERS, { numbers });
  },
};

export default actions;
