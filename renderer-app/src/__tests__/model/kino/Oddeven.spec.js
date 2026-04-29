import { describe, it, expect, beforeEach, vi } from 'vitest';
import OddEven from '../../../model/kino/Oddeven';
import KinoConstants from '../../../util/kino/Constants';
import Utilities from '../../../util/Utilities';

vi.mock('../../../util/Utilities', () => ({
  default: {
    constructAmountFromSet: vi.fn((value) => {
      if (value === 0) return [];
      return [value];
    }),
  },
}));

describe('Kino OddEven', () => {
  let oddEven;

  beforeEach(() => {
    vi.clearAllMocks();
    oddEven = new OddEven();
  });

  describe('Constructor', () => {
    it('should initialize with default values', () => {
      expect(oddEven.oddEven).toBe('');
      expect(oddEven.value).toBe('');
      expect(oddEven.oddEvenAmount).toEqual([]);
    });

    it('should initialize with ODD betType', () => {
      const oddEvenModel = {
        betType: 3,
        multipliers: 2,
      };

      const oddEvenWithOdd = new OddEven(oddEvenModel);
      expect(oddEvenWithOdd.oddEven).toBe('odd');
      expect(oddEvenWithOdd.value).toBe(1.0);
    });

    it('should initialize with EVEN betType', () => {
      const oddEvenModel = {
        betType: 4,
        multipliers: 4,
      };

      const oddEvenWithEven = new OddEven(oddEvenModel);
      expect(oddEvenWithEven.oddEven).toBe('even');
      expect(oddEvenWithEven.value).toBe(2.0);
    });

    it('should initialize with DRAW betType', () => {
      const oddEvenModel = {
        betType: 5,
        multipliers: 6,
      };

      const oddEvenWithDraw = new OddEven(oddEvenModel);
      expect(oddEvenWithDraw.oddEven).toBe('draw');
      expect(oddEvenWithDraw.value).toBe(3.0);
    });

    it('should handle invalid betType', () => {
      const oddEvenModel = {
        betType: 10,
        multipliers: 2,
      };

      const oddEvenWithInvalid = new OddEven(oddEvenModel);
      expect(oddEvenWithInvalid.oddEven).toBe('');
    });

    it('should calculate value from multipliers', () => {
      const oddEvenModel = {
        betType: 3,
        multipliers: 10,
      };

      const oddEvenWithMultipliers = new OddEven(oddEvenModel);
      expect(oddEvenWithMultipliers.value).toBe(5.0);
    });

    it('should handle zero multipliers', () => {
      const oddEvenModel = {
        betType: 3,
        multipliers: 0,
      };

      const oddEvenWithZero = new OddEven(oddEvenModel);
      expect(oddEvenWithZero.value).toBe('');
    });

    it('should handle undefined betType', () => {
      const oddEvenModel = {
        multipliers: 4,
      };

      const oddEvenWithoutBetType = new OddEven(oddEvenModel);
      expect(oddEvenWithoutBetType.oddEven).toBe('');
    });

    it('should call constructAmountFromSet when oddEvenModel exists', () => {
      const oddEvenModel = {
        betType: 3,
        multipliers: 4,
      };

      new OddEven(oddEvenModel);
      expect(Utilities.constructAmountFromSet).toHaveBeenCalledWith(2.0, KinoConstants.ODD_EVEN_COLUMNS_AMOUNTS);
    });

    it('should not create oddEvenAmount when oddEvenModel is undefined', () => {
      const defaultOddEven = new OddEven();
      expect(defaultOddEven.oddEvenAmount).toEqual([]);
      expect(Utilities.constructAmountFromSet).not.toHaveBeenCalled();
    });
  });

  describe('resetOddEven', () => {
    it('should reset all properties to default', () => {
      oddEven.oddEven = 'odd';
      oddEven.oddEvenAmount = [1, 2, 3];
      oddEven.value = 10;

      oddEven.resetOddEven();

      expect(oddEven.oddEven).toBe('');
      expect(oddEven.oddEvenAmount).toEqual([]);
      expect(oddEven.value).toBe('');
    });

    it('should reset from populated state', () => {
      const oddEvenModel = {
        betType: 3,
        multipliers: 8,
      };
      const populatedOddEven = new OddEven(oddEvenModel);

      populatedOddEven.resetOddEven();

      expect(populatedOddEven.oddEven).toBe('');
      expect(populatedOddEven.oddEvenAmount).toEqual([]);
      expect(populatedOddEven.value).toBe('');
    });
  });

  describe('calculateValue', () => {
    it('should return 0 when oddEven is empty', () => {
      oddEven.oddEven = '';
      oddEven.oddEvenAmount = [5, 10];

      const value = oddEven.calculateValue();

      expect(value).toBe(0.0);
      expect(oddEven.value).toBe(0.0);
    });

    it('should calculate value correctly with oddEvenAmount', () => {
      oddEven.oddEven = 'odd';
      oddEven.oddEvenAmount = [2, 3, 5];

      const value = oddEven.calculateValue();

      expect(value).toBe(10);
      expect(oddEven.value).toBe(10);
    });

    it('should sum all amounts in oddEvenAmount', () => {
      oddEven.oddEven = 'even';
      oddEven.oddEvenAmount = [1, 1, 1, 1, 1];

      const value = oddEven.calculateValue();

      expect(value).toBe(5);
    });

    it('should handle single amount', () => {
      oddEven.oddEven = 'draw';
      oddEven.oddEvenAmount = [15];

      const value = oddEven.calculateValue();

      expect(value).toBe(15);
    });

    it('should not change value when oddEvenAmount is empty', () => {
      oddEven.oddEven = 'odd';
      oddEven.oddEvenAmount = [];
      oddEven.value = 5;

      oddEven.calculateValue();

      expect(oddEven.value).toBe(5);
    });

    it('should handle large amounts', () => {
      oddEven.oddEven = 'odd';
      oddEven.oddEvenAmount = [10, 20, 30, 50, 100];

      const value = oddEven.calculateValue();

      expect(value).toBe(210);
    });
  });

  describe('isFilled', () => {
    it('should return false when oddEven is empty', () => {
      oddEven.oddEven = '';
      expect(oddEven.isFilled()).toBe(false);
    });

    it('should return true when oddEven is "odd"', () => {
      oddEven.oddEven = 'odd';
      expect(oddEven.isFilled()).toBe(true);
    });

    it('should return true when oddEven is "even"', () => {
      oddEven.oddEven = 'even';
      expect(oddEven.isFilled()).toBe(true);
    });

    it('should return true when oddEven is "draw"', () => {
      oddEven.oddEven = 'draw';
      expect(oddEven.isFilled()).toBe(true);
    });

    it('should not depend on oddEvenAmount', () => {
      oddEven.oddEven = 'odd';
      oddEven.oddEvenAmount = [];
      expect(oddEven.isFilled()).toBe(true);

      oddEven.oddEvenAmount = [1, 2, 3];
      expect(oddEven.isFilled()).toBe(true);
    });

    it('should not depend on value', () => {
      oddEven.oddEven = 'even';
      oddEven.value = 0;
      expect(oddEven.isFilled()).toBe(true);

      oddEven.value = 100;
      expect(oddEven.isFilled()).toBe(true);
    });
  });

  describe('Integration', () => {
    it('should handle complete workflow for ODD', () => {
      const oddEvenModel = {
        betType: 3,
        multipliers: 4,
      };

      const testOddEven = new OddEven(oddEvenModel);
      expect(testOddEven.oddEven).toBe('odd');
      expect(testOddEven.isFilled()).toBe(true);

      testOddEven.calculateValue();
      expect(testOddEven.value).toBeGreaterThan(0);

      testOddEven.resetOddEven();
      expect(testOddEven.isFilled()).toBe(false);
      expect(testOddEven.oddEven).toBe('');
    });

    it('should handle complete workflow for EVEN', () => {
      const oddEvenModel = {
        betType: 4,
        multipliers: 6,
      };

      const testOddEven = new OddEven(oddEvenModel);
      expect(testOddEven.oddEven).toBe('even');
      expect(testOddEven.value).toBe(3.0);
    });

    it('should handle complete workflow for DRAW', () => {
      const oddEvenModel = {
        betType: 5,
        multipliers: 10,
      };

      const testOddEven = new OddEven(oddEvenModel);
      expect(testOddEven.oddEven).toBe('draw');
      expect(testOddEven.value).toBe(5.0);
    });

    it('should recalculate value after modification', () => {
      oddEven.oddEven = 'odd';
      oddEven.oddEvenAmount = [5];

      const firstValue = oddEven.calculateValue();
      expect(firstValue).toBe(5);

      oddEven.oddEvenAmount = [5, 10];
      const secondValue = oddEven.calculateValue();
      expect(secondValue).toBe(15);
    });
  });
});
