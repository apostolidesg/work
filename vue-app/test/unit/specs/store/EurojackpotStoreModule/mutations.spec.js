import mutations from '../../../../../src/store/modules/EurojackpotStoreModule/mutations';
import types from '../../../../../src/store/modules/EurojackpotStoreModule/types';
import sinon from 'sinon';
import Betslip from '../../../../../src/model/eurojackpot/Betslip';

describe('Eurojackp otStoreModule mutations', () => {
  describe('SET_BETSLIP', () => {
    it('should set betslip', () => {
      const state = { betslip: null };
      const betslip = { wager: { boards: [] } };
      mutations[types.mutations.SET_BETSLIP](state, { betslip });

      expect(state.betslip).to.eql(betslip);
    });

    it('should set selectedBoardIndex to 0', () => {
      const state = { betslip: null, selectedBoardIndex: 1 };
      const betslip = { wager: { boards: [] } };
      mutations[types.mutations.SET_BETSLIP](state, { betslip });

      expect(state.selectedBoardIndex).to.eq(0);
    });
  });

  describe('SET_SELECTED_BOARD_INDEX', () => {
    let isBoard1EmptyStub;
    let isBoard2EmptyStub;

    beforeEach(() => {
      isBoard1EmptyStub = sinon.stub().returns(false);
      isBoard2EmptyStub = sinon.stub().returns(false);
    });

    afterEach(() => {
      isBoard1EmptyStub.resetHistory();
      isBoard2EmptyStub.resetHistory();
    });

    it('should not set selectedBoardIndex if it is the same as the current one', () => {
      const state = {
        selectedBoardIndex: 0,
        betslip: { wager: { boards: [{ isEmpty: isBoard1EmptyStub }, { isEmpty: isBoard2EmptyStub }] } },
      };
      mutations[types.mutations.SET_SELECTED_BOARD_INDEX](state, { selectedBoardIndex: 0 });

      expect(state.selectedBoardIndex).to.eq(0);
    });

    it('should set selectedBoardIndex', () => {
      const state = {
        selectedBoardIndex: 0,
        betslip: { wager: { boards: [{ isEmpty: isBoard1EmptyStub }, { isEmpty: isBoard2EmptyStub }] } },
      };
      mutations[types.mutations.SET_SELECTED_BOARD_INDEX](state, { selectedBoardIndex: 1 });

      expect(state.selectedBoardIndex).to.eq(1);
    });

    it('should filter out empty boards', () => {
      isBoard1EmptyStub.returns(true);
      const state = {
        selectedBoardIndex: 0,
        betslip: { wager: { boards: [{ isEmpty: isBoard1EmptyStub }, { isEmpty: isBoard2EmptyStub }] } },
      };
      mutations[types.mutations.SET_SELECTED_BOARD_INDEX](state, { selectedBoardIndex: 1 });

      expect(state.betslip.wager.boards.length).to.eq(1);
      expect(state.selectedBoardIndex).to.eq(0);
    });

    it('should not set selectedBoardIndex if it is invalid', () => {
      const state = {
        selectedBoardIndex: 0,
        betslip: { wager: { boards: [{ isEmpty: isBoard1EmptyStub }, { isEmpty: isBoard2EmptyStub }] } },
      };
      mutations[types.mutations.SET_SELECTED_BOARD_INDEX](state, { selectedBoardIndex: 2 });

      expect(state.selectedBoardIndex).to.eq(0);
    });
  });

  describe('SET_BETSLIP_CONSECUTIVE_DRAWS', () => {
    it('should set betslip consecutive draws', () => {
      const state = { betslip: { wager: { participatingDraws: { multipleDraws: 1 } } } };
      mutations[types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS](state, { multipleDraws: 2 });

      expect(state.betslip.wager.participatingDraws.multipleDraws).to.eq(2);
    });
  });

  describe('ADD_BOARD', () => {
    let addBoardSpy;

    beforeEach(() => {
      addBoardSpy = sinon.spy();
    });

    afterEach(() => {
      addBoardSpy.resetHistory();
    });

    it('should add board', () => {
      const state = {
        betslip: {
          addBoard: addBoardSpy,
          wager: { boards: [] },
        },
        selectedBoardIndex: 0,
      };
      mutations[types.mutations.ADD_BOARD](state);

      expect(addBoardSpy.calledOnce).to.be.true;
    });

    it('should set selectedBoardIndex to the last board', () => {
      const state = { betslip: { addBoard: addBoardSpy, wager: { boards: [{}] } }, selectedBoardIndex: 0 };
      mutations[types.mutations.ADD_BOARD](state);

      expect(state.selectedBoardIndex).to.eq(0);
    });
  });

  describe('REMOVE_BOARD', () => {
    let removeBoardSpy;

    beforeEach(() => {
      removeBoardSpy = sinon.spy();
    });

    afterEach(() => {
      removeBoardSpy.resetHistory();
    });

    it('should remove board', () => {
      const state = {
        betslip: {
          removeBoard: removeBoardSpy,
          wager: { boards: [{}] },
        },
        selectedBoardIndex: 0,
      };
      mutations[types.mutations.REMOVE_BOARD](state);

      expect(removeBoardSpy.calledOnce).to.be.true;
    });

    it('should set selectedBoardIndex to the last board if the removed board has index less than the selected index', () => {
      const state = {
        betslip: {
          removeBoard: removeBoardSpy,
          wager: { boards: [{}, {}] },
        },
        selectedBoardIndex: 1,
      };
      mutations[types.mutations.REMOVE_BOARD](state, { boardIndex: 0 });

      expect(state.selectedBoardIndex).to.eq(0);
    });

    it('should not change selectedBoardIndex if the removed board has index more or equal than the selected index', () => {
      const state = {
        betslip: {
          removeBoard: removeBoardSpy,
          wager: { boards: [{}, {}] },
        },
        selectedBoardIndex: 0,
      };
      mutations[types.mutations.REMOVE_BOARD](state, { boardIndex: 1 });

      expect(state.selectedBoardIndex).to.eq(0);
    });
  });

  describe('TOGGLE_QUICK_PICK', () => {
    let addQuickPickSpy;

    beforeEach(() => {
      addQuickPickSpy = sinon.spy();
    });

    afterEach(() => {
      addQuickPickSpy.resetHistory();
    });

    it('should toggle quick pick', () => {
      const state = {
        betslip: {
          wager: { boards: [{ addQuickPick: addQuickPickSpy }] },
        },
        selectedBoardIndex: 0,
      };
      mutations[types.mutations.TOGGLE_QUICK_PICK](state);

      expect(addQuickPickSpy.calledOnce).to.be.true;
    });
  });

  describe('SET_MAIN_SELECTION', () => {
    let setMainNumberSpy;

    beforeEach(() => {
      setMainNumberSpy = sinon.spy();
    });

    afterEach(() => {
      setMainNumberSpy.resetHistory();
    });

    it('should set main selection', () => {
      const state = {
        betslip: {
          wager: { boards: [{ setMainNumber: setMainNumberSpy }] },
        },
        selectedBoardIndex: 0,
      };
      mutations[types.mutations.SET_MAIN_SELECTION](state, { mainSelection: 1 });

      expect(setMainNumberSpy.calledOnce).to.be.true;
      expect(setMainNumberSpy.calledWith(1)).to.be.true;
    });
  });

  describe('SET_EURO_SELECTION', () => {
    let setEuroNumberSpy;

    beforeEach(() => {
      setEuroNumberSpy = sinon.spy();
    });

    afterEach(() => {
      setEuroNumberSpy.resetHistory();
    });

    it('should set euro selection', () => {
      const state = {
        betslip: {
          wager: { boards: [{ setEuroNumber: setEuroNumberSpy }] },
        },
        selectedBoardIndex: 0,
      };
      mutations[types.mutations.SET_EURO_SELECTION](state, { euroSelection: 1 });

      expect(setEuroNumberSpy.calledOnce).to.be.true;
      expect(setEuroNumberSpy.calledWith(1)).to.be.true;
    });
  });

  describe('SET_SYSTEM', () => {
    let setSystemIdSpy;

    beforeEach(() => {
      setSystemIdSpy = sinon.spy();
    });

    afterEach(() => {
      setSystemIdSpy.resetHistory();
    });

    it('should set system', () => {
      const state = {
        betslip: {
          wager: { boards: [{ setSystemId: setSystemIdSpy }] },
        },
        selectedBoardIndex: 0,
      };
      mutations[types.mutations.SET_SYSTEM](state, { systemId: 45 });

      expect(setSystemIdSpy.calledOnce).to.be.true;
      expect(setSystemIdSpy.calledWith(45)).to.be.true;
    });
  });

  describe('RESET_BETSLIP', () => {
    it('should reset betslip', () => {
      const state = {
        betslip: {
          wager: { boards: [{}] },
        },
        selectedBoardIndex: 0,
      };
      mutations[types.mutations.RESET_BETSLIP](state);

      expect(state.betslip).to.eql(new Betslip());
      expect(state.selectedBoardIndex).to.eq(0);
    });
  });

  describe('CLEAR_SELECTED_BOARD', () => {
    let resetSpy;

    beforeEach(() => {
      resetSpy = sinon.spy();
    });

    afterEach(() => {
      resetSpy.resetHistory();
    });

    it('should call the reset method of the selected board', () => {
      const state = {
        betslip: {
          wager: { boards: [{ reset: resetSpy }] },
        },
        selectedBoardIndex: 0,
      };
      mutations[types.mutations.CLEAR_SELECTED_BOARD](state);

      expect(resetSpy.calledOnce).to.be.true;
    });
  });

  describe('SET_ACTIVE_DRAW_API_TIMEOUT', () => {
    it('should set active draw api timeout', () => {
      const state = { activeDrawApiTimeout: null };
      mutations[types.mutations.SET_ACTIVE_DRAW_API_TIMEOUT](state, { activeDrawApiTimeout: 123 });

      expect(state.activeDrawApiTimeout).to.eq(123);
    });
  });

  describe('RESET_ACTIVE_DRAW_API_TIMEOUT', () => {
    it('should reset active draw api timeout', () => {
      const state = { activeDrawApiTimeout: 123 };
      mutations[types.mutations.RESET_ACTIVE_DRAW_API_TIMEOUT](state);

      expect(state.activeDrawApiTimeout).to.be.null;
    });
  });

  describe('SET_SALES_OPEN', () => {
    it('should set sales open', () => {
      const state = {
        activeDrawId: null,
        activeDrawTime: null,
        salesCloseTime: null,
        jackpotAmount: null,
        salesStatus: null,
      };
      mutations[types.mutations.SET_SALES_OPEN](state, {
        activeDrawId: 123,
        activeDrawTime: 456,
        salesCloseTime: 789,
        jackpot: 10000000,
      });

      expect(state.activeDrawId).to.eq(123);
      expect(state.activeDrawTime).to.eq(456);
      expect(state.salesCloseTime).to.eq(789);
      expect(state.jackpotAmount).to.eq(10000000);
      expect(state.salesStatus).to.eq('SALES_OPEN');
    });
  });

  describe('SET_SALES_CLOSED', () => {
    it('should set sales closed', () => {
      const state = {
        activeDrawId: 123,
        activeDrawTime: 456,
        salesCloseTime: 789,
        jackpotAmount: 10000000,
        salesStatus: 'SALES_OPEN',
      };
      mutations[types.mutations.SET_SALES_CLOSED](state);

      expect(state.activeDrawId).to.be.null;
      expect(state.activeDrawTime).to.be.null;
      expect(state.salesCloseTime).to.be.null;
      expect(state.jackpotAmount).to.be.null;
      expect(state.salesStatus).to.eq('SALES_CLOSED');
    });
  });

  describe('SET_STATISTICS', () => {
    it('should set statistics', () => {
      const state = { statistics: null };
      mutations[types.mutations.SET_STATISTICS](state, { statistics: { mainNumbers: {}, euroNumbers: {} } });

      expect(state.statistics).to.eql({ mainNumbers: {}, euroNumbers: {} });
    });
  });

  describe('RESET_STATISTICS', () => {
    it('should reset statistics', () => {
      const state = { statistics: { mainNumbers: {}, euroNumbers: {} } };
      mutations[types.mutations.RESET_STATISTICS](state);

      expect(state.statistics).to.be.null;
    });
  });

  describe('SET_STATISTICS_SELECTION', () => {
    it('should set statistics selection', () => {
      const state = { statisticsSelection: null };
      mutations[types.mutations.SET_STATISTICS_SELECTION](state, { selection: 'OCCURRENCES' });

      expect(state.statisticsSelection).to.eq('OCCURRENCES');
    });

    it('should set statistics selection to default if the selection is undefined', () => {
      const state = { statisticsSelection: null };
      mutations[types.mutations.SET_STATISTICS_SELECTION](state);

      expect(state.statisticsSelection).to.eq('NONE');
    });
  });
});
