import getters from '../../../../../src/store/modules/EurojackpotStoreModule/getters';
import types from '../../../../../src/store/modules/EurojackpotStoreModule/types';
import sinon from 'sinon';
import EurojackpotBetslipUtilities from '../../../../../src/util/eurojackpotBetslipUtilities';
import eurojackpotConstants from '../../../../../src/util/eurojackpotConstants';

describe('EurojackpotStoreModule getters', () => {
  describe('GET_BETSLIP', () => {
    it('should return betslip', () => {
      const betslip = { wager: { boards: [] } };
      const state = { betslip };
      const result = getters[types.getters.GET_BETSLIP](state);

      expect(result).to.eql(betslip);
    });
  });

  describe('GET_SELECTED_BOARD_INDEX', () => {
    it('should return selectedBoardIndex', () => {
      const selectedBoardIndex = 1;
      const state = { selectedBoardIndex };
      const result = getters[types.getters.GET_SELECTED_BOARD_INDEX](state);

      expect(result).to.eq(selectedBoardIndex);
    });
  });

  describe('GET_SELECTED_BOARD', () => {
    it('should return selected board', () => {
      const selectedBoardIndex = 1;
      const betslip = { wager: { boards: [{}, {}] } };
      const state = { selectedBoardIndex, betslip };
      const result = getters[types.getters.GET_SELECTED_BOARD](state);

      expect(result).to.eql(betslip.wager.boards[selectedBoardIndex]);
    });
  });

  describe('GET_BETSLIP_CONSECUTIVE_DRAWS', () => {
    it('should return betslip consecutive draws', () => {
      const betslip = { wager: { participatingDraws: { multipleDraws: 2 } } };
      const state = { betslip };
      const result = getters[types.getters.GET_BETSLIP_CONSECUTIVE_DRAWS](state);

      expect(result).to.eq(2);
    });
  });

  describe('GET_BOARD_COST', () => {
    let sandbox;
    let calculateBoardCostStub;
    const rootGetters = { 'CONFIGURATION_STORE_MODULE/GET_EUROJACKPOT_COLUMN_PRICE': 2 };

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      calculateBoardCostStub = sandbox.stub(EurojackpotBetslipUtilities, 'calculateBoardCost');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return board cost', () => {
      calculateBoardCostStub.returns(2);
      const board = { isValid: () => true };
      const betslip = { wager: { boards: [board] } };
      const state = { betslip };
      const index = 0;
      const result = getters[types.getters.GET_BOARD_COST](state, null, null, rootGetters)({ index });

      expect(result).to.eq(2);
      expect(calculateBoardCostStub.getCall(0).args[0]).to.eq(board);
      expect(calculateBoardCostStub.getCall(0).args[1]).to.eq(2);
    });

    it('should return 0 if board is not valid', () => {
      calculateBoardCostStub.returns(1);
      const board = { isValid: () => false };
      const betslip = { wager: { boards: [board] } };
      const state = { betslip };
      const index = 0;
      const result = getters[types.getters.GET_BOARD_COST](state, null, null, rootGetters)({ index });

      expect(result).to.eq(0);
      expect(calculateBoardCostStub.called).to.be.false;
    });
  });

  describe('GET_BETSLIP_COST', () => {
    let sandbox;
    let calculateBoardCostStub;
    const rootGetters = { 'CONFIGURATION_STORE_MODULE/GET_EUROJACKPOT_COLUMN_PRICE': 2 };

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      calculateBoardCostStub = sandbox.stub(EurojackpotBetslipUtilities, 'calculateBoardCost');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return betslip cost', () => {
      calculateBoardCostStub.returns(1);
      const betslip = {
        wager: { boards: [{ isValid: () => true }, { isValid: () => true }], participatingDraws: { multipleDraws: 2 } },
      };
      const state = { betslip };
      const result = getters[types.getters.GET_BETSLIP_COST](state, null, null, rootGetters);

      expect(result).to.eq(4);
      expect(calculateBoardCostStub.getCall(0).args[0]).to.eq(betslip.wager.boards[0]);
      expect(calculateBoardCostStub.getCall(0).args[1]).to.eq(2);
      expect(calculateBoardCostStub.getCall(1).args[0]).to.eq(betslip.wager.boards[1]);
      expect(calculateBoardCostStub.getCall(1).args[1]).to.eq(2);
    });

    it('should return 0 if betslip is empty', () => {
      calculateBoardCostStub.returns(1);
      const betslip = { wager: { boards: [], participatingDraws: { multipleDraws: 1 } } };
      const state = { betslip };
      const result = getters[types.getters.GET_BETSLIP_COST](state, null, null, rootGetters);

      expect(result).to.eq(0);
      expect(calculateBoardCostStub.called).to.be.false;
    });

    it('should use only valid boards', () => {
      calculateBoardCostStub.returns(1);
      const betslip = {
        wager: {
          boards: [{ isValid: () => true }, { isValid: () => false }],
          participatingDraws: { multipleDraws: 2 },
        },
      };
      const state = { betslip };
      const result = getters[types.getters.GET_BETSLIP_COST](state, null, null, rootGetters);

      expect(result).to.eq(2);
      expect(calculateBoardCostStub.getCall(0).args[0]).to.eq(betslip.wager.boards[0]);
      expect(calculateBoardCostStub.getCall(0).args[1]).to.eq(2);
      expect(calculateBoardCostStub.calledOnce).to.be.true;
    });
  });

  describe('GET_IS_BETSLIP_VALID', () => {
    it('should return true if all boards are valid', () => {
      const betslip = { wager: { boards: [{ isValid: () => true }, { isValid: () => true }] } };
      const state = { betslip };
      const result = getters[types.getters.GET_IS_BETSLIP_VALID](state);

      expect(result).to.be.true;
    });

    it('should return false if any board is not valid', () => {
      const betslip = {
        wager: {
          boards: [{ isValid: () => true }, { isValid: () => false }],
        },
      };
      const state = { betslip };
      const result = getters[types.getters.GET_IS_BETSLIP_VALID](state);

      expect(result).to.be.false;
    });
  });

  describe('GET_IS_BETSLIP_EMPTY', () => {
    it('should return true if betslip is empty', () => {
      const betslip = { isEmpty: () => true };
      const state = { betslip };
      const result = getters[types.getters.GET_IS_BETSLIP_EMPTY](state);

      expect(result).to.be.true;
    });

    it('should return false if betslip is not empty', () => {
      const betslip = { isEmpty: () => false };
      const state = { betslip };
      const result = getters[types.getters.GET_IS_BETSLIP_EMPTY](state);

      expect(result).to.be.false;
    });
  });

  describe('GET_DRAW_DAYS', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(eurojackpotConstants, 'DRAW_DAYS').value([1, 2, 3]);
    });

    it('should return draw days from configuration store module', () => {
      const drawDays = [2, 5];
      const rootGetters = { 'CONFIGURATION_STORE_MODULE/GET_EUROJACKPOT_DRAW_DAYS': drawDays };
      const result = getters[types.getters.GET_DRAW_DAYS](null, null, null, rootGetters);

      expect(result).to.eq(drawDays);
    });

    it('should return default draw days if configuration store module does not have draw days', () => {
      const rootGetters = { 'CONFIGURATION_STORE_MODULE/GET_EUROJACKPOT_DRAW_DAYS': null };
      const result = getters[types.getters.GET_DRAW_DAYS](null, null, null, rootGetters);

      expect(result).to.eql([1, 2, 3]);
    });
  });

  describe('GET_ACTIVE_DRAW_TIME', () => {
    it('should return active draw time', () => {
      const activeDrawTime = 123;
      const state = { activeDrawTime };
      const result = getters[types.getters.GET_ACTIVE_DRAW_TIME](state);

      expect(result).to.eq(activeDrawTime);
    });
  });

  describe('GET_ACTIVE_DRAW_ID', () => {
    it('should return active draw id', () => {
      const activeDrawId = 123;
      const state = { activeDrawId };
      const result = getters[types.getters.GET_ACTIVE_DRAW_ID](state);

      expect(result).to.eq(activeDrawId);
    });
  });

  describe('GET_SALES_CLOSE_TIME', () => {
    it('should return sales close time', () => {
      const salesCloseTime = 123;
      const state = { salesCloseTime };
      const result = getters[types.getters.GET_SALES_CLOSE_TIME](state);

      expect(result).to.eq(salesCloseTime);
    });
  });

  describe('GET_JACKPOT_AMOUNT', () => {
    it('should return jackpot amount if sales are open', () => {
      const jackpotAmount = 123;
      const state = { jackpotAmount, salesStatus: eurojackpotConstants.DRAW_STATUS.SALES_OPEN };
      const result = getters[types.getters.GET_JACKPOT_AMOUNT](state);

      expect(result).to.eq(jackpotAmount);
    });

    it('should return null if sales are not open', () => {
      const jackpotAmount = 123;
      const state = { jackpotAmount, salesStatus: eurojackpotConstants.DRAW_STATUS.SALES_CLOSED };
      const result = getters[types.getters.GET_JACKPOT_AMOUNT](state);

      expect(result).to.be.null;
    });
  });

  describe('GET_IS_SALES_OPEN', () => {
    it('should return true if sales are open', () => {
      const state = { salesStatus: eurojackpotConstants.DRAW_STATUS.SALES_OPEN };
      const result = getters[types.getters.GET_IS_SALES_OPEN](state);

      expect(result).to.be.true;
    });

    it('should return false if sales are not open', () => {
      const state = { salesStatus: eurojackpotConstants.DRAW_STATUS.SALES_CLOSED };
      const result = getters[types.getters.GET_IS_SALES_OPEN](state);

      expect(result).to.be.false;
    });
  });

  describe('GET_IS_SALES_CLOSED', () => {
    it('should return true if sales are closed', () => {
      const state = { salesStatus: eurojackpotConstants.DRAW_STATUS.SALES_CLOSED };
      const result = getters[types.getters.GET_IS_SALES_CLOSED](state);

      expect(result).to.be.true;
    });

    it('should return false if sales are not closed', () => {
      const state = { salesStatus: eurojackpotConstants.DRAW_STATUS.SALES_OPEN };
      const result = getters[types.getters.GET_IS_SALES_CLOSED](state);

      expect(result).to.be.false;
    });
  });
});
