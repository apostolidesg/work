import { createLocalVue, shallowMount } from '@vue/test-utils';
import KinoQuickbetsNumberSelection from '@/components/common/Quickbets/KinoQuickbetsNumberSelection.vue';
import Vuex from 'vuex';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import moduleTypes from '@/store/modules/types';
import kinoGameModuleTypes from '@/store/modules/KinoStoreModule/types';

chai.use(sinonChai);

describe('KinoQuickbetsNumberSelection.vue', () => {
  let wrapper;
  let store;
  let localVue;
  let sandbox;
  let setReadyBetslipsNumbersStub;
  
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    localVue = createLocalVue();
    localVue.use(Vuex);
    
    setReadyBetslipsNumbersStub = sandbox.stub();
    
    store = new Vuex.Store({
      modules: {
        [moduleTypes.KINO_GAME_STORE_MODULE]: {
          namespaced: true,
          state: {
            readyBetslipsNumbers: 3
          },
          getters: {
            [kinoGameModuleTypes.getters.GET_READY_BETSLIPS_NUMBERS]: () => 3
          },
          actions: {
            [kinoGameModuleTypes.actions.SET_READY_BETSLIPS_NUMBERS]: setReadyBetslipsNumbersStub
          }
        }
      }
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
    sandbox.restore();
  });

  const factory = (options = {}) => {
    return shallowMount(KinoQuickbetsNumberSelection, {
      localVue,
      store,
      stubs: {
        FontAwesomeIcon: true
      },
      ...options
    });
  };

  it('renders with the correct structure', () => {
    wrapper = factory();
    
    expect(wrapper.classes()).to.include('kino-quickbets-number-selection');
    expect(wrapper.find('.kino-quickbets-number-selection__selected-numbers').exists()).to.be.true;
  });

  it('displays the readyBetslipsNumbers from the store', () => {
    wrapper = factory();
    
    const selectedNumbers = wrapper.find('.kino-quickbets-number-selection__selected-numbers');
    expect(selectedNumbers.text()).to.equal('3');
  });
  
  it('toggles the numbers panel when clicked', async () => {
    wrapper = factory();
    
    expect(wrapper.vm.numbersPanel).to.be.false;
    expect(wrapper.find('.kino-quickbets-number-selection__draws').exists()).to.be.false;
    
    await wrapper.trigger('click');
    
    expect(wrapper.vm.numbersPanel).to.be.true;
    expect(wrapper.find('.kino-quickbets-number-selection__draws').exists()).to.be.true;
    
    await wrapper.trigger('click');
    
    expect(wrapper.vm.numbersPanel).to.be.false;
    expect(wrapper.find('.kino-quickbets-number-selection__draws').exists()).to.be.false;
  });
  
  it('sets a new ready betslips number when a number is clicked', async () => {
    wrapper = factory();
    
    await wrapper.trigger('click');
    
    const numberOptions = wrapper.findAll('.kino-quickbets-number-selection__draws-numbers');
    await numberOptions.at(0).trigger('click');
    
    expect(setReadyBetslipsNumbersStub).to.have.been.calledOnce;
    
    expect(wrapper.vm.numbersPanel).to.be.false;
  });
  
  it('highlights the currently selected number in the panel', async () => {
    const customStore = new Vuex.Store({
      modules: {
        [moduleTypes.KINO_GAME_STORE_MODULE]: {
          namespaced: true,
          getters: {
            [kinoGameModuleTypes.getters.GET_READY_BETSLIPS_NUMBERS]: () => 5
          },
          actions: {
            [kinoGameModuleTypes.actions.SET_READY_BETSLIPS_NUMBERS]: setReadyBetslipsNumbersStub
          }
        }
      }
    });
    
    wrapper = factory({ store: customStore });
    
    await wrapper.trigger('click');
    
    const numberOptions = wrapper.findAll('.kino-quickbets-number-selection__draws-numbers');
    
    expect(numberOptions.at(4).classes()).to.include('kino-quickbets-number-selection--active');
    
    expect(numberOptions.at(0).classes()).to.not.include('kino-quickbets-number-selection--active');
  });
  
  it('adds and removes document click event listener on mount/destroy', () => {
    const addEventListenerSpy = sandbox.spy(document, 'addEventListener');
    const removeEventListenerSpy = sandbox.spy(document, 'removeEventListener');
    
    wrapper = factory();
    
    expect(addEventListenerSpy).to.have.been.calledWith('click', wrapper.vm.handleOutsideClick);
    
    wrapper.destroy();
    
    expect(removeEventListenerSpy).to.have.been.calledWith('click', wrapper.vm.handleOutsideClick);
  });
});