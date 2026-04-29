import powerspinConstants from '../../../../../src/util/powerspinConstants';
import Markets from '../../../../../src/model/powerspin/Markets';
import sinon from 'sinon';
import Board from '../../../../../src/model/powerspin/Board';
import Utilities from '../../../../../src/util/Utilities';
import betslipUtils from '../../../../../src/util/betslipUtils';

describe('Markets model', () => {
  describe('when created', () => {
    it('should initialize the NUMBER_ON_WHEEL category with the correct board', () => {
      const markets = new Markets();
      const { type, boards } = markets.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL];

      expect(type).to.eq(powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL);
      expect(boards.length).to.eq(1);
      expect(boards[0].betType).to.eq(powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL);
    });

    it('should initialize the WHEELS_WITH_SYMBOL category with an empty boards array and default multipliers', () => {
      const market = new Markets();
      const { type, boards, multipliers } = market.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL];

      expect(type).to.eq(powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL);
      expect(boards.length).to.eq(0);
      expect(multipliers).to.eql([powerspinConstants.DEFAULT_MULTIPLIERS]);
    });

    it('should initialize the WHEELS_WITH_NUMBER category with an empty boards array and default multipliers', () => {
      const market = new Markets();
      const { type, boards, multipliers } = market.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER];

      expect(type).to.eq(powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER);
      expect(boards.length).to.eq(0);
      expect(multipliers).to.eql([powerspinConstants.DEFAULT_MULTIPLIERS]);
    });
  });

  describe('getNumberOnWheelBoard()', () => {
    it('should return the first board from the NUMBER_ON_WHEEL category', () => {
      const markets = new Markets();
      const boardStub = sinon.createStubInstance(Board);
      markets.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards = [boardStub];

      expect(markets.getNumberOnWheelBoard()).to.eq(boardStub);
    });
  });

  describe('getWheelsWithSymbolBoards()', () => {
    it('should return the boards array from the WHEELS_WITH_SYMBOL category', () => {
      const markets = new Markets();
      const boardStub1 = sinon.createStubInstance(Board);
      const boardStub2 = sinon.createStubInstance(Board);
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards = [boardStub1, boardStub2];

      expect(markets.getWheelsWithSymbolBoards()[0]).to.eq(boardStub1);
      expect(markets.getWheelsWithSymbolBoards()[1]).to.eq(boardStub2);
    });
  });

  describe('getWheelsWithNumberBoards()', () => {
    it('should return the boards array from the WHEELS_WITH_NUMBER category', () => {
      const markets = new Markets();
      const boardStub1 = sinon.createStubInstance(Board);
      const boardStub2 = sinon.createStubInstance(Board);
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards = [boardStub1, boardStub2];

      expect(markets.getWheelsWithNumberBoards()[0]).to.eq(boardStub1);
      expect(markets.getWheelsWithNumberBoards()[1]).to.eq(boardStub2);
    });
  });

  describe('getAllBoards()', () => {
    it('should return an array containing all category boards', () => {
      const markets = new Markets();
      const boardStub1 = sinon.createStubInstance(Board);
      const boardStub2 = sinon.createStubInstance(Board);
      const boardStub3 = sinon.createStubInstance(Board);
      markets.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards = [boardStub1];
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards = [boardStub2];
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards = [boardStub3];

      expect(markets.getAllBoards()[0]).to.eq(boardStub1);
      expect(markets.getAllBoards()[1]).to.eq(boardStub2);
      expect(markets.getAllBoards()[2]).to.eq(boardStub3);
    });
  });

  describe('isEmpty()', () => {
    let markets;
    let sandbox;
    let numberBoardIsEmptyStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      markets = new Markets();
      numberBoardIsEmptyStub = sandbox.stub(
        markets.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0],
        'isEmpty'
      );
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return false if the board of the NUMBER_ON_WHEEL is not empty', () => {
      numberBoardIsEmptyStub.returns(false);
      expect(markets.isEmpty()).to.be.false;
    });

    it('should return false if the WHEELS_WITH_SYMBOL category contains boards', () => {
      numberBoardIsEmptyStub.returns(true);
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards = [
        sandbox.createStubInstance(Board),
      ];
      expect(markets.isEmpty()).to.be.false;
    });

    it('should return false if the WHEELS_WITH_NUMBER category contains boards', () => {
      numberBoardIsEmptyStub.returns(true);
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].boards = [
        sandbox.createStubInstance(Board),
      ];
      expect(markets.isEmpty()).to.be.false;
    });

    it('should return true if the singe board categories boards are empty and the multi have empty arrays', () => {
      numberBoardIsEmptyStub.returns(true);
      expect(markets.isEmpty()).to.be.true;
    });
  });

  describe('setNumberOnWheel()', () => {
    let markets;
    let sandbox;
    let toggleNumbersArrayStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      markets = new Markets();
      toggleNumbersArrayStub = sandbox.stub(Utilities, 'toggleNumberInArray');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should not proceed if the column number is more than the MAX_RANGE', () => {
      markets.setNumberOnWheel(powerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE + 1);
      expect(toggleNumbersArrayStub.notCalled).to.be.true;
    });

    it('should not proceed if the column number is less than the MIN_RANGE', () => {
      markets.setNumberOnWheel(powerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE - 1);
      expect(toggleNumbersArrayStub.notCalled).to.be.true;
    });

    it('should call the toggleNumberInArray() passing the new column and the prev selected', () => {
      toggleNumbersArrayStub.returns([13]);
      markets.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0].panels[0].selection = [12, 13];
      markets.setNumberOnWheel(12);

      expect(toggleNumbersArrayStub.withArgs(12, [12, 13]).calledOnce).to.be.true;
      expect(
        markets.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0].panels[0].selection
      ).to.eql([13]);
    });
  });

  describe('toggleMarketGameType()', () => {
    it('should add the selected bet to the category boards if not exits', () => {
      const markets = new Markets();

      markets.toggleMarketGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL);

      expect(
        markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards.find(
          b =>
            b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL &&
            b.multipliers.includes(powerspinConstants.DEFAULT_MULTIPLIERS)
        )
      ).not.to.be.undefined;
    });

    it('should copy the category multipliers', () => {
      const markets = new Markets();
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].multipliers = 3;

      markets.toggleMarketGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL);

      expect(
        markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards.find(
          b => b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL
        ).multipliers
      ).to.eql([2, 1]);
    });

    it('should remove the selected betType if exists', () => {
      const markets = new Markets();
      markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards = [
        { betType: powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL },
      ];

      markets.toggleMarketGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL);

      expect(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].boards.length).to.eq(0);
    });
  });

  describe('toggleMultipliers()', () => {
    describe('when category is NUMBER_ON_WHEEL', () => {
      let markets;
      let toggleMultipliersStub;
      let sandbox;

      beforeEach(() => {
        sandbox = sinon.createSandbox();
        markets = new Markets();
        toggleMultipliersStub = sandbox.stub(
          markets.categories[powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL].boards[0],
          'toggleMultipliers'
        );
      });

      afterEach(() => {
        toggleMultipliersStub.reset();
        sandbox.restore();
      });

      it('should toggle the multipliers of the category first board passing the provided value', () => {
        markets.toggleMultipliers(powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL, [1, 2, 4]);

        expect(toggleMultipliersStub.withArgs([1, 2, 4]).calledOnce).to.be.true;
      });

      it('should toggle the multipliers of the category first board passing the default value if not provided', () => {
        markets.toggleMultipliers(powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL);

        expect(toggleMultipliersStub.withArgs(powerspinConstants.DEFAULT_MULTIPLIERS).calledOnce).to.be.true;
      });
    });

    describe('when the category is WHEELS_WITH_SYMBOL', () => {
      let markets;
      let sandbox;
      let toggleNumbersArrayStub;

      beforeEach(() => {
        markets = new Markets();
        sandbox = sinon.createSandbox();
        toggleNumbersArrayStub = sandbox.stub(Utilities, 'toggleNumberInArray');
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should set the new multipliers using the Utils toggleNumberInArray()', () => {
        toggleNumbersArrayStub.returns([4]);
        const prevMultipliers = markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].multipliers;
        markets.toggleMultipliers(powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL, 2);

        expect(toggleNumbersArrayStub.withArgs(2, prevMultipliers, powerspinConstants.MULTIPLIERS_SET).calledOnce).to.be
          .true;

        expect(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].multipliers).to.eql([4]);
      });

      it('should the multilpiers back to the default if the toggle results to empty array', () => {
        toggleNumbersArrayStub.returns([]);
        markets.toggleMultipliers(powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL, 2);

        expect(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL].multipliers).to.eql([
          powerspinConstants.DEFAULT_MULTIPLIERS,
        ]);
      });
    });

    describe('when the category is WHEELS_WITH_NUMBER', () => {
      let markets;
      let sandbox;
      let toggleNumbersArrayStub;

      beforeEach(() => {
        markets = new Markets();
        sandbox = sinon.createSandbox();
        toggleNumbersArrayStub = sandbox.stub(Utilities, 'toggleNumberInArray');
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should set the new multipliers using the Utils toggleNumberInArray()', () => {
        toggleNumbersArrayStub.returns([4]);
        const prevMultipliers = markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].multipliers;
        markets.toggleMultipliers(powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER, 2);

        expect(toggleNumbersArrayStub.withArgs(2, prevMultipliers, powerspinConstants.MULTIPLIERS_SET).calledOnce).to.be
          .true;

        expect(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].multipliers).to.eql([4]);
      });

      it('should the multilpiers back to the default if the toggle results to empty array', () => {
        toggleNumbersArrayStub.returns([]);
        markets.toggleMultipliers(powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER, 2);

        expect(markets.categories[powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER].multipliers).to.eql([
          powerspinConstants.DEFAULT_MULTIPLIERS,
        ]);
      });
    });

    describe('reset()', () => {
      let sandbox;
      let resetCategoryStub;

      beforeEach(() => {
        sandbox = sinon.createSandbox();
        resetCategoryStub = sandbox.stub(betslipUtils, 'resetMarketCategory');
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should reset each category using the resetMarketCategory util function', () => {
        const markets = new Markets();
        markets.reset();

        Object.values(powerspinConstants.MARKETS_CATEGORY).forEach((value, index) => {
          expect(resetCategoryStub.getCall(index).args[0]).to.eql(markets.categories[value]);
        });
      });
    });
  });
});
