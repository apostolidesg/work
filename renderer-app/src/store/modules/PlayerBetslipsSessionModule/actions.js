import types from './types';
// import liveDrawTypes from '../LiveDrawModule/types';
// import Worker from '../../../web-workers/WinningsCalculator/WorkerCalculateCosts.worker';
// import NextDrawInfoService from '../../../util/NextDrawInfoService';
// import isEmpty from 'ramda/es/isEmpty';

// const worker = new Worker();

// const triggerWorkerBoardDataCalculations = (commit, payloadForWorker) => {
//   worker.postMessage(JSON.stringify(payloadForWorker));

//   const setupWorker = (resolve, reject) => {
//     worker.onmessage = ({
//       data: { winningBoards = [], futureWinningBoards = [], nonWinningBoards = [], totalWinningAmount = 0 } = {},
//     }) => {
//       commit(types.mutations.UPDATE_CURRENT_DRAW_WINNING_BOARDS, winningBoards);
//       commit(types.mutations.UPDATE_CURRENT_DRAW_FUTURE_WINNING_BOARDS, futureWinningBoards);
//       commit(types.mutations.UPDATE_CURRENT_DRAW_NON_WINNING_BOARDS, nonWinningBoards);
//       commit(types.mutations.UPDATE_CURRENT_DRAW_TOTAL_WINNING_AMOUNT, totalWinningAmount);
//       resolve('successful');
//       reject('failed to update store');
//     };
//   };

//   return new Promise(setupWorker);
// };

