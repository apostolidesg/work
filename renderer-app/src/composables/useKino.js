import { computed } from 'vue';
import { useStore } from 'vuex';
import kinoModuleTypes from '@/store/modules/KinoStoreModule/types';
import moduleTypes from '@/store/modules/types/types';

const MODULE_PATH = moduleTypes.KINO_GAME_STORE_MODULE;

export function useKino() {
  const store = useStore();

  const activeBetArea = computed(() => store.getters[`${MODULE_PATH}/${kinoModuleTypes.getters.GET_ACTIVE_BET_AREA}`]);

  const betslipCost = computed(() => store.getters[`${MODULE_PATH}/${kinoModuleTypes.getters.GET_BETSLIP_COST}`]);

  const consecutiveDraws = computed(
    () => store.getters[`${MODULE_PATH}/${kinoModuleTypes.getters.GET_CONSECUTIVE_DRAWS}`]
  );

  const readyBetslipsNumbers = computed(
    () => store.getters[`${MODULE_PATH}/${kinoModuleTypes.getters.GET_READY_BETSLIPS_NUMBERS}`]
  );

  const setBetslip = (betslip) => store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.SET_BETSLIP}`, { betslip });

  const toggleNumber = (number) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.TOGGLE_NUMBER}`, { number });

  const addBetArea = () => store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.ADD_BET_AREA}`);

  const changeActiveBetArea = (activeAreaIndex) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.CHANGE_ACTIVE_BET_AREA}`, { activeAreaIndex });

  const deleteBetArea = (areaIndex) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.DELETE_BET_AREA}`, { areaIndex });

  const clearActiveBetArea = () => store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.CLEAR_ACTIVE_BET_AREA}`);

  const setKinoBonusValue = (value) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.SET_KINO_BONUS_VALUE}`, { value });

  const setKinoClose2WinValue = (value) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.SET_KINO_CLOSE_2_WIN_VALUE}`, { value });

  const resetBetslip = () => store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.RESET_BETSLIP}`);

  const toggleMultiplier = (multipliers) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.TOGGLE_MULTIPLIER}`, { multipliers });

  const setOddEven = (oddEvenModel) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.SET_ODD_EVEN}`, oddEvenModel);

  const resetOddEven = () => store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.RESET_ODD_EVEN}`);

  const setColumns = (columnsModel) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.SET_COLUMNS}`, columnsModel);

  const resetColumns = () => store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.RESET_COLUMNS}`);

  const quickPick = (gameType) => store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.QUICK_PICK}`, { gameType });

  const clearBetslip = () => store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.CLEAR_BETSLIP}`);

  const setConsecutiveDraws = (multipleDraws) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.SET_CONSECUTIVE_DRAWS}`, { multipleDraws });

  const setReadyBetslipsNumbers = (numbers) =>
    store.dispatch(`${MODULE_PATH}/${kinoModuleTypes.actions.SET_READY_BETSLIPS_NUMBERS}`, { numbers });

  return {
    activeBetArea,
    betslipCost,
    consecutiveDraws,
    readyBetslipsNumbers,
    setBetslip,
    toggleNumber,
    addBetArea,
    changeActiveBetArea,
    deleteBetArea,
    clearActiveBetArea,
    setKinoBonusValue,
    setKinoClose2WinValue,
    resetBetslip,
    toggleMultiplier,
    setOddEven,
    resetOddEven,
    setColumns,
    resetColumns,
    quickPick,
    clearBetslip,
    setConsecutiveDraws,
    setReadyBetslipsNumbers,
  };
}
