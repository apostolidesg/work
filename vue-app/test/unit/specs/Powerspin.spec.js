import { createLocalVue, shallowMount } from '@vue/test-utils';
import Powerspin from '../../../src/components/lobby/games/Powerspin/Powerspin';
import Vuex from 'vuex';
import powerspinBetslipStoreModuleTypes from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import sessionStoreModuleTypes from '../../../src/store/modules/SessionStoreModule/types';
import sinon from 'sinon';
import moduleTypes from '../../../src/store/modules/types';
import { expect } from 'chai';
import Vue from 'vue';

describe('Powerspin', () => {
  Vue.prototype.$eventHub = new Vue();
  const instance = new Vue();

  let stubs;
  let localVue;
  let sessionActions;
  let powerspinActions;
  let store;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    sessionActions = {
      [sessionStoreModuleTypes.actions.SET_GAME_TYPE]: () => sinon.stub(),
    };

    powerspinActions = {
      [powerspinBetslipStoreModuleTypes.actions.RESET_BETSLIPS]: () => sinon.stub(),
    };

    stubs = {
      PlayArea: {
        name: 'PlayArea',
        template: '<div></div>',
      },
    };

    const modules = {
      [moduleTypes.SESSION_STORE_MODULE]: {
        namespaced: true,
        actions: sessionActions,
      },
      [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: {
        namespaced: true,
        actions: powerspinActions,
      },
    };

    store = new Vuex.Store({
      modules,
    });

    wrapper = shallowMount(Powerspin, {
      stubs,
      store,
      localVue,
    });
  });

  it('Should render PlayScreen', () => {
    const playScreen = wrapper.findComponent({ name: stubs.PlayArea.name });
    expect(playScreen.exists()).to.be.true;
  });
  it('Should set game type to POWERSPIN', () => {
    const setGameTypeSpy = sinon.spy(Powerspin.methods, 'setGameType');
    wrapper = shallowMount(Powerspin, {
      stubs,
      store,
      localVue,
    });
    expect(setGameTypeSpy.calledWith({ gameType: 'POWERSPIN' })).to.be.true;
  });
  it('Should invoke resetBetslips on clearBetslip event', () => {
    const resetBetslipsSpy = sinon.spy(Powerspin.methods, 'resetBetslips');
    wrapper = shallowMount(Powerspin, {
      stubs,
      store,
      localVue,
    });
    instance.$eventHub.$emit('clearBetslip');
    expect(resetBetslipsSpy.called).to.be.true;
  });
});
