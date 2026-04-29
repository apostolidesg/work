import { describe, it, expect, beforeEach, vi } from 'vitest';
import Betslip from '../../../model/kino/Betslip';
import Board from '../../../model/kino/Board';
import OddEven from '../../../model/kino/Oddeven';
import Columns from '../../../model/kino/Columns';

vi.mock('../../../util/betslipUtils', () => ({
  default: {
    getBetTypeFromKinoBoard: (board) => {
      const kinoBonus = board.kinoBonusActive;
      const kinoClose2Win = board.kinoClose2WinActive;

      if (kinoBonus && kinoClose2Win) {
        return 25;
      }
      if (kinoBonus) {
        return 2;
      }
      if (kinoClose2Win) {
        return 24;
      }
      return 1;
    },
  },
}));

vi.mock('../../../util/handler/kino/ErrorHandlerService', () => ({
  default: {
    validateBetslip: (betslip) => {
      const hasFilledBoard = betslip.bet_areas.some(
        (area) => area.filled && area.pickedNumbers.length >= area.gameType && area.gameType > 0
      );
      return hasFilledBoard ? [] : ['Invalid betslip'];
    },
  },
}));

describe('Kino Betslip', () => {
  let betslip;

  beforeEach(() => {
    betslip = new Betslip();
  });

  describe('Constructor', () => {
    it('should initialize with default values', () => {
      expect(betslip.bet_areas).toHaveLength(1);
      expect(betslip.bet_areas[0]).toBeInstanceOf(Board);
      expect(betslip.consecutiveDraws).toBe(1);
      expect(betslip.oddEvenGame).toBeInstanceOf(OddEven);
      expect(betslip.columnsGame).toBeInstanceOf(Columns);
      expect(betslip.iSecureTokens).toEqual([]);
      expect(betslip.value).toBe(0);
    });

    it('should initialize with wager model', () => {
      const wagerModel = {
        boards: [
          {
            betType: 1,
            multipliers: 2,
            panels: [
              {
                selection: [1, 2, 3, 4, 5],
              },
            ],
          },
        ],
        participatingDraws: {
          multipleDraws: 3,
        },
      };

      const betslipWithModel = new Betslip(wagerModel);
      expect(betslipWithModel.bet_areas).toHaveLength(1);
      expect(betslipWithModel.bet_areas[0].pickedNumbers).toEqual([1, 2, 3, 4, 5]);
      expect(betslipWithModel.consecutiveDraws).toBe(3);
    });

    it('should handle wager model with odd/even game', () => {
      const wagerModel = {
        boards: [
          {
            betType: 3,
            multipliers: 1,
            panels: [{ selection: [] }],
          },
        ],
      };

      const betslipWithOddEven = new Betslip(wagerModel);
      expect(betslipWithOddEven.oddEvenGame.oddEven).toBe('odd');
    });

    it('should handle wager model with columns game', () => {
      const wagerModel = {
        boards: [
          {
            betType: 6,
            multipliers: 2,
            panels: [
              {
                selection: [1, 2, 3],
              },
            ],
          },
        ],
      };

      const betslipWithColumns = new Betslip(wagerModel);
      expect(betslipWithColumns.columnsGame.columns).toEqual([1, 2, 3]);
    });
  });

  describe('addNewBet', () => {
    it('should add a new bet area', () => {
      betslip.addNewBet();
      expect(betslip.bet_areas).toHaveLength(2);
      expect(betslip.bet_areas[1]).toBeInstanceOf(Board);
    });

    it('should not add more than 6 bet areas', () => {
      for (let i = 0; i < 10; i++) {
        betslip.addNewBet();
      }
      expect(betslip.bet_areas).toHaveLength(6);
    });
  });

  describe('removeBet', () => {
    beforeEach(() => {
      betslip.addNewBet();
      betslip.addNewBet();
    });

    it('should remove a bet area by index', () => {
      betslip.removeBet(1);
      expect(betslip.bet_areas).toHaveLength(2);
    });

    it('should reset the last bet area instead of removing it', () => {
      betslip.removeBet(0);
      betslip.removeBet(0);
      expect(betslip.bet_areas).toHaveLength(1);
      expect(betslip.bet_areas[0].pickedNumbers).toEqual([]);
    });
  });

  describe('setConsecutiveDraws', () => {
    it('should set consecutive draws', () => {
      betslip.setConsecutiveDraws(5);
      expect(betslip.consecutiveDraws).toBe(5);
    });

    it('should recalculate value when setting consecutive draws', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2, 3, 4, 5];
      betslip.bet_areas[0].gameType = 5;
      betslip.bet_areas[0].filled = true;
      betslip.bet_areas[0].multiplier = 1;
      betslip.bet_areas[0].refreshValue();

      const singleDrawValue = betslip.calculateValue();
      betslip.setConsecutiveDraws(3);

      expect(betslip.value).toBe(singleDrawValue * 3);
    });
  });

  describe('calculateValue', () => {
    it('should calculate total value correctly with one board', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;
      betslip.bet_areas[0].multiplier = 1;
      betslip.bet_areas[0].refreshValue();

      expect(betslip.calculateValue()).toBe(0.5);
    });

    it('should calculate value with multiple boards', () => {
      betslip.addNewBet();

      betslip.bet_areas[0].pickedNumbers = [1, 2];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;
      betslip.bet_areas[0].multiplier = 1;
      betslip.bet_areas[0].refreshValue();

      betslip.bet_areas[1].pickedNumbers = [1, 2, 3];
      betslip.bet_areas[1].gameType = 3;
      betslip.bet_areas[1].filled = true;
      betslip.bet_areas[1].multiplier = 1;
      betslip.bet_areas[1].refreshValue();

      expect(betslip.calculateValue()).toBe(1.0);
    });

    it('should include consecutive draws in calculation', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;
      betslip.bet_areas[0].multiplier = 1;
      betslip.bet_areas[0].refreshValue();

      betslip.consecutiveDraws = 4;
      expect(betslip.calculateValue()).toBe(2.0);
    });

    it('should include odd/even game value', () => {
      betslip.oddEvenGame.oddEven = 'odd';
      betslip.oddEvenGame.oddEvenAmount = [1];
      betslip.oddEvenGame.calculateValue();

      expect(betslip.calculateValue()).toBe(1.0);
    });

    it('should include columns game value', () => {
      betslip.columnsGame.columns = [1, 2];
      betslip.columnsGame.columnsAmount = [1];
      betslip.columnsGame.calculateValue();

      expect(betslip.calculateValue()).toBe(2.0);
    });

    it('should calculate total with all components', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;
      betslip.bet_areas[0].multiplier = 1;
      betslip.bet_areas[0].refreshValue();

      betslip.oddEvenGame.oddEven = 'odd';
      betslip.oddEvenGame.oddEvenAmount = [1];
      betslip.oddEvenGame.calculateValue();

      betslip.columnsGame.columns = [1];
      betslip.columnsGame.columnsAmount = [1];
      betslip.columnsGame.calculateValue();

      betslip.consecutiveDraws = 2;

      expect(betslip.calculateValue()).toBe(5.0);
    });
  });

  describe('refreshValue', () => {
    it('should refresh the betslip value', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;
      betslip.bet_areas[0].multiplier = 1;
      betslip.bet_areas[0].refreshValue();

      const calculatedValue = betslip.calculateValue();
      betslip.refreshValue();

      expect(betslip.value).toBe(calculatedValue);
    });
  });

  describe('clearBetslipArea', () => {
    it('should clear a specific bet area', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2, 3];
      betslip.bet_areas[0].filled = true;
      betslip.bet_areas[0].gameType = 3;

      betslip.clearBetslipArea(1);

      expect(betslip.bet_areas[0].pickedNumbers).toEqual([]);
      expect(betslip.bet_areas[0].filled).toBe(false);
      expect(betslip.bet_areas[0].gameType).toBe(0);
    });
  });

  describe('clearBetslip', () => {
    it('should reset entire betslip to initial state', () => {
      betslip.addNewBet();
      betslip.bet_areas[0].pickedNumbers = [1, 2, 3];
      betslip.bet_areas[0].filled = true;
      betslip.consecutiveDraws = 5;
      betslip.oddEvenGame.oddEven = 'odd';
      betslip.columnsGame.columns = [1, 2];

      betslip.clearBetslip();

      expect(betslip.bet_areas).toHaveLength(6);
      expect(betslip.bet_areas[0].pickedNumbers).toEqual([]);
      expect(betslip.consecutiveDraws).toBe(1);
      expect(betslip.oddEvenGame.oddEven).toBe('');
      expect(betslip.columnsGame.columns).toEqual([]);
    });
  });

  describe('isValidBetslip', () => {
    it('should return true for a valid betslip', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;

      expect(betslip.isValidBetslip()).toBe(true);
    });

    it('should return false for an invalid betslip', () => {
      betslip.bet_areas[0].pickedNumbers = [1];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;

      expect(betslip.isValidBetslip()).toBe(false);
    });

    it('should validate external betslip when passed as argument', () => {
      const otherBetslip = new Betslip();
      otherBetslip.bet_areas[0].pickedNumbers = [1, 2, 3];
      otherBetslip.bet_areas[0].gameType = 3;
      otherBetslip.bet_areas[0].filled = true;

      expect(betslip.isValidBetslip(otherBetslip)).toBe(true);
    });
  });

  describe('ilotFormat', () => {
    it('should format betslip for ILOT API', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2, 3];
      betslip.bet_areas[0].gameType = 3;
      betslip.bet_areas[0].filled = true;
      betslip.bet_areas[0].multiplier = 1;

      const formatted = JSON.parse(betslip.ilotFormat());

      expect(formatted.gameType).toBe('KINO');
      expect(formatted.wager.boards).toHaveLength(1);
      expect(formatted.wager.boards[0].panels[0].selection).toEqual([1, 2, 3]);
      expect(formatted.wager.participatingDraws.multipleDraws).toBe(1);
    });

    it('should include odd/even in ILOT format', () => {
      betslip.oddEvenGame.oddEven = 'even';
      betslip.oddEvenGame.oddEvenAmount = [2];
      betslip.oddEvenGame.calculateValue();

      const formatted = JSON.parse(betslip.ilotFormat());
      const oddEvenBoard = formatted.wager.boards.find((b) => b.betType === 4);

      expect(oddEvenBoard).toBeDefined();
      expect(oddEvenBoard.multipliers).toBe(4);
    });

    it('should include columns in ILOT format', () => {
      betslip.columnsGame.columns = [1, 2, 3];
      betslip.columnsGame.columnsAmount = [1, 2];
      betslip.columnsGame.calculateValue();

      const formatted = JSON.parse(betslip.ilotFormat());
      const columnsBoard = formatted.wager.boards.find((b) => b.betType === 6);

      expect(columnsBoard).toBeDefined();
      expect(columnsBoard.panels[0].selection).toEqual([1, 2, 3]);
    });

    it('should include quickPick flag', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2, 3, 4, 5];
      betslip.bet_areas[0].gameType = 5;
      betslip.bet_areas[0].filled = true;
      betslip.bet_areas[0].quickPick = true;

      const formatted = JSON.parse(betslip.ilotFormat());

      expect(formatted.wager.boards[0].quickPick).toBe(true);
    });

    it('should include consecutive draws', () => {
      betslip.bet_areas[0].pickedNumbers = [1, 2];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;
      betslip.consecutiveDraws = 10;

      const formatted = JSON.parse(betslip.ilotFormat());

      expect(formatted.wager.participatingDraws.multipleDraws).toBe(10);
    });

    it('should include iSecure tokens', () => {
      betslip.iSecureTokens = ['token1', 'token2'];
      betslip.bet_areas[0].pickedNumbers = [1, 2];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;

      const formatted = JSON.parse(betslip.ilotFormat());

      expect(formatted.isecure).toEqual(['token1', 'token2']);
    });

    it('should only include filled bet areas', () => {
      betslip.addNewBet();
      betslip.addNewBet();

      betslip.bet_areas[0].pickedNumbers = [1, 2];
      betslip.bet_areas[0].gameType = 2;
      betslip.bet_areas[0].filled = true;

      const formatted = JSON.parse(betslip.ilotFormat());

      expect(formatted.wager.boards).toHaveLength(1);
    });
  });

  describe('isFilled', () => {
    it('should return false for empty betslip', () => {
      expect(betslip.isFilled()).toBe(false);
    });

    it('should return true when bet area is filled', () => {
      betslip.bet_areas[0].filled = true;
      expect(betslip.isFilled()).toBe(true);
    });

    it('should return true when odd/even is filled', () => {
      betslip.oddEvenGame.oddEven = 'odd';
      expect(betslip.isFilled()).toBe(true);
    });

    it('should return true when columns is filled', () => {
      betslip.columnsGame.columns = [1];
      betslip.columnsGame.columnsAmount = [1];
      expect(betslip.isFilled()).toBe(true);
    });

    it('should return true when consecutive draws is not 1', () => {
      betslip.consecutiveDraws = 2;
      expect(betslip.isFilled()).toBe(true);
    });
  });

  describe('betAreasFilled', () => {
    it('should return false when no bet areas are filled', () => {
      expect(betslip.betAreasFilled()).toBe(false);
    });

    it('should return true when at least one bet area is filled', () => {
      betslip.addNewBet();
      betslip.bet_areas[1].filled = true;
      expect(betslip.betAreasFilled()).toBe(true);
    });
  });

  describe('setISecureTokens', () => {
    it('should set iSecure tokens', () => {
      const tokens = ['token1', 'token2', 'token3'];
      betslip.setISecureTokens(tokens);
      expect(betslip.iSecureTokens).toEqual(tokens);
    });
  });
});
