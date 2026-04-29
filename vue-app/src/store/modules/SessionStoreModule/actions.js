import types from './types';
import powerspinBetslipStoreModuleTypes from '../PowerspinBetslipStoreModule/types';
import eurojackpotBetslipStoreModuleTypes from '../EurojackpotStoreModule/types';
import kinoBetslipStoreModuleTypes from '../KinoStoreModule/types';
import fireblazeBetslipStoreModuleTypes from '../FireblazeStoreModule/types';
import Constants from '../../../util/Constants';

const CONSECUTIVE_DRAWS_ACTION_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: powerspinBetslipStoreModuleTypes.namespaceMapper.SET_CONSECUTIVE_DRAWS,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: eurojackpotBetslipStoreModuleTypes.namespaceMapper.SET_CONSECUTIVE_DRAWS,
  [Constants.GENERAL_GAME_TYPES.KINO]: kinoBetslipStoreModuleTypes.namespaceMapper.SET_CONSECUTIVE_DRAWS,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: fireblazeBetslipStoreModuleTypes.namespaceMapper.SET_CONSECUTIVE_DRAWS,
};

const actions = {
  [types.actions.RESET_BALANCE]({ commit }) {
    commit(types.mutations.SET_BALANCE, { balance: 0 });
  },
  [types.actions.RESET_ACCESS_TOKEN]({ commit }) {
    commit(types.mutations.SET_ACCESS_TOKEN, { accessToken: '' });
  },
  [types.actions.SET_ACCESS_TOKEN]({ commit }, { accessToken }) {
    commit(types.mutations.SET_ACCESS_TOKEN, { accessToken });
  },
  [types.actions.SET_BALANCE]({ commit }, { balance }) {
    commit(types.mutations.SET_BALANCE, { balance });
  },
  [types.actions.SET_SSBT_ID]({ commit }, { ssbtId }) {
    commit(types.mutations.SET_SSBT_ID, { ssbtId });
  },
  [types.actions.SET_GAME_TYPE]({ commit }, { gameType }) {
    commit(types.mutations.SET_GAME_TYPE, { gameType });
  },
  [types.actions.SAVE_KINO_BETSLIP]({ commit }, { betslip }) {
    commit(types.mutations.SAVE_KINO_BETSLIP, { betslip });
  },
  [types.actions.CLEAR_SAVED_KINO_BETSLIP]({ commit }) {
    commit(types.mutations.CLEAR_SAVED_KINO_BETSLIP);
  },
  [types.actions.SET_BETSLIP_CONSECUTIVE_DRAWS]({ dispatch, getters }, { multipleDraws } = {}) {
    const gameType = getters[types.getters.GET_GAME_TYPE];
    dispatch(CONSECUTIVE_DRAWS_ACTION_MAPPER[gameType], { multipleDraws }, { root: true });
  },
  [types.actions.TOGGLE_BALANCE_VISIBILITY]({ commit, state }) {
    commit(types.mutations.SET_BALANCE_VISIBILITY, { isVisible: !state.balanceVisibility });
  },
  [types.actions.SET_BALANCE_VISIBILITY]({ commit }, { isVisible }) {
    commit(types.mutations.SET_BALANCE_VISIBILITY, { isVisible });
  },
};

export default actions;
