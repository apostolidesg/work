import { createLocalVue, shallowMount } from '@vue/test-utils';
import SideScreen from '../../../src/components/lobby/games/Powerspin/SideScreen/SideScreen';
import Vuex from 'vuex';
import types from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import sinon from 'sinon';
import moduleTypes from '../../../src/store/modules/types';
import { expect } from 'chai';

describe('SideScreen', () => {
  let computed;
  let stubs;
  let localVue;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    actions = {
      [types.actions.ADD_BETSLIP]: () => sinon.stub(),
    };

    stubs = {
      BaseSidescreen: {
        name: 'BaseSidescreen',
        template:
          '<div class="sidescreen-panel-stub"><slot name="header" /> <slot></slot> <slot name="static" /></div>',
      },
      BaseButton: {
        name: 'BaseButton',
        props: ['disabled'],
        template: `<div class="base-button-stub" @click="$listeners['click']"><slot/></div>`,
      },
    };

    computed = {
      betslipArray: () => [],
      addBetslipIsVisible: () => true,
    };

    store = new Vuex.Store({
      modules: {
        [moduleTypes.POWERSPIN_GAME_STORE_MODULE]: {
          namespaced: true,
          actions,
        },
      },
    });

    wrapper = shallowMount(SideScreen, {
      stubs,
      computed,
      store,
      localVue,
    });
  });

  it('Should render BaseSidescreen ', () => {
    const sidescreenPanel = wrapper.findComponent({ name: stubs.BaseSidescreen.name });
    expect(sidescreenPanel.exists()).to.be.true;
  });
  it('Should render BaseButton ', () => {
    const sidescreenPanel = wrapper.findComponent({ name: stubs.BaseButton.name });
    expect(sidescreenPanel.exists()).to.be.true;
  });
  it('should call the addNewBetslip method when BaseButton is clicked', () => {
    const addNewBetslipSpy = sinon.spy(SideScreen.methods, 'addNewBetslip');
    wrapper = shallowMount(SideScreen, {
      stubs,
      computed,
      store,
      localVue,
    });
    const button = wrapper.findComponent({ name: stubs.BaseButton.name });
    button.trigger('click');
    expect(addNewBetslipSpy.called).to.be.true;
  });
  it('BaseButton should not be rendered when betslipArray length is >= 2', () => {
    computed = {
      betslipArray: () => [{}, {}],
      notEmptyBetslips: () => false,
      addBetslipIsVisible: () => false,
    };
    wrapper = shallowMount(SideScreen, {
      stubs,
      computed,
      store,
      localVue,
    });
    const button = wrapper.findComponent({ name: stubs.BaseButton.name });
    expect(button.exists()).to.be.false;
  });
});
