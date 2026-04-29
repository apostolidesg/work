import { shallowMount, createLocalVue } from '@vue/test-utils';
import OddEvenSideBet from '../../../src/components/lobby/games/kino/sidescreen/OddEven';
import Vue from 'vue';
import Vuex from 'vuex';
import Betslip from '../../../src/model/Betslip';
import OddEven from '../../../src/model/OddEven';
import sinon from 'sinon';

describe('OddEven.vue', () => {
  Vue.prototype.$eventHub = new Vue(); // Global event bus

  let localVue;
  let store;
  let sandbox;
  let wrapper;

  let setOddEvenGameStub;
  let resetOddEvenGameStub;

  beforeEach(() => {
    localVue = createLocalVue();
    sandbox = sinon.createSandbox();
    localVue.use(Vuex);

    setOddEvenGameStub = sandbox.stub();
    resetOddEvenGameStub = sandbox.stub();

    store = new Vuex.Store({
      modules: {
        KINO_GAME_STORE_MODULE: {
          namespaced: true,
          actions: {
            SET_ODD_EVEN: setOddEvenGameStub,
            RESET_ODD_EVEN: resetOddEvenGameStub,
          },
        },
      },
    });
  });

  afterEach(() => {
    sandbox.restore();
    wrapper.destroy();
  });

  it('should render the correct markup upon creation', () => {
    wrapper = shallowMount(OddEvenSideBet, {
      propsData: {
        betslip: new Betslip(),
      },
      localVue,
      store,
    });
    expect(wrapper.find('#mona_ziga_modal').exists()).true;
  });

  it('should clear betslip when the corresponding button is clicked', () => {
    wrapper = shallowMount(OddEvenSideBet, {
      propsData: {
        betslip: new Betslip(),
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
    const oddEvenGame = new OddEven();
    oddEvenGame.oddEven = 'odd';
    wrapper.setData({
      oddEvenGame,
    });
    wrapper.findComponent({ name: 'BaseClearButton' }).vm.$emit('click');
    expect(resetOddEvenGameStub.called).true;
  });

  it('should add odd/even game to betslip when the corresponding button is clicked, there is a valid selection, and button is enabled', () => {
    wrapper = shallowMount(OddEvenSideBet, {
      propsData: {
        betslip: new Betslip(),
      },
      computed: {
        addButtonDisabled: () => false,
        clearButtonDisabled: () => false,
      },
    });

    const oddEvenGame = new OddEven();
    oddEvenGame.oddEven = 'odd';
    oddEvenGame.oddEvenAmount.push(1);
    oddEvenGame.calculateValue();

    wrapper.setData({
      oddEvenGame,
    });

    wrapper.find('#odd-even-add-to-betslip-button').trigger('click');
    expect(wrapper.emitted().close.length).to.eql(1);
  });

  it("should not emit a 'close' event when the corresponding button is clicked and game type has not been selected", () => {
    wrapper = shallowMount(OddEvenSideBet, {
      propsData: {
        betslip: new Betslip(),
      },
    });

    const oddEvenGame = new OddEven();
    oddEvenGame.oddEvenAmount.push(1);
    oddEvenGame.calculateValue();

    wrapper.setData({
      oddEvenGame,
    });
    wrapper.find('#odd-even-add-to-betslip-button').trigger('click');
    expect(wrapper.emitted()).not.to.have.property('close');
  });

  it('should add odd/even game to betslip when the corresponding button is clicked and amount has not been selected', () => {
    wrapper = shallowMount(OddEvenSideBet, {
      propsData: {
        betslip: new Betslip(),
      },
    });

    const oddEvenGame = new OddEven();
    oddEvenGame.oddEven = 'odd';
    oddEvenGame.calculateValue();

    wrapper.setData({
      oddEvenGame,
    });
    wrapper.find('#odd-even-add-to-betslip-button').trigger('click');
    expect(wrapper.emitted()).not.to.have.property('close');
  });

  it('should close modal on button click', () => {
    wrapper = shallowMount(OddEvenSideBet, {
      propsData: {
        betslip: new Betslip(),
      },
    });
    wrapper.find('#odd-even-close-button').trigger('click');
    expect(wrapper.emitted().close.length).to.eql(1);
  });

  it('should automatically select 1st amount option when no amount and odd/even selected', () => {
    wrapper = shallowMount(OddEvenSideBet, {
      propsData: {
        betslip: new Betslip(),
      },
    });
    wrapper.find('#odd_even_sidebet_01').trigger('click');
    expect(wrapper.vm.oddEvenGame.oddEvenAmount).to.eql([1]);
  });
});
