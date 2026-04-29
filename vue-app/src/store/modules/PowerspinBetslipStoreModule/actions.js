import types from './types';
import powerspinConstants from '../../../util/powerspinConstants';

const actions = {
  [types.actions.ADD_BETSLIP]({ commit }, { betslip } = {}) {
    commit(types.mutations.ADD_BETSLIP, { betslip });
  },
  [types.actions.UPDATE_BETSLIP]({ commit }, { betslipIndex = 0, betslip } = {}) {
    commit(types.mutations.UPDATE_BETSLIP, { betslipIndex, betslip });
  },
  [types.actions.REMOVE_BETSLIP]({ commit }, { betslipIndex } = {}) {
    commit(types.mutations.REMOVE_BETSLIP, { betslipIndex });
  },
  [types.actions.ADD_WHEEL]({ commit }) {
    commit(types.mutations.ADD_WHEEL);
  },
  [types.actions.REMOVE_WHEEL]({ commit }, { wheelIndex } = {}) {
    commit(types.mutations.REMOVE_WHEEL, { wheelIndex });
  },
  [types.actions.SET_BETSLIP_CONSECUTIVE_DRAWS]({ commit }, { multipleDraws = 1 } = {}) {
    commit(types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS, { multipleDraws });
  },
  [types.actions.SET_REQUESTED_NUMBER]({ commit }, { wheelIndex, number }) {
    powerspinConstants.REQUESTED_NUMBERS.includes(number) &&
      commit(types.mutations.SET_REQUESTED_NUMBER, { wheelIndex, number });
  },
  [types.actions.SET_COLUMN_NUMBER]({ commit }, { wheelIndex, number }) {
    commit(types.mutations.SET_COLUMN_NUMBER, { wheelIndex, number });
  },
  [types.actions.QUICK_PICK_CLICKED]({ commit }, { wheelIndex }) {
    commit(types.mutations.TOGGLE_QUICK_PICK, { wheelIndex });
  },
  [types.actions.RESET_BETSLIPS]({ commit }) {
    commit(types.mutations.RESET_BETSLIPS);
  },
  [types.actions.SET_QUICKPLAY_BETSLIP_DATA]({ commit }, { betslipData }) {
    commit(types.mutations.SET_QUICKPLAY_BETSLIP_DATA, betslipData);
  },
  [types.actions.RESET_QUICKPLAY_BETSLIP_DATA]({ commit }) {
    commit(types.mutations.RESET_QUICKPLAY_BETSLIP_DATA);
  },
  [types.actions.RESET_WHEEL]({ commit }, { wheelIndex }) {
    commit(types.mutations.RESET_WHEEL, { wheelIndex });
  },
  [types.actions.RESET_WHEELS]({ commit }, { betslipIndex } = {}) {
    commit(types.mutations.RESET_WHEELS, { betslipIndex });
  },
  [types.actions.GENERATE_RANDOM_COLOR]({ commit }, { wheelIndex } = {}) {
    commit(types.mutations.GENERATE_RANDOM_COLOR, { wheelIndex });
  },
  [types.actions.RESET_CATEGORY]({ commit }, { betslipIndex, wheelIndex = 0, categoryType }) {
    commit(types.mutations.RESET_CATEGORY, { betslipIndex, wheelIndex, categoryType });
  },
  [types.actions.TOGGLE_GAME_TYPE]({ commit }, { wheelIndex, gameType }) {
    commit(types.mutations.TOGGLE_GAME_TYPE, { wheelIndex, gameType });
  },
  [types.actions.TOGGLE_MULTIPLIERS]({ commit }, { wheelIndex, gameCategory, multipliers }) {
    commit(types.mutations.TOGGLE_MULTIPLIERS, { wheelIndex, gameCategory, multipliers });
  },
  [types.actions.TOGGLE_BETSLIP_COMBO_MULTIPLIERS]({ commit }, { multipliers }) {
    commit(types.mutations.TOGGLE_BETSLIP_COMBO_MULTIPLIERS, { multipliers });
  },
  [types.actions.SET_SELECTED_BETSLIP_INDEX]({ commit }, { index }) {
    commit(types.mutations.SET_SELECTED_BETSLIP_INDEX, { index });
  },
  [types.actions.RESET_MARKETS]({ commit }) {
    commit(types.mutations.RESET_MARKETS);
  },
  [types.actions.RESET_MARKETS_CATEGORY]({ commit }, { betslipIndex, categoryType } = {}) {
    commit(types.mutations.RESET_MARKETS_CATEGORY, { betslipIndex, categoryType });
  },
  [types.actions.SET_MARKETS_NUMBER_ON_ANY_WHEEL]({ commit }, number = 0) {
    commit(types.mutations.SET_MARKETS_NUMBER_ON_ANY_WHEEL, number);
  },
  [types.actions.TOGGLE_MARKET_GAME_TYPE]({ commit }, gameType = 0) {
    commit(types.mutations.TOGGLE_MARKET_GAME_TYPE, gameType);
  },
  [types.mutations.TOGGLE_MARKET_MULTIPLIERS]({ commit }, { gameCategory, multipliers } = {}) {
    commit(types.mutations.TOGGLE_MARKET_MULTIPLIERS, { gameCategory, multipliers });
  },
};

export default actions;
