import FireblazeSelectionsList from '../../../../src/components/lobby/games/fireblaze/sideScreen/FireblazeSelectionsList.vue';
import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import Vue from 'vue';

describe('FireblazeSelectionsList', () => {
  let localVue;
  let instance;
  let sandbox;
  let stubs;
  let store;

  let betslip;

  let getBetslipStub;
  let getBoardCostStub;
  let isValidBetslipStub;
  let isBoardEmptyStub;

  let addBoardSpy;
  let removeBoardSpy;
  let setBoardIndexSpy;
  let emitSpy;

  beforeEach(() => {
    Vue.prototype.$eventHub = new Vue();
    instance = new Vue();
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    localVue.use(Vuex);

    isBoardEmptyStub = sandbox.stub().returns(true);
    isValidBetslipStub = sandbox.stub().returns(true);
    betslip = {
      wager: {
        boards: [
          {
            isEmpty: isBoardEmptyStub,
            panels: [{ selection: [] }],
          },
          {
            isEmpty: isBoardEmptyStub,
            panels: [{ selection: [] }],
          },
        ],
      },
      isValidBetslip: isValidBetslipStub,
    };

    getBetslipStub = sandbox.stub().returns(betslip);
    getBoardCostStub = sandbox.stub();
    getBoardCostStub.withArgs({ index: 0 }).returns(2);
    getBoardCostStub.withArgs({ index: 1 }).returns(4);

    addBoardSpy = sandbox.spy();
    removeBoardSpy = sandbox.spy();
    setBoardIndexSpy = sandbox.spy();
    emitSpy = sandbox.spy(instance.$eventHub, '$emit');

    stubs = {
      FireblazeSelections: {
        name: 'FireblazeSelections',
        template: '<div></div>',
        props: ['board', 'cost', 'selected', 'index'],
        emits: ['delete', 'select'],
      },
      AddBoardButton: {
        name: 'AddBoardButton',
        template: '<button v-on="$listeners"></button>',
        props: ['disabled', 'theme'],
      },
    };

    store = new Vuex.Store({
      modules: {
        FIREBLAZE_GAME_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_BETSLIP: getBetslipStub,
            GET_BOARD_COST: (state) => (payload) => getBoardCostStub(payload),
            GET_SELECTED_BOARD_INDEX: () => 0,
          },
          actions: {
            ADD_BOARD: addBoardSpy,
            REMOVE_BOARD: removeBoardSpy,
            SET_SELECTED_BOARD_INDEX: setBoardIndexSpy,
          },
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render correctly', () => {
    const wrapper = shallowMount(FireblazeSelectionsList, { localVue, store, stubs });
    expect(wrapper.exists()).to.be.true;
  });

  it('should render the correct number of boards', () => {
    const wrapper = shallowMount(FireblazeSelectionsList, { localVue, store, stubs });
    expect(wrapper.findAllComponents({ name: 'FireblazeSelections' }).length).to.equal(2);
  });

  it('should enable the add board button when the betslip is valid', () => {
    const wrapper = shallowMount(FireblazeSelectionsList, { localVue, store, stubs });
    expect(wrapper.findComponent({ name: 'AddBoardButton' }).props().disabled).to.be.false;
  });

  it('should disable the add board button when the betslip is not valid', () => {
    isValidBetslipStub.returns(false);
    const wrapper = shallowMount(FireblazeSelectionsList, { localVue, store, stubs });
    expect(wrapper.findComponent({ name: 'AddBoardButton' }).props().disabled).to.be.true;
  });

  it('should delete the board when empty', () => {
    const wrapper = shallowMount(FireblazeSelectionsList, { localVue, store, stubs });
    const selections = wrapper.findAllComponents({ name: 'FireblazeSelections' });
    selections.at(0).vm.$emit('delete');
    expect(removeBoardSpy.calledOnce).to.be.true;
    expect(removeBoardSpy.getCall(0).args[1]).to.deep.equal({ boardIndex: 0 });
  });

  it('should confirm before deleting a non-empty board', () => {
    isBoardEmptyStub.returns(false);
    const wrapper = shallowMount(FireblazeSelectionsList, { localVue, store, stubs });
    const selections = wrapper.findAllComponents({ name: 'FireblazeSelections' });
    selections.at(0).vm.$emit('delete');

    expect(emitSpy.calledOnce).to.be.true;
    expect(emitSpy.getCall(0).args[0]).to.equal('DIALOG');
  });

  it('should add a new board when clicking the add board button', () => {
    const wrapper = shallowMount(FireblazeSelectionsList, { localVue, store, stubs });
    wrapper.findComponent({ name: 'AddBoardButton' }).trigger('click');
    expect(addBoardSpy.calledOnce).to.be.true;
  });
});
