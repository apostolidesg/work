import { expect } from 'chai';
import Betslip from '../../../../../src/model/powerspin/Betslip';
import actions from '../../../../../src/store/modules/PowerspinBetslipStoreModule/actions';
import types from '../../../../../src/store/modules/PowerspinBetslipStoreModule/types';
import powerspinConstants from '../../../../../src/util/powerspinConstants';
import sinon from 'sinon';

describe('Powerspin Betslip Store Module Actions', () => {
  let commit;

  beforeEach(() => {
    commit = sinon.spy();
  });

  afterEach(() => {
    commit.resetHistory();
  });

  describe('ADD_BETSLIP', () => {
    it('should commit the mutation passing the betslip', () => {
      const betslip = sinon.createStubInstance(Betslip);

      actions[types.actions.ADD_BETSLIP]({ commit }, { betslip });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.ADD_BETSLIP);
      expect(commit.getCall(0).args[1].betslip).to.eq(betslip);
    });
  });

  describe('UPDATE_BETSLIP', () => {
    it('should commit the mutation passing the betslip', () => {
      const betslip = sinon.createStubInstance(Betslip);

      actions[types.actions.UPDATE_BETSLIP]({ commit }, { betslip });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.UPDATE_BETSLIP);
      expect(commit.getCall(0).args[1].betslip).to.eq(betslip);
    });
  });

  describe('REMOVE_BETSLIP', () => {
    it('should commit the mutation passing the betslipIndex', () => {
      actions[types.actions.REMOVE_BETSLIP]({ commit }, { betslipIndex: 0 });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.REMOVE_BETSLIP);
      expect(commit.getCall(0).args[1]).to.eql({ betslipIndex: 0 });
    });
  });

  describe('ADD_WHEEL', () => {
    it('should commit the mutation', () => {
      actions[types.actions.ADD_WHEEL]({ commit });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.ADD_WHEEL);
    });
  });

  describe('REMOVE_WHEEL', () => {
    it('should commit the mutation passing the wheelIndex', () => {
      actions[types.actions.REMOVE_WHEEL]({ commit }, { wheelIndex: 0 });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.REMOVE_WHEEL);
      expect(commit.getCall(0).args[1]).to.eql({ wheelIndex: 0 });
    });
  });

  describe('SET_BETSLIP_CONSECUTIVE_DRAWS', () => {
    it('should commit the mutation passing the default multipleDraws', () => {
      actions[types.actions.SET_BETSLIP_CONSECUTIVE_DRAWS]({ commit });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS);
      expect(commit.getCall(0).args[1]).to.eql({ multipleDraws: 1 });
    });

    it('should commit the mutation passing the multipleDraws', () => {
      actions[types.actions.SET_BETSLIP_CONSECUTIVE_DRAWS]({ commit }, { multipleDraws: 5 });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS);
      expect(commit.getCall(0).args[1]).to.eql({ multipleDraws: 5 });
    });
  });

  describe('SET_REQUESTED_NUMBER', () => {
    it('should not commit the mutation if the number is invalid', () => {
      actions[types.actions.SET_REQUESTED_NUMBER]({ commit }, { wheelIndex: 0, number: 100 });

      expect(commit.called).to.be.false;
    });

    it('should commit the mutation passing the wheel index and the number', () => {
      actions[types.actions.SET_REQUESTED_NUMBER]({ commit }, { wheelIndex: 0, number: 4 });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.SET_REQUESTED_NUMBER);
      expect(commit.getCall(0).args[1]).to.eql({ wheelIndex: 0, number: 4 });
    });
  });

  describe('SET_COLUMN_NUMBER', () => {
    it('should commit the mutation passing the wheel index and the number', () => {
      actions[types.actions.SET_COLUMN_NUMBER]({ commit }, { wheelIndex: 0, number: 4 });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.SET_COLUMN_NUMBER);
      expect(commit.getCall(0).args[1]).to.eql({ wheelIndex: 0, number: 4 });
    });
  });

  describe('QUICK_PICK_CLICKED', () => {
    it('should commit the mutation passing the wheel index', () => {
      actions[types.actions.QUICK_PICK_CLICKED]({ commit }, { wheelIndex: 0 });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.TOGGLE_QUICK_PICK);
      expect(commit.getCall(0).args[1]).to.eql({ wheelIndex: 0 });
    });
  });

  describe('RESET_BETSLIPS', () => {
    it('should commit the mutation', () => {
      actions[types.actions.RESET_BETSLIPS]({ commit });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.RESET_BETSLIPS);
    });
  });

  describe('RESET_WHEEL', () => {
    it('should commit the mutation passing the wheel index', () => {
      actions[types.actions.RESET_WHEEL]({ commit }, { wheelIndex: 0 });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.RESET_WHEEL);
      expect(commit.getCall(0).args[1]).to.eql({ wheelIndex: 0 });
    });
  });

  describe('RESET_WHEELS', () => {
    it('should commit the mutation passing the betslip index', () => {
      actions[types.actions.RESET_WHEELS]({ commit }, { betslipIndex: 0 });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.RESET_WHEELS);
      expect(commit.getCall(0).args[1]).to.eql({ betslipIndex: 0 });
    });
  });

  describe('RESET_CATEGORY', () => {
    it('should commit the mutation passing the category', () => {
      actions[types.actions.RESET_CATEGORY](
        { commit },
        { betslipIndex: 0, categoryType: powerspinConstants.GAME_CATEGORY.OVER_UNDER }
      );

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.RESET_CATEGORY);
      expect(commit.getCall(0).args[1]).to.eql({
        betslipIndex: 0,
        wheelIndex: 0,
        categoryType: powerspinConstants.GAME_CATEGORY.OVER_UNDER,
      });
    });
  });

  describe('TOGGLE_GAME_TYPE', () => {
    it('should commit the mutation passing the wheel index and the game type', () => {
      actions[types.actions.TOGGLE_GAME_TYPE](
        { commit },
        { wheelIndex: 0, gameType: powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN }
      );

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.TOGGLE_GAME_TYPE);
      expect(commit.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        gameType: powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
      });
    });
  });

  describe('TOGGLE_MULTIPLIERS', () => {
    it('should commit the mutation passing the wheel index, the game category and the multipliers', () => {
      actions[types.actions.TOGGLE_MULTIPLIERS](
        { commit },
        { wheelIndex: 0, gameCategory: powerspinConstants.GAME_CATEGORY.OVER_UNDER, multipliers: [1, 2] }
      );

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.TOGGLE_MULTIPLIERS);
      expect(commit.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        gameCategory: powerspinConstants.GAME_CATEGORY.OVER_UNDER,
        multipliers: [1, 2],
      });
    });
  });

  describe('TOGGLE_BETSLIP_COMBO_MULTIPLIERS', () => {
    it('should commit the mutation passing the the multipliers', () => {
      actions[types.actions.TOGGLE_BETSLIP_COMBO_MULTIPLIERS]({ commit }, { multipliers: [1, 2] });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.TOGGLE_BETSLIP_COMBO_MULTIPLIERS);
      expect(commit.getCall(0).args[1]).to.eql({ multipliers: [1, 2] });
    });
  });

  describe('RESET_MARKETS', () => {
    it('should commit the mutation', () => {
      actions[types.actions.RESET_MARKETS]({ commit });

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.RESET_MARKETS);
    });
  });

  describe('RESET_MARKETS_CATEGORY', () => {
    it('should commit the mutation passing the category', () => {
      actions[types.actions.RESET_MARKETS_CATEGORY](
        { commit },
        { betslipIndex: 0, categoryType: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL }
      );

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.RESET_MARKETS_CATEGORY);
      expect(commit.getCall(0).args[1]).to.eql({
        betslipIndex: 0,
        categoryType: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
      });
    });
  });

  describe('SET_MARKETS_NUMBER_ON_ANY_WHEEL', () => {
    it('should commit the mutation passing the number', () => {
      actions[types.actions.SET_MARKETS_NUMBER_ON_ANY_WHEEL]({ commit }, 4);

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.SET_MARKETS_NUMBER_ON_ANY_WHEEL);
      expect(commit.getCall(0).args[1]).to.eql(4);
    });
  });

  describe('TOGGLE_MARKET_GAME_TYPE', () => {
    it('should commit the mutation passing the game type', () => {
      actions[types.actions.TOGGLE_MARKET_GAME_TYPE](
        { commit },
        powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL
      );

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.TOGGLE_MARKET_GAME_TYPE);
      expect(commit.getCall(0).args[1]).to.eql(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL);
    });
  });

  describe('TOGGLE_MARKET_MULTIPLIERS', () => {
    it('should commit the mutation passing the game category and the multipliers', () => {
      actions[types.actions.TOGGLE_MARKET_MULTIPLIERS](
        { commit },
        { gameCategory: powerspinConstants.GAME_CATEGORY.OVER_UNDER, multipliers: 2 }
      );

      expect(commit.calledOnce).to.be.true;
      expect(commit.getCall(0).args[0]).to.eq(types.mutations.TOGGLE_MARKET_MULTIPLIERS);
      expect(commit.getCall(0).args[1]).to.eql({
        gameCategory: powerspinConstants.GAME_CATEGORY.OVER_UNDER,
        multipliers: 2,
      });
    });
  });
});
