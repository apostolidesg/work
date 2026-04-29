import types from './types';

const mutations = {
  [types.mutations.UPDATE_SELECTED_THEME](state, payload) {
    state.selectedTheme = payload;
  },
  [types.mutations.TOGGLE_SELECTED_THEME_TYPE](state) {
    const getNewThemeType = theme => state.selectedThemeType !== theme;
    const [selectedThemeType] = state.themeTypes.filter(getNewThemeType);
    state.selectedThemeType = selectedThemeType
  },
  [types.mutations.UPDATE_SELECTED_THEME_TYPE](state, payload) {
    state.selectedThemeType = payload
  },
  [types.mutations.ENABLE_LOADING_OVERLAY](state){
    state.isLoadingOverlayEnabled = true;
  },
  [types.mutations.DISABLE_LOADING_OVERLAY](state){
    state.isLoadingOverlayEnabled = false;
  },
  [types.mutations.UPDATE_OLISOFT_DRAW_ID](state, {olisoftDrawId}){
    state.receivedDrawIds.olisoftId = olisoftDrawId;
  },
  [types.mutations.UPDATE_INTRALOT_DRAW_ID](state, {intralotDrawId}){
    state.receivedDrawIds.intralotId = intralotDrawId;
  },
  [types.mutations.ENABLE_ERROR_STATE](state) {
    state.errorState = true;
  },
  [types.mutations.DISABLE_ERROR_STATE](state) {
    state.errorState = false;
  },
  [types.mutations.TOGGLE_NEXT_DRAW_LOADING_OVERLAY_ENABLE](state){
    state.isNextDrawLoadingOverlayEnabled = true;
  },
  [types.mutations.TOGGLE_NEXT_DRAW_LOADING_OVERLAY_DISABLE](state){
    state.isNextDrawLoadingOverlayEnabled = false;
  },
  [types.mutations.TOGGLE_IFRAME_LOADED_ENABLE](state){
    state.isIframeLoaded = true;
  },
  [types.mutations.TOGGLE_IFRAME_LOADED_DISABLE](state){
    state.isIframeLoaded = false;
  },
  [types.mutations.ENABLE_KINO_GAME_INACTIVE](state){
    state.isKinoGameInactive = true;
  },
  [types.mutations.DISABLE_KINO_GAME_INACTIVE](state){
    state.isKinoGameInactive = false;
  },
};

export default mutations;
