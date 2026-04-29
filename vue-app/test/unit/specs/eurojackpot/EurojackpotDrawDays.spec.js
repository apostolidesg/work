import EurojackpotDrawDays from '../../../../src/components/lobby/games/eurojackpot/common/EurojackpotDrawDays.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import Vuex from 'vuex';
import EurojackpotBetslipUtilities from '../../../../src/util/eurojackpotBetslipUtilities';

describe('EurojackpotDrawDays', () => {
  let localVue;
  let sandbox;
  let mocks;
  let store;

  let tStub;
  let getDrawDaysTitleStub;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    sandbox = sinon.createSandbox();

    tStub = sandbox.stub();

    tStub.withArgs('eurojackpot.drawsEvery').returns('Draws every');
    getDrawDaysTitleStub = sandbox.stub(EurojackpotBetslipUtilities, 'getDrawDaysTitle');

    mocks = {
      $t: tStub,
    };

    store = new Vuex.Store({
      modules: {
        EUROJACKPOT_GAME_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_DRAW_DAYS: () => [1, 2],
          },
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render component', () => {
    const wrapper = shallowMount(EurojackpotDrawDays, { localVue, store, mocks });

    expect(wrapper.exists()).to.be.true;
  });

  it('should render the correct content', () => {
    getDrawDaysTitleStub.withArgs([1, 2], tStub).returns('Monday & Tuesday');

    const wrapper = shallowMount(EurojackpotDrawDays, { localVue, store, mocks });

    expect(wrapper.text()).to.equal('Draws every Monday & Tuesday');
  });
});
