import Board from '../../../../../src/model/powerspin/Board';
import powerspinConstants from '../../../../../src/util/powerspinConstants';
import Utilities from '../../../../../src/util/Utilities';
import sinon from 'sinon';

describe('Board Model', () => {
  describe('when creating a new instance', () => {
    let constructAmountFromSetStub;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      constructAmountFromSetStub = sandbox.stub(Utilities, 'constructAmountFromSet');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should set the betType as undefined if not provided', () => {
      const board = new Board();
      expect(board.betType).to.be.undefined;
    });

    it('should set the betType if provided', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER });
      expect(board.betType).to.eq(powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER);
    });

    it('should set the requested on the first panel to one if the betType is PLAY_NUMBER and the array is empty', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER });

      expect(board.panels).to.eql([{ requested: [1], selection: [] }]);
    });

    it('should set the requested on the first panel to one if the betType is PLAY_A_NUMBER_ON_ANY_WHEEL and the array is empty', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL });

      expect(board.panels).to.eql([{ requested: [1], selection: [] }]);
    });

    it('should keep the provided panels if the requested array is not empty', () => {
      const panels = [{ requested: [1], selection: [3] }];
      const board = new Board({
        betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER,
        panels,
      });

      expect(board.panels).to.eql(panels);
    });

    it('should set the quickPick to the false if not provided', () => {
      const board = new Board();
      expect(board.quickPick).to.be.false;
    });

    it('should set the quickPick if provided', () => {
      const board = new Board({ quickPick: true });
      expect(board.quickPick).to.be.true;
    });

    it('should call the constructAmountFromSet() util with the default multipliers if not provided', () => {
      constructAmountFromSetStub.returns([powerspinConstants.DEFAULT_MULTIPLIERS]);
      const board = new Board();

      expect(
        constructAmountFromSetStub.withArgs(powerspinConstants.DEFAULT_MULTIPLIERS, powerspinConstants.MULTIPLIERS_SET)
          .calledOnce
      ).to.be.true;

      expect(board.multipliers).to.eql([powerspinConstants.DEFAULT_MULTIPLIERS]);
    });

    it('should  call the constructAmountFromSet() util with the provided multipliers', () => {
      constructAmountFromSetStub.returns([1, 2, 4]);
      const board = new Board({ multipliers: 7 });

      expect(constructAmountFromSetStub.withArgs(7, powerspinConstants.MULTIPLIERS_SET).calledOnce).to.be.true;
      expect(board.multipliers).to.eql([1, 2, 4]);
    });

    it('should set the extendedBetting to the default value', () => {
      const board = new Board();
      expect(board.extendedBetting).to.eql({ systems: [{ id: null, index: [] }] });
    });
  });

  describe('reset()', () => {
    it('should set the panels to the default', () => {
      const board = new Board({
        betType: powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
        panels: [{ requested: [1], selected: [1] }],
      });
      board.reset();

      expect(board.panels).to.eql([{ requested: [], selection: [] }]);
    });

    it('should set the requested of the first panel to one if the betType is PLAY_NUMBER', () => {
      const board = new Board({
        betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER,
        panels: [{ requested: [3], selected: [3] }],
      });
      board.reset();

      expect(board.panels).to.eql([{ requested: [1], selection: [] }]);
    });

    it('should set the requested of the first panel to one if the betType is PLAY_A_NUMBER_ON_ANY_WHEEL', () => {
      const board = new Board({
        betType: powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL,
        panels: [{ requested: [3], selected: [3, 4] }],
      });
      board.reset();

      expect(board.panels).to.eql([{ requested: [1], selection: [] }]);
    });

    it('should set the betType to undefined if the betType is PLAY_SYMBOL', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL });
      board.reset();

      expect(board.betType).to.be.undefined;
    });

    it('should set the multipliers to the default', () => {
      const board = new Board({ multipliers: [1, 2, 3] });
      board.reset();

      expect(board.multipliers).to.eql([powerspinConstants.DEFAULT_MULTIPLIERS]);
    });

    it('should set the extenedBetting to the default', () => {
      const board = new Board();
      board.extendedBetting = { systems: [{ id: 'id', index: [1] }] };
      board.reset();

      expect(board.extendedBetting).to.eql({ systems: [{ id: null, index: [] }] });
    });
  });

  describe('setBetType()', () => {
    it('should set the betType if not defined', () => {
      const board = new Board();
      board.setBetType(powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);
      expect(board.betType).to.eq(powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);
    });

    it('should override the betType if exists', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN });
      board.setBetType(powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);
      expect(board.betType).to.eq(powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER);
    });
  });

  describe('disableQuickPick()', () => {
    it('should set the quickPick to false', () => {
      const board = new Board({ quickPick: true });
      board.disableQuickPick();
      expect(board.quickPick).to.be.false;
    });
  });

  describe('enableQuickPick()', () => {
    it('should set the quickPick to true', () => {
      const board = new Board({ quickPick: false });
      board.enableQuickPick();
      expect(board.quickPick).to.be.true;
    });
  });

  describe('isEmpty()', () => {
    it('should return true if the betType is undefined', () => {
      const board = new Board();
      expect(board.isEmpty()).to.be.true;
    });

    it('should return true if the betType is PLAY_NUMBER and the panels are the default', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER });
      expect(board.isEmpty()).to.be.true;
    });

    it('should return true if the betType is PLAY_NUMBER and the panel has no requested number', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER });
      board.panels[0].requested = [];
      expect(board.isEmpty()).to.be.true;
    });

    it('should return false if the betType is set and not a number bet type', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER });
      expect(board.isEmpty()).to.be.false;
    });

    it('should return false if the betType is PLAY_NUMBER and the panel has requested numbers', () => {
      const board = new Board({
        betType: powerspinConstants.ILOT_GAMETYPES.PLAY_UNDER,
        panels: [{ selected: [1], requested: [1] }],
      });
      expect(board.isEmpty()).to.be.false;
    });

    it('should return true is the betType is PLAY_A_NUMBER_ON_ANY_WHEEL and the panels are the default', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL });
      expect(board.isEmpty()).to.be.true;
    });

    it('should return false is the betType is PLAY_A_NUMBER_ON_ANY_WHEEL and the panel has selection', () => {
      const board = new Board({ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_A_NUMBER_ON_ANY_WHEEL });
      board.panels[0].selection = [1];
      expect(board.isEmpty()).to.be.false;
    });
  });

  describe('toggleMultipliers()', () => {
    let toggleNumberInArrayStub;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      toggleNumberInArrayStub = sandbox.stub(Utilities, 'toggleNumberInArray');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the toggleNumberInArray() util with the default multipliers if not provided', () => {
      toggleNumberInArrayStub.returns([1, 2, 4]);

      const board = new Board();
      board.toggleMultipliers();

      expect(
        toggleNumberInArrayStub.withArgs(
          powerspinConstants.DEFAULT_MULTIPLIERS,
          [powerspinConstants.DEFAULT_MULTIPLIERS],
          powerspinConstants.MULTIPLIERS_SET
        ).calledOnce
      ).to.be.true;
      expect(board.multipliers).to.eql([1, 2, 4]);
    });

    it('should call the toggleNumberInArray() util with the provided multipliers', () => {
      toggleNumberInArrayStub.returns([2, 4, 8]);

      const board = new Board();
      board.toggleMultipliers(1);

      expect(
        toggleNumberInArrayStub.withArgs(
          1,
          [powerspinConstants.DEFAULT_MULTIPLIERS],
          powerspinConstants.MULTIPLIERS_SET
        ).calledOnce
      ).to.be.true;
      expect(board.multipliers).to.eql([2, 4, 8]);
    });
  });

  describe('getMultiplierNumber()', () => {
    it('should return the sum of the multipliers array', () => {
      const board = new Board({ multipliers: 7 });

      expect(board.getMultiplierNumber()).to.eq(7);
    });
  });
});