const actions = {
  // [types.actions.INIT_PLAYER_SESSION_STATE]({ dispatch, commit }) {
  //   dispatch(types.actions.CLEAR_PLAYER_BETSLIPS);
  //   commit(types.actions.CLEAR_DRAW_INFO);
  //   dispatch(liveDrawTypes.namespaceMapper.RESET_LIVE_DRAW, null, { root: true });
  // },
  // [types.actions.INIT_STATE_BEFORE_DRAW]({ commit }) {
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_WINNING_NUMBERS);
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_BONUS_NUMBER);
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_WINNING_COLUMN);
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_WINNING_ODD_EVEN_DRAW);
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_BOARD_DATA);
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_PLAYER_SELECTED_BET);
  //   commit(types.mutations.DISABLE_CURRENT_DRAW_BEGAN);
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_COMPLETED);
  //   commit(types.mutations.DISABLE_SHOW_NEXT_DRAW_AVAILABLE_BETS);
  //   commit(types.mutations.DISABLE_AUTO_REDIRECT_AFTER_DRAW);
  // },
  // [types.actions.ADD_PLAYER_BETSLIP]({ dispatch, commit, state: { showNextDrawAvailableBets } }, payload) {
  //   commit(types.mutations.ADD_PLAYER_BETSLIP, payload);
  //   // Enable this in case that the player will be able to add bets in the current animating draw between 00:00 - 03:00
  //   // In order to recalculate the current or final results
  //   // !showNextDrawAvailableBets && dispatch(types.actions.UPDATE_CURRENT_DRAW_BOARDS_DATA);
  // },
  // [types.actions.CLEAR_PLAYER_BETSLIPS]({ dispatch, commit }) {
  //   commit(types.mutations.CLEAR_PLAYER_BETSLIPS);
  //   commit(types.mutations.DISABLE_LIVE_DRAW_SCREEN);
  //   dispatch(types.actions.INIT_STATE_BEFORE_DRAW);
  //   dispatch(liveDrawTypes.namespaceMapper.RESET_TO_DEFAULT_THEME, null, { root: true });
  // },
  // async [types.actions.UPDATE_DRAW_INFO]({
  //   dispatch,
  //   commit,
  //   state: {
  //     drawInfo: { currentDrawId },
  //   },
  // }) {
  //   dispatch(types.actions.INIT_STATE_BEFORE_DRAW);
  //   commit(types.mutations.REMOVE_PLAYER_INVALID_BETSLIPS);
  //   await dispatch(types.actions.UPDATE_CURRENT_DRAW_BOARDS_DATA, { useNextDrawIdAsCurrent: true });
  //   NextDrawInfoService.getNextDraw({ currentDrawId }).then((payload) => {
  //     commit(types.mutations.UPDATE_DRAW_INFO, payload);
  //     dispatch(
  //       liveDrawTypes.namespaceMapper.UPDATE_INTRALOT_DRAW_ID,
  //       {
  //         intralotDrawId: payload.currentDrawId,
  //       },
  //       { root: true }
  //     );
  //   });
  // },
  // // TODO move to liveDrawTypes
  // [types.actions.ENABLE_LIVE_DRAW_SCREEN]({ commit }) {
  //   commit(types.mutations.ENABLE_LIVE_DRAW_SCREEN);
  // },
  [types.actions.DISABLE_LIVE_DRAW_SCREEN]({ dispatch, commit }) {
    commit(types.mutations.DISABLE_LIVE_DRAW_SCREEN);
    commit(types.mutations.DISABLE_AUTO_REDIRECT_AFTER_DRAW);
    // dispatch(liveDrawTypes.namespaceMapper.DISABLE_LOADING_OVERLAY, null, { root: true }); // TODO
  },
  // [types.actions.ADD_CURRENT_DRAW_BONUS_NUMBER]({ commit }, bonusNumber) {
  //   commit(types.mutations.ADD_CURRENT_DRAW_BONUS_NUMBER, bonusNumber);
  // },
  // [types.actions.ADD_CURRENT_DRAW_WINNING_NUMBER]({ commit }, kinoNumber) {
  //   commit(types.mutations.ADD_CURRENT_DRAW_WINNING_NUMBER, kinoNumber);
  //   commit(types.mutations.CALC_CURRENT_DRAW_WINNING_COLUMN);
  //   commit(types.mutations.CALC_CURRENT_DRAW_WINNING_ODD_EVEN_DRAW);
  // },
  // [types.actions.UPDATE_ACTIVE_BETSLIP_AREA]({ commit }, payload) {
  //   commit(types.mutations.UPDATE_ACTIVE_BETSLIP_AREA, payload);
  // },
  // [types.actions.UPDATE_CURRENT_DRAW_BOARDS_DATA](
  //   {
  //     commit,
  //     getters,
  //     state: {
  //       currentDrawWinningNumbers,
  //       currentDrawBonusNumber,
  //       currentDrawWinningColumn,
  //       currentDrawWinningOddEvenDraw,
  //       currentDrawCompleted,
  //     },
  //   },
  //   { useNextDrawIdAsCurrent = false } = {}
  // ) {
  //   const selectedGetter = useNextDrawIdAsCurrent
  //     ? types.getters.GET_PLAYER_NEXT_DRAW_BETSLIPS
  //     : types.getters.GET_PLAYER_CURRENT_DRAW_BETSLIPS;
  //   const playerBetslips = getters[selectedGetter];
  //   const payloadForWorker = {
  //     playerBetslips,
  //     currentDrawWinningNumbers,
  //     currentDrawBonusNumber,
  //     currentDrawWinningColumn,
  //     currentDrawWinningOddEvenDraw,
  //     calcSimpleBetsOnly: !currentDrawCompleted,
  //   };

  //   return isEmpty(playerBetslips) ? Promise.resolve() : triggerWorkerBoardDataCalculations(commit, payloadForWorker);
  // },
  // [types.actions.IMPORT_PLAYER_BETSLIP]({ dispatch, commit, state: { showNextDrawAvailableBets } }, payload) {
  //   commit(types.mutations.IMPORT_PLAYER_BETSLIP, payload);
  //   commit(types.mutations.ENABLE_LIVE_DRAW_SCREEN);
  //   // Enable this in case that the player will be able to add bets in the current animating draw between 00:00 - 03:00
  //   // In order to recalculate the current or final results
  //   // !showNextDrawAvailableBets && dispatch(types.actions.UPDATE_CURRENT_DRAW_BOARDS_DATA);
  // },
  // [types.actions.ENABLE_CURRENT_DRAW_BEGAN]({ commit }) {
  //   commit(types.mutations.ENABLE_CURRENT_DRAW_BEGAN);
  // },
  // [types.actions.UPDATE_CURRENT_DRAW_COMPLETED]({ commit }) {
  //   commit(types.mutations.DISABLE_CURRENT_DRAW_BEGAN);
  //   commit(types.mutations.UPDATE_CURRENT_DRAW_COMPLETED);
  // },
  // [types.actions.UPDATE_CURRENT_DRAW_PLAYER_SELECTED_BET]({ commit }, payload) {
  //   commit(types.mutations.UPDATE_CURRENT_DRAW_PLAYER_SELECTED_BET, payload);
  // },
  // [types.actions.CLEAR_CURRENT_DRAW_PLAYER_SELECTED_BET]({ commit }) {
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_PLAYER_SELECTED_BET);
  // },
  // [types.actions.ENABLE_SHOW_NEXT_DRAW_AVAILABLE_BETS]({ commit }) {
  //   commit(types.mutations.ENABLE_SHOW_NEXT_DRAW_AVAILABLE_BETS);
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_PLAYER_SELECTED_BET);
  //   commit(types.mutations.CLEAR_CURRENT_DRAW_BOARD_DATA);
  // },
  // [types.actions.SET_CURRENT_DRAW_WINNING_NUMBERS]({ commit }, liveNumbers) {
  //   commit(types.mutations.SET_CURRENT_DRAW_WINNING_NUMBERS, liveNumbers);
  //   commit(types.mutations.CALC_CURRENT_DRAW_WINNING_COLUMN);
  //   commit(types.mutations.CALC_CURRENT_DRAW_WINNING_ODD_EVEN_DRAW);
  // },
  // [types.actions.SET_CURRENT_DRAW_COMPLETED_RESULTS](
  //   { commit, dispatch },
  //   { kinoNumbers, bonusNumber, winningColumn, winningParity }
  // ) {
  //   commit(types.mutations.SET_CURRENT_DRAW_WINNING_NUMBERS, [...kinoNumbers, bonusNumber]);
  //   commit(types.mutations.ADD_CURRENT_DRAW_BONUS_NUMBER, bonusNumber);
  //   commit(types.mutations.SET_CURRENT_DRAW_WINNING_COLUMN, winningColumn);
  //   commit(types.mutations.SET_CURRENT_DRAW_WINNING_ODD_EVEN_DRAW, winningParity);
  // },
  [types.actions.SET_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP]({ commit }, nextDrawId) {
    commit(types.mutations.SET_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP, nextDrawId);
  },
  [types.actions.CLEAR_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP]({ commit }) {
    commit(types.mutations.CLEAR_NEXT_DRAW_ID_FOR_IMPORTED_BETSLIP);
  },
  // [types.actions.DISABLE_AUTO_REDIRECT_AFTER_DRAW]({ commit }) {
  //   commit(types.mutations.DISABLE_AUTO_REDIRECT_AFTER_DRAW);
  // },
  // [types.actions.ENABLE_AUTO_REDIRECT_AFTER_DRAW]({ commit }) {
  //   commit(types.mutations.ENABLE_AUTO_REDIRECT_AFTER_DRAW);
  // },
};

export default actions;
