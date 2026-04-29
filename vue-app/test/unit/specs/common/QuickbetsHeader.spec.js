import { createLocalVue, shallowMount } from '@vue/test-utils';
import QuickbetsHeader from '@/components/common/Quickbets/QuickbetsHeader.vue';
import Vuex from 'vuex';
import sinon from 'sinon';
import Vue from 'vue';
import moduleTypes from '@/store/modules/types';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
import Constants from '@/util/Constants';

describe('QuickbetsHeader.vue', () => {
  let localVue;
  let store;
  let sandbox;
  let mocks;
  let betslip;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    localVue.use(Vuex);
    Vue.prototype.$eventHub = new Vue();
    mocks = {
      $t: sandbox.stub().callsFake((key) => key),
      $router: { 
        back: sandbox.stub(),
        push: sandbox.stub() 
      },
    };
    betslip = {
      bet_areas: [
        { kinoBonusActive: false },
        { kinoBonusActive: false },
      ],
    };
    
    sandbox.stub(gtag, 'sendEvent').returns();
    
    store = new Vuex.Store({
      modules: {
        [moduleTypes.KINO_GAME_STORE_MODULE]: {
          namespaced: true,
          state: {
            [kinoGameModuleTypes.state.BETSLIP]: betslip,
          },
          actions: {
            [kinoGameModuleTypes.actions.RESET_BETSLIP]: sandbox.stub(),
          }
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders back button', async () => {
    const wrapper = shallowMount(QuickbetsHeader, { localVue, store, mocks });
    const btn = wrapper.find('.quickbets-header__button');
    expect(btn.exists()).to.be.true;
    await btn.trigger('click');
    expect(btn.text()).to.include('goBack');
  });

  it('applies theme class', () => {
    const wrapper = shallowMount(QuickbetsHeader, { localVue, store, mocks, propsData: { theme: 'kino' } });
    expect(wrapper.classes()).to.include('quickbets-header--kino');
  });

  it('sends tracking event when back button is clicked for KINO', async () => {
    const wrapper = shallowMount(QuickbetsHeader, { 
      localVue, 
      store, 
      mocks,
      propsData: { theme: Constants.THEMES.KINO }
    });

    await wrapper.find('.quickbets-header__button').trigger('click');
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_LOTTERY_QUICKBETS_BACK_BUTTON_CLICKED, { 
      game: Constants.THEMES.KINO 
    })).to.be.true;
  });
});
