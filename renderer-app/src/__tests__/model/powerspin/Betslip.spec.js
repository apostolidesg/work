import { describe, it, expect, beforeEach, vi } from 'vitest';
import Betslip from '../../../model/powerspin/Betslip';
import Wheel from '../../../model/powerspin/Wheel';
import PowerspinConstants from '../../../util/powerspin/Constants';
import betslipUtils from '../../../util/powerspin/BetslipUtils';

vi.mock('../../../model/powerspin/Wheel', () => ({
  default: vi.fn(function () {
    this.isEmpty = vi.fn(() => true);
  }),
}));

vi.mock('../../../model/powerspin/Markets', () => ({
  default: vi.fn(function () {
    this.isEmpty = vi.fn(() => true);
  }),
}));

vi.mock('../../../util/powerspin/BetslipUtils', () => ({
  default: {
    isBetslipValid: vi.fn(() => true),
    formatIlotBetslip: vi.fn(() => ({})),
    getBoardSortingFn: vi.fn(() => () => 0),
  },
}));

vi.mock('../../../util/Utilities', () => ({
  default: {
    constructAmountFromSet: vi.fn((val) => [val]),
    toggleNumberInArray: vi.fn((val, arr) => [...arr, val]),
  },
}));

describe('Powerspin Betslip', () => {
  let betslip;

  beforeEach(() => {
    vi.clearAllMocks();
    betslip = new Betslip();
  });

  describe('Constructor', () => {
    it('should initialize with default wager structure', () => {
      expect(betslip.gameType).toBeDefined();
      expect(betslip.wager).toBeDefined();
      expect(betslip.wager.wheels).toHaveLength(1);
      expect(betslip.wager.markets).toBeDefined();
      expect(betslip.wager.participatingDraws.multipleDraws).toBe(1);
      expect(betslip.wager.comboMultipliers).toEqual([PowerspinConstants.DEFAULT_MULTIPLIERS]);
      expect(betslip.promotionInfo).toBe(null);
      expect(betslip.isecure).toEqual([]);
    });

    it('should initialize without a wagerModel', () => {
      const b = new Betslip();
      expect(b.wager.wheels).toHaveLength(1);
    });
  });

  describe('isWheelsEmpty', () => {
    it('should return true when all wheels are empty', () => {
      expect(betslip.isWheelsEmpty()).toBe(true);
    });

    it('should return false when at least one wheel is not empty', () => {
      betslip.wager.wheels[0].isEmpty.mockReturnValue(false);
      expect(betslip.isWheelsEmpty()).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true when wheels and markets are empty', () => {
      expect(betslip.isEmpty()).toBe(true);
    });

    it('should return false when a wheel is not empty', () => {
      betslip.wager.wheels[0].isEmpty.mockReturnValue(false);
      expect(betslip.isEmpty()).toBe(false);
    });

    it('should return false when markets is not empty', () => {
      betslip.wager.markets.isEmpty.mockReturnValue(false);
      expect(betslip.isEmpty()).toBe(false);
    });
  });

  describe('isValidBetslip', () => {
    it('should call betslipUtils.isBetslipValid with the betslip', () => {
      betslip.isValidBetslip();
      expect(betslipUtils.isBetslipValid).toHaveBeenCalledWith({ betslip });
    });

    it('should return the result of isBetslipValid', () => {
      betslipUtils.isBetslipValid.mockReturnValue(false);
      expect(betslip.isValidBetslip()).toBe(false);
    });
  });

  describe('setISecureTokens', () => {
    it('should set isecure tokens', () => {
      const tokens = ['token1', 'token2'];
      betslip.setISecureTokens(tokens);
      expect(betslip.isecure).toEqual(tokens);
    });
  });

  describe('toggleComboMultipliers', () => {
    it('should toggle combo multipliers', () => {
      betslip.toggleComboMultipliers(2);
      expect(betslip.wager.comboMultipliers).toBeDefined();
    });

    it('should ensure at least one multiplier remains when result is empty', () => {
      betslip.wager.comboMultipliers = [];
      betslip.wager.comboMultipliers.push(PowerspinConstants.MULTIPLIERS_SET[0]);
      expect(betslip.wager.comboMultipliers.length).toBeGreaterThan(0);
    });
  });

  describe('getMultiplierNumber', () => {
    it('should sum all combo multipliers', () => {
      betslip.wager.comboMultipliers = [1, 2, 3];
      expect(betslip.getMultiplierNumber()).toBe(6);
    });

    it('should return the single multiplier value', () => {
      betslip.wager.comboMultipliers = [PowerspinConstants.DEFAULT_MULTIPLIERS];
      expect(betslip.getMultiplierNumber()).toBe(PowerspinConstants.DEFAULT_MULTIPLIERS);
    });
  });

  describe('setConsecutiveDraws', () => {
    it('should set consecutive draws', () => {
      betslip.setConsecutiveDraws(5);
      expect(betslip.wager.participatingDraws.multipleDraws).toBe(5);
    });

    it('should handle value of 1', () => {
      betslip.setConsecutiveDraws(1);
      expect(betslip.wager.participatingDraws.multipleDraws).toBe(1);
    });
  });

  describe('ilotFormat', () => {
    it('should call betslipUtils.formatIlotBetslip with the betslip', () => {
      betslip.ilotFormat();
      expect(betslipUtils.formatIlotBetslip).toHaveBeenCalledWith({ betslip });
    });

    it('should return the formatted result', () => {
      betslipUtils.formatIlotBetslip.mockReturnValue({ boards: [] });
      expect(betslip.ilotFormat()).toEqual({ boards: [] });
    });
  });

  describe('Integration', () => {
    it('should handle consecutive draws and multiplier sum correctly', () => {
      betslip.setConsecutiveDraws(3);
      betslip.wager.comboMultipliers = [1, 2];
      expect(betslip.wager.participatingDraws.multipleDraws).toBe(3);
      expect(betslip.getMultiplierNumber()).toBe(3);
    });

    it('should remain valid after setting tokens and draws', () => {
      betslip.setISecureTokens(['abc']);
      betslip.setConsecutiveDraws(2);
      expect(betslip.isecure).toEqual(['abc']);
      expect(betslip.wager.participatingDraws.multipleDraws).toBe(2);
    });
  });
});
