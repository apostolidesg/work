import Board from '../../../../../src/model/eurojackpot/Board';
import sinon from 'sinon';
import EurojackpotBetslipUtilities from '../../../../../src/util/eurojackpotBetslipUtilities';
import Utilities from '../../../../../src/util/Utilities';
import EurojackpotConstants from '../../../../../src/util/eurojackpotConstants';

describe('Eurojackpot Board', () => {
  it('should create an empty board', () => {
    const board = new Board();
    expect(board).eql({
      betType: 1,
      multipliers: 1,
      panels: [{ selection: [] }, { selection: [] }],

      quickPick: false,
      systemId: null,
    });
  });

  it('should create a board with the given parameters', () => {
    const board = new Board({
      betType: 2,
      multipliers: 2,
      panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
      quickPick: true,
      systemId: 'id',
    });
    expect(board).eql({
      betType: 2,
      multipliers: 2,
      panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
      quickPick: true,
      systemId: 'id',
    });
  });

  describe('reset()', () => {
    it('should reset the board to the default', () => {
      const board = new Board({
        betType: 2,
        multipliers: 2,
        panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
        quickPick: true,
        systemId: 'id',
      });
      board.reset();

      expect(board).eql({
        betType: 1,
        multipliers: 1,
        panels: [{ selection: [] }, { selection: [] }],
        quickPick: false,
        systemId: null,
      });
    });
  });

  describe('setMainNumber()', () => {
    it('should set the main number', () => {
      const board = new Board();
      board.setMainNumber(1);
      expect(board.panels[0].selection).to.eql([1]);
    });

    it('should remove the main number if the number is already selected', () => {
      const board = new Board();
      board.panels[0].selection = [1, 2, 3, 4, 5];
      board.setMainNumber(1);
      expect(board.panels[0].selection).to.eql([2, 3, 4, 5]);
    });

    it('should not add the number if out of range', () => {
      const board = new Board();
      board.setMainNumber(51);
      expect(board.panels[0].selection).to.eql([]);
    });
  });

  describe('setEuroNumber()', () => {
    it('should set the euro number', () => {
      const board = new Board();
      board.setEuroNumber(1);
      expect(board.panels[1].selection).to.eql([1]);
    });

    it('should remove the euro number if the number is already selected', () => {
      const board = new Board();
      board.panels[1].selection = [1, 2];
      board.setEuroNumber(1);
      expect(board.panels[1].selection).to.eql([2]);
    });

    it('should not add the number if out of range', () => {
      const board = new Board();
      board.setEuroNumber(13);
      expect(board.panels[1].selection).to.eql([]);
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

  describe('setSystemId()', () => {
    it('should set the systemId if it is valid', () => {
      const board = new Board();
      board.setSystemId(12);
      expect(board.systemId).to.eql(12);
    });

    it('should disable quickPick if the systemId is valid', () => {
      const board = new Board({ quickPick: true });
      board.setSystemId(12);
      expect(board.quickPick).to.be.false;
    });

    it('should set the systemId to null if it is null', () => {
      const board = new Board();
      board.setSystemId(null);
      expect(board.systemId).to.eql(null);
    });

    it('should not change the systemId if it is invalid', () => {
      const board = new Board({ systemId: 12 });
      board.setSystemId(9);
      expect(board.systemId).to.eql(12);
    });

    it('should toggle the systemId if it is the same', () => {
      const board = new Board({ systemId: 12 });
      board.setSystemId(12);
      expect(board.systemId).to.eql(null);
    });

    it('should set the new systemId if it is different', () => {
      const board = new Board({ systemId: 12 });
      board.setSystemId(13);
      expect(board.systemId).to.eql(13);
    });
  });

  describe('isEmpty()', () => {
    it('should return true if the board is empty', () => {
      const board = new Board();
      expect(board.isEmpty()).to.be.true;
    });

    it('should return false if the board contains main selections', () => {
      const board = new Board();
      board.panels[0].selection = [1];
      expect(board.isEmpty()).to.be.false;
    });

    it('should return false if the board contains euro selections', () => {
      const board = new Board();
      board.panels[1].selection = [1];
      expect(board.isEmpty()).to.be.false;
    });

    it('should return false if the board contains systemId', () => {
      const board = new Board();
      board.systemId = 12;
      expect(board.isEmpty()).to.be.false;
    });
  });

  describe('isValid()', () => {
    let sandbox;
    let betslipUtilsStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      betslipUtilsStub = sandbox.stub(EurojackpotBetslipUtilities, 'isBoardValid');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return true if the board is valid', () => {
      betslipUtilsStub.returns(true);
      const board = new Board();
      expect(board.isValid()).to.be.true;
    });

    it('should return false if the board is not valid', () => {
      betslipUtilsStub.returns(false);
      const board = new Board();
      expect(board.isValid()).to.be.false;
    });
  });

  describe('addQuickPick()', () => {
    let sandbox;
    let getUniqueRandomArrayStub;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      getUniqueRandomArrayStub = sandbox.stub(Utilities, 'getUniqueRandomArray').returns([]);
      sandbox.stub(EurojackpotConstants, 'SYSTEMS').value({
        12: { numbers: 15 },
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('when the systemId is null', () => {
      it('should call the getUniqueRandomArray function to get 5 numbers if the main selections is empty', () => {
        const board = new Board();
        board.addQuickPick();
        expect(getUniqueRandomArrayStub.withArgs(1, 50, 5).calledOnce).to.be.true;
      });

      it('should call the getUniqueRandomArray function to get 2 number if the euro numbers selections is empty', () => {
        const board = new Board();
        board.addQuickPick();
        expect(getUniqueRandomArrayStub.withArgs(1, 12, 2).calledOnce).to.be.true;
      });

      it('should call the getUniqueRandomArray function to get 7 numbers if the main selection has 7 numbers', () => {
        const board = new Board();
        board.panels[0].selection = [1, 2, 3, 4, 5, 6, 7];
        board.addQuickPick();
        expect(getUniqueRandomArrayStub.withArgs(1, 50, 7).calledOnce).to.be.true;
      });

      it('should call the getUniqueRandomArray function to get 3 numbers if the euro numbers selection has 3 numbers', () => {
        const board = new Board();
        board.panels[1].selection = [1, 2, 3];
        board.addQuickPick();
        expect(getUniqueRandomArrayStub.withArgs(1, 12, 3).calledOnce).to.be.true;
      });

      it('should add the numbers to the main selection', () => {
        getUniqueRandomArrayStub.onCall(0).returns([1, 2, 3, 5, 4]);
        const board = new Board();
        board.addQuickPick();
        expect(board.panels[0].selection).to.eql([1, 2, 3, 4, 5]);
      });

      it('should add the numbers to the euro numbers selection', () => {
        getUniqueRandomArrayStub.onCall(1).returns([2, 1]);
        const board = new Board();
        board.addQuickPick();
        expect(board.panels[1].selection).to.eql([1, 2]);
      });

      it('should enable the quickPick', () => {
        const board = new Board();
        board.addQuickPick();
        expect(board.quickPick).to.be.true;
      });
    });

    describe('when the systemId is not null', () => {
      it('should call the getUniqueRandomArray function to get main numbers equal with the systems numbers', () => {
        const board = new Board({ systemId: 12 });
        board.addQuickPick();
        expect(getUniqueRandomArrayStub.withArgs(1, 50, 15).calledOnce).to.be.true;
      });

      it('should call the getUniqueRandomArray function to get 2 number if the euro numbers selections is empty', () => {
        const board = new Board({ systemId: 12 });
        board.addQuickPick();
        expect(getUniqueRandomArrayStub.withArgs(1, 12, 2).calledOnce).to.be.true;
      });

      it('should call the getUniqueRandomArray function to get 3 numbers if the euro selection has 3 numbers', () => {
        const board = new Board({ systemId: 12 });
        board.panels[1].selection = [1, 2, 3];
        board.addQuickPick();
        expect(getUniqueRandomArrayStub.withArgs(1, 12, 3).calledOnce).to.be.true;
      });

      it('should add the numbers to the main selection', () => {
        getUniqueRandomArrayStub.onCall(0).returns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        const board = new Board({ systemId: 12 });
        board.addQuickPick();
        expect(board.panels[0].selection).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      });

      it('should add the numbers to the euro numbers selection', () => {
        getUniqueRandomArrayStub.onCall(1).returns([1, 2]);
        const board = new Board({ systemId: 12 });
        board.addQuickPick();
        expect(board.panels[1].selection).to.eql([1, 2]);
      });

      it('should enable the quickPick', () => {
        const board = new Board({ systemId: 12 });
        board.addQuickPick();
        expect(board.quickPick).to.be.true;
      });
    });
  });
});
