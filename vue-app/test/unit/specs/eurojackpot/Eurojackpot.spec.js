import sinon from 'sinon';
import Eurojackpot from '../../../../src/components/lobby/games/eurojackpot/Eurojackpot.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';

describe('Eurojackpot Component', () => {
  const instance = new Vue();
  let localVue;
  let wrapper;
  let sandbox;
  let stubs;
  let store;

  // stubs
  let zeroBalanceStub;
  let isBetslipEmptyStub;

  // spies
  let setGameTypeSpy;
  let $onSpy;
  let $offSpy;
  let $emitSpy;
  let resetBetSlipSpy;
  let setStatisticsSelectionSpy;

  beforeEach(() => {
    Vue.prototype.$eventHub = new Vue();
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);
    setGameTypeSpy = sandbox.spy();

    $onSpy = sandbox.spy(instance.$eventHub, '$on');
    $offSpy = sandbox.spy(instance.$eventHub, '$off');
    $emitSpy = sandbox.spy(instance.$eventHub, '$emit');
    resetBetSlipSpy = sandbox.spy();
    setStatisticsSelectionSpy = sandbox.spy();

    zeroBalanceStub = sandbox.stub().returns(false);
    isBetslipEmptyStub = sandbox.stub().returns(false);

    stubs = {
      PlayAreaLayout: {
        name: 'PlayAreaLayout',
        template:
          '<div class="play-area-layout-stub"><slot name="settings"></slot> <slot></slot> <slot name="sidescreen"></slot></div>',
      },
      EurojackpotSettings: {
        name: 'EurojackpotSettings',
        template: '<div class="eurojackpot-settings-stub"></div>',
      },
      EurojackpotPlayArea: {
        name: 'EurojackpotPlayArea',
        template: '<div class="eurojackpot-play-area-stub"></div>',
      },
      EurojackpotSidescreen: {
        name: 'EurojackpotSidescreen',
        template: '<div class="eurojackpot-sidescreen-stub"></div>',
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
        EUROJACKPOT_GAME_STORE_MODULE: {
          namespaced: true,
          actions: {
            RESET_BETSLIP: resetBetSlipSpy,
            SET_STATISTICS_SELECTION: setStatisticsSelectionSpy,
          },
          getters: {
            GET_IS_BETSLIP_EMPTY: isBetslipEmptyStub,
          },
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
    wrapper.destroy();
  });

  it('should render all the components', () => {
    wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });

    expect(wrapper.exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.EurojackpotSidescreen.name }).exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.EurojackpotPlayArea.name }).exists()).to.true;
    expect(wrapper.findComponent({ name: stubs.EurojackpotSettings.name }).exists()).to.true;
  });

  it('should set the game type to eurojackpot', () => {
    wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
    expect(setGameTypeSpy.getCall(0).args[1]).to.deep.equal({ gameType: 'EUROJACKPOT' });
  });

  it('should listen to the eventHub for the replayWager event', () => {
    wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
    expect($onSpy.getCall(0).args[0]).to.equal('replayWager');
    expect($onSpy.getCall(0).args[1]).to.eq(wrapper.vm.replayWager);
  });

  it('should unsubscribe from the eventHub for the replayWager event when destroyed', () => {
    wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
    wrapper.destroy();
    expect($offSpy.getCall(0).args[0]).to.equal('replayWager');
  });

  describe('when replaying the wager', () => {
    const $route = {
      params: { wagerId: '123' },
    };

    it('should ask the user to confirm if there is already an betslip', () => {
      isBetslipEmptyStub.returns(false);
      wrapper = shallowMount(Eurojackpot, {
        stubs,
        localVue,
        store,
        beforeCreate() {
          this._route = $route;
        },
      });

      expect($emitSpy.getCall(0).args[0]).to.equal('DIALOG');
      expect($emitSpy.getCall(0).args[1]).to.deep.equal({
        title: 'replayWager',
        type: 'DIALOG',
        icon: { icon: 'question' },
        message: {
          translationLabel: 'replayWagerWarningModalMessage',
        },
      });
      expect($emitSpy.getCall(0).args[2]).to.be.a('function');
    });

    it('should replay the wager if the user confirms', () => {
      isBetslipEmptyStub.returns(false);
      wrapper = shallowMount(Eurojackpot, {
        stubs,
        localVue,
        store,
        beforeCreate() {
          this._route = $route;
        },
      });

      $emitSpy.getCall(0).args[2]();

      expect($emitSpy.getCall(1).args[0]).to.equal('getWager');
      expect($emitSpy.getCall(1).args[1]).to.equal('123');
    });

    it('should replay the wager without user confirm if there is not existing betslip', () => {
      isBetslipEmptyStub.returns(true);
      wrapper = shallowMount(Eurojackpot, {
        stubs,
        localVue,
        store,
        beforeCreate() {
          this._route = $route;
        },
      });

      expect($emitSpy.getCall(0).args[0]).to.equal('getWager');
      expect($emitSpy.getCall(0).args[1]).to.equal('123');
    });
  });

  describe('when a clearBetslip event is emitted', () => {
    it('should reset the betslip', () => {
      wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
      wrapper.vm.$eventHub.$emit('clearBetslip');
      expect(resetBetSlipSpy.calledOnce).to.be.true;
    });
  });

  describe('when leaving the game', () => {
    let nextSpy;

    beforeEach(() => {
      nextSpy = sandbox.spy();
    });

    describe('and the betslip is not empty and the balance is zero', () => {
      beforeEach(() => {
        zeroBalanceStub.returns(true);
        isBetslipEmptyStub.returns(false);
      });

      it('should not proceed with the navigation change', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, null, null, nextSpy);

        expect(nextSpy.calledOnce).to.be.false;
      });

      it('should ask the user to confirm', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, null, null, nextSpy);

        expect($emitSpy.getCall(0).args[0]).to.equal('DIALOG');
        expect($emitSpy.getCall(0).args[1]).to.deep.equal({
          type: 'DIALOG',
          title: 'returnToLobby',
          icon: {
            icon: 'question',
          },
          message: {
            translationLabel: 'returnToLobbyWarningModalMessage',
          },
        });
        expect($emitSpy.getCall(0).args[2]).to.be.a('function');
      });

      it('should reset the betslip if the user confirms', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, null, null, nextSpy);

        $emitSpy.getCall(0).args[2]();

        expect(resetBetSlipSpy.calledOnce).to.be.true;
      });

      it('should set the statistics selection to NONE if the user confirms', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, null, null, nextSpy);

        $emitSpy.getCall(0).args[2]();

        expect(setStatisticsSelectionSpy.calledOnce).to.be.true;
        expect(setStatisticsSelectionSpy.getCall(0).args[1]).to.deep.equal({ selection: 'NONE' });
      });

      it('should reset the betslip without user confirm if the to route contains a shouldConfirm=false query', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, { query: { shouldConfirm: 'false' } }, null, nextSpy);

        expect(nextSpy.calledOnce).to.be.true;
        expect(resetBetSlipSpy.calledOnce).to.be.true;
      });

      it('should set the statistics selection to NONE without user confirm if the to route contains a shouldConfirm=false query', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, { query: { shouldConfirm: 'false' } }, null, nextSpy);

        expect(nextSpy.calledOnce).to.be.true;
        expect(setStatisticsSelectionSpy.calledOnce).to.be.true;
        expect(setStatisticsSelectionSpy.getCall(0).args[1]).to.deep.equal({ selection: 'NONE' });
      });
    });

    describe('and the betslip is not empty and the balance is greater than zero', () => {
      beforeEach(() => {
        zeroBalanceStub.returns(false);
        isBetslipEmptyStub.returns(false);
      });

      it('should not reset the betslip', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, null, null, nextSpy);

        expect(resetBetSlipSpy.called).to.be.false;
      });

      it('should proceed with the navigation change', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, null, null, nextSpy);

        expect(nextSpy.calledOnce).to.be.true;
      });

      it('should set the statistics selection to NONE', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, null, null, nextSpy);

        expect(setStatisticsSelectionSpy.calledOnce).to.be.true;
        expect(setStatisticsSelectionSpy.getCall(0).args[1]).to.deep.equal({ selection: 'NONE' });
      });
    });

    describe('and the betslip is empty', () => {
      beforeEach(() => {
        isBetslipEmptyStub.returns(true);
      });

      it('should proceed with the navigation change', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, null, null, nextSpy);

        expect(nextSpy.calledOnce).to.be.true;
      });

      it('should set the statistics selection to NONE', () => {
        wrapper = shallowMount(Eurojackpot, { stubs, localVue, store });
        const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave[0];
        beforeRouteLeave.call(wrapper.vm, null, null, nextSpy);

        expect(setStatisticsSelectionSpy.calledOnce).to.be.true;
        expect(setStatisticsSelectionSpy.getCall(0).args[1]).to.deep.equal({ selection: 'NONE' });
      });
    });
  });
});
