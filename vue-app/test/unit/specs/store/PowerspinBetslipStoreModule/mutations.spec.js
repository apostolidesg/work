import { expect } from 'chai';
import betslipUtils from '../../../../../src/util/betslipUtils';
import Betslip from '../../../../../src/model/powerspin/Betslip';
import Markets from '../../../../../src/model/powerspin/Markets';
import Wheel from '../../../../../src/model/powerspin/Wheel';
import mutations from '../../../../../src/store/modules/PowerspinBetslipStoreModule/mutations';
import types from '../../../../../src/store/modules/PowerspinBetslipStoreModule/types';
import powerspinConstants from '../../../../../src/util/powerspinConstants';
import sinon from 'sinon';

describe('Powerspin Betslip Store Module Mutations', () => {
  let firstBetslipMock;
  let secondBetslipMock;

  beforeEach(() => {
    firstBetslipMock = sinon.createStubInstance(Betslip);
    firstBetslipMock.wager = { participatingDraws: { multipleDraws: 1 } };
    secondBetslipMock = sinon.createStubInstance(Betslip);
    secondBetslipMock.wager = { participatingDraws: { multipleDraws: 1 } };
  });

  describe('ADD_BETSPLIP', () => {
    it('should add a new betslip to the store', () => {
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.ADD_BETSLIP](state);
      expect(state.betslipArray.length).to.eq(2);
    });

    it('should update the selected index to the new betslip', () => {
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.ADD_BETSLIP](state);
      expect(state.selectedBetslipIndex).to.eq(1);
    });
  });

  describe('UPDATE_BETSPLIP', () => {
    it('should update the first betslip of the store', () => {
      const state = { betslipArray: [{}], selectedBetslipIndex: 0 };
      mutations[types.mutations.UPDATE_BETSLIP](state, { betslip: firstBetslipMock, betslipIndex: 0 });
      expect(state.betslipArray[0]).to.eql(firstBetslipMock);
    });

    it('should update second betslip of the store', () => {
      const state = { betslipArray: [{}, {}], selectedBetslipIndex: 0 };
      mutations[types.mutations.UPDATE_BETSLIP](state, { betslip: firstBetslipMock, betslipIndex: 1 });
      expect(state.betslipArray[1]).to.eql(firstBetslipMock);
    });
  });

  describe('REMOVE_BETSLIP', () => {
    it('should remove the betslip', () => {
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.REMOVE_BETSLIP](state, { betslipIndex: 1 });

      expect(state.betslipArray.length).to.eq(1);
    });

    it('should set the selectedBetslipIndex to the one prev to the removed index', () => {
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      mutations[types.mutations.REMOVE_BETSLIP](state, { betslipIndex: 1 });

      expect(state.selectedBetslipIndex).to.eq(0);
    });
  });

  describe('ADD_WHEEL', () => {
    it('should add a new wheel to the selected betslip if the length is less than three', () => {
      secondBetslipMock.wager.wheels = [sinon.createStubInstance(Wheel)];
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      mutations[types.mutations.ADD_WHEEL](state);

      expect(state.betslipArray[1].wager.wheels.length).to.eq(2);
    });

    it('should NOT add the new wheel is the length is three', () => {
      const state = {
        betslipArray: [{ wager: { wheels: [0, 1, 2].map(_ => sinon.createStubInstance(Wheel)) } }],
        selectedBetslipIndex: 0,
      };
      mutations[types.mutations.ADD_WHEEL](state);

      expect(state.betslipArray[0].wager.wheels.length).to.eq(3);
    });
  });

  describe('REMOVE_WHEEL', () => {
    it('should not remove if there is only one wheel', () => {
      firstBetslipMock.wager.wheels = [sinon.createStubInstance(Wheel)];
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.REMOVE_WHEEL](state, { wheelIndex: 0 });

      expect(state.betslipArray[0].wager.wheels.length).to.eq(1);
    });

    it('should remove the wheel based on the index', () => {
      const wheelsMoks = [0, 1, 2].map(_ => sinon.createStubInstance(Wheel));
      firstBetslipMock.wager.wheels = [...wheelsMoks];
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.REMOVE_WHEEL](state, { wheelIndex: 0 });

      expect(state.betslipArray[0].wager.wheels.length).to.eq(2);
      expect(state.betslipArray[0].wager.wheels[0]).to.eq(wheelsMoks[1]);
      expect(state.betslipArray[0].wager.wheels[1]).to.eq(wheelsMoks[2]);
    });

    it('should set the compoMultipiers to default if the remaining wheels are one', () => {
      const wheelsMoks = [0, 1].map(_ => sinon.createStubInstance(Wheel));
      firstBetslipMock.wager.wheels = [...wheelsMoks];
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.REMOVE_WHEEL](state, { wheelIndex: 0 });

      expect(state.betslipArray[0].wager.comboMultipliers).to.eql([powerspinConstants.DEFAULT_MULTIPLIERS]);
    });
  });

  describe('SET_BETSLIP_CONSECUTIVE_DRAWS', () => {
    it('should call the relevant method of the bestslip model', () => {
      secondBetslipMock.wager.participatingDraws = { multipleDraws: 1 };
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      mutations[types.mutations.SET_BETSLIP_CONSECUTIVE_DRAWS](state, { multipleDraws: 5 });

      expect(state.betslipArray[1].wager.participatingDraws).to.eql({ multipleDraws: 5 });
    });
  });

  describe('SET_REQUESTED_NUMBER', () => {
    it('should call the relevant method of the bestslip model', () => {
      const setRequestedNumberSpy = sinon.spy();
      secondBetslipMock.wager.wheels = [{ setRequestedNumber: setRequestedNumberSpy }];
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      mutations[types.mutations.SET_REQUESTED_NUMBER](state, { wheelIndex: 0, number: 2 });

      expect(setRequestedNumberSpy.calledWith(2)).to.be.true;
    });
  });

  describe('SET_COLUMN_NUMBER', () => {
    it('should call the relevant method of the bestslip model', () => {
      const setColumnNumberSpy = sinon.spy();
      secondBetslipMock.wager.wheels = [{ setColumnNumber: setColumnNumberSpy }];
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      mutations[types.mutations.SET_COLUMN_NUMBER](state, { wheelIndex: 0, number: 2 });

      expect(setColumnNumberSpy.calledWith(2)).to.be.true;
    });
  });

  describe('TOGGLE_QUICK_PICK', () => {
    it('should call the relevant method of the bestslip model', () => {
      const addQuickPickSpy = sinon.spy();
      secondBetslipMock.wager.wheels = [{ addQuickPick: addQuickPickSpy }];
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      mutations[types.mutations.TOGGLE_QUICK_PICK](state, { wheelIndex: 0 });

      expect(addQuickPickSpy.calledOnce).to.be.true;
    });
  });

  describe('RESET_BETSLIPS', () => {
    it('should reset the betslip', () => {
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      mutations[types.mutations.RESET_BETSLIPS](state);

      expect(state.betslipArray.length).to.eq(1);
      expect(state.selectedBetslipIndex).to.eq(0);
    });
  });

  describe('RESET_WHEEL', () => {
    it('should call the relevant method of the bestslip model', () => {
      const resetSpy = sinon.spy();
      const wheelMock = sinon.createStubInstance(Wheel);
      wheelMock.reset = resetSpy;
      firstBetslipMock.wager.wheels = [wheelMock];
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.RESET_WHEEL](state, { wheelIndex: 0 });

      expect(resetSpy.calledOnce).to.be.true;
    });
  });

  describe('RESET_CATEGORY', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the relevant method of the bestslip model', () => {
      const resetWheelStub = sandbox.stub(betslipUtils, 'resetWheelCategory');
      const wheelMock = sinon.createStubInstance(Wheel);
      wheelMock.categories = { [powerspinConstants.GAME_CATEGORY.OVER_UNDER]: { type: 'TEST_CATEGORY' } };
      firstBetslipMock.wager.wheels = [wheelMock];
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.RESET_CATEGORY](state, {
        betslipIndex: 0,
        wheelIndex: 0,
        categoryType: powerspinConstants.GAME_CATEGORY.OVER_UNDER,
      });
      expect(resetWheelStub.calledWith({ type: 'TEST_CATEGORY' })).to.be.true;
    });
  });

  describe('TOGGLE_GAME_TYPE', () => {
    it('should call the relevant method of the bestslip model', () => {
      const toggleSpy = sinon.spy();
      const wheelMock = sinon.createStubInstance(Wheel);
      wheelMock.toggleGameType = toggleSpy;
      firstBetslipMock.wager.wheels = [wheelMock];
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.TOGGLE_GAME_TYPE](state, {
        wheelIndex: 0,
        gameType: powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
      });

      expect(toggleSpy.calledWith(powerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN)).to.be.true;
    });
  });

  describe('TOGGLE_MULTIPLIERS', () => {
    it('should call the relevant method of the bestslip model', () => {
      const toggleSpy = sinon.spy();
      const wheelMock = sinon.createStubInstance(Wheel);
      wheelMock.toggleMultipliers = toggleSpy;
      firstBetslipMock.wager.wheels = [wheelMock];
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.TOGGLE_MULTIPLIERS](state, {
        wheelIndex: 0,
        gameCategory: powerspinConstants.GAME_CATEGORY.OVER_UNDER,
        multipliers: [2],
      });

      expect(toggleSpy.calledWith(powerspinConstants.GAME_CATEGORY.OVER_UNDER, [2])).to.be.true;
    });
  });

  describe('TOGGLE_BETSLIP_COMBO_MULTIPLIERS', () => {
    it('should call the relevant method of the bestslip model', () => {
      const toggleSpy = sinon.spy();
      const wheelMock = sinon.createStubInstance(Wheel);
      firstBetslipMock.toggleComboMultipliers = toggleSpy;
      firstBetslipMock.wager.wheels = [wheelMock];
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.TOGGLE_BETSLIP_COMBO_MULTIPLIERS](state, {
        multipliers: [2],
      });

      expect(toggleSpy.calledWith([2])).to.be.true;
    });
  });

  describe('RESET_MARKETS', () => {
    it('should call the relevant method of the market model', () => {
      const resetSpy = sinon.spy();
      const marketMock = sinon.createStubInstance(Markets);
      marketMock.reset = resetSpy;
      firstBetslipMock.wager.markets = marketMock;
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.RESET_MARKETS](state);

      expect(resetSpy.calledOnce).to.be.true;
    });
  });

  describe('RESET_MARKETS_CATEGORY', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the resetMarketCategory from the betslipUtils module ', () => {
      const resetMarketCategoryStub = sandbox.stub(betslipUtils, 'resetMarketCategory');
      const marketsMock = sinon.createStubInstance(Markets);
      marketsMock.categories = { [powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL]: { type: 'TEST_CATEGORY' } };
      firstBetslipMock.wager.markets = marketsMock;
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.RESET_MARKETS_CATEGORY](state, {
        betslipIndex: 0,
        categoryType: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
      });
      expect(resetMarketCategoryStub.calledWith({ type: 'TEST_CATEGORY' })).to.be.true;
    });
  });

  describe('SET_MARKETS_NUMBER_ON_ANY_WHEEL', () => {
    it('should call the relevant method of the market model', () => {
      const setNumberSoy = sinon.spy();
      secondBetslipMock.wager.markets = { setNumberOnWheel: setNumberSoy };
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      mutations[types.mutations.SET_MARKETS_NUMBER_ON_ANY_WHEEL](state, 2);

      expect(setNumberSoy.calledWith(2)).to.be.true;
    });
  });

  describe('TOGGLE_MARKET_GAME_TYPE', () => {
    it('should call the relevant method of the markets model', () => {
      const toggleSpy = sinon.spy();
      const marketsMock = sinon.createStubInstance(Markets);
      marketsMock.toggleMarketGameType = toggleSpy;
      firstBetslipMock.wager.markets = marketsMock;
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.TOGGLE_MARKET_GAME_TYPE](
        state,
        powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL
      );

      expect(toggleSpy.calledWith(powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL)).to.be.true;
    });
  });

  describe('TOGGLE_MARKET_MULTIPLIERS', () => {
    it('should call the relevant method of the markets model', () => {
      const toggleSpy = sinon.spy();
      const marketsMock = sinon.createStubInstance(Markets);
      marketsMock.toggleMultipliers = toggleSpy;
      firstBetslipMock.wager.markets = marketsMock;
      const state = { betslipArray: [firstBetslipMock], selectedBetslipIndex: 0 };
      mutations[types.mutations.TOGGLE_MARKET_MULTIPLIERS](state, {
        gameCategory: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
        multipliers: 2,
      });

      expect(toggleSpy.calledWith(powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL, 2)).to.be.true;
    });
  });
});
