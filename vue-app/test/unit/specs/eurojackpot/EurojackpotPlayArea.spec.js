import sinon from 'sinon';
import EurojackpotPlayArea from '../../../../src/components/lobby/games/eurojackpot/mainscreen/EurojackpotPlayArea.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';

const statistics = {
  mainNumbers: Array.from({ length: 50 })
    .map((_, index) => ({ occurrences: index, delays: index }))
    .reduce((acc, curr, index) => {
      acc[index + 1] = curr;
      return acc;
    }, {}),

  euroNumbers: Array.from({ length: 12 })
    .map((_, index) => ({ occurrences: index, delays: index }))
    .reduce((acc, curr, index) => {
      acc[index + 1] = curr;
      return acc;
    }),
};

describe('EurojackpotPlayArea', () => {
  Vue.prototype.$eventHub = new Vue();
  const instance = new Vue();
  let localVue;
  let sandbox;
  let stubs;
  let store;
  let mocks;

  // stubs
  let getSelectedBoardStub;
  let isBoardEmptyStub;
  let $tStub;

  // spies
  let toggleMainNumbersSpy;
  let toggleEuroNumbersSpy;
  let clearSelectedBoardSpy;
  let statisticsSelectionSpy;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);
    getSelectedBoardStub = sandbox.stub();
    isBoardEmptyStub = sandbox.stub().returns(false);
    toggleMainNumbersSpy = sandbox.spy();
    toggleEuroNumbersSpy = sandbox.spy();
    clearSelectedBoardSpy = sandbox.spy();
    statisticsSelectionSpy = sandbox.spy();
    $tStub = sandbox.stub();

    stubs = {
      EurojackpotNumbersSelections: {
        name: 'EurojackpotNumbersSelections',
        template: '<div></div>',
        props: ['selectedNumbers', 'selectedSystemId', 'type', 'numbers'],
        emits: ['toggle-number'],
      },
      BaseClearButton: {
        name: 'BaseClearButton',
        template: '<button></button>',
        props: ['top-label', 'theme', 'disabled'],
        emits: ['click'],
      },
      TristateSwitch: {
        name: 'TristateSwitch',
        template: '<div></div>',
        props: ['value', 'options', 'leftLabel', 'rightLabel'],
        emits: ['input'],
      },
    };

    store = new Vuex.Store({
      modules: {
        EUROJACKPOT_GAME_STORE_MODULE: {
          namespaced: true,
          state: {
            statisticsSelection: 'OCCURRENCES',
            statistics,
          },
          getters: {
            GET_SELECTED_BOARD: getSelectedBoardStub,
          },
          actions: {
            SET_MAIN_SELECTION: toggleMainNumbersSpy,
            SET_EURO_SELECTION: toggleEuroNumbersSpy,
            CLEAR_SELECTED_BOARD: clearSelectedBoardSpy,
            SET_STATISTICS_SELECTION: statisticsSelectionSpy,
          },
        },
      },
    });

    getSelectedBoardStub.returns({
      panels: [{ selection: [] }, { selection: [] }],
      systemId: null,
      isEmpty: isBoardEmptyStub,
    });

    mocks = {
      $t: $tStub,
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render the component', () => {
    const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });

    expect(wrapper.exists()).to.true;
  });

  describe('when rendering the EurojackpotNumbersSelections component for the main numbers', () => {
    beforeEach(() => {
      getSelectedBoardStub.returns({
        panels: [{ selection: [1, 2, 3, 4, 5] }, { selection: [] }],
        systemId: '12',
        isEmpty: isBoardEmptyStub,
      });
    });

    it('should render the EurojackpotNumbersSelections component for the main numbers', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const mainNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(0);

      expect(mainNumbersSelections.exists()).to.true;
      expect(mainNumbersSelections.props('type')).to.equal('main');
    });

    it('should pass the selected numbers to the EurojackpotNumbersSelections component for the main numbers', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const mainNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(0);

      expect(mainNumbersSelections.props('selectedNumbers')).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should pass the selected system id to the EurojackpotNumbersSelections component for the main numbers', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const mainNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(0);

      expect(mainNumbersSelections.props('selectedSystemId')).to.equal('12');
    });

    it('should set toggle the main number when the EurojackpotNumbersSelections component for the main numbers emits the toggle-number event', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const mainNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(0);
      mainNumbersSelections.vm.$emit('toggle-number', 1);

      expect(toggleMainNumbersSpy.calledOnce).to.true;
      expect(toggleMainNumbersSpy.getCall(0).args[1]).to.eql({ mainSelection: 1 });
    });

    it('should pass the numbers to the EurojackpotNumbersSelections component with the statistics when the option is selected', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const mainNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(0);

      const expectedNumbers = Array.from({ length: 50 }).map((_, index) => ({
        number: index + 1,
        stat: index,
      }));

      expect(mainNumbersSelections.props('numbers')).to.deep.equal(expectedNumbers);
    });

    it('should pass the numbers to the EurojackpotNumbersSelections component with no statistics when the option is NONE', () => {
      store.state.EUROJACKPOT_GAME_STORE_MODULE.statisticsSelection = 'NONE';
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const mainNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(0);

      const expectedNumbers = Array.from({ length: 50 }).map((_, index) => ({
        number: index + 1,
        stat: null,
      }));

      expect(mainNumbersSelections.props('numbers')).to.deep.equal(expectedNumbers);
    });
  });

  describe('when rendering the EurojackpotNumbersSelections component for the euro numbers', () => {
    beforeEach(() => {
      getSelectedBoardStub.returns({
        panels: [{ selection: [] }, { selection: [1, 2] }],
        systemId: '12',
        isEmpty: isBoardEmptyStub,
      });
    });

    it('should render the EurojackpotNumbersSelections component for the euro numbers', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const euroNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(1);

      expect(euroNumbersSelections.exists()).to.true;
      expect(euroNumbersSelections.props('type')).to.equal('euro');
    });

    it('should pass the selected numbers to the EurojackpotNumbersSelections component for the euro numbers', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const euroNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(1);

      expect(euroNumbersSelections.props('selectedNumbers')).to.deep.equal([1, 2]);
    });

    it('should not pass any value as system id to the EurojackpotNumbersSelections component for the euro numbers', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const euroNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(1);

      expect(euroNumbersSelections.props('selectedSystemId')).to.be.undefined;
    });

    it('should set toggle the euro number when the EurojackpotNumbersSelections component for the euro numbers emits the toggle-number event', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const euroNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(1);
      euroNumbersSelections.vm.$emit('toggle-number', 1);

      expect(toggleEuroNumbersSpy.calledOnce).to.true;
      expect(toggleEuroNumbersSpy.getCall(0).args[1]).to.eql({ euroSelection: 1 });
    });

    it('should pass the numbers to the EurojackpotNumbersSelections component with the statistics when the option is selected', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const euroNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(1);

      const expectedNumbers = Array.from({ length: 12 }).map((_, index) => ({
        number: index + 1,
        stat: index,
      }));

      expect(euroNumbersSelections.props('numbers')).to.deep.equal(expectedNumbers);
    });

    it('should pass the numbers to the EurojackpotNumbersSelections component with no statistics when the option is NONE', () => {
      store.state.EUROJACKPOT_GAME_STORE_MODULE.statisticsSelection = 'NONE';
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const euroNumbersSelections = wrapper.findAllComponents({ name: stubs.EurojackpotNumbersSelections.name }).at(1);

      const expectedNumbers = Array.from({ length: 12 }).map((_, index) => ({
        number: index + 1,
        stat: null,
      }));

      expect(euroNumbersSelections.props('numbers')).to.deep.equal(expectedNumbers);
    });
  });

  it('should render the BaseClearButton component', () => {
    const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
    const clearButton = wrapper.findComponent({ name: stubs.BaseClearButton.name });

    expect(clearButton.exists()).to.true;
    expect(clearButton.props('topLabel')).to.equal('clear');
    expect(clearButton.props('theme')).to.equal('white');
  });

  it('should disable the BaseClearButton component when the selected board is empty', () => {
    isBoardEmptyStub.returns(true);
    const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
    const clearButton = wrapper.findComponent({ name: stubs.BaseClearButton.name });

    expect(clearButton.props('disabled')).to.true;
  });

  it('should not disable the BaseClearButton component when the selected board is not empty', () => {
    const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
    const clearButton = wrapper.findComponent({ name: stubs.BaseClearButton.name });

    expect(clearButton.props('disabled')).to.false;
  });

  it('should open a confirmation modal when the BaseClearButton component emits the click event', () => {
    const emitSpy = sandbox.spy(instance.$eventHub, '$emit');
    const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
    const clearButton = wrapper.findComponent({ name: stubs.BaseClearButton.name });
    clearButton.vm.$emit('click');
    expect(emitSpy.getCall(0).args[0]).to.equal('DIALOG');
    expect(emitSpy.getCall(0).args[1]).to.deep.equal({
      title: 'clearArea',
      type: 'DIALOG',
      icon: {
        icon: 'question',
      },
      message: {
        translationLabel: 'deleteBetAreaWarningModalMessage',
      },
    });
  });

  describe('when rendering the statistics section', () => {
    it('should render the statistics title', () => {
      $tStub.withArgs('eurojackpot.statistics.title').returns('statistics');
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store, mocks });
      const statisticsTitle = wrapper.find('.eurojackpot-play-area__statistics-title');

      expect(statisticsTitle.exists()).to.true;
      expect(statisticsTitle.text()).to.equal('statistics');
    });

    it('should render the TristateSwitch component', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const tristateSwitch = wrapper.findComponent({ name: stubs.TristateSwitch.name });

      expect(tristateSwitch.exists()).to.true;
    });

    it('should pass the statistics options to the TristateSwitch component', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const tristateSwitch = wrapper.findComponent({ name: stubs.TristateSwitch.name });

      expect(tristateSwitch.props('options')).to.deep.equal(['OCCURRENCES', 'NONE', 'DELAYS']);
    });

    it('should pass the occurrences label to the TristateSwitch component', () => {
      $tStub.withArgs('eurojackpot.statistics.occurrences').returns('occurrences');
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store, mocks });
      const tristateSwitch = wrapper.findComponent({ name: stubs.TristateSwitch.name });

      expect(tristateSwitch.props('leftLabel')).to.equal('occurrences');
    });

    it('should pass the delays label to the TristateSwitch component', () => {
      $tStub.withArgs('eurojackpot.statistics.delays').returns('delays');
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store, mocks });
      const tristateSwitch = wrapper.findComponent({ name: stubs.TristateSwitch.name });

      expect(tristateSwitch.props('rightLabel')).to.equal('delays');
    });

    it('should pass the statistics selection to the TristateSwitch component', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const tristateSwitch = wrapper.findComponent({ name: stubs.TristateSwitch.name });

      expect(tristateSwitch.props('value')).to.equal('OCCURRENCES');
    });

    it('should set the statistics selection when the TristateSwitch component emits the input event', () => {
      const wrapper = shallowMount(EurojackpotPlayArea, { stubs, localVue, store });
      const tristateSwitch = wrapper.findComponent({ name: stubs.TristateSwitch.name });
      tristateSwitch.vm.$emit('input', 'NONE');

      expect(statisticsSelectionSpy.calledOnce).to.true;
      expect(statisticsSelectionSpy.getCall(0).args[1]).to.deep.equal({ selection: 'NONE' });
    });
  });
});
