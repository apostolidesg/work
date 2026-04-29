import types from './types';
import Wheel from '../../../model/powerspin/Wheel';
import powerspinConstants from '../../../util/powerspinConstants';
import Betslip from '../../../model/powerspin/Betslip';
import betslipUtils from '../../../util/betslipUtils';

const mutations = {
  [types.mutations.ADD_BETSLIP](state, { betslip } = {}) {
    state.betslipArray.push(betslip || new Betslip());
    state.selectedBetslipIndex = state.betslipArray.length - 1;
  },
  [types.mutations.UPDATE_BETSLIP](state, { betslipIndex, betslip } = {}) {
    Object.assign(state.betslipArray[betslipIndex], betslip);
  },
  [types.mutations.REMOVE_BETSLIP](state, { betslipIndex } = {}) {
    state.betslipArray.splice(betslipIndex, 1);
    state.betslipArray.length === 0 && state.betslipArray.push(new Betslip());
    state.selectedBetslipIndex = betslipIndex === 0 ? betslipIndex : betslipIndex - 1;
  },
  [types.mutations.ADD_WHEEL](state) {
    if (state.betslipArray[state.selectedBetslipIndex].wager.wheels.length >= 3) return;
    state.betslipArray[state.selectedBetslipIndex].wager.wheels.push(new Wheel());
  },
  [types.mutations.REMOVE_WHEEL](state, { wheelIndex } = {}) {
    if (state.betslipArray[state.selectedBetslipIndex].wager.wheels.length <= 1) return;
    state.betslipArray[state.selectedBetslipIndex].wager.wheels.splice(wheelIndex, 1);
    state.betslipArray[state.selectedBetslipIndex].wager.wheels.length === 1 &&
      (state.betslipArray[state.selectedBetslipIndex].wager.comboMultipliers = [
        powerspinConstants.DEFAULT_MULTIPLIERS,
      ]);
  },
  [types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS](state, { multipleDraws }) {
    state.betslipArray[state.selectedBetslipIndex].wager.participatingDraws = { multipleDraws };
  },
  [types.mutations.SET_REQUESTED_NUMBER](state, { wheelIndex, number } = {}) {
    state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex].setRequestedNumber(number);
  },
  [types.mutations.SET_COLUMN_NUMBER](state, { wheelIndex, number } = {}) {
    state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex].setColumnNumber(number);
  },
  [types.mutations.GENERATE_RANDOM_COLOR](state, { wheelIndex } = {}) {
    const currentBetType = state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex].getColorBoards()[0].betType;
    const colors = [
      powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED,
      powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE,
      powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
    ].filter(color => color !== currentBetType);
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex].getColorBoards()[0].betType = color
  },
  [types.mutations.TOGGLE_QUICK_PICK](state, { wheelIndex } = {}) {
    state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex].addQuickPick();
  },
  [types.mutations.RESET_BETSLIPS](state) {
    state.betslipArray = [new Betslip()];
    state.selectedBetslipIndex = 0;
  },
  [types.mutations.SET_QUICKPLAY_BETSLIP_DATA](state,  betslipData ) {
    state.quickplayBetslipData = betslipData;
  },
  [types.mutations.RESET_QUICKPLAY_BETSLIP_DATA](state ) {
    state.quickplayBetslipData = null;
  },
  [types.mutations.RESET_WHEEL](state, { wheelIndex } = {}) {
    state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex].reset();
  },
  [types.mutations.RESET_WHEELS](state, { betslipIndex } = {}) {
    if (state.betslipArray[betslipIndex]) {
      state.betslipArray[betslipIndex].wager.wheels = [new Wheel()];
      state.betslipArray[betslipIndex].wager.comboMultipliers = [powerspinConstants.DEFAULT_MULTIPLIERS];
    }
  },
  [types.mutations.RESET_CATEGORY](state, { betslipIndex, wheelIndex, categoryType } = {}) {
    betslipUtils.resetWheelCategory(state.betslipArray[betslipIndex].wager.wheels[wheelIndex].categories[categoryType]);
  },
  [types.mutations.TOGGLE_GAME_TYPE](state, { wheelIndex, gameType } = {}) {
    state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex].toggleGameType(gameType);
  },
  [types.mutations.TOGGLE_MULTIPLIERS](state, { wheelIndex, gameCategory, multipliers } = {}) {
    state.betslipArray[state.selectedBetslipIndex].wager.wheels[wheelIndex].toggleMultipliers(
      gameCategory,
      multipliers
    );
  },
  [types.mutations.TOGGLE_BETSLIP_COMBO_MULTIPLIERS](state, { multipliers } = {}) {
    state.betslipArray[state.selectedBetslipIndex].toggleComboMultipliers(multipliers);
  },
  [types.mutations.SET_SELECTED_BETSLIP_INDEX](state, { index } = {}) {
    state.betslipArray = state.betslipArray.filter((betslip) => !betslip.isEmpty());
    state.selectedBetslipIndex = index;
  },
  [types.mutations.RESET_MARKETS](state) {
    state.betslipArray[state.selectedBetslipIndex].wager.markets.reset();
  },
  [types.mutations.RESET_MARKETS_CATEGORY](state, { betslipIndex, categoryType } = {}) {
    betslipUtils.resetMarketCategory(state.betslipArray[betslipIndex].wager.markets.categories[categoryType]);
  },
  [types.mutations.SET_MARKETS_NUMBER_ON_ANY_WHEEL](state, number = 0) {
    state.betslipArray[state.selectedBetslipIndex].wager.markets.setNumberOnWheel(number);
  },
  [types.mutations.TOGGLE_MARKET_GAME_TYPE](state, gameType = 0) {
    state.betslipArray[state.selectedBetslipIndex].wager.markets.toggleMarketGameType(gameType);
  },
  [types.mutations.TOGGLE_MARKET_MULTIPLIERS](state, { gameCategory, multipliers } = {}) {
    state.betslipArray[state.selectedBetslipIndex].wager.markets.toggleMultipliers(gameCategory, multipliers);
  },
};

export default mutations;
