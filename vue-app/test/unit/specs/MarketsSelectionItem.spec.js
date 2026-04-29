import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import types from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import moduleTypes from '../../../src/store/modules/types';
import sinon from 'sinon';
import powerspinConstants from '../../../src/util/powerspinConstants';
import MarketsSelectionItem from '../../../src/components/lobby/games/Powerspin/SideScreen/MarketsSelectionItem.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

const numberCategory = {
  type: powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL,
  boards: [{ panels: [{ selection: [1, 2, 3] }] }],
};

const symbolCategory = {
  type: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_SYMBOL,
  boards: [{ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_SYMBOL_ON_AT_LEAST_ONE_WHEEL }],
};

const numberOnAnyCategory = {
  type: powerspinConstants.MARKETS_CATEGORY.WHEELS_WITH_NUMBER,
  boards: [{ betType: powerspinConstants.ILOT_GAMETYPES.PLAY_NUMBER_ON_TWO_WHEELS }],
};

describe('Markets Selection Item Component', () => {
  let stubs;
  let propsData;
  let getters;
  let actions;
  let store;
  let mocks;
  let sandbox;

  let tStub;
  let resetCategorySpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    resetCategorySpy = sandbox.spy();

    tStub = sandbox.stub();

    stubs = {
      PowerspinSidescreenSelectionItem: {
        name: 'PowerspinSidescreenSelectionItem',
        props: ['type'],
        template: '<div><slot></slot></div>',
      },
      BaseClearButton: {
        name: 'BaseClearButton',
        emits: ['click'],
        template: '<button></button>',
      },
    };

    mocks = {
      $t: tStub,
    };

    getters = {
      [types.getters.GET_CATEGORY_COST]: () => () => 1,
    };

    actions = {
      [types.actions.RESET_MARKETS_CATEGORY]: resetCategorySpy,
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

    propsData = {
      category: numberCategory,
      betslipIndex: 0,
    };
  });

  afterEach(() => {
    tStub.resetBehavior();
    resetCategorySpy.resetHistory();
    sandbox.restore();
  });

  it('should render the category cost', () => {
    tStub.withArgs('amount').returns('Amount');
    const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
    const cost = wrapper.find('.powerspin-market-selection-item__cost');

    expect(cost.text()).to.be.eql('Amount: 1€');
  });

  describe('when the category is NUMBER_ON_WHEEL', () => {
    it('should render the correct number of PowerspinSidescreenSelectionItem components', () => {
      const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
      const selectionItems = wrapper.findAllComponents({ name: stubs.PowerspinSidescreenSelectionItem.name });

      const EXPECTED = numberCategory.boards[0].panels[0].selection.length;
      expect(selectionItems.length).to.eq(EXPECTED);
    });

    it('should pass the correct type to the PowerspinSidescreenSelectionItem components', () => {
      const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
      const selectionItems = wrapper.findAllComponents({ name: stubs.PowerspinSidescreenSelectionItem.name });

      expect(selectionItems.at(0).props().type).to.eql('simple-number-board-blue');
      expect(selectionItems.at(1).props().type).to.eql('simple-number-board-red');
      expect(selectionItems.at(2).props().type).to.eql('simple-number-board-green');
    });

    it('should pass the correct content to the PowerspinSidescreenSelectionItem components', () => {
      const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
      const selectionItems = wrapper.findAllComponents({ name: stubs.PowerspinSidescreenSelectionItem.name });

      expect(selectionItems.at(0).text()).to.eql('1');
      expect(selectionItems.at(1).text()).to.eql('2');
      expect(selectionItems.at(2).text()).to.eql('3');
    });
  });

  describe('when the category is WHEELS_WITH_SYMBOL', () => {
    beforeEach(() => {
      propsData = { ...propsData, category: symbolCategory };
    });

    it('should render the correct number of PowerspinSidescreenSelectionItem components', () => {
      const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
      const selectionItems = wrapper.findAllComponents({ name: stubs.PowerspinSidescreenSelectionItem.name });

      const EXPECTED = symbolCategory.boards.length;
      expect(selectionItems.length).to.eq(EXPECTED);
    });

    it('should pass the correct type to the PowerspinSidescreenSelectionItem components', () => {
      const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
      const selectionItems = wrapper.findAllComponents({ name: stubs.PowerspinSidescreenSelectionItem.name });

      expect(selectionItems.at(0).props().type).to.eql('markets-board');
    });

    it('should pass the correct content to the PowerspinSidescreenSelectionItem components', () => {
      tStub.withArgs('markets.categories.WHEELS_WITH_SYMBOL.options.atLeastOnWheel.sideScreen').returns('ONE_WHEEL');
      const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
      const selectionItems = wrapper.findAllComponents({ name: stubs.PowerspinSidescreenSelectionItem.name });

      expect(selectionItems.at(0).text()).to.eql('ONE_WHEEL');
    });
  });

  describe('when the category is WHEELS_WITH_NUMBER', () => {
    beforeEach(() => {
      propsData = { ...propsData, category: numberOnAnyCategory };
    });

    it('should render the correct number of PowerspinSidescreenSelectionItem components', () => {
      const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
      const selectionItems = wrapper.findAllComponents({ name: stubs.PowerspinSidescreenSelectionItem.name });

      const EXPECTED = symbolCategory.boards.length;
      expect(selectionItems.length).to.eq(EXPECTED);
    });

    it('should pass the correct type to the PowerspinSidescreenSelectionItem components', () => {
      const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
      const selectionItems = wrapper.findAllComponents({ name: stubs.PowerspinSidescreenSelectionItem.name });

      expect(selectionItems.at(0).props().type).to.eql('markets-board');
    });

    it('should pass the correct content to the PowerspinSidescreenSelectionItem components', () => {
      tStub.withArgs('markets.categories.WHEELS_WITH_NUMBER.options.twoWheels.sideScreen').returns('TWO_WHEELS');
      const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
      const selectionItems = wrapper.findAllComponents({ name: stubs.PowerspinSidescreenSelectionItem.name });

      expect(selectionItems.at(0).text()).to.eql('TWO_WHEELS');
    });
  });

  it('should render the BaseClearButton component', () => {
    const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
    const btn = wrapper.findComponent({ name: stubs.BaseClearButton.name });

    expect(btn.exists()).to.be.true;
  });

  it('should should call the store action when the delete btn in clicked', () => {
    const wrapper = shallowMount(MarketsSelectionItem, { propsData, mocks, localVue, stubs, store });
    const btn = wrapper.findComponent({ name: stubs.BaseClearButton.name });

    btn.vm.$emit('click', { stopPropagation: () => {} });

    expect(resetCategorySpy.getCall(0).args[1]).to.be.eql({
      betslipIndex: 0,
      categoryType: powerspinConstants.MARKETS_CATEGORY.NUMBER_ON_WHEEL,
    });
  });
});
