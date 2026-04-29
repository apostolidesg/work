import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import AssetWrapper from '../../../src/components/digitalAssistant/AssetWrapper.vue';
import VideoPlayer from '../../../src/components/digitalAssistant/VideoPlayer.vue';
import moduleTypes from '../../../src/store/modules/types';

describe('AssetWrapper.vue', () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      getters: {
        [`${moduleTypes.PROPERTIES_LOADER_MODULE}/getAssetUrl`]: sinon
          .stub()
          .callsFake((type, key) => `mock-url${type}/${key}`),
      },
    };
  });

  it('render video player when type is video', () => {
    wrapper = shallowMount(AssetWrapper, {
      propsData: {
        type: 'video',
        assetKey: 'HOW_TO_KINO_1',
      },

      mocks: {
        $store: mockStore,
      },

      stubs: {
        VideoPlayer: true,
      },
    });

    expect(wrapper.findComponent(VideoPlayer).exists()).to.be.true;
    expect(wrapper.find('img').exists()).to.be.false;
  });
});
