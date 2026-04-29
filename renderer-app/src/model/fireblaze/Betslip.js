import Constants from '@/util/Constants';
import Board from './Board';
import FireblazeConstants from '@/util/fireblaze/Constants';

export default class Betslip {
  constructor(wager) {
    this.gameType = Constants.GENERAL_GAME_TYPES.FIREBLAZE;
    this.wager = {
      boards: [new Board({})],
      participatingDraws: { multipleDraws: 1 },
    };
    this.isecure = [];

    if (wager) {
      this.wager.boards = wager.boards.map((board) => {
        const quickPick = board.panels.some((panel) => panel.quickPick);

        return new Board({
          betType: board.betType,
          boardId: board.boardId,
          multipliers: board.multipliers,
          panels: board.panels.map((panel) => ({
            selection: panel.selection || [],
            quickPick: panel.quickPick,
          })),
          quickPick,
          systemId: board.systemId,
        });
      });
      if (wager.participatingDraws) {
        this.wager.participatingDraws = {
          multipleDraws: wager.participatingDraws.multipleDraws || 1,
        };
      }
    }
  }

  addBoard() {
    if (this.wager.boards.length < FireblazeConstants.MAX_BOARDS) {
      const existingBetTypes = new Set(this.wager.boards.map((board) => board.betType));
      const nextBetType = Object.values(FireblazeConstants.BET_TYPES).find((betType) => !existingBetTypes.has(betType));
      this.wager.boards.push(new Board({ betType: nextBetType }));
    }
  }

  removeBoard(index) {
    if (this.wager.boards.length > 1) {
      this.wager.boards.splice(index, 1);
    } else {
      this.wager.boards[0].reset();
    }
  }

  setParticipatingDraws(multipleDraws = 1) {
    this.wager.participatingDraws.multipleDraws = multipleDraws;
  }

  isValidBetslip() {
    return this.wager.boards.every((board) => board.isValid());
  }

  isEmpty() {
    return this.wager.boards.every((board) => board.isEmpty());
  }

  setISecureTokens(iSecureTokens) {
    this.isecure = iSecureTokens;
  }

  ilotFormat() {
    return {
      ...this,
      wager: {
        ...this.wager,
        boards: this.wager.boards.map((board, index) => ({
          boardId: index + 1,
          ...board,
          multipliers: board.multipliers.reduce((sum, val) => sum + val, 0),
          panels: board.panels.map((panel) => ({
            ...panel,
            selection: [...panel.selection],
          })),
        })),
      },
    };
  }
}
