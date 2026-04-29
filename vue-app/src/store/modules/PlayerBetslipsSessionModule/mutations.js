import types from './types';
import PlayerBetslip from '../../../model/playerSession/PlayerBetslip';
import Constants from '../../../util/Constants';
import compose from 'ramda/es/compose';
import ifElse from 'ramda/es/ifElse';

const createColumnsArray = currentDrawWinningNumbers => {
  const columns = new Array(10).fill(0);
  currentDrawWinningNumbers.forEach(drawNumber => columns[drawNumber % 10]++);
  return columns;
};

const getIndexOfMaxValue = columns =>
  columns.reduce((maxIndex, value, index, arr) => (value > arr[maxIndex] ? index : maxIndex), 0);

const calcWinningColumn = (columns, oldColumn, newColumn) =>
  columns[oldColumn] >= columns[newColumn] ? oldColumn : newColumn;

const createEvenOddDrawArray = (currentDrawWinningNumbers, resultEvenOdd) => {
  currentDrawWinningNumbers.forEach(winningNumber => resultEvenOdd[winningNumber % 2]++);
  return resultEvenOdd;
};

const calcEvenOddDraw = ([even, odd]) => {
  if (even > odd) {
    return Constants.ILOT_GAMETYPES.EVEN;
  }
  if (even < odd) {
    return Constants.ILOT_GAMETYPES.ODD;
  }
  return Constants.ILOT_GAMETYPES.DRAW;
};

const isFirstDrawBelowNextDraw = ({firstDraw, nextDraw}) => firstDraw < nextDraw;

const setImportedBetslipDrawData = ({nextDraw, draws}) => ({
  firstDraw: nextDraw,
  draws: draws.filter(draw => draw >= nextDraw)
});

