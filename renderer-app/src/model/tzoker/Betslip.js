import Constants from '@/util/Constants';
import Board from './Board';
import TzokerConstants from '@/util/tzoker/Constants';
import TzokerBetslipUtils from '@/util/tzoker/BetslipUtils';
import { generateUUID } from '@/util/UuidUtils';

export default class Betslip {
  constructor({ id = null, draws = TzokerConstants.PARTICIPATING_DRAWS.DEFAULT, wagerModel } = {}) {
    this.id = id || generateUUID();
    this.gameType = Constants.GENERAL_GAME_TYPES.TZOKER;
    this.wager = {
      boards: [new Board()],
      participatingDraws: { multipleDraws: draws },
    };
    this.promotionInfo = null;
    this.isecure = [];

    if (wagerModel) {
      this.initializeFromWagerModel(wagerModel);
    }
  }

  initializeFromWagerModel(wagerModel) {
    if (wagerModel.boards && wagerModel.boards.length > 0) {
      this.wager.boards = wagerModel.boards.map((board) => {
        return new Board({
          panels: board.panels
            ? board.panels.map((panel) => ({
                selection: panel.selection || [],
                quickPick: panel.quickPick || false,
              }))
            : undefined,
          betType: board.betType,
          quickPick: board.panels?.[0]?.quickPick && board.panels?.[1]?.quickPick,
          systemId: board.systemId,
        });
      });
    }

    if (wagerModel.participatingDraws?.multipleDraws) {
      this.wager.participatingDraws.multipleDraws = wagerModel.participatingDraws.multipleDraws;
    }
  }

  getId() {
    return this.id;
  }

  get boards() {
    return this.wager.boards;
  }

  get boardCount() {
    return this.wager.boards.length;
  }

  get consecutiveDraws() {
    return this.wager.participatingDraws.multipleDraws;
  }

  getBoard(index) {
    return this.wager.boards[index] || null;
  }

  addBoard(board = null) {
    if (this.wager.boards.length >= TzokerConstants.MAX_BOARDS) return false;

    const newBoard = board ? board.clone() : new Board();
    this.wager.boards.push(newBoard);
    return true;
  }

  addMultipleRandomBoards(count = 6, options = { mainCount: 5, tzokerCount: 1 }) {
    let addedCount = 0;

    for (let i = 0; i < count; i++) {
      if (this.wager.boards.length >= TzokerConstants.MAX_BOARDS) break;

      const newBoard = new Board();
      newBoard.setFullQuickPick(options);
      this.wager.boards.push(newBoard);
      addedCount++;
    }

    return addedCount;
  }

  canAddExactly(count) {
    return this.wager.boards.length + count <= TzokerConstants.MAX_BOARDS;
  }

  removeBoard(index) {
    if (this.wager.boards.length > 1 && index >= 0 && index < this.wager.boards.length) {
      this.wager.boards.splice(index, 1);
      return true;
    }
    if (this.wager.boards.length === 1 && index === 0) {
      this.wager.boards[0].reset();
      return true;
    }
    return false;
  }

  deleteBoardById(boardId) {
    const index = this.wager.boards.findIndex((board) => board.getId() === boardId);
    if (index === -1) return false;
    return this.removeBoard(index);
  }

  clearBoards() {
    this.wager.boards = [new Board()];
  }

  shuffleBoard(boardId) {
    const board = this.wager.boards.find((b) => b.getId() === boardId);
    if (!board) return false;

    const mainCount = board.mainNumbersCount;
    const tzokerCount = board.tzokerNumbersCount;

    board.setFullQuickPick({ mainCount, tzokerCount });
    return true;
  }

  setConsecutiveDraws(draws) {
    if (TzokerBetslipUtils.isConsecutiveDrawsValid(draws)) {
      this.wager.participatingDraws.multipleDraws = draws;
      return true;
    }
    return false;
  }

  setISecureTokens(tokens = []) {
    this.isecure = [...tokens];
  }

  isEmpty() {
    return this.wager.boards.every((board) => board.isEmpty());
  }

  isValid() {
    return this.wager.boards.some((board) => board.isValid());
  }

  isValidBetslip() {
    return this.wager.boards.some((board) => board.isValid());
  }

  getValidBoards() {
    return this.wager.boards.filter((board) => board.isValid());
  }

  calculateTotalCost() {
    return TzokerBetslipUtils.calculateBetslipCost(this.wager.boards, this.consecutiveDraws);
  }

  reset() {
    this.wager.boards = [new Board()];
    this.wager.participatingDraws.multipleDraws = TzokerConstants.PARTICIPATING_DRAWS.DEFAULT;
    this.promotionInfo = null;
    this.isecure = [];
  }

  ilotFormat() {
    const validBoards = this.getValidBoards().slice(0, TzokerConstants.MAX_BOARDS);

    return {
      gameType: Constants.GENERAL_GAME_TYPES.JOKER,
      wager: {
        boards: validBoards.map((board, index) => ({
          boardId: index + 1,
          betType: board.systemId ? TzokerConstants.BET_TYPES.SYSTEM : TzokerConstants.BET_TYPES.DEFAULT,
          panels: board.panels.map((panel) => ({
            selection: [...panel.selection],
            quickPick: panel.quickPick || false,
          })),
          ...(board.systemId && { systemId: board.systemId }),
        })),
        participatingDraws: {
          multipleDraws: this.consecutiveDraws,
        },
      },
      ...(this.isecure.length > 0 && { isecure: this.isecure }),
      ...(this.promotionInfo && { promotionInfo: this.promotionInfo }),
    };
  }
}
