import types from './types';
import configurationStoreTypes from '../ConfigurationStoreModule/types';
import ApiUrls from '../../../util/api-urls';
import Constants from '../../../util/Constants';
import retryAxiosInstance from '../../../util/RetryAxios';
import EurojackpotConstants from '../../../util/eurojackpotConstants';
import EurojackpotBetslipUtilities from '../../../util/eurojackpotBetslipUtilities';
import dayjs from 'dayjs';
import { logToMainProcess } from '../../../util/LoggerService';

const HALF_HOUR = 1800000;
const HALF_MINUTE = 30000;

const actions = {
  [types.actions.ADD_BETSLIP]({ commit }, { betslip } = {}) {
    commit(types.mutations.SET_BETSLIP, { betslip });
  },
  [types.actions.SET_SELECTED_BOARD_INDEX]({ commit }, { selectedBoardIndex } = {}) {
    commit(types.mutations.SET_SELECTED_BOARD_INDEX, { selectedBoardIndex });
  },
  [types.actions.SET_BETSLIP_CONSECUTIVE_DRAWS]({ commit }, { multipleDraws = 1 } = {}) {
    commit(types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS, { multipleDraws });
  },
  [types.actions.ADD_BOARD]({ commit }) {
    commit(types.mutations.ADD_BOARD);
  },
  [types.actions.REMOVE_BOARD]({ commit }, { boardIndex } = {}) {
    commit(types.mutations.REMOVE_BOARD, { boardIndex });
  },
  [types.actions.CLEAR_SELECTED_BOARD]({ commit }) {
    commit(types.mutations.CLEAR_SELECTED_BOARD);
  },
  [types.actions.TOGGLE_QUICK_PICK]({ commit }) {
    commit(types.mutations.TOGGLE_QUICK_PICK);
  },
  [types.actions.SET_MAIN_SELECTION]({ commit }, { mainSelection } = {}) {
    commit(types.mutations.SET_MAIN_SELECTION, { mainSelection });
  },
  [types.actions.SET_EURO_SELECTION]({ commit }, { euroSelection } = {}) {
    commit(types.mutations.SET_EURO_SELECTION, { euroSelection });
  },
  [types.actions.SET_SYSTEM]({ commit }, { systemId = null } = {}) {
    commit(types.mutations.SET_SYSTEM, { systemId });
  },
  [types.actions.RESET_BETSLIP]({ commit }) {
    commit(types.mutations.RESET_BETSLIP);
  },
  async [types.actions.GET_DRAW_INFO]({ commit, rootGetters, dispatch }) {
    const drawApiBaseUrl = rootGetters[configurationStoreTypes.namespaceMapper.GET_DRAW_API_HOST];
    const salesOpenTime = rootGetters[configurationStoreTypes.namespaceMapper.GET_EJP_SALES_OPEN_TIME];
    const url = new ApiUrls('', drawApiBaseUrl, Constants.GAME_IDS.EUROJACKPOT).DRAW_API_LAST_ACTIVE;

    dispatch(types.actions.CLEAR_TIMER);

    const validationFn = (response) =>
      response.data.active?.drawId &&
      response.data.last?.drawId &&
      response.data.active.drawTime &&
      response.data.last.drawTime &&
      response.data.active.drawBreak;

    const firstDrawValidationFn = (response) =>
      response.data.active?.drawId && response.data.active.drawTime && response.data.active.drawBreak;
    const handler = (response) => {
      if (response.data?.active?.drawId === EurojackpotConstants.FIRST_DRAW_ID) {
        return firstDrawValidationFn(response);
      }
      return validationFn(response);
    };

    try {
      const result = await retryAxiosInstance.get(url, {
        retryCount: 3,
        retryDelay: HALF_MINUTE,
        validationFn: handler,
        requestLogger: (config) => {
          logToMainProcess('EJP_GET_DRAW_INFO', { url: config.url });
        },
        responseLogger: (response) => {
          const drawId = response?.data?.active?.drawId;
          const drawTime = response?.data?.active?.drawTime;
          const drawBreak = response?.data?.active?.drawBreak;
          const lastDrawId = response?.data?.last?.drawId;

          logToMainProcess('EJP_GET_DRAW_INFO_RESPONSE', {
            data: { active: { drawId, drawTime, drawBreak }, last: { drawId: lastDrawId } },
          });
        },
        errorLogger: (error) => {
          logToMainProcess('EJP_GET_DRAW_INFO_ERROR', { error });
        },
      });

      if (result.data.active.drawId === EurojackpotConstants.FIRST_DRAW_ID) {
        const status = EurojackpotBetslipUtilities.getStatusForFirstDraw({ ...result.data.active });

        if (status === EurojackpotConstants.DRAW_STATUS.SALES_OPEN) {
          dispatch(types.actions.SET_SALES_OPEN, { apiResponse: result.data });
        } else {
          dispatch(types.actions.SET_SALES_CLOSED);
        }
        return;
      }

      const status = EurojackpotBetslipUtilities.getDrawStatusFromResponse(
        { ...result.data },
        { hours: salesOpenTime.HOURS, minutes: salesOpenTime.MINUTES }
      );

      result?.data?.active?.prizeCategories &&
        commit(types.mutations.SET_IS_ACTIVE_DRAW_EXTRA, { drawPrizeCategories: result.data.active.prizeCategories });

      if (status === EurojackpotConstants.DRAW_STATUS.SALES_OPEN) {
        dispatch(types.actions.SET_SALES_OPEN, { apiResponse: result.data });
      } else {
        dispatch(types.actions.SET_SALES_CLOSED);
      }
    } catch (error) {
      commit(types.mutations.SET_SALES_CLOSED);

      const timerId = setTimeout(() => {
        dispatch(types.actions.GET_DRAW_INFO);
      }, HALF_HOUR);

      commit(types.mutations.SET_ACTIVE_DRAW_API_TIMEOUT, { activeDrawApiTimeout: timerId });
    }
  },
  async [types.actions.SET_SALES_OPEN]({ commit, dispatch }, { apiResponse } = {}) {
    logToMainProcess('EJP_ENTERING_SALES_OPEN', {});
    const {
      active: { drawId, drawTime, drawBreak, prizeCategories: [{ jackpot } = { jackpot: 0 }] = [{ jackpot: 0 }] },
    } = apiResponse;

    commit(types.mutations.SET_SALES_OPEN, {
      activeDrawId: drawId,
      activeDrawTime: drawTime,
      salesCloseTime: drawTime - drawBreak,
      jackpot,
    });

    let timerId = null;

    if (jackpot > 0) {
      const interval = drawTime - drawBreak - Date.now();

      timerId = setTimeout(() => {
        dispatch(types.actions.SET_SALES_CLOSED);
      }, interval);
    } else {
      timerId = setTimeout(() => {
        dispatch(types.actions.GET_DRAW_INFO);
      }, HALF_HOUR);
    }

    commit(types.mutations.SET_ACTIVE_DRAW_API_TIMEOUT, { activeDrawApiTimeout: timerId });
    dispatch(types.actions.GET_STATISTICS);
  },
  [types.actions.SET_SALES_CLOSED]({ commit, state, dispatch, rootGetters }) {
    logToMainProcess('EJP_ENTERING_SALES_CLOSED', {});
    const salesOpenTime = rootGetters[configurationStoreTypes.namespaceMapper.GET_EJP_SALES_OPEN_TIME];

    commit(types.mutations.SET_SALES_CLOSED);

    const salesOpen = dayjs()
      .startOf('day')
      .add(salesOpenTime.HOURS, 'hour')
      .add(salesOpenTime.MINUTES, 'minute')
      .toDate();

    let interval = salesOpen - Date.now();
    interval = interval < 0 ? HALF_HOUR : interval;

    const timerId = setTimeout(() => {
      dispatch(types.actions.GET_DRAW_INFO);
    }, interval);

    commit(types.mutations.SET_ACTIVE_DRAW_API_TIMEOUT, { activeDrawApiTimeout: timerId });

    if (!state.statistics) {
      dispatch(types.actions.GET_STATISTICS);
    }
  },
  [types.actions.CLEAR_TIMER]({ commit, state }) {
    if (state.activeDrawApiTimeout) {
      clearTimeout(state.activeDrawApiTimeout);
      commit(types.mutations.RESET_ACTIVE_DRAW_API_TIMEOUT);
    }
  },
  async [types.actions.GET_STATISTICS]({ commit, rootGetters }) {
    const statisticsApiBaseUrl = rootGetters[configurationStoreTypes.namespaceMapper.GET_STATISTICS_API_HOST];
    const url = new ApiUrls('', '', Constants.GAME_IDS.EUROJACKPOT, statisticsApiBaseUrl).DRAW_API_STATISTICS.replace(
      '{drawRangeNumber}',
      Constants.DRAW_RANGE.EUROJACKPOT
    );

    try {
      const result = await retryAxiosInstance.get(url, {
        retryCount: 3,
        retryDelay: HALF_MINUTE,
        validationFn: (response) => response.data.numbers && response.data.numbersPanel2,
      });
      const { numbers, numbersPanel2 } = result.data;

      const mainNumbers = numbers.reduce((acc, curr) => {
        acc[curr.number] = { occurrences: curr.occurrences, delays: curr.delays };
        return acc;
      }, {});

      const euroNumbers = numbersPanel2.reduce((acc, curr) => {
        acc[curr.number] = { occurrences: curr.occurrences, delays: curr.delays };
        return acc;
      }, {});

      const statistics = { mainNumbers, euroNumbers };
      commit(types.mutations.SET_STATISTICS, { statistics });
    } catch (error) {
      commit(types.mutations.RESET_STATISTICS);
    }
  },
  [types.actions.SET_STATISTICS_SELECTION]({ commit }, { selection } = {}) {
    commit(types.mutations.SET_STATISTICS_SELECTION, { selection });
  },
};

export default actions;
