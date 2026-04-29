import sinon from 'sinon';
import Fireblaze from '../../../../src/components/lobby/games/fireblaze/Fireblaze.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';

describe('Fireblaze Component', () => {
  const instance = new Vue();
  let localVue;
  let wrapper;
  let sandbox;
  let stubs;
  let store;

  // stubs
  let zeroBalanceStub;
  let isBetslipEmptyStub;
  let isActiveLiveDrawScreenStub;

  // spies
  let setGameTypeSpy;
  let $onSpy;
  let $offSpy;
  let $emitSpy;
  let resetBetslipsSpy;

  beforeEach(() => {
    Vue.prototype.$eventHub = new Vue();
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);
    setGameTypeSpy = sandbox.spy();

    $onSpy = sandbox.spy(instance.$eventHub, '$on');
    $offSpy = sandbox.spy(instance.$eventHub, '$off');
    $emitSpy = sandbox.spy(instance.$eventHub, '$emit');
    resetBetslipsSpy = sandbox.spy();

    zeroBalanceStub = sandbox.stub().returns(false);
    isBetslipEmptyStub = sandbox.stub().returns(false);
    isActiveLiveDrawScreenStub = sandbox.stub().returns(false);

    stubs = {
      PlayAreaLayout: {
        name: 'PlayAreaLayout',
        template:
          '<div class="play-area-layout-stub"><slot name="settings"></slot> <slot></slot> <slot name="sidescreen"></slot></div>',
      },
      FireblazeSettings: {
        name: 'FireblazeSettings',
        template: '<div class="fireblaze-settings-stub"></div>',
      },
      FireblazePlayArea: {
        name: 'FireblazePlayArea',
        template: '<div class="fireblaze-play-area-stub"></div>',
      },
      FireblazeSidescreen: {
        name: 'FireblazeSidescreen',
        template: '<div class="fireblaze-sidescreen-stub"></div>',
      },
      LiveDrawScreen: {
        name: 'LiveDrawScreen',
        template: '<div class="live-draw-screen-stub"></div>',
      },
    };

    store = new Vuex.Store({
      modules: {
        SESSION_STORE_MODULE: {
          namespaced: true,
          actions: {
            SET_GAME_TYPE: setGameTypeSpy,
          },
          getters: {
            GET_IS_ZERO_BALANCE: zeroBalanceStub,
          },
        },
        FIREBLAZE_GAME_STORE_MODULE: {
          namespaced: true,
          actions: {
            RESET_BETSLIPS: resetBetslipsSpy,
          },
          getters: {
            GET_IS_BETSLIP_EMPTY: isBetslipEmptyStub,
          },
        },
        PLAYER_SESSION_MODULE: {
          namespaced: true,
          getters: {
            GET_IS_ACTIVE_LIVE_DRAW_SCREEN: isActiveLiveDrawScreenStub,
          },
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
    wrapper.destroy();
  });

  it('should render all the components when live draw screen is not active', () => {
    isActiveLiveDrawScreenStub.returns(false);
    wrapper = shallowMount(Fireblaze, { stubs, localVue, store });

    expect(wrapper.exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.FireblazeSidescreen.name }).exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.FireblazePlayArea.name }).exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.FireblazeSettings.name }).exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.PlayAreaLayout.name }).exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.LiveDrawScreen.name }).exists()).to.false;
  });

  it('should render LiveDrawScreen when live draw screen is active', () => {
    isActiveLiveDrawScreenStub.returns(true);
    wrapper = shallowMount(Fireblaze, { stubs, localVue, store });

    expect(wrapper.exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.LiveDrawScreen.name }).exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.PlayAreaLayout.name }).exists()).to.false;
  });

  it('should set the game type to fireblaze', () => {
    wrapper = shallowMount(Fireblaze, { stubs, localVue, store });
    expect(setGameTypeSpy.getCall(0).args[1]).to.deep.equal({ gameType: 'FIREBLAZE' });
  });

  it('should listen to the eventHub for the replayWager and clearBetslip events', () => {
    wrapper = shallowMount(Fireblaze, { stubs, localVue, store });
    expect($onSpy.getCall(0).args[0]).to.equal('replayWager');
    expect($onSpy.getCall(0).args[1]).to.eq(wrapper.vm.replayWager);
    expect($onSpy.getCall(1).args[0]).to.equal('clearBetslip');
    expect($onSpy.getCall(1).args[1]).to.eq(wrapper.vm.resetBetslips);
  });

  it('should remove event listeners when destroyed', () => {
    wrapper = shallowMount(Fireblaze, { stubs, localVue, store });
    wrapper.destroy();
    expect($offSpy.getCall(0).args[0]).to.equal('replayWager');
    expect($offSpy.getCall(1).args[0]).to.equal('clearBetslip');
  });

  describe('when a clearBetslip event is emitted', () => {
    it('should reset the betslips', () => {
      wrapper = shallowMount(Fireblaze, { stubs, localVue, store });
      wrapper.vm.$eventHub.$emit('clearBetslip');
      expect(resetBetslipsSpy.calledOnce).to.be.true;
    });
  });

  describe('handleRouteParams', () => {
    it('should call replayWager if wagerId exists in route params', () => {
      const mockRoute = {
        params: {
          wagerId: 'test123'
        }
      };
      const replayWagerSpy = sandbox.spy(Fireblaze.methods, 'replayWager');

      wrapper = shallowMount(Fireblaze, {
        stubs,
        localVue,
        store,
        mocks: {
          $route: mockRoute
        }
      });

      expect(replayWagerSpy.calledOnceWith({ wagerId: 'test123' })).to.be.false;
    });
  });

  describe('replayWager', () => {
    it('should emit getWager directly if betslip is empty', () => {
      isBetslipEmptyStub.returns(true);
      wrapper = shallowMount(Fireblaze, { stubs, localVue, store });
      wrapper.vm.replayWager({ wagerId: 'test123' });
      expect($emitSpy.calledWith('getWager', 'test123')).to.be.true;
    });
  });
});
