import { createLocalVue, shallowMount } from '@vue/test-utils';
import QuickPlay from '@/components/digitalAssistant/QuickPlay.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import sinon from 'sinon';
import moduleTypes from '@/store/modules/types';
import configurationModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import sessionStoreModuleTypes from '@/store/modules/SessionStoreModule/types';
import powerspinModuleTypes from '@/store/modules/PowerspinBetslipStoreModule/types';
import Constants from '@/util/Constants';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';

describe('QuickPlay.vue', () => {
  let wrapper;
  let store;
  let localVue;
  let router;
  let sandbox;
  let resetPowerspinBetslipsStub;
  let setGameTypeStub;
  let getConfigurationStub;
  let eventEmitSpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(gtag, 'sendEvent');

    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);

    router = new VueRouter();
    router.push = sandbox.stub();

    resetPowerspinBetslipsStub = sandbox.stub();
    setGameTypeStub = sandbox.stub();
    getConfigurationStub = sandbox.stub().returns({});

    eventEmitSpy = sandbox.spy();

    Vue.prototype.$eventHub = {
      $emit: eventEmitSpy,
    };

    store = new Vuex.Store({
      modules: {
        [moduleTypes.CONFIGURATION_STORE_MODULE]: {
          namespaced: true,
          getters: {
            [configurationModuleTypes.getters.GET_CONFIGURATION]: getConfigurationStub,
          },
        },
        [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: {
          namespaced: true,
          actions: {
            [powerspinModuleTypes.actions.RESET_BETSLIPS]: resetPowerspinBetslipsStub,
          },
        },
        [moduleTypes.SESSION_STORE_MODULE]: {
          namespaced: true,
          actions: {
            [sessionStoreModuleTypes.actions.SET_GAME_TYPE]: setGameTypeStub,
          },
        },
      },
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
    sandbox.restore();
  });

  const mountComponent = (propsData = {}) => {
    return shallowMount(QuickPlay, {
      localVue,
      store,
      router,
      propsData,
      stubs: {
        'font-awesome-icon': true,
        'kino-quickbets-number-selection': true,
      },
      mocks: {
        $t: (key) => key,
      },
    });
  };

  it('renders with default KINO theme when no theme prop is provided', () => {
    wrapper = mountComponent();
    expect(wrapper.classes()).to.include('quick-play--kino');
  });

  it('renders with POWERSPIN theme when provided as prop', () => {
    wrapper = mountComponent({ theme: Constants.THEMES.POWERSPIN });
    expect(wrapper.classes()).to.include('quick-play--powerspin');
  });

  it('renders KinoQuickbetsNumberSelection component only for KINO theme', () => {
    wrapper = mountComponent({ theme: Constants.THEMES.KINO });
    expect(wrapper.findComponent({ name: 'kino-quickbets-number-selection' }).exists()).to.be.true;

    wrapper = mountComponent({ theme: Constants.THEMES.POWERSPIN });
    expect(wrapper.findComponent({ name: 'kino-quickbets-number-selection' }).exists()).to.be.false;
  });

  it('navigates to KINO board when button is clicked and theme is KINO', async () => {
    wrapper = mountComponent({ theme: Constants.THEMES.KINO });
    await wrapper.find('.quick-play__button').trigger('click');

    expect(resetPowerspinBetslipsStub.calledOnce).to.be.true;
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_LOTTERY_GO_TO_KINO_BOARD_CLICKED)).to.be.true;
    expect(router.push.calledWith({ name: Constants.ROUTE_NAMES.KINO })).to.be.true;
  });

  it('navigates to POWERSPIN board when button is clicked and theme is POWERSPIN', async () => {
    wrapper = mountComponent({ theme: Constants.THEMES.POWERSPIN });
    await wrapper.find('.quick-play__button').trigger('click');

    expect(resetPowerspinBetslipsStub.calledOnce).to.be.true;
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_LOTTERY_GO_TO_POWERSPIN_BOARD_CLICKED)).to.be.true;
    expect(router.push.calledWith({ name: Constants.ROUTE_NAMES.POWERSPIN })).to.be.true;
  });

  it('renders title correctly', () => {
    wrapper = mountComponent();
    expect(wrapper.find('.quick-play__title').text()).to.include('readyTickets');
  });

  it('renders custom container and button', () => {
    wrapper = mountComponent();
    expect(wrapper.find('.quick-play__custom-container').exists()).to.be.true;
    expect(wrapper.find('.quick-play__button').exists()).to.be.true;
    expect(wrapper.find('.quick-play__button-text').text()).to.equal('playWithCustomNumbers');
  });

  it('computes isKino correctly', () => {
    wrapper = mountComponent({ theme: Constants.THEMES.KINO });
    expect(wrapper.vm.isKino).to.be.true;

    wrapper = mountComponent({ theme: Constants.THEMES.POWERSPIN });
    expect(wrapper.vm.isKino).to.be.false;
  });
});
