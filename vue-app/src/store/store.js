/* eslint-disable */
// load vue and vuex instance
import Vue from 'vue';
import Vuex from 'vuex';
import Constants from '../util/Constants';
// load vuex i18n module
import vuexI18n from 'vuex-i18n';

// import the translations from files
import translationEl from '../locales/el/locale-el';
import translationEn from '../locales/en/locale-en';
import ConfigurationStoreModule from './modules/ConfigurationStoreModule';
import EurojackpotStoreModule from './modules/EurojackpotStoreModule';
import FireblazeStoreModule from './modules/FireblazeStoreModule';
import KinoGameStoreModule from './modules/KinoStoreModule';
import LanguageStoreModule from './modules/LanguageStoreModule';
import LiveDrawModule from './modules/LiveDrawModule';
import PlayerBetslipSessionModule from './modules/PlayerBetslipsSessionModule';
import PowerspinGameStoreModule from './modules/PowerspinBetslipStoreModule';
import ServiceCheckStoreModule from './modules/ServiceCheckStoreModule';
import SessionStoreModule from './modules/SessionStoreModule';
import VideoStoreModule from './modules/VideoStoreModule';
import moduleTypes from './modules/types';

if (!Vue.__installedPlugins || !Vue.__installedPlugins(includes(Vuex))) {
  Vue.use(Vuex);
}

// initialize the vuex store using the vuex module. note that you can change the
//  name of the module if you wish

const store = new Vuex.Store({
  modules: {
    [moduleTypes.SESSION_STORE_MODULE]: { namespaced: true, ...SessionStoreModule },
    [moduleTypes.LANGUAGE_STORE_MODULE]: { namespaced: true, ...LanguageStoreModule },
    [moduleTypes.CONFIGURATION_STORE_MODULE]: { namespaced: true, ...ConfigurationStoreModule },
    [moduleTypes.SERVICE_CHECK_STORE_MODULE]: { namespaced: true, ...ServiceCheckStoreModule },
    [moduleTypes.PLAYER_SESSION_MODULE]: { namespaced: true, ...PlayerBetslipSessionModule },
    [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: { namespaced: true, ...PowerspinGameStoreModule },
    [moduleTypes.LIVE_DRAW_MODULE]: { namespaced: true, ...LiveDrawModule },
    [moduleTypes.EUROJACKPOT_GAME_STORE_MODULE]: { namespaced: true, ...EurojackpotStoreModule },
    [moduleTypes.FIREBLAZE_GAME_STORE_MODULE]: { namespaced: true, ...FireblazeStoreModule },
    [moduleTypes.KINO_GAME_STORE_MODULE]: { namespaced: true, ...KinoGameStoreModule },
    [moduleTypes.VIDEO_STORE_MODULE]: { namespaced: true, ...VideoStoreModule },
  },
});

// please note that you must specify the name of the vuex module if it is
// different from i18n. i.e. Vue.use(vuexI18n.plugin, store, 'myName')
Vue.use(vuexI18n.plugin, store);

// default Locale to be used
const defaultLocale = Constants.DEFAULT_LOCALE; //TODO Get it from vue ???

// add the translations to vue
Vue.i18n.add('en', translationEn);
Vue.i18n.add('el', translationEl);

// set the start locale to use
Vue.i18n.set(defaultLocale);

// set the fallback locale  if translation for current locale does not exist
Vue.i18n.fallback(defaultLocale);

export default store;
