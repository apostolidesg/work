import { createLocalVue, shallowMount } from '@vue/test-utils';
import DigitalAssistant from '../../../../src/components/digitalAssistant/DigitalAssistant.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Vue from 'vue';
import sinon from 'sinon';
import moduleTypes from '../../../../src/store/modules/types';
import configurationStoreModuleTypes from '../../../../src/store/modules/ConfigurationStoreModule/types';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
import Constants from '@/util/Constants';
import SessionStoreModuleTypes from '../../../../src/store/modules/SessionStoreModule/types';
import VideoTypes from '../../../../src/store/modules/VideoStoreModule/types';

const CONFIGURATION_STORE_KEY = moduleTypes.CONFIGURATION_STORE_MODULE;
const VIDEO_STORE_KEY = moduleTypes.VIDEO_STORE_MODULE;
const SESSION_STORE_KEY = moduleTypes.SESSION_STORE_MODULE;
const GET_CONFIGURATION_ASSETS_KEY = configurationStoreModuleTypes.getters.GET_CONFIGURATION_ASSETS;

const createStore = (configLoaded = true) => {
  return new Vuex.Store({
    modules: {
      [CONFIGURATION_STORE_KEY]: {
        namespaced: true,
        getters: {
          [GET_CONFIGURATION_ASSETS_KEY]: () => ({ configLoaded }),
        },
      },
      [VIDEO_STORE_KEY]: {
        namespaced: true,
        actions: {
          [VideoTypes.actions.PLAY_VIDEO]: sinon.stub(),
        },
      },
      [SESSION_STORE_KEY]: {
        namespaced: true,
        actions: {
          [SessionStoreModuleTypes.actions.SET_BALANCE_VISIBILITY]: sinon.stub(),
        },
      },
    },
  });
};

describe('DigitalAssistant.vue', () => {
  let sandbox, localVue, router, mocks, stubs, wrapper;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);
    Vue.prototype.$eventHub = new Vue();
    router = new VueRouter();
    sandbox.stub(router, 'push');
    sandbox.stub(gtag, 'sendEvent').returns();

    mocks = { $t: (k) => k };
    stubs = {
      DigitalAssistantLayout: {
        name: 'DigitalAssistantLayout',
        template: '<div class="digital-assistant-layout-stub"><slot /></div>',
        props: ['assetKey', 'showAssetWrapper'],
      },
      GameCard: {
        name: 'GameCard',
        template: '<div class="game-card-stub"></div>',
        props: ['theme', 'buttonText', 'to'],
      },
    };
  });

  afterEach(() => {
    sandbox.restore();
    if (wrapper) wrapper.destroy();
  });

  it('renders base structure', () => {
    const store = createStore(true);
    wrapper = shallowMount(DigitalAssistant, { localVue, store, router, mocks, stubs });
    expect(wrapper.classes()).to.contain('digital-assistant');
    expect(wrapper.find('.digital-assistant__games').exists()).to.be.true;
  });

  it('passes correct props to the Kino game card', () => {
    const store = createStore(true);
    wrapper = shallowMount(DigitalAssistant, { localVue, store, router, mocks, stubs });
    const kinoCard = wrapper.findAllComponents({ name: 'GameCard' }).at(0);
    expect(kinoCard.props()).to.deep.equal({
      theme: 'kino',
      buttonText: 'youPlayHere',
      to: Constants.ROUTE_NAMES.KINO_QUICKPLAY,
    });
  });

  it('passes correct props to the Powerspin game card', () => {
    const store = createStore(true);
    wrapper = shallowMount(DigitalAssistant, { localVue, store, router, mocks, stubs });
    const powerCard = wrapper.findAllComponents({ name: 'GameCard' }).at(1);
    expect(powerCard.props()).to.deep.equal({
      theme: 'powerspin',
      buttonText: 'youPlayHere',
      to: Constants.ROUTE_NAMES.POWERSPIN_QUICKPLAY,
    });
  });

  it('navigates to help section and sends analytics event when video is clicked', async () => {
    const store = createStore(true);
    wrapper = shallowMount(DigitalAssistant, { localVue, store, router, mocks, stubs });
    await wrapper.vm.navigateToHelpSection();
    expect(router.push.calledOnce).to.be.true;
    expect(
      router.push.calledWith({
        name: Constants.ROUTE_NAMES.HELP_SECTION,
      })
    ).to.be.true;
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_LOTTERY_LOBBY_EDUCATIONAL)).to.be.true;
  });
});
