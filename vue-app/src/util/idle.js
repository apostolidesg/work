import IdleJs from 'idle-js';
import router from '../router/router';
import Constants from './Constants';
import store from '../store/store';
import moduleTypes from '../store/modules/types';
import ConfigurationStoreModuleTypes from '../store/modules/ConfigurationStoreModule/types';
import gtag from './gtag';
import gtmEvents from '../constants/gtmEvents';

const DEFAULT_IDLE_TIME = 30000;

let idleInstance = null;
let idleStartTime = null;
let sessionStartTime = null; // Track when user becomes active (session starts)

export default () => {
  const digitalAssistantConfiguration =
    store.getters[
      `${moduleTypes.CONFIGURATION_STORE_MODULE}/${ConfigurationStoreModuleTypes.getters.GET_CONFIGURATION}`
    ];
  const isScreensaverEnabled = digitalAssistantConfiguration?.DIGITAL_ASSISTANT?.IS_SCREENSAVER_ENABLED;
  const idleTime =
    store.getters[
      `${moduleTypes.CONFIGURATION_STORE_MODULE}/${ConfigurationStoreModuleTypes.getters.GET_SCREENSAVER_IDLE_TIME}`
    ];

  // Initialize session start time when idle tracking begins
  sessionStartTime = new Date();

  idleInstance = new IdleJs({
    idle: idleTime || DEFAULT_IDLE_TIME,
    events: ['mousedown'],
    onIdle: () => {
      idleStartTime = new Date();
      const sessionDuration = Math.round((idleStartTime - sessionStartTime) / 1000);

      gtag.sendEvent(gtmEvents.SSBT_LOTTERY_IDLE_START, {
        session_duration: sessionDuration,
      });

      if (isScreensaverEnabled) {
        router.push({ name: Constants.ROUTE_NAMES.SCREENSAVER });
      } else {
        router.push({ name: Constants.ROUTE_NAMES.LOBBY });
      }
    },
    onActive: () => {
      if (idleStartTime) {
        const activeTime = new Date();
        const idleDuration = Math.round((activeTime - idleStartTime) / 1000);

        gtag.sendEvent(gtmEvents.SSBT_LOTTERY_IDLE_END, {
          idle_duration: idleDuration,
        });

        idleStartTime = null;
      }

      // Reset session start time for next idle calculation
      sessionStartTime = new Date();

      if (isScreensaverEnabled) {
        router.push({ name: Constants.ROUTE_NAMES.LOBBY });
      }
    },
    keepTracking: true,
  });

  idleInstance.start();
};
