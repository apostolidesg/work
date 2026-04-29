import types from './types';
import Betslip from '@/model/tzoker/Betslip';
import Board from '@/model/tzoker/Board';
import TzokerConstants from '@/util/tzoker/Constants';

const mutations = {
  [types.mutations.SET_BETSLIP](state, { betslip }) {
    state.betslip = betslip;
    state.selectedBoardIndex = null;
  },

  [types.mutations.SET_SELECTED_BOARD_INDEX](state, { index }) {
    state.selectedBoardIndex = index;
  },

  [types.mutations.TOGGLE_NUMBER](state, { number, panelType }) {
    const workingBoard = state.betslip.getBoard(0);
    if (workingBoard) {
      workingBoard.toggleNumber(number, panelType);
    }
  },

  [types.mutations.SET_SYSTEM](state, { systemId }) {
    const workingBoard = state.betslip.getBoard(0);
    if (workingBoard) {
      workingBoard.setSystem(systemId);
    }
  },

  [types.mutations.QUICK_PICK](state, { mainCount, tzokerCount } = {}) {
    const workingBoard = state.betslip.getBoard(0);
    if (workingBoard) {
      workingBoard.setFullQuickPick({ mainCount, tzokerCount });
    }
  },

  [types.mutations.CLEAR_WORKING_BOARD](state) {
    const workingBoard = state.betslip.getBoard(0);
    if (workingBoard) {
      workingBoard.reset();
    }
    state.selectedBoardIndex = null;
  },

  [types.mutations.ADD_BOARD_TO_CART](state) {
    const workingBoard = state.betslip.getBoard(0);
    if (!workingBoard || !workingBoard.isValid()) return;

    const newBoard = new Board();
    newBoard.selectNumbers(workingBoard.mainNumbers, TzokerConstants.PANEL_TYPES.MAIN, true);
    newBoard.selectNumbers(workingBoard.tzokerNumbers, TzokerConstants.PANEL_TYPES.TZOKER, true);
    if (workingBoard.systemId) {
      newBoard.setSystem(workingBoard.systemId);
    }

    state.betslip.addBoard(newBoard);
    workingBoard.reset();
    state.selectedBoardIndex = null;
  },

  [types.mutations.REMOVE_BOARD](state, { boardId }) {
    state.betslip.deleteBoardById(boardId);
    state.selectedBoardIndex = null;
  },

  [types.mutations.SHUFFLE_BOARD](state, { boardId }) {
    state.betslip.shuffleBoard(boardId);
  },

  [types.mutations.CLEAR_ALL_BOARDS](state) {
    state.betslip.clearBoards();
    state.selectedBoardIndex = null;
  },

  [types.mutations.SET_CONSECUTIVE_DRAWS](state, { consecutiveDraws }) {
    state.betslip.setConsecutiveDraws(consecutiveDraws);
  },

  [types.mutations.ADD_MULTIPLE_RANDOM_BOARDS](state, { count = 6, options = { mainCount: 5, tzokerCount: 1 } }) {
    state.betslip.addMultipleRandomBoards(count, options);
  },

  [types.mutations.ADD_ALL_20_TZOKER](state) {
    const workingBoard = state.betslip.getBoard(0);
    if (workingBoard) {
      workingBoard.addAll20TzokerNumbers();
    }
  },

  [types.mutations.COPY_BOARD_TO_WORKING](state, { boardId }) {
    const board = state.betslip.boards.find((b) => b.getId() === boardId);
    if (!board) return;

    const workingBoard = state.betslip.getBoard(0);
    if (!workingBoard) return;

    workingBoard.reset();
    workingBoard.selectNumbers(board.mainNumbers, TzokerConstants.PANEL_TYPES.MAIN, true);
    workingBoard.selectNumbers(board.tzokerNumbers, TzokerConstants.PANEL_TYPES.TZOKER, true);
    if (board.systemId) {
      workingBoard.setSystem(board.systemId);
    }

    const boardIndex = state.betslip.boards.findIndex((b) => b.getId() === boardId);
    state.selectedBoardIndex = boardIndex;
  },

  [types.mutations.UPDATE_BOARD_FROM_WORKING](state, { boardId }) {
    const targetBoard = state.betslip.boards.find((b) => b.getId() === boardId);
    if (!targetBoard) return;

    const workingBoard = state.betslip.getBoard(0);
    if (!workingBoard) return;

    targetBoard.reset();
    targetBoard.selectNumbers(workingBoard.mainNumbers, TzokerConstants.PANEL_TYPES.MAIN, true);
    targetBoard.selectNumbers(workingBoard.tzokerNumbers, TzokerConstants.PANEL_TYPES.TZOKER, true);
    if (workingBoard.systemId) {
      targetBoard.setSystem(workingBoard.systemId);
    }

    workingBoard.reset();
    state.selectedBoardIndex = null;
  },

  [types.mutations.RESET_BETSLIP](state) {
    state.betslip = new Betslip();
    state.selectedBoardIndex = null;
  },

  [types.mutations.SET_STATISTICS](state, { statistics }) {
    state.statistics = statistics;
  },

  [types.mutations.SET_STATISTICS_SELECTION](state, { selection }) {
    state.statisticsSelection = selection || TzokerConstants.STATISTICS_SELECTIONS.NONE;
  },
};

export default mutations;
