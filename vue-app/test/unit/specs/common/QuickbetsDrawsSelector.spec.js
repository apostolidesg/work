import { createLocalVue, shallowMount } from '@vue/test-utils';
import QuickbetsDrawsSelector from '@/components/common/Quickbets/QuickbetsDrawsSelector.vue';
import Vuex from 'vuex';
import sinon from 'sinon';
import Vue from 'vue';
import moduleTypes from '@/store/modules/types';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';

describe('QuickbetsDrawsSelector.vue', () => {
  let localVue;
  let store;
  let sandbox;
  let mocks;
  let actions;
  let betslip;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    localVue.use(Vuex);
    Vue.prototype.$eventHub = new Vue();
    mocks = {
      $t: sandbox.stub().callsFake((key) => key),
    };
    actions = {
      [kinoGameModuleTypes.actions.SET_BETSLIP]: sandbox.stub(),
    };
    betslip = {
      setConsecutiveDraws: sandbox.stub(),
      refreshValue: sandbox.stub(),
      calculateValue: sandbox.stub(),
    };
    store = new Vuex.Store({
      modules: {
        [moduleTypes.KINO_GAME_STORE_MODULE]: {
          namespaced: true,
          state: {
            [kinoGameModuleTypes.state.BETSLIP]: betslip,
          },
          actions,
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders selected consecutiveDraws', () => {
    const wrapper = shallowMount(QuickbetsDrawsSelector, {
      localVue,
      store,
      mocks,
      propsData: { consecutiveDraws: 2 },
    });
    expect(wrapper.find('.quickbets_draw-selector__selected-draws').text()).to.equal('2');
  });

  it('toggles panel on click', async () => {
    const wrapper = shallowMount(QuickbetsDrawsSelector, {
      localVue,
      store,
      mocks,
      propsData: { consecutiveDraws: 1 },
    });
    expect(wrapper.vm.consecutiveDrawsPanelActive).to.be.false;
    await wrapper.trigger('click');
    expect(wrapper.vm.consecutiveDrawsPanelActive).to.be.true;
    await wrapper.trigger('click');
    expect(wrapper.vm.consecutiveDrawsPanelActive).to.be.false;
  });
});
