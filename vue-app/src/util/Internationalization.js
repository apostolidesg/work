/* eslint-disable */
// load vue and vuex instance
import Vue from 'vue';
import Vuex from 'vuex';
import Constants from "./Constants";
// load vuex i18n module
import vuexI18n from 'vuex-i18n';

// import the translations from files
import translationEn from '../locales/en/locale-en';
import translationEl from '../locales/el/locale-el';

Vue.use(Vuex);

// initialize the vuex store using the vuex module. note that you can change the
//  name of the module if you wish
const store = new Vuex.Store();

// please note that you must specify the name of the vuex module if it is
// different from i18n. i.e. Vue.use(vuexI18n.plugin, store, 'myName')
Vue.use(vuexI18n.plugin, store);

// default Locale to be used
const defaultLocale =  Constants.DEFAULT_LOCALE;//TODO Get it from vue ???

// add the translations to vue
Vue.i18n.add('en', translationEn);
Vue.i18n.add('el', translationEl);

// set the start locale to use
Vue.i18n.set(defaultLocale);

// set the fallback locale  if translation for current locale does not exist
Vue.i18n.fallback(defaultLocale);

export default {}
