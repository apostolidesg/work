import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import VideoWrapper from '../../../../src/components/digitalAssistant/VideoWrapper.vue';
import moduleTypes from '../../../../src/store/modules/types';
import ConfigurationStoreModuleTypes from '../../../../src/store/modules/ConfigurationStoreModule/types';
import Constants from '../../../../src/util/Constants';
chai.use(sinonChai);

const $t = (k) => k;

const videoItems = [
  { video: 'V1', thumbnail: 't1.png', subTitle: 'sub1', text: 'txt1' },
  { video: 'V2', thumbnail: 't2.png', subTitle: 'sub2', text: 'txt2' },
];

const stubs = {
  AssetWrapper: { template: '<div data-stub="asset"></div>' },
  VideoControls: { template: '<div data-stub="controls"></div>', props: ['videoEl'] },
};

function makeVue() {
  const lv = createLocalVue();
  lv.use(Vuex);
  return lv;
}

function makeStore(localVue) {
  return new Vuex.Store({
    modules: {
      [moduleTypes.CONFIGURATION_STORE_MODULE]: {
        namespaced: true,
        getters: {
          [ConfigurationStoreModuleTypes.getters.GET_ASSET_URL]: () => (section, key) => `/${section}/${key}`,
        },
      },
    },
  });
}

function makeRouterSpy() {
  return { push: sinon.spy() };
}

describe('VideoWrapper.vue', () => {
  let localVue;
  let store;
  let routerSpy;

  const factory = (opts = {}) =>
    shallowMount(VideoWrapper, {
      localVue,
      store,
      stubs,
      propsData: { videoItems },
      mocks: {
        $t,
        $router: routerSpy,
        $route: { name: Constants.ROUTE_NAMES.KINO_VIDEOS },
        $root: { $i18n: { locale: () => 'en' } },
        // Mock the window width mixin
        $_windowWidthMixin_isPortrait: opts.isPortrait || false,
      },
      ...opts,
    });

  beforeEach(() => {
    localVue = makeVue();
    store = makeStore(localVue);
    routerSpy = makeRouterSpy();
  });

  it('renders exactly one thumbnail per video item', () => {
    const wrapper = factory();
    const thumbs = wrapper.findAll('.video-wrapper__thumb');
    expect(thumbs.length).to.equal(videoItems.length);
  });

  it('clicking a thumbnail activates that item', async () => {
    const wrapper = factory();
    const second = wrapper.findAll('.video-wrapper__thumb').at(1);
    await second.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.activeItem).to.deep.equal(videoItems[1]);
  });

  it('toggle button flips the isExpanded flag', async () => {
    const wrapper = factory();
    const btn = wrapper.find('.video-wrapper__toggle');
    expect(wrapper.vm.isExpanded).to.be.false;
    await btn.trigger('click');
    expect(wrapper.vm.isExpanded).to.be.true;
  });

  // NEW TEST: Test conditional button display based on portrait mode
  describe('conditional button display', () => {
    it('shows the play button when not in portrait mode', () => {
      const wrapper = factory({ isPortrait: false });
      const playButton = wrapper.find('button[class*="play"]');
      expect(playButton.exists()).to.be.true;
    });

    it('hides the play button when in portrait mode', () => {
      const wrapper = factory({ isPortrait: true });
      const playButton = wrapper.find('button[class*="play"]');
      expect(playButton.exists()).to.be.false;
    });
  });
});
