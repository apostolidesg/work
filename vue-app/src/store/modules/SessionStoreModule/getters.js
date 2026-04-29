import types from './types';
import Constants from '../../../util/Constants';
import powerspinBetslipStoreModuleTypes from '../PowerspinBetslipStoreModule/types';
import eurojackpotBetslipStoreModuleTypes from '../EurojackpotStoreModule/types';
import kinoBetslipStoreModuleTypes from '../KinoStoreModule/types';
import fireblazeBetslipStoreModuleTypes from '../FireblazeStoreModule/types';

const CONSECUTIVE_DRAWS_GETTER_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: powerspinBetslipStoreModuleTypes.namespaceMapper.GET_CONSECUTIVE_DRAWS,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: eurojackpotBetslipStoreModuleTypes.namespaceMapper.GET_CONSECUTIVE_DRAWS,
  [Constants.GENERAL_GAME_TYPES.KINO]: kinoBetslipStoreModuleTypes.namespaceMapper.GET_CONSECUTIVE_DRAWS,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: fireblazeBetslipStoreModuleTypes.namespaceMapper.GET_CONSECUTIVE_DRAWS,
};

const ACTIVE_BETSLIP_COST_GETTER_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: powerspinBetslipStoreModuleTypes.namespaceMapper.BETSLIP_COST,
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: eurojackpotBetslipStoreModuleTypes.namespaceMapper.BETSLIP_COST,
  [Constants.GENERAL_GAME_TYPES.KINO]: kinoBetslipStoreModuleTypes.namespaceMapper.BETSLIP_COST,
  [Constants.GENERAL_GAME_TYPES.FIREBLAZE]: fireblazeBetslipStoreModuleTypes.namespaceMapper.BETSLIP_COST,
};

const getters = {
  [types.getters.GET_ACCESS_TOKEN]: ({ accessToken }) => accessToken,
  [types.getters.GET_BALANCE]: ({ balance }) => balance,
  [types.getters.GET_IS_ZERO_BALANCE]: ({ balance }) => balance === 0,
  [types.getters.GET_SSBT_ID]: ({ ssbtId }) => ssbtId,
  [types.getters.GET_ACTIVE_SESSION]: ({ balance, accessToken }) => balance > 0 && !!accessToken,
  [types.getters.IS_KINO_GAME]: ({ gameType }) => gameType === Constants.GENERAL_GAME_TYPES.KINO,
  [types.getters.GET_GAME_TYPE]: ({ gameType }) => gameType,
  [types.getters.GET_ACTIVE_BETSLIP_COST]: ({ gameType }, _, __, rootGetters) => {
    return rootGetters[ACTIVE_BETSLIP_COST_GETTER_MAPPER[gameType]] || 0;
  },
  [types.getters.GET_ACTIVE_BETSLIP_CONSECUTIVE_DRAWS]: ({ gameType }, _, __, rootGetters) => {
    return rootGetters[CONSECUTIVE_DRAWS_GETTER_MAPPER[gameType]];
  },
  [types.getters.GET_BALANCE_VISIBILITY]: ({ balanceVisibility }) => balanceVisibility,
};

export default getters;
