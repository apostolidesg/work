import axios from 'axios';
import store from '@/store/store';
import moduleTypes from '@/store/modules/types/types';
import configurationModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import sessionStoreModuleTypes from '@/store/modules/SessionStoreModule/types';
import gtmEvents from '@/constants/gtmEvents';
import Constants from '@/util/Constants';

const APP_NAME = 'ssbt_dge_application';
const LANDSCAPE_BREAKPOINT = 1200;
const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

const isValidEvent = (eventName) => {
  return Object.values(gtmEvents).includes(eventName);
};

const getCurrentMode = () => {
  const width = window.innerWidth;
  if (width < LANDSCAPE_BREAKPOINT) {
    return Constants.SCREEN_MODE.PORTRAIT;
  }
  return Constants.SCREEN_MODE.LANDSCAPE;
};

const getTerminalInfo = () => {
  try {
    const ssbtId = store.getters[`${moduleTypes.SESSION_STORE_MODULE}/${sessionStoreModuleTypes.getters.GET_SSBT_ID}`];
    if (ssbtId && ssbtId.length >= 6) {
      return {
        retailerId: ssbtId.substring(0, 6),
        terminalId: ssbtId.substring(6),
      };
    }
  } catch (error) {
    console.warn('[GTM Service] Could not retrieve terminal info:', error);
  }
  return {
    retailerId: null,
    terminalId: null,
  };
};

const getClientId = () => {
  let clientId = sessionStorage.getItem('ga_client_id');
  if (!clientId) {
    clientId = `${Date.now()}.${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('ga_client_id', clientId);
  }
  return clientId;
};

const sendEvent = async (eventName, params = {}) => {
  try {
    if (!eventName) {
      throw new Error('No event name provided.');
    }

    if (!isValidEvent(eventName)) {
      throw new Error(`Invalid event: "${eventName}". Event must be defined in gtmEvents.`);
    }

    const configuration =
      store.getters[`${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationModuleTypes.getters.GET_CONFIGURATION}`];

    const gaMeasurementId = configuration.GTAG?.MEASUREMENT_ID || null;
    const gaApiSecret = configuration.GTAG?.API_SECRET || null;

    const isDevelopmentMode =
      store.getters[
        `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationModuleTypes.getters.IS_DEVELOPMENT_MODE}`
      ];

    if (!gaMeasurementId) {
      console.warn('[GTM Service] GA_MEASUREMENT_ID not configured. Event not sent:', eventName);
      return;
    }

    if (!gaApiSecret) {
      console.warn('[GTM Service] GA_API_SECRET not configured. Event not sent:', eventName);
      return;
    }

    const { retailerId, terminalId } = getTerminalInfo();
    const clientId = getClientId();

    const eventParams = {
      app: APP_NAME,
      mode: getCurrentMode(),
      timestamp: new Date().toISOString(),
      retailerId,
      terminalId,
      dev_mode: isDevelopmentMode,
      ...params,
    };

    const payload = {
      client_id: clientId,
      events: [
        {
          name: eventName,
          params: eventParams,
        },
      ],
    };

    const url = `${GA_ENDPOINT}?measurement_id=${gaMeasurementId}&api_secret=${gaApiSecret}`;
    await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('[GTM Service] Failed to send event:', error);
  }
};

export default {
  sendEvent,
};
