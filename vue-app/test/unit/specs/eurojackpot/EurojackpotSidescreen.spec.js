import EurojackpotSidescreen from '../../../../src/components/lobby/games/eurojackpot/sidescreen/EurojackpotSidescreen.vue';
import sinon from 'sinon';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';

describe('EurojackpotSidescreen.vue', () => {
  let stubs;
  let localVue;
  let store;
  let wrapper;
  let sandbox;

  let getBetSlipStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();

    getBetSlipStub = sandbox.stub();

    stubs = {
      BaseSidescreen: {
        name: 'BaseSidescreen',
        template: '<div><slot></slot></div>',
        props: ['betslip'],
      },
      EurojackpotSelectionsList: {
        name: 'EurojackpotSelectionsList',
        template: '<div></div>',
      },
    };

    store = new Vuex.Store({
      modules: {
        EUROJACKPOT_GAME_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_BETSLIP: getBetSlipStub,
          },
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
    wrapper.destroy();
  });

  it('should render the BaseSidescreen component', () => {
    wrapper = shallowMount(EurojackpotSidescreen, { stubs, store, localVue });
    expect(wrapper.findComponent({ name: stubs.BaseSidescreen.name }).exists()).to.equal(true);
  });

  it('should pass the betslip prop to the BaseSidescreen component', () => {
    const betslip = {};
    getBetSlipStub.returns(betslip);

    wrapper = shallowMount(EurojackpotSidescreen, { stubs, store, localVue });
    expect(wrapper.findComponent({ name: stubs.BaseSidescreen.name }).props().betslip).to.equal(betslip);
  });

  it('should render the EurojackpotSelectionsList component', () => {
    wrapper = shallowMount(EurojackpotSidescreen, { stubs, store, localVue });
    expect(wrapper.findComponent({ name: stubs.EurojackpotSelectionsList.name }).exists()).to.equal(true);
  });
});
