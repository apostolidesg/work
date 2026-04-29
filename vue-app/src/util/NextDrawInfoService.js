import ApiUrls from './api-urls';
import Constants from './Constants';
import to from 'await-to-js';
import axios from 'axios';
import store from '../store/store';
import AxiosRetryInterceptor from './AxiosRetryInterceptor';
import moduleTypes from '../store/modules/types';
import configurationStoreModuleTypes from '../store/modules/ConfigurationStoreModule/types';
import sessionStoreModuleTypes from '../store/modules/SessionStoreModule/types';

const countdownAxios = axios.create();

const countdownRetryConfig = {
  firstRequestDelay: Constants.DRAW_INFORMATION.FIRST_POLLING_INTERVAL_MILLIS,
  retryDelay: Constants.DRAW_INFORMATION.POLLING_INTERVAL_MILLIS,
  maxRetries: AxiosRetryInterceptor.RETRY_DEFAULTS.INFINITE_MAX_RETRIES,
};

const defaultCountdownResponse = {
  nextDrawId: 0,
  currentDrawId: 0,
  timeToNextDraw: 0,
};

const calcCurrentDrawId = nextDrawId => (nextDrawId ? nextDrawId - 1 : 0);
const checkNextDrawTime = drawTime => new Date(drawTime) - Date.now() > 0;
const setDataForNextDraw = ({ drawId, drawTime }) => ({
  nextDrawId: drawId,
  currentDrawId: calcCurrentDrawId(drawId),
  timeToNextDraw: drawTime,
});
const nextDrawAvailable = ({ drawId, drawTime, currentDrawId }) =>
  currentDrawId !== calcCurrentDrawId(drawId) && checkNextDrawTime(drawTime);
const setDataIfNextDrawIsAvailable = ({
  data: [{ drawId, drawTime }],
  config: { extraConfigProps: { currentDrawId } = {} },
}) => (nextDrawAvailable({ drawId, drawTime, currentDrawId }) ? setDataForNextDraw({ drawId, drawTime }) : null);

const getNextDraw = async ({ currentDrawId = null, retryConfig = {}, gameType = null }) => {
  const gameId =
    gameType !== null
      ? Constants.GAME_IDS[gameType]
      : Constants.GAME_IDS[store.state[moduleTypes.SESSION_STORE_MODULE][sessionStoreModuleTypes.state.GAME_TYPE]];

  if (!Object.values(Constants.GAME_IDS).includes(gameId)) {
    return defaultCountdownResponse;
  }
  const apiUrls = new ApiUrls(
    '',
    store.getters[
      `${moduleTypes.CONFIGURATION_STORE_MODULE}/${configurationStoreModuleTypes.getters.GET_CONFIGURATION}`
    ].DRAW_API_HOST,
    gameId
  );
  const requestConfig = { timeout: 3000, retryConfig, extraConfigProps: { currentDrawId } };
  const [, response] = await to(countdownAxios.get(apiUrls.DRAW_API_NEXT_DRAW, requestConfig));
  return response;
};

AxiosRetryInterceptor.addRetryInterceptor({
  axiosInstance: countdownAxios,
  importedRetryConfig: countdownRetryConfig,
  responseRetryCondition: setDataIfNextDrawIsAvailable,
  defaultResponse: defaultCountdownResponse,
});

export default {
  getNextDraw,
};