const mutations = {
  [types.mutations.ADD_PLAYER_BETSLIP](state, payload) {
    state.playerBetslips.push(new PlayerBetslip(payload));
  },
  [types.mutations.CLEAR_PLAYER_BETSLIPS](state) {
    state.playerBetslips = [];
  },
  [types.mutations.REMOVE_PLAYER_INVALID_BETSLIPS](state) {
    state.playerBetslips = [...state.playerBetslips.filter(({ lastDraw }) => lastDraw > state.drawInfo.currentDrawId)];
  },
  [types.mutations.UPDATE_DRAW_INFO](state, { nextDrawId, currentDrawId, timeToNextDraw }) {
    state.drawInfo = {nextDrawId, currentDrawId, timeToNextDraw};
  },
  [types.mutations.CLEAR_DRAW_INFO](state) {
    state.drawInfo = {
      nextDrawId: 0,
      currentDrawId: 0,
      timeToNextDraw: 0,
    };
  },
  [types.mutations.ENABLE_LIVE_DRAW_SCREEN](state) {
    state.isActiveLiveDrawScreen = true;
  },
  [types.mutations.DISABLE_LIVE_DRAW_SCREEN](state) {
    state.isActiveLiveDrawScreen = false;
  },
  [types.mutations.ADD_CURRENT_DRAW_BONUS_NUMBER](state, bonusNumber) {
    state.currentDrawBonusNumber = bonusNumber;
  },
  [types.mutations.CLEAR_CURRENT_DRAW_BONUS_NUMBER](state) {
    state.currentDrawBonusNumber = null;
  },
  [types.mutations.ADD_CURRENT_DRAW_WINNING_NUMBER](state, kinoNumber) {
    state.currentDrawWinningNumbers = [...new Set([...state.currentDrawWinningNumbers, kinoNumber])];
  },
  [types.mutations.CLEAR_CURRENT_DRAW_WINNING_NUMBERS](state) {
    state.currentDrawWinningNumbers = [];
  },
  [types.mutations.SET_CURRENT_DRAW_WINNING_NUMBERS](state, winningNumbers){
    state.currentDrawWinningNumbers = [...new Set(winningNumbers)];
  },
  [types.mutations.SET_CURRENT_DRAW_WINNING_COLUMN](state, winningColumn) {
    state.currentDrawWinningColumn = winningColumn;
  },
  [types.mutations.CALC_CURRENT_DRAW_WINNING_COLUMN](state) {
    const columns = createColumnsArray([...state.currentDrawWinningNumbers]);
    const maxColumn = getIndexOfMaxValue(columns);
    state.currentDrawWinningColumn = calcWinningColumn(columns, state.currentDrawWinningColumn, maxColumn);
  },
  [types.mutations.CLEAR_CURRENT_DRAW_WINNING_COLUMN](state) {
    state.currentDrawWinningColumn = null;
  },
  [types.mutations.SET_CURRENT_DRAW_WINNING_ODD_EVEN_DRAW](state, winningParity) {
    state.currentDrawWinningOddEvenDraw = Constants.ILOT_GAMETYPES[winningParity.toUpperCase()];
  },
  [types.mutations.CALC_CURRENT_DRAW_WINNING_ODD_EVEN_DRAW](state) {
    state.currentDrawWinningOddEvenDraw = compose(
      calcEvenOddDraw,
      createEvenOddDrawArray
    )([...state.currentDrawWinningNumbers], [0, 0]);
  },
  [types.mutations.CLEAR_CURRENT_DRAW_WINNING_ODD_EVEN_DRAW](state) {
    state.currentDrawWinningOddEvenDraw = null;
  },
  [types.mutations.UPDATE_ACTIVE_BETSLIP_AREA](state, payload) {
    state.activeBetslipArea = payload;
  },
  [types.mutations.IMPORT_PLAYER_BETSLIP](state, payload) {
    const importedPlayerBetslip = new PlayerBetslip(payload);
    const {draws, firstDraw} = importedPlayerBetslip;
    const nextDraw = state.nextDrawIdForImportedBetslip;
    const importedBetslipChangedDrawData = ifElse(
      isFirstDrawBelowNextDraw,
      setImportedBetslipDrawData,
      () => ({})
    )({firstDraw, nextDraw, draws});
    state.playerBetslips.push({...importedPlayerBetslip, ...importedBetslipChangedDrawData});
  },
  [types.mutations.UPDATE_CURRENT_DRAW_WINNING_BOARDS](state, payload) {
    state.currentDrawData.winningBoards = [...payload];
  },
  [types.mutations.UPDATE_CURRENT_DRAW_FUTURE_WINNING_BOARDS](state, payload) {
    state.currentDrawData.futureWinningBoards = [...payload];
  },
  [types.mutations.UPDATE_CURRENT_DRAW_NON_WINNING_BOARDS](state, payload) {
    state.currentDrawData.nonWinningBoards = [...payload];
  },
  [types.mutations.UPDATE_CURRENT_DRAW_TOTAL_WINNING_AMOUNT](state, payload) {
    state.currentDrawData.totalWinningAmount = payload;
  },
  [types.mutations.CLEAR_CURRENT_DRAW_BOARD_DATA](state) {
    state.currentDrawData = {
      winningBoards: [],
      futureWinningBoards: [],
      nonWinningBoards: [],
      totalWinningAmount: 0,
    };
  },
  [types.mutations.ENABLE_CURRENT_DRAW_BEGAN](state) {
    state.currentDrawBegan = true;
  },
  [types.mutations.DISABLE_CURRENT_DRAW_BEGAN](state) {
    state.currentDrawBegan = false;
  },
  [types.mutations.UPDATE_CURRENT_DRAW_COMPLETED](state) {
    state.currentDrawCompleted = true;
  },
  [types.mutations.CLEAR_CURRENT_DRAW_COMPLETED](state) {
    state.currentDrawCompleted = false;
  },
  [types.mutations.UPDATE_CURRENT_DRAW_PLAYER_SELECTED_BET](state, { wagerBoardId, boardSelection }) {
    state.currentDrawPlayerSelectedBet = {wagerBoardId, boardSelection: [...boardSelection]};
  },
  [types.mutations.CLEAR_CURRENT_DRAW_PLAYER_SELECTED_BET](state) {
    state.currentDrawPlayerSelectedBet = {wagerBoardId: '', boardSelection: []};
  },
  [types.mutations.ENABLE_SHOW_NEXT_DRAW_AVAILABLE_BETS](state) {
    state.showNextDrawAvailableBets = true;
  },
  [types.mutations.DISABLE_SHOW_NEXT_DRAW_AVAILABLE_BETS](state) {
    state.showNextDrawAvailableBets = false;
  },
  [types.mutations.ENABLE_AUTO_REDIRECT_AFTER_DRAW](state) {
    state.autoRedirectAfterDraw = true;
  },
  [types.mutations.DISABLE_AUTO_REDIRECT_AFTER_DRAW](state) {
    state.autoRedirectAfterDraw = false;
  },
  [types.mutations.SET_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP](state, nextDrawId) {
    state.nextDrawIdForImportedBetslip = nextDrawId;
  },
  [types.mutations.CLEAR_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP](state) {
    state.nextDrawIdForImportedBetslip = 0;
  },
};

export default mutations;
