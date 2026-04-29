import Constants from '@/util/Constants';
import moduleTypes from '@/store/modules/types/types';
import eurojackpotModuleTypes from '@/store/modules/EurojackpotStoreModule/types';
import powerspinModuleTypes from '@/store/modules/PowerspinStoreModule/types';

/**
 * Game Store Module Mapper
 * Maps game types to their Vuex store module names
 */
export const GAME_STORE_MODULE_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: moduleTypes.EUROJACKPOT_GAME_STORE_MODULE,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: moduleTypes.POWERSPIN_GAME_STORE_MODULE,
};

/**
 * Reset Betslip Action Mapper
 * Maps game types to their reset betslip Vuex actions
 */
export const RESET_BETSLIP_ACTION_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]:
    `${moduleTypes.EUROJACKPOT_GAME_STORE_MODULE}/${eurojackpotModuleTypes.actions.RESET_BETSLIP}`,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]:
    `${moduleTypes.POWERSPIN_GAME_STORE_MODULE}/${powerspinModuleTypes.actions.RESET_ALL_BETSLIPS}`,
};

/**
 * Get Betslip Getter Mapper
 * Maps game types to their get betslip Vuex getters
 */
export const GET_BETSLIP_GETTER_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]:
    `${moduleTypes.EUROJACKPOT_GAME_STORE_MODULE}/${eurojackpotModuleTypes.getters.GET_BETSLIP}`,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]:
    `${moduleTypes.POWERSPIN_GAME_STORE_MODULE}/${powerspinModuleTypes.getters.GET_SELECTED_BETSLIP}`,
};

/**
 * Is Sales Closed Getter Mapper
 * Maps game types to their sales closed status Vuex getters
 * Note: Not all games have sales windows (e.g., Powerspin doesn't)
 */
export const IS_SALES_CLOSED_GETTER_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]:
    `${moduleTypes.EUROJACKPOT_GAME_STORE_MODULE}/${eurojackpotModuleTypes.getters.GET_IS_SALES_CLOSED}`,
};

/**
 * Print Type Mapper
 * Maps game types to their print type constants
 */
export const PRINT_TYPE_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: Constants.PRINT_TYPE.EUROJACKPOT_BETSLIP,
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: Constants.PRINT_TYPE.POWERSPIN_BETSLIP,
};

/**
 * Sales Stopped Error Message Mapper
 * Maps game types to their sales stopped i18n keys
 */
export const SALES_STOPPED_ERROR_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: 'eurojackpot.salesStopped',
};

export default {
  GAME_STORE_MODULE_MAPPER,
  RESET_BETSLIP_ACTION_MAPPER,
  GET_BETSLIP_GETTER_MAPPER,
  IS_SALES_CLOSED_GETTER_MAPPER,
  PRINT_TYPE_MAPPER,
  SALES_STOPPED_ERROR_MAPPER,
};
