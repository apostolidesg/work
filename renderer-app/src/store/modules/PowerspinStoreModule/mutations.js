import types from './types';
import Betslip from '@/model/powerspin/Betslip';
import Wheel from '@/model/powerspin/Wheel';

const mutations = {
  [types.mutations.SET_BETSLIP_ARRAY](state, { betslipArray }) {
    state.betslipArray = betslipArray;
  },

  [types.mutations.SET_SELECTED_BETSLIP_INDEX](state, { index }) {
    state.selectedBetslipIndex = index;
  },

  [types.mutations.ADD_BETSLIP](state) {
    state.betslipArray.push(new Betslip());
    state.selectedBetslipIndex = state.betslipArray.length - 1;
  },

  [types.mutations.REMOVE_BETSLIP](state, { betslipIndex }) {
    state.betslipArray.splice(betslipIndex, 1);
    if (state.selectedBetslipIndex >= state.betslipArray.length) {
      state.selectedBetslipIndex = state.betslipArray.length - 1;
    }
  },

  [types.mutations.RESET_BETSLIP](state, { betslipIndex }) {
    state.betslipArray[betslipIndex] = new Betslip();
  },

  [types.mutations.RESET_ALL_BETSLIPS](state) {
    state.betslipArray = [new Betslip()];
    state.selectedBetslipIndex = 0;
  },

  [types.mutations.SET_MODE](state, { mode }) {
    state.betslipArray[state.selectedBetslipIndex].mode = mode;
  },

  [types.mutations.SET_COMBO_MODE](state, { isCombo }) {
    state.betslipArray[state.selectedBetslipIndex].isCombo = isCombo;
  },

  [types.mutations.SET_CONSECUTIVE_DRAWS](state, { draws }) {
    state.betslipArray[state.selectedBetslipIndex].setConsecutiveDraws(draws);
  },

  [types.mutations.ADD_WHEEL](state) {
    const betslip = state.betslipArray[state.selectedBetslipIndex];
    betslip.wager.wheels.push(new Wheel());
  },

  [types.mutations.REMOVE_WHEEL](state, { wheelIndex }) {
    const betslip = state.betslipArray[state.selectedBetslipIndex];
    betslip.wager.wheels.splice(wheelIndex, 1);
  },

  [types.mutations.SET_QUICKPLAY_BETSLIP_DATA](state, { data }) {
    state.quickplayBetslipData = data;
  },

  [types.mutations.TOGGLE_MULTIPLIERS](state, { wheelIndex, gameCategory, multipliers }) {
    const wheel = state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex];
    wheel.toggleMultipliers(gameCategory, multipliers);
  },

  [types.mutations.TOGGLE_GAME_TYPE](state, { wheelIndex, gameType }) {
    const wheel = state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex];
    wheel.toggleGameType(gameType);
  },

  [types.mutations.SET_REQUESTED_NUMBER](state, { wheelIndex, number }) {
    const wheel = state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex];
    wheel.setRequestedNumber(number);
  },

  [types.mutations.SET_COLUMN_NUMBER](state, { wheelIndex, number }) {
    const wheel = state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex];
    wheel.setColumnNumber(number);
  },

  [types.mutations.QUICK_PICK](state, { wheelIndex }) {
    const wheel = state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex];
    wheel.addQuickPick();
  },

  [types.mutations.SET_MARKETS_NUMBER_ON_ANY_WHEEL](state, number) {
    const markets = state.betslipArray[state.selectedBetslipIndex].wager.markets;
    markets.setNumberOnWheel(number);
  },

  [types.mutations.TOGGLE_MARKET_GAME_TYPE](state, gameType) {
    const markets = state.betslipArray[state.selectedBetslipIndex].wager.markets;
    markets.toggleMarketGameType(gameType);
  },

  [types.mutations.TOGGLE_MARKET_MULTIPLIERS](state, { gameCategory, multipliers }) {
    const markets = state.betslipArray[state.selectedBetslipIndex].wager.markets;
    markets.toggleMultipliers(gameCategory, multipliers);
  },

  [types.mutations.RESET_CATEGORY](state, { betslipIndex, categoryType }) {
    const wheel = state.betslipArray[betslipIndex].wager.wheels[0];
    wheel.resetCategory(categoryType);
  },

  [types.mutations.RESET_WHEELS](state, { betslipIndex }) {
    const betslip = state.betslipArray[betslipIndex];
    betslip.wager.wheels.forEach((wheel) => wheel.reset());
  },
};

export default mutations;
