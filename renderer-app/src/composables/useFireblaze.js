import { computed } from 'vue';
import { useStore } from 'vuex';
import fireblazeModuleTypes from '@/store/modules/FireblazeStoreModule/types';
import moduleTypes from '@/store/modules/types/types';

const MODULE_PATH = moduleTypes.FIREBLAZE_GAME_STORE_MODULE;

export function useFireblaze() {
  const store = useStore();

  const betslip = computed(() => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_BETSLIP}`]);

  const selectedBoardIndex = computed(
    () => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_SELECTED_BOARD_INDEX}`]
  );

  const selectedBoard = computed(
    () => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_SELECTED_BOARD}`]
  );

  const consecutiveDraws = computed(
    () => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_CONSECUTIVE_DRAWS}`]
  );

  const betslipCost = computed(() => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_BETSLIP_COST}`]);

  const isBetslipValid = computed(
    () => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_IS_BETSLIP_VALID}`]
  );

  const isBetslipEmpty = computed(
    () => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_IS_BETSLIP_EMPTY}`]
  );

  const statistics = computed(() => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_STATISTICS}`]);

  const statisticsSelection = computed(
    () => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_STATISTICS_SELECTION}`]
  );

  const setBetslip = (betslip) =>
    store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.SET_BETSLIP}`, { betslip });

  const setSelection = (selection) =>
    store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.SET_SELECTION}`, { selection });

  const setMultiplier = (multiplier) =>
    store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.SET_MULTIPLIER}`, { multiplier });

  const toggleQuickPick = () => store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.QUICK_PICK}`);

  const setBoardBetType = (betType) =>
    store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.SET_BOARD_BETTYPE}`, { betType });

  const resetBetslip = () => store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.RESET_BETSLIP}`);

  const clearSelectedBoard = () =>
    store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.CLEAR_SELECTED_BOARD}`);

  const addBoard = () => store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.ADD_BOARD}`);

  const removeBoard = (boardIndex) =>
    store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.REMOVE_BOARD}`, { boardIndex });

  const setSelectedBoardIndex = (selectedBoardIndex) =>
    store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.SET_SELECTED_BOARD_INDEX}`, { selectedBoardIndex });

  const setConsecutiveDraws = (consecutiveDraws) =>
    store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.SET_CONSECUTIVE_DRAWS}`, { consecutiveDraws });

  const setStatisticsSelection = (selection) =>
    store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.SET_STATISTICS_SELECTION}`, { selection });

  const getStatistics = () => store.dispatch(`${MODULE_PATH}/${fireblazeModuleTypes.actions.GET_STATISTICS}`);

  const getBoardCost = (index) => store.getters[`${MODULE_PATH}/${fireblazeModuleTypes.getters.GET_BOARD_COST}`](index);

  return {
    betslip,
    selectedBoardIndex,
    selectedBoard,
    consecutiveDraws,
    betslipCost,
    isBetslipValid,
    isBetslipEmpty,
    statistics,
    statisticsSelection,

    setBetslip,
    setSelection,
    setMultiplier,
    toggleQuickPick,
    setBoardBetType,
    resetBetslip,
    clearSelectedBoard,
    addBoard,
    removeBoard,
    setSelectedBoardIndex,
    setConsecutiveDraws,
    setStatisticsSelection,
    getStatistics,

    getBoardCost,
  };
}
