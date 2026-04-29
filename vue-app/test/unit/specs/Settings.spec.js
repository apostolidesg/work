import { createLocalVue, shallowMount } from '@vue/test-utils';
import Settings from '../../../src/components/lobby/games/kino/settings/Settings.vue';
import OptionDialog from '../../../src/components/modals/OptionDialog.vue';
import sinon from 'sinon';
import Vue from 'vue';
import Vuex from 'vuex';

describe('Settings', () => {
  let wrapper;
  let sandbox;
  let localVue;
  let store;

  let getActiveBetAreaStub;
  let isKinoClose2WinEnabledStub;

  let quickPickSpy;
  let setKinobonusValueSpy;
  let setKinoClose2WinValueSpy;
  let deleteBetAreaSpy;

  const stubs = {
    MinusPlusButton: {
      name: 'MinusPlusButton',
      template: '<button></button>',
    },
    BaseClearButton: {
      name: 'BaseClearButton',
      template: '<button></button>',
    },
    PayTable: {
      name: 'PayTable',
      template: '<div></div>',
      props: ['gameType', 'multiplier', 'kinoBonusActive', 'close2WinActive', 'close2WinAvailable'],
    },
    BettingAmount: {
      name: 'BettingAmount',
      template: '<div></div>',
      props: ['selectedMultipliers', 'disabled'],
    },
    KinoBonusToggle: {
      name: 'KinoBonusToggle',
      template: '<input type="checkbox"/>',
      props: ['value', 'disabled'],
      emits: ['input'],
    },
    Close2WinToggle: {
      name: 'Close2WinToggle',
      template: '<input type="checkbox"/>',
      props: ['value', 'disabled'],
      emits: ['input'],
    },
  };

  beforeEach(() => {
    Vue.prototype.$eventHub = new Vue(); // Global event bus
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);

    getActiveBetAreaStub = sandbox.stub().returns({ kinoBonusActive: false, gameType: 0, selectedMultipliers: [] });
    isKinoClose2WinEnabledStub = sandbox.stub().returns(true);
    quickPickSpy = sandbox.spy();
    setKinobonusValueSpy = sandbox.spy();
    setKinoClose2WinValueSpy = sandbox.spy();
    deleteBetAreaSpy = sandbox.spy();

    store = new Vuex.Store({
      modules: {
        CONFIGURATION_STORE_MODULE: {
          namespaced: true,
          getters: {
            IS_KINO_CLOSE_2_WIN_ENABLED: isKinoClose2WinEnabledStub,
          },
        },
        PLAYER_SESSION_MODULE: {
          namespaced: true,
          actions: {
            UPDATE_ACTIVE_BETSLIP_AREA: () => {},
          },
        },
        KINO_GAME_STORE_MODULE: {
          namespaced: true,
          state: {
            activeAreaIndex: 1,
          },
          actions: {
            QUICK_PICK: quickPickSpy,
            SET_KINO_BONUS_VALUE: setKinobonusValueSpy,
            SET_KINO_CLOSE_2_WIN_VALUE: setKinoClose2WinValueSpy,
            DELETE_BET_AREA: deleteBetAreaSpy,
          },
          getters: {
            GET_ACTIVE_BET_AREA: getActiveBetAreaStub,
          },
        },
      },
    });
  });

  afterEach(async () => {
    sandbox.restore();
    wrapper.destroy();
  });

  it('should render the pay table component', () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: true,
      kinoClose2WinActive: true,
      gameType: 3,
      selectedMultipliers: [1, 2],
      multiplier: 3,
      pickedNumbers: [1, 2, 3],
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const payTable = wrapper.findComponent({ name: stubs.PayTable.name });
    expect(payTable.exists()).to.be.true;
    expect(payTable.props().gameType).to.eql(3);
    expect(payTable.props().multiplier).to.eql(3);
    expect(payTable.props().kinoBonusActive).to.be.true;
    expect(payTable.props().close2WinActive).to.be.true;
    expect(payTable.props().close2WinAvailable).to.be.true;
  });

  it('should set selected multipliers to [1, 3, 5] when corresponding buttons are clicked and number are selected', async () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 0,
      selectedMultipliers: [1, 3, 5],
      pickedNumbers: [1],
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const bettingAmount = wrapper.findComponent({ name: stubs.BettingAmount.name });

    expect(bettingAmount.props().selectedMultipliers).to.eql([1, 3, 5]);
    expect(bettingAmount.props().disabled).to.be.false;
  });

  it('should disable betting amounts when no numbers are selected', async () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 0,
      selectedMultipliers: [1, 3, 5],
      pickedNumbers: [],
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const bettingAmount = wrapper.findComponent({ name: stubs.BettingAmount.name });
    expect(bettingAmount.props().selectedMultipliers).to.eql([1, 3, 5]);
    expect(bettingAmount.props().disabled).to.be.true;
  });

  it('should pass the kinoBonusActive value to the KinoBonusToggle component', async () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: true,
      gameType: 1,
      selectedMultipliers: [1, 3, 5],
      pickedNumbers: [1],
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const kinoBonusToggle = wrapper.findComponent({ name: stubs.KinoBonusToggle.name });
    expect(kinoBonusToggle.props().value).to.be.true;
  });

  it('should dispatch SET_KINO_BONUS_VALUE action when kinoBonusToggle emits input event', async () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: true,
      gameType: 1,
      selectedMultipliers: [1, 3, 5],
      pickedNumbers: [1],
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const kinoBonusToggle = wrapper.findComponent({ name: stubs.KinoBonusToggle.name });
    kinoBonusToggle.vm.$emit('input', false);

    expect(setKinobonusValueSpy.called).to.be.true;
    expect(setKinobonusValueSpy.getCall(0).args[1]).to.eql({ value: false });
  });

  it('should disable kinoBonusToggle when no numbers are selected', async () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: true,
      gameType: 0,
      selectedMultipliers: [1],
      pickedNumbers: [],
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const kinoBonusToggle = wrapper.findComponent({ name: stubs.KinoBonusToggle.name });
    expect(kinoBonusToggle.props().disabled).to.be.true;
  });

  it('should not show Close2WinToggle when Close2Win is disabled', () => {
    isKinoClose2WinEnabledStub.returns(false);

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const close2WinToggle = wrapper.findComponent({ name: stubs.Close2WinToggle.name });
    expect(close2WinToggle.exists()).to.be.false;
  });

  it('should pass the kinoClose2WinActive value to the Close2WinToggle component', () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 3,
      selectedMultipliers: [1, 3, 5],
      pickedNumbers: [1, 2, 3],
      kinoClose2WinActive: true,
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const close2WinToggle = wrapper.findComponent({ name: stubs.Close2WinToggle.name });
    expect(close2WinToggle.props().value).to.be.true;
  });

  it('should dispatch SET_KINO_CLOSE_2_WIN_VALUE action when Close2WinToggle emits input event', () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 3,
      selectedMultipliers: [1, 3, 5],
      pickedNumbers: [1, 2, 3],
      kinoClose2WinActive: true,
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const close2WinToggle = wrapper.findComponent({ name: stubs.Close2WinToggle.name });
    close2WinToggle.vm.$emit('input', false);

    expect(setKinoClose2WinValueSpy.called).to.be.true;
    expect(setKinoClose2WinValueSpy.getCall(0).args[1]).to.eql({ value: false });
  });

  it('should disable Close2WinToggle when less than 2 numbers are selected', () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 1,
      selectedMultipliers: [1, 3, 5],
      pickedNumbers: [1],
      kinoClose2WinActive: true,
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const close2WinToggle = wrapper.findComponent({ name: stubs.Close2WinToggle.name });
    expect(close2WinToggle.props().disabled).to.be.true;
  });

  it('should disable Close2WinToggle when 10 or more numbers are selected', () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 10,
      selectedMultipliers: [1, 3, 5],
      pickedNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      kinoClose2WinActive: true,
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const close2WinToggle = wrapper.findComponent({ name: stubs.Close2WinToggle.name });
    expect(close2WinToggle.props().disabled).to.be.true;
  });

  it('should not disable Close2WinToggle when 2 or more numbers are selected and less than 10 numbers are selected', () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 3,
      selectedMultipliers: [1, 3, 5],
      pickedNumbers: [1, 2, 3],
      kinoClose2WinActive: true,
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const close2WinToggle = wrapper.findComponent({ name: stubs.Close2WinToggle.name });
    expect(close2WinToggle.props().disabled).to.be.false;
  });

  it('should show modal when clear button at the bottom is clicked and the betArea is dirty', () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 2,
      selectedMultipliers: [1],
      pickedNumbers: [1, 2],
      isDirty: () => true,
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const dialogWrapper = shallowMount(OptionDialog, {});

    wrapper.findComponent({ name: stubs.BaseClearButton.name }).vm.$emit('click');
    expect(dialogWrapper.vm.isVisible).to.be.true;
  });

  it('should not show modal when clear button at the bottom is clicked and the betArea is not dirty', () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 2,
      selectedMultipliers: [1],
      pickedNumbers: [1, 2],
      isDirty: () => false,
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const dialogWrapper = shallowMount(OptionDialog, {});

    wrapper.findComponent({ name: stubs.BaseClearButton.name }).vm.$emit('click');
    expect(dialogWrapper.vm.isVisible).to.be.false;
  });

  it('should dispatch a clear action when clear area is approved', () => {
    getActiveBetAreaStub.returns({
      kinoBonusActive: false,
      gameType: 2,
      selectedMultipliers: [1],
      pickedNumbers: [1, 2],
      isDirty: () => true,
    });

    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const dialogWrapper = shallowMount(OptionDialog, {});

    wrapper.findComponent({ name: stubs.BaseClearButton.name }).vm.$emit('click');
    expect(dialogWrapper.vm.isVisible).to.be.true;
    dialogWrapper.find('#yes-option').trigger('click');

    expect(deleteBetAreaSpy.called).to.be.true;
    expect(deleteBetAreaSpy.getCall(0).args[1]).to.eql({ areaIndex: 1 });
  });

  it('should increase quickPick game type when plus button is clicked', () => {
    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const plusBtn = wrapper.findAllComponents({ name: stubs.MinusPlusButton.name }).at(1);
    wrapper.vm.quickPickGameType = 1;
    plusBtn.vm.$emit('click');
    expect(wrapper.vm.quickPickGameType).to.equal(2);
    plusBtn.vm.$emit('click');
    expect(wrapper.vm.quickPickGameType).to.equal(3);
  });

  it('should set quickPick game type to 1 when plus button is clicked for the first time', () => {
    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const plusBtn = wrapper.findAllComponents({ name: stubs.MinusPlusButton.name }).at(1);
    wrapper.vm.quickPickGameType = null;
    plusBtn.vm.$emit('click');
    expect(wrapper.vm.quickPickGameType).to.equal(1);
  });

  it('should not increase quickPick game type when quickPickGameType is at its limit', () => {
    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const plusBtn = wrapper.findAllComponents({ name: stubs.MinusPlusButton.name }).at(1);
    wrapper.vm.quickPickGameType = wrapper.vm.gameTypeValues.length;
    const pastQuickPickGameType = wrapper.vm.quickPickGameType;
    plusBtn.vm.$emit('click');
    expect(wrapper.vm.quickPickGameType).to.eql(pastQuickPickGameType);
  });

  it('should decrease quickPick game type when minus button is clicked', () => {
    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const minusBtn = wrapper.findAllComponents({ name: stubs.MinusPlusButton.name }).at(0);
    wrapper.vm.quickPickGameType = 3;
    minusBtn.vm.$emit('click');
    expect(wrapper.vm.quickPickGameType).to.eql(2);
    minusBtn.vm.$emit('click');
    expect(wrapper.vm.quickPickGameType).to.eql(1);
  });

  it('should not decrease quickPick game type when minus button is clicked and quickPickGameType = 1 or null', () => {
    wrapper = shallowMount(Settings, {
      stubs,
      localVue,
      store,
    });

    const minusBtn = wrapper.findAllComponents({ name: stubs.MinusPlusButton.name }).at(0);
    minusBtn.vm.$emit('click');
    expect(wrapper.vm.quickPickGameType).to.eql(null);
    wrapper.vm.quickPickGameType = 1;
    minusBtn.vm.$emit('click');
    expect(wrapper.vm.quickPickGameType).to.eql(1);
  });
});
