import { computed } from 'vue';
import { useStore } from 'vuex';
import powerspinModuleTypes from '@/store/modules/PowerspinStoreModule/types';
import moduleTypes from '@/store/modules/types/types';

const MODULE_PATH = moduleTypes.POWERSPIN_GAME_STORE_MODULE;

export function usePowerspin() {
  const store = useStore();

  const betslipArray = computed(
    () => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_BETSLIP_ARRAY}`]
  );

  const selectedBetslipIndex = computed(
    () => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_SELECTED_BETSLIP_INDEX}`]
  );

  const selectedBetslip = computed(
    () => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_SELECTED_BETSLIP}`]
  );

  const betslipCost = computed(() => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_BETSLIP_COST}`]);

  const totalCost = computed(() => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_TOTAL_COST}`]);

  const isBetslipValid = computed(
    () => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_IS_BETSLIP_VALID}`]
  );

  const isBetslipEmpty = computed(
    () => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_IS_BETSLIP_EMPTY}`]
  );

  const consecutiveDraws = computed(
    () => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_CONSECUTIVE_DRAWS}`]
  );

  const mode = computed(() => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_MODE}`]);

  const isCombo = computed(() => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_IS_COMBO}`]);

  const wheels = computed(() => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_WHEELS}`]);

  const wheelsLength = computed(
    () => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_WHEELS_LENGTH}`]
  );

  const getWheel = (wheelIndex) =>
    store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_WHEEL}`]({ wheelIndex });

  const markets = computed(() => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_MARKETS}`]);

  const quickplayBetslipData = computed(
    () => store.getters[`${MODULE_PATH}/${powerspinModuleTypes.getters.GET_QUICKPLAY_BETSLIP_DATA}`]
  );

  const setBetslipArray = (betslipArray) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.SET_BETSLIP_ARRAY}`, { betslipArray });

  const setSelectedBetslipIndex = (index) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.SET_SELECTED_BETSLIP_INDEX}`, { index });

  const addBetslip = () => store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.ADD_BETSLIP}`);

  const removeBetslip = (index) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.REMOVE_BETSLIP}`, { betslipIndex: index });

  const resetBetslip = (index) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.RESET_BETSLIP}`, { betslipIndex: index });

  const resetAllBetslips = () => store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.RESET_ALL_BETSLIPS}`);

  const setMode = (mode) => store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.SET_MODE}`, { mode });

  const setComboMode = (isCombo) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.SET_COMBO_MODE}`, { isCombo });

  const setConsecutiveDraws = (draws) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.SET_CONSECUTIVE_DRAWS}`, { draws });

  const addWheel = () => store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.ADD_WHEEL}`);

  const removeWheel = (wheelIndex) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.REMOVE_WHEEL}`, { wheelIndex });

  const setQuickplayBetslipData = (data) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.SET_QUICKPLAY_BETSLIP_DATA}`, { data });

  const toggleMultipliers = ({ wheelIndex, gameCategory, multipliers }) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.TOGGLE_MULTIPLIERS}`, {
      wheelIndex,
      gameCategory,
      multipliers,
    });

  const toggleGameType = ({ wheelIndex, gameType }) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.TOGGLE_GAME_TYPE}`, { wheelIndex, gameType });

  const setRequestedNumber = ({ wheelIndex, number }) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.SET_REQUESTED_NUMBER}`, { wheelIndex, number });

  const setColumnNumber = ({ wheelIndex, number }) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.SET_COLUMN_NUMBER}`, { wheelIndex, number });

  const quickPickClicked = ({ wheelIndex }) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.QUICK_PICK_CLICKED}`, { wheelIndex });

  const setMarketsNumberOnAnyWheel = (number) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.SET_MARKETS_NUMBER_ON_ANY_WHEEL}`, number);

  const toggleMarketGameType = (gameType) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.TOGGLE_MARKET_GAME_TYPE}`, gameType);

  const toggleMarketMultipliers = ({ gameCategory, multipliers }) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.TOGGLE_MARKET_MULTIPLIERS}`, {
      gameCategory,
      multipliers,
    });

  const resetCategory = ({ betslipIndex, categoryType }) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.RESET_CATEGORY}`, {
      betslipIndex,
      categoryType,
    });

  const resetWheels = ({ betslipIndex }) =>
    store.dispatch(`${MODULE_PATH}/${powerspinModuleTypes.actions.RESET_WHEELS}`, { betslipIndex });

  return {
    betslipArray,
    selectedBetslipIndex,
    selectedBetslip,
    betslipCost,
    totalCost,
    isBetslipValid,
    isBetslipEmpty,
    consecutiveDraws,
    mode,
    isCombo,
    wheels,
    wheelsLength,
    getWheel,
    markets,
    quickplayBetslipData,
    setBetslipArray,
    setSelectedBetslipIndex,
    addBetslip,
    removeBetslip,
    resetBetslip,
    resetAllBetslips,
    setMode,
    setComboMode,
    setConsecutiveDraws,
    addWheel,
    removeWheel,
    setQuickplayBetslipData,
    toggleMultipliers,
    toggleGameType,
    setRequestedNumber,
    setColumnNumber,
    quickPickClicked,
    setMarketsNumberOnAnyWheel,
    toggleMarketGameType,
    toggleMarketMultipliers,
    resetCategory,
    resetWheels,
  };
}
