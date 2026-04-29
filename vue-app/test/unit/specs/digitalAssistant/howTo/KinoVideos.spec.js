import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';

import KinoVideos from '../../../../../src/components/digitalAssistant/howTo/KinoVideos.vue';
import moduleTypes from '../../../../../src/store/modules/types';
import PropertiesTypes from '../../../../../src/store/modules/ConfigurationStoreModule/types';
import Constants from '../../../../../src/util/Constants';

chai.use(sinonChai);
const $t = (k) => k;

function buildStore(localVue) {
  return new Vuex.Store({
    modules: {
      [moduleTypes.PROPERTIES_LOADER_MODULE]: {
        namespaced: true,
        getters: {
          [PropertiesTypes.getters.GET_ASSET_URL]: () => (section, key) => `/${section}/${key}`,
        },
      },
    },
  });
}

const VideoWrapperStub = {
  name: 'VideoWrapper',
  props: ['videoItems', 'expanded'],
  template: '<div class="video-wrapper-stub" @click="$emit(\'update:expanded\', !expanded)"></div>',
};

const AssetWrapperStub = {
  name: 'AssetWrapper',
  props: ['type', 'assetKey', 'videoProps'],
  template: '<div class="asset-wrapper-stub"><video data-test="assetVideo"></video></div>',
};

const BannersStub = {
  name: 'Banners',
  props: ['game'],
  template: '<div class="banners-stub">Banners for {{ game }}</div>',
};

describe('KinoVideos.vue', () => {
  let localVue;
  let store;

  const factory = (opts = {}) =>
    mount(KinoVideos, {
      localVue,
      store,
      stubs: {
        VideoWrapper: VideoWrapperStub,
        AssetWrapper: AssetWrapperStub,
        Banners: BannersStub,
      },
      mocks: {
        $t,
        // Mock the window width mixin
        $_windowWidthMixin_isPortrait: opts.isPortrait || false,
      },
      attachToDocument: true,
      ...opts,
    });

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = buildStore(localVue);
  });

  it('mounts with the expected initial data', () => {
    const wrapper = factory();

    expect(wrapper.vm.videoItems).to.have.length(2);
    expect(wrapper.vm.currentVideo).to.deep.equal(wrapper.vm.videoItems[0]);
    expect(wrapper.vm.isExpanded).to.be.false;
  });

  it('syncs "expanded" via update:expanded event', async () => {
    const wrapper = factory();
    const videoWrapper = wrapper.findComponent(VideoWrapperStub);
    videoWrapper.vm.$emit('update:expanded', true);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isExpanded).to.be.true;
  });

  it('onSelect() sets currentVideo and plays the asset video', async () => {
    const wrapper = factory();

    const videoEl = wrapper.find('video[data-test="assetVideo"]').element;
    const playSpy = sinon.spy();
    videoEl.play = playSpy;

    const secondItem = wrapper.vm.videoItems[1];

    wrapper.findComponent(VideoWrapperStub).vm.$emit('select', secondItem);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentVideo).to.deep.equal(secondItem);

    expect(playSpy.calledOnce).to.be.true;
  });

  it('passes the correct asset-key to AssetWrapper', async () => {
    const wrapper = factory();

    let asset = wrapper.findComponent(AssetWrapperStub);
    expect(asset.props('assetKey')).to.equal('HOW_TO_KINO_1');

    const secondItem = wrapper.vm.videoItems[1];
    wrapper.findComponent(VideoWrapperStub).vm.$emit('select', secondItem);
    await wrapper.vm.$nextTick();

    asset = wrapper.findComponent(AssetWrapperStub);
    expect(asset.props('assetKey')).to.equal('HOW_TO_KINO_2');
  });

  // NEW TESTS: Test the new changes - Banners component and currentGame computed
  describe('new changes', () => {
    it('computes currentGame as KINO theme', () => {
      const wrapper = factory();
      expect(wrapper.vm.currentGame).to.equal(Constants.THEMES.KINO);
    });

    it('shows Banners component when in portrait mode', () => {
      const wrapper = factory({ isPortrait: true });
      const banners = wrapper.findComponent(BannersStub);
      expect(banners.exists()).to.be.true;
      expect(banners.props('game')).to.equal(Constants.THEMES.KINO);
    });

    it('hides Banners component when not in portrait mode', () => {
      const wrapper = factory({ isPortrait: false });
      const banners = wrapper.findComponent(BannersStub);
      expect(banners.exists()).to.be.false;
    });
  });
});
