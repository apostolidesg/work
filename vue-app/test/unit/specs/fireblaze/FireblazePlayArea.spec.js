import sinon from 'sinon';
import FireblazePlayArea from '../../../../src/components/lobby/games/fireblaze/mainScreen/FireblazePlayArea.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';

const statistics = {
  numbers: Array.from({ length: 40 })
    .map((_, index) => ({ occurrences: index, delays: index }))
    .reduce((acc, curr, index) => {
      acc[index + 1] = curr;
      return acc;
    }, {}),
};

describe('FireblazePlayArea', () => {
  Vue.prototype.$eventHub = new Vue();
  let localVue;
  let sandbox;
  let store;
  let stubs;
  let mocks;

  let getSelectedBoardStub;
  let isBoardEmptyStub;
  let toggleNumbersSpy;
  let selectMultiplierSpy;
  let clearBetslipSpy;
  let statisticsSelectionSpy;
  let $tStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    localVue.use(Vuex);

    getSelectedBoardStub = sandbox.stub();
    isBoardEmptyStub = sandbox.stub().returns(false);
    toggleNumbersSpy = sandbox.spy();
    selectMultiplierSpy = sandbox.spy();
    clearBetslipSpy = sandbox.spy();
    statisticsSelectionSpy = sandbox.spy();
    $tStub = sandbox.stub();

    stubs = {
      FireblazeNumbersSelections: {
        name: 'FireblazeNumbersSelections',
        template: '<div></div>',
        props: ['selectedNumbers', 'selectedSystemId', 'numbers'],
        emits: ['toggle-number'],
      },
      FireblazeStakesSelections: {
        name: 'FireblazeStakesSelections',
        template: '<div></div>',
        props: ['selectedStakes', 'stakes'],
        emits: ['select-stake'],
      },
      BaseClearButton: {
        name: 'BaseClearButton',
        template: '<button></button>',
        props: ['top-label', 'theme', 'disabled'],
        emits: ['click'],
      },
      TristateSwitch: {
        name: 'TristateSwitch',
        template: '<div></div>',
        props: ['value', 'options', 'leftLabel', 'rightLabel'],
        emits: ['input'],
      },
    };

    store = new Vuex.Store({
      modules: {
        FIREBLAZE_GAME_STORE_MODULE: {
          namespaced: true,
          state: {
            statisticsSelection: 'OCCURRENCES',
            statistics,
          },
          getters: {
            GET_SELECTED_BOARD: getSelectedBoardStub,
          },
          actions: {
            SET_SELECTION: toggleNumbersSpy,
            SET_MULTIPLIER: selectMultiplierSpy,
            RESET_BETSLIPS: clearBetslipSpy,
            SET_STATISTICS_SELECTION: statisticsSelectionSpy,
          },
        },
      },
    });

    getSelectedBoardStub.returns({
      panels: [{ selection: [1, 2, 3, 4] }],
      multipliers: [2],
      systemId: 'default',
      isEmpty: isBoardEmptyStub,
    });

    mocks = {
      $t: $tStub,
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render the component', () => {
    const wrapper = shallowMount(FireblazePlayArea, { stubs, localVue, store });
    expect(wrapper.exists()).to.be.true;
  });

  it('should render FireblazeNumbersSelections component with proper props', () => {
    const wrapper = shallowMount(FireblazePlayArea, { stubs, localVue, store });
    const numbersSelection = wrapper.findComponent({ name: 'FireblazeNumbersSelections' });
    expect(numbersSelection.props('selectedNumbers')).to.deep.equal([1, 2, 3, 4]);
  });

  it('should render FireblazeStakesSelections component with proper props', () => {
    const wrapper = shallowMount(FireblazePlayArea, { stubs, localVue, store });
    const stakesSelection = wrapper.findComponent({ name: 'FireblazeStakesSelections' });
    expect(stakesSelection.props('selectedStakes')).to.deep.equal([2]);
  });

  it('should disable BaseClearButton when board is empty', () => {
    isBoardEmptyStub.returns(true);
    const wrapper = shallowMount(FireblazePlayArea, { stubs, localVue, store });
    const clearButton = wrapper.findComponent({ name: 'BaseClearButton' });
    expect(clearButton.props('disabled')).to.be.true;
  });

  it('should emit event to clear board when BaseClearButton is clicked', () => {
    const emitSpy = sandbox.spy(Vue.prototype.$eventHub, '$emit');
    const wrapper = shallowMount(FireblazePlayArea, { stubs, localVue, store });
    const clearButton = wrapper.findComponent({ name: 'BaseClearButton' });
    clearButton.vm.$emit('click');
    expect(emitSpy.calledOnce).to.be.true;
  });

  it('should update statistics selection when TristateSwitch emits input', () => {
    const wrapper = shallowMount(FireblazePlayArea, { stubs, localVue, store });
    const tristateSwitch = wrapper.findComponent({ name: 'TristateSwitch' });
    tristateSwitch.vm.$emit('input', 'NONE');
    expect(statisticsSelectionSpy.calledOnce).to.be.true;
  });
});
