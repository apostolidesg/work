import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import VueRouter from 'vue-router';
import moduleTypes from '../../../src/store/modules/types';
import sessionStoreModuleTypes from '../../../src/store/modules/SessionStoreModule/types';
import ConfigurationStoreModuleTypes from '../../../src/store/modules/ConfigurationStoreModule/types';
import LobbyHeaderBalanceBox from '../../../src/components/lobby/lobbyHeader/LobbyHeaderBalanceBox';
import Constants from '../../../src/util/Constants';

chai.use(sinonChai);

function factory({
  digitalAssistantEnabled = true,
  routeName = Constants.ROUTE_NAMES.LOBBY,
  balanceVisibility = true,
  textTheme = 'black',
  balance = 100.5,
} = {}) {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  const router = new VueRouter({
    routes: [
      { path: '/', name: Constants.ROUTE_NAMES.LOBBY },
      { path: '/kino', name: Constants.ROUTE_NAMES.KINO },
      { path: '/powerspin', name: Constants.ROUTE_NAMES.POWERSPIN },
    ],
  });
  router.push({ name: routeName });

  const store = new Vuex.Store({
    modules: {
      [moduleTypes.SESSION_STORE_MODULE]: {
        namespaced: true,
        getters: {
          [sessionStoreModuleTypes.getters.GET_BALANCE]: () => balance,
          [sessionStoreModuleTypes.getters.GET_BALANCE_VISIBILITY]: () => balanceVisibility,
        },
      },
      [moduleTypes.CONFIGURATION_STORE_MODULE]: {
        namespaced: true,
        getters: {
          [ConfigurationStoreModuleTypes.getters.IS_DIGITAL_ASSISTANT_ENABLED]: () => digitalAssistantEnabled,
        },
      },
    },
  });

  return shallowMount(LobbyHeaderBalanceBox, {
    localVue,
    router,
    store,
    stubs: {
      FontAwesomeIcon: {
        name: 'FontAwesomeIcon',
        props: ['far', 'eye', 'sync'],
        template: '<svg class="font-awesome-icon" />',
      },
    },
    propsData: {
      textTheme,
    },
    mocks: {
      $t: sinon.stub().returns('test'),
    },
  });
}

