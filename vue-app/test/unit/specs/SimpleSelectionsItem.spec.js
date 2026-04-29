import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import moduleTypes from '../../../src/store/modules/types';
import types from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import SimpleSelectionsItem from '../../../src/components/lobby/games/Powerspin/SideScreen/SimpleSelectionsItem';

const localVue = createLocalVue();
localVue.use(Vuex);

describe.skip('SimpleSelectionsItem Component', () => {
  let stubs;
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    stubs = {
      SimpleSelectionsItem: {
        name: 'SimpleSelectionsItem',
        props: ['category'],
        template: '<div><slot></slot></div>',
      },
    };
    wrapper = shallowMount(SimpleSelectionsItem, {
      propsData: {
        category: {
          boards: [
            {
              betType: 1,
              panels: [
                {
                  requested: [],
                  selection: ['6', '5', '3'],
                },
              ],
            },
          ],
          type: 'NUMBER',
        },
      },
      stubs,
      store,
      localVue,
    });

    getters = {
      [types.getters.GET_CATEGORY_COST]: () => 1500,
    };

    store = new Vuex.Store({
      modules: {
        [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: {
          namespaced: true,
          getters,
        },
      },
    });
  });

  describe('in Simple Selections Component', () => {
    it('should contain Component wrapper class', () => {
      expect(wrapper.contains('.simple-selection-item')).to.be.true;
    });
    it('should contain amount class', () => {
      expect(wrapper.contains('.simple-selection-item__amount')).to.be.true;
    });
    it('should contain category text', () => {
      expect(wrapper.contains('.simple-selection-item__betslip-text')).to.be.true;
    });
    it('should contain class for numbers', () => {
      expect(wrapper.contains('.simple-selection-item__simple-number-board')).to.be.true;
    });
  });
});
