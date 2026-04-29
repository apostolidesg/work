import { createApp } from 'vue';
import store from '@/store/store';
import './assets/css/global.css';
import App from '@/App.vue';
import router from '@/router';
import { createI18nPlugin, useI18nPlugin } from '@unify/vuex-i18n';
import baseEl from '@/locales/el/locale-el';
import baseEn from '@/locales/en/locale-en';
import cmsFallbackEl from './locales/el/cms-fallback-el';
import cmsFallbackEn from './locales/en/cms-fallback-en';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import emitter from '@/util/eventBus';
import { getElectronEnv, loadTerminalId } from '@/util/configLoader';
import configurationModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import moduleTypes from '@/store/modules/types/types';
import Constants from '@/util/Constants';
import sessionstoreModuleTypes from '@/store/modules/SessionStoreModule/types';
import gaService from './services/gaService';
import gtmEvents from './constants/gtmEvents';
import { logToMainProcess } from '@/util/LoggerService';
import merge from 'lodash.merge';

async function init() {
  try {
    const electronEnv = await getElectronEnv();

    const { configuration } = await store.dispatch(
      `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationModuleTypes.actions.INIT_CONFIGURATION}`,
      { electronEnv }
    );

    const terminalId = await loadTerminalId();
    if (terminalId) {
      store.commit(`${moduleTypes.SESSION_STORE_MODULE}/${sessionstoreModuleTypes.actions.SET_SSBT_ID}`, {
        ssbtId: terminalId,
      });
    }

    const app = createApp(App);

    app.use(store);
    app.use(router);

    app.use(createI18nPlugin(store));
    const i18n = useI18nPlugin();

    const defaultLocale = configuration?.DEFAULT_LOCALE || Constants.DEFAULT_LOCALE;
    const translationEn = merge({}, baseEn, cmsFallbackEn);
    const translationEl = merge({}, baseEl, cmsFallbackEl);

    i18n.add('en', translationEn);
    i18n.add('el', translationEl);
    i18n.set(defaultLocale);
    i18n.fallback(Constants.DEFAULT_LOCALE);

    app.config.globalProperties.$electronEnv = { ...(electronEnv || {}) };
    app.config.globalProperties.emitter = emitter;

    app.component('FontAwesomeIcon', FontAwesomeIcon);

    app.mount('#app');

    gaService.sendEvent(gtmEvents.SSBT_DGE_APPLICATION_STARTED);
  } catch (err) {
    logToMainProcess('INIT_ERROR: Failed to initialize renderer app', err);
  }
}

init();
