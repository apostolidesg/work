import { createLocalVue, shallowMount } from '@vue/test-utils';
import PlayPowerspinHeader from '../../../src/components/lobby/games/Powerspin/MainScreen/PlayPowerspinHeader.vue';
import Vuex from 'vuex';
import types from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import sinon from 'sinon';
import moduleTypes from '../../../src/store/modules/types';
import modalEventConstants from '../../../src/util/modalEventConstants';
import infoModalMessages from '../../../src/util/infoModalMessages';
import CONSTANTS from '../../../src/util/powerspinConstants';

const localVue = createLocalVue();
localVue.use(Vuex);

const getNumberBoard = () => ({ panels: [{ requested: [1], selection: [] }] });
const getNumberBoardWithRequested = () => ({ panels: [{ requested: [1, 3], selection: [] }] });

describe('PlayPowerspinHeader', () => {
  let stubs;
  let getters;
  let actions;
  let store;
  let mocks;
  let propsData;

  const activeBetslipStub = sinon.stub();
  const wheelsLengthStub = sinon.stub();
  const isMarketsEmptyStub = sinon.stub();
  const marketsLengthStub = sinon.stub();
  const addWheelSpy = sinon.spy();
  const removeWheelSpy = sinon.spy();
  const emitSpy = sinon.spy();

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
    stubs = {
      Stepper: {
        name: 'Stepper',
        props: ['wheels', 'is-active'],
        template: '<div class="stepper-item-stub"></div>',
      },
      MarketsButton: {
        name: 'MarketsButton',
        props: ['active'],
        template: '<div class="markets-button-stub"></div>',
      },
    };

    getters = {
      [types.getters.GET_SELECTED_BETSLIP]: activeBetslipStub,
      [types.getters.GET_WHEELS_LENGTH]: wheelsLengthStub,
      [types.getters.GET_MARKETS]: marketsLengthStub.returns(marketsMock),
    };

    actions = {
      [types.actions.ADD_WHEEL]: addWheelSpy,
      [types.actions.REMOVE_WHEEL]: removeWheelSpy,
    };

    mocks = {
      $eventHub: { $emit: emitSpy },
    };

    propsData = {
      mode: 'WHEELS',
    };

    isMarketsEmptyStub.returns(false);

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
    activeBetslipStub.resetBehavior();
    wheelsLengthStub.resetBehavior();
    marketsLengthStub.resetBehavior();
    addWheelSpy.resetHistory();
    removeWheelSpy.resetHistory();
    emitSpy.resetHistory();
  });

  it('should render the Stepper component', () => {
    const wrapper = shallowMount(PlayPowerspinHeader, { stubs, propsData });
    const stepper = wrapper.findComponent({ name: stubs.Stepper.name });
    expect(stepper.exists()).to.be.true;
  });

  it('should pass the wheels from the store to the Stepper component', () => {
    const mockWheels = [{ wheel: 1 }, { wheel: 2 }];
    activeBetslipStub.returns({ wager: { wheels: mockWheels } });
    const wrapper = shallowMount(PlayPowerspinHeader, { stubs, store, localVue, propsData });
    const stepper = wrapper.findComponent({ name: stubs.Stepper.name });

    expect(stepper.props().wheels).to.eql(mockWheels);
  });

  it('should call the REMOVE_WHEEL on the store when the stepper emits the relevant event', () => {
    wheelsLengthStub.returns(3);
    activeBetslipStub.returns({ wager: { wheels: [] } });
    const wrapper = shallowMount(PlayPowerspinHeader, { stubs, store, localVue, propsData });
    const stepper = wrapper.findComponent({ name: stubs.Stepper.name });

    stepper.vm.$emit('remove-wheels-after-index', 0);
    expect(removeWheelSpy.callCount).to.eq(2);
    expect(removeWheelSpy.getCall(0).args[1]).to.eql({ wheelIndex: 2 });
    expect(removeWheelSpy.getCall(1).args[1]).to.eql({ wheelIndex: 1 });
  });

  it('should call the ADD_WHEEL on the store when the stepper emits the relevant event', () => {
    activeBetslipStub.returns({ wager: { wheels: [{ getNumberBoard }] } });
    const wrapper = shallowMount(PlayPowerspinHeader, { stubs, store, localVue, propsData });
    const stepper = wrapper.findComponent({ name: stubs.Stepper.name });

    stepper.vm.$emit('add-wheels', 2);
    expect(addWheelSpy.callCount).to.eq(2);
  });

  it('should present a modal if the stepper emits add-wheels and the first wheel contains more than the default requested', async () => {
    activeBetslipStub.returns({ wager: { wheels: [{ getNumberBoard: getNumberBoardWithRequested }] } });
    const wrapper = shallowMount(PlayPowerspinHeader, { stubs, mocks, store, localVue, propsData });
    const stepper = wrapper.findComponent({ name: stubs.Stepper.name });

    stepper.vm.$emit('add-wheels', 2);
    expect(addWheelSpy.callCount).to.eq(0);
    expect(
      emitSpy.withArgs(modalEventConstants.OPEN.INFO, infoModalMessages.powerspinRequestedNumbersNotAllowedInCombo)
        .calledOnce
    ).to.be.true;
  });
  it('should pass false to the Markets Button if Markets are empty and mode is not Markets', () => {
    activeBetslipStub.returns({ wager: { wheels: [{ getNumberBoard: getNumberBoardWithRequested }] } });
    isMarketsEmptyStub.returns(true);
    const wrapper = shallowMount(PlayPowerspinHeader, { stubs, mocks, store, localVue, propsData });

    const marketsBtn = wrapper.findComponent({ name: stubs.MarketsButton.name });

    expect(marketsBtn.props().active).to.eql(false);
  });
  it('should pass true to the Markets Button if Markets are not empty and mode is Markets', () => {
    activeBetslipStub.returns({ wager: { wheels: [{ getNumberBoard: getNumberBoardWithRequested }] } });
    isMarketsEmptyStub.returns(true);
    propsData.mode = 'MARKETS';
    const wrapper = shallowMount(PlayPowerspinHeader, { stubs, mocks, store, localVue, propsData });

    const marketsBtn = wrapper.findComponent({ name: stubs.MarketsButton.name });

    expect(marketsBtn.props().active).to.eql(true);
  });
});
