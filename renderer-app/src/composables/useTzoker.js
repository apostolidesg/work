import { computed } from 'vue';
import { useStore } from 'vuex';
import tzokerModuleTypes from '@/store/modules/TzokerStoreModule/types';
import moduleTypes from '@/store/modules/types/types';
import TzokerConstants from '@/util/tzoker/Constants';

const MODULE_PATH = moduleTypes.TZOKER_GAME_STORE_MODULE;

export function useTzoker() {
  const store = useStore();

  const betslip = computed(() => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_BETSLIP}`]);

  const workingBoard = computed(() => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_WORKING_BOARD}`]);

  const selectedBoardIndex = computed(
    () => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_SELECTED_BOARD_INDEX}`]
  );

  const cartBoards = computed(() => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_CART_BOARDS}`]);

  const consecutiveDraws = computed(
    () => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_CONSECUTIVE_DRAWS}`]
  );

  const betslipCost = computed(() => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_BETSLIP_COST}`]);

  const isBetslipValid = computed(
    () => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_IS_BETSLIP_VALID}`]
  );

  const isBetslipEmpty = computed(
    () => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_IS_BETSLIP_EMPTY}`]
  );

  const isWorkingBoardValid = computed(
    () => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_IS_WORKING_BOARD_VALID}`]
  );

  const statistics = computed(() => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_STATISTICS}`]);

  const statisticsSelection = computed(
    () => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_STATISTICS_SELECTION}`]
  );

  const isEditMode = computed(() => selectedBoardIndex.value !== null);

  const canAdd6RandomBoards = computed(() => {
    return store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_CAN_ADD_BOARDS}`](6);
  });

  const setBetslip = (betslip) =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.SET_BETSLIP}`, { betslip });

  const toggleNumber = (number, panelType) =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.TOGGLE_NUMBER}`, { number, panelType });

  const toggleMainNumber = (number) => toggleNumber(number, TzokerConstants.PANEL_TYPES.MAIN);

  const toggleTzokerNumber = (number) => toggleNumber(number, TzokerConstants.PANEL_TYPES.TZOKER);

  const setSystem = (systemId) =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.SET_SYSTEM}`, { systemId });

  const quickPick = (options = {}) => store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.QUICK_PICK}`, options);

  const clearWorkingBoard = () => store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.CLEAR_WORKING_BOARD}`);

  const addBoardToCart = () => store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.ADD_BOARD_TO_CART}`);

  const removeBoard = (boardId) =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.REMOVE_BOARD}`, { boardId });

  const shuffleBoard = (boardId) =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.SHUFFLE_BOARD}`, { boardId });

  const clearAllBoards = () => store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.CLEAR_ALL_BOARDS}`);

  const setConsecutiveDraws = (consecutiveDraws) =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.SET_CONSECUTIVE_DRAWS}`, { consecutiveDraws });

  const add6RandomBoards = () =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.ADD_MULTIPLE_RANDOM_BOARDS}`, {
      count: 6,
      options: { mainCount: 5, tzokerCount: 1 },
    });

  const addAll20Tzoker = () => store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.ADD_ALL_20_TZOKER}`);

  const copyBoardToWorking = (boardId) =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.COPY_BOARD_TO_WORKING}`, { boardId });

  const updateBoardFromWorking = (boardId) =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.UPDATE_BOARD_FROM_WORKING}`, { boardId });

  const resetBetslip = () => store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.RESET_BETSLIP}`);

  const setStatisticsSelection = (selection) =>
    store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.SET_STATISTICS_SELECTION}`, { selection });

  const getStatistics = () => store.dispatch(`${MODULE_PATH}/${tzokerModuleTypes.actions.GET_STATISTICS}`);

  const getBoardCost = (index) => store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_BOARD_COST}`](index);

  const canAddBoards = (count) =>
    store.getters[`${MODULE_PATH}/${tzokerModuleTypes.getters.GET_CAN_ADD_BOARDS}`](count);

  return {
    betslip,
    workingBoard,
    selectedBoardIndex,
    cartBoards,
    consecutiveDraws,
    betslipCost,
    isBetslipValid,
    isBetslipEmpty,
    isWorkingBoardValid,
    statistics,
    statisticsSelection,
    isEditMode,
    canAdd6RandomBoards,

    setBetslip,
    toggleNumber,
    toggleMainNumber,
    toggleTzokerNumber,
    setSystem,
    quickPick,
    clearWorkingBoard,
    addBoardToCart,
    removeBoard,
    shuffleBoard,
    clearAllBoards,
    setConsecutiveDraws,
    add6RandomBoards,
    addAll20Tzoker,
    copyBoardToWorking,
    updateBoardFromWorking,
    resetBetslip,
    setStatisticsSelection,
    getStatistics,

    getBoardCost,
    canAddBoards,
  };
}
