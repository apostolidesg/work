import { createLocalVue, shallowMount } from '@vue/test-utils';
import EurojackpotSettings from '../../../../src/components/lobby/games/eurojackpot/settings/EurojackpotSettings.vue';
import EurojackpotBetslipUtilities from '../../../../src/util/eurojackpotBetslipUtilities';
import Vuex from 'vuex';
import sinon from 'sinon';

describe('In EurojackpotSettings component', () => {
  let stubs;
  let localVue;
  let sandbox;
  let store;
  let getSelectedBoardStub;
  let daysUntilNextDrawStub;
  let toggleQuickPickSpy;
  let setSelectedSystemSpy;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);
    getSelectedBoardStub = sandbox.stub();
    daysUntilNextDrawStub = sandbox.stub(EurojackpotBetslipUtilities, 'daysUntilNextDraw');
    toggleQuickPickSpy = sandbox.spy();
    setSelectedSystemSpy = sandbox.spy();

    stubs = {
      EurojackpotQuickPick: {
        name: 'EurojackpotQuickPick',
        template: '<div class="eurojackpot-quick-pick-stub"></div>',
        emits: ['quick-pick-click'],
      },
      EurojackpotSystems: {
        name: 'EurojackpotSystems',
        template: '<div class="eurojackpot-systems-stub"></div>',
        props: ['active-system-id'],
      },
      EurojackpotNextDrawWrapper: {
        name: 'EurojackpotNextDrawWrapper',
        template: '<div class="eurojackpot-next-draw-wrapper-stub"></div>',
        props: ['sales-close-time'],
      },
    };

    store = new Vuex.Store({
      modules: {
        EUROJACKPOT_GAME_STORE_MODULE: {
          namespaced: true,
          state: {
            salesStatus: 'SALES_OPEN',
            salesCloseTime: 300,
          },
          getters: {
            GET_SELECTED_BOARD: getSelectedBoardStub,
          },
          actions: {
            SET_SYSTEM: setSelectedSystemSpy,
            TOGGLE_QUICK_PICK: toggleQuickPickSpy,
          },
        },
      },
    });

    getSelectedBoardStub.returns({
      panels: [{ selection: [] }, { selection: [1, 2, 3, 4, 5] }],
      systemId: '12',
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render the quick pick component', () => {
    const wrapper = shallowMount(EurojackpotSettings, { stubs, localVue, store });

    const quickPick = wrapper.findComponent({ name: stubs.EurojackpotQuickPick.name });

    expect(quickPick.exists()).to.be.true;
  });

  it('should render the systems component with the correct props', () => {
    const wrapper = shallowMount(EurojackpotSettings, { stubs, localVue, store });
    const systemButton = wrapper.findComponent({ name: stubs.EurojackpotSystems.name });

    expect(systemButton.props('activeSystemId')).to.equal('12');
  });

  it('should not render the next draw component if the sales are closed', () => {
    store.state.EUROJACKPOT_GAME_STORE_MODULE.salesStatus = 'SALES_CLOSED';
    const wrapper = shallowMount(EurojackpotSettings, { stubs, localVue, store });

    const nextDraw = wrapper.findComponent({ name: stubs.EurojackpotNextDrawWrapper.name });

    expect(nextDraw.exists()).to.be.false;
  });

  it('should render the next draw component if the sales are open', () => {
    store.state.EUROJACKPOT_GAME_STORE_MODULE.salesStatus = 'SALES_OPEN';
    daysUntilNextDrawStub.withArgs(300).returns(5);
    const wrapper = shallowMount(EurojackpotSettings, { stubs, localVue, store });

    const nextDraw = wrapper.findComponent({ name: stubs.EurojackpotNextDrawWrapper.name });

    expect(nextDraw.exists()).to.be.true;
    expect(nextDraw.props('salesCloseTime')).to.eql(
      new Date(store.state.EUROJACKPOT_GAME_STORE_MODULE.salesCloseTime)
    );
  });

  it('Should call the quickPickButton method when the EurojackpotQuickPick button clicks and emit the event', () => {
    const wrapper = shallowMount(EurojackpotSettings, { stubs, localVue, store });
    const quickPickButton = wrapper.findComponent({ name: stubs.EurojackpotQuickPick.name });
    quickPickButton.vm.$emit('quick-pick-click');

    expect(toggleQuickPickSpy.calledOnce).to.true;
  });
  it('Should set the systemId when the EurojackpotSystems system-click event is triggered', () => {
    const wrapper = shallowMount(EurojackpotSettings, { stubs, localVue, store });
    const systemsButton = wrapper.findAllComponents({ name: stubs.EurojackpotSystems.name }).at(0);

    systemsButton.vm.$emit('system-click', '12');

    expect(setSelectedSystemSpy.calledOnce).to.be.true;
    expect(setSelectedSystemSpy.getCall(0).args[1].systemId).to.equal('12');
  });
});
