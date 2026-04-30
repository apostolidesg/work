import { computed } from 'vue';
import { useStore } from 'vuex';
import eurojackpotModuleTypes from '@/store/modules/EurojackpotStoreModule/types';
import moduleTypes from '@/store/modules/types/types';

const MODULE_PATH = moduleTypes.EUROJACKPOT_GAME_STORE_MODULE;

export function useEurojackpot() {
  const store = useStore();

  const betslip = computed(() => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_BETSLIP}`]);

  const selectedBoardIndex = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_SELECTED_BOARD_INDEX}`]
  );

  const selectedBoard = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_SELECTED_BOARD}`]
  );

  const consecutiveDraws = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_BETSLIP_CONSECUTIVE_DRAWS}`]
  );

  const betslipCost = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_BETSLIP_COST}`]
  );

  const isBetslipValid = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_IS_BETSLIP_VALID}`]
  );

  const isBetslipEmpty = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_IS_BETSLIP_EMPTY}`]
  );

  const drawDays = computed(() => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_DRAW_DAYS}`]);

  const activeDrawTime = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_ACTIVE_DRAW_TIME}`]
  );

  const salesCloseTime = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_SALES_CLOSE_TIME}`]
  );

  const activeDrawId = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_ACTIVE_DRAW_ID}`]
  );

  const jackpotAmount = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_JACKPOT_AMOUNT}`]
  );

  const isSalesOpen = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_IS_SALES_OPEN}`]
  );

  const isSalesClosed = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_IS_SALES_CLOSED}`]
  );

  const statistics = computed(() => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_STATISTICS}`]);

  const statisticsSelection = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_STATISTICS_SELECTION}`]
  );

  const isActiveDrawExtra = computed(
    () => store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_IS_ACTIVE_DRAW_EXTRA}`]
  );

  const setBetslip = (betslip) =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.SET_BETSLIP}`, { betslip });

  const setSelectedBoardIndex = (selectedBoardIndex) =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.SET_SELECTED_BOARD_INDEX}`, {
      selectedBoardIndex,
    });

  const setConsecutiveDraws = (multipleDraws) =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.SET_CONSECUTIVE_DRAWS}`, { multipleDraws });

  const addBoard = () => store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.ADD_BOARD}`);

  const removeBoard = (boardIndex) =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.REMOVE_BOARD}`, { boardIndex });

  const clearSelectedBoard = () =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.CLEAR_SELECTED_BOARD}`);

  const toggleQuickPick = () => store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.TOGGLE_QUICK_PICK}`);

  const setMainSelection = (mainSelection) =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.SET_MAIN_SELECTION}`, { mainSelection });

  const setEuroSelection = (euroSelection) =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.SET_EURO_SELECTION}`, { euroSelection });

  const setSystem = (systemId) =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.SET_SYSTEM}`, { systemId });

  const resetBetslip = () => store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.RESET_BETSLIP}`);

  const setStatisticsSelection = (selection) =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.SET_STATISTICS_SELECTION}`, { selection });

  const getStatistics = () =>
    store.dispatch(`${MODULE_PATH}/${eurojackpotModuleTypes.actions.GET_STATISTICS}`);

  const getBoardCost = (index) => {
    return store.getters[`${MODULE_PATH}/${eurojackpotModuleTypes.getters.GET_BOARD_COST}`]({ index });
  };

  return {
    betslip,
    selectedBoardIndex,
    selectedBoard,
    consecutiveDraws,
    betslipCost,
    isBetslipValid,
    isBetslipEmpty,
    drawDays,
    activeDrawTime,
    salesCloseTime,
    activeDrawId,
    jackpotAmount,
    isSalesOpen,
    isSalesClosed,
    statistics,
    statisticsSelection,
    isActiveDrawExtra,
    setBetslip,
    setSelectedBoardIndex,
    setConsecutiveDraws,
    addBoard,
    removeBoard,
    clearSelectedBoard,
    toggleQuickPick,
    setMainSelection,
    setEuroSelection,
    setSystem,
    resetBetslip,
    setStatisticsSelection,
    getStatistics,
    getBoardCost,
  };
}
