import { describe, it, expect, beforeEach } from 'vitest';
import Board from '@/model/tzoker/Board';
import TzokerConstants from '@/util/tzoker/Constants';

describe('Tzoker Board', () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  describe('constructor', () => {
    it('should create a new empty board ready for number selection', () => {
      expect(board.panels[0].selection).toEqual([]);
      expect(board.panels[1].selection).toEqual([]);
      expect(board.systemId).toBe(null);
    });

    it('should restore a board from saved selections', () => {
      const savedBoard = new Board({
        panels: [
          { selection: [5, 10, 15, 20, 25], quickPick: false },
          { selection: [7], quickPick: false },
        ],
        systemId: 45,
      });

      expect(savedBoard.mainNumbers).toEqual([5, 10, 15, 20, 25]);
      expect(savedBoard.tzokerNumbers).toEqual([7]);
      expect(savedBoard.systemId).toBe(45);
    });
  });

  describe('selecting numbers', () => {
    it('should allow player to select a main number by tapping it', () => {
      board.toggleNumber(15, TzokerConstants.PANEL_TYPES.MAIN);

      expect(board.mainNumbers).toContain(15);
    });

    it('should allow player to deselect a number by tapping it again', () => {
      board.toggleNumber(15, TzokerConstants.PANEL_TYPES.MAIN);
      board.toggleNumber(15, TzokerConstants.PANEL_TYPES.MAIN);

      expect(board.mainNumbers).not.toContain(15);
    });

    it('should keep selected numbers sorted for display', () => {
      board.toggleNumber(30, TzokerConstants.PANEL_TYPES.MAIN);
      board.toggleNumber(5, TzokerConstants.PANEL_TYPES.MAIN);
      board.toggleNumber(20, TzokerConstants.PANEL_TYPES.MAIN);

      expect(board.mainNumbers).toEqual([5, 20, 30]);
    });

    it('should allow player to select tzoker numbers separately', () => {
      board.toggleNumber(7, TzokerConstants.PANEL_TYPES.TZOKER);
      board.toggleNumber(15, TzokerConstants.PANEL_TYPES.TZOKER);

      expect(board.tzokerNumbers).toEqual([7, 15]);
    });

    it('should not allow numbers outside the valid range', () => {
      board.toggleNumber(0, TzokerConstants.PANEL_TYPES.MAIN);
      board.toggleNumber(50, TzokerConstants.PANEL_TYPES.MAIN);

      expect(board.mainNumbers).toEqual([]);
    });

    it('should allow clearing all main numbers at once', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5];

      board.clearPanel(TzokerConstants.PANEL_TYPES.MAIN);

      expect(board.mainNumbers).toEqual([]);
    });
  });

  describe('quick pick', () => {
    it('should generate random numbers for the main panel', () => {
      board.setQuickPick(TzokerConstants.PANEL_TYPES.MAIN);

      expect(board.mainNumbersCount).toBe(5);
      expect(board.panels[0].quickPick).toBe(true);
    });

    it('should generate a random tzoker number', () => {
      board.setQuickPick(TzokerConstants.PANEL_TYPES.TZOKER);

      expect(board.tzokerNumbersCount).toBe(1);
      expect(board.panels[1].quickPick).toBe(true);
    });

    it('should fill the entire board with random numbers at once', () => {
      board.setFullQuickPick();

      expect(board.mainNumbersCount).toBe(5);
      expect(board.tzokerNumbersCount).toBe(1);
      expect(board.quickPick).toBe(true);
    });

    it('should preserve the current count when regenerating quick pick', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5, 6, 7];

      board.setQuickPick(TzokerConstants.PANEL_TYPES.MAIN);

      expect(board.mainNumbersCount).toBe(7);
    });
  });

  describe('system bets', () => {
    it('should allow player to activate a system bet', () => {
      board.setSystem(45);

      expect(board.hasSystem()).toBe(true);
      expect(board.systemId).toBe(45);
    });

    it('should toggle system off when selecting the same system again', () => {
      board.setSystem(45);
      board.setSystem(45);

      expect(board.hasSystem()).toBe(false);
    });

    it('should ignore invalid system IDs', () => {
      board.setSystem(999);

      expect(board.hasSystem()).toBe(false);
    });

    it('should return system configuration when system is active', () => {
      board.setSystem(45);

      const info = board.getSystemInfo();

      expect(info.numbers).toBe(7);
      expect(info.columns).toBe(5);
    });

    it('should allow removing the system to return to normal play', () => {
      board.setSystem(45);
      board.removeSystem();

      expect(board.hasSystem()).toBe(false);
    });
  });

  describe('special selections', () => {
    it('should allow selecting all 20 tzoker numbers at once for maximum coverage', () => {
      board.addAll20TzokerNumbers();

      expect(board.tzokerNumbersCount).toBe(20);
      expect(board.tzokerNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });
  });

  describe('validation and cost', () => {
    it('should be empty when no numbers are selected', () => {
      expect(board.isEmpty()).toBe(true);
    });

    it('should not be empty once player starts selecting', () => {
      board.toggleNumber(1, TzokerConstants.PANEL_TYPES.MAIN);

      expect(board.isEmpty()).toBe(false);
    });

    it('should be valid when player completes minimum selection of 5 main and 1 tzoker', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.panels[1].selection = [1];

      expect(board.isValid()).toBe(true);
    });

    it('should be invalid when selections are incomplete', () => {
      board.panels[0].selection = [1, 2, 3, 4];
      board.panels[1].selection = [1];

      expect(board.isValid()).toBe(false);
    });

    it('should calculate cost of 1 euro for a simple 5+1 bet', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.panels[1].selection = [1];

      expect(board.calculateCost()).toBe(1);
    });

    it('should calculate increased cost when player adds extra numbers', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5, 6];
      board.panels[1].selection = [1, 2];

      expect(board.calculateCost()).toBe(12);
    });
  });

  describe('reset and clone', () => {
    it('should clear everything when player wants to start over', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.panels[1].selection = [1];
      board.systemId = 45;

      board.reset();

      expect(board.isEmpty()).toBe(true);
      expect(board.hasSystem()).toBe(false);
    });

    it('should create an independent copy when cloning a board', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.panels[1].selection = [1];

      const cloned = board.clone();
      cloned.panels[0].selection.push(6);

      expect(board.mainNumbersCount).toBe(5);
      expect(cloned.mainNumbersCount).toBe(6);
    });
  });
});
