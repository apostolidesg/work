import types from './types';
import Betslip from '../../../model/Betslip';

const mutations = {
  [types.mutations.SET_BETSLIP](state, { betslip }) {
    state.betslip = betslip;
    state.activeAreaIndex = 0;
  },
  [types.mutations.TOGGLE_NUMBER](state, { number }) {
    state.betslip.bet_areas[state.activeAreaIndex].toggleNumber(number);
    state.betslip.bet_areas[state.activeAreaIndex].refreshValue();
    state.betslip.refreshValue();
  },
  [types.mutations.ADD_BET_AREA](state) {
    state.betslip.addNewBet();
    state.activeAreaIndex = state.betslip.bet_areas.length - 1;
  },
  [types.mutations.CHANGE_ACTIVE_BET_AREA](state, { activeAreaIndex } = {}) {
    if (state.activeAreaIndex === activeAreaIndex) return;
    const areaToChange = state.betslip.bet_areas[activeAreaIndex];

    if (areaToChange) {
      state.betslip.bet_areas = state.betslip.bet_areas.filter(b => b.filled);
      const newAreaIndex = state.betslip.bet_areas.findIndex(b => b === areaToChange);
      state.activeAreaIndex = newAreaIndex > -1 ? newAreaIndex : 0;
    }
  },
  [types.mutations.DELETE_BET_AREA](state, { areaIndex } = {}) {
    state.betslip.removeBet(areaIndex);
    if (state.betslip.bet_areas.length === 1) {
      state.activeAreaIndex = 0;
    } else if (areaIndex <= state.activeAreaIndex) {
      state.activeAreaIndex > 0 && state.activeAreaIndex--;
    }
  },
  [types.mutations.CLEAR_ACTIVE_BET_AREA](state) {
    state.betslip.bet_areas[state.activeAreaIndex].resetArea();
  },
  [types.mutations.SET_KINO_BONUS_VALUE](state, { value }) {
    state.betslip.bet_areas[state.activeAreaIndex].kinoBonusActive = value;
    state.betslip.bet_areas[state.activeAreaIndex].refreshValue();
    state.betslip.refreshValue();
  },
  [types.mutations.SET_KINO_CLOSE_2_WIN_VALUE](state, { value }) {
    state.betslip.bet_areas[state.activeAreaIndex].kinoClose2WinActive = value;
    state.betslip.bet_areas[state.activeAreaIndex].refreshValue();
    state.betslip.refreshValue();
  },
  [types.mutations.TOGGLE_MULTIPLIER](state, { multipliers }) {
    state.betslip.bet_areas[state.activeAreaIndex].toggleMultiplier(multipliers);
  },
  [types.mutations.SET_ODD_EVEN](state, oddEvenModel = {}) {
    const { oddEven, oddEvenAmount } = oddEvenModel;
    state.betslip.oddEvenGame.oddEven = oddEven;
    state.betslip.oddEvenGame.oddEvenAmount = oddEvenAmount;
    state.betslip.oddEvenGame.calculateValue();
  },
  [types.mutations.RESET_BETSLIP](state) {
    state.betslip = new Betslip();
    state.activeAreaIndex = 0;
  },
  [types.mutations.RESET_ODD_EVEN](state) {
    state.betslip.oddEvenGame.resetOddEven();
  },
  [types.mutations.SET_COLUMNS](state, columnsModel = { columns: [], columnsAmount: [] }) {
    const { columns, columnsAmount } = columnsModel;
    state.betslip.columnsGame.columns = columns.sort((a, b) => a - b);
    state.betslip.columnsGame.columnsAmount = columnsAmount.sort((a, b) => a - b);
    state.betslip.columnsGame.calculateValue();
  },
  [types.mutations.RESET_COLUMNS](state) {
    state.betslip.columnsGame.resetColumns();
  },
  [types.mutations.QUICK_PICK](state, { gameType }) {
    state.betslip.bet_areas[state.activeAreaIndex].quickPickNumbers(gameType);
  },
  [types.mutations.CLEAR_BETSLIP](state) {
    state.betslip = new Betslip();
    state.activeAreaIndex = 0;
  },
  [types.mutations.SET_CONSECUTIVE_DRAWS](state, { multipleDraws }) {
    state.betslip.consecutiveDraws = multipleDraws;
  },
  [types.mutations.SET_READY_BETSLIPS_NUMBERS](state, { numbers }) {
    state.readyBetslipsNumbers = numbers;
  },
};

export default mutations;
