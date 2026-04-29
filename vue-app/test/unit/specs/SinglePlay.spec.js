import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import moduleTypes from '../../../src/store/modules/types';
import types from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import CONSTANTS from '../../../src/util/powerspinConstants';
import SinglePlay from '../../../src/components/lobby/games/Powerspin/MainScreen/SinglePlay';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Single Play Component', () => {
  let stubs;
  let mocks;
  let getters;
  let actions;
  let store;

  const activeBetslipStub = sinon.stub();
  const activeWheelStub = sinon.stub();
  const activeWheelGetterStub = sinon.stub();
  const wheelsLengthStub = sinon.stub();
  const translationMock = sinon.stub();
  const toggleGameTypeSpy = sinon.spy();
  const updateMultipliersSpy = sinon.spy();
  const setRequestedNumberSpy = sinon.spy();
  const setColumnNumberSpy = sinon.spy();
  const addQuickPickSpy = sinon.spy();

  const activeWheel = {
    isEmpty: () => true,
    getSymbolBoard: () => ({
      betType: null,
    }),
    getNumberBoard: () => ({
      panels: [{}],
      multipliers: [],
    }),
    getColorBoards: () => [],
    getOverUnderBoards: () => [],
    categories: {
      [CONSTANTS.GAME_CATEGORY.COLOR]: { multipliers: [] },
      [CONSTANTS.GAME_CATEGORY.OVER_UNDER]: { multipliers: [] },
    },
  };

  beforeEach(() => {
    stubs = {
      WheelCategoryLayout: {
        name: 'WheelCategoryLayout',
        props: [
          'title',
          'multipliers',
          'selected-multipliers',
          'betslip',
          'show-betting-amount',
          'text-theme',
          'theme',
        ],
        template: '<div><slot></slot></div>',
      },
      NumberSelection: {
        name: 'NumberSelection',
        props: ['text-theme', 'is-streched', 'id-suffix', 'number-board-panel'],
        template: '<span></span>',
      },
      ColorSelection: {
        name: 'ColorSelection',
        props: ['text-theme', 'colors-selected'],
        template: '<span></span>',
      },
      PowerspinSymbol: {
        name: 'PowerspinSymbol',
        props: ['value'],
        template: '<span></span>',
      },
      UnderOverSelection: {
        name: 'UnderOverSelection',
        props: ['text-theme', 'selected-values'],
        template: '<span></span>',
      },
    };

    mocks = {
      $t: translationMock.returns(''),
    };

    getters = {
      [types.getters.GET_ACTIVE_BETSLIP]: activeBetslipStub.returns({ wager: { wheels: [{}] } }),
      [types.getters.GET_WHEEL]: activeWheelStub.returns(activeWheelGetterStub.returns(activeWheel)),
      [types.getters.GET_WHEELS_LENGTH]: wheelsLengthStub.returns(1),
    };

    actions = {
      [types.actions.TOGGLE_GAME_TYPE]: toggleGameTypeSpy,
      [types.actions.TOGGLE_MULTIPLIERS]: updateMultipliersSpy,
      [types.actions.SET_REQUESTED_NUMBER]: setRequestedNumberSpy,
      [types.actions.SET_COLUMN_NUMBER]: setColumnNumberSpy,
      [types.actions.QUICK_PICK_CLICKED]: addQuickPickSpy,
    };

    store = new Vuex.Store({
      modules: {
        [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: {
          namespaced: true,
          getters,
          actions,
        },
      },
    });
  });

  afterEach(() => {
    activeBetslipStub.resetBehavior();
    activeWheelStub.resetBehavior();
    activeWheelGetterStub.resetBehavior();
    wheelsLengthStub.resetBehavior();
    translationMock.resetHistory();
    toggleGameTypeSpy.resetHistory();
    updateMultipliersSpy.resetHistory();
    setRequestedNumberSpy.resetHistory();
    setColumnNumberSpy.resetHistory();
    addQuickPickSpy.resetHistory();
  });

  it('should render 4 category layouts', () => {
    const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

    const categories = wrapper.findAllComponents({ name: 'WheelCategoryLayout' });

    expect(categories.length).to.eq(4);
  });

  it('should set white background when the wheel is empty', () => {
    const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

    const classes = wrapper.classes();

    expect(classes).not.to.contain('single-play--active');
  });

  it('should set dark background when the wheel is not empty', () => {
    activeWheelStub.returns(activeWheelGetterStub.returns({ ...activeWheel, isEmpty: () => false }));
    const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

    const classes = wrapper.classes();

    expect(classes).to.contain('single-play--active');
  });

  it('should call the activeWheel getter with the given wheel inder', () => {
    shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

    expect(activeWheelGetterStub.getCall(0).args[0]).to.eql({ wheelIndex: 0 });
  });

  it('should call the translation fn to get the category titles', () => {
    shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

    expect(translationMock.callCount).to.eq(4);

    expect(translationMock.getCall(0).args[0]).to.eq('powerspinGameCategories.number');
    expect(translationMock.getCall(1).args[0]).to.eq('powerspinGameCategories.symbol');
    expect(translationMock.getCall(2).args[0]).to.eq('powerspinGameCategories.zone');
    expect(translationMock.getCall(3).args[0]).to.eq('powerspinGameCategories.underOver');
  });

  it('should show the betting amount if the there is only one wheel to the board', () => {
    const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });
    const layouts = wrapper.findAllComponents({ name: stubs.WheelCategoryLayout.name });

    for (let i = 0; i < layouts.length; i++) {
      const layout = layouts.at(i);

      expect(layout.vm.$props.showBettingAmount).be.true;
    }
  });

  it('should NOT show the betting amount if the there is more than one wheels to the board', () => {
    wheelsLengthStub.returns(3);
    const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });
    const layouts = wrapper.findAllComponents({ name: stubs.WheelCategoryLayout.name });

    for (let i = 0; i < layouts.length; i++) {
      const layout = layouts.at(i);

      expect(layout.vm.$props.showBettingAmount).be.false;
    }
  });

  it('should render three dividers', () => {
    const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

    const dividers = wrapper.findAll('.single-play__divider');

    expect(dividers.length).to.eq(3);
  });

  it('should render three dividers with active color when the wheel is not empty', () => {
    activeWheelStub.returns(activeWheelGetterStub.returns({ ...activeWheel, isEmpty: () => false }));
    const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

    const dividers = wrapper.findAll('.single-play__divider--active');

    expect(dividers.length).to.eq(3);
  });

  describe('when updating multipliers', () => {
    it('should emit an update multiplier action when the user updates the number betting amount', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const numberLayout = wrapper.findAllComponents({ name: stubs.WheelCategoryLayout.name }).at(0);

      numberLayout.vm.$emit('update-multipliers', 2);

      expect(updateMultipliersSpy.getCall(0).args[1]).to.eql({
        gameCategory: CONSTANTS.GAME_CATEGORY.NUMBER,
        multipliers: 2,
        wheelIndex: 0,
      });
    });

    it('should emit an update multiplier action when the user updates the symbol betting amount', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const symbolLayout = wrapper.findAllComponents({ name: stubs.WheelCategoryLayout.name }).at(1);

      symbolLayout.vm.$emit('update-multipliers', 2);

      expect(updateMultipliersSpy.getCall(0).args[1]).to.eql({
        gameCategory: CONSTANTS.GAME_CATEGORY.SYMBOL,
        multipliers: 2,
        wheelIndex: 0,
      });
    });

    it('should emit an update multiplier action when the user updates the color betting amount', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const symbolLayout = wrapper.findAllComponents({ name: stubs.WheelCategoryLayout.name }).at(2);

      symbolLayout.vm.$emit('update-multipliers', 2);

      expect(updateMultipliersSpy.getCall(0).args[1]).to.eql({
        gameCategory: CONSTANTS.GAME_CATEGORY.COLOR,
        multipliers: 2,
        wheelIndex: 0,
      });
    });

    it('should emit an update multiplier action when the user updates the under/over betting amount', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const symbolLayout = wrapper.findAllComponents({ name: stubs.WheelCategoryLayout.name }).at(3);

      symbolLayout.vm.$emit('update-multipliers', 2);

      expect(updateMultipliersSpy.getCall(0).args[1]).to.eql({
        gameCategory: CONSTANTS.GAME_CATEGORY.OVER_UNDER,
        multipliers: 2,
        wheelIndex: 0,
      });
    });
  });

  describe('on number selection', () => {
    it('should render with black text theme if the relevant wheel is empty', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });

      expect(numberSelection.vm.$props.textTheme).to.eql('black');
    });

    it('should render with white text theme if the relevant wheel is NOT empty', () => {
      activeWheelStub.returns(
        activeWheelGetterStub.returns({
          ...activeWheel,
          isEmpty: () => false,
        })
      );
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });

      expect(numberSelection.vm.$props.textTheme).to.eql('white');
    });

    it('should render in stretched mode if there are two or less wheels on the betslip', () => {
      wheelsLengthStub.returns(2);
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });

      expect(numberSelection.vm.$props.isStreched).to.be.true;
    });

    it('should render in NON stretched mode if there are three wheels on the betslip', () => {
      wheelsLengthStub.returns(3);
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });

      expect(numberSelection.vm.$props.isStreched).to.be.false;
    });

    it('should pass the number panel of the wheel to the NumberSelection component', () => {
      const panel = [{ requested: [1], selection: [1] }];
      activeWheelStub.returns(
        activeWheelGetterStub.returns({
          ...activeWheel,
          getNumberBoard: () => ({
            panels: [panel],
            multipliers: [],
          }),
          isEmpty: () => false,
        })
      );
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });
      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });

      expect(numberSelection.vm.$props.numberBoardPanel).to.eq(panel);
    });

    it('should call the relevant store action if the NumberSelection emits a requested-number-click event', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });
      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });
      numberSelection.vm.$emit('requested-number-click', 1);

      expect(setRequestedNumberSpy.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        number: 1,
      });
    });

    it('should call the relevant store action if the NumberSelection emits a column-number-click event', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });
      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });
      numberSelection.vm.$emit('column-number-click', 1);

      expect(setColumnNumberSpy.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        number: 1,
      });
    });

    it('should call the relevant store action if the NumberSelection emits a random-pick-click event', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });
      const numberSelection = wrapper.findComponent({ name: stubs.NumberSelection.name });
      numberSelection.vm.$emit('random-pick-click');

      expect(addQuickPickSpy.getCall(0).args[1]).to.eql({ wheelIndex: 0 });
    });
  });

  describe('on symbol selection', () => {
    it('should present the symbol as unselected when the bet type is null', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const symbol = wrapper.findComponent({ name: stubs.PowerspinSymbol.name });

      expect(symbol.vm.$props.value).to.be.false;
    });

    it('should present the symbol as selected when the bet type is set', () => {
      activeWheelStub.returns(
        activeWheelGetterStub.returns({
          ...activeWheel,
          getSymbolBoard: () => ({ betType: CONSTANTS.ILOT_GAMETYPES.PLAY_SYMBOL }),
        })
      );
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const symbol = wrapper.findComponent({ name: stubs.PowerspinSymbol.name });

      expect(symbol.vm.$props.value).to.be.true;
    });

    it('should call emit a toggle symbol action when clicked', async () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const symbol = wrapper.findComponent({ name: stubs.PowerspinSymbol.name });

      await symbol.vm.$emit('input');

      expect(toggleGameTypeSpy.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_SYMBOL,
      });
    });
  });

  describe('on color selection', () => {
    it('should render with black text theme if the relevant wheel is empty', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const colorSelection = wrapper.findComponent({ name: stubs.ColorSelection.name });

      expect(colorSelection.vm.$props.textTheme).to.eql('black');
    });

    it('should render with white text theme if the relevant wheel is NOT empty', () => {
      activeWheelStub.returns(
        activeWheelGetterStub.returns({
          ...activeWheel,
          isEmpty: () => false,
        })
      );
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const colorSelection = wrapper.findComponent({ name: stubs.ColorSelection.name });

      expect(colorSelection.vm.$props.textTheme).to.eql('white');
    });

    it('should present the colors as unselected if there is not relevant board', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const colorSelection = wrapper.findComponent({ name: stubs.ColorSelection.name });

      expect(colorSelection.vm.$props.colorsSelected).to.eql([]);
    });

    it('should present the colors as selected if there are the relevant boards', () => {
      activeWheelStub.returns(
        activeWheelGetterStub.returns({
          ...activeWheel,
          getColorBoards: () => [
            { betType: CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_RED },
            { betType: CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_BLUE },
            { betType: CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_GREEN },
          ],
        })
      );

      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const colorSelection = wrapper.findComponent({ name: stubs.ColorSelection.name });

      expect(colorSelection.vm.$props.colorsSelected).to.eql(['red', 'blue', 'green']);
    });

    it('should emit the toggle color action when the red button is clicked', async () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const colorSelection = wrapper.findComponent({ name: stubs.ColorSelection.name });

      await colorSelection.vm.$emit('color-clicked', 'red');

      expect(toggleGameTypeSpy.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_RED,
      });
    });

    it('should emit the toggle color action when the blue button is clicked', async () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const colorSelection = wrapper.findComponent({ name: stubs.ColorSelection.name });

      await colorSelection.vm.$emit('color-clicked', 'blue');

      expect(toggleGameTypeSpy.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_BLUE,
      });
    });

    it('should emit the toggle color action when the green button is clicked', async () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const colorSelection = wrapper.findComponent({ name: stubs.ColorSelection.name });

      await colorSelection.vm.$emit('color-clicked', 'green');

      expect(toggleGameTypeSpy.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
      });
    });
  });

  describe('on under/over selection', () => {
    it('should render with black text theme if the relevant wheel is empty', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const underOverSelection = wrapper.findComponent({ name: stubs.UnderOverSelection.name });

      expect(underOverSelection.vm.$props.textTheme).to.eql('black');
    });

    it('should render with white text theme if the relevant wheel is NOT empty', () => {
      activeWheelStub.returns(
        activeWheelGetterStub.returns({
          ...activeWheel,
          isEmpty: () => false,
        })
      );
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const underOverSelection = wrapper.findComponent({ name: stubs.UnderOverSelection.name });

      expect(underOverSelection.vm.$props.textTheme).to.eql('white');
    });

    it('should present the under over btns as unselected when there are no relevant boards', () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const underOverSelection = wrapper.findComponent({ name: stubs.UnderOverSelection.name });

      expect(underOverSelection.vm.$props.selectedValues).to.eql([]);
    });

    it('should present the under over btns as selected when there are relevant boards', () => {
      activeWheelStub.returns(
        activeWheelGetterStub.returns({
          ...activeWheel,
          getOverUnderBoards: () => [
            { betType: CONSTANTS.ILOT_GAMETYPES.PLAY_UNDER },
            { betType: CONSTANTS.ILOT_GAMETYPES.PLAY_OVER },
          ],
        })
      );

      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const underOverSelection = wrapper.findComponent({ name: stubs.UnderOverSelection.name });

      expect(underOverSelection.vm.$props.selectedValues).to.eql(['u', 'o']);
    });

    it('should emit the toggle under/over action when the over button is clicked', async () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const underOverSelection = wrapper.findComponent({ name: stubs.UnderOverSelection.name });

      await underOverSelection.vm.$emit('option-selected', 'o');

      expect(toggleGameTypeSpy.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_OVER,
      });
    });

    it('should emit the toggle under/over action when the under button is clicked', async () => {
      const wrapper = shallowMount(SinglePlay, { propsData: { wheelIndex: 0 }, stubs, store, mocks, localVue });

      const underOverSelection = wrapper.findComponent({ name: stubs.UnderOverSelection.name });

      await underOverSelection.vm.$emit('option-selected', 'u');

      expect(toggleGameTypeSpy.getCall(0).args[1]).to.eql({
        wheelIndex: 0,
        gameType: CONSTANTS.ILOT_GAMETYPES.PLAY_UNDER,
      });
    });
  });
});
