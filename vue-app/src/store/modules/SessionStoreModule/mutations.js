import types from './types';

const mutations = {
  [types.mutations.SET_ACCESS_TOKEN](state, { accessToken }) {
    localStorage.setItem('accessToken', accessToken);
    state.accessToken = accessToken;
  },
  [types.mutations.SET_BALANCE](state, { balance }) {
    localStorage.setItem('balance', balance);
    state.balance = balance;
  },
  [types.mutations.SET_SSBT_ID](state, { ssbtId }) {
    localStorage.setItem('ssbtId', ssbtId);
    state.ssbtId = ssbtId;
  },
  [types.mutations.SET_GAME_TYPE](state, { gameType }) {
    state.gameType = gameType;
  },
  [types.mutations.SAVE_KINO_BETSLIP](state, { betslip }) {
    state.savedKinoBetslip = betslip;
  },
  [types.mutations.CLEAR_SAVED_KINO_BETSLIP](state) {
    state.savedKinoBetslip = null;
  },
  [types.mutations.SET_BALANCE_VISIBILITY](state, { isVisible }) {
    localStorage.setItem('balanceVisibility', String(isVisible));
    state.balanceVisibility = isVisible;
  },
};

export default mutations;
