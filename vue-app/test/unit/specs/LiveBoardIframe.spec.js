import { createLocalVue, shallowMount } from '@vue/test-utils';
import LiveBoardIframe from '../../../src/components/common/LiveDraw/LiveBoardIframe.vue';
import Vuex from 'vuex';
import moduleTypes from '../../../src/store/modules/types';
import types from '../../../src/store/modules/ConfigurationStoreModule/types';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('LiveBoardIframe.vue', () => {
  let propsData;
  let getters;
  let store;

  beforeEach(() => {
    propsData = {
      iframeType: 'powerspin',
    };

    getters = {
      [types.getters.GET_LIVE_DRAW_URLS]: () => ({
        powerspin: '"https://ds.vermantiagaming.com/web/uat/#/powerspin"',
        multispin: '"https://ds.vermantiagaming.com/web/uat/#/multispin"',
      }),
    };

    store = new Vuex.Store({
      modules: {
        [moduleTypes.CONFIGURATION_STORE_MODULE]: {
          namespaced: true,
          getters,
        },
      },
    });
  });
  it('should render the component', () => {
    const wrapper = shallowMount(LiveBoardIframe, { propsData, store });
    expect(wrapper.find('.live-board-iframe').exists()).to.be.true;
  });
  it('should render the iframe', () => {
    const wrapper = shallowMount(LiveBoardIframe, { propsData, store });
    expect(wrapper.find('.live-board-iframe__item').exists()).to.be.true;
  });
});
