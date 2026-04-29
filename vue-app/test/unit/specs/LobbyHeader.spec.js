import { shallowMount, createLocalVue } from '@vue/test-utils';
import configurationStoreTypes from '../../../src/store/modules/ConfigurationStoreModule/types';
import playerSessionStoreTypes from '../../../src/store/modules/PlayerBetslipsSessionModule/types';
import sessionStoreTypes from '../../../src/store/modules/SessionStoreModule/types';
import languageSessionTypes from '../../../src/store/modules/LanguageStoreModule/types';
import ModalUsageMixin from '../../../src/mixins/ModalUsageMixin';
import lobbyHeaderMixin from '../../../src/mixins/lobbyHeaderMixin';
import moduleTypes from '../../../src/store/modules/types';
import LobbyHeader from '../../../src/components/lobby/lobbyHeader/LobbyHeader';
import VueRouter from 'vue-router';
import router from '../../../src/router/router';
import modalEventConstants from '../../../src/util/modalEventConstants';
import infoModalScrollableMessages from '../../../src/util/infoModalScrollableMessages';
import Vuex from 'vuex';
import Vue from 'vue';

const sinon = require('sinon');

const sandbox = sinon.createSandbox();

describe.skip('LobbyHeader.vue', () => {
  Vue.prototype.$eventHub = new Vue(); // Global event bus
  let stubs;
  let store;
  let localVue;
  let wrapper;
  let configurationStoreGetters;
  let playerSessionModuleGetters;
  let sessionStoreModuleGetters;
  let playerSessionActions;
  let languageStoreModuleActions;

  beforeEach(() => {
    stubs = {
      BaseClearButton: {
        name: 'BaseClearButton',
        template: `<div class="base-clear-button"></div>`,
        props: ['theme', 'bottomLabel'],
      },
      LobbyHeaderBalanceBox: {
        name: 'LobbyHeaderBalanceBox',
        template: `<div class="lobby-header-balance-box" @toggle-balance="$listeners['toggle-balance']" @update-balance="$listeners['update-balance']"></div>`,
        props: ['textTheme', 'showBalance'],
      },
      LobbyHeaderDigitalPay: {
        name: 'LobbyHeaderDigitalPay',
        template: '<div class="lobby-header-digital-pay"></div>',
      },
      LobbyHeaderLanguageSelection: {
        name: 'LobbyHeaderLanguageSelection',
        template: `<div class="lobby-header-language-selection" @change-language="$listeners['change-language']"></div>`,
        props: ['textTheme', 'language'],
      },
      LobbyHeaderOption: {
        name: 'LobbyHeaderOption',
        template: `<div class="lobby-header-option"></div>`,
        props: ['icon', 'text', 'textTheme'],
      },
      LobbyHeaderGameInfo: {
        name: 'LobbyHeaderGameInfo',
        template: `<div class="lobby-header-game-info"></div>`,
        props: ['textTheme', 'barcodeReaderStatusOk'],
      },
      DrawInformation: {
        name: 'DrawInformation',
        template: `<div class="draw-information"></div>`,
        props: ['theme'],
      },
      EurojackpotAmount: {
        name: 'EurojackpotAmount',
        template: `<div class="eurojackpot-amount"></div>`,
        props: ['amount'],
      },
    };

    sandbox.stub(process.env, 'IPC_RENDERER_ENABLED').value(true);

    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);
    localVue.mixin(ModalUsageMixin);
    localVue.mixin(lobbyHeaderMixin);

    configurationStoreGetters = {
      [configurationStoreTypes.getters.GET_VOUCHER]: sinon.stub(),
      [configurationStoreTypes.getters.GET_CONFIGURATION]: () => ({
        DIGITAL_PAY_ENABLED: true,
      }),
      [configurationStoreTypes.getters.IS_IPC_RENDERER_ENABLED]: () => true,
    };
    playerSessionModuleGetters = {
      [playerSessionStoreTypes.getters.GET_IS_ACTIVE_LIVE_DRAW_SCREEN]: () => true,
    };
    sessionStoreModuleGetters = {
      [sessionStoreTypes.getters.GET_IS_ZERO_BALANCE]: sinon.stub(),
      [sessionStoreTypes.getters.GET_ACTIVE_SESSION]: sinon.stub(),
      [sessionStoreTypes.getters.GET_BALANCE]: sinon.stub(),
    };
    playerSessionActions = {
      [playerSessionStoreTypes.actions.CLEAR_PLAYER_BETSLIPS]: sinon.stub(),
      [playerSessionStoreTypes.actions.UPDATE_DRAW_INFO]: sinon.stub(),
      [playerSessionStoreTypes.actions.INIT_PLAYER_SESSION_STATE]: sinon.stub(),
    };
    languageStoreModuleActions = {
      [languageSessionTypes.actions.SET_LANGUAGE]: sinon.stub(),
    };

    wrapper = shallowMount(LobbyHeader, {
      stubs,
      localVue,
      router,
      store,
    });

    store = new Vuex.Store({
      modules: {
        [moduleTypes.CONFIGURATION_STORE_MODULE]: {
          namespaced: true,
          getters: configurationStoreGetters,
        },
        [moduleTypes.PLAYER_SESSION_MODULE]: {
          namespaced: true,
          getters: playerSessionModuleGetters,
          actions: playerSessionActions,
        },
        [moduleTypes.SESSION_STORE_MODULE]: {
          namespaced: true,
          getters: sessionStoreModuleGetters,
        },
        [moduleTypes.LANGUAGE_STORE_MODULE]: {
          namespaced: true,
          actions: languageStoreModuleActions,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
    sandbox.restore();
  });

  it('should render lobby header img', () => {
    expect(wrapper.contains('#ssbt_lobby-header-img')).to.be.true;
  });

  it('does not display auxiliary buttons when in main lobby', () => {
    expect(wrapper.contains('#ssbt_return_to_lobby')).to.be.false;
    expect(wrapper.contains('#ssbt_base_clear_button_header')).to.be.false;
  });

  it('should render LobbyHeaderGameInfo component with props', () => {
    const LobbyHeaderGameInfoComponent = wrapper.findComponent(stubs.LobbyHeaderGameInfo);
    expect(wrapper.findComponent(stubs.LobbyHeaderGameInfo).exists()).to.be.true;
    expect(LobbyHeaderGameInfoComponent.props('textTheme')).to.equal('black');
    expect(LobbyHeaderGameInfoComponent.props('barcodeReaderStatusOk')).to.equal(true);
  });

  it('should render BaseClearButton component with props', () => {
    const BaseClearButtonComponent = wrapper.findComponent(stubs.BaseClearButton);
    expect(wrapper.findComponent(stubs.BaseClearButton).exists()).to.be.true;
    expect(BaseClearButtonComponent.props('theme')).to.equal('black');
  });

  it('should render DrawInformation component', () => {
    expect(wrapper.findComponent(stubs.DrawInformation).exists()).to.be.true;
  });

  it('should render LobbyHeaderBalanceBox component with props', () => {
    const LobbyHeaderBalanceBoxComponent = wrapper.findComponent(stubs.LobbyHeaderBalanceBox);
    expect(wrapper.findComponent(stubs.BaseClearButton).exists()).to.be.true;
    expect(LobbyHeaderBalanceBoxComponent.props('textTheme')).to.equal('black');
    expect(LobbyHeaderBalanceBoxComponent.props('showBalance')).to.equal(true);
  });

  it('should render the auxiliary buttons when in kino', () => {
    router.push({ name: 'kino' });
    Vue.nextTick(() => {
      expect(wrapper.contains('#ssbt_return_to_lobby')).to.be.true;
      expect(wrapper.contains('#ssbt_base_clear_button_header')).to.be.true;
    });
  });

  it('should open responsible gaming', () => {
    wrapper.find('#ssbt_rg_img').trigger('click');
    wrapper.vm.$emit(modalEventConstants.OPEN.INFO_SCROLLABLE, infoModalScrollableMessages.responsibleGaming);
  });

  it('should change language component', () => {
    const LobbyHeaderLanguageSelection = wrapper.find(stubs.LobbyHeaderLanguageSelection);
    expect(wrapper.findComponent(stubs.LobbyHeaderLanguageSelection).exists()).to.be.true;
    expect(LobbyHeaderLanguageSelection.props('textTheme')).to.equal('black');
    expect(LobbyHeaderLanguageSelection.props('language')).to.equal('el');
  });

  it('renders LobbyHeaderDigitalPay component when DIGITAL_PAY_ENABLED is true', () => {
    const DigitalPayComponent = wrapper.find('.lobby-header-digital-pay');
    expect(DigitalPayComponent.exists()).to.be.true;
  });
});
