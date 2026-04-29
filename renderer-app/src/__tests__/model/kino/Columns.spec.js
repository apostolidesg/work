import { describe, it, expect, beforeEach, vi } from 'vitest';
import Columns from '../../../model/kino/Columns';
import KinoConstants from '../../../util/kino/Constants';
import Utilities from '../../../util/Utilities';

vi.mock('../../../util/Utilities', () => ({
  default: {
    arraySort: vi.fn((arr) => [...arr].sort((a, b) => a - b)),
    constructAmountFromSet: vi.fn((value) => {
      if (value === 0) return [];
      return [value];
    }),
  },
}));

describe('Kino Columns', () => {
  let columns;

  beforeEach(() => {
    vi.clearAllMocks();
    columns = new Columns();
  });

  describe('Constructor', () => {
    it('should initialize with default values', () => {
      expect(columns.columns).toEqual([]);
      expect(columns.value).toBe('');
      expect(columns.columnsAmount).toEqual([]);
    });

    it('should initialize with columnsModel', () => {
      const columnsModel = {
        panels: [{ selection: [3, 1, 5, 2] }],
        multipliers: 4,
      };

      const columnsWithModel = new Columns(columnsModel);
      expect(columnsWithModel.columns).toEqual([1, 2, 3, 5]);
      expect(columnsWithModel.value).toBe(2.0);
      expect(Utilities.arraySort).toHaveBeenCalledWith([3, 1, 5, 2]);
    });

    it('should handle empty selection in columnsModel', () => {
      const columnsModel = {
        panels: [{ selection: [] }],
        multipliers: 2,
      };

      const columnsWithEmptySelection = new Columns(columnsModel);
      expect(columnsWithEmptySelection.columns).toEqual([]);
      expect(columnsWithEmptySelection.value).toBe(1.0);
    });

    it('should handle undefined panels', () => {
      const columnsModel = {
        multipliers: 2,
      };

      const columnsWithNoPanels = new Columns(columnsModel);
      expect(columnsWithNoPanels.columns).toEqual([]);
    });

    it('should calculate value from multipliers', () => {
      const columnsModel = {
        panels: [{ selection: [1, 2, 3] }],
        multipliers: 6,
      };

      const columnsWithMultipliers = new Columns(columnsModel);
      expect(columnsWithMultipliers.value).toBe(3.0);
    });

    it('should handle zero multipliers', () => {
      const columnsModel = {
        panels: [{ selection: [1, 2] }],
        multipliers: 0,
      };

      const columnsWithZero = new Columns(columnsModel);
      expect(columnsWithZero.value).toBe('');
    });

    it('should call constructAmountFromSet when columnsModel exists', () => {
      const columnsModel = {
        panels: [{ selection: [1, 2] }],
        multipliers: 4,
      };

      new Columns(columnsModel);
      expect(Utilities.constructAmountFromSet).toHaveBeenCalledWith(2.0, KinoConstants.ODD_EVEN_COLUMNS_AMOUNTS);
    });
  });

  describe('resetColumns', () => {
    it('should reset columns to empty array', () => {
      columns.columns = [1, 2, 3];
      columns.columnsAmount = [5, 10];

      columns.resetColumns();

      expect(columns.columns).toEqual([]);
      expect(columns.columnsAmount).toEqual([]);
    });

    it('should reset from populated state', () => {
      const columnsModel = {
        panels: [{ selection: [1, 2, 3, 4] }],
        multipliers: 8,
      };
      const populatedColumns = new Columns(columnsModel);

      populatedColumns.resetColumns();

      expect(populatedColumns.columns).toEqual([]);
      expect(populatedColumns.columnsAmount).toEqual([]);
    });
  });

  describe('calculateValue', () => {
    it('should return 0 when columns is empty', () => {
      columns.columns = [];
      columns.columnsAmount = [1, 2];

      const value = columns.calculateValue();

      expect(value).toBe(0.0);
      expect(columns.value).toBe(0.0);
    });

    it('should calculate value correctly with columns and amounts', () => {
      columns.columns = [1, 2, 3];
      columns.columnsAmount = [2, 3];

      const value = columns.calculateValue();

      expect(value).toBe(15);
      expect(columns.value).toBe(15);
    });

    it('should multiply sum of amounts by number of columns', () => {
      columns.columns = [1, 5];
      columns.columnsAmount = [1, 1, 1];

      const value = columns.calculateValue();

      expect(value).toBe(6);
    });

    it('should handle single column', () => {
      columns.columns = [5];
      columns.columnsAmount = [10];

      const value = columns.calculateValue();

      expect(value).toBe(10);
    });

    it('should handle empty columnsAmount', () => {
      columns.columns = [1, 2, 3];
      columns.columnsAmount = [];

      const valueBefore = columns.value;
      columns.calculateValue();

      expect(columns.value).toBe(valueBefore);
    });

    it('should handle multiple amounts', () => {
      columns.columns = [1, 2];
      columns.columnsAmount = [1, 2, 5, 10];

      const value = columns.calculateValue();

      expect(value).toBe(36);
    });
  });

  describe('isFilled', () => {
    it('should return false when both columns and amounts are empty', () => {
      columns.columns = [];
      columns.columnsAmount = [];

      expect(columns.isFilled()).toBe(false);
    });

    it('should return false when columns is empty', () => {
      columns.columns = [];
      columns.columnsAmount = [1, 2];

      expect(columns.isFilled()).toBe(false);
    });

    it('should return false when columnsAmount is empty', () => {
      columns.columns = [1, 2, 3];
      columns.columnsAmount = [];

      expect(columns.isFilled()).toBe(false);
    });

    it('should return true when both columns and amounts are filled', () => {
      columns.columns = [1, 2, 3];
      columns.columnsAmount = [5];

      expect(columns.isFilled()).toBe(true);
    });

    it('should return true with single column and amount', () => {
      columns.columns = [5];
      columns.columnsAmount = [10];

      expect(columns.isFilled()).toBe(true);
    });

    it('should return true with multiple columns and amounts', () => {
      columns.columns = [1, 2, 3, 4, 5];
      columns.columnsAmount = [1, 2, 3, 5, 10];

      expect(columns.isFilled()).toBe(true);
    });
  });

  describe('Integration', () => {
    it('should handle complete workflow', () => {
      const columnsModel = {
        panels: [{ selection: [5, 2, 8] }],
        multipliers: 4,
      };

      const testColumns = new Columns(columnsModel);
      expect(testColumns.columns).toEqual([2, 5, 8]);
      expect(testColumns.isFilled()).toBe(true);

      testColumns.calculateValue();
      expect(testColumns.value).toBeGreaterThan(0);

      testColumns.resetColumns();
      expect(testColumns.isFilled()).toBe(false);
      expect(testColumns.columns).toEqual([]);
    });

    it('should recalculate value after modification', () => {
      columns.columns = [1, 2];
      columns.columnsAmount = [5];

      const firstValue = columns.calculateValue();
      expect(firstValue).toBe(10);

      columns.columns = [1, 2, 3];
      const secondValue = columns.calculateValue();
      expect(secondValue).toBe(15);
    });
  });
});
