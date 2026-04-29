import { describe, it, expect, beforeEach, vi } from 'vitest';
import Markets from '../../../model/powerspin/Markets';
import Board from '../../../model/powerspin/Board';
import PowerspinConstants from '../../../util/powerspin/Constants';
import betslipUtils from '../../../util/powerspin/BetslipUtils';

vi.mock('../../../model/powerspin/Board', () => ({
  default: vi.fn(function (config = {}) {
    this.betType = config.betType;
    this.isEmpty = vi.fn(() => true);
  }),
}));

vi.mock('../../../util/powerspin/BetslipUtils', () => ({
  default: {
    resetMarketCategory: vi.fn(),
    toggleGameTypeOnMultiBoardCategory: vi.fn(),
    toggleMultipliersOnMultiBoardCategory: vi.fn(),
  },
}));

describe('Powerspin Markets', () => {
  let markets;

  beforeEach(() => {
    vi.clearAllMocks();
    markets = new Markets();
  });

  describe('Constructor', () => {
    it('should initialize NUMBER_ON_WHEEL category with correct type', () => {
      const category = markets.categories[PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL];
      expect(category.type).toBe(PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL);
    });

    it('should initialize NUMBER_ON_WHEEL category with one board', () => {
      const category = markets.categories[PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL];
      expect(category.boards).toHaveLength(1);
    });

    it('should initialize NUMBER_ON_WHEEL board with PLAY_A_NUMBER_ON_ANY_WHEEL betType', () => {
      expect(Board).toHaveBeenCalledWith({
        betType: PowerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL,
      });
    });

    it('should initialize WHEELS_WITH_SYMBOL category with correct type', () => {
      const category = markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL];
      expect(category.type).toBe(PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL);
    });

    it('should initialize WHEELS_WITH_SYMBOL category with empty boards', () => {
      const category = markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL];
      expect(category.boards).toEqual([]);
    });

    it('should initialize WHEELS_WITH_SYMBOL category with default multipliers', () => {
      const category = markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL];
      expect(category.multipliers).toEqual([PowerspinConstants.DEFAULT_MULTIPLIERS]);
    });

    it('should initialize WHEELS_WITH_NUMBER category with correct type', () => {
      const category = markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER];
      expect(category.type).toBe(PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER);
    });

    it('should initialize WHEELS_WITH_NUMBER category with empty boards', () => {
      const category = markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER];
      expect(category.boards).toEqual([]);
    });

    it('should initialize WHEELS_WITH_NUMBER category with default multipliers', () => {
      const category = markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER];
      expect(category.multipliers).toEqual([PowerspinConstants.DEFAULT_MULTIPLIERS]);
    });

    it('should initialize all three categories', () => {
      expect(Object.keys(markets.categories)).toHaveLength(3);
    });
  });

  describe('getNumberOnWheelBoard', () => {
    it('should return the first board of NUMBER_ON_WHEEL category', () => {
      const board = markets.getNumberOnWheelBoard();
      expect(board).toBeDefined();
      expect(board).toBe(markets.categories[PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0]);
    });
  });

  describe('getWheelsWithSymbolBoards', () => {
    it('should return empty array by default', () => {
      expect(markets.getWheelsWithSymbolBoards()).toEqual([]);
    });

    it('should return boards from WHEELS_WITH_SYMBOL category', () => {
      const mockBoard = { isEmpty: vi.fn(() => false) };
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards = [mockBoard];
      expect(markets.getWheelsWithSymbolBoards()).toEqual([mockBoard]);
    });
  });

  describe('getWheelsWithNumberBoards', () => {
    it('should return empty array by default', () => {
      expect(markets.getWheelsWithNumberBoards()).toEqual([]);
    });

    it('should return boards from WHEELS_WITH_NUMBER category', () => {
      const mockBoard = { isEmpty: vi.fn(() => false) };
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards = [mockBoard];
      expect(markets.getWheelsWithNumberBoards()).toEqual([mockBoard]);
    });
  });

  describe('getAllBoards', () => {
    it('should return only NUMBER_ON_WHEEL board when others are empty', () => {
      const allBoards = markets.getAllBoards();
      expect(allBoards).toHaveLength(1);
    });

    it('should include NUMBER_ON_WHEEL board first', () => {
      const numberOnWheelBoard = markets.getNumberOnWheelBoard();
      const allBoards = markets.getAllBoards();
      expect(allBoards[0]).toBe(numberOnWheelBoard);
    });

    it('should return all boards from all categories', () => {
      const symbolBoard = { isEmpty: vi.fn(() => false) };
      const numberBoard = { isEmpty: vi.fn(() => false) };
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards = [symbolBoard];
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards = [numberBoard];

      expect(markets.getAllBoards()).toHaveLength(3);
    });

    it('should include all symbol and number boards', () => {
      const symbolBoard1 = { isEmpty: vi.fn(() => false) };
      const symbolBoard2 = { isEmpty: vi.fn(() => false) };
      const numberBoard1 = { isEmpty: vi.fn(() => false) };
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards = [symbolBoard1, symbolBoard2];
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards = [numberBoard1];

      const allBoards = markets.getAllBoards();
      expect(allBoards).toContain(symbolBoard1);
      expect(allBoards).toContain(symbolBoard2);
      expect(allBoards).toContain(numberBoard1);
    });
  });

  describe('isEmpty', () => {
    it('should return true when NUMBER_ON_WHEEL board is empty and no other boards exist', () => {
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0].isEmpty.mockReturnValue(true);
      expect(markets.isEmpty()).toBe(true);
    });

    it('should return false when NUMBER_ON_WHEEL board is not empty', () => {
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0].isEmpty.mockReturnValue(false);
      expect(markets.isEmpty()).toBe(false);
    });

    it('should return false when WHEELS_WITH_SYMBOL has any boards', () => {
      // Implementation checks boards.length !== 0, not board.isEmpty()
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards = [{ isEmpty: vi.fn() }];
      expect(markets.isEmpty()).toBe(false);
    });

    it('should return false when WHEELS_WITH_NUMBER has any boards', () => {
      // Implementation checks boards.length !== 0, not board.isEmpty()
      markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards = [{ isEmpty: vi.fn() }];
      expect(markets.isEmpty()).toBe(false);
    });

    it('should return true when NUMBER_ON_WHEEL board is empty and multi-board categories have no boards', () => {
      // NUMBER_ON_WHEEL mock already returns isEmpty() = true by default
      // WHEELS_WITH_SYMBOL and WHEELS_WITH_NUMBER start with empty boards arrays
      expect(markets.isEmpty()).toBe(true);
    });
  });

  describe('reset', () => {
    it('should call betslipUtils.resetMarketCategory for each category', () => {
      markets.reset();
      expect(betslipUtils.resetMarketCategory).toHaveBeenCalledTimes(3);
    });

    it('should call resetMarketCategory with NUMBER_ON_WHEEL category', () => {
      const numberOnWheelCategory = markets.categories[PowerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL];
      markets.reset();
      expect(betslipUtils.resetMarketCategory).toHaveBeenCalledWith(numberOnWheelCategory);
    });

    it('should call resetMarketCategory with WHEELS_WITH_SYMBOL category', () => {
      const symbolCategory = markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL];
      markets.reset();
      expect(betslipUtils.resetMarketCategory).toHaveBeenCalledWith(symbolCategory);
    });

    it('should call resetMarketCategory with WHEELS_WITH_NUMBER category', () => {
      const numberCategory = markets.categories[PowerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER];
      markets.reset();
      expect(betslipUtils.resetMarketCategory).toHaveBeenCalledWith(numberCategory);
    });
  });
});
