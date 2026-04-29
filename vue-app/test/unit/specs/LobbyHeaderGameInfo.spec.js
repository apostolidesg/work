import { createLocalVue, shallowMount } from '@vue/test-utils';
import types from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import moduleTypes from '../../../src/store/modules/types';
import sinon from 'sinon';
import Vue from 'vue';
import Vuex from 'vuex';
import Constants from '../../../src/util/Constants';

import LobbyHeaderGameInfo from '../../../src/components/lobby/lobbyHeader/LobbyHeaderGameInfo';
import modalEventConstants from '../../../src/util/modalEventConstants';
import infoModalScrollableMessages from '../../../src/util/infoModalScrollableMessages';

describe('LobbyHeaderGameInfo Component', () => {
  Vue.prototype.$eventHub = new Vue(); // Global event bus
  let propsData;
  let mocks;
  let state;
  let store;
  let localVue;

  beforeEach(() => {
    propsData = {
      textTheme: 'black',
      barcodeReaderStatusOk: true,
    };

    mocks = {
      $t: sinon.stub().callsFake(() => {
        return 'test';
      }),
    };

    state = {
      [types.state.GAME_TYPE]: () => 'KINO',
    };

    localVue = createLocalVue();
    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        [moduleTypes.SESSION_STORE_MODULE]: {
          namespaced: true,
          state,
        },
      },
    });
  });

  it('should render info button', () => {
    const wrapper = shallowMount(LobbyHeaderGameInfo, {
      store,
      propsData,
      mocks,
      computed: {
        isPlayArea: () => true,
        $route() {
          return { name: Constants.ROUTE_NAMES.KINO };
        },
      },
    });
    expect(wrapper.find('#ssbt-header-game-info-terms').exists()).to.be.true;
    expect(wrapper.contains('#ssbt-header-game-info-terms')).to.be.true;
    expect(wrapper.text()).to.be.equal('test\n     test');
    wrapper.vm.$emit('openTerms');
    wrapper.vm.$emit(modalEventConstants.OPEN.INFO_SCROLLABLE, infoModalScrollableMessages.terms);
  });

  it('should render how to play button', () => {
    const wrapper = shallowMount(LobbyHeaderGameInfo, {
      store,
      propsData,
      mocks,
      computed: {
        isPlayArea: () => true,
        $route() {
          return { name: Constants.ROUTE_NAMES.KINO };
        },
      },
    });
    expect(wrapper.find('#ssbt-header-game-info-how-to-play').exists()).to.be.true;
    expect(wrapper.contains('#ssbt-header-game-info-how-to-play')).to.be.true;
    expect(wrapper.text()).to.be.equal('test\n     test');
    wrapper.vm.$emit('openHowToPlay');
    wrapper.vm.$emit(modalEventConstants.OPEN.INFO_SCROLLABLE, infoModalScrollableMessages.terms);
  });
});
