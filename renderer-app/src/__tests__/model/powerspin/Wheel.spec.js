import { describe, it, expect, beforeEach, vi } from 'vitest';
import Wheel from '../../../model/powerspin/Wheel';
import Board from '../../../model/powerspin/Board';
import PowerspinConstants from '../../../util/powerspin/Constants';
import betslipUtils from '../../../util/powerspin/BetslipUtils';

vi.mock('../../../model/powerspin/Board', () => ({
  default: vi.fn(function (config = {}) {
    this.betType = config?.betType;
    this.isEmpty = vi.fn(() => true);
  }),
}));

vi.mock('../../../util/powerspin/BetslipUtils', () => ({
  default: {
    resetWheelCategory: vi.fn(),
    toggleGameTypeOnMultiBoardCategory: vi.fn(),
    toggleMultipliersOnMultiBoardCategory: vi.fn(),
  },
}));

describe('Powerspin Wheel', () => {
  let wheel;

  beforeEach(() => {
    vi.clearAllMocks();
    wheel = new Wheel();
  });

  describe('Constructor', () => {
    it('should initialize all four categories', () => {
      expect(Object.keys(wheel.categories)).toHaveLength(4);
    });

    it('should initialize NUMBER category with correct type and one board', () => {
      const category = wheel.categories[PowerspinConstants.GAME_CATEGORY.NUMBER];
      expect(category.type).toBe(PowerspinConstants.GAME_CATEGORY.NUMBER);
      expect(category.boards).toHaveLength(1);
    });

    it('should initialize NUMBER board with PLAY_NUMBER betType', () => {
      expect(Board).toHaveBeenCalledWith({ betType: PowerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER });
    });

    it('should initialize SYMBOL category with correct type and one board', () => {
      const category = wheel.categories[PowerspinConstants.GAME_CATEGORY.SYMBOL];
      expect(category.type).toBe(PowerspinConstants.GAME_CATEGORY.SYMBOL);
      expect(category.boards).toHaveLength(1);
    });

    it('should initialize SYMBOL board without betType', () => {
      expect(Board).toHaveBeenCalledWith();
    });

    it('should initialize COLOR category with empty boards and default multipliers', () => {
      const category = wheel.categories[PowerspinConstants.GAME_CATEGORY.COLOR];
      expect(category.type).toBe(PowerspinConstants.GAME_CATEGORY.COLOR);
      expect(category.boards).toEqual([]);
      expect(category.multipliers).toEqual([PowerspinConstants.DEFAULT_MULTIPLIERS]);
    });

    it('should initialize OVER_UNDER category with empty boards and default multipliers', () => {
      const category = wheel.categories[PowerspinConstants.GAME_CATEGORY.OVER_UNDER];
      expect(category.type).toBe(PowerspinConstants.GAME_CATEGORY.OVER_UNDER);
      expect(category.boards).toEqual([]);
      expect(category.multipliers).toEqual([PowerspinConstants.DEFAULT_MULTIPLIERS]);
    });
  });

  describe('getNumberBoard', () => {
    it('should return first board of NUMBER category', () => {
      const board = wheel.getNumberBoard();
      expect(board).toBeDefined();
      expect(board).toBe(wheel.categories[PowerspinConstants.GAME_CATEGORY.NUMBER].boards[0]);
    });
  });

  describe('getSymbolBoard', () => {
    it('should return first board of SYMBOL category', () => {
      const board = wheel.getSymbolBoard();
      expect(board).toBeDefined();
      expect(board).toBe(wheel.categories[PowerspinConstants.GAME_CATEGORY.SYMBOL].boards[0]);
    });
  });

  describe('getColorBoards', () => {
    it('should return empty array by default', () => {
      expect(wheel.getColorBoards()).toEqual([]);
    });

    it('should return boards from COLOR category', () => {
      const mockBoard = { isEmpty: vi.fn(() => false) };
      wheel.categories[PowerspinConstants.GAME_CATEGORY.COLOR].boards = [mockBoard];
      expect(wheel.getColorBoards()).toEqual([mockBoard]);
    });
  });

  describe('getOverUnderBoards', () => {
    it('should return empty array by default', () => {
      expect(wheel.getOverUnderBoards()).toEqual([]);
    });

    it('should return boards from OVER_UNDER category', () => {
      const mockBoard = { isEmpty: vi.fn(() => false) };
      wheel.categories[PowerspinConstants.GAME_CATEGORY.OVER_UNDER].boards = [mockBoard];
      expect(wheel.getOverUnderBoards()).toEqual([mockBoard]);
    });
  });

  describe('getAllBoards', () => {
    it('should return NUMBER and SYMBOL boards by default', () => {
      expect(wheel.getAllBoards()).toHaveLength(2);
    });

    it('should include NUMBER board first', () => {
      expect(wheel.getAllBoards()[0]).toBe(wheel.getNumberBoard());
    });

    it('should include SYMBOL board second', () => {
      expect(wheel.getAllBoards()[1]).toBe(wheel.getSymbolBoard());
    });

    it('should include COLOR boards when present', () => {
      const colorBoard = { isEmpty: vi.fn(() => false) };
      wheel.categories[PowerspinConstants.GAME_CATEGORY.COLOR].boards = [colorBoard];
      expect(wheel.getAllBoards()).toContain(colorBoard);
    });

    it('should include OVER_UNDER boards when present', () => {
      const overUnderBoard = { isEmpty: vi.fn(() => false) };
      wheel.categories[PowerspinConstants.GAME_CATEGORY.OVER_UNDER].boards = [overUnderBoard];
      expect(wheel.getAllBoards()).toContain(overUnderBoard);
    });

    it('should return all boards from all categories', () => {
      const colorBoard = { isEmpty: vi.fn(() => false) };
      const overUnderBoard = { isEmpty: vi.fn(() => false) };
      wheel.categories[PowerspinConstants.GAME_CATEGORY.COLOR].boards = [colorBoard];
      wheel.categories[PowerspinConstants.GAME_CATEGORY.OVER_UNDER].boards = [overUnderBoard];
      expect(wheel.getAllBoards()).toHaveLength(4);
    });
  });

  describe('isEmpty', () => {
    // isEmpty() uses getAllBoards().some(board => !board.isEmpty())
    // Board mock defaults isEmpty() to true (empty), so wheel starts as empty by default

    it('should return true when all boards are empty', () => {
      // NUMBER and SYMBOL boards already mock isEmpty() => true by default
      expect(wheel.isEmpty()).toBe(true);
    });

    it('should return false when NUMBER board is not empty', () => {
      wheel.getNumberBoard().isEmpty.mockReturnValue(false);
      expect(wheel.isEmpty()).toBe(false);
    });

    it('should return false when SYMBOL board is not empty', () => {
      wheel.getSymbolBoard().isEmpty.mockReturnValue(false);
      expect(wheel.isEmpty()).toBe(false);
    });

    it('should return false when COLOR has any boards', () => {
      // isEmpty() checks boards.length !== 0 for MULTIPLE_BOARD_GAME_CATEGORIES
      wheel.categories[PowerspinConstants.GAME_CATEGORY.COLOR].boards = [{ isEmpty: vi.fn() }];
      expect(wheel.isEmpty()).toBe(false);
    });

    it('should return false when OVER_UNDER has any boards', () => {
      // isEmpty() checks boards.length !== 0 for MULTIPLE_BOARD_GAME_CATEGORIES
      wheel.categories[PowerspinConstants.GAME_CATEGORY.OVER_UNDER].boards = [{ isEmpty: vi.fn() }];
      expect(wheel.isEmpty()).toBe(false);
    });

    it('should return true when NUMBER and SYMBOL are empty and multi-board categories have no boards', () => {
      // NUMBER and SYMBOL mock isEmpty() => true by default; COLOR and OVER_UNDER start with no boards
      expect(wheel.isEmpty()).toBe(true);
    });
  });

  describe('reset', () => {
    // reset() delegates to betslipUtils.resetWheelCategory for each category

    it('should call betslipUtils.resetWheelCategory for each category', () => {
      wheel.reset();
      expect(betslipUtils.resetWheelCategory).toHaveBeenCalledTimes(4);
    });

    it('should call resetWheelCategory with NUMBER category', () => {
      const numberCategory = wheel.categories[PowerspinConstants.GAME_CATEGORY.NUMBER];
      wheel.reset();
      expect(betslipUtils.resetWheelCategory).toHaveBeenCalledWith(numberCategory);
    });

    it('should call resetWheelCategory with SYMBOL category', () => {
      const symbolCategory = wheel.categories[PowerspinConstants.GAME_CATEGORY.SYMBOL];
      wheel.reset();
      expect(betslipUtils.resetWheelCategory).toHaveBeenCalledWith(symbolCategory);
    });

    it('should call resetWheelCategory with COLOR category', () => {
      const colorCategory = wheel.categories[PowerspinConstants.GAME_CATEGORY.COLOR];
      wheel.reset();
      expect(betslipUtils.resetWheelCategory).toHaveBeenCalledWith(colorCategory);
    });

    it('should call resetWheelCategory with OVER_UNDER category', () => {
      const overUnderCategory = wheel.categories[PowerspinConstants.GAME_CATEGORY.OVER_UNDER];
      wheel.reset();
      expect(betslipUtils.resetWheelCategory).toHaveBeenCalledWith(overUnderCategory);
    });
  });
});
