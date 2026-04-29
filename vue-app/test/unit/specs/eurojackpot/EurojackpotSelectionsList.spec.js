import EurojackpotSelectionsList from '../../../../src/components/lobby/games/eurojackpot/sidescreen/EurojackpotSelectionsList.vue';
import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import Vue from 'vue';

describe('EurojackpotSelectionsList', () => {
  let localVue;
  let instance;
  let sandbox;
  let stubs;
  let store;

  let betslip;

  // stubs
  let getBetslipStub;
  let getBoardCostStub;
  let isVaildBetslipStub;
  let isBoardEmptyStub;

  // spies
  let addBoardSpy;
  let removeBoardSpy;
  let setBoardIndexSpy;
  let emitSpy;

  beforeEach(() => {
    Vue.prototype.$eventHub = new Vue();
    instance = new Vue();
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);

    isBoardEmptyStub = sandbox.stub().returns(true);
    isVaildBetslipStub = sandbox.stub().returns(true);
    betslip = {
      wager: {
        boards: [
          {
            isEmpty: isBoardEmptyStub,
          },
          {
            isEmpty: isBoardEmptyStub,
          },
        ],
      },
      isValidBetslip: isVaildBetslipStub,
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
      EurojackpotSelections: {
        name: 'EurojackpotSelections',
        template: '<div></div>',
        props: ['board', 'cost', 'selected'],
        emits: ['delete', 'select'],
      },
      AddBoardButton: {
        name: 'AddBoardButton',
        template: '<button v-on="$listeners"></button>',
        props: ['disabled'],
      },
    };

    store = new Vuex.Store({
      modules: {
        EUROJACKPOT_GAME_STORE_MODULE: {
          namespaced: true,
          getters: {
            GET_BETSLIP: getBetslipStub,
            GET_BOARD_COST: () => getBoardCostStub,
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
    const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
    expect(wrapper.exists()).to.true;
  });

  it('should render the correct number of boards', () => {
    const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
    expect(wrapper.findAllComponents({ name: 'EurojackpotSelections' }).length).to.equal(2);
  });

  it('should pass the correct board to the EurojackpotSelections component', () => {
    const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
    const selections = wrapper.findAllComponents({ name: 'EurojackpotSelections' });
    expect(selections.at(0).props('board')).to.equal(betslip.wager.boards[0]);
    expect(selections.at(1).props('board')).to.equal(betslip.wager.boards[1]);
  });

  it('should pass the correct cost to the EurojackpotSelections component', () => {
    const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
    const selections = wrapper.findAllComponents({ name: 'EurojackpotSelections' });
    expect(selections.at(0).props('cost')).to.equal(2);
    expect(selections.at(1).props('cost')).to.equal(4);
  });

  it('should pass the correct selected prop to the EurojackpotSelections component', () => {
    const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
    const selections = wrapper.findAllComponents({ name: 'EurojackpotSelections' });
    expect(selections.at(0).props('selected')).to.true;
    expect(selections.at(1).props('selected')).to.false;
  });

  it('should enable the add board button when the betslip is valid', () => {
    const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
    expect(wrapper.findComponent({ name: stubs.AddBoardButton.name }).props().disabled).to.false;
  });

  it('should disable the add board button when the betslip is not valid', () => {
    isVaildBetslipStub.returns(false);
    const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
    expect(wrapper.findComponent({ name: stubs.AddBoardButton.name }).props().disabled).to.true;
  });

  describe('when the delete event is emitted from the EurojackpotSelections component', () => {
    it('should delete the board if it empty', () => {
      const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
      const selections = wrapper.findAllComponents({ name: 'EurojackpotSelections' });
      selections.at(0).vm.$emit('delete');
      expect(removeBoardSpy.calledOnce).to.true;
      expect(removeBoardSpy.getCall(0).args[1]).to.deep.equal({ boardIndex: 0 });
    });

    it('should ask the user to confirm if the board is not empty', () => {
      isBoardEmptyStub.returns(false);
      const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
      const selections = wrapper.findAllComponents({ name: 'EurojackpotSelections' });
      selections.at(0).vm.$emit('delete');

      expect(emitSpy.calledOnce).to.true;
      expect(emitSpy.getCall(0).args[0]).to.equal('DIALOG');
      expect(emitSpy.getCall(0).args[1]).to.deep.equal({
        icon: {
          icon: 'question',
        },
        message: {
          translationLabel: 'deleteBetAreaWarningModalMessage',
        },
        title: 'clearArea',
        type: 'DIALOG',
      });
    });

    it('should delete the board if the user confirms', () => {
      isBoardEmptyStub.returns(false);
      const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
      const selections = wrapper.findAllComponents({ name: 'EurojackpotSelections' });
      selections.at(0).vm.$emit('delete');
      emitSpy.getCall(0).args[2]();
      expect(removeBoardSpy.calledOnce).to.true;
      expect(removeBoardSpy.getCall(0).args[1]).to.deep.equal({ boardIndex: 0 });
    });
  });

  it('should select the board when the select event is emitted from the EurojackpotSelections component', () => {
    const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
    const selections = wrapper.findAllComponents({ name: 'EurojackpotSelections' });
    selections.at(1).vm.$emit('select');
    expect(setBoardIndexSpy.calledOnce).to.true;
    expect(setBoardIndexSpy.getCall(0).args[1]).to.deep.equal({ selectedBoardIndex: 1 });
  });

  it('should add a new board when the user clicks the add board button', () => {
    const wrapper = shallowMount(EurojackpotSelectionsList, { localVue, store, stubs });
    wrapper.findComponent({ name: stubs.AddBoardButton.name }).trigger('click');
    expect(addBoardSpy.calledOnce).to.true;
  });
});
