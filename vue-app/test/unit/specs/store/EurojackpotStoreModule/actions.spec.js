import actions from '../../../../../src/store/modules/EurojackpotStoreModule/actions';
import types from '../../../../../src/store/modules/EurojackpotStoreModule/types';
import Betslip from '../../../../../src/model/eurojackpot/Betslip';
import sinon from 'sinon';
import retryAxiosInstance from '../../../../../src/util/RetryAxios';
import EurojackpotBetslipUtilities from '../../../../../src/util/eurojackpotBetslipUtilities';

describe('EurojackpotGameStoreModule actions', () => {
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

  describe('ADD_BETSLIP', () => {
    it('should commit ADD_BETSLIP mutation', () => {
      const betslip = sinon.createStubInstance(Betslip);
      actions[types.actions.ADD_BETSLIP]({ commit }, { betslip });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.SET_BETSLIP);
      expect(commit.args[0][1]).to.eql({ betslip });
    });
  });

  describe('SET_SELECTED_BOARD_INDEX', () => {
    it('should commit SET_SELECTED_BOARD_INDEX mutation', () => {
      const selectedBoardIndex = 1;
      actions[types.actions.SET_SELECTED_BOARD_INDEX]({ commit }, { selectedBoardIndex });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.SET_SELECTED_BOARD_INDEX);
      expect(commit.args[0][1]).to.eql({ selectedBoardIndex });
    });
  });

  describe('SET_BETSLIP_CONSECUTIVE_DRAWS', () => {
    it('should commit SET_BETSLIP_CONSECUTIVE_DRAWS mutation', () => {
      const multipleDraws = 2;
      actions[types.actions.SET_BETSLIP_CONSECUTIVE_DRAWS]({ commit }, { multipleDraws });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS);
      expect(commit.args[0][1]).to.eql({ multipleDraws });
    });
  });

  describe('ADD_BOARD', () => {
    it('should commit ADD_BOARD mutation', () => {
      actions[types.actions.ADD_BOARD]({ commit });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.ADD_BOARD);
    });
  });

  describe('REMOVE_BOARD', () => {
    it('should commit REMOVE_BOARD mutation', () => {
      const boardIndex = 1;
      actions[types.actions.REMOVE_BOARD]({ commit }, { boardIndex });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.REMOVE_BOARD);
      expect(commit.args[0][1]).to.eql({ boardIndex });
    });
  });

  describe('CLEAR_SELECTED_BOARD', () => {
    it('should commit CLEAR_SELECTED_BOARD mutation', () => {
      actions[types.actions.CLEAR_SELECTED_BOARD]({ commit });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.CLEAR_SELECTED_BOARD);
    });
  });

  describe('TOGGLE_QUICK_PICK', () => {
    it('should commit TOGGLE_QUICK_PICK mutation', () => {
      actions[types.actions.TOGGLE_QUICK_PICK]({ commit });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.TOGGLE_QUICK_PICK);
    });
  });

  describe('SET_MAIN_SELECTION', () => {
    it('should commit SET_MAIN_SELECTION mutation', () => {
      const mainSelection = 1;
      actions[types.actions.SET_MAIN_SELECTION]({ commit }, { mainSelection });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.SET_MAIN_SELECTION);
      expect(commit.args[0][1]).to.eql({ mainSelection });
    });
  });

  describe('SET_EURO_SELECTION', () => {
    it('should commit SET_EURO_SELECTION mutation', () => {
      const euroSelection = 1;
      actions[types.actions.SET_EURO_SELECTION]({ commit }, { euroSelection });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.SET_EURO_SELECTION);
      expect(commit.args[0][1]).to.eql({ euroSelection });
    });
  });

  describe('SET_SYSTEM', () => {
    it('should commit SET_SYSTEM mutation', () => {
      const systemId = 45;
      actions[types.actions.SET_SYSTEM]({ commit }, { systemId });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.SET_SYSTEM);
      expect(commit.args[0][1]).to.eql({ systemId });
    });
  });

  describe('RESET_BETSLIP', () => {
    it('should commit RESET_BETSLIP mutation', () => {
      actions[types.actions.RESET_BETSLIP]({ commit });

      expect(commit.calledOnce).to.be.true;
      expect(commit.args[0][0]).to.eq(types.mutations.RESET_BETSLIP);
    });
  });

  describe('GET_DRAW_INFO', () => {
    let clock;
    let clearTimeoutSpy;
    let setTimeoutSpy;
    let axiosStub;
    let getDrawStatusStub;
    let getFirstDrawStatusStub;

    const rootGetters = {
      'CONFIGURATION_STORE_MODULE/GET_DRAW_API_HOST': 'draw.api.host',
      'CONFIGURATION_STORE_MODULE/GET_EJP_SALES_OPEN_TIME': { HOURS: 23, MINUTES: 0 },
    };

    const NOW = 100;

    beforeEach(() => {
      clock = sinon.useFakeTimers({ now: NOW });
      clearTimeoutSpy = sinon.spy(clock, 'clearTimeout');
      setTimeoutSpy = sinon.spy(clock, 'setTimeout');
      axiosStub = sinon.stub(retryAxiosInstance, 'get');
      getDrawStatusStub = sinon.stub(EurojackpotBetslipUtilities, 'getDrawStatusFromResponse');
      getFirstDrawStatusStub = sinon.stub(EurojackpotBetslipUtilities, 'getStatusForFirstDraw');
    });

    afterEach(() => {
      clock.restore();
      clearTimeoutSpy.resetHistory();
      setTimeoutSpy.resetHistory();
      axiosStub.restore();
      getDrawStatusStub.restore();
      getFirstDrawStatusStub.restore();
    });

    it('should dispatch CLEAR_TIMER', async () => {
      axiosStub.resolves({ data: { active: { drawId: 1, drawTime: 1 } } });
      await actions[types.actions.GET_DRAW_INFO]({ commit, rootGetters, dispatch });

      expect(dispatch.args[0][0]).to.eq(types.actions.CLEAR_TIMER);
    });

    it('should call the draw api with the correct url', async () => {
      const url = `https://draw.api.host/5149/last-result-and-active`;
      axiosStub.resolves({ data: { active: { drawId: 1, drawTime: 1 } } });
      await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

      expect(axiosStub.calledOnce).to.be.true;
      expect(axiosStub.args[0][0]).to.eq(url);
    });

    it('should call the getDrawStatusFromResponse with the correct arguments', async () => {
      axiosStub.resolves({ data: { last: { drawId: 1 }, active: { drawId: 2, drawTime: 10 } } });
      await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

      expect(getDrawStatusStub.calledOnce).to.be.true;
      expect(getDrawStatusStub.args[0][0]).to.eql({ last: { drawId: 1 }, active: { drawId: 2, drawTime: 10 } });
      expect(getDrawStatusStub.args[0][1]).to.eql({ hours: 23, minutes: 0 });
    });

    it('should dispatch SET_SALES_OPEN if the draw status is sales open', async () => {
      getDrawStatusStub.returns('SALES_OPEN');
      axiosStub.resolves({ data: { last: { drawId: 1 }, active: { drawId: 2, drawTime: 10 } } });
      await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

      expect(dispatch.args[1][0]).to.eq(types.actions.SET_SALES_OPEN);
      expect(dispatch.args[1][1]).to.eql({ apiResponse: { last: { drawId: 1 }, active: { drawId: 2, drawTime: 10 } } });
    });

    it('should dispatch SET_SALES_CLOSED if the draw status is sales closed', async () => {
      getDrawStatusStub.returns('SALES_CLOSED');
      axiosStub.resolves({ data: { last: { drawId: 1 }, active: { drawId: 2, drawTime: 10 } } });
      await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

      expect(dispatch.args[1][0]).to.eq(types.actions.SET_SALES_CLOSED);
    });

    it('should commit SET_SALES_CLOSED if the api call fails', async () => {
      axiosStub.rejects();
      await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

      expect(commit.args[0][0]).to.eq(types.mutations.SET_SALES_CLOSED);
    });

    it('should schedule a new timeout if the api call fails', async () => {
      axiosStub.rejects();
      await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

      expect(setTimeoutSpy.calledOnce).to.be.true;
      expect(setTimeoutSpy.args[0][1]).to.eq(1800000);
    });

    it('should call GET_DRAW_INFO again after the timeout', async () => {
      axiosStub.rejects();
      await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

      clock.tick(NOW + 1800000);

      expect(dispatch.args[1][0]).to.eq(types.actions.GET_DRAW_INFO);
    });

    describe('when the first draw is active and the last is null', () => {
      it('should call the getFirstDrawStatus with the correct arguments', async () => {
        axiosStub.resolves({ data: { active: { drawId: 1, drawTime: 10, drawBreak: 2 } } });
        await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

        expect(getFirstDrawStatusStub.calledOnce).to.be.true;
        expect(getFirstDrawStatusStub.args[0][0]).to.eql({ drawId: 1, drawTime: 10, drawBreak: 2 });
      });

      it('should dispatch SET_SALES_OPEN if the draw status is sales open', async () => {
        getFirstDrawStatusStub.returns('SALES_OPEN');
        axiosStub.resolves({ data: { active: { drawId: 1, drawTime: 10, drawBreak: 2 } } });
        await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

        expect(dispatch.args[1][0]).to.eq(types.actions.SET_SALES_OPEN);
        expect(dispatch.args[1][1]).to.eql({ apiResponse: { active: { drawId: 1, drawTime: 10, drawBreak: 2 } } });
      });

      it('should dispatch SET_SALES_CLOSED if the draw status is sales closed', async () => {
        getFirstDrawStatusStub.returns('SALES_CLOSED');
        axiosStub.resolves({ data: { active: { drawId: 1, drawTime: 10, drawBreak: 2 } } });
        await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

        expect(dispatch.args[1][0]).to.eq(types.actions.SET_SALES_CLOSED);
      });

      it('should NOT call the getDrawStatusFromResponse', async () => {
        getFirstDrawStatusStub.returns('SALES_CLOSED');
        axiosStub.resolves({ data: { active: { drawId: 1, drawTime: 10, drawBreak: 2 } } });
        await actions[types.actions.GET_DRAW_INFO]({ commit, state: {}, rootGetters, dispatch });

        expect(getDrawStatusStub.calledOnce).to.be.false;
      });
    });
  });

  describe('SET_SALES_OPEN', () => {
    let clock;
    let clearTimeoutSpy;
    let setTimeoutSpy;

    const NOW = 100;

    beforeEach(() => {
      clock = sinon.useFakeTimers({ now: NOW });
      clearTimeoutSpy = sinon.spy(clock, 'clearTimeout');
      setTimeoutSpy = sinon.spy(clock, 'setTimeout');
    });

    afterEach(() => {
      clock.restore();
      clearTimeoutSpy.resetHistory();
      setTimeoutSpy.resetHistory();
    });

    it('should commit SET_SALES_OPEN mutation', () => {
      const apiResponse = {
        last: { drawId: 1 },
        active: { drawId: 2, drawTime: 200, drawBreak: 10, prizeCategories: [{ jackpot: 10 }] },
      };
      actions[types.actions.SET_SALES_OPEN]({ commit }, { apiResponse });

      expect(commit.args[0][0]).to.eq(types.mutations.SET_SALES_OPEN);
      expect(commit.args[0][1]).to.eql({
        activeDrawId: 2,
        activeDrawTime: 200,
        salesCloseTime: 190,
        jackpot: 10,
      });
    });

    it('should schedule a new timeout to transition to SALES_CLOSED', () => {
      const apiResponse = {
        last: { drawId: 1 },
        active: { drawId: 2, drawTime: 200, drawBreak: 10, prizeCategories: [{ jackpot: 10 }] },
      };
      actions[types.actions.SET_SALES_OPEN]({ commit }, { apiResponse });

      expect(setTimeoutSpy.calledOnce).to.be.true;
      expect(setTimeoutSpy.args[0][1]).to.eq(200 - 10 - NOW);
    });

    it('should dispach SET_SALES_CLOSED after the timeout', () => {
      const apiResponse = {
        last: { drawId: 1 },
        active: { drawId: 2, drawTime: 200, drawBreak: 10, prizeCategories: [{ jackpot: 10 }] },
      };
      actions[types.actions.SET_SALES_OPEN]({ commit, dispatch }, { apiResponse });

      clock.tick(200 - 10 - NOW);

      expect(dispatch.args[1][0]).to.eq(types.mutations.SET_SALES_CLOSED);
    });

    it('should save the timeout id', () => {
      const apiResponse = {
        last: { drawId: 1 },
        active: { drawId: 2, drawTime: 200, drawBreak: 10, prizeCategories: [{ jackpot: 10 }] },
      };
      actions[types.actions.SET_SALES_OPEN]({ commit }, { apiResponse });

      expect(commit.args[1][0]).to.eq(types.mutations.SET_ACTIVE_DRAW_API_TIMEOUT);
    });

    it('should dispatch a GET_STATISTICS action', () => {
      const apiResponse = {
        last: { drawId: 1 },
        active: { drawId: 2, drawTime: 200, drawBreak: 10, prizeCategories: [{ jackpot: 10 }] },
      };
      actions[types.actions.SET_SALES_OPEN]({ commit, dispatch }, { apiResponse });

      expect(dispatch.args[0][0]).to.eq(types.actions.GET_STATISTICS);
    });

    describe('when the prizeCategories is undefined', () => {
      it('should commit SET_SALES_OPEN mutation with jackpod as 0', () => {
        const apiResponse = {
          last: { drawId: 1 },
          active: { drawId: 2, drawTime: 200, drawBreak: 10 },
        };
        actions[types.actions.SET_SALES_OPEN]({ commit }, { apiResponse });

        expect(commit.args[0][0]).to.eq(types.mutations.SET_SALES_OPEN);
        expect(commit.args[0][1]).to.eql({
          activeDrawId: 2,
          activeDrawTime: 200,
          salesCloseTime: 190,
          jackpot: 0,
        });
      });

      it('should schedule a new timeout to get draw info again', () => {
        const apiResponse = {
          last: { drawId: 1 },
          active: { drawId: 2, drawTime: 200, drawBreak: 10 },
        };
        actions[types.actions.SET_SALES_OPEN]({ commit }, { apiResponse });

        expect(setTimeoutSpy.calledOnce).to.be.true;
        expect(setTimeoutSpy.args[0][1]).to.eq(1800000);
      });

      it('should dispatch GET_DRAW_INFO after the timeout', () => {
        const apiResponse = {
          last: { drawId: 1 },
          active: { drawId: 2, drawTime: 200, drawBreak: 10 },
        };
        actions[types.actions.SET_SALES_OPEN]({ commit, dispatch }, { apiResponse });

        clock.tick(1800000);

        expect(dispatch.args[1][0]).to.eq(types.actions.GET_DRAW_INFO);
      });
    });

    describe('when the prizeCategories is an empty array', () => {
      it('should commit SET_SALES_OPEN mutation with jackpod as 0', () => {
        const apiResponse = {
          last: { drawId: 1 },
          active: { drawId: 2, drawTime: 200, drawBreak: 10, prizeCategories: [] },
        };
        actions[types.actions.SET_SALES_OPEN]({ commit }, { apiResponse });

        expect(commit.args[0][0]).to.eq(types.mutations.SET_SALES_OPEN);
        expect(commit.args[0][1]).to.eql({
          activeDrawId: 2,
          activeDrawTime: 200,
          salesCloseTime: 190,
          jackpot: 0,
        });
      });

      it('should schedule a new timeout to get draw info again', () => {
        const apiResponse = {
          last: { drawId: 1 },
          active: { drawId: 2, drawTime: 200, drawBreak: 10, prizeCategories: [] },
        };
        actions[types.actions.SET_SALES_OPEN]({ commit }, { apiResponse });

        expect(setTimeoutSpy.calledOnce).to.be.true;
        expect(setTimeoutSpy.args[0][1]).to.eq(1800000);
      });

      it('should dispatch GET_DRAW_INFO after the timeout', () => {
        const apiResponse = {
          last: { drawId: 1 },
          active: { drawId: 2, drawTime: 200, drawBreak: 10, prizeCategories: [] },
        };
        actions[types.actions.SET_SALES_OPEN]({ commit, dispatch }, { apiResponse });

        clock.tick(1800000);

        expect(dispatch.args[1][0]).to.eq(types.actions.GET_DRAW_INFO);
      });
    });
  });

  describe('SET_SALES_CLOSED', () => {
    let clock;
    let clearTimeoutSpy;
    let setTimeoutSpy;

    const rootGetters = {
      'CONFIGURATION_STORE_MODULE/GET_EJP_SALES_OPEN_TIME': { HOURS: 23, MINUTES: 0 },
    };

    const NOW = new Date('2024-01-01T20:00:00.000Z').getTime(); // local time is 22:00:00

    beforeEach(() => {
      clock = sinon.useFakeTimers({ now: NOW });
      clearTimeoutSpy = sinon.spy(clock, 'clearTimeout');
      setTimeoutSpy = sinon.spy(clock, 'setTimeout');
    });

    afterEach(() => {
      clock.restore();
      clearTimeoutSpy.resetHistory();
      setTimeoutSpy.resetHistory();
    });

    it('should commit SET_SALES_CLOSED mutation', () => {
      actions[types.actions.SET_SALES_CLOSED]({ commit, state: { statistics: {} }, rootGetters });

      expect(commit.args[0][0]).to.eq(types.mutations.SET_SALES_CLOSED);
    });

    it('should schedule a new timeout to transition to SALES_OPEN', () => {
      actions[types.actions.SET_SALES_CLOSED]({ commit, state: { statistics: {} }, rootGetters });

      const expectedTimeout = 3600000; // 1 hour

      expect(setTimeoutSpy.calledOnce).to.be.true;
      expect(setTimeoutSpy.args[0][1]).to.eq(expectedTimeout);
    });

    it('should dispatch GET_DRAW_INFO after the timeout', () => {
      actions[types.actions.SET_SALES_CLOSED]({ commit, state: { statistics: {} }, rootGetters, dispatch });

      const expectedTimeout = 3600000; // 1 hour

      clock.tick(expectedTimeout);

      expect(dispatch.args[0][0]).to.eq(types.actions.GET_DRAW_INFO);
    });

    it('should save the timeout id', () => {
      actions[types.actions.SET_SALES_CLOSED]({ commit, state: { statistics: {} }, rootGetters });

      expect(commit.args[1][0]).to.eq(types.mutations.SET_ACTIVE_DRAW_API_TIMEOUT);
    });

    it('should dispatch a GET_STATISTICS action if the store does not contain any statistics', () => {
      actions[types.actions.SET_SALES_CLOSED]({
        commit,
        state: {
          statistics: null,
        },
        rootGetters,
        dispatch,
      });

      expect(dispatch.args[0][0]).to.eq(types.actions.GET_STATISTICS);
    });

    it('should not dispatch a GET_STATISTICS action if the store contains statistics', () => {
      actions[types.actions.SET_SALES_CLOSED]({
        commit,
        state: {
          statistics: {},
        },
        rootGetters,
        dispatch,
      });

      expect(dispatch.calledOnce).to.be.false;
    });
  });

  describe('CLEAR_TIMER', () => {
    let clock;
    let clearTimeoutSpy;

    const NOW = 100;

    beforeEach(() => {
      clock = sinon.useFakeTimers({ now: NOW });
      clearTimeoutSpy = sinon.spy(clock, 'clearTimeout');
    });

    afterEach(() => {
      clock.restore();
      clearTimeoutSpy.resetHistory();
    });

    it('should clear the timeout if it exists', () => {
      const activeDrawApiTimeout = 1;
      const state = { activeDrawApiTimeout };
      actions[types.actions.CLEAR_TIMER]({ commit, state });

      expect(clearTimeoutSpy.calledOnce).to.be.true;
      expect(clearTimeoutSpy.args[0][0]).to.eq(activeDrawApiTimeout);
    });

    it('should commit RESET_ACTIVE_DRAW_API_TIMEOUT if the timeout exists', () => {
      const activeDrawApiTimeout = 1;
      const state = { activeDrawApiTimeout };
      actions[types.actions.CLEAR_TIMER]({ commit, state });

      expect(commit.args[0][0]).to.eq(types.mutations.RESET_ACTIVE_DRAW_API_TIMEOUT);
    });

    it('should not clear the timeout if it does not exist', () => {
      const state = {};
      actions[types.actions.CLEAR_TIMER]({ commit, state });

      expect(clearTimeoutSpy.calledOnce).to.be.false;
    });
  });

  describe('GET_STATISTICS', () => {
    let axiosStub;

    const rootGetters = {
      'CONFIGURATION_STORE_MODULE/GET_STATISTICS_API_HOST': 'statistics.api.host',
    };

    beforeEach(() => {
      axiosStub = sinon.stub(retryAxiosInstance, 'get');
    });

    afterEach(() => {
      axiosStub.restore();
    });

    it('should call the statistics api with the correct url', async () => {
      const url = `https://statistics.api.host/5149/statistics?drawRange=12`;
      axiosStub.resolves({ data: { numbers: [], numbersPanel2: [] } });
      await actions[types.actions.GET_STATISTICS]({ commit, rootGetters });

      expect(axiosStub.calledOnce).to.be.true;
      expect(axiosStub.args[0][0]).to.eq(url);
    });

    it('should commit SET_STATISTICS with the statistics reduced to objects', async () => {
      const numbers = [
        {
          number: 1,
          occurrences: 2,
          delays: 3,
        },
        {
          number: 2,
          occurrences: 0,
          delays: 0,
        },
      ];
      const numbersPanel2 = [
        {
          number: 1,
          occurrences: 0,
          delays: 0,
        },
        {
          number: 2,
          occurrences: 3,
          delays: 2,
        },
      ];
      axiosStub.resolves({ data: { numbers, numbersPanel2 } });
      await actions[types.actions.GET_STATISTICS]({ commit, rootGetters });

      expect(commit.args[0][0]).to.eq(types.mutations.SET_STATISTICS);
      expect(commit.args[0][1]).to.eql({
        statistics: {
          mainNumbers: {
            1: {
              occurrences: 2,
              delays: 3,
            },
            2: {
              occurrences: 0,
              delays: 0,
            },
          },
          euroNumbers: {
            1: {
              occurrences: 0,
              delays: 0,
            },
            2: {
              occurrences: 3,
              delays: 2,
            },
          },
        },
      });
    });

    it('should commit RESET_STATISTICS if the request fails', async () => {
      axiosStub.rejects();
      await actions[types.actions.GET_STATISTICS]({ commit, rootGetters });

      expect(commit.args[0][0]).to.eq(types.mutations.RESET_STATISTICS);
    });
  });
});
