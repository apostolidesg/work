import types from './types';

const getters = {
  // [types.getters.GET_PLAYER_BETSLIPS]: ({ playerBetslips }) => playerBetslips,
  // [types.getters.GET_PLAYER_CURRENT_DRAW_BETSLIPS]: ({ playerBetslips, drawInfo: { currentDrawId } }) =>
  //   playerBetslips.filter(({ draws }) => draws.includes(currentDrawId)),
  // [types.getters.GET_PLAYER_NEXT_DRAW_BETSLIPS]: ({ playerBetslips, drawInfo: { nextDrawId } }) =>
  //   playerBetslips.filter(({ draws }) => draws.includes(nextDrawId)),
  [types.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN]: ({ isActiveLiveDrawScreen }) => isActiveLiveDrawScreen,
  // [types.getters.GET_CURRENT_DRAW_BONUS_NUMBER]: ({ currentDrawBonusNumber }) => currentDrawBonusNumber,
  // [types.getters.GET_CURRENT_DRAW_ID]: ({ drawInfo: { currentDrawId } }) => currentDrawId,
  // [types.getters.GET_NEXT_DRAW_ID]: ({ drawInfo: { nextDrawId } }) => nextDrawId,
  // [types.getters.GET_TIME_TO_NEXT_DRAW]: ({ drawInfo: { timeToNextDraw } }) => timeToNextDraw,
  // [types.getters.GET_IS_VALID_TIME_TO_NEXT_DRAW]: ({ drawInfo: { timeToNextDraw } }) => new Date(timeToNextDraw) - Date.now() > 0,
  // [types.getters.GET_CURRENT_DRAW_WINNING_NUMBERS]: ({ currentDrawWinningNumbers }) => currentDrawWinningNumbers,
  // [types.getters.GET_CURRENT_DRAW_WINNING_COLUMN]: ({ currentDrawWinningColumn }) =>
  //   currentDrawWinningColumn === 0 ? 10 : currentDrawWinningColumn,
  // [types.getters.GET_CURRENT_DRAW_WINNING_ODD_EVEN_DRAW]: ({ currentDrawWinningOddEvenDraw }) =>
  //   currentDrawWinningOddEvenDraw,
  // [types.getters.GET_ACTIVE_BETSLIP_AREA]: ({ activeBetslipArea }) => activeBetslipArea,
  [types.getters.GET_IS_NOT_BETSLIP_IN_SESSION]:
    ({ playerBetslips }) =>
    ({ serialNumber: inputSerialNumber } = {}) =>
      playerBetslips.findIndex(({ serialNumber }) => inputSerialNumber === serialNumber) === -1,
  // [types.getters.GET_SHOULD_TRIGGER_REDIRECT_DIALOG]: ({ playerBetslips, drawInfo: { nextDrawId }, isActiveLiveDrawScreen }) =>
  //   () => !isActiveLiveDrawScreen && playerBetslips.some(({draws}) => draws.includes(nextDrawId)),
  // [types.getters.GET_CURRENT_DRAW_BOARDS]: ({ currentDrawData: { winningBoards, futureWinningBoards, nonWinningBoards } }) =>
  //   [...winningBoards, ...futureWinningBoards, ...nonWinningBoards],
  // [types.getters.GET_HAS_CURRENT_DRAW_BOARDS]: (_, getters) => getters[types.getters.GET_CURRENT_DRAW_BOARDS].length > 0,
  // [types.getters.GET_CURRENT_DRAW_TOTAL_WINNING_AMOUNT]: ({ currentDrawData: { totalWinningAmount } }) => totalWinningAmount,
  // [types.getters.GET_IS_CURRENT_DRAW_BEGAN]: ({ currentDrawBegan }) => currentDrawBegan,
  // [types.getters.GET_IS_CURRENT_DRAW_COMPLETED]: ({ currentDrawCompleted }) => currentDrawCompleted,
  // [types.getters.GET_CURRENT_DRAW_PLAYER_SELECTED_BET_ID]: ({ currentDrawPlayerSelectedBet: { wagerBoardId } }) => wagerBoardId,
  // [types.getters.GET_CURRENT_DRAW_PLAYER_SELECTED_BET_SELECTION]: ({ currentDrawPlayerSelectedBet: { boardSelection } }) => boardSelection,
  // [types.getters.GET_NEXT_DRAW_AVAILABLE_BETS_COUNT]: ({ playerBetslips, drawInfo: { nextDrawId } = {} } = {}) =>
  //   playerBetslips.filter(({ draws }) => draws.includes(nextDrawId)).reduce((totalBoards, {boards}) => totalBoards + boards.length, 0),
  // [types.getters.GET_SHOW_NEXT_DRAW_AVAILABLE_BETS]: ({ showNextDrawAvailableBets }) => showNextDrawAvailableBets,
  // [types.getters.GET_AUTO_REDIRECT_AFTER_DRAW]: ({ autoRedirectAfterDraw }) => autoRedirectAfterDraw,
};

export default getters;
