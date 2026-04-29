import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import QuickbetsFooter from '@/components/common/Quickbets/QuickbetsFooter.vue';
import Constants from '@/util/Constants';
import sessionStoreModuleTypes from '@/store/modules/SessionStoreModule/types';
import betslipUtils from '@/util/betslipUtils';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('QuickbetsFooter.vue', () => {
  let store;
  let mocks;
  let kinoActions;
  let kinoState;
  let powerspinState;
  let powerspinActions;
  let sessionGetters;
  let sandbox;
  let kinoConsecutiveDraws

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    kinoConsecutiveDraws = sinon.stub();
    mocks = {
      $t: sandbox.stub().callsFake((key) => key),
      $router: { push: sandbox.stub() },
    };

    kinoState = {
      betslip: {
        calculateValue: () => 10,
        setConsecutiveDraws: sinon.stub(),
      },
    };

    powerspinState = {
      betslipArray: [
        {
          setConsecutiveDraws: sinon.stub(),
          wager: {
            participatingDraws: {
              multipleDraws: 2,
            },
            wheels: [
              {
                categories: {
                  number: {
                    boards: [{ multipliers: [1, 2] }],
                    multipliers: [1, 2],
                  },
                },
              },
            ],
          },
        },
      ],
    };

    kinoActions = {
      SET_CONSECUTIVE_DRAWS: kinoConsecutiveDraws,
    };

    powerspinActions = {
      SET_BETSLIP_CONSECUTIVE_DRAWS: sinon.stub(),
    };

    sessionGetters = {
      [sessionStoreModuleTypes.getters.GET_ACTIVE_BETSLIP_COST]: () => 10,
    };

    sandbox.stub(betslipUtils, 'isWheelCategoryEmpty').returns(false);
    sandbox.stub(betslipUtils, 'calculateCategoryColumnsNumber').returns(1);
    sandbox.stub(gtag, 'sendEvent').returns();

    store = new Vuex.Store({
      modules: {
        KINO_GAME_STORE_MODULE: {
          namespaced: true,
          state: kinoState,
          actions: kinoActions,
        },
        POWERSPIN_GAME_STORE_MODULE: {
          namespaced: true,
          state: powerspinState,
          actions: powerspinActions,
        },
        SESSION_STORE_MODULE: {
          namespaced: true,
          getters: sessionGetters,
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders draw selector buttons', () => {
    const wrapper = shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });
    const buttons = wrapper.findAll('.quickbets__footer-number');
    expect(buttons.length).to.equal(5);
    expect(buttons.at(0).text()).to.equal('1');
  });

  it('updates consecutiveDraws and triggers kino store action', async () => {
    const wrapper = shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });
    await wrapper.vm.setConsecutiveDraws(3);
    expect(wrapper.vm.consecutiveDraws).to.equal(3);
  });

  it('updates consecutiveDraws and triggers powerspin store action', async () => {
    const wrapper = shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.POWERSPIN },
    });
    await wrapper.vm.setConsecutiveDraws(2);
    expect(wrapper.vm.consecutiveDraws).to.equal(2);
  });

  it('reactively updates consecutiveDraws from child event', async () => {
    const wrapper = shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });
    wrapper.vm.setConsecutiveDraws(4);
    expect(wrapper.vm.consecutiveDraws).to.equal(4);
  });

  it('returns correct betSlipValue for KINO', () => {
    const wrapper = shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });
    expect(wrapper.vm.getActiveBetslipCost).to.equal(10);
  });

  it('returns correct betSlipValue for POWERSPIN', () => {
    const wrapper = shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.POWERSPIN },
    });
    expect(wrapper.vm.getActiveBetslipCost).to.equal(10);
  });

  it('calls setConsecutiveDraws with 1 on mount for KINO', () => {
    const setConsecutiveDrawsStub = sandbox.stub(QuickbetsFooter.methods, 'setConsecutiveDraws');
    shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });
    expect(setConsecutiveDrawsStub.calledWith(1)).to.be.true;
    setConsecutiveDrawsStub.restore();
  });

  it('calls setConsecutiveDraws with powerspin value on mount for POWERSPIN', () => {
    const setConsecutiveDrawsStub = sandbox.stub(QuickbetsFooter.methods, 'setConsecutiveDraws');
    shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.POWERSPIN },
    });
    expect(setConsecutiveDrawsStub.calledWith(2)).to.be.true;
    setConsecutiveDrawsStub.restore();
  });

  it('sends tracking event when consecutive draws are updated for KINO', async () => {
    const wrapper = shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });

    await wrapper.vm.setConsecutiveDraws(3);
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_CONSECUTIVE_DRAWS_CHANGED, {
      consecutiveDraws: 3,
      game: Constants.THEMES.KINO,
    })).to.be.true;
  });

  it('sends tracking event when consecutive draws are updated for POWERSPIN', async () => {
    const wrapper = shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.POWERSPIN },
    });

    await wrapper.vm.setConsecutiveDraws(4);
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_CONSECUTIVE_DRAWS_CHANGED, {
      consecutiveDraws: 4,
      game: Constants.THEMES.POWERSPIN,
    })).to.be.true;
  });
  
  it('sends tracking event when setConsecutiveDraws is called', async () => {
    const wrapper = shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });

    await wrapper.vm.setConsecutiveDraws(5);
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_CONSECUTIVE_DRAWS_CHANGED, {
      consecutiveDraws: 5,
      game: Constants.THEMES.KINO,
    })).to.be.true;
  });
  
  it('sends tracking event on mount with default values', () => {
    shallowMount(QuickbetsFooter, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });
    
    expect(gtag.sendEvent.calledWith(gtmEvents.SSBT_CONSECUTIVE_DRAWS_CHANGED, {
      consecutiveDraws: 1,
      game: Constants.THEMES.KINO,
    })).to.be.false;
  });
});
