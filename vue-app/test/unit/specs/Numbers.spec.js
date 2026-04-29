import { shallowMount, createLocalVue } from '@vue/test-utils';
import Numbers from '../../../src/components/lobby/games/kino/mainscreen/numbers.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import sinon from 'sinon';
import {exp} from "qrcode/lib/core/galois-field";

describe('Numbers', () => {
  const localVue = createLocalVue();

  let wrapper;
  let store;
  let sandbox;
  Vue.prototype.$eventHub = new Vue(); // Global event bus

  let getActiveBetAreaStub;
  let getActiveBetslipAreaStub;
  let toggleNumberSpy;
  let updateActiveBetslipAreaSpy;

  beforeEach(() => {
    localVue.use(Vuex);
    sandbox = sinon.sandbox.create();

    getActiveBetAreaStub = sandbox.stub().returns({ pickedNumbers: [] });
    getActiveBetslipAreaStub = sandbox.stub();
    toggleNumberSpy = sandbox.spy();
    updateActiveBetslipAreaSpy = sandbox.spy();

    store = new Vuex.Store({
      modules: {
        PLAYER_SESSION_MODULE: {
          namespaced: true,
          getters: {
            GET_ACTIVE_BETSLIP_AREA: getActiveBetslipAreaStub,
          },
          actions: {
            UPDATE_ACTIVE_BETSLIP_AREA: updateActiveBetslipAreaSpy,
          },
        },
        KINO_GAME_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_ACTIVE_BET_AREA: getActiveBetAreaStub,
          },
          actions: {
            TOGGLE_NUMBER: toggleNumberSpy,
          },
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
    wrapper.destroy();
  });

  it('renders number 1 upon creation unclicked', () => {
    wrapper = shallowMount(Numbers, {
      propsData: {
        number_identifier: 'kino_number_',
      },
      localVue,
      store,
    });
    expect(wrapper.find('#kino_number_1').exists()).to.be.true;
    expect(wrapper.find('#kino_number_1').classes()).not.to.contain('input_label_checked');
  });

  it('renders number 80 upon creation unclicked', () => {
    wrapper = shallowMount(Numbers, {
      propsData: {
        number_identifier: 'kino_number_',
      },
      localVue,
      store,
    });
    expect(wrapper.find('#kino_number_80').exists()).to.be.true;
    expect(wrapper.find('#kino_number_80').classes()).not.to.contain('input_label_checked');
  });

  it('renders number 1 upon creation unclicked', () => {
    wrapper = shallowMount(Numbers, {
      propsData: {
        number_identifier: 'kino_number_',
      },
      localVue,
      store,
    });
    expect(wrapper.find('#kino_number_1').exists()).to.be.true;
    expect(wrapper.find('#kino_number_1').classes()).not.to.contain('input_label_checked');
  });

  it('selecting number 3 will result in applying input_label_checked class to label', async () => {
    getActiveBetAreaStub.returns({ pickedNumbers: [3] });
    wrapper = shallowMount(Numbers, {
      propsData: {
        number_identifier: 'kino_number_',
      },
      localVue,
      store,
    });
    expect(wrapper.find('#kino_number_3_label').classes()).to.contain('input_label_checked');
  });

  it('should change numbers value from false to true when clicked', async () => {
    getActiveBetAreaStub.returns({ pickedNumbers: [3] });
    wrapper = shallowMount(Numbers, {
      propsData: {
        number_identifier: 'kino_number_',
      },
      localVue,
      store,
    });
    expect(wrapper.find('#kino_number_3').attributes().value).to.equal('true');
  });

  it('should dispatch TOGGLE_NUMBER action when number is clicked', async () => {
    wrapper = shallowMount(Numbers, {
      propsData: {
        number_identifier: 'kino_number_',
      },
      localVue,
      store,
    });
    wrapper.find('#kino_number_3').trigger('click');
    expect(toggleNumberSpy.called).to.be.true;
    expect(toggleNumberSpy.getCall(0).args[1]).to.eql({ number: 3 });
  });
});
