import { describe, it, expect, beforeEach, vi } from 'vitest';
import Betslip from '../../../model/eurojackpot/Betslip';
import Board from '../../../model/eurojackpot/Board';
import Constants from '../../../util/Constants';
import EurojackpotConstants from '@/util/eurojackpot/Constants';

vi.mock('../../../model/eurojackpot/Board', () => {
  return {
    default: vi.fn(function (config = {}) {
      this.panels = config.panels || [{ selection: [] }, { selection: [] }];
      this.quickPick = config.quickPick || false;
      this.systemId = config.systemId || null;

      this.isValid = vi.fn(() => {
        const mainNumbers = this.panels?.[0]?.selection?.length || 0;
        const euroNumbers = this.panels?.[1]?.selection?.length || 0;
        return mainNumbers === 5 && euroNumbers === 2;
      });

      this.isEmpty = vi.fn(() => {
        const mainNumbers = this.panels?.[0]?.selection?.length || 0;
        const euroNumbers = this.panels?.[1]?.selection?.length || 0;
        return mainNumbers === 0 && euroNumbers === 0;
      });

      this.reset = vi.fn(() => {
        this.panels = [{ selection: [] }, { selection: [] }];
        this.quickPick = false;
        this.systemId = null;
      });
    }),
  };
});

