import Wheel from '../../../../../src/model/powerspin/Wheel';
import { expect } from 'chai';
import sinon from 'sinon';
import powerspinConstants from '../../../../../src/util/powerspinConstants';
import betslipUtils from '../../../../../src/util/betslipUtils';
import Utilities from '../../../../../src/util/Utilities';
import Board from '../../../../../src/model/powerspin/Board';

describe('Wheel model', () => {
  describe('when created', () => {
    it('should initialize the NUMBER category with the correct board', () => {
      const wheel = new Wheel();
      const { type, boards } = wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER];

      expect(type).to.eq(powerspinConstants.GAME_CATEGORY.NUMBER);
      expect(boards.length).to.eq(1);
      expect(boards[0].betType).to.eq(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
      expect(boards[0].betType).to.eq(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
    });

    it('should initialize the SYMBOL category with an empty board', () => {
      const wheel = new Wheel();
      const { type, boards } = wheel.categories[powerspinConstants.GAME_CATEGORY.SYMBOL];

      expect(type).to.eq(powerspinConstants.GAME_CATEGORY.SYMBOL);
      expect(boards.length).to.eq(1);
      expect(boards[0].betType).to.be.undefined;
    });

    it('should initialize the COLOR category with an empty boards array and default multipliers', () => {
      const wheel = new Wheel();
      const { type, boards, multipliers } = wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR];

      expect(type).to.eq(powerspinConstants.GAME_CATEGORY.COLOR);
      expect(boards.length).to.eq(0);
      expect(multipliers).to.eql([powerspinConstants.DEFAULT_MULTIPLIERS]);
    });

    it('should initialize the OVER_UNDER category with an empty boards array and default multipliers', () => {
      const wheel = new Wheel();
      const { type, boards, multipliers } = wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER];

      expect(type).to.eq(powerspinConstants.GAME_CATEGORY.OVER_UNDER);
      expect(boards.length).to.eq(0);
      expect(multipliers).to.eql([powerspinConstants.DEFAULT_MULTIPLIERS]);
    });
  });

  describe('getNumberBoard()', () => {
    it('should return the first board from the NUMBER category', () => {
      const wheel = new Wheel();
      const boardStub = sinon.createStubInstance(Board);
      wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards = [boardStub];

      expect(wheel.getNumberBoard()).to.eq(boardStub);
    });
  });

  describe('getSymbolBoard()', () => {
    it('should return the first board from the SYMBOL category', () => {
      const wheel = new Wheel();
      const boardStub = sinon.createStubInstance(Board);
      wheel.categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards = [boardStub];

      expect(wheel.getSymbolBoard()).to.eq(boardStub);
    });
  });

  describe('getColorBoards()', () => {
    it('should return the boards array from the COLOR category', () => {
      const wheel = new Wheel();
      const boardStub1 = sinon.createStubInstance(Board);
      const boardStub2 = sinon.createStubInstance(Board);
      wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards = [boardStub1, boardStub2];

      expect(wheel.getColorBoards()[0]).to.eq(boardStub1);
      expect(wheel.getColorBoards()[1]).to.eq(boardStub2);
    });
  });

  describe('getOverUnderBoards()', () => {
    it('should return the boards array from the OVER_UNDER category', () => {
      const wheel = new Wheel();
      const boardStub1 = sinon.createStubInstance(Board);
      const boardStub2 = sinon.createStubInstance(Board);
      wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards = [boardStub1, boardStub2];

      expect(wheel.getOverUnderBoards()[0]).to.eq(boardStub1);
      expect(wheel.getOverUnderBoards()[1]).to.eq(boardStub2);
    });
  });

  describe('getAllBoards()', () => {
    it('should return an array containing all category boards', () => {
      const wheel = new Wheel();
      const numberBoardStub = sinon.createStubInstance(Board);
      const symbolBoardStub = sinon.createStubInstance(Board);
      const colorBoardStub = sinon.createStubInstance(Board);
      const underOverBoardStub = sinon.createStubInstance(Board);
      wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards = [numberBoardStub];
      wheel.categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards = [symbolBoardStub];
      wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards = [colorBoardStub];
      wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards = [underOverBoardStub];

      expect(wheel.getAllBoards()[0]).to.eq(numberBoardStub);
      expect(wheel.getAllBoards()[1]).to.eq(symbolBoardStub);
      expect(wheel.getAllBoards()[2]).to.eq(colorBoardStub);
      expect(wheel.getAllBoards()[3]).to.eq(underOverBoardStub);
    });
  });

  describe('isEmpty()', () => {
    let wheel;
    let numberIsEmptyStub;
    let symbolIsEmptyStub;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      wheel = new Wheel();
      numberIsEmptyStub = sandbox.stub(wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0], 'isEmpty');
      symbolIsEmptyStub = sandbox.stub(wheel.categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards[0], 'isEmpty');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return false if the NUMBER board is not empty', () => {
      numberIsEmptyStub.returns(false);
      symbolIsEmptyStub.returns(true);

      expect(wheel.isEmpty()).to.be.false;
    });

    it('should return false if the SYMBOL board is not empty', () => {
      numberIsEmptyStub.returns(true);
      symbolIsEmptyStub.returns(false);

      expect(wheel.isEmpty()).to.be.false;
    });

    it('should return false if the COLOR category contains boards', () => {
      numberIsEmptyStub.returns(true);
      symbolIsEmptyStub.returns(true);
      wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards = [sandbox.createStubInstance(Board)];

      expect(wheel.isEmpty()).to.be.false;
    });

    it('should return false if the UNDER_OVER category contains boards', () => {
      numberIsEmptyStub.returns(true);
      symbolIsEmptyStub.returns(true);
      wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards = [sandbox.createStubInstance(Board)];

      expect(wheel.isEmpty()).to.be.false;
    });

    it('should return true if the singe board categories boards are empty and the multi have empty arrays', () => {
      numberIsEmptyStub.returns(true);
      symbolIsEmptyStub.returns(true);

      expect(wheel.isEmpty()).to.be.true;
    });
  });

  describe('setRequestedNumber()', () => {
    let toggleNumbersArrayStub;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      toggleNumbersArrayStub = sandbox.stub(Utilities, 'toggleNumberInArray');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the toggleNumberInArray utils fn with 0 as default requested', () => {
      toggleNumbersArrayStub.onCall(0).returns([]);
      const wheel = new Wheel();
      const { requested } = wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].panels[0];
      wheel.setRequestedNumber();

      expect(toggleNumbersArrayStub.calledOnce).to.be.true;
      expect(toggleNumbersArrayStub.withArgs(0, requested).calledOnce).to.be.true;
    });

    it('should call the toggleNumberInArray utils fn passing the requested number as param', () => {
      toggleNumbersArrayStub.onCall(0).returns([]);
      const wheel = new Wheel();
      const { requested } = wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].panels[0];
      wheel.setRequestedNumber(4);

      expect(toggleNumbersArrayStub.calledOnce).to.be.true;
      expect(toggleNumbersArrayStub.withArgs(4, requested).calledOnce).to.be.true;
    });

    it('should update the requested numbers', () => {
      const wheel = new Wheel();
      toggleNumbersArrayStub.onCall(0).returns([1, 2]);
      wheel.setRequestedNumber(2);

      expect(wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].panels[0].requested).to.eql([1, 2]);
    });
  });

  describe('setColumnNumber()', () => {
    let wheel;
    let toggleNumbersArrayStub;
    let disableQuickPickStub;
    let sandbox;

    beforeEach(() => {
      wheel = new Wheel();
      sandbox = sinon.createSandbox();
      disableQuickPickStub = sinon.stub(
        wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0],
        'disableQuickPick'
      );
      toggleNumbersArrayStub = sandbox.stub(Utilities, 'toggleNumberInArray');
    });

    afterEach(() => {
      disableQuickPickStub.reset();
      sandbox.restore();
    });

    it('should not proceed if the column number is more than the MAX_RANGE', () => {
      wheel.setColumnNumber(powerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE + 1);

      expect(toggleNumbersArrayStub.notCalled).to.be.true;
    });

    it('should not proceed if the column number is less than the MIN_RANGE', () => {
      wheel.setColumnNumber(powerspinConstants.BETSLIP_NUMBERS.MIN_NUMBER_RANGE - 1);

      expect(toggleNumbersArrayStub.notCalled).to.be.true;
    });

    it('should disable the quick pick if is already selected', () => {
      wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].quickPick = true;
      wheel.setColumnNumber(12);

      expect(disableQuickPickStub.called).to.be.true;
    });

    it('should not change the quick pick if not selected', () => {
      wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].quickPick = false;
      wheel.setColumnNumber(12);

      expect(disableQuickPickStub.called).to.be.false;
    });

    it('should call the toggleNumberInArray() passing the new column and the prev selected', () => {
      toggleNumbersArrayStub.returns([13]);
      wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].panels[0].selection = [12, 13];
      wheel.setColumnNumber(12);

      expect(toggleNumbersArrayStub.withArgs(12, [12, 13]).calledOnce).to.be.true;
      expect(wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].panels[0].selection).to.eql([13]);
    });
  });

  describe('toggleGameType()', () => {
    describe('when the game type is number', () => {
      let wheel;
      let setBetTypeStub;

      beforeEach(() => {
        wheel = new Wheel();
        setBetTypeStub = sinon.stub(wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0], 'setBetType');
      });

      afterEach(() => {
        setBetTypeStub.reset();
      });

      // TODO ask paul if we want set the number category to null
      it('should set it to null if already selected', () => {
        wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].betType =
          powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER;

        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);

        expect(setBetTypeStub.withArgs(null).calledOnce).to.be.true;
      });

      it('should set the betType if not already selected', () => {
        wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].betType = null;

        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);

        expect(setBetTypeStub.withArgs(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER).calledOnce).to.be.true;
      });
    });

    describe('when the game type is symbol', () => {
      let wheel;
      let setBetTypeStub;

      beforeEach(() => {
        wheel = new Wheel();
        setBetTypeStub = sinon.stub(wheel.categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards[0], 'setBetType');
      });

      afterEach(() => {
        setBetTypeStub.reset();
      });

      it('should set it to null if already selected', () => {
        wheel.categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards[0].betType =
          powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL;

        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL);

        expect(setBetTypeStub.withArgs(null).calledOnce).to.be.true;
      });

      it('should set the betType if not already selected', () => {
        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL);

        expect(setBetTypeStub.withArgs(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL).calledOnce).to.be.true;
      });
    });

    describe('when the game type is COLOR', () => {
      it('should add the selected bet to the category boards if not exits', () => {
        const wheel = new Wheel();

        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED);

        expect(
          wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards.find(
            b =>
              b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED &&
              b.multipliers.includes(powerspinConstants.DEFAULT_MULTIPLIERS)
          )
        ).not.to.be.undefined;
      });

      it('should copy the category multipliers', () => {
        const wheel = new Wheel();
        wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].multipliers = 7;

        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED);

        expect(
          wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards.find(
            b => b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED
          ).multipliers
        ).to.eql([6, 1]);
      });

      it('should remove the selected betType if exists', () => {
        const wheel = new Wheel();
        wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards = [
          { betType: powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED },
        ];

        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED);

        expect(wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].boards.length).to.eq(0);
      });
    });

    describe('when the game type is UNDER?OVER', () => {
      it('should add the selected bet to the category boards if not exits', () => {
        const wheel = new Wheel();

        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);

        expect(
          wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards.find(
            b =>
              b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER &&
              b.multipliers.includes(powerspinConstants.DEFAULT_MULTIPLIERS)
          )
        ).not.to.be.undefined;
      });

      it('should copy the category multipliers', () => {
        const wheel = new Wheel();
        wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].multipliers = 3;

        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);

        expect(
          wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards.find(
            b => b.betType === powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER
          ).multipliers
        ).to.eql([2, 1]);
      });

      it('should remove the selected betType if exists', () => {
        const wheel = new Wheel();
        wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards = [
          { betType: powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER },
        ];

        wheel.toggleGameType(powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);

        expect(wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards.length).to.eq(0);
      });
    });
  });

  describe('toggleMultipliers()', () => {
    describe('when the betType is NUMBER', () => {
      let wheel;
      let toggleMultipliersStub;

      beforeEach(() => {
        wheel = new Wheel();
        toggleMultipliersStub = sinon.stub(
          wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0],
          'toggleMultipliers'
        );
      });

      afterEach(() => {
        toggleMultipliersStub.reset();
      });

      it('should toggle the multipliers of the category first board passing the provided value', () => {
        wheel.toggleMultipliers(powerspinConstants.GAME_CATEGORY.NUMBER, [1, 2, 4]);

        expect(toggleMultipliersStub.withArgs([1, 2, 4]).calledOnce).to.be.true;
      });

      it('should toggle the multipliers of the category first board passing the default value if not provided', () => {
        wheel.toggleMultipliers(powerspinConstants.GAME_CATEGORY.NUMBER);

        expect(toggleMultipliersStub.withArgs(powerspinConstants.DEFAULT_MULTIPLIERS).calledOnce).to.be.true;
      });
    });

    describe('when the betType is SYMBOL', () => {
      let wheel;
      let toggleMultipliersStub;

      beforeEach(() => {
        wheel = new Wheel();
        toggleMultipliersStub = sinon.stub(
          wheel.categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards[0],
          'toggleMultipliers'
        );
      });

      afterEach(() => {
        toggleMultipliersStub.reset();
      });

      it('should toggle the multipliers of the category first board passing the provided value', () => {
        wheel.toggleMultipliers(powerspinConstants.GAME_CATEGORY.SYMBOL, [1, 2, 4]);

        expect(toggleMultipliersStub.withArgs([1, 2, 4]).calledOnce).to.be.true;
      });

      it('should toggle the multipliers of the category first board passing the default value if not provided', () => {
        wheel.toggleMultipliers(powerspinConstants.GAME_CATEGORY.SYMBOL);

        expect(toggleMultipliersStub.withArgs(powerspinConstants.DEFAULT_MULTIPLIERS).calledOnce).to.be.true;
      });
    });

    describe('when the betType is COLOR', () => {
      let wheel;
      let sandbox;
      let toggleNumbersArrayStub;

      beforeEach(() => {
        wheel = new Wheel();
        sandbox = sinon.createSandbox();
        toggleNumbersArrayStub = sandbox.stub(Utilities, 'toggleNumberInArray');
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should set the new multipliers using the Utils toggleNumberInArray()', () => {
        toggleNumbersArrayStub.returns([4]);
        const prevMultipliers = wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].multipliers;
        wheel.toggleMultipliers(powerspinConstants.GAME_CATEGORY.COLOR, 2);

        expect(toggleNumbersArrayStub.withArgs(2, prevMultipliers, powerspinConstants.MULTIPLIERS_SET).calledOnce).to.be
          .true;

        expect(wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].multipliers).to.eql([4]);
      });

      it('should the multilpiers back to the default if the toggle results to empty array', () => {
        toggleNumbersArrayStub.returns([]);
        wheel.toggleMultipliers(powerspinConstants.GAME_CATEGORY.COLOR, 2);

        expect(wheel.categories[powerspinConstants.GAME_CATEGORY.COLOR].multipliers).to.eql([
          powerspinConstants.DEFAULT_MULTIPLIERS,
        ]);
      });
    });

    describe('when the betType is UNDER/OVER', () => {
      let wheel;
      let sandbox;
      let toggleNumbersArrayStub;

      beforeEach(() => {
        wheel = new Wheel();
        sandbox = sinon.createSandbox();
        toggleNumbersArrayStub = sandbox.stub(Utilities, 'toggleNumberInArray');
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('should set the new multipliers using the Utils toggleNumberInArray()', () => {
        toggleNumbersArrayStub.returns([4]);
        const prevMultipliers = wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].multipliers;
        wheel.toggleMultipliers(powerspinConstants.GAME_CATEGORY.OVER_UNDER, 2);

        expect(toggleNumbersArrayStub.withArgs(2, prevMultipliers, powerspinConstants.MULTIPLIERS_SET).calledOnce).to.be
          .true;

        expect(wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].multipliers).to.eql([4]);
      });

      it('should the multilpiers back to the default if the toggle results to empty array', () => {
        toggleNumbersArrayStub.returns([]);
        wheel.toggleMultipliers(powerspinConstants.GAME_CATEGORY.OVER_UNDER, 2);

        expect(wheel.categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].multipliers).to.eql([
          powerspinConstants.DEFAULT_MULTIPLIERS,
        ]);
      });
    });
  });

  describe('addQuickPick()', () => {
    let wheel;
    let sandbox;
    let getUniqueRandomArrayStub;
    let enableQuickPickStub;

    beforeEach(() => {
      wheel = new Wheel();
      sandbox = sinon.createSandbox();
      getUniqueRandomArrayStub = sandbox.stub(Utilities, 'getUniqueRandomArray');
      enableQuickPickStub = sandbox.stub();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should set random selections equal with the number of selections if they are more than the requested', () => {
      getUniqueRandomArrayStub.returns([3, 2, 1]);
      wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards = [
        { panels: [{ requested: [1], selection: [1, 2, 3] }], enableQuickPick: enableQuickPickStub },
      ];
      wheel.addQuickPick();

      expect(getUniqueRandomArrayStub.withArgs(1, powerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE, 3).calledOnce).to
        .be.true;
    });

    it('should set random selections equal with the number of requested if they are more than the selected', () => {
      getUniqueRandomArrayStub.returns([3, 2, 1]);
      wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards = [
        { panels: [{ requested: [1, 10], selection: [1, 2, 3] }], enableQuickPick: enableQuickPickStub },
      ];
      wheel.addQuickPick();

      expect(getUniqueRandomArrayStub.withArgs(1, powerspinConstants.BETSLIP_NUMBERS.MAX_NUMBER_RANGE, 10).calledOnce)
        .to.be.true;
    });

    it('should set the random number in ascending order', () => {
      getUniqueRandomArrayStub.returns([3, 2, 1]);
      wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards = [
        { panels: [{ requested: [1], selection: [1, 2, 3] }], enableQuickPick: enableQuickPickStub },
      ];
      wheel.addQuickPick();

      expect(wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards[0].panels[0].selection).to.eql([1, 2, 3]);
    });

    it('should enable the quick pick flag on the relevant panel', () => {
      getUniqueRandomArrayStub.returns([3, 2, 1]);
      wheel.categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards = [
        { panels: [{ requested: [1], selection: [1, 2, 3] }], enableQuickPick: enableQuickPickStub },
      ];
      wheel.addQuickPick();

      expect(enableQuickPickStub.calledOnce).to.be.true;
    });
  });

  describe('reset()', () => {
    let sandbox;
    let resetCategoryStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      resetCategoryStub = sandbox.stub(betslipUtils, 'resetWheelCategory');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should reset each category using the resetWheelCategory util function', () => {
      const wheel = new Wheel();
      wheel.reset();

      Object.values(powerspinConstants.GAME_CATEGORY).forEach((value, index) => {
        expect(resetCategoryStub.getCall(index).args[0]).to.eql(wheel.categories[value]);
      });
    });
  });
});
