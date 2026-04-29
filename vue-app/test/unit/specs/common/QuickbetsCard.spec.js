import { createLocalVue, shallowMount } from '@vue/test-utils';
import QuickbetsCard from '@/components/common/Quickbets/QuickbetsCard.vue';
import Vuex from 'vuex';
import sinon from 'sinon';
import Vue from 'vue';
import moduleTypes from '@/store/modules/types';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';
import powerspinModuleTypes from '@/store/modules/PowerspinBetslipStoreModule/types';
import Constants from '@/util/Constants';
import betslipUtils from '@/util/betslipUtils';

describe('QuickbetsCard.vue', () => {
  let localVue;
  let store;
  let sandbox;
  let mocks;
  let betslip;
  let powerspinBetslip;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    localVue.use(Vuex);
    Vue.prototype.$eventHub = new Vue();
    mocks = {
      $t: sandbox.stub().callsFake((key) => key),
    };

    betslip = {
      bet_areas: [
        {
          pickedNumbers: [1, 2, 3],
          kinoBonusActive: true,
          value: 5,
          modifier: 'mod1',
        },
        {
          pickedNumbers: [4, 5],
          kinoBonusActive: false,
          value: 3,
          modifier: 'mod2',
        },
      ],
    };

    powerspinBetslip = {
      wager: {
        wheels: [
          {
            categories: {
              number: {
                boards: [{ modifier: 'ps-mod1' }],
              },
              symbol: {
                boards: [],
              },
            },
          },
        ],
      },
    };

    sandbox.stub(betslipUtils, 'isWheelCategoryEmpty').callsFake((category) => {
      return !category || !category.boards || category.boards.length === 0;
    });

    store = new Vuex.Store({
      modules: {
        [moduleTypes.KINO_GAME_STORE_MODULE]: {
          namespaced: true,
          state: {
            [kinoGameModuleTypes.state.BETSLIP]: betslip,
          },
        },
        [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: {
          namespaced: true,
          getters: {
            [powerspinModuleTypes.getters.GET_ACTIVE_BETSLIP]: () => powerspinBetslip,
          },
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders correct number of kino cards', () => {
    const wrapper = shallowMount(QuickbetsCard, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });
    expect(wrapper.findAll('.quickbets-cards__card').length).to.equal(2);
  });

  it('does not render bonus image if kinoBonusActive is false', () => {
    const wrapper = shallowMount(QuickbetsCard, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });
    const bonus = wrapper.findAll('.quickbets-cards__card').at(1).find('.quickbets-card__card-bonus');
    expect(bonus.exists()).to.be.false;
  });

  it('applies correct theme and modifier class (KINO)', () => {
    const wrapper = shallowMount(QuickbetsCard, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.KINO },
    });
    const card = wrapper.find('.quickbets-cards__card');
    expect(card.classes()).to.include('quickbets-cards--kino');
    expect(card.classes()).to.include('mod1');
  });

  it('renders correct number of powerspin cards from non-empty categories', () => {
    const wrapper = shallowMount(QuickbetsCard, {
      localVue,
      store,
      mocks,
      propsData: { theme: Constants.THEMES.POWERSPIN },
    });
    const cards = wrapper.findAll('.quickbets-cards__card');
    expect(cards.length).to.equal(1);
    expect(cards.at(0).classes()).to.include('quickbets-cards--powerspin');
  });
});
