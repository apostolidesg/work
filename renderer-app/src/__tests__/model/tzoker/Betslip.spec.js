import { describe, it, expect, beforeEach } from 'vitest';
import Betslip from '@/model/tzoker/Betslip';
import Constants from '@/util/Constants';
import TzokerConstants from '@/util/tzoker/Constants';

describe('Tzoker Betslip', () => {
  let betslip;

  beforeEach(() => {
    betslip = new Betslip();
  });

  describe('constructor', () => {
    it('should create a new betslip with one empty board ready to play', () => {
      expect(betslip.wager.boards).toHaveLength(1);
      expect(betslip.gameType).toBe(Constants.GENERAL_GAME_TYPES.TZOKER);
    });

    it('should default to participating in 1 draw', () => {
      expect(betslip.consecutiveDraws).toBe(1);
    });

    it('should restore a previous betslip from saved wager data', () => {
      const savedWager = {
        boards: [
          { panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [7] }] },
          { panels: [{ selection: [10, 20, 30, 40, 45] }, { selection: [15] }] },
        ],
        participatingDraws: { multipleDraws: 4 },
      };

      const restoredBetslip = new Betslip({ wagerModel: savedWager });

      expect(restoredBetslip.wager.boards).toHaveLength(2);
      expect(restoredBetslip.consecutiveDraws).toBe(4);
    });
  });

  describe('managing boards', () => {
    it('should allow player to add a new board to play more combinations', () => {
      betslip.addBoard();
      expect(betslip.boardCount).toBe(2);
    });

    it('should not allow more than 12 boards on a single betslip', () => {
      for (let i = 0; i < 15; i++) {
        betslip.addBoard();
      }
      expect(betslip.boardCount).toBe(TzokerConstants.MAX_BOARDS);
    });

    it('should remove a board when player decides to play fewer combinations', () => {
      betslip.addBoard();
      betslip.addBoard();
      expect(betslip.boardCount).toBe(3);

      betslip.removeBoard(1);
      expect(betslip.boardCount).toBe(2);
    });

    it('should reset the last board instead of removing it to keep at least one board', () => {
      const board = betslip.getBoard(0);
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.panels[1].selection = [1];

      betslip.removeBoard(0);

      expect(betslip.boardCount).toBe(1);
      expect(betslip.getBoard(0).panels[0].selection).toEqual([]);
    });

    it('should clear all boards and start fresh when player wants to start over', () => {
      betslip.addBoard();
      betslip.addBoard();
      betslip.getBoard(0).panels[0].selection = [1, 2, 3, 4, 5];

      betslip.clearBoards();

      expect(betslip.boardCount).toBe(1);
      expect(betslip.getBoard(0).isEmpty()).toBe(true);
    });
  });

  describe('quick pick and random boards', () => {
    it('should add multiple random boards at once for quick play', () => {
      const added = betslip.addMultipleRandomBoards(3);

      expect(added).toBe(3);
      expect(betslip.boardCount).toBe(4);
    });

    it('should not exceed maximum boards when adding multiple random boards', () => {
      for (let i = 0; i < 10; i++) {
        betslip.addBoard();
      }

      const added = betslip.addMultipleRandomBoards(5);

      expect(added).toBeLessThan(5);
      expect(betslip.boardCount).toBe(TzokerConstants.MAX_BOARDS);
    });

    it('should shuffle a board to get new random numbers while keeping the same count', () => {
      const board = betslip.getBoard(0);
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.panels[1].selection = [1];
      const boardId = board.getId();

      betslip.shuffleBoard(boardId);

      expect(board.panels[0].selection).toHaveLength(5);
      expect(board.panels[1].selection).toHaveLength(1);
    });
  });

  describe('consecutive draws', () => {
    it('should allow player to participate in multiple draws with the same numbers', () => {
      betslip.setConsecutiveDraws(5);
      expect(betslip.consecutiveDraws).toBe(5);
    });

    it('should reject invalid number of consecutive draws', () => {
      const result = betslip.setConsecutiveDraws(15);

      expect(result).toBe(false);
      expect(betslip.consecutiveDraws).toBe(1);
    });
  });

  describe('validation', () => {
    it('should be empty when player has not made any selections', () => {
      expect(betslip.isEmpty()).toBe(true);
    });

    it('should not be empty when player has started selecting numbers', () => {
      betslip.getBoard(0).panels[0].selection = [1, 2, 3];
      expect(betslip.isEmpty()).toBe(false);
    });

    it('should be valid when at least one board has complete selections', () => {
      betslip.getBoard(0).panels[0].selection = [1, 2, 3, 4, 5];
      betslip.getBoard(0).panels[1].selection = [1];

      expect(betslip.isValid()).toBe(true);
    });

    it('should be invalid when no board has complete selections', () => {
      betslip.getBoard(0).panels[0].selection = [1, 2, 3];

      expect(betslip.isValid()).toBe(false);
    });

    it('should return only the boards that are ready to be played', () => {
      betslip.addBoard();
      betslip.getBoard(0).panels[0].selection = [1, 2, 3, 4, 5];
      betslip.getBoard(0).panels[1].selection = [1];
      betslip.getBoard(1).panels[0].selection = [1, 2];

      const validBoards = betslip.getValidBoards();

      expect(validBoards).toHaveLength(1);
    });
  });

  describe('cost calculation', () => {
    it('should calculate total cost based on all valid boards and draws', () => {
      betslip.getBoard(0).panels[0].selection = [1, 2, 3, 4, 5];
      betslip.getBoard(0).panels[1].selection = [1];
      betslip.setConsecutiveDraws(3);

      expect(betslip.calculateTotalCost()).toBe(3);
    });
  });

  describe('reset', () => {
    it('should clear everything and return to initial state', () => {
      betslip.addBoard();
      betslip.getBoard(0).panels[0].selection = [1, 2, 3, 4, 5];
      betslip.setConsecutiveDraws(5);
      betslip.setISecureTokens(['token1']);

      betslip.reset();

      expect(betslip.boardCount).toBe(1);
      expect(betslip.consecutiveDraws).toBe(1);
      expect(betslip.isecure).toEqual([]);
      expect(betslip.isEmpty()).toBe(true);
    });
  });
});
