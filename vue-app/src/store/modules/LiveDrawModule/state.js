import Constants from '../../../util/Constants.js';

const state = {
  errorState: false,
  isLoadingOverlayEnabled: false,
  isNextDrawLoadingOverlayEnabled: false,
  isIframeLoaded: false,
  defaultTheme: Constants.LIVE_DRAW.DEFAULT_THEME,
  selectedTheme: 'classic',
  selectedThemeType: 'simple',
  receivedDrawIds:{
    olisoftId:0,
    intralotId:0
  },
  isKinoGameInactive: false,
  themeTypes: ['simple', 'sidebets']
};

export default state;
