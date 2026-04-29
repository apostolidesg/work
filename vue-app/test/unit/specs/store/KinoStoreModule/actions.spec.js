import actions from '../../../../../src/store/modules/KinoStoreModule/actions';
import types from '../../../../../src/store/modules/KinoStoreModule/types';
import sinon from 'sinon';
import Betslip from '../../../../../src/model/Betslip';

describe('KinoStoreModule actions', () => {
  let commit;
  let dispatch;

  beforeEach(() => {
    commit = sinon.spy();
    dispatch = sinon.spy();
  });

  afterEach(() => {
    commit.resetHistory();
    dispatch.resetHistory();
  });

  describe('SET_BETSLIP', () => {
    it('should call SET_BETSLIP mutation', () => {
      const betslip = sinon.createStubInstance(Betslip);
      actions[types.actions.SET_BETSLIP]({ commit }, { betslip });
      expect(commit.calledWith(types.mutations.SET_BETSLIP, { betslip })).to.be.true;
    });
  });

  describe('TOGGLE_NUMBER', () => {
    it('should call TOGGLE_NUMBER mutation', () => {
      const number = 1;
      actions[types.actions.TOGGLE_NUMBER]({ commit }, { number });
      expect(commit.calledWith(types.mutations.TOGGLE_NUMBER, { number })).to.be.true;
    });
  });

  describe('ADD_BET_AREA', () => {
    it('should call ADD_BET_AREA mutation', () => {
      actions[types.actions.ADD_BET_AREA]({ commit });
      expect(commit.calledWith(types.mutations.ADD_BET_AREA)).to.be.true;
    });
  });

  describe('CHANGE_ACTIVE_BET_AREA', () => {
    it('should call CHANGE_ACTIVE_BET_AREA mutation', () => {
      const activeAreaIndex = 1;
      actions[types.actions.CHANGE_ACTIVE_BET_AREA]({ commit }, { activeAreaIndex });
      expect(commit.calledWith(types.mutations.CHANGE_ACTIVE_BET_AREA, { activeAreaIndex })).to.be.true;
    });
  });

  describe('DELETE_BET_AREA', () => {
    it('should call DELETE_BET_AREA mutation', () => {
      const areaIndex = 1;
      actions[types.actions.DELETE_BET_AREA]({ commit }, { areaIndex });
      expect(commit.calledWith(types.mutations.DELETE_BET_AREA, { areaIndex })).to.be.true;
    });
  });

  describe('CLEAR_ACTIVE_BET_AREA', () => {
    it('should call CLEAR_ACTIVE_BET_AREA mutation', () => {
      actions[types.actions.CLEAR_ACTIVE_BET_AREA]({ commit });
      expect(commit.calledWith(types.mutations.CLEAR_ACTIVE_BET_AREA)).to.be.true;
    });
  });

  describe('SET_KINO_BONUS_VALUE', () => {
    it('should call SET_KINO_BONUS_VALUE mutation', () => {
      const value = true;
      actions[types.actions.SET_KINO_BONUS_VALUE]({ commit }, { value });
      expect(commit.calledWith(types.mutations.SET_KINO_BONUS_VALUE, { value })).to.be.true;
    });
  });

  describe('SET_KINO_CLOSE_2_WIN_VALUE', () => {
    it('should call SET_KINO_CLOSE_2_WIN_VALUE mutation', () => {
      const value = true;
      actions[types.actions.SET_KINO_CLOSE_2_WIN_VALUE]({ commit }, { value });
      expect(commit.calledWith(types.mutations.SET_KINO_CLOSE_2_WIN_VALUE, { value })).to.be.true;
    });
  });

  describe('TOGGLE_MULTIPLIER', () => {
    it('should call TOGGLE_MULTIPLIER mutation', () => {
      const multipliers = [1, 2];
      actions[types.actions.TOGGLE_MULTIPLIER]({ commit }, { multipliers });
      expect(commit.calledWith(types.mutations.TOGGLE_MULTIPLIER, { multipliers })).to.be.true;
    });
  });

  describe('SET_ODD_EVEN', () => {
    it('should call SET_ODD_EVEN mutation', () => {
      const oddEvenModel = { oddEven: 'odd', oddEvenAmount: 1 };
      actions[types.actions.SET_ODD_EVEN]({ commit }, oddEvenModel);
      expect(commit.calledWith(types.mutations.SET_ODD_EVEN, oddEvenModel)).to.be.true;
    });
  });

  describe('RESET_ODD_EVEN', () => {
    it('should call RESET_ODD_EVEN mutation', () => {
      actions[types.actions.RESET_ODD_EVEN]({ commit });
      expect(commit.calledWith(types.mutations.RESET_ODD_EVEN)).to.be.true;
    });
  });

  describe('SET_COLUMNS', () => {
    it('should call SET_COLUMNS mutation', () => {
      const columnsModel = { columns: [1], columnsAmount: [1] };
      actions[types.actions.SET_COLUMNS]({ commit }, columnsModel);
      expect(commit.calledWith(types.mutations.SET_COLUMNS, columnsModel)).to.be.true;
    });
  });

  describe('RESET_COLUMNS', () => {
    it('should call RESET_COLUMNS mutation', () => {
      actions[types.actions.RESET_COLUMNS]({ commit });
      expect(commit.calledWith(types.mutations.RESET_COLUMNS)).to.be.true;
    });
  });

  describe('QUICK_PICK', () => {
    it('should call QUICK_PICK mutation', () => {
      const gameType = 2;
      actions[types.actions.QUICK_PICK]({ commit }, { gameType });
      expect(commit.calledWith(types.mutations.QUICK_PICK, { gameType })).to.be.true;
    });
  });

  describe('CLEAR_BETSLIP', () => {
    it('should call CLEAR_BETSLIP mutation', () => {
      actions[types.actions.CLEAR_BETSLIP]({ commit });
      expect(commit.calledWith(types.mutations.CLEAR_BETSLIP)).to.be.true;
    });
  });

  describe('SET_CONSECUTIVE_DRAWS', () => {
    it('should call SET_CONSECUTIVE_DRAWS mutation', () => {
      const multipleDraws = 2;
      actions[types.actions.SET_CONSECUTIVE_DRAWS]({ commit }, { multipleDraws });
      expect(commit.calledWith(types.mutations.SET_CONSECUTIVE_DRAWS, { multipleDraws })).to.be.true;
    });
  });
});
