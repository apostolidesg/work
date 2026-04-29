import Betslip from '../../../../../src/model/eurojackpot/Betslip';
import sinon from 'sinon';
import Board from '../../../../../src/model/eurojackpot/Board';

describe('Eurojackpot Betslip', () => {
  describe('when creating a new instance', () => {
    it('should set the gameType', () => {
      const betslip = new Betslip();
      expect(betslip.gameType).to.eq('EUROJACKPOT');
    });

    it('should set the wager', () => {
      const betslip = new Betslip();
      expect(betslip.wager.boards.length).to.eq(1);
      expect(betslip.wager.participatingDraws).to.eql({ multipleDraws: 1 });
    });

    it('should set the promotionInfo', () => {
      const betslip = new Betslip();
      expect(betslip.promotionInfo).to.eq(null);
    });

    it('should set the isecure', () => {
      const betslip = new Betslip();
      expect(betslip.isecure).to.eql([]);
    });

    describe('when a wagerModel is provided', () => {
      it('should set the quick pick on the board if both panels are quick picked', () => {
        const wagerModel = {
          boards: [
            {
              panels: [
                { selection: [1, 2, 3, 4, 5], quickPick: true },
                { selection: [1, 2, 3, 4, 5], quickPick: true },
              ],
            },
          ],
        };
        const betslip = new Betslip(wagerModel);
        expect(betslip.wager.boards[0].quickPick).to.be.true;
      });

      it('should not set the quick pick on the board if only one panel is quick picked', () => {
        const wagerModel = {
          boards: [
            {
              panels: [{ selection: [1, 2, 3, 4, 5], quickPick: true }, { selection: [1, 2, 3, 4, 5] }],
            },
          ],
        };
        const betslip = new Betslip(wagerModel);
        expect(betslip.wager.boards[0].quickPick).to.be.false;
      });

      it('should set the systemId on the board if exists', () => {
        const wagerModel = {
          boards: [
            {
              systemId: 45,
              panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2, 3, 4, 5] }],
            },
          ],
        };
        const betslip = new Betslip(wagerModel);
        expect(betslip.wager.boards[0].systemId).to.eq(45);
      });

      it('should set the systemId to null on the board if not exists', () => {
        const wagerModel = {
          boards: [
            {
              panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2, 3, 4, 5] }],
            },
          ],
        };
        const betslip = new Betslip(wagerModel);
        expect(betslip.wager.boards[0].systemId).to.be.null;
      });

      it('should set the participating draws', () => {
        const wagerModel = {
          participatingDraws: { multipleDraws: 2 },
        };
        const betslip = new Betslip(wagerModel);
        expect(betslip.wager.participatingDraws).to.eql({ multipleDraws: 2 });
      });

      it('should set the board selection', () => {
        const wagerModel = {
          boards: [
            {
              panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [1, 2] }],
            },
          ],
        };
        const betslip = new Betslip(wagerModel);
        expect(betslip.wager.boards[0].panels[0].selection).to.eql([1, 2, 3, 4, 5]);
        expect(betslip.wager.boards[0].panels[1].selection).to.eql([1, 2]);
      });
    });
  });

  describe('when adding a board', () => {
    it('should add a board if the number of boards is less than the max', () => {
      const betslip = new Betslip();
      betslip.addBoard();
      expect(betslip.wager.boards.length).to.eq(2);
    });

    it('should not add a board if the number of boards is equal to the max', () => {
      const betslip = new Betslip();
      betslip.wager.boards = [...Array(10).fill({})];
      betslip.addBoard();
      expect(betslip.wager.boards.length).to.eq(10);
    });
  });

  describe('when removing a board', () => {
    let resetSpy;
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      resetSpy = sandbox.spy();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should remove the board at the provided index', () => {
      const betslip = new Betslip();
      const mockBoard1 = sinon.createStubInstance(Board);
      const mockBoard2 = sinon.createStubInstance(Board);
      betslip.wager.boards = [mockBoard1, mockBoard2];
      betslip.removeBoard(0);
      expect(betslip.wager.boards.length).to.eq(1);
      expect(betslip.wager.boards[0]).to.eq(mockBoard2);
    });

    it('should reset the boaard if there is only one', () => {
      const betslip = new Betslip();
      const mockBoard = sinon.createStubInstance(Board);
      mockBoard.reset = resetSpy;
      betslip.wager.boards = [mockBoard];
      betslip.removeBoard(0);
      expect(betslip.wager.boards.length).to.eq(1);
      expect(resetSpy.calledOnce).to.be.true;
    });

    it('should not change the boards if the index is out of bounds', () => {
      const betslip = new Betslip();
      const mockBoard1 = sinon.createStubInstance(Board);
      const mockBoard2 = sinon.createStubInstance(Board);
      mockBoard1.reset = resetSpy;
      mockBoard2.reset = resetSpy;
      betslip.wager.boards = [mockBoard1, mockBoard2];
      betslip.removeBoard(2);
      expect(betslip.wager.boards.length).to.eq(2);
      expect(betslip.wager.boards[0]).to.eq(mockBoard1);
      expect(betslip.wager.boards[1]).to.eq(mockBoard2);
      expect(resetSpy.notCalled).to.be.true;
    });
  });

  describe('when setting the isecure', () => {
    it('should set the isecure', () => {
      const betslip = new Betslip();
      const isecure = ['isecure'];
      betslip.setISecureTokens(isecure);
      expect(betslip.isecure).to.eq(isecure);
    });
  });

  describe('when setting the participating draws', () => {
    it('should set the participating draws', () => {
      const betslip = new Betslip();
      const participatingDraws = 2;
      betslip.setParticipatingDraws(participatingDraws);
      expect(betslip.wager.participatingDraws.multipleDraws).to.eq(participatingDraws);
    });
  });

  describe('when checking if the betslip is empty', () => {
    it('should return true if all boards are empty', () => {
      const betslip = new Betslip();
      expect(betslip.isEmpty()).to.be.true;
    });

    it('should return false if at least one board is not empty', () => {
      const betslip = new Betslip();
      betslip.wager.boards = [{ isEmpty: () => true }, { isEmpty: () => false }];
      expect(betslip.isEmpty()).to.be.false;
    });
  });

  describe('when checking if the betslip is valid', () => {
    it('should return true if all boards are valid', () => {
      const betslip = new Betslip();
      betslip.wager.boards = [{ isValid: () => true }, { isValid: () => true }];
      expect(betslip.isValidBetslip()).to.be.true;
    });

    it('should return false if at least one board is not valid', () => {
      const betslip = new Betslip();
      betslip.wager.boards = [{ isValid: () => true }, { isValid: () => false }];
      expect(betslip.isValidBetslip()).to.be.false;
    });
  });

  describe('when formatting the betslip for ilot', () => {
    it('should have the correct gameType', () => {
      const betslip = new Betslip();
      expect(betslip.ilotFormat().gameType).to.eq('EUROJACKPOT');
    });

    it('should have the beslip isecure', () => {
      const betslip = new Betslip();
      betslip.isecure = ['isecure1', 'isecure2'];
      expect(betslip.ilotFormat().isecure).to.eql(['isecure1', 'isecure2']);
    });

    it('should have the correct participating draws', () => {
      const betslip = new Betslip();
      betslip.setParticipatingDraws(2);
      expect(betslip.ilotFormat().wager.participatingDraws).to.eql({ multipleDraws: 2 });
    });

    it('should have the correct selections and boardId on each board', () => {
      const betslip = new Betslip();
      betslip.wager.boards = [
        {
          panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [6, 7] }],
        },
        {
          panels: [{ selection: [6, 7, 8, 9, 10] }, { selection: [10, 11, 12] }],
        },
      ];

      expect(betslip.ilotFormat().wager.boards).to.eql([
        {
          boardId: 1,
          panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [6, 7] }],
        },
        {
          boardId: 2,
          panels: [{ selection: [6, 7, 8, 9, 10] }, { selection: [10, 11, 12] }],
        },
      ]);
    });

    it('should have the correct systemId on each board', () => {
      const betslip = new Betslip();
      betslip.wager.boards = [
        {
          panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [6, 7] }],
        },
        {
          systemId: 2,
          panels: [{ selection: [6, 7, 8, 9, 10] }, { selection: [10, 11, 12] }],
        },
      ];

      expect(betslip.ilotFormat().wager.boards).to.eql([
        {
          boardId: 1,
          panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [6, 7] }],
        },
        {
          boardId: 2,
          systemId: 2,
          panels: [{ selection: [6, 7, 8, 9, 10] }, { selection: [10, 11, 12] }],
        },
      ]);
    });

    it('should move the quick pick from the board to the panels', () => {
      const betslip = new Betslip();
      betslip.wager.boards = [
        {
          quickPick: true,
          panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [6, 7] }],
        },
        {
          systemId: 2,
          quickPick: true,
          panels: [{ selection: [6, 7, 8, 9, 10] }, { selection: [10, 11, 12] }],
        },
      ];

      expect(betslip.ilotFormat().wager.boards).to.eql([
        {
          boardId: 1,
          panels: [
            { selection: [1, 2, 3, 4, 5], quickPick: true },
            { selection: [6, 7], quickPick: true },
          ],
        },
        {
          boardId: 2,
          systemId: 2,
          panels: [
            { selection: [6, 7, 8, 9, 10], quickPick: true },
            { selection: [10, 11, 12], quickPick: true },
          ],
        },
      ]);
    });
  });
});
