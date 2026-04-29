import types from './types';
import Constants from '../../../util/Constants.js';

const actions = {
  [types.actions.UPDATE_SELECTED_THEME]({commit}, payload) {
    commit(types.mutations.UPDATE_SELECTED_THEME, payload)
  },
  [types.actions.TOGGLE_SELECTED_THEME_TYPE]({commit}) {
    commit(types.mutations.TOGGLE_SELECTED_THEME_TYPE)
  },
  [types.actions.UPDATE_SELECTED_THEME_TYPE]({commit}, payload) {
    commit(types.mutations.UPDATE_SELECTED_THEME_TYPE, payload)
  },
  [types.actions.RESET_TO_DEFAULT_THEME]({commit}) {
    commit(types.mutations.UPDATE_SELECTED_THEME_TYPE, Constants.LIVE_DRAW.DEFAULT_THEME_TYPE);
    commit(types.mutations.UPDATE_SELECTED_THEME, Constants.LIVE_DRAW.DEFAULT_THEME);
  },
  [types.actions.ENABLE_LOADING_OVERLAY]({ commit }) {
    commit(types.mutations.ENABLE_LOADING_OVERLAY);
  },
  [types.actions.DISABLE_LOADING_OVERLAY]({ commit }) {
    commit(types.mutations.DISABLE_LOADING_OVERLAY);
  },
  [types.actions.UPDATE_OLISOFT_DRAW_ID]({ commit }, {olisoftDrawId}) {
    commit(types.mutations.UPDATE_OLISOFT_DRAW_ID, {olisoftDrawId});
  },
  [types.actions.UPDATE_INTRALOT_DRAW_ID]({ commit }, {intralotDrawId}) {
    commit(types.mutations.UPDATE_INTRALOT_DRAW_ID, {intralotDrawId});
  },
  [types.actions.ENABLE_ERROR_STATE]({ commit }) {
    commit(types.mutations.ENABLE_ERROR_STATE);
  },
  [types.actions.DISABLE_ERROR_STATE]({ commit }) {
    commit(types.mutations.DISABLE_ERROR_STATE);
  },
  [types.actions.TOGGLE_NEXT_DRAW_LOADING_OVERLAY_ENABLE]({ commit, state: { isKinoGameInactive } }){
    !isKinoGameInactive && commit(types.mutations.TOGGLE_NEXT_DRAW_LOADING_OVERLAY_ENABLE);
  },
  [types.actions.TOGGLE_NEXT_DRAW_LOADING_OVERLAY_DISABLE]({ commit }){
    commit(types.mutations.TOGGLE_NEXT_DRAW_LOADING_OVERLAY_DISABLE);
  },
  [types.actions.RESET_LIVE_DRAW]({ dispatch, commit }){
    dispatch(types.actions.RESET_TO_DEFAULT_THEME);
    commit(types.mutations.DISABLE_LOADING_OVERLAY);
    commit(types.mutations.TOGGLE_NEXT_DRAW_LOADING_OVERLAY_DISABLE);
    commit(types.mutations.DISABLE_KINO_GAME_INACTIVE);
  },
  [types.actions.TOGGLE_IFRAME_LOADED_ENABLE]({ commit }){
    commit(types.mutations.TOGGLE_IFRAME_LOADED_ENABLE);
  },
  [types.actions.TOGGLE_IFRAME_LOADED_DISABLE]({ commit }){
    commit(types.mutations.TOGGLE_IFRAME_LOADED_DISABLE);
  },
  [types.actions.ENABLE_KINO_GAME_INACTIVE]({ commit }){
    commit(types.mutations.ENABLE_KINO_GAME_INACTIVE);
  },
  [types.actions.DISABLE_KINO_GAME_INACTIVE]({ commit }){
    commit(types.mutations.DISABLE_KINO_GAME_INACTIVE);
  },
};

export default actions;
