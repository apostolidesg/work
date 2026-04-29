import { computed } from 'vue';
import { useStore } from 'vuex';
import sessionModuleTypes from '@/store/modules/SessionStoreModule/types';
import moduleTypes from '@/store/modules/types/types';

const MODULE_PATH = moduleTypes.SESSION_STORE_MODULE;

export function useSession() {
  const store = useStore();

  const accessToken = computed(() => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_ACCESS_TOKEN}`]);

  const balance = computed(() => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_BALANCE}`]);

  const isZeroBalance = computed(
    () => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_IS_ZERO_BALANCE}`]
  );

  const ssbtId = computed(() => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_SSBT_ID}`]);

  const hasActiveSession = computed(
    () => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_ACTIVE_SESSION}`]
  );

  const isKinoGame = computed(() => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.IS_KINO_GAME}`]);

  const gameType = computed(() => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_GAME_TYPE}`]);

  const activeBetslipCost = computed(
    () => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_ACTIVE_BETSLIP_COST}`]
  );

  const activeBetslipConsecutiveDraws = computed(
    () => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_ACTIVE_BETSLIP_CONSECUTIVE_DRAWS}`]
  );

  const isBalanceVisible = computed(
    () => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_BALANCE_VISIBILITY}`]
  );

  const isIdle = computed(() => store.getters[`${MODULE_PATH}/${sessionModuleTypes.getters.GET_IS_IDLE}`]);

  const setAccessToken = (accessToken) =>
    store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.SET_ACCESS_TOKEN}`, { accessToken });

  const resetAccessToken = () => store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.RESET_ACCESS_TOKEN}`);

  const setBalance = (balance) =>
    store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.SET_BALANCE}`, { balance });

  const resetBalance = () => store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.RESET_BALANCE}`);

  const setSsbtId = (ssbtId) => store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.SET_SSBT_ID}`, { ssbtId });

  const setGameType = (gameType) =>
    store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.SET_GAME_TYPE}`, { gameType });

  const saveKinoBetslip = (betslip) =>
    store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.SAVE_KINO_BETSLIP}`, { betslip });

  const clearSavedKinoBetslip = () =>
    store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.CLEAR_SAVED_KINO_BETSLIP}`);

  const toggleBalanceVisibility = () =>
    store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.TOGGLE_BALANCE_VISIBILITY}`);

  const setBalanceVisibility = (isVisible) =>
    store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.SET_BALANCE_VISIBILITY}`, { isVisible });

  const setIsIdle = (isIdle) => store.dispatch(`${MODULE_PATH}/${sessionModuleTypes.actions.SET_IS_IDLE}`, { isIdle });

  return {
    accessToken,
    balance,
    isZeroBalance,
    ssbtId,
    hasActiveSession,
    isKinoGame,
    gameType,
    activeBetslipCost,
    activeBetslipConsecutiveDraws,
    isBalanceVisible,
    isIdle,
    setAccessToken,
    resetAccessToken,
    setBalance,
    resetBalance,
    setSsbtId,
    setGameType,
    saveKinoBetslip,
    clearSavedKinoBetslip,
    toggleBalanceVisibility,
    setBalanceVisibility,
    setIsIdle,
  };
}