describe('Eurojackpot Betslip', () => {
  let betslip;

  beforeEach(() => {
    vi.clearAllMocks();
    betslip = new Betslip();
  });

  describe('Constructor', () => {
    it('should initialize with default values', () => {
      expect(betslip.gameType).toBe(Constants.GENERAL_GAME_TYPES.EUROJACKPOT);
      expect(betslip.wager.boards).toHaveLength(1);
      expect(betslip.wager.participatingDraws.multipleDraws).toBe(1);
      expect(betslip.promotionInfo).toBe(null);
      expect(betslip.isecure).toEqual([]);
    });

    it('should initialize with wagerModel', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
            quickPick: false,
          },
        ],
        participatingDraws: { multipleDraws: 3 },
      };

      const betslipWithModel = new Betslip(wagerModel);
      expect(betslipWithModel.wager.boards).toHaveLength(1);
      expect(betslipWithModel.wager.participatingDraws.multipleDraws).toBe(3);
    });

    it('should handle quickPick in wagerModel', () => {
      const wagerModel = {
        boards: [
          {
            panels: [
              { selection: [1, 2, 3, 4, 5], quickPick: true },
              { selection: [1, 2], quickPick: true },
            ],
          },
        ],
      };

      new Betslip(wagerModel);
      expect(Board).toHaveBeenCalledWith(
        expect.objectContaining({
          quickPick: true,
        })
      );
    });

    it('should handle systemId in wagerModel', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [] }, { selection: [] }],
            systemId: 5,
          },
        ],
      };

      new Betslip(wagerModel);
      expect(Board).toHaveBeenCalledWith(
        expect.objectContaining({
          systemId: 5,
        })
      );
    });

    it('should handle multiple boards in wagerModel', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
          },
          {
            panels: [{ selection: [6, 7, 8, 9, 10] }, { selection: [3, 4] }],
          },
        ],
      };

      const betslipWithMultiple = new Betslip(wagerModel);
      expect(betslipWithMultiple.wager.boards).toHaveLength(2);
    });

    it('should default to 1 draw when participatingDraws not provided', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [] }, { selection: [] }],
          },
        ],
      };

      const betslipWithoutDraws = new Betslip(wagerModel);
      expect(betslipWithoutDraws.wager.participatingDraws.multipleDraws).toBe(1);
    });

    it('should map panels correctly from wagerModel', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [10, 20, 30, 40, 50] }, { selection: [5, 10] }],
          },
        ],
      };

      new Betslip(wagerModel);
      expect(Board).toHaveBeenCalledWith(
        expect.objectContaining({
          panels: [{ selection: [10, 20, 30, 40, 50] }, { selection: [5, 10] }],
        })
      );
    });
  });

  describe('addBoard', () => {
    it('should add a new board', () => {
      betslip.addBoard();
      expect(betslip.wager.boards).toHaveLength(2);
    });

    it('should not exceed MAX_BOARDS', () => {
      const maxBoards = EurojackpotConstants.MAX_BOARDS || 10;
      for (let i = 0; i < maxBoards + 5; i++) {
        betslip.addBoard();
      }
      expect(betslip.wager.boards.length).toBeLessThanOrEqual(maxBoards);
    });

    it('should add board with default configuration', () => {
      betslip.addBoard();
      expect(Board).toHaveBeenCalledWith();
    });
  });

  describe('removeBoard', () => {
    beforeEach(() => {
      betslip.addBoard();
      betslip.addBoard();
    });

    it('should remove board at specified index', () => {
      const initialLength = betslip.wager.boards.length;
      betslip.removeBoard(1);
      expect(betslip.wager.boards).toHaveLength(initialLength - 1);
    });

    it('should not remove last board, but reset it instead', () => {
      betslip.removeBoard(0);
      betslip.removeBoard(0);
      const lastBoard = betslip.wager.boards[0];
      betslip.removeBoard(0);
      expect(betslip.wager.boards).toHaveLength(1);
      expect(lastBoard.reset).toHaveBeenCalled();
    });

    it('should handle removing first board', () => {
      betslip.removeBoard(0);
      expect(betslip.wager.boards).toHaveLength(2);
    });

    it('should handle removing middle board', () => {
      betslip.addBoard();
      const initialLength = betslip.wager.boards.length;
      betslip.removeBoard(1);
      expect(betslip.wager.boards).toHaveLength(initialLength - 1);
    });
  });

  describe('setISecureTokens', () => {
    it('should set iSecure tokens', () => {
      const tokens = ['token1', 'token2', 'token3'];
      betslip.setISecureTokens(tokens);
      expect(betslip.isecure).toEqual(tokens);
    });

    it('should default to empty array when no argument', () => {
      betslip.isecure = ['old'];
      betslip.setISecureTokens();
      expect(betslip.isecure).toEqual([]);
    });

    it('should handle empty array', () => {
      betslip.setISecureTokens([]);
      expect(betslip.isecure).toEqual([]);
    });
  });

  describe('setParticipatingDraws', () => {
    it('should set participating draws', () => {
      betslip.setParticipatingDraws(5);
      expect(betslip.wager.participatingDraws.multipleDraws).toBe(5);
    });

    it('should default to 1 when no argument', () => {
      betslip.setParticipatingDraws(10);
      betslip.setParticipatingDraws();
      expect(betslip.wager.participatingDraws.multipleDraws).toBe(1);
    });

    it('should handle 0 as value', () => {
      betslip.setParticipatingDraws(0);
      expect(betslip.wager.participatingDraws.multipleDraws).toBe(0);
    });
  });

  describe('isValidBetslip', () => {
    it('should return true when all boards are valid', () => {
      betslip.addBoard();
      betslip.addBoard();
      betslip.wager.boards.forEach((board) => {
        board.isValid.mockReturnValue(true);
      });
      expect(betslip.isValidBetslip()).toBe(true);
    });

    it('should return false when any board is invalid', () => {
      betslip.addBoard();
      betslip.wager.boards[0].isValid.mockReturnValue(true);
      betslip.wager.boards[1].isValid.mockReturnValue(false);
      expect(betslip.isValidBetslip()).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true when all boards are empty', () => {
      betslip.addBoard();
      betslip.wager.boards.forEach((board) => {
        board.isEmpty.mockReturnValue(true);
      });
      expect(betslip.isEmpty()).toBe(true);
    });

    it('should return false when any board is not empty', () => {
      betslip.addBoard();
      betslip.wager.boards[0].isEmpty.mockReturnValue(true);
      betslip.wager.boards[1].isEmpty.mockReturnValue(false);
      expect(betslip.isEmpty()).toBe(false);
    });
  });

  describe('ilotFormat', () => {
    it('should format betslip for ILOT API', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
          },
        ],
      };

      const formattedBetslip = new Betslip(wagerModel);
      const formatted = formattedBetslip.ilotFormat();

      expect(formatted.gameType).toBe(Constants.GENERAL_GAME_TYPES.EUROJACKPOT);
      expect(formatted.wager.boards).toHaveLength(1);
      expect(formatted.wager.boards[0].boardId).toBe(1);
    });

    it('should add boardId to each board', () => {
      betslip.addBoard();
      betslip.addBoard();

      const formatted = betslip.ilotFormat();

      expect(formatted.wager.boards[0].boardId).toBe(1);
      expect(formatted.wager.boards[1].boardId).toBe(2);
      expect(formatted.wager.boards[2].boardId).toBe(3);
    });

    it('should include systemId as integer when present', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [] }, { selection: [] }],
            systemId: '5',
          },
        ],
      };

      const formattedBetslip = new Betslip(wagerModel);
      formattedBetslip.wager.boards[0].systemId = '7';
      const formatted = formattedBetslip.ilotFormat();

      expect(formatted.wager.boards[0].systemId).toBe(7);
      expect(typeof formatted.wager.boards[0].systemId).toBe('number');
    });

    it('should not parse systemId when null', () => {
      betslip.wager.boards[0].systemId = null;
      const formatted = betslip.ilotFormat();
      expect(formatted.wager.boards[0].systemId).toBe(null);
    });

    it('should exclude parsed systemId when systemId is null', () => {
      betslip.wager.boards[0].systemId = null;
      const formatted = betslip.ilotFormat();
      const board = formatted.wager.boards[0];
      expect(board.systemId).toBe(null);
      expect(typeof board.systemId).not.toBe('number');
    });

    it('should add quickPick to panels when present', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
          },
        ],
      };

      const formattedBetslip = new Betslip(wagerModel);
      formattedBetslip.wager.boards[0].quickPick = true;
      const formatted = formattedBetslip.ilotFormat();

      expect(formatted.wager.boards[0].panels[0].quickPick).toBe(true);
      expect(formatted.wager.boards[0].panels[1].quickPick).toBe(true);
    });

    it('should preserve participatingDraws', () => {
      betslip.setParticipatingDraws(5);
      const formatted = betslip.ilotFormat();

      expect(formatted.wager.participatingDraws.multipleDraws).toBe(5);
    });

    it('should preserve isecure tokens', () => {
      betslip.setISecureTokens(['token1', 'token2']);
      const formatted = betslip.ilotFormat();

      expect(formatted.isecure).toEqual(['token1', 'token2']);
    });

    it('should not include quickPick in board root', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [] }, { selection: [] }],
          },
        ],
      };

      const formattedBetslip = new Betslip(wagerModel);
      formattedBetslip.wager.boards[0].quickPick = true;
      const formatted = formattedBetslip.ilotFormat();

      expect(formatted.wager.boards[0]).not.toHaveProperty('quickPick');
    });
  });

  describe('Integration', () => {
    it('should handle complete workflow', () => {
      const wagerModel = {
        boards: [
          {
            panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
          },
        ],
        participatingDraws: { multipleDraws: 3 },
      };

      const testBetslip = new Betslip(wagerModel);

      testBetslip.addBoard();
      expect(testBetslip.wager.boards).toHaveLength(2);

      testBetslip.setISecureTokens(['token1']);
      expect(testBetslip.isecure).toEqual(['token1']);

      testBetslip.setParticipatingDraws(5);
      expect(testBetslip.wager.participatingDraws.multipleDraws).toBe(5);

      const formatted = testBetslip.ilotFormat();
      expect(formatted.wager.boards[0].boardId).toBe(1);
      expect(formatted.wager.boards[1].boardId).toBe(2);
    });

    it('should handle board addition and removal', () => {
      betslip.addBoard();
      betslip.addBoard();
      expect(betslip.wager.boards).toHaveLength(3);

      betslip.removeBoard(1);
      expect(betslip.wager.boards).toHaveLength(2);

      betslip.removeBoard(0);
      expect(betslip.wager.boards).toHaveLength(1);
    });
  });
});
