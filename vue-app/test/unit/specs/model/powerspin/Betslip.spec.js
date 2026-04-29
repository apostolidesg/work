import Betslip from '../../../../../src/model/powerspin/Betslip';
import Wheel from '../../../../../src/model/powerspin/Wheel';
import sinon from 'sinon';
import betslipUtils from '../../../../../src/util/betslipUtils';
import Utilities from '../../../../../src/util/Utilities';
import Constants from '../../../../../src/util/Constants';
import powerspinConstants from '../../../../../src/util/powerspinConstants';
import mockWagers from './mockWagers';
import { cloneDeep } from 'lodash';

describe('Betslip Model', () => {
  describe('when creating a new instance', () => {
    it('should set the correct gameType', () => {
      const betslip = new Betslip();
      expect(betslip.gameType).to.eq(Constants.GENERAL_GAME_TYPES.POWERSPIN);
    });

    it('should set the wager to a default value', () => {
      const betslip = new Betslip();

      expect(betslip.wager.wheels.length).to.eq(1);
      expect(betslip.wager.participatingDraws).to.eql({ multipleDraws: 1 });
      expect(betslip.wager.comboMultipliers).to.eql([powerspinConstants.DEFAULT_MULTIPLIERS]);
    });

    it('should set the promotionInfo to null', () => {
      const betslip = new Betslip();

      expect(betslip.promotionInfo).to.be.null;
    });

    it('should initialize the isecure with an empty array', () => {
      const betslip = new Betslip();
      expect(betslip.isecure).to.eql([]);
    });

    describe('if the it is called with a wager model', () => {
      describe('and the betslip contains one wheel', () => {
        let wager;

        beforeEach(() => {
          wager = cloneDeep(mockWagers.oneWheelWager);
        });

        it('should create a model with one wheel', () => {
          const betslip = new Betslip(wager);
          expect(betslip.wager.wheels.length).to.eq(1);
        });

        it('should create a NUMBER category with one board in initial state if such board does NOT exist', () => {
          const noNumberWager = { ...wager, boards: wager.boards.filter(b => b.betType !== 1) };
          const betslip = new Betslip(noNumberWager);
          const numberBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards;

          expect(numberBoards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
          expect(numberBoards[0].panels).to.be.eql([{ requested: [1], selection: [] }]);
          expect(numberBoards[0].quickPick).to.be.false;
          expect(numberBoards[0].multipliers).to.eql([powerspinConstants.DEFAULT_MULTIPLIERS]);
        });

        it('should create a NUMBER category with a single board if such board exists', () => {
          const betslip = new Betslip(wager);
          const numberBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards;

          expect(numberBoards.length).to.eq(1);
          expect(numberBoards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
        });

        it('should create a NUMBER category with a board containing the requested numbers', () => {
          const betslip = new Betslip(wager);
          const numberBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards;

          expect(numberBoards[0].panels[0].requested).to.eql([2, 1]);
        });

        it('should create a NUMBER category with a board containing the selected numbers', () => {
          const betslip = new Betslip(wager);
          const numberBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards;

          expect(numberBoards[0].panels[0].selection).to.eql([1, 2, 3]);
        });

        it('should create a NUMBER category with a board the quick pick property on the board level', () => {
          const betslip = new Betslip(wager);
          const numberBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.NUMBER].boards;

          expect(numberBoards[0].quickPick).to.be.true;
          expect(numberBoards[0].panels[0].quickPick).to.be.undefined;
          expect(numberBoards[0].panels[0].QPSelections).to.be.undefined;
        });

        it('should create a SYMBOL category with an empty board if such board does NOT exist', () => {
          const noSymbolWager = { ...wager, boards: wager.boards.filter(b => b.betType !== 9) };
          const betslip = new Betslip(noSymbolWager);
          const symbolBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards;

          expect(symbolBoards[0].betType).to.be.undefined;
        });

        it('should create a SYMBOL category with a single board if such board exists', () => {
          const betslip = new Betslip(wager);
          const symbolBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.SYMBOL].boards;

          expect(symbolBoards.length).to.eq(1);
          expect(symbolBoards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL);
        });

        it('should create a COLOR category with an empty board array if NOT such board exists', () => {
          const noColorWager = { ...wager, boards: wager.boards.filter(b => b.betType !== 13) };
          const betslip = new Betslip(noColorWager);
          const colorBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.COLOR].boards;

          expect(colorBoards.length).to.eql(0);
        });

        it('should create a COLOR category with an sorted boards array if such board exists', () => {
          const betslip = new Betslip(wager);
          const colorBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.COLOR].boards;

          expect(colorBoards.length).to.eql(3);
          expect(colorBoards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED);
          expect(colorBoards[1].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN);
          expect(colorBoards[2].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE);
        });

        it('should create a OVER/UNDER category with an empty board array if NOT such board exists', () => {
          const noOverUnderWager = { ...wager, boards: wager.boards.filter(b => b.betType !== 26) };
          const betslip = new Betslip(noOverUnderWager);
          const overUnderBoards =
            betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards;

          expect(overUnderBoards.length).to.eql(0);
        });

        it('should create a OVER/UNDER category with an inverse sorted boards array if such board exists', () => {
          const betslip = new Betslip(wager);
          const colorBoards = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER].boards;

          expect(colorBoards.length).to.eql(2);
          expect(colorBoards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_OVER);
          expect(colorBoards[1].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);
        });
      });

      describe('and the betslip contains multiple wheels', () => {
        let wager;

        beforeEach(() => {
          /**
           * Three wheels wager
           * 1st wheel -> Number selections:3,15 (QP), Symbol
           * 2nd wheel -> Number selections:16, Color red
           * 3rd wheel -> Under/Over both,
           * Multipliers: 3
           * */
          wager = cloneDeep(mockWagers.threeWheelWager);
        });

        it('should create multiple wheels betslip model', () => {
          const betslip = new Betslip(wager);

          expect(betslip.wager.wheels.length).to.eq(3);
        });

        it('should create the NUMBER categories on the appropriate wheels', () => {
          const betslip = new Betslip(wager);

          const firstWheelNumber = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.NUMBER];
          expect(firstWheelNumber.boards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
          expect(firstWheelNumber.boards[0].panels[0]).to.eql({ selection: [3, 15], requested: [1] });
          expect(firstWheelNumber.boards[0].quickPick).to.be.true;

          const secondWheelNumber = betslip.wager.wheels[1].categories[powerspinConstants.GAME_CATEGORY.NUMBER];
          expect(secondWheelNumber.boards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
          expect(secondWheelNumber.boards[0].panels[0]).to.eql({ selection: [16], requested: [1] });
          expect(secondWheelNumber.boards[0].quickPick).to.be.false;

          const thirdWheelNumber = betslip.wager.wheels[2].categories[powerspinConstants.GAME_CATEGORY.NUMBER];
          expect(thirdWheelNumber.boards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
          expect(thirdWheelNumber.boards[0].panels[0]).to.eql({ selection: [], requested: [1] });
          expect(thirdWheelNumber.boards[0].quickPick).to.be.false;
        });

        it('should create the SYMBOL categories on the appropriate wheels', () => {
          const betslip = new Betslip(wager);

          const firstWheelSymbol = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.SYMBOL];
          expect(firstWheelSymbol.boards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL);

          const secondWheelSymbol = betslip.wager.wheels[1].categories[powerspinConstants.GAME_CATEGORY.SYMBOL];
          expect(secondWheelSymbol.boards[0].betType).to.be.undefined;

          const thirdWheelSymbol = betslip.wager.wheels[2].categories[powerspinConstants.GAME_CATEGORY.SYMBOL];
          expect(thirdWheelSymbol.boards[0].betType).to.be.undefined;
        });

        it('should create the COLOR categories on the appropriate wheels', () => {
          const betslip = new Betslip(wager);

          const firstWheelColor = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.COLOR];
          expect(firstWheelColor.boards.length).to.eq(0);

          const secondWheelColor = betslip.wager.wheels[1].categories[powerspinConstants.GAME_CATEGORY.COLOR];
          expect(secondWheelColor.boards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED);

          const thirdWheelColor = betslip.wager.wheels[2].categories[powerspinConstants.GAME_CATEGORY.COLOR];
          expect(thirdWheelColor.boards.length).to.eq(0);
        });

        it('should create the UNDER/OVER categories on the appropriate wheels', () => {
          const betslip = new Betslip(wager);

          const firstWheelUnderOver = betslip.wager.wheels[0].categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER];
          expect(firstWheelUnderOver.boards.length).to.eq(0);

          const secondWheelUnderOver = betslip.wager.wheels[1].categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER];
          expect(secondWheelUnderOver.boards.length).to.eq(0);

          const thirdWheelUnderOver = betslip.wager.wheels[2].categories[powerspinConstants.GAME_CATEGORY.OVER_UNDER];
          expect(thirdWheelUnderOver.boards.length).to.eq(2);
          expect(thirdWheelUnderOver.boards[0].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_OVER);
          expect(thirdWheelUnderOver.boards[1].betType).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);
        });

        it('should get the multipliers from the wager', () => {
          const betslip = new Betslip(wager);

          expect(betslip.wager.comboMultipliers).to.eql([2, 1]);
        });

        it('should get the multiple draws from the wager', () => {
          const betslip = new Betslip(wager);

          expect(betslip.wager.participatingDraws.multipleDraws).to.eql(3);
        });
      });
    });
  });

  describe('isEmpty()', () => {
    it('should return true if all wheels are empty', () => {
      const betslip = new Betslip();
      betslip.wager.wheels.push(new Wheel());
      for (const wheel of betslip.wager.wheels) {
        wheel.isEmpty = sinon.stub().returns(true);
      }

      expect(betslip.isEmpty()).to.be.true;
    });

    it('should return false if all wheels are empty and the markets NOT', () => {
      const betslip = new Betslip();
      betslip.wager.wheels.push(new Wheel());
      for (const wheel of betslip.wager.wheels) {
        wheel.isEmpty = sinon.stub().returns(true);
      }
      betslip.wager.markets.isEmpty = sinon.stub().returns(false);

      expect(betslip.isEmpty()).to.be.false;
    });

    it('should return false if at least one wheel is not empty', () => {
      const betslip = new Betslip();
      betslip.wager.wheels.push(new Wheel());
      betslip.wager.wheels[0].isEmpty = sinon.stub().returns(false);
      betslip.wager.wheels[1].isEmpty = sinon.stub().returns(true);

      expect(betslip.isEmpty()).to.be.false;
    });
  });

  describe('isValidBetslip()', () => {
    let isBetslipValidStub;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      isBetslipValidStub = sandbox.stub(betslipUtils, 'isBetslipValid');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the isBetslipValid() Util function to determine the validity of the betslip', () => {
      isBetslipValidStub.returns(false);
      const betslip = new Betslip();

      const result = betslip.isValidBetslip();

      expect(isBetslipValidStub.withArgs({ betslip }).calledOnce).to.be.true;
      expect(result).to.be.false;
    });
  });

  describe('setISecureTokens()', () => {
    it('should set the tokens', () => {
      const betslip = new Betslip();
      betslip.setISecureTokens(['12345678']);

      expect(betslip.isecure).to.eql(['12345678']);
    });
  });

  describe('toggleComboMultipliers()', () => {
    let toggleNumberInArrayStub;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      toggleNumberInArrayStub = sandbox.stub(Utilities, 'toggleNumberInArray');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the toggleComboMultipliers util to calculate the new multipliers', () => {
      toggleNumberInArrayStub.returns([1]);
      const betslip = new Betslip();
      betslip.wager.comboMultipliers = [1, 2];

      betslip.toggleComboMultipliers(2);

      expect(toggleNumberInArrayStub.withArgs(2, [1, 2], powerspinConstants.MULTIPLIERS_SET).calledOnce).to.be.true;
      expect(betslip.wager.comboMultipliers).to.eql([1]);
    });

    it('should set the combo multipliers to the default if the toggle removes the last element', () => {
      toggleNumberInArrayStub.returns([]);
      const betslip = new Betslip();
      betslip.wager.comboMultipliers = [2];

      betslip.toggleComboMultipliers(2);

      expect(betslip.wager.comboMultipliers).to.eql([1]);
    });
  });

  describe('getMultiplierNumber()', () => {
    it('should return the sum of the multipliers array', () => {
      const betslip = new Betslip();
      betslip.wager.comboMultipliers = [1, 2, 4];

      const result = betslip.getMultiplierNumber();

      expect(result).to.eq(7);
    });
  });

  describe('setConsecutiveDraws()', () => {
    it('should set the consecutive draws', () => {
      const betslip = new Betslip();
      betslip.setConsecutiveDraws(5);

      expect(betslip.wager.participatingDraws.multipleDraws).to.eq(5);
    });
  });

  describe('ilotFormat()', () => {
    let formatIlotBetslipStub;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      formatIlotBetslipStub = sandbox.stub(betslipUtils, 'formatIlotBetslip');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the formatIlotBetslip() util function to get the result', () => {
      const mockResponse = { wager: { multipliers: 5 } };
      formatIlotBetslipStub.returns(mockResponse);

      const betslip = new Betslip();

      const result = betslip.ilotFormat();

      expect(formatIlotBetslipStub.withArgs({ betslip }).calledOnce).to.be.true;
      expect(result).to.eql(mockResponse);
    });
  });
});
