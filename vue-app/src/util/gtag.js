import axios from 'axios';
import store from '@/store/store';
import moduleTypes from '@/store/modules/types';
import sessionStoreModuleTypes from '@/store/modules/SessionStoreModule/types';
import configurationModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import gtmEvents from '@/constants/gtmEvents';
import Constants from '@/util/Constants';

const CLIENT_ID = '123456789.987654321';
const ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const APP_NAME = 'ssbt_lottery_application';
const LANDSCAPE_BREAKPOINT = 1200;

const isTheEventInTheList = (event) => {
  return Object.values(gtmEvents).includes(event);
};

const getCurrentMode = () => {
  const width = window.innerWidth;
  if (width < LANDSCAPE_BREAKPOINT) {
    return Constants.SCREEN_MODE.PORTRAIT;
  }
  return Constants.SCREEN_MODE.LANDSCAPE;
};

const sendEvent = async (event, params) => {
  const configuration =
    store.getters[`${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationModuleTypes.getters.GET_CONFIGURATION}`];

  const gtagConfiguration = configuration?.GTAG;

  if (!gtagConfiguration) {
    throw new Error('No credentials provided in configuration.');
  }

  if (!event) {
    throw new Error('No event provided.');
  }

  if (!isTheEventInTheList(event)) {
    throw new Error('Invalid event provided.');
  }

  const measurementId = gtagConfiguration?.MEASUREMENT_ID;
  const apiSecret = gtagConfiguration?.API_SECRET;
  const url = `${ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`;
  const ssbtId = store.getters[`${moduleTypes.SESSION_STORE_MODULE}/${sessionStoreModuleTypes.getters.GET_SSBT_ID}`];
  const retailerId = ssbtId.substring(0, 6);
  const terminalId = ssbtId.substring(6);

  if (!measurementId || !apiSecret) {
    throw new Error('No credentials provided');
  }

  if (!url) {
    throw new Error('Invalid request URL');
  }

  if (!configuration.IPC_RENDERER_ENABLED) {
    throw new Error(
      `This action requires the Electron version of the app.
      You’re currently running the web version, which doesn’t support sending events.
      To enable this functionality, please build and run the Electron app.`
    );
  }

  try {
    const response = await axios.post(url, {
      client_id: CLIENT_ID,
      events: [
        {
          name: event,
          params: {
            app: APP_NAME,
            mode: getCurrentMode(),
            is_digital_assistant: configuration?.DIGITAL_ASSISTANT?.ENABLED || false,
            timestamp: new Date().toISOString(),
            retailerId,
            terminalId,
            ...params,
          },
        },
      ],
    });
    console.log('Event sent successfully. HTTP status:', response.status);
    return response.status;
  } catch (error) {
    console.error('Failed to send event:', error);
    throw error;
  }
};

export default {
  sendEvent,
};
