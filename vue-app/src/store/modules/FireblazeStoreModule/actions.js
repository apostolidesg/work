import types from './types';
import configurationStoreTypes from '../ConfigurationStoreModule/types';
import ApiUrls from '../../../util/api-urls';
import Constants from '../../../util/Constants';
import retryAxiosInstance from '../../../util/RetryAxios';

const HALF_MINUTE = 30000;

const actions = {
  [types.actions.ADD_BETSLIP]({ commit }, { betslip } = {}) {
    commit(types.mutations.SET_BETSLIP, { betslip });
  },
  [types.actions.SET_SELECTION]({ commit }, { selection } = {}) {
    commit(types.mutations.SET_SELECTION, { selection });
  },
  [types.actions.SET_MULTIPLIER]({ commit }, { multiplier } = {}) {
    commit(types.mutations.SET_MULTIPLIER, { multiplier });
  },
  [types.actions.QUICK_PICK]({ commit }) {
    commit(types.mutations.QUICK_PICK);
  },
  [types.actions.SET_BOARD_BETTYPE]({ commit }, { betType }) {
    commit(types.mutations.SET_BOARD_BETTYPE, { betType });
  },
  [types.actions.RESET_BETSLIPS]({ commit }) {
    commit(types.mutations.RESET_BETSLIPS);
  },
  async [types.actions.GET_STATISTICS]({ commit, rootGetters }) {
    const statisticsApiBaseUrl = rootGetters[configurationStoreTypes.namespaceMapper.GET_STATISTICS_API_HOST];
    const url = new ApiUrls('', '', Constants.GAME_IDS.FIREBLAZE, statisticsApiBaseUrl).DRAW_API_STATISTICS.replace(
      '{drawRangeNumber}',
      Constants.DRAW_RANGE.FIREBLAZE
    );

    try {
      const result = await retryAxiosInstance.get(url, {
        retryCount: 3,
        retryDelay: HALF_MINUTE,
        validationFn: (response) => response.data.numbers,
      });
      const { numbers } = result.data;

      const mainNumbers = numbers.reduce((acc, curr) => {
        acc[curr.number] = { occurrences: curr.occurrences, delays: curr.delays };
        return acc;
      }, {});

      const statistics = { numbers: mainNumbers };
      commit(types.mutations.SET_STATISTICS, { statistics });
    } catch (error) {
      commit(types.mutations.RESET_STATISTICS);
    }
  },
  [types.actions.SET_STATISTICS_SELECTION]({ commit }, { selection } = {}) {
    commit(types.mutations.SET_STATISTICS_SELECTION, { selection });
  },
  [types.actions.CLEAR_SELECTED_BOARD]({ commit }) {
    commit(types.mutations.CLEAR_SELECTED_BOARD);
  },
  [types.actions.ADD_BOARD]({ commit }) {
    commit(types.mutations.ADD_BOARD);
  },
  [types.actions.REMOVE_BOARD]({ commit }, { boardIndex } = {}) {
    commit(types.mutations.REMOVE_BOARD, { boardIndex });
  },
  [types.actions.SET_SELECTED_BOARD_INDEX]({ commit }, { selectedBoardIndex } = {}) {
    commit(types.mutations.SET_SELECTED_BOARD_INDEX, { selectedBoardIndex });
  },
  [types.actions.SET_BETSLIP_CONSECUTIVE_DRAWS]({ commit }, { multipleDraws = 1 } = {}) {
    commit(types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS, { multipleDraws });
  },
};
export default actions;
