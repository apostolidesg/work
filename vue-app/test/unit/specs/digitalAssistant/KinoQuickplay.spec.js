import { createLocalVue, shallowMount } from '@vue/test-utils';
import KinoQuickplay from '../../../../src/components/digitalAssistant/Kino/KinoQuickplay.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import sinon from 'sinon';
import moduleTypes from '../../../../src/store/modules/types';
import configurationModuleTypes from '../../../../src/store/modules/ConfigurationStoreModule/types';
import kinoGameModuleTypes from '../../../../src/store/modules/KinoStoreModule/types';
import VueRouter from 'vue-router';

describe('KinoQuickplay.vue', () => {
  let wrapper;
  let store;
  let localVue;
  let sandbox;
  let mocks;
  let stubs;
  let getConfigurationStub;
  let setReadyBetslipsNumbersStub;
  let getReadyBetslipsNumbersStub;
  let router;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);
    Vue.prototype.$eventHub = new Vue();

    router = new VueRouter();
    router.push = sandbox.stub();

    getConfigurationStub = sandbox.stub().returns({
      KINO: {
        PLAY_KINO: {
          READY_BETSLIPS: [
            { columns: 1, numbers: 3 },
            { columns: 2, numbers: 5, hasBonus: true }
          ],
          READY_BETSLIPS_NUMBERS: 4
        }
      }
    });
    
    setReadyBetslipsNumbersStub = sandbox.stub();
    getReadyBetslipsNumbersStub = sandbox.stub().returns(6);

    mocks = {
      $t: (key, params) => {
        if (key === 'columnsWithNumbers') {
          return `${params.columns} columns with ${params.numbers} numbers`;
        }
        return key;
      },
      $router: {
        push: sandbox.stub()
      }
    };

    stubs = {
      FontAwesomeIcon: {
        template: '<span></span>'
      }
    };

    store = new Vuex.Store({
      modules: {
        [moduleTypes.CONFIGURATION_STORE_MODULE]: {
          namespaced: true,
          getters: {
            [configurationModuleTypes.getters.GET_CONFIGURATION]: getConfigurationStub
          }
        },
        [moduleTypes.KINO_GAME_STORE_MODULE]: {
          namespaced: true,
          getters: {
            [kinoGameModuleTypes.getters.GET_READY_BETSLIPS_NUMBERS]: getReadyBetslipsNumbersStub
          },
          actions: {
            [kinoGameModuleTypes.actions.SET_READY_BETSLIPS_NUMBERS]: setReadyBetslipsNumbersStub
          }
        }
      }
    });
  });

  afterEach(() => {
    sandbox.restore();
    if (wrapper) {
      wrapper.destroy();
    }
  });

  it('renders KinoQuickplay component', () => {
    wrapper = shallowMount(KinoQuickplay, {
      localVue,
      store,
      router,
      mocks,
      stubs
    });

    expect(wrapper.exists()).to.be.true;
  });

  it('initializes readyBetslipsNumbers from store on component mount', () => {
    wrapper = shallowMount(KinoQuickplay, {
      localVue,
      store,
      router,
      mocks,
      stubs
    });
    
    expect(setReadyBetslipsNumbersStub.calledOnce).to.be.true;
  });

  it('uses readyBetslipsNumbers from store for quickPlayReadyBetslips', () => {
    wrapper = shallowMount(KinoQuickplay, {
      localVue,
      store,
      router,
      mocks,
      stubs
    });

    const quickPlayCards = wrapper.findAll('QuickPlayCard-stub');
    expect(quickPlayCards.length).to.equal(2); // Make sure we have 2 cards

    const betslipData = wrapper.vm.quickPlayReadyBetslips;
    expect(betslipData[0].numbers).to.equal(6); // Should use the value from the store
    expect(betslipData[1].numbers).to.equal(6); // Should use the value from the store
  });
});