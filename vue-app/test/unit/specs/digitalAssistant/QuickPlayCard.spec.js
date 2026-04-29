import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import QuickPlayCard from '@/components/digitalAssistant/QuickPlayCard.vue';
import Constants from '@/util/Constants';
import PowerspinConstants from '@/util/powerspinConstants';
import gtag from '@/util/gtag';
import gtmEvents from '@/constants/gtmEvents';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('QuickPlayCard.vue', () => {
  let wrapper;
  let store;
  let kinoActions;
  let sessionActions;
  let powerspinActions;
  let sandbox;
  let router;

  router = new VueRouter();

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(gtag, 'sendEvent').returns();

    kinoActions = {
      SET_BETSLIP: sandbox.stub(),
    };

    sessionActions = {
      SET_GAME_TYPE: sandbox.stub(),
    };

    powerspinActions = {
      SET_BETSLIP: sandbox.stub(),
    };

    store = new Vuex.Store({
      modules: {
        KINO_GAME_STORE_MODULE: {
          namespaced: true,
          actions: kinoActions,
        },
        POWERSPIN_GAME_STORE_MODULE: {
          namespaced: true,
          actions: powerspinActions,
        },
        SESSION_STORE_MODULE: {
          namespaced: true,
          actions: sessionActions,
        },
      },
    });
  });

  afterEach(() => {
    if (wrapper) wrapper.destroy();
    sandbox.restore();
  });

  it('renders with the correct theme class', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.KINO,
        betslipData: { columns: 1, numbers: 3, modifier: 'test-modifier' },
        title: 'Test Title',
      },
      router,
    });

    expect(wrapper.classes()).to.include('quick-play-card--kino');
    expect(wrapper.classes()).to.include('test-modifier');
  });

  it('calculates and displays the correct price', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.KINO,
        betslipData: { columns: 1, numbers: 3 },
        title: 'Test Title',
      },
      mocks: {
        $t: (key) => key,
      },
    });

    const price = wrapper.find('.quick-play-card__price');
    expect(price.text()).to.include('€');
  });

  it('renders the card info for KINO theme', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.KINO,
        betslipData: { columns: 2, numbers: 5 },
        title: 'Test Title',
      },
      mocks: {
        $t: (key, params) => key + JSON.stringify(params || {}),
      },
    });

    expect(wrapper.vm.cardInfo).to.include('columnsWithNumbers');
  });

  it('renders the card info for POWERSPIN theme', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.POWERSPIN,
        betslipData: { numbers: 3, symbol: true, consecutiveDraws: 2 },
        title: 'Test Title',
      },
      mocks: {
        $t: (key, params) => key + JSON.stringify(params || {}),
      },
    });

    expect(wrapper.vm.cardInfo).to.include('quickbets.randomNumbers');
    expect(wrapper.vm.cardInfo).to.include('quickbets.symbolInDraws');
    expect(wrapper.vm.cardInfo).to.include('quickbets.consecutiveDraws');
  });

  it('constructs proper KINO betslip with generated numbers', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.KINO,
        betslipData: { columns: 2, numbers: 6, hasBonus: true },
        title: 'Test Title',
      },
      mocks: {
        $t: (key, params) => key + JSON.stringify(params || {}),
      },
    });

    const betslip = wrapper.vm.getKinoBetslip({ columns: 2, numbers: 6, hasBonus: true });
    expect(betslip.bet_areas.length).to.be.at.least(2);
    expect(betslip.bet_areas[0].pickedNumbers.length).to.be.greaterThan(0);
    expect(betslip.bet_areas[0].kinoBonusActive).to.be.true;
  });

  it('constructs proper POWERSPIN betslip with correct game types', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.POWERSPIN,
        betslipData: {
          numbers: 3,
          symbol: true,
          over: true,
          color: true,
          consecutiveDraws: 2,
        },
        title: 'Test Title',
      },
      mocks: {
        $t: (key, params) => key + JSON.stringify(params || {}),
      },
    });

    const result = wrapper.vm.getPowerspinBetslip({
      numbers: 3,
      symbol: true,
      over: true,
      color: true,
      consecutiveDraws: 2,
    });

    expect(result.betslip.wager.participatingDraws.multipleDraws).to.equal(2);
    const categories = result.betslip.wager.wheels[0].categories;
    expect(Object.keys(categories).length).to.be.greaterThan(0);
  });

  it('correctly shows powerspin info with all bet types', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.POWERSPIN,
        betslipData: {
          numbers: 3,
          symbol: true,
          over: true,
          under: true,
          color: true,
          consecutiveDraws: 3,
        },
        title: 'Test Title',
      },
      mocks: {
        $t: (key, params) => key + JSON.stringify(params || {}),
      },
    });

    const info = wrapper.vm.powerSpinInfoTitle;
    expect(info).to.include('quickbets.randomNumbers');
    expect(info).to.include('quickbets.symbolInDraws');
    expect(info).to.include('quickbets.overInDraws');
    expect(info).to.include('quickbets.underInDraws');
    expect(info).to.include('quickbets.colorInDraws');
    expect(info).to.include('quickbets.consecutiveDraws');
  });

  it('returns 0 as fallback when POWERSPIN amount is undefined', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.POWERSPIN,
        betslipData: {},
      },
      mocks: {
        $t: (key) => key,
      },
    });

    expect(wrapper.vm.calculatePrice).to.equal(0);
  });

  it('returns a valid random color from defined set', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.POWERSPIN,
        betslipData: {},
      },
      mocks: {
        $t: (key) => key,
      },
    });

    const color = wrapper.vm.getRandomColor();
    expect([
      PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_RED,
      PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_BLUE,
      PowerspinConstants.ILOT_GAMETYPES.PLAY_COLOR_GREEN,
    ]).to.include(color);
  });

  it('generates a sorted array of unique numbers', () => {
    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.KINO,
        betslipData: { numbers: 5 },
      },
      mocks: {
        $t: (key) => key,
      },
    });

    const numbers = wrapper.vm.generateNumbers();
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(numbers).to.deep.equal(sorted);
    expect(new Set(numbers).size).to.equal(numbers.length);
  });

  it('calculatePrice reflects array multipliers in KINO betslip', () => {
    const betslipData = {
      columns: 1,
      numbers: 3,
      multiplier: [2, 3],
    };

    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.KINO,
        betslipData,
      },
      mocks: {
        $t: (key) => key,
      },
    });

    const price = wrapper.vm.calculatePrice;
    expect(price).to.be.a('number');
    expect(price).to.be.greaterThan(0);
    expect(price).to.equal(2.5);
  });

  it('calculatePrice reflects single multiplier in KINO betslip', () => {
    const betslipData = {
      columns: 1,
      numbers: 3,
      multiplier: 6,
    };

    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.KINO,
        betslipData,
      },
      mocks: {
        $t: (key) => key,
      },
    });

    const price = wrapper.vm.calculatePrice;
    expect(price).to.be.a('number');
    expect(price).to.be.greaterThan(0);
    expect(price).to.equal(3);
  });

  it('calculatePrice reflects array multipliers in POWERSPIN betslip', () => {
    const betslipData = {
      color: true,
      multiplier: [2, 5],
      consecutiveDraws: 1,
    };

    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.POWERSPIN,
        betslipData,
      },
      mocks: {
        $t: (key) => key,
      },
    });

    const price = wrapper.vm.calculatePrice;
    expect(price).to.be.a('number');
    expect(price).to.be.greaterThan(0);
    expect(price).to.equal(1);
  });

  it('calculatePrice reflects single multiplier in POWERSPIN betslip', () => {
    const betslipData = {
      color: true,
      multiplier: 3,
      consecutiveDraws: 1,
    };

    wrapper = shallowMount(QuickPlayCard, {
      localVue,
      store,
      propsData: {
        theme: Constants.THEMES.POWERSPIN,
        betslipData,
      },
      mocks: {
        $t: (key) => key,
      },
    });

    const price = wrapper.vm.calculatePrice;
    expect(price).to.be.a('number');
    expect(price).to.be.greaterThan(0);
    expect(price).to.equal(0.5);
  });
});
