import mutations from '../../../../../src/store/modules/KinoStoreModule/mutations';
import types from '../../../../../src/store/modules/KinoStoreModule/types';
import sinon from 'sinon';
import Betslip from '../../../../../src/model/Betslip';

describe('KinoStoreModule mutations', () => {
  describe('SET_BETSLIP', () => {
    it('should set betslip', () => {
      const state = { betslip: {}, activeAreaIndex: 1 };
      const betslip = { bet_areas: [] };
      mutations[types.mutations.SET_BETSLIP](state, { betslip });
      expect(state.betslip).to.eql(betslip);
    });

    it('should set activeAreaIndex to 0', () => {
      const state = { betslip: {}, activeAreaIndex: 1 };
      const betslip = { bet_areas: [] };
      mutations[types.mutations.SET_BETSLIP](state, { betslip });
      expect(state.activeAreaIndex).to.eql(0);
    });
  });

  describe('TOGGLE_NUMBER', () => {
    let toggleNumberSpy;
    let refreshValueSpy;
    let refreshBetslipValueSpy;

    beforeEach(() => {
      toggleNumberSpy = sinon.spy();
      refreshValueSpy = sinon.spy();
      refreshBetslipValueSpy = sinon.spy();
    });

    afterEach(() => {
      toggleNumberSpy.resetHistory();
      refreshValueSpy.resetHistory();
      refreshBetslipValueSpy.resetHistory();
    });

    it('should call toggleNumber method of the active bet area', () => {
      const state = {
        betslip: {
          bet_areas: [{ toggleNumber: toggleNumberSpy, refreshValue: refreshValueSpy }],
          refreshValue: refreshBetslipValueSpy,
        },
        activeAreaIndex: 0,
      };
      mutations[types.mutations.TOGGLE_NUMBER](state, { number: 1 });

      expect(toggleNumberSpy.calledWith(1)).to.be.true;
    });

    it('should call refreshValue method of the active bet area', () => {
      const state = {
        betslip: {
          bet_areas: [{ toggleNumber: toggleNumberSpy, refreshValue: refreshValueSpy }],
          refreshValue: refreshBetslipValueSpy,
        },
        activeAreaIndex: 0,
      };
      mutations[types.mutations.TOGGLE_NUMBER](state, { number: 1 });

      expect(refreshValueSpy.called).to.be.true;
    });

    it('should call refreshValue method of the betslip', () => {
      const state = {
        betslip: {
          bet_areas: [{ toggleNumber: toggleNumberSpy, refreshValue: refreshValueSpy }],
          refreshValue: refreshBetslipValueSpy,
        },
        activeAreaIndex: 0,
      };
      mutations[types.mutations.TOGGLE_NUMBER](state, { number: 1 });

      expect(refreshBetslipValueSpy.called).to.be.true;
    });
  });

  describe('ADD_BET_AREA', () => {
    let addNewBetSpy;

    beforeEach(() => {
      addNewBetSpy = sinon.spy();
    });

    afterEach(() => {
      addNewBetSpy.resetHistory();
    });

    it('should call addNewBet method of the betslip', () => {
      const state = { betslip: { addNewBet: addNewBetSpy, bet_areas: [{}, {}] }, activeAreaIndex: 0 };
      mutations[types.mutations.ADD_BET_AREA](state);

      expect(addNewBetSpy.called).to.be.true;
    });

    it('should set activeAreaIndex to the last bet area index', () => {
      const state = { betslip: { addNewBet: addNewBetSpy, bet_areas: [{}, {}] }, activeAreaIndex: 0 };
      mutations[types.mutations.ADD_BET_AREA](state);

      expect(state.activeAreaIndex).to.eql(1);
    });
  });

  describe('CHANGE_ACTIVE_BET_AREA', () => {
    it('should not change activeAreaIndex if it is the same as the new activeAreaIndex', () => {
      const state = { betslip: { bet_areas: [{ filled: true }, { filled: true }] }, activeAreaIndex: 1 };
      mutations[types.mutations.CHANGE_ACTIVE_BET_AREA](state, { activeAreaIndex: 1 });

      expect(state.activeAreaIndex).to.eql(1);
    });

    it('should change activeAreaIndex to the new activeAreaIndex', () => {
      const state = { betslip: { bet_areas: [{ filled: true }, { filled: true }] }, activeAreaIndex: 1 };
      mutations[types.mutations.CHANGE_ACTIVE_BET_AREA](state, { activeAreaIndex: 0 });

      expect(state.activeAreaIndex).to.eql(0);
    });

    it('should remove unfilled bet areas', () => {
      const state = { betslip: { bet_areas: [{ filled: true }, { filled: false }] } };
      mutations[types.mutations.CHANGE_ACTIVE_BET_AREA](state, { activeAreaIndex: 0 });

      expect(state.betslip.bet_areas.length).to.eql(1);
    });
  });

  describe('DELETE_BET_AREA', () => {
    let removeBetSpy;

    beforeEach(() => {
      removeBetSpy = sinon.spy();
    });

    afterEach(() => {
      removeBetSpy.resetHistory();
    });

    it('should call removeBet method of the betslip', () => {
      const state = { betslip: { removeBet: removeBetSpy, bet_areas: [{}, {}] }, activeAreaIndex: 1 };
      mutations[types.mutations.DELETE_BET_AREA](state, { areaIndex: 0 });

      expect(removeBetSpy.calledWith(0)).to.be.true;
    });

    it('should set activeAreaIndex to 0 if there is only one bet area left', () => {
      const state = { betslip: { removeBet: removeBetSpy, bet_areas: [{}] }, activeAreaIndex: 0 };
      mutations[types.mutations.DELETE_BET_AREA](state);

      expect(state.activeAreaIndex).to.eql(0);
    });

    it('should decrement activeAreaIndex if the removed bet area was before the active one', () => {
      const state = { betslip: { removeBet: removeBetSpy, bet_areas: [{}, {}] }, activeAreaIndex: 1 };
      mutations[types.mutations.DELETE_BET_AREA](state, { areaIndex: 0 });

      expect(state.activeAreaIndex).to.eql(0);
    });

    it('should not decrement activeAreaIndex if the removed bet area was after the active one', () => {
      const state = { betslip: { removeBet: removeBetSpy, bet_areas: [{}, {}] }, activeAreaIndex: 0 };
      mutations[types.mutations.DELETE_BET_AREA](state, { areaIndex: 1 });

      expect(state.activeAreaIndex).to.eql(0);
    });
  });

  describe('CLEAR_ACTIVE_BET_AREA', () => {
    let resetAreaSpy;

    beforeEach(() => {
      resetAreaSpy = sinon.spy();
    });

    afterEach(() => {
      resetAreaSpy.resetHistory();
    });

    it('should call resetArea method of the active bet area', () => {
      const state = { betslip: { bet_areas: [{ resetArea: resetAreaSpy }] }, activeAreaIndex: 0 };
      mutations[types.mutations.CLEAR_ACTIVE_BET_AREA](state);

      expect(resetAreaSpy.called).to.be.true;
    });
  });

  describe('SET_KINO_BONUS_VALUE', () => {
    let refreshValueSpy;
    let betslipRefreshValueSpy;

    beforeEach(() => {
      refreshValueSpy = sinon.spy();
      betslipRefreshValueSpy = sinon.spy();
    });

    afterEach(() => {
      refreshValueSpy.resetHistory();
      betslipRefreshValueSpy.resetHistory();
    });

    it('should set kinoBonusActive to the value', () => {
      const state = {
        betslip: {
          bet_areas: [{ kinoBonusActive: false, refreshValue: refreshValueSpy }],
          refreshValue: betslipRefreshValueSpy,
        },
        activeAreaIndex: 0,
      };
      mutations[types.mutations.SET_KINO_BONUS_VALUE](state, { value: true });

      expect(state.betslip.bet_areas[0].kinoBonusActive).to.be.true;
    });

    it('should call refreshValue method of the active bet area', () => {
      const state = {
        betslip: {
          bet_areas: [{ kinoBonusActive: false, refreshValue: refreshValueSpy }],
          refreshValue: betslipRefreshValueSpy,
        },
        activeAreaIndex: 0,
      };
      mutations[types.mutations.SET_KINO_BONUS_VALUE](state, { value: true });

      expect(refreshValueSpy.called).to.be.true;
    });

    it('should call refreshValue method of the betslip', () => {
      const state = {
        betslip: {
          bet_areas: [{ kinoBonusActive: false, refreshValue: refreshValueSpy }],
          refreshValue: betslipRefreshValueSpy,
        },
        activeAreaIndex: 0,
      };
      mutations[types.mutations.SET_KINO_BONUS_VALUE](state, { value: true });

      expect(betslipRefreshValueSpy.called).to.be.true;
    });
  });

  describe('SET_KINO_CLOSE_2_WIN_VALUE', () => {
    let refreshValueSpy;
    let betslipRefreshValueSpy;

    beforeEach(() => {
      refreshValueSpy = sinon.spy();
      betslipRefreshValueSpy = sinon.spy();
    });

    afterEach(() => {
      refreshValueSpy.resetHistory();
      betslipRefreshValueSpy.resetHistory();
    });

    it('should set kinoClose2WinActive to the value', () => {
      const state = {
        betslip: {
          bet_areas: [{ kinoClose2WinActive: false, refreshValue: refreshValueSpy }],
          refreshValue: betslipRefreshValueSpy,
        },
        activeAreaIndex: 0,
      };
      mutations[types.mutations.SET_KINO_CLOSE_2_WIN_VALUE](state, { value: true });

      expect(state.betslip.bet_areas[0].kinoClose2WinActive).to.be.true;
    });

    it('should call refreshValue method of the active bet area', () => {
      const state = {
        betslip: {
          bet_areas: [{ kinoClose2WinActive: false, refreshValue: refreshValueSpy }],
          refreshValue: betslipRefreshValueSpy,
        },
        activeAreaIndex: 0,
      };
      mutations[types.mutations.SET_KINO_CLOSE_2_WIN_VALUE](state, { value: true });

      expect(refreshValueSpy.called).to.be.true;
    });

    it('should call refreshValue method of the betslip', () => {
      const state = {
        betslip: {
          bet_areas: [{ kinoClose2WinActive: false, refreshValue: refreshValueSpy }],
          refreshValue: betslipRefreshValueSpy,
        },
        activeAreaIndex: 0,
      };
      mutations[types.mutations.SET_KINO_CLOSE_2_WIN_VALUE](state, { value: true });

      expect(betslipRefreshValueSpy.called).to.be.true;
    });
  });

  describe('TOGGLE_MULTIPLIER', () => {
    let toggleMultiplierSpy;

    beforeEach(() => {
      toggleMultiplierSpy = sinon.spy();
    });

    afterEach(() => {
      toggleMultiplierSpy.resetHistory();
    });

    it('should call toggleMultiplier method of the active bet area', () => {
      const state = { betslip: { bet_areas: [{ toggleMultiplier: toggleMultiplierSpy }] }, activeAreaIndex: 0 };
      mutations[types.mutations.TOGGLE_MULTIPLIER](state, { multipliers: [1, 2] });

      expect(toggleMultiplierSpy.calledWith([1, 2])).to.be.true;
    });
  });

  describe('SET_ODD_EVEN', () => {
    let calculateValueSpy;

    beforeEach(() => {
      calculateValueSpy = sinon.spy();
    });

    afterEach(() => {
      calculateValueSpy.resetHistory();
    });

    it('should set oddEven and oddEvenAmount', () => {
      const state = {
        betslip: { oddEvenGame: { oddEven: 'odd', oddEvenAmount: 5, calculateValue: calculateValueSpy } },
      };
      mutations[types.mutations.SET_ODD_EVEN](state, { oddEven: 'even', oddEvenAmount: 10 });

      expect(state.betslip.oddEvenGame.oddEven).to.eql('even');
      expect(state.betslip.oddEvenGame.oddEvenAmount).to.eql(10);
    });

    it('should call calculateValue method of the oddEvenGame', () => {
      const state = {
        betslip: { oddEvenGame: { oddEven: 'odd', oddEvenAmount: 5, calculateValue: calculateValueSpy } },
      };
      mutations[types.mutations.SET_ODD_EVEN](state, { oddEven: 'even', oddEvenAmount: 10 });

      expect(calculateValueSpy.called).to.be.true;
    });
  });

  describe('RESET_ODD_EVEN', () => {
    let resetOddEvenSpy;

    beforeEach(() => {
      resetOddEvenSpy = sinon.spy();
    });

    afterEach(() => {
      resetOddEvenSpy.resetHistory();
    });

    it('should call resetOddEven method of the oddEvenGame', () => {
      const state = { betslip: { oddEvenGame: { resetOddEven: resetOddEvenSpy } } };
      mutations[types.mutations.RESET_ODD_EVEN](state);

      expect(resetOddEvenSpy.called).to.be.true;
    });
  });

  describe('SET_COLUMNS', () => {
    let calculateValueSpy;

    beforeEach(() => {
      calculateValueSpy = sinon.spy();
    });

    afterEach(() => {
      calculateValueSpy.resetHistory();
    });

    it('should set columns and columnsAmount', () => {
      const state = {
        betslip: { columnsGame: { columns: [1, 2], columnsAmount: [5, 10], calculateValue: calculateValueSpy } },
      };
      mutations[types.mutations.SET_COLUMNS](state, { columns: [3, 4], columnsAmount: [15, 20] });

      expect(state.betslip.columnsGame.columns).to.eql([3, 4]);
      expect(state.betslip.columnsGame.columnsAmount).to.eql([15, 20]);
    });

    it('should call calculateValue method of the columnsGame', () => {
      const state = {
        betslip: { columnsGame: { columns: [1, 2], columnsAmount: [5, 10], calculateValue: calculateValueSpy } },
      };
      mutations[types.mutations.SET_COLUMNS](state, { columns: [3, 4], columnsAmount: [15, 20] });

      expect(calculateValueSpy.called).to.be.true;
    });
  });

  describe('RESET_COLUMNS', () => {
    let resetColumnsSpy;

    beforeEach(() => {
      resetColumnsSpy = sinon.spy();
    });

    afterEach(() => {
      resetColumnsSpy.resetHistory();
    });

    it('should call resetColumns method of the columnsGame', () => {
      const state = { betslip: { columnsGame: { resetColumns: resetColumnsSpy } } };
      mutations[types.mutations.RESET_COLUMNS](state);

      expect(resetColumnsSpy.called).to.be.true;
    });
  });

  describe('QUICK_PICK', () => {
    let quickPickNumbersSpy;

    beforeEach(() => {
      quickPickNumbersSpy = sinon.spy();
    });

    afterEach(() => {
      quickPickNumbersSpy.resetHistory();
    });

    it('should call quickPickNumbers method of the active bet area', () => {
      const state = { betslip: { bet_areas: [{ quickPickNumbers: quickPickNumbersSpy }] }, activeAreaIndex: 0 };
      mutations[types.mutations.QUICK_PICK](state, { gameType: 3 });

      expect(quickPickNumbersSpy.calledWith(3)).to.be.true;
    });
  });

  describe('CLEAR_BETSLIP', () => {
    it('should set betslip to a new Betslip instance', () => {
      const state = { betslip: { bet_areas: [{}] }, activeAreaIndex: 1 };
      mutations[types.mutations.CLEAR_BETSLIP](state);

      expect(state.betslip).to.be.an.instanceof(Betslip);
    });

    it('should set activeAreaIndex to 0', () => {
      const state = { betslip: { bet_areas: [{}] }, activeAreaIndex: 1 };
      mutations[types.mutations.CLEAR_BETSLIP](state);

      expect(state.activeAreaIndex).to.eql(0);
    });
  });

  describe('SET_CONSECUTIVE_DRAWS', () => {
    it('should set consecutiveDraws', () => {
      const state = { betslip: { consecutiveDraws: 1 } };
      mutations[types.mutations.SET_CONSECUTIVE_DRAWS](state, { multipleDraws: 2 });

      expect(state.betslip.consecutiveDraws).to.eql(2);
    });
  });
});
