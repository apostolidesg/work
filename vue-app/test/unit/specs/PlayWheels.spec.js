import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import types from '../../../src/store/modules/PowerspinBetslipStoreModule/types';
import moduleTypes from '../../../src/store/modules/types';
import PlayWheels from '../../../src/components/lobby/games/Powerspin/MainScreen/PlayWheels.vue';

describe('PlayWheels component', () => {
  let stubs;
  let localVue;
  let store;
  let getters;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    stubs = {
      SinglePlay: {
        name: 'SinglePlay',
        props: ['wheel-index', 'hasSeparator', 'separatorColor'],
        template: '<div class="single-play-stab"></div>',
      },
    };
    getters = {
      [types.getters.GET_WHEELS_LENGTH]: () => 3,
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

  it('renders SinglePlay component for each wheel', () => {
    const wrapper = shallowMount(PlayWheels, { stubs, store, localVue });

    expect(wrapper.findAllComponents({ name: stubs.SinglePlay.name })).to.have.lengthOf(3);
  });

  it('sets correct props for SinglePlay component', () => {
    const wrapper = shallowMount(PlayWheels, { stubs, store, localVue });

    const singlePlayWrappers = wrapper.findAllComponents({ name: stubs.SinglePlay.name });
    singlePlayWrappers.wrappers.forEach((singlePlayWrapper, index) => {
      expect(singlePlayWrapper.props('wheelIndex')).to.equal(index);
      expect(singlePlayWrapper.props('hasSeparator')).to.equal(index < 3 - 1);
      expect(singlePlayWrapper.props('separatorColor')).to.equal(index === 0 ? 'green' : 'red');
    });
  });
});
