import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import PlayMarkets from '../../../src/components/lobby/games/Powerspin/MainScreen/PlayMarkets.vue';
import sinon from 'sinon';
import moduleTypes from '../../../src/store/modules/types';
import types from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import CONSTANTS from '../../../src/util/powerspinConstants';
import betslipUtils from '../../../src/util/betslipUtils';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('PlayMarkets component', () => {
  let stubs;
  let store;
  let getters;
  let actions;
  let isMarketsCategoryEmpty;

  const setNumberSpy = sinon.spy();
  const toggleGameTypeSpy = sinon.spy();
  const toggleMultipliersSpy = sinon.spy();
  const marketsStub = sinon.stub();
  const isMarketsEmptyStub = sinon.stub();

  const marketsMock = {
    getNumberOnWheelBoard: () => ({
      panels: [{}],
      multipliers: [],
    }),
    isEmpty: isMarketsEmptyStub,
    categories: {
      [CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL]: { multipliers: [] },
      [CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_NUMBER]: { multipliers: [] },
    },
  };

  beforeEach(() => {
    isMarketsCategoryEmpty = sinon.stub(betslipUtils, 'isMarketsCategoryEmpty');
    isMarketsCategoryEmpty.returns(false);
    isMarketsEmptyStub.returns(false);

    stubs = {
      MarketsCategoryLayout: {
        name: 'MarketsCategoryLayout',
        props: ['title', 'multipliers', 'selected-multipliers'],
        template: '<div><slot></slot></div>',
      },
      NumberSelection: {
        name: 'NumberSelection',
        props: ['text-theme', 'is-streched', 'id-suffix', 'number-board-panel', 'showHeader'],
        template: '<span></span>',
      },
      MarketsOptionsSelection: {
        name: 'MarketsOptionsSelection',
        props: ['options', 'optionsSelected', 'theme'],
        template: '<span></span>',
      },
    };

    getters = {
      [types.getters.GET_MARKETS]: marketsStub.returns(marketsMock),
    };

    actions = {
      [types.actions.SET_MARKETS_NUMBER_ON_ANY_WHEEL]: setNumberSpy,
      [types.actions.TOGGLE_MARKET_GAME_TYPE]: toggleGameTypeSpy,
      [types.actions.TOGGLE_MARKET_MULTIPLIERS]: toggleMultipliersSpy,
    };

    store = new Vuex.Store({
      modules: {
        [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: {
          namespaced: true,
          getters,
          actions,
        },
      },
    });
  });

  afterEach(() => {
    isMarketsCategoryEmpty.restore();
    marketsStub.resetBehavior();
    isMarketsEmptyStub.resetBehavior();
    setNumberSpy.resetHistory();
    toggleGameTypeSpy.resetHistory();
    toggleMultipliersSpy.resetHistory();
  });

  it('should render three MarketsCategoryLayout Components', () => {
    const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
    const layouts = wrapper.findAllComponents({ name: stubs.MarketsCategoryLayout.name });

    expect(layouts.length).to.eq(3);
  });

  it('should render the MarketsCategoryLayout with the correct title', () => {
    const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
    const layouts = wrapper.findAllComponents({ name: stubs.MarketsCategoryLayout.name });

    expect(layouts.at(0).props().title).to.eql('markets.categories.NUMBER_ON_WHEEL.title');
    expect(layouts.at(1).props().title).to.eql('markets.categories.WHEELS_WITH_SYMBOL.title');
    expect(layouts.at(2).props().title).to.eql('markets.categories.WHEELS_WITH_NUMBER.title');
  });

  it('should render a light background if the markets are empty', () => {
    isMarketsEmptyStub.returns(true);
    const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });

    const activeClassExists = wrapper.find('.powerspin-play-markets__categories--active').exists();
    expect(activeClassExists).to.be.false;
  });

  it('should render a dark background if the markets are not empty', () => {
    const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });

    const activeClassExists = wrapper.find('.powerspin-play-markets__categories--active').exists();
    expect(activeClassExists).to.be.true;
  });

  describe('on the number category', () => {
    const panel = [{ requested: [1], selection: [1] }];

    beforeEach(() => {
      marketsStub.returns({ ...marketsMock, getNumberOnWheelBoard: () => ({ panels: [panel], multipliers: [1, 3] }) });
    });

    it('should pass render the NumberSelection passing the correct number panel', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });

      expect(numberSelection.exists()).to.be.true;
      expect(numberSelection.props().numberBoardPanel).to.eql(panel);
      expect(numberSelection.props().showHeader).to.be.false;
      expect(numberSelection.props().textTheme).to.eql('white');
    });

    it('should call the store action when a number is clicked', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });

      numberSelection.vm.$emit('column-number-click', 1);
      expect(setNumberSpy.getCall(0).args[1]).to.be.eq(1);
    });

    it('should call the store action to update the category multipliers', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const numberLayout = wrapper.findAllComponents({ name: stubs.MarketsCategoryLayout.name }).at(0);

      numberLayout.vm.$emit('update-multipliers', 1);
      expect(toggleMultipliersSpy.getCall(0).args[1]).to.be.eql({
        gameCategory: CONSTANTS.MARKETS_CATEGORY.NUMBER_ON_WHEEL,
        multipliers: 1,
      });
    });

    it('should set the category multipliers using the board multipliers ', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const numberLayout = wrapper.findAllComponents({ name: stubs.MarketsCategoryLayout.name }).at(0);

      expect(numberLayout.props().selectedMultipliers).to.be.eql([1, 3]);
    });
  });

  describe('on the WHEELS_WITH_SYMBOL category', () => {
    const wheelsWithSymbolCategory = {
      boards: [{ betType: CONSTANTS.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL }],
      multipliers: [2, 3],
    };

    beforeEach(() => {
      marketsStub.returns({
        ...marketsMock,
        categories: {
          ...marketsMock.categories,
          [CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL]: wheelsWithSymbolCategory,
        },
      });
    });

    it('should pass render the MarketsOptionsSelection passing the correct props', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const symbolSelection = wrapper.findAllComponents({ name: stubs.MarketsOptionsSelection.name }).at(0);

      expect(symbolSelection.props().options).to.eql([
        {
          title: 'markets.categories.WHEELS_WITH_SYMBOL.options.atLeastOnWheel.mainScreen',
          value: CONSTANTS.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL,
        },
        {
          title: 'markets.categories.WHEELS_WITH_SYMBOL.options.noWheel.mainScreen',
          value: CONSTANTS.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL,
        },
      ]);
      expect(symbolSelection.props().optionsSelected).to.eql([CONSTANTS.ILOT_GAMETYPES.PLAY_SYMBOL_ON_NONE_WHEEL]);
      expect(symbolSelection.props().theme).to.eql('dark');
    });

    it('should call the store action when a options is clicked', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const symbolSelection = wrapper.findAllComponents({ name: stubs.MarketsOptionsSelection.name }).at(0);

      symbolSelection.vm.$emit('option-clicked', 1);
      expect(toggleGameTypeSpy.getCall(0).args[1]).to.be.eq(1);
    });

    it('should call the store action to update the category multipliers', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const symbolLayout = wrapper.findAllComponents({ name: stubs.MarketsCategoryLayout.name }).at(1);

      symbolLayout.vm.$emit('update-multipliers', 1);
      expect(toggleMultipliersSpy.getCall(0).args[1]).to.be.eql({
        gameCategory: CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
        multipliers: 1,
      });
    });

    it('should set the category multipliers using the category multipliers ', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const symbolLayout = wrapper.findAllComponents({ name: stubs.MarketsCategoryLayout.name }).at(1);

      expect(symbolLayout.props().selectedMultipliers).to.be.eql([2, 3]);
    });
  });

  describe('on the WHEELS_WITH_NUMBER category', () => {
    const wheelsWithNumberCategory = {
      boards: [{ betType: CONSTANTS.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS }],
      multipliers: [4],
    };

    beforeEach(() => {
      marketsStub.returns({
        ...marketsMock,
        categories: {
          ...marketsMock.categories,
          [CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_NUMBER]: wheelsWithNumberCategory,
        },
      });
    });

    it('should pass render the MarketsOptionsSelection passing the correct props', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const numbersOnWheelsSelection = wrapper.findAllComponents({ name: stubs.MarketsOptionsSelection.name }).at(1);

      expect(numbersOnWheelsSelection.props().options).to.eql([
        {
          title: 'markets.categories.WHEELS_WITH_NUMBER.options.twoWheels.mainScreen',
          value: CONSTANTS.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS,
        },
        {
          title: 'markets.categories.WHEELS_WITH_NUMBER.options.threeWheels.mainScreen',
          value: CONSTANTS.ILOT_GAMETYPES.PLAY_NUMBER_ON_THREE_WHEELS,
        },
      ]);
      expect(numbersOnWheelsSelection.props().optionsSelected).to.eql([
        CONSTANTS.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS,
      ]);
    });

    it('should call the store action when a options is clicked', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const numbersOnWheelsSelection = wrapper.findAllComponents({ name: stubs.MarketsOptionsSelection.name }).at(1);

      numbersOnWheelsSelection.vm.$emit('option-clicked', 2);
      expect(toggleGameTypeSpy.getCall(0).args[1]).to.be.eq(2);
    });

    it('should call the store action to update the category multipliers', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const numbersOnWheelsLayout = wrapper.findAllComponents({ name: stubs.MarketsCategoryLayout.name }).at(2);

      numbersOnWheelsLayout.vm.$emit('update-multipliers', 1);
      expect(toggleMultipliersSpy.getCall(0).args[1]).to.be.eql({
        gameCategory: CONSTANTS.MARKETS_CATEGORY.WHEELS_WITH_NUMBER,
        multipliers: 1,
      });
    });

    it('should set the category multipliers using the category multipliers ', () => {
      const wrapper = shallowMount(PlayMarkets, { stubs, store, localVue });
      const numbersOnWheelsLayout = wrapper.findAllComponents({ name: stubs.MarketsCategoryLayout.name }).at(2);

      expect(numbersOnWheelsLayout.props().selectedMultipliers).to.be.eql([4]);
    });
  });
});
