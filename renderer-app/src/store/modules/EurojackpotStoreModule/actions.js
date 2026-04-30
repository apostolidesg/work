import types from './types';
import configurationStoreTypes from '../ConfigurationStoreModule/types';
import ApiUrls from '@/util/api-urls';
import Constants from '@/util/Constants';

const actions = {
  [types.actions.SET_BETSLIP]({ commit }, { betslip } = {}) {
    commit(types.mutations.SET_BETSLIP, { betslip });
  },
  [types.actions.SET_SELECTED_BOARD_INDEX]({ commit }, { selectedBoardIndex } = {}) {
    commit(types.mutations.SET_SELECTED_BOARD_INDEX, { selectedBoardIndex });
  },
  [types.actions.SET_CONSECUTIVE_DRAWS]({ commit }, { multipleDraws } = {}) {
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
  async [types.actions.GET_STATISTICS]({ commit, rootGetters }) {
    const statisticsApiBaseUrl = rootGetters[configurationStoreTypes.namespaceMapper.GET_STATISTICS_API_HOST];
    const url = new ApiUrls('', '', Constants.GAME_IDS.EUROJACKPOT, statisticsApiBaseUrl).DRAW_API_STATISTICS.replace(
      '{drawRangeNumber}',
      Constants.DRAW_RANGE.EUROJACKPOT
    );

    try {
      const result = await fetch(url);
      const data = await result.json();

      if (!data.numbers || !data.numbersPanel2) throw new Error('Invalid statistics response');

      const mainNumbers = data.numbers.reduce((acc, curr) => {
        acc[curr.number] = { occurrences: curr.occurrences, delays: curr.delays };
        return acc;
      }, {});

      const euroNumbers = data.numbersPanel2.reduce((acc, curr) => {
        acc[curr.number] = { occurrences: curr.occurrences, delays: curr.delays };
        return acc;
      }, {});

      commit(types.mutations.SET_STATISTICS, { statistics: { mainNumbers, euroNumbers } });
    } catch {
      commit(types.mutations.RESET_STATISTICS);
    }
  },
  [types.actions.SET_STATISTICS_SELECTION]({ commit }, { selection } = {}) {
    commit(types.mutations.SET_STATISTICS_SELECTION, { selection });
  },
};

export default actions;
