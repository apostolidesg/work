import types from './types';

const actions = {
  [types.actions.SET_BETSLIP_ARRAY]({ commit }, payload) {
    commit(types.mutations.SET_BETSLIP_ARRAY, payload);
  },

  [types.actions.SET_SELECTED_BETSLIP_INDEX]({ commit }, payload) {
    commit(types.mutations.SET_SELECTED_BETSLIP_INDEX, payload);
  },

  [types.actions.ADD_BETSLIP]({ commit }) {
    commit(types.mutations.ADD_BETSLIP);
  },

  [types.actions.REMOVE_BETSLIP]({ commit }, payload) {
    commit(types.mutations.REMOVE_BETSLIP, payload);
  },

  [types.actions.RESET_BETSLIP]({ commit }, payload) {
    commit(types.mutations.RESET_BETSLIP, payload);
  },

  [types.actions.RESET_ALL_BETSLIPS]({ commit }) {
    commit(types.mutations.RESET_ALL_BETSLIPS);
  },

  [types.actions.SET_MODE]({ commit }, payload) {
    commit(types.mutations.SET_MODE, payload);
  },

  [types.actions.SET_COMBO_MODE]({ commit }, payload) {
    commit(types.mutations.SET_COMBO_MODE, payload);
  },

  [types.actions.SET_CONSECUTIVE_DRAWS]({ commit }, payload) {
    commit(types.mutations.SET_CONSECUTIVE_DRAWS, payload);
  },

  [types.actions.ADD_WHEEL]({ commit }) {
    commit(types.mutations.ADD_WHEEL);
  },

  [types.actions.REMOVE_WHEEL]({ commit }, payload) {
    commit(types.mutations.REMOVE_WHEEL, payload);
  },

  [types.actions.SET_QUICKPLAY_BETSLIP_DATA]({ commit }, payload) {
    commit(types.mutations.SET_QUICKPLAY_BETSLIP_DATA, payload);
  },

  [types.actions.TOGGLE_MULTIPLIERS]({ commit }, payload) {
    commit(types.mutations.TOGGLE_MULTIPLIERS, payload);
  },

  [types.actions.TOGGLE_GAME_TYPE]({ commit }, payload) {
    commit(types.mutations.TOGGLE_GAME_TYPE, payload);
  },

  [types.actions.SET_REQUESTED_NUMBER]({ commit }, payload) {
    commit(types.mutations.SET_REQUESTED_NUMBER, payload);
  },

  [types.actions.SET_COLUMN_NUMBER]({ commit }, payload) {
    commit(types.mutations.SET_COLUMN_NUMBER, payload);
  },

  [types.actions.QUICK_PICK_CLICKED]({ commit }, payload) {
    commit(types.mutations.QUICK_PICK, payload);
  },

  [types.actions.SET_MARKETS_NUMBER_ON_ANY_WHEEL]({ commit }, number) {
    commit(types.mutations.SET_MARKETS_NUMBER_ON_ANY_WHEEL, number);
  },

  [types.actions.TOGGLE_MARKET_GAME_TYPE]({ commit }, gameType) {
    commit(types.mutations.TOGGLE_MARKET_GAME_TYPE, gameType);
  },

  [types.actions.TOGGLE_MARKET_MULTIPLIERS]({ commit }, payload) {
    commit(types.mutations.TOGGLE_MARKET_MULTIPLIERS, payload);
  },

  [types.actions.RESET_CATEGORY]({ commit }, payload) {
    commit(types.mutations.RESET_CATEGORY, payload);
  },

  [types.actions.RESET_WHEELS]({ commit }, payload) {
    commit(types.mutations.RESET_WHEELS, payload);
  },
};

export default actions;
