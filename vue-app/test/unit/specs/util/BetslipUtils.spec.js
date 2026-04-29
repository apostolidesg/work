import Wheel from '../../../../src/model/powerspin/Wheel';
import Markets from '../../../../src/model/powerspin/Markets';
import sinon from 'sinon';
import powerspinConstants from '../../../../src/util/powerspinConstants';
import betslipUtils from '../../../../src/util/betslipUtils';
import Betslip from '../../../../src/model/powerspin/Betslip';
import Constants from '../../../../src/util/Constants';

describe('BetslipUtils module', () => {
  describe('resetWheelCategory()', () => {
    let wheel;
    let numberBoardResetStub;
    let symbolBoardResetStub;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      wheel = new Wheel();
      numberBoardResetStub = sandbox.stub(wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0], 'reset');
      symbolBoardResetStub = sandbox.stub(wheel.categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards[0], 'reset');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the board reset if the category is NUMBER', () => {
      betslipUtils.resetWheelCategory(wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER]);
      expect(numberBoardResetStub.calledOnce).to.be.true;
    });

    it('should call the board reset if the category is SYMBOL', () => {
      betslipUtils.resetWheelCategory(wheel.categories[powerspinConstants.GAME_CATEGORY.SYMBOL]);
      expect(symbolBoardResetStub.calledOnce).to.be.true;
    });

    it('should empty the boards array if the category is COLOR', () => {
      wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards = [
        { betType: powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED },
      ];
      wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].multipliers = [1, 3];
      betslipUtils.resetWheelCategory(wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR]);

      expect(wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards.length).to.eq(0);
      expect(wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].multipliers).to.eql([
        powerspinConstants.DEFAULT_MULTIPLIERS,
      ]);
    });

    it('should empty the boards array if the category is UNDER/OVER', () => {
      wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards = [
        { betType: powerspinConstants.ILOT_GAMETYPES.PLAY_OVER },
      ];
      wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].multipliers = [1, 3];
      betslipUtils.resetWheelCategory(wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER]);

      expect(wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards.length).to.eq(0);
      expect(wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].multipliers).to.eql([
        powerspinConstants.DEFAULT_MULTIPLIERS,
      ]);
    });
  });

  describe('resetMarketCategory()', () => {
    let markets;
    let numberBoardResetStub;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      markets = new Markets();
      numberBoardResetStub = sandbox.stub(
        markets.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0],
        'reset'
      );
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the board reset if the category is NUMBER', () => {
      betslipUtils.resetMarketCategory(markets.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL]);
      expect(numberBoardResetStub.calledOnce).to.be.true;
    });

    it('should empty the boards array if the category is WHEELS_WITH_SYMBOL', () => {
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards = [
        { betType: powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL },
      ];
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].multipliers = [1, 3];
      betslipUtils.resetMarketCategory(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL]);

      expect(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards.length).to.eq(0);
      expect(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].multipliers).to.eql([
        powerspinConstants.DEFAULT_MULTIPLIERS,
      ]);
    });

    it('should empty the boards array if the category is WHEELS_WITH_NUMBER', () => {
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards = [
        { betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS },
      ];
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].multipliers = [1, 3];
      betslipUtils.resetMarketCategory(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER]);

      expect(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards.length).to.eq(0);
      expect(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].multipliers).to.eql([
        powerspinConstants.DEFAULT_MULTIPLIERS,
      ]);
    });
  });

  describe('isBetslipValid()', () => {
    let sandbox;
    let betslip;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      betslip = sandbox.createStubInstance(Betslip);
      betslip.gameType = Constants.GENERAL_GAME_TYPES.POWERSPIN;
      betslip.isEmpty.returns(false);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return false if the betslip has invalid gameType', () => {
      betslip.gameType = 100;

      expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
    });

    it('should return false if the betslip is empty', () => {
      betslip.isEmpty.returns(true);

      expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
    });

    describe('when testing a betslip that contains wheels', () => {
      it('should return false if a wheel contains only empty boards', () => {
        betslip.wager = { wheels: [{ isEmpty: () => false, getAllBoards: () => [{ isEmpty: () => true }] }] };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
      });

      it('should return false if contains a wheel with a board having empty betType', () => {
        betslip.wager = { wheels: [{ isEmpty: () => false, getAllBoards: () => [{ isEmpty: () => false }] }] };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
      });

      it('should return false if contains a wheel with a board with number betType with no selections', () => {
        betslip.wager = {
          wheels: [
            {
              isEmpty: () => false,
              getAllBoards: () => [
                {
                  isEmpty: () => false,
                  betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER,
                  panels: [{ selection: [] }],
                },
              ],
            },
          ],
        };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
      });

      it('should return false if contains a wheel with a board with number betType with no requested', () => {
        betslip.wager = {
          wheels: [
            {
              isEmpty: () => false,
              getAllBoards: () => [
                {
                  isEmpty: () => false,
                  betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER,
                  panels: [{ selection: [1], requested: [] }],
                },
              ],
            },
          ],
        };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
      });

      it('should return false if contains a wheel with a board with number betType with no selection less than requested', () => {
        betslip.wager = {
          wheels: [
            {
              isEmpty: () => false,
              getAllBoards: () => [
                {
                  isEmpty: () => false,
                  betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER,
                  panels: [{ selection: [1], requested: [3] }],
                },
              ],
            },
          ],
        };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
      });

      it('should return true if contains a wheel with a board with number betType with valid selections', () => {
        betslip.wager = {
          wheels: [
            {
              isEmpty: () => false,
              getAllBoards: () => [
                {
                  isEmpty: () => false,
                  betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER,
                  panels: [{ selection: [1, 2, 3, 4], requested: [3] }],
                },
              ],
            },
          ],
          markets: { getAllBoards: () => [] },
          participatingDraws: { multipleDraws: 1 },
        };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.true;
      });
    });

    describe('when testing a betslip that contains markets', () => {
      it('should return false if exits a board having empty betType', () => {
        betslip.wager = { wheels: [], markets: { getAllBoards: () => [{ isEmpty: () => false }] } };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
      });

      it('should return false if contains a board with number betType with no selections', () => {
        betslip.wager = {
          wheels: [],
          markets: {
            getAllBoards: () => [
              {
                isEmpty: () => false,
                betType: powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL,
                panels: [{ selection: [] }],
              },
            ],
          },
        };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
      });

      it('should return false if contains a board with number betType with no requested', () => {
        betslip.wager = {
          wheels: [],
          markets: {
            getAllBoards: () => [
              {
                isEmpty: () => false,
                betType: powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL,
                panels: [{ selection: [1], requested: [] }],
              },
            ],
          },
        };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
      });

      it('should return false if contains a board with number betType with no selection less than requested', () => {
        betslip.wager = {
          wheels: [],
          markets: {
            getAllBoards: () => [
              {
                isEmpty: () => false,
                betType: powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL,
                panels: [{ selection: [1], requested: [3] }],
              },
            ],
          },
        };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
      });

      it('should return true if contains a wheel with a board with number betType with valid selections', () => {
        betslip.wager = {
          wheels: [],
          markets: {
            getAllBoards: () => [
              {
                isEmpty: () => false,
                betType: powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL,
                panels: [{ selection: [1, 2, 3, 4], requested: [3] }],
              },
            ],
          },

          participatingDraws: { multipleDraws: 1 },
        };

        expect(betslipUtils.isBetslipValid({ betslip })).to.be.true;
      });
    });

    it('should return false if the betslip does not contain multipleDraws', () => {
      betslip.wager = {
        wheels: [
          {
            isEmpty: () => false,
            getAllBoards: () => [
              {
                isEmpty: () => false,
                betType: powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
              },
            ],
          },
        ],
        markets: {
          getAllBoards: () => [
            {
              isEmpty: () => false,
              betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS,
            },
          ],
        },

        participatingDraws: { multipleDraws: 0 },
      };

      expect(betslipUtils.isBetslipValid({ betslip })).to.be.false;
    });

    it('should return true if the betslip has valid wheels and markets and has multipleDraws', () => {
      betslip.wager = {
        wheels: [
          {
            isEmpty: () => false,
            getAllBoards: () => [
              {
                isEmpty: () => false,
                betType: powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
              },
            ],
          },
        ],
        markets: {
          getAllBoards: () => [
            {
              isEmpty: () => false,
              betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS,
            },
          ],
        },

        participatingDraws: { multipleDraws: 1 },
      };

      expect(betslipUtils.isBetslipValid({ betslip })).to.be.true;
    });
  });

  describe('combinations()', () => {
    it('should return 1 if n and r are equal', () => {
      expect(betslipUtils.combinations(5, 5)).to.eq(1);
    });

    it('should return 6 if n is 6 and r is 5', () => {
      expect(betslipUtils.combinations(6, 5)).to.eq(6);
    });

    it('should return 2 if n is 3 and r is 2', () => {
      expect(betslipUtils.combinations(3, 2)).to.eq(3);
    });
  });

  describe('getBetTypeFromKinoBoard()', () => {
    it('should return 1 if both bonus and close to win is false', () => {
      const board = {
        kinoBonusActive: false,
        kinoClose2WinActive: false,
      };

      expect(betslipUtils.getBetTypeFromKinoBoard(board)).to.eq(1);
    });

    it('should return 2 if bonus is true and close to win is false', () => {
      const board = {
        kinoBonusActive: true,
        kinoClose2WinActive: false,
      };

      expect(betslipUtils.getBetTypeFromKinoBoard(board)).to.eq(2);
    });

    it('should return 25 if bonus and close to win is true', () => {
      const board = {
        kinoBonusActive: true,
        kinoClose2WinActive: true,
      };

      expect(betslipUtils.getBetTypeFromKinoBoard(board)).to.eq(25);
    });

    it('should return 24 if bonus is false and close to win is true', () => {
      const board = {
        kinoBonusActive: false,
        kinoClose2WinActive: true,
      };

      expect(betslipUtils.getBetTypeFromKinoBoard(board)).to.eq(24);
    });
  });
});
