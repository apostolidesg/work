import getters from '../../../../../src/store/modules/KinoStoreModule/getters';
import types from '../../../../../src/store/modules/KinoStoreModule/types';
import sinon from 'sinon';
import Bet from '../../../../../src/model/Bet';

describe('KinoStoreModule getters', () => {
  describe('GET_ACTIVE_BET_AREA', () => {
    it('should return active bet area', () => {
      const bet1 = sinon.createStubInstance(Bet);
      const bet2 = sinon.createStubInstance(Bet);

      const state = {
        activeAreaIndex: 0,
        betslip: {
          bet_areas: [bet1, bet2],
        },
      };
      const result = getters[types.getters.GET_ACTIVE_BET_AREA](state);
      expect(result).to.eq(bet1);
    });
  });

  describe('GET_BETSLIP_COST', () => {
    it('should return betslip cost', () => {
      const state = {
        betslip: {
          calculateValue: sinon.stub().returns(100),
        },
      };
      const result = getters[types.getters.GET_BETSLIP_COST](state);
      expect(result).to.eq(100);
    });
  });

  describe('GET_CONSECUTIVE_DRAWS', () => {
    it('should return consecutive draws', () => {
      const state = {
        betslip: {
          consecutiveDraws: 5,
        },
      };
      const result = getters[types.getters.GET_CONSECUTIVE_DRAWS](state);
      expect(result).to.eq(5);
    });
  });
});
