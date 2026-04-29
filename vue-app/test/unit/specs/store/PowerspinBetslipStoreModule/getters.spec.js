import { expect } from 'chai';
import getters from '../../../../../src/store/modules/PowerspinBetslipStoreModule/getters';
import types from '../../../../../src/store/modules/PowerspinBetslipStoreModule/types';
import sinon from 'sinon';
import Betslip from '../../../../../src/model/powerspin/Betslip';
import betslipUtils from '../../../../../src/util/betslipUtils';
import Wheel from '../../../../../src/model/powerspin/Wheel';
import powerspinConstants from '../../../../../src/util/powerspinConstants';
import Markets from '../../../../../src/model/powerspin/Markets';

describe('Powerspin Betslip Store Module Getters', () => {
  let firstBetslipMock;
  let secondBetslipMock;

  beforeEach(() => {
    firstBetslipMock = sinon.createStubInstance(Betslip);
    firstBetslipMock.wager = { participatingDraws: { multipleDraws: 1 } };
    secondBetslipMock = sinon.createStubInstance(Betslip);
    secondBetslipMock.wager = { participatingDraws: { multipleDraws: 2 } };
  });

  describe('GET_ILOT_BETSLIP_ARRAY', () => {
    let formatStub;
    beforeEach(() => {
      formatStub = sinon.stub(betslipUtils, 'formatIlotBetslip');
    });

    afterEach(() => {
      formatStub.restore();
    });

    it('should call the formatIlotBetslip utils function to format the betslips passing each betslip', () => {
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 0 };
      getters[types.getters.GET_ILOT_BETSLIP_ARRAY](state)();

      expect(formatStub.withArgs({ betslip: firstBetslipMock, indexedBoardId: true }).calledOnce).to.be.true;
      expect(formatStub.withArgs({ betslip: secondBetslipMock, indexedBoardId: true }).calledOnce).to.be.true;
    });

    it('should return an array of the results of each formatIlotBetslip call', () => {
      formatStub.onFirstCall().returns({ multipliers: [1] });
      formatStub.onSecondCall().returns({ multipliers: [2] });
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 0 };
      const result = getters[types.getters.GET_ILOT_BETSLIP_ARRAY](state)();

      expect(result).to.eql([{ multipliers: [1] }, { multipliers: [2] }]);
    });
  });

  describe('GET_ACTIVE_BETSLIP', () => {
    it('should return the active betslip', () => {
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      const result = getters[types.getters.GET_ACTIVE_BETSLIP](state);

      expect(result).to.eq(secondBetslipMock);
    });
  });

  describe('GET_CONSECUTIVE_DRAWS', () => {
    it('should return the consecutive draws of the selected betslip', () => {
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      const result = getters[types.getters.GET_CONSECUTIVE_DRAWS](state);

      expect(result).to.eq(secondBetslipMock.wager.participatingDraws.multipleDraws);
    });
  });

  describe('GET_SELECTED_BETSLIP', () => {
    it('should return the selected betslip', () => {
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      const result = getters[types.getters.GET_SELECTED_BETSLIP](state);

      expect(result).to.eq(secondBetslipMock);
    });
  });

  describe('GET_WHEEL', () => {
    it('should return the wheel from the selected betslip', () => {
      const mockWheel = sinon.createStubInstance(Wheel);
      secondBetslipMock.wager.wheels = [mockWheel];
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      const result = getters[types.getters.GET_WHEEL](state)({ wheelIndex: 0 });

      expect(result).to.eq(mockWheel);
    });
  });

  describe('GET_WHEELS_LENGTH', () => {
    it('should return the wheel length of the selected betslip', () => {
      const mockWheel = sinon.createStubInstance(Wheel);
      secondBetslipMock.wager.wheels = [mockWheel];
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      const result = getters[types.getters.GET_WHEELS_LENGTH](state);

      expect(result).to.eq(1);
    });
  });

  describe('GET_CATEGORY_COST', () => {
    let calculateCategoryColumnsNumberStub;
    beforeEach(() => {
      calculateCategoryColumnsNumberStub = sinon.stub(betslipUtils, 'calculateCategoryColumnsNumber');
    });

    afterEach(() => {
      calculateCategoryColumnsNumberStub.restore();
    });

    it('should calculate the cost based on the category multipliers if exist', () => {
      const category = { multipliers: [1, 2, 4] };
      const COLUMN_NUMBERS = 4;
      calculateCategoryColumnsNumberStub.withArgs({ category }).returns(COLUMN_NUMBERS);

      const expected = COLUMN_NUMBERS * (1 + 2 + 4) * powerspinConstants.BASIC_BETTING_AMOUNT;

      const result = getters[types.getters.GET_CATEGORY_COST]()({ category });

      expect(result).to.eq(expected);
    });

    it('should calculate the cost based on the first board multipliers category multipliers dont exist', () => {
      const category = { boards: [{ multipliers: [1, 2] }] };
      const COLUMN_NUMBERS = 4;
      calculateCategoryColumnsNumberStub.withArgs({ category }).returns(COLUMN_NUMBERS);

      const expected = COLUMN_NUMBERS * (1 + 2) * powerspinConstants.BASIC_BETTING_AMOUNT;

      const result = getters[types.getters.GET_CATEGORY_COST]()({ category });

      expect(result).to.eq(expected);
    });
  });

  describe('GET_WHEEL_COST', () => {
    it('should call the GET_CATECORY_COST for each category of the wheel', () => {
      const wheel = sinon.createStubInstance(Wheel);
      wheel.categories = [{ multipliers: [1] }, { multipliers: [1, 2] }];
      const getCategoryCostStub = sinon.stub();
      getCategoryCostStub.withArgs({ category: wheel.categories[0] }).returns(5);
      getCategoryCostStub.withArgs({ category: wheel.categories[1] }).returns(15);
      const localGetters = { [types.getters.GET_CATEGORY_COST]: getCategoryCostStub };
      const result = getters[types.getters.GET_WHEEL_COST]({}, localGetters)({ wheel });

      expect(result).to.eq(20);
    });
  });

  describe('GET_WHEELS_COST', () => {
    let calculateWheelsComboBoardsNumberStub;
    let getMultiplierNumberStub;

    beforeEach(() => {
      calculateWheelsComboBoardsNumberStub = sinon.stub(betslipUtils, 'calculateWheelsComboBoardsNumber');
      getMultiplierNumberStub = sinon.stub();
    });

    afterEach(() => {
      calculateWheelsComboBoardsNumberStub.restore();
      getMultiplierNumberStub.reset();
    });

    it('should use the calculateWheelsComboBoardsNumber() util function if the number of wheels are more than one', () => {
      firstBetslipMock.wager.wheels = [sinon.createStubInstance(Wheel), sinon.createStubInstance(Wheel)];
      calculateWheelsComboBoardsNumberStub.returns(4);
      firstBetslipMock.getMultiplierNumber = getMultiplierNumberStub;
      getMultiplierNumberStub.returns(5);

      const expected = 4 * 5 * powerspinConstants.BASIC_BETTING_AMOUNT;

      const result = getters[types.getters.GET_WHEELS_COST]({})({ betslip: firstBetslipMock });

      expect(result).to.eq(expected);
    });

    it('should calculate the cost based on the wheel cost if there is only one wheel', () => {
      firstBetslipMock.wager.wheels = [sinon.createStubInstance(Wheel)];
      const getWheelCostStub = sinon.stub();
      getWheelCostStub.withArgs({ wheel: firstBetslipMock.wager.wheels[0] }).returns(10);
      const localGetters = {
        [types.getters.GET_WHEEL_COST]: getWheelCostStub,
      };

      const expected = 10;

      const result = getters[types.getters.GET_WHEELS_COST]({}, localGetters)({ betslip: firstBetslipMock });

      expect(result).to.eq(expected);
    });
  });

  describe('GET_BETSLIP_COST', () => {
    const CONSECUTIVE_DRAWS = 2;
    let getMarketsStub;
    let getWheelsCostStub;
    beforeEach(() => {
      getMarketsStub = sinon.stub().returns(0);
      getWheelsCostStub = sinon.stub();
    });

    afterEach(() => {
      getMarketsStub.reset();
      getWheelsCostStub.reset();
    });

    it('should use the GET_WHEELS_COST local getter to calculate the wheels cost', () => {
      firstBetslipMock.wager.wheels = [sinon.createStubInstance(Wheel), sinon.createStubInstance(Wheel)];
      firstBetslipMock.wager.participatingDraws.multipleDraws = CONSECUTIVE_DRAWS;
      getWheelsCostStub.withArgs({ betslip: firstBetslipMock }).returns(10);

      const localGetters = {
        [types.getters.GET_WHEELS_COST]: getWheelsCostStub,
        [types.getters.GET_MARKETS_COST]: getMarketsStub,
      };

      const expected = 10 * CONSECUTIVE_DRAWS;

      const result = getters[types.getters.GET_BETSLIP_COST]({}, localGetters)({ betslip: firstBetslipMock });

      expect(result).to.eq(expected);
    });

    it('should add the markets cost to the betslip cost', () => {
      firstBetslipMock.wager.wheels = [sinon.createStubInstance(Wheel)];
      firstBetslipMock.wager.markets = sinon.createStubInstance(Markets);
      firstBetslipMock.wager.participatingDraws.multipleDraws = CONSECUTIVE_DRAWS;
      getWheelsCostStub.withArgs({ betslip: firstBetslipMock }).returns(10);
      getMarketsStub.withArgs({ markets: firstBetslipMock.wager.markets }).returns(5);

      const localGetters = {
        [types.getters.GET_WHEELS_COST]: getWheelsCostStub,
        [types.getters.GET_MARKETS_COST]: getMarketsStub,
      };

      const expected = 10 * CONSECUTIVE_DRAWS + 5 * CONSECUTIVE_DRAWS;

      const result = getters[types.getters.GET_BETSLIP_COST]({}, localGetters)({ betslip: firstBetslipMock });

      expect(result).to.eq(expected);
    });
  });

  describe('GET_BETSLIPS_COST', () => {
    it('should return the sum of each betslip using the GET_BETSLIP_COST local getter', () => {
      const getBetsipCost = sinon.stub();
      getBetsipCost.withArgs({ betslip: firstBetslipMock }).returns(10);
      getBetsipCost.withArgs({ betslip: secondBetslipMock }).returns(20);
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 0 };
      const localGetters = {
        [types.getters.GET_BETSLIP_COST]: getBetsipCost,
      };

      const result = getters[types.getters.GET_BETSLIPS_COST](state, localGetters);

      expect(result).to.eq(30);
    });
  });

  describe('IS_BETSLIP_VALID', () => {
    let isValidStub;
    beforeEach(() => {
      isValidStub = sinon.stub(betslipUtils, 'isBetslipValid');
    });

    afterEach(() => {
      isValidStub.restore();
    });

    it('should call the isBetslipValid() util function passing the correct betslip', () => {
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 0 };
      getters[types.getters.IS_BETSLIP_VALID](state)({ betslipIndex: 1 });

      expect(isValidStub.withArgs({ betslip: secondBetslipMock }).calledOnce).to.be.true;
    });

    it('should return the result of isBetslipValid()', () => {
      isValidStub.onFirstCall().returns(true);
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 0 };
      const result = getters[types.getters.IS_BETSLIP_VALID](state)({ betslipIndex: 1 });

      expect(result).to.be.true;
    });
  });

  describe('GET_MARKETS', () => {
    it('should return the marktes from the selected betslip', () => {
      const mockMarkets = sinon.createStubInstance(Markets);
      secondBetslipMock.wager.markets = mockMarkets;
      const state = { betslipArray: [firstBetslipMock, secondBetslipMock], selectedBetslipIndex: 1 };
      const result = getters[types.getters.GET_MARKETS](state);

      expect(result).to.eq(mockMarkets);
    });
  });

  describe('GET_MARKETS_COST', () => {
    it('should call the GET_MARKETS_COST for each category of the wheel', () => {
      const markets = sinon.createStubInstance(Markets);
      markets.categories = [{ multipliers: [1] }, { multipliers: [1, 2] }];
      const getCategoryCostStub = sinon.stub();
      getCategoryCostStub.withArgs({ category: markets.categories[0] }).returns(5);
      getCategoryCostStub.withArgs({ category: markets.categories[1] }).returns(15);
      const localGetters = { [types.getters.GET_CATEGORY_COST]: getCategoryCostStub };
      const result = getters[types.getters.GET_MARKETS_COST]({}, localGetters)({ markets });

      expect(result).to.eq(20);
    });
  });
});