describe('LobbyHeaderBalanceBox', () => {
  it('renders the *new* eye icon when Digital Assistant is enabled', () => {
    const wrapper = factory({ digitalAssistantEnabled: true });
    expect(wrapper.find('#ssbt_balance_eye_icon').exists()).to.be.true;
    expect(wrapper.find('.ssbt_header_balance_box__eye-icon').exists()).to.be.true;
  });

  it('shows the refresh button when the balance is visible', () => {
    const wrapper = factory({ balanceVisibility: true, digitalAssistantEnabled: true });
    expect(wrapper.find('#ssbt_balance_refresh').exists()).to.be.true;
    expect(wrapper.find('.ssbt_header_balance_box__refresh-button').exists()).to.be.true;
  });

  it('displays the formatted balance value with the €‑sign', () => {
    const wrapper = factory({});
    const balanceEl = wrapper.find('#ssbt_balance_value');
    expect(balanceEl.exists()).to.be.true;
    expect(balanceEl.text()).to.match(/\d+[,.]?\d*€/);
  });

  it('falls back to the *old* icon set when Digital Assistant is disabled', () => {
    const wrapper = factory({ digitalAssistantEnabled: false });
    expect(wrapper.find('.ssbt_header_balance_box__eye-icon--old').exists()).to.be.true;
    expect(wrapper.find('.ssbt_header_balance_box__refresh-button--old').exists()).to.be.true;
  });

  describe('Balance Visibility Toggle', () => {
    it('uses store visibility on game routes', () => {
      const wrapper = factory({
        routeName: Constants.ROUTE_NAMES.KINO,
        balanceVisibility: false,
      });
      expect(wrapper.vm.isGameRoute).to.be.true;
      expect(wrapper.vm.balanceVisible).to.be.false;
      expect(wrapper.find('#ssbt_balance_value').exists()).to.be.false;
      expect(wrapper.find('#ssbt_balance_txt').exists()).to.be.true;
    });

    it('uses local visibility on non-game routes regardless of store state', () => {
      const wrapper = factory({
        routeName: Constants.ROUTE_NAMES.LOBBY,
        balanceVisibility: false,
      });
      expect(wrapper.vm.isGameRoute).to.be.false;
      expect(wrapper.vm.balanceVisible).to.be.true;
      expect(wrapper.find('#ssbt_balance_value').exists()).to.be.true;
    });

    it('emits toggle-balance event when eye icon clicked on game route', () => {
      const wrapper = factory({ routeName: Constants.ROUTE_NAMES.KINO });
      wrapper.find('#ssbt_balance_eye_icon').trigger('click');
      expect(wrapper.emitted('toggle-balance')).to.have.lengthOf(1);
      expect(wrapper.vm.localVisibility).to.equal(true);
    });

    it('toggles local visibility when eye icon clicked on non-game route', () => {
      const wrapper = factory({ routeName: Constants.ROUTE_NAMES.LOBBY });
      expect(wrapper.vm.localVisibility).to.be.true;
      wrapper.find('#ssbt_balance_eye_icon').trigger('click');
      expect(wrapper.vm.localVisibility).to.be.false;
      expect(wrapper.emitted('toggle-balance')).to.have.lengthOf(1);
    });

    it('resets local visibility when navigating between non-game routes', () => {
      const wrapper = factory({ routeName: Constants.ROUTE_NAMES.LOBBY });
      wrapper.setData({ localVisibility: false });
      expect(wrapper.vm.localVisibility).to.be.false;
      wrapper.vm.$options.watch.$route.call(wrapper.vm);
      expect(wrapper.vm.localVisibility).to.be.true;
    });

    it('correctly identifies game routes', () => {
      const gameRoutes = [Constants.ROUTE_NAMES.KINO, Constants.ROUTE_NAMES.POWERSPIN];

      gameRoutes.forEach((routeName) => {
        const wrapper = factory({ routeName });
        expect(wrapper.vm.isGameRoute).to.be.true;
        wrapper.destroy();
      });

      const wrapper = factory({ routeName: Constants.ROUTE_NAMES.LOBBY });
      expect(wrapper.vm.isGameRoute).to.be.false;
    });

    it('emits update-balance event when refresh button clicked', () => {
      const wrapper = factory({});
      wrapper.find('#ssbt_balance_refresh').trigger('click');
      expect(wrapper.emitted('update-balance')).to.have.lengthOf(1);
    });

    it('formats different balance values correctly', () => {
      const testCases = [
        { balance: 0, expected: '0,00€' },
        { balance: 1234.56, expected: '1.234,56€' },
        { balance: 999999.99, expected: '999.999,99€' },
      ];

      testCases.forEach(({ balance, expected }) => {
        const wrapper = factory({ balance });
        expect(wrapper.find('#ssbt_balance_value').text()).to.include(expected);
        wrapper.destroy();
      });
    });

    it('applies correct icon color class based on route', () => {
      const routeTests = [
        {
          routeName: Constants.ROUTE_NAMES.KINO,
          expectedClass: 'ssbt_header_balance_box__icon--kino',
        },
        {
          routeName: Constants.ROUTE_NAMES.POWERSPIN,
          expectedClass: 'ssbt_header_balance_box__icon--powerspin-fireblaze',
        },
        {
          routeName: Constants.ROUTE_NAMES.LOBBY,
          expectedClass: 'ssbt_header_balance_box__icon--non-play-area',
        },
      ];

      routeTests.forEach(({ routeName, expectedClass }) => {
        const wrapper = factory({ routeName });
        expect(wrapper.vm.iconColorClass).to.equal(expectedClass);
        wrapper.destroy();
      });
    });

    it('maintains separate visibility states for game and non-game routes', () => {
      const lobbyWrapper = factory({
        routeName: Constants.ROUTE_NAMES.LOBBY,
        balanceVisibility: false,
      });
      expect(lobbyWrapper.vm.balanceVisible).to.be.true;
      lobbyWrapper.destroy();
      const gameWrapper = factory({
        routeName: Constants.ROUTE_NAMES.KINO,
        balanceVisibility: false,
      });
      expect(gameWrapper.vm.balanceVisible).to.be.false;
      gameWrapper.destroy();
    });
  });
});
