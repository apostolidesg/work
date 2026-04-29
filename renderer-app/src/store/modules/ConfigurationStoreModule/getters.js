import types from './types';
import Constants from '@/util/Constants';
import SessionStoreModuleTypes from '../SessionStoreModule';

const getters = {
  [types.getters.GET_CONFIGURATION]: ({ config }) => config,
  [types.getters.GET_VOUCHER]: ({ voucher }) => voucher,
  [types.getters.IS_DEVELOPMENT_MODE]: ({ config }) =>
    config.NODE_ENV === 'development' || config.MODE === 'development',
  [types.getters.GET_CONFIGURATION_ASSETS]: ({ configurationAssets }) => configurationAssets,
  [types.getters.GET_VOUCHER]: ({ voucher }) => voucher,
  [types.getters.GET_LIVE_DRAW_THEMES]: ({ config }) => config.KINO.LIVE_DRAW.THEMES,
  [types.getters.GET_LIVE_DRAW_THEME_URL_DIRECTORY]: ({ config }) => config.KINO.LIVE_DRAW.OLISOFT_API,
  [types.getters.GET_VOUCHER_MESSAGE]: ({ config }) => config.VOUCHER_MESSAGE || {},
  [types.getters.GET_POWERSPIN_LIVE_DRAW_URLS]: ({ config }) => config.POWERSPIN.LIVE_DRAW.API,
  [types.getters.GET_POWERSPIN_LAST_OLD_COLUMN_DRAW_TIME]: ({ config }) =>
    config.POWERSPIN.OLD_COLUMN_PRICE_LAST_DRAW_TIME,
  [types.getters.GET_EUROJACKPOT_COLUMN_PRICE]: ({ config }) => config.EUROJACKPOT.COLUMN_PRICE,
  [types.getters.GET_EUROJACKPOT_DRAW_DAYS]: ({ config }) => config.EUROJACKPOT.DRAW_DAYS,
  [types.getters.GET_DRAW_API_HOST]: ({ config }) => config.DRAW_API_HOST,
  [types.getters.GET_STATISTICS_API_HOST]: ({ config }) => config.STATISTICS_API_HOST,
  [types.getters.GET_EJP_JACKPOT_API_CALL_INTERVAL]: ({ config }) => config.EUROJACKPOT.JACKPOT_API_CALL_RETRY_INTERVAL,
  [types.getters.GET_EJP_SALES_OPEN_TIME]: ({ config }) => config.EUROJACKPOT.SALES_OPEN,
  [types.getters.IS_KINO_CLOSE_2_WIN_ENABLED]: ({ config }) => config.KINO.CLOSE_2_WIN.ENABLED || false,
  [types.getters.IS_ADVERTISEMENT_ICON_HIDDEN]: ({ config }) => config.FIREBLAZE?.HIDE_ADVERTISEMENT_ICON || false,
  [types.getters.GET_FIREBLAZE_COLUMN_PRICE]: ({ config }) => config.FIREBLAZE?.COLUMN_PRICE ?? 0,
  [types.getters.GET_FIREBLAZE_LIVE_DRAW_URLS]: ({ config }) => config.FIREBLAZE?.LIVE_DRAW?.API,
  [types.getters.GET_LIVE_DRAW_URLS]: ({ config }, _, __, rootGetters) =>
    rootGetters[SessionStoreModuleTypes.namespaceMapper.GET_GAME_TYPE] === Constants.GENERAL_GAME_TYPES.POWERSPIN
      ? config.POWERSPIN?.LIVE_DRAW?.API
      : config.FIREBLAZE?.LIVE_DRAW?.API,
  [types.getters.GET_CONFIGURATION_ASSETS]: ({ properties }) => properties,
  [types.getters.GET_MAIN_FAQ_SECTIONS]: (state) => state.mainFaqSections || [],
  [types.getters.GET_ASSET_URL]: (state, getters, rootState) => (type, key) => {
    const locale = rootState.i18n?.locale || 'en';
    const properties = state.config;
    const digitalAssistant = properties.DIGITAL_ASSISTANT;
    const baseAssetUrl = digitalAssistant?.ASSET_URL;
    if (state.config.assetsUrls?.[type]?.[key]) {
      return state.config.assetsUrls[type][key];
    }

    let assetFilename = digitalAssistant?.ASSETS?.[key];
    if (typeof assetFilename !== 'string') {
      console.warn(`Asset filename for key "${key}" is not a string:`, assetFilename);
      return type === 'video' ? Constants.FALLBACK_VIDEO : '';
    }

    if (!key || !digitalAssistant || !baseAssetUrl || !assetFilename) {
      return type === 'video' ? Constants.FALLBACK_VIDEO : '';
    }

    const normalizedBasePath = baseAssetUrl.replace(/[/\\]+$/, '');
    const finalPath = `${normalizedBasePath}/${locale}/${assetFilename}`;
    return finalPath;
  },
  [types.getters.GET_SCREENSAVER_IDLE_TIME]: (state) => {
    return state.config.DIGITAL_ASSISTANT?.IDLE_TIME;
  },
  [types.getters.IS_SCREEN_SAVER_ENABLED]: (state) => {
    return state.config.DIGITAL_ASSISTANT?.IS_SCREENSAVER_ENABLED;
  },
};

export default getters;
