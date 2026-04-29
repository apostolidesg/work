import { describe, it, expect, beforeEach, vi } from 'vitest';
import Board from '../../../model/kino/Board';
import Constants from '../../../util/Constants';
import Utilities from '../../../util/Utilities';

vi.mock('../../../util/Utilities', () => ({
  default: {
    isBetTypeKinoBonus: vi.fn((betType) => betType === 2 || betType === 25),
    isBetTypeClose2Win: vi.fn((betType) => betType === 24 || betType === 25),
    constructAmountFromSet: vi.fn((value) => [value]),
    getRandomInt: vi.fn((min, max) => Math.floor(Math.random() * (max - min + 1)) + min),
    arraySort: vi.fn((arr) => [...arr].sort((a, b) => a - b)),
    toggleNumberInArray: vi.fn((num, arr) => {
      const index = arr.indexOf(num);
      if (index > -1) {
        return arr.filter((n) => n !== num);
      }
      return [...arr, num];
    }),
    arraySum: vi.fn((arr) => arr.reduce((sum, val) => sum + val, 0)),
  },
}));

describe('Kino Board', () => {
  let board;

  beforeEach(() => {
    vi.clearAllMocks();
    board = new Board(1);
  });

  describe('Constructor', () => {
    it('should initialize with default values', () => {
      expect(board.activeArea).toBe(true);
      expect(board.pickedNumbers).toEqual([]);
      expect(board.filled).toBe(false);
      expect(board.gameType).toBe(0);
      expect(board.kinoBonusActive).toBe(false);
      expect(board.kinoClose2WinActive).toBe(false);
      expect(board.multiplier).toBe(1);
      expect(board.quickPick).toBe(false);
      expect(board.value).toBe(0);
    });

    it('should set activeArea to false when area is not 1', () => {
      const board2 = new Board(2);
      expect(board2.activeArea).toBe(false);
    });

    it('should initialize with betModel', () => {
      const betModel = {
        betType: 1,
        multipliers: 2,
        panels: [{ selection: [1, 2, 3, 4, 5] }],
      };

      const boardWithModel = new Board(1, betModel);
      expect(boardWithModel.pickedNumbers).toEqual([1, 2, 3, 4, 5]);
      expect(boardWithModel.gameType).toBe(5);
      expect(boardWithModel.filled).toBe(true);
      expect(boardWithModel.multiplier).toBe(2);
    });

    it('should handle Kino Bonus bet type', () => {
      const betModel = {
        betType: 2,
        panels: [{ selection: [1, 2, 3] }],
      };

      const boardWithBonus = new Board(1, betModel);
      expect(boardWithBonus.kinoBonusActive).toBe(true);
    });

    it('should handle Close2Win bet type', () => {
      const betModel = {
        betType: 24,
        panels: [{ selection: [1, 2, 3] }],
      };

      const boardWithC2W = new Board(1, betModel);
      expect(boardWithC2W.kinoClose2WinActive).toBe(true);
    });

    it('should handle QuickPick flag', () => {
      const betModel = {
        quickPick: true,
        panels: [{ selection: [1, 2, 3, 4, 5] }],
      };

      const boardWithQP = new Board(1, betModel);
      expect(boardWithQP.quickPick).toBe(true);
    });
  });

  describe('quickPickSelections', () => {
    it('should return empty array when betModel is undefined', () => {
      const result = board.quickPickSelections();
      expect(result).toEqual([]);
    });

    it('should return selection when quickPick is false', () => {
      const betModel = {
        quickPick: false,
        panels: [{ selection: [5, 10, 15] }],
      };

      const result = board.quickPickSelections(betModel);
      expect(result).toEqual([5, 10, 15]);
    });

    it('should generate random numbers when quickPick is true', () => {
      const betModel = {
        quickPick: true,
        panels: [{ selection: [1, 2, 3, 4, 5] }],
      };

      const result = board.quickPickSelections(betModel);
      expect(result).toHaveLength(5);
      expect(Utilities.getRandomInt).toHaveBeenCalled();
      expect(Utilities.arraySort).toHaveBeenCalled();
    });
  });

  describe('calculateValue', () => {
    it('should return 0 for empty board', () => {
      expect(board.calculateValue()).toBe(0);
    });

    it('should calculate base value correctly', () => {
      board.gameType = 3;
      board.pickedNumbers = [1, 2, 3];
      board.multiplier = 1;
      board.kinoBonusActive = false;
      board.kinoClose2WinActive = false;

      expect(board.calculateValue()).toBe(0.5);
    });

    it('should apply multiplier correctly', () => {
      board.gameType = 3;
      board.pickedNumbers = [1, 2, 3];
      board.multiplier = 2;
      board.kinoBonusActive = false;
      board.kinoClose2WinActive = false;

      expect(board.calculateValue()).toBe(1.0);
    });

    it('should apply Kino Bonus multiplier', () => {
      board.gameType = 3;
      board.pickedNumbers = [1, 2, 3];
      board.multiplier = 1;
      board.kinoBonusActive = true;
      board.kinoClose2WinActive = false;

      expect(board.calculateValue()).toBe(1.0);
    });

    it('should apply Close2Win multiplier', () => {
      board.gameType = 3;
      board.pickedNumbers = [1, 2, 3];
      board.multiplier = 1;
      board.kinoBonusActive = false;
      board.kinoClose2WinActive = true;

      expect(board.calculateValue()).toBe(1.0);
    });

    it('should apply both Kino Bonus and Close2Win multipliers', () => {
      board.gameType = 3;
      board.pickedNumbers = [1, 2, 3];
      board.multiplier = 1;
      board.kinoBonusActive = true;
      board.kinoClose2WinActive = true;

      expect(board.calculateValue()).toBe(1.5);
    });
  });

  describe('refreshValue', () => {
    it('should update value property', () => {
      board.gameType = 3;
      board.pickedNumbers = [1, 2, 3];
      board.multiplier = 2;

      board.refreshValue();
      expect(board.value).toBe(1.0);
    });
  });

  describe('toggleNumber', () => {
    it('should add number if not present', () => {
      board.toggleNumber(5);
      expect(board.pickedNumbers).toContain(5);
      expect(board.filled).toBe(true);
      expect(board.gameType).toBe(1);
    });

    it('should remove number if present', () => {
      board.pickedNumbers = [1, 5, 10];
      board.gameType = 3;
      board.filled = true;

      board.toggleNumber(5);
      expect(board.pickedNumbers).not.toContain(5);
      expect(board.gameType).toBe(2);
    });

    it('should not add more than 12 numbers', () => {
      board.pickedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      board.gameType = 12;

      board.toggleNumber(13);
      expect(board.pickedNumbers).toHaveLength(12);
      expect(board.pickedNumbers).not.toContain(13);
    });

    it('should disable quickPick when toggling number', () => {
      board.quickPick = true;
      board.toggleNumber(5);
      expect(board.quickPick).toBe(false);
    });

    it('should disable Close2Win if gameType not eligible', () => {
      board.kinoClose2WinActive = true;
      board.pickedNumbers = [1, 2, 3, 4, 5];
      board.gameType = 5;

      board.toggleNumber(1);
      expect(board.gameType).toBe(4);
    });

    it('should disable Kino Bonus if no numbers selected', () => {
      board.kinoBonusActive = true;
      board.pickedNumbers = [5];
      board.gameType = 1;

      board.toggleNumber(5);
      expect(board.gameType).toBe(0);
      expect(board.kinoBonusActive).toBe(false);
    });
  });

  describe('quickPickNumbers', () => {
    it('should generate specified number of random numbers', () => {
      board.quickPickNumbers(5);

      expect(board.pickedNumbers).toHaveLength(5);
      expect(board.quickPick).toBe(true);
      expect(board.gameType).toBe(5);
      expect(board.filled).toBe(true);
    });

    it('should call Utilities.getRandomInt correct number of times', () => {
      board.quickPickNumbers(3);
      expect(Utilities.getRandomInt).toHaveBeenCalledTimes(3);
    });

    it('should sort picked numbers', () => {
      board.quickPickNumbers(5);
      expect(Utilities.arraySort).toHaveBeenCalled();
    });
  });

  describe('resetArea', () => {
    it('should reset all board properties', () => {
      board.pickedNumbers = [1, 2, 3];
      board.filled = true;
      board.gameType = 3;
      board.multiplier = 5;
      board.kinoBonusActive = true;
      board.kinoClose2WinActive = true;
      board.quickPick = true;

      board.resetArea();

      expect(board.filled).toBe(false);
      expect(board.gameType).toBe(0);
      expect(board.pickedNumbers).toEqual([]);
      expect(board.multiplier).toBe(1);
      expect(board.kinoBonusActive).toBe(false);
      expect(board.kinoClose2WinActive).toBe(false);
      expect(board.quickPick).toBe(false);
      expect(board.value).toBe(0);
    });
  });

  describe('toggleMultiplier', () => {
    it('should toggle multiplier value', () => {
      board.toggleMultiplier(2);
      expect(Utilities.toggleNumberInArray).toHaveBeenCalled();
      expect(Utilities.arraySum).toHaveBeenCalled();
    });

    it('should ensure at least one multiplier is selected', () => {
      Utilities.toggleNumberInArray.mockReturnValue([]);
      board.toggleMultiplier(1);

      expect(board.selectedMultipliers).toEqual([Constants.MULTIPLIERS_SET[0]]);
    });

    it('should refresh value after toggling multiplier', () => {
      board.gameType = 3;
      board.pickedNumbers = [1, 2, 3];
      const spy = vi.spyOn(board, 'refreshValue');

      board.toggleMultiplier(2);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('isDirty', () => {
    it('should return false for clean board', () => {
      expect(board.isDirty()).toBe(false);
    });

    it('should return true when filled', () => {
      board.filled = true;
      expect(board.isDirty()).toBe(true);
    });

    it('should return true when Kino Bonus is active', () => {
      board.kinoBonusActive = true;
      expect(board.isDirty()).toBe(true);
    });

    it('should return true when Close2Win is active', () => {
      board.kinoClose2WinActive = true;
      expect(board.isDirty()).toBe(true);
    });

    it('should return true when multiplier is greater than 1', () => {
      board.multiplier = 2;
      expect(board.isDirty()).toBe(true);
    });
  });
});
