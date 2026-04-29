import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Board from '../../../model/eurojackpot/Board';
import EurojackpotConstants from '@/util/eurojackpot/Constants';
import Utilities from '../../../util/Utilities';
import EurojackpotBetslipUtilities from '@/util/eurojackpot/BetslipUtils';

vi.mock('../../../util/Utilities', () => ({
  default: {
    toggleNumberInArray: vi.fn((num, arr) => {
      const index = arr.indexOf(num);
      if (index > -1) {
        return arr.filter((n) => n !== num);
      }
      return [...arr, num].sort((a, b) => a - b);
    }),
    getUniqueRandomArray: vi.fn((min, max, count) => {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(min + i);
      }
      return result;
    }),
  },
}));

vi.mock('../../../util/eurojackpot/BetslipUtils', () => ({
  default: {
    isBoardValid: vi.fn((board) => {
      const mainValid = board.panels[0].selection.length === 5;
      const euroValid = board.panels[1].selection.length === 2;
      return mainValid && euroValid;
    }),
  },
}));

describe('Eurojackpot Board', () => {
  let board;

  beforeEach(() => {
    vi.clearAllMocks();
    board = new Board();
  });

  describe('Constructor', () => {
    it('should initialize with default values', () => {
      expect(board.panels).toEqual([{ selection: [] }, { selection: [] }]);
      expect(board.betType).toBe(EurojackpotConstants.BET_TYPES.DEFAULT);
      expect(board.quickPick).toBe(false);
      expect(board.multipliers).toBe(EurojackpotConstants.DEFAULT_MULTIPLIERS);
      expect(board.systemId).toBe(null);
    });

    it('should initialize with custom panels', () => {
      const customBoard = new Board({
        panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
      });

      expect(customBoard.panels[0].selection).toEqual([1, 2, 3, 4, 5]);
      expect(customBoard.panels[1].selection).toEqual([1, 2]);
    });

    it('should initialize with custom betType', () => {
      const customBoard = new Board({
        betType: 2,
      });

      expect(customBoard.betType).toBe(2);
    });

    it('should initialize with quickPick enabled', () => {
      const customBoard = new Board({
        quickPick: true,
      });

      expect(customBoard.quickPick).toBe(true);
    });

    it('should initialize with custom multipliers', () => {
      const customBoard = new Board({
        multipliers: 5,
      });

      expect(customBoard.multipliers).toBe(5);
    });

    it('should initialize with systemId', () => {
      const customBoard = new Board({
        systemId: 7,
      });

      expect(customBoard.systemId).toBe(7);
    });

    it('should handle empty constructor call', () => {
      const emptyBoard = new Board({});
      expect(emptyBoard.panels).toEqual([{ selection: [] }, { selection: [] }]);
    });
  });

  describe('setMainNumber', () => {
    it('should add main number when not present', () => {
      board.setMainNumber(5);
      expect(board.panels[0].selection).toContain(5);
      expect(Utilities.toggleNumberInArray).toHaveBeenCalledWith(5, []);
    });

    it('should remove main number when present', () => {
      board.panels[0].selection = [1, 5, 10];
      board.setMainNumber(5);
      expect(board.panels[0].selection).not.toContain(5);
    });

    it('should not allow numbers greater than MAX', () => {
      const max = EurojackpotConstants.BOARD_NUMBERS.MAIN.MAX;
      board.setMainNumber(max + 1);
      expect(Utilities.toggleNumberInArray).not.toHaveBeenCalled();
    });

    it('should not allow zero or negative numbers', () => {
      board.setMainNumber(0);
      expect(Utilities.toggleNumberInArray).not.toHaveBeenCalled();

      board.setMainNumber(-5);
      expect(Utilities.toggleNumberInArray).not.toHaveBeenCalled();
    });

    it('should disable quickPick when setting number', () => {
      board.quickPick = true;
      board.setMainNumber(10);
      expect(board.quickPick).toBe(false);
    });

    it('should allow numbers at MAX boundary', () => {
      const max = EurojackpotConstants.BOARD_NUMBERS.MAIN.MAX;
      board.setMainNumber(max);
      expect(Utilities.toggleNumberInArray).toHaveBeenCalledWith(max, []);
    });
  });

  describe('setEuroNumber', () => {
    it('should add euro number when not present', () => {
      board.setEuroNumber(5);
      expect(board.panels[1].selection).toContain(5);
      expect(Utilities.toggleNumberInArray).toHaveBeenCalledWith(5, []);
    });

    it('should remove euro number when present', () => {
      board.panels[1].selection = [1, 5];
      board.setEuroNumber(5);
      expect(board.panels[1].selection).not.toContain(5);
    });

    it('should not allow numbers greater than MAX', () => {
      const max = EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MAX;
      board.setEuroNumber(max + 1);
      expect(Utilities.toggleNumberInArray).not.toHaveBeenCalled();
    });

    it('should not allow zero or negative numbers', () => {
      board.setEuroNumber(0);
      expect(Utilities.toggleNumberInArray).not.toHaveBeenCalled();

      board.setEuroNumber(-3);
      expect(Utilities.toggleNumberInArray).not.toHaveBeenCalled();
    });

    it('should disable quickPick when setting number', () => {
      board.quickPick = true;
      board.setEuroNumber(8);
      expect(board.quickPick).toBe(false);
    });

    it('should allow numbers at MAX boundary', () => {
      const max = EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MAX;
      board.setEuroNumber(max);
      expect(Utilities.toggleNumberInArray).toHaveBeenCalledWith(max, []);
    });
  });

  describe('addQuickPick', () => {
    it('should generate main and euro numbers', () => {
      board.addQuickPick();

      expect(Utilities.getUniqueRandomArray).toHaveBeenCalledTimes(2);
      expect(board.quickPick).toBe(true);
    });

    it('should generate minimum numbers when board is empty', () => {
      board.addQuickPick();

      expect(Utilities.getUniqueRandomArray).toHaveBeenNthCalledWith(
        1,
        1,
        EurojackpotConstants.BOARD_NUMBERS.MAIN.MAX,
        EurojackpotConstants.BOARD_NUMBERS.MAIN.MIN
      );
      expect(Utilities.getUniqueRandomArray).toHaveBeenNthCalledWith(
        2,
        1,
        EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MAX,
        EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MIN
      );
    });

    it('should preserve selection count when numbers already exist', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5, 6, 7];
      board.panels[1].selection = [1, 2, 3];

      board.addQuickPick();

      expect(Utilities.getUniqueRandomArray).toHaveBeenNthCalledWith(
        1,
        1,
        EurojackpotConstants.BOARD_NUMBERS.MAIN.MAX,
        7
      );
      expect(Utilities.getUniqueRandomArray).toHaveBeenNthCalledWith(
        2,
        1,
        EurojackpotConstants.BOARD_NUMBERS.EURO_NUMBERS.MAX,
        3
      );
    });

    it('should use system numbers when systemId is set', () => {
      EurojackpotConstants.SYSTEMS = {
        7: { numbers: 7 },
        8: { numbers: 8 },
      };

      board.systemId = 7;
      board.addQuickPick();

      expect(Utilities.getUniqueRandomArray).toHaveBeenNthCalledWith(
        1,
        1,
        EurojackpotConstants.BOARD_NUMBERS.MAIN.MAX,
        7
      );

      delete EurojackpotConstants.SYSTEMS;
    });

    it('should enable quickPick flag', () => {
      board.quickPick = false;
      board.addQuickPick();
      expect(board.quickPick).toBe(true);
    });
  });

  describe('enableQuickPick', () => {
    it('should set quickPick to true', () => {
      board.quickPick = false;
      board.enableQuickPick();
      expect(board.quickPick).toBe(true);
    });
  });

  describe('disableQuickPick', () => {
    it('should set quickPick to false', () => {
      board.quickPick = true;
      board.disableQuickPick();
      expect(board.quickPick).toBe(false);
    });
  });

  describe('setSystemId', () => {
    beforeEach(() => {
      EurojackpotConstants.SYSTEMS = {
        7: { numbers: 7 },
        8: { numbers: 8 },
      };
    });

    afterEach(() => {
      delete EurojackpotConstants.SYSTEMS;
    });

    it('should set systemId when valid', () => {
      board.setSystemId(7);
      expect(board.systemId).toBe(7);
    });

    it('should toggle systemId when set again', () => {
      board.setSystemId(7);
      expect(board.systemId).toBe(7);

      board.setSystemId(7);
      expect(board.systemId).toBe(null);
    });

    it('should switch to different systemId', () => {
      board.setSystemId(7);
      board.setSystemId(8);
      expect(board.systemId).toBe(8);
    });

    it('should not set invalid systemId', () => {
      board.setSystemId(999);
      expect(board.systemId).toBe(null);
    });

    it('should disable quickPick when setting systemId', () => {
      board.quickPick = true;
      board.setSystemId(7);
      expect(board.quickPick).toBe(false);
    });

    it('should clear systemId when passed null', () => {
      board.systemId = 7;
      board.setSystemId(null);
      expect(board.systemId).toBe(null);
    });
  });

  describe('reset', () => {
    it('should reset all properties to default', () => {
      board.panels = [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }];
      board.betType = 5;
      board.quickPick = true;
      board.multipliers = 10;
      board.systemId = 7;

      board.reset();

      expect(board.panels).toEqual([{ selection: [] }, { selection: [] }]);
      expect(board.betType).toBe(EurojackpotConstants.BET_TYPES.DEFAULT);
      expect(board.quickPick).toBe(false);
      expect(board.multipliers).toBe(EurojackpotConstants.DEFAULT_MULTIPLIERS);
      expect(board.systemId).toBe(null);
    });
  });

  describe('isEmpty', () => {
    it('should return true when both panels are empty and no systemId', () => {
      expect(board.isEmpty()).toBe(true);
    });

    it('should return false when main panel has numbers', () => {
      board.panels[0].selection = [1, 2, 3];
      expect(board.isEmpty()).toBe(false);
    });

    it('should return false when euro panel has numbers', () => {
      board.panels[1].selection = [1, 2];
      expect(board.isEmpty()).toBe(false);
    });

    it('should return false when systemId is set', () => {
      board.systemId = 7;
      expect(board.isEmpty()).toBe(false);
    });

    it('should return false when both panels and systemId are set', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.panels[1].selection = [1, 2];
      board.systemId = 7;
      expect(board.isEmpty()).toBe(false);
    });
  });

  describe('isValid', () => {
    it('should return true for valid board', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.panels[1].selection = [1, 2];

      expect(board.isValid()).toBe(true);
      expect(EurojackpotBetslipUtilities.isBoardValid).toHaveBeenCalledWith(board);
    });

    it('should return false for invalid board', () => {
      board.panels[0].selection = [1, 2, 3];
      board.panels[1].selection = [1];

      EurojackpotBetslipUtilities.isBoardValid.mockReturnValue(false);
      expect(board.isValid()).toBe(false);
    });

    it('should delegate to BetslipUtilities', () => {
      board.isValid();
      expect(EurojackpotBetslipUtilities.isBoardValid).toHaveBeenCalledWith(board);
    });
  });

  describe('Integration', () => {
    it('should handle complete workflow', () => {
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.panels[1].selection = [1, 2];

      expect(board.panels[0].selection).toHaveLength(5);
      expect(board.panels[1].selection).toHaveLength(2);
      expect(board.isEmpty()).toBe(false);

      board.reset();

      expect(board.panels[0].selection).toEqual([]);
      expect(board.panels[1].selection).toEqual([]);
      expect(board.systemId).toBe(null);
      expect(board.isEmpty()).toBe(true);
    });

    it('should handle quickPick workflow', () => {
      board.addQuickPick();
      expect(board.quickPick).toBe(true);
      expect(board.panels[0].selection.length).toBeGreaterThan(0);

      board.setMainNumber(1);
      expect(board.quickPick).toBe(false);
    });

    it('should handle system workflow', () => {
      EurojackpotConstants.SYSTEMS = {
        7: { numbers: 7 },
      };

      board.setSystemId(7);
      expect(board.systemId).toBe(7);

      board.addQuickPick();
      expect(board.quickPick).toBe(true);

      board.setSystemId(7);
      expect(board.systemId).toBe(null);

      delete EurojackpotConstants.SYSTEMS;
    });
  });
});
