import Constants from '../../util/Constants';
import Board from './Board';
import EurojackpotConstants from '@/util/eurojackpot/Constants';

export default class Betslip {
  constructor(wagerModel) {
    this.gameType = Constants.GENERAL_GAME_TYPES.EUROJACKPOT;
    this.wager = {
      boards: [new Board({})],
      participatingDraws: { multipleDraws: 1 },
    };
    this.promotionInfo = null;
    this.isecure = [];

    if (wagerModel) {
      this.wager.boards = wagerModel.boards?.map((board) => {
        const quickPick = board.panels[0].quickPick && board.panels[1].quickPick;

        return new Board({
          panels: board.panels.map((panel) => {
            return {
              selection: panel.selection || [],
            };
          }),
          quickPick,
          systemId: board.systemId,
        });
      });
      this.wager.participatingDraws.multipleDraws = wagerModel.participatingDraws?.multipleDraws || 1;
    }
  }

  addBoard() {
    if (this.wager.boards.length < EurojackpotConstants.MAX_BOARDS) {
      this.wager.boards.push(new Board());
    }
  }

  removeBoard(index) {
    if (this.wager.boards.length > 1) {
      this.wager.boards.splice(index, 1);
    } else {
      this.wager.boards[0].reset();
    }
  }

  setISecureTokens(iSecureTokens = []) {
    this.isecure = iSecureTokens;
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

  ilotFormat() {
    return {
      ...this,
      wager: {
        ...this.wager,
        boards: this.wager.boards.map((board, index) => {
          const { quickPick, ...rest } = board;

          return {
            ...rest,
            boardId: index + 1,
            ...(rest.systemId && { systemId: parseInt(rest.systemId) }),
            panels: rest.panels.map((panel) => ({ ...panel, ...(quickPick && { quickPick }) })),
          };
        }),
      },
    };
  }
}
