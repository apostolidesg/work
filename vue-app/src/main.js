import fontawesome from '@fortawesome/fontawesome';
import faCoins from '@fortawesome/fontawesome-free-solid/faCoins';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import to from 'await-to-js';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { has, merge } from 'lodash';
import Vue from 'vue';
import vueAwesomeCountdown from 'vue-awesome-countdown';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import VueWorker from 'vue-worker';
import vuescroll from 'vuescroll';
import App from './App.vue';
import './assets/css/global.css';
import EventSenderService from './handler/EventSenderService';
import EventTypes from './handler/EventTypes';
import Betslip from './model/Betslip';
import router from './router/router';
import configurationStoreModuleTypes from './store/modules/ConfigurationStoreModule/types';
import sessionStoreModuleTypes from './store/modules/SessionStoreModule/types';
import moduleTypes from './store/modules/types';
import store from './store/store';
import { logToMainProcess } from './util/LoggerService';
import WindowWidthMixin from './mixins/WindowWidthMixin';

async function loadConfig({ electronEnv } = {}) {
  const currentConfig = process.env;
  let newConfig;
  const ipcRendererEnabled = electronEnv?.IPC_RENDERER_ENABLED || process.env.IPC_RENDERER_ENABLED;
  if (ipcRendererEnabled) {
    const [err, config] = await to(EventSenderService.sendSyncRequest(EventTypes.LOAD_CONFIGURATION));
    if (!err) {
      newConfig = config;
    } else {
      logToMainProcess('ERROR_LOADING_CONFIGURATION', err);
    }
  }

  if (has(newConfig, 'vue')) {
    merge(currentConfig, newConfig.vue);
  }

  await store.dispatch(
    `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationStoreModuleTypes.actions.SET_CONFIGURATION}`,
    { configuration: currentConfig }
  );

  if (has(newConfig, 'test')) {
    await store.dispatch(
      `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationStoreModuleTypes.actions.SET_VOUCHER}`,
      { voucher: newConfig.test.voucher }
    );
  }
  await store.dispatch(
    `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationStoreModuleTypes.actions.INITIALIZE_ASSETS}`
  );
  await store.dispatch(
    `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationStoreModuleTypes.actions.LOAD_DIGITAL_ASSISTANT_CONFIG}`
  );

  if (ipcRendererEnabled) {
    const [err, terminalId] = await to(EventSenderService.sendSyncRequest(EventTypes.TERMINAL_NAME_EVENT_TYPE));
    if (err) {
      logToMainProcess('ERROR_LOADING_TERMINAL_ID', err);
    }
    await store.dispatch(`${moduleTypes.SESSION_STORE_MODULE}/${sessionStoreModuleTypes.actions.SET_SSBT_ID}`, {
      ssbtId: terminalId,
    });
    const [err2, electronAppVersion] = await to(EventSenderService.sendSyncRequest(EventTypes.APP_VERSION));
    if (err2) {
      logToMainProcess('ERROR_LOADING_APP_VERSION', err2);
    }
    const getConfiguration =
      store.getters[
        `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationStoreModuleTypes.getters.GET_CONFIGURATION}`
      ];
    const updatedConfig = { ...getConfiguration, ELECTRON_APP_VERSION: electronAppVersion };
    await store.dispatch(
      `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationStoreModuleTypes.actions.SET_CONFIGURATION}`,
      { configuration: updatedConfig }
    );
  } else {
    currentConfig.TERMINAL_ID &&
      (await store.dispatch(`${moduleTypes.SESSION_STORE_MODULE}/${sessionStoreModuleTypes.actions.SET_SSBT_ID}`, {
        ssbtId: currentConfig.TERMINAL_ID,
      }));
  }
}

async function init() {
  try {
    let electronEnv;
    if (process.env.IPC_RENDERER_ENABLED) {
      electronEnv = await EventSenderService.sendSyncRequest(EventTypes.GET_ENV_SYNC);
    }

    Vue.prototype.$electronEnv = { ...(electronEnv || {}) };

    await loadConfig({ electronEnv });

    Vue.use(vuescroll);

    fontawesome.library.add(faCoins);

    Vue.component('font-awesome-icon', FontAwesomeIcon);

    Vue.config.productionTip = false;
    Vue.prototype.$eventHub = new Vue(); // Global event bus

    Vue.use(BootstrapVue);
    Vue.use(VueWorker);
    Vue.use(Snotify, {
      toast: {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        position: SnotifyPosition.rightTop,
      },
      global: {
        maxOnScreen: 5,
        maxAtPosition: 2,
        oneAtTime: false,
      },
    });
    Vue.use(vueAwesomeCountdown);

    // Register global mixin
    Vue.mixin(WindowWidthMixin);

    new Vue({
      router,
      store,
      Betslip,
      render: (h) => h(App),
    }).$mount('#app');
  } catch (err) {
    logToMainProcess('INIT_ERROR: Failed to initialize renderer app', err);
  }
}

init();
