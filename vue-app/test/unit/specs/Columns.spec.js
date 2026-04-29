import { shallowMount, createLocalVue } from '@vue/test-utils';
import ColumnsSideBet from '../../../src/components/lobby/games/kino/sidescreen/Columns';
import Vue from 'vue';
import Vuex from 'vuex';
import sinon from 'sinon';

describe('Columns.vue', () => {
  Vue.prototype.$eventHub = new Vue(); // Global event bus

  let wrapper;
  let sandbox;
  let store;
  let localVue;

  let resetColumnsSpy;
  let setColumnsSpy;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    localVue = createLocalVue();
    localVue.use(Vuex);

    resetColumnsSpy = sandbox.spy();
    setColumnsSpy = sandbox.spy();

    store = new Vuex.Store({
      modules: {
        KINO_GAME_STORE_MODULE: {
          namespaced: true,
          actions: {
            RESET_COLUMNS: resetColumnsSpy,
            SET_COLUMNS: setColumnsSpy,
          },
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
    wrapper.vm.$destroy();
  });

  it('should render the correct markup upon creation', () => {
    wrapper = shallowMount(ColumnsSideBet, {
      propsData: {
        betslip: { columnsGame: { columns: [], columnsAmount: [] } },
      },
      localVue,
      store,
    });
    expect(wrapper.contains('#stiles_modal')).to.be.true;
  });

  it('should clear betslip when the corresponding button is clicked', () => {
    wrapper = shallowMount(ColumnsSideBet, {
      propsData: {
        betslip: { columnsGame: { columns: [1], columnsAmount: [1] } },
      },
      stubs: {
        BaseClearButton: {
          name: 'BaseClearButton',
          template: '<button></button>',
        },
      },
      localVue,
      store,
    });
    wrapper.findComponent({ name: 'BaseClearButton' }).vm.$emit('click');
    expect(resetColumnsSpy.called).to.be.true;
  });

  it('should add columns game to betslip when the corresponding button is clicked and there is a selection', () => {
    wrapper = shallowMount(ColumnsSideBet, {
      propsData: {
        betslip: { columnsGame: { columns: [1], columnsAmount: [2] } },
      },
      localVue,
      store,
    });

    wrapper.find('#columns-add-to-betslip-button').trigger('click');
    expect(setColumnsSpy.called).to.be.true;
    expect(wrapper.emitted().close.length).to.eql(1);
  });

  it("should not emit a 'close' event when the columns have not been selected", () => {
    wrapper = shallowMount(ColumnsSideBet, {
      propsData: {
        betslip: { columnsGame: { columns: [], columnsAmount: [2] } },
      },
    });

    wrapper.find('#columns-add-to-betslip-button').trigger('click');
    expect(wrapper.emitted()).not.to.have.property('close');
  });

  it("should not emit a 'close' event when amount has not been selected", () => {
    wrapper = shallowMount(ColumnsSideBet, {
      propsData: {
        betslip: { columnsGame: { columns: [1], columnsAmount: [] } },
      },
    });

    wrapper.find('#columns-add-to-betslip-button').trigger('click');
    expect(wrapper.emitted()).not.to.have.property('close');
  });

  it('should have "Add" button disabled  when the columns amount has not been selected', () => {
    wrapper = shallowMount(ColumnsSideBet, {
      propsData: {
        betslip: { columnsGame: { columns: [2], columnsAmount: [] } },
      },
    });

    expect(wrapper.find('#columns-add-to-betslip-button').classes()).to.contain('disabledColumnsBtn');
  });

  it('should close modal on button click', () => {
    wrapper = shallowMount(ColumnsSideBet, {
      propsData: {
        betslip: { columnsGame: { columns: [], columnsAmount: [] } },
      },
    });
    wrapper.find('#columns-close-button').trigger('click');
    expect(wrapper.emitted().close.length).to.eql(1);
  });

  it('should automatically select 1st amount option when no amount and at least 1 column selected', () => {
    wrapper = shallowMount(ColumnsSideBet, {
      propsData: {
        betslip: { columnsGame: { columns: [], columnsAmount: [] } },
      },
    });

    wrapper.find('#columns_sidebet_11').trigger('click');
    expect(wrapper.vm.columnsGame.columnsAmount).to.eql([1]);
  });
});
