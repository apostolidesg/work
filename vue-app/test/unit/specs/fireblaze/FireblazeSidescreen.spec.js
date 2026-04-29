import FireblazeSidescreen from '../../../../src/components/lobby/games/fireblaze/sideScreen/FireblazeSidescreen.vue';
import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';

describe('FireblazeSidescreen', () => {
  let localVue;
  let store;
  let getBetslipStub;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    localVue.use(Vuex);

    getBetslipStub = sandbox.stub().returns({ wager: { boards: [] } });

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
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(FireblazeSidescreen, { localVue, store });
    expect(wrapper.exists()).to.be.true;
  });

  it('should render the BaseSidescreen component', () => {
    const wrapper = shallowMount(FireblazeSidescreen, { localVue, store });
    expect(wrapper.findComponent({ name: 'BaseSidescreen' }).exists()).to.be.true;
  });

  it('should render the FireblazeSelectionsList component inside BaseSidescreen', () => {
    const wrapper = shallowMount(FireblazeSidescreen, { localVue, store });
    expect(wrapper.findComponent({ name: 'FireblazeSelectionsList' }).exists()).to.be.true;
  });

  it('should pass betslip from Vuex store to BaseSidescreen', () => {
    const wrapper = shallowMount(FireblazeSidescreen, { localVue, store });
    expect(wrapper.findComponent({ name: 'BaseSidescreen' }).props().betslip).to.deep.equal({ wager: { boards: [] } });
  });
});
