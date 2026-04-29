import { describe, it, expect, beforeEach, vi } from 'vitest';
import Board from '../../../model/powerspin/Board';
import PowerspinConstants from '../../../util/powerspin/Constants';
import Utilities from '../../../util/Utilities';

vi.mock('../../../util/Utilities', () => ({
  default: {
    constructAmountFromSet: vi.fn((value) => [value]),
    toggleNumberInArray: vi.fn((num, arr) => {
      const index = arr.indexOf(num);
      if (index > -1) {
        return arr.filter((n) => n !== num);
      }
      return [...arr, num].sort((a, b) => a - b);
    }),
  },
}));

describe('Powerspin Board', () => {
  let board;

  beforeEach(() => {
    vi.clearAllMocks();
    PowerspinConstants.ILOT_GAMETYPES = {
      PLAY_NUMBER: 1,
      PLAY_SYMBOL: 2,
      PLAY_A_NUMBER_ON_ANY_WHEEL: 3,
    };
    PowerspinConstants.DEFAULT_REQUESTED = 1;
    PowerspinConstants.DEFAULT_MULTIPLIERS = 1;
    PowerspinConstants.MULTIPLIERS_SET = [1, 2, 4, 6, 10];
    board = new Board();
  });

  describe('Constructor', () => {
    it('should initialize with default values', () => {
      expect(board.betType).toBeUndefined();
      expect(board.panels).toEqual([{ requested: [], selection: [] }]);
      expect(board.quickPick).toBe(false);
      expect(board.multipliers).toEqual([1]);
      expect(board.extendedBetting).toEqual({ systems: [{ id: null, index: [] }] });
    });

    it('should initialize with custom betType', () => {
      const customBoard = new Board({ betType: PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER });
      expect(customBoard.betType).toBe(1);
    });

    it('should initialize with custom panels', () => {
      const customBoard = new Board({
        panels: [{ requested: [2], selection: [5, 10] }],
      });
      expect(customBoard.panels[0].requested).toEqual([2]);
      expect(customBoard.panels[0].selection).toEqual([5, 10]);
    });

    it('should convert non-array requested to array', () => {
      const customBoard = new Board({
        panels: [{ requested: 3, selection: [] }],
      });
      expect(customBoard.panels[0].requested).toEqual([3]);
    });

    it('should set default requested for PLAY_NUMBER betType', () => {
      const numberBoard = new Board({
        betType: PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER,
        panels: [{ requested: [], selection: [] }],
      });
      expect(numberBoard.panels[0].requested).toEqual([1]);
    });

    it('should set default requested for PLAY_A_NUMBER_ON_ANY_WHEEL betType', () => {
      const anyWheelBoard = new Board({
        betType: PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL,
        panels: [{ requested: [], selection: [] }],
      });
      expect(anyWheelBoard.panels[0].requested).toEqual([1]);
    });

    it('should initialize with quickPick enabled', () => {
      const quickPickBoard = new Board({ quickPick: true });
      expect(quickPickBoard.quickPick).toBe(true);
    });

    it('should handle array multipliers', () => {
      const customBoard = new Board({ multipliers: [1, 2, 4] });
      expect(customBoard.multipliers).toEqual([1, 2, 4]);
    });

    it('should convert single multiplier to array', () => {
      const customBoard = new Board({ multipliers: 5 });
      expect(Utilities.constructAmountFromSet).toHaveBeenCalledWith(5, PowerspinConstants.MULTIPLIERS_SET);
    });
  });

  describe('reset', () => {
    it('should reset to default state', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL;
      board.panels = [{ requested: [2, 3], selection: [5, 10, 15] }];
      board.multipliers = [1, 2, 4];
      board.quickPick = true;

      board.reset();

      expect(board.panels).toEqual([{ requested: [], selection: [] }]);
      expect(board.multipliers).toEqual([1]);
      expect(board.extendedBetting).toEqual({ systems: [{ id: null, index: [] }] });
      expect(board.quickPick).toBe(false);
    });

    it('should set default requested for PLAY_NUMBER after reset', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER;
      board.panels = [{ requested: [2, 3], selection: [5, 10] }];

      board.reset();

      expect(board.panels[0].requested).toEqual([1]);
    });

    it('should set default requested for PLAY_A_NUMBER_ON_ANY_WHEEL after reset', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL;
      board.panels = [{ requested: [2], selection: [5] }];

      board.reset();

      expect(board.panels[0].requested).toEqual([1]);
    });

    it('should clear betType for PLAY_SYMBOL', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL;
      board.reset();
      expect(board.betType).toBeUndefined();
    });

    it('should preserve betType for non-PLAY_SYMBOL types', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER;
      board.reset();
      expect(board.betType).toBe(PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
    });
  });

  describe('setBetType', () => {
    it('should set betType', () => {
      board.setBetType(PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
      expect(board.betType).toBe(1);
    });

    it('should change existing betType', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER;
      board.setBetType(PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL);
      expect(board.betType).toBe(2);
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

  describe('isEmpty', () => {
    it('should return true for board with no betType', () => {
      expect(board.isEmpty()).toBe(true);
    });

    it('should return true for PLAY_NUMBER with no selection and default requested', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER;
      board.panels = [{ requested: [1], selection: [] }];
      expect(board.isEmpty()).toBe(true);
    });

    it('should return true for PLAY_NUMBER with no selection and empty requested', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER;
      board.panels = [{ requested: [], selection: [] }];
      expect(board.isEmpty()).toBe(true);
    });

    it('should return false for PLAY_NUMBER with selection', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER;
      board.panels = [{ requested: [1], selection: [5, 10] }];
      expect(board.isEmpty()).toBe(false);
    });

    it('should return false for PLAY_NUMBER with non-default requested', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER;
      board.panels = [{ requested: [2], selection: [] }];
      expect(board.isEmpty()).toBe(false);
    });

    it('should return true for PLAY_A_NUMBER_ON_ANY_WHEEL with no selection', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL;
      board.panels = [{ requested: [1], selection: [] }];
      expect(board.isEmpty()).toBe(true);
    });

    it('should return false for PLAY_A_NUMBER_ON_ANY_WHEEL with selection', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL;
      board.panels = [{ requested: [1], selection: [5] }];
      expect(board.isEmpty()).toBe(false);
    });

    it('should return false for PLAY_SYMBOL with betType set', () => {
      board.betType = PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL;
      expect(board.isEmpty()).toBe(false);
    });
  });

  describe('toggleMultipliers', () => {
    it('should add multiplier when not present', () => {
      board.multipliers = [1];
      board.toggleMultipliers(2);
      expect(board.multipliers).toContain(2);
    });

    it('should remove multiplier when present', () => {
      board.multipliers = [1, 2, 4];
      board.toggleMultipliers(2);
      expect(board.multipliers).not.toContain(2);
    });

    it('should use default multiplier when no argument', () => {
      board.toggleMultipliers();
      expect(Utilities.toggleNumberInArray).toHaveBeenCalledWith(
        PowerspinConstants.DEFAULT_MULTIPLIERS,
        expect.any(Array),
        PowerspinConstants.MULTIPLIERS_SET
      );
    });

    it('should ensure at least one multiplier', () => {
      Utilities.toggleNumberInArray.mockReturnValue([]);
      board.toggleMultipliers(1);
      expect(board.multipliers).toEqual([1]);
    });
  });

  describe('getMultiplierNumber', () => {
    it('should return sum of multipliers', () => {
      board.multipliers = [1, 2, 4];
      expect(board.getMultiplierNumber()).toBe(7);
    });

    it('should return 0 for empty multipliers', () => {
      board.multipliers = [];
      expect(board.getMultiplierNumber()).toBe(0);
    });

    it('should handle single multiplier', () => {
      board.multipliers = [10];
      expect(board.getMultiplierNumber()).toBe(10);
    });
  });

  describe('Integration', () => {
    it('should handle complete workflow for PLAY_NUMBER', () => {
      board.setBetType(PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
      expect(board.betType).toBe(1);

      board.panels = [{ requested: [2], selection: [5, 10] }];
      expect(board.isEmpty()).toBe(false);

      board.enableQuickPick();
      expect(board.quickPick).toBe(true);

      board.multipliers = [1, 2, 4];
      const multiplierSum = board.getMultiplierNumber();
      expect(multiplierSum).toBe(7);

      board.reset();
      expect(board.panels[0].requested).toEqual([1]);
      expect(board.quickPick).toBe(false);
    });

    it('should handle complete workflow for PLAY_SYMBOL', () => {
      board.setBetType(PowerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL);
      expect(board.isEmpty()).toBe(false);

      board.reset();
      expect(board.betType).toBeUndefined();
      expect(board.isEmpty()).toBe(true);
    });

    it('should handle multipliers workflow', () => {
      board.multipliers = [1];
      expect(board.getMultiplierNumber()).toBe(1);

      board.multipliers = [1, 2];
      expect(board.getMultiplierNumber()).toBe(3);

      board.multipliers = [1, 2, 4];
      expect(board.getMultiplierNumber()).toBe(7);
    });
  });
});
