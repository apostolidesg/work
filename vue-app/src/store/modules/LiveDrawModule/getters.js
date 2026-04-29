import types from './types';

const getters = {
  [types.getters.GET_THEMES_SIMPLE]: ({ themes:{simple} }) => simple,
  [types.getters.GET_THEMES_SIDEBETS]: ({ themes:{sidebets} }) => sidebets,
  [types.getters.GET_THEMES]: ({ themes }) => themes,
  [types.getters.GET_DEFAULT_THEME]: ({defaultTheme}) => defaultTheme,
  [types.getters.GET_SELECTED_THEME]: ({selectedTheme}) => selectedTheme,
  [types.getters.GET_SELECTED_THEME_TYPE]: ({selectedThemeType}) => selectedThemeType,
  [types.getters.GET_IS_LOADING_OVERLAY_ENABLED]: ({ isLoadingOverlayEnabled }) => isLoadingOverlayEnabled,
  [types.getters.GET_OLISOFT_DRAW_ID]: ({ receivedDrawIds:{olisoftId} }) => olisoftId,
  [types.getters.GET_INTRALOT_DRAW_ID]: ({ receivedDrawIds:{intralotId}  }) => intralotId,
  [types.getters.GET_HAS_MATCHING_DRAW_IDS]: ({ receivedDrawIds: { intralotId, olisoftId } }) => !!intralotId && Object.is(intralotId, olisoftId),
  [types.getters.GET_ERROR_STATE]: ({ errorState }) => errorState,
  [types.getters.GET_IS_INVALID_DRAW_ID]: (_, getters) => !getters[types.getters.GET_OLISOFT_DRAW_ID] || !getters[types.getters.GET_INTRALOT_DRAW_ID],
  [types.getters.GET_SHOULD_DISPLAY_ERROR]: (_, getters) => getters[types.getters.GET_IS_INVALID_DRAW_ID] || !getters[types.getters.GET_HAS_MATCHING_DRAW_IDS],
  [types.getters.GET_IS_NEXT_DRAW_LOADING_OVERLAY_ENABLED]: ({ isNextDrawLoadingOverlayEnabled }) => isNextDrawLoadingOverlayEnabled,
  [types.getters.GET_IS_IFRAME_LOADED]: ({ isIframeLoaded }) => isIframeLoaded,
  [types.getters.GET_IS_KINO_GAME_INACTIVE]: ({ isKinoGameInactive }) => isKinoGameInactive,
};

export default getters;
