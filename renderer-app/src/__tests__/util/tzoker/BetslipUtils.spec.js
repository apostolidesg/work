import { describe, it, expect } from 'vitest';
import TzokerBetslipUtils from '@/util/tzoker/BetslipUtils';

describe('TzokerBetslipUtils', () => {
  describe('combinations()', () => {
    it('should return 1 when player picks exactly the required 5 numbers', () => {
      expect(TzokerBetslipUtils.combinations(5, 5)).toBe(1);
    });

    it('should return 6 possible combinations when player picks 6 numbers instead of 5', () => {
      expect(TzokerBetslipUtils.combinations(6, 5)).toBe(6);
    });

    it('should return 21 possible combinations when player picks 7 numbers instead of 5', () => {
      expect(TzokerBetslipUtils.combinations(7, 5)).toBe(21);
    });
  });

  describe('isBoardValid()', () => {
    it('should be valid when player selects minimum required: 5 main numbers and 1 tzoker', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.isBoardValid(board)).toBe(true);
    });

    it('should be invalid when player selects only 4 main numbers', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4] }, { selection: [1] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.isBoardValid(board)).toBe(false);
    });

    it('should be invalid when player forgets to select a tzoker number', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.isBoardValid(board)).toBe(false);
    });

    it('should be valid when player uses system 45 with exactly 7 main numbers as required', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5, 6, 7] }, { selection: [1] }],
        systemId: 45,
      };
      expect(TzokerBetslipUtils.isBoardValid(board)).toBe(true);
    });

    it('should be invalid when player uses system 45 but does not select the required 7 numbers', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1] }],
        systemId: 45,
      };
      expect(TzokerBetslipUtils.isBoardValid(board)).toBe(false);
    });
  });

  describe('isBoardEmpty()', () => {
    it('should be empty when player has not made any selections', () => {
      const board = {
        panels: [{ selection: [] }, { selection: [] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.isBoardEmpty(board)).toBe(true);
    });

    it('should not be empty when player has started selecting numbers', () => {
      const board = {
        panels: [{ selection: [1] }, { selection: [] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.isBoardEmpty(board)).toBe(false);
    });
  });

  describe('calculateBoardCost()', () => {
    it('should cost 1 euro for a simple bet with 5 main numbers and 1 tzoker', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.calculateBoardCost(board)).toBe(1);
    });

    it('should cost 3 euros when player adds 2 extra tzoker numbers', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2, 3] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.calculateBoardCost(board)).toBe(3);
    });

    it('should cost 6 euros when player picks 6 main numbers creating 6 combinations', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5, 6] }, { selection: [1] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.calculateBoardCost(board)).toBe(6);
    });

    it('should cost 42 euros when player picks 7 main and 2 tzoker numbers', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5, 6, 7] }, { selection: [1, 2] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.calculateBoardCost(board)).toBe(42);
    });

    it('should cost 5 euros when using system 45 which guarantees 5 winning columns', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5, 6, 7] }, { selection: [1] }],
        systemId: 45,
      };
      expect(TzokerBetslipUtils.calculateBoardCost(board)).toBe(5);
    });

    it('should cost 15 euros when using system 45 with 3 tzoker numbers', () => {
      const board = {
        panels: [{ selection: [1, 2, 3, 4, 5, 6, 7] }, { selection: [1, 2, 3] }],
        systemId: 45,
      };
      expect(TzokerBetslipUtils.calculateBoardCost(board)).toBe(15);
    });

    it('should cost 0 euros when board is incomplete and cannot be played', () => {
      const board = {
        panels: [{ selection: [1, 2, 3] }, { selection: [] }],
        systemId: null,
      };
      expect(TzokerBetslipUtils.calculateBoardCost(board)).toBe(0);
    });
  });

  describe('calculateBetslipCost()', () => {
    it('should calculate cost for a single board played for one draw', () => {
      const boards = [{ panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1] }], systemId: null }];
      expect(TzokerBetslipUtils.calculateBetslipCost(boards, 1)).toBe(1);
    });

    it('should multiply cost by 3 when player wants to participate in 3 consecutive draws', () => {
      const boards = [{ panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1] }], systemId: null }];
      expect(TzokerBetslipUtils.calculateBetslipCost(boards, 3)).toBe(3);
    });

    it('should sum costs of multiple boards and multiply by number of draws', () => {
      const boards = [
        { panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1] }], systemId: null },
        { panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }], systemId: null },
      ];
      expect(TzokerBetslipUtils.calculateBetslipCost(boards, 2)).toBe(6);
    });

    it('should ignore incomplete boards when calculating total cost', () => {
      const boards = [
        { panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1] }], systemId: null },
        { panels: [{ selection: [1, 2] }, { selection: [] }], systemId: null },
      ];
      expect(TzokerBetslipUtils.calculateBetslipCost(boards, 1)).toBe(1);
    });
  });

  describe('quickPick generators', () => {
    it('should generate 5 unique random main numbers between 1 and 45', () => {
      const result = TzokerBetslipUtils.generateMainQuickPick();
      expect(result).toHaveLength(5);
      expect(new Set(result).size).toBe(5);
      result.forEach((n) => {
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(45);
      });
    });

    it('should generate 1 random tzoker number between 1 and 20', () => {
      const result = TzokerBetslipUtils.generateTzokerQuickPick();
      expect(result).toHaveLength(1);
      expect(result[0]).toBeGreaterThanOrEqual(1);
      expect(result[0]).toBeLessThanOrEqual(20);
    });

    it('should generate a complete valid quick pick with both main and tzoker numbers', () => {
      const result = TzokerBetslipUtils.generateFullQuickPick();
      expect(result.mainNumbers).toHaveLength(5);
      expect(result.tzokerNumbers).toHaveLength(1);
    });
  });

  describe('validation helpers', () => {
    it('should allow participating in 1 to 12 consecutive draws', () => {
      expect(TzokerBetslipUtils.isConsecutiveDrawsValid(1)).toBe(true);
      expect(TzokerBetslipUtils.isConsecutiveDrawsValid(12)).toBe(true);
      expect(TzokerBetslipUtils.isConsecutiveDrawsValid(0)).toBe(false);
      expect(TzokerBetslipUtils.isConsecutiveDrawsValid(13)).toBe(false);
    });

    it('should only accept system IDs that exist in the game configuration', () => {
      expect(TzokerBetslipUtils.isSystemValid(45)).toBe(true);
      expect(TzokerBetslipUtils.isSystemValid(12)).toBe(true);
      expect(TzokerBetslipUtils.isSystemValid(99)).toBe(false);
    });
  });
});
