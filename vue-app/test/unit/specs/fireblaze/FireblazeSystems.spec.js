import FireblazeOptions from '../../../../src/components/lobby/games/fireblaze/settings/FireblazeOptions.vue';
import FireblazeOptionButton from '../../../../src/components/lobby/games/fireblaze/settings/FireblazeOptionButton.vue';
import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import FireblazeConstants from '../../../../src/util/fireblazeConstants';

describe('FireblazeOptions', () => {
  let localVue;
  let store;
  let getBetslipStub;
  let sandbox;
  let wrapper;
  let emitSpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    localVue.use(Vuex);

    getBetslipStub = sandbox.stub().returns({
      wager: {
        boards: [{ betType: 1 }],
      },
    });

    store = new Vuex.Store({
      modules: {
        FIREBLAZE_GAME_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_BETSLIP: getBetslipStub,
          },
        },
      },
    });

    emitSpy = sandbox.spy();
    wrapper = shallowMount(FireblazeOptions, {
      localVue,
      store,
      propsData: { activeBetType: 1 },
      listeners: { 'bet-type-click': emitSpy },
      stubs: { FireblazeOptionButton },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).to.be.true;
  });

  it('should render the correct number of FireblazeSystemButton components', () => {
    const buttons = wrapper.findAllComponents(FireblazeOptionButton);
    expect(buttons.length).to.equal(Object.keys(FireblazeConstants.BETTYPE_TO_NUMBERS_COUNT).length);
  });

  it('should emit system-click event with correct systemId when a system button is clicked', async () => {
    const buttons = wrapper.findAllComponents(FireblazeOptionButton);
    await buttons.at(1).trigger('click');
    expect(emitSpy.calledOnce).to.be.true;
    expect(emitSpy.getCall(0).args[0]).to.deep.equal({ betType: FireblazeConstants.BET_TYPES.DOUBLE });
  });

  it('should correctly determine if a system button is disabled', () => {
    expect(wrapper.vm.isBetTypeDisabled(1)).to.be.false;
    expect(wrapper.vm.isBetTypeDisabled(39)).to.be.false;
  });
});
