import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import VideoPlayer from '../../../src/components/digitalAssistant/VideoPlayer.vue';
import moduleTypes from '../../../src/store/modules/types';

describe('VideoWrapper.vue', () => {
  let wrapper;
  let mockVideo;
  let sandbox;
  let mockRoot;
  let mockI18N;
  let mockStore;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    mockVideo = {
      play: sandbox.stub(),
      pause: sandbox.stub(),
      addEventListener: sandbox.stub(),
      removeEventListener: sandbox.stub(),
    };

    mockI18N = {
      locale: sandbox.stub(),
    };

    mockRoot = {
      $i18n: mockI18N,
    };

    mockI18N.locale.returns('en');

    mockStore = {
      getters: {
        [`${moduleTypes.PROPERTIES_LOADER_MODULE}/getAssetUrl`]: sandbox.stub(),
      },
    };

    mockStore.getters[`${moduleTypes.PROPERTIES_LOADER_MODULE}/getAssetUrl`].callsFake(
      (type, key) => `mock-url${type}/${key}`
    );

    sandbox.stub(Element.prototype, 'getBoundingClientRect').returns({
      width: 1920,
      height: 1080,
    });

    sandbox.stub(window.HTMLMediaElement.prototype, 'play');
    sandbox.stub(window.HTMLMediaElement.prototype, 'pause');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders video element with correct source', () => {
    wrapper = shallowMount(VideoPlayer, {
      propsData: {
        videoKey: 'VIDEO_TEST',
      },
      computed: {
        videoSource: () => 'mock-video-source.mp4',
        localeKey: () => 'en',
      },
    });

    const video = wrapper.find('video');
    expect(video.exists()).to.be.true;
    expect(video.attributes('src')).to.equal('mock-video-source.mp4');
  });

  it('passes custom attributes to video element', () => {
    wrapper = shallowMount(VideoPlayer, {
      propsData: {
        videoKey: 'VIDEO_TEST',
      },
      attrs: {
        autoPlay: true,
        muted: true,
        loop: true,
        controls: true,
      },
      computed: {
        videoSource: () => 'mock-video-source.mp4',
        localeKey: () => 'en',
      },
    });

    const video = wrapper.find('video');
    expect(video.attributes('autoplay')).to.exist;
    expect(video.attributes('loop')).to.exist;
    expect(video.attributes('controls')).to.exist;
  });

  it('computes the correct `videoSource`', () => {
    expect(wrapper.vm.videoSource).to.equal('mock-video-source.mp4');
  });
});
