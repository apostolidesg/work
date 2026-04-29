import { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';

import FaqPage from '../../../../../src/components/digitalAssistant/faq/FaqPage.vue';
import moduleTypes from '../../../../../src/store/modules/types';
import PLTypes from '../../../../../src/store/modules/ConfigurationStoreModule/types';
import VideoTypes from '../../../../../src/store/modules/VideoStoreModule/types';

chai.use(sinonChai);

const BOXES = [
  { title: 'Q-1', description: 'A-1', route: '/1' },
  { title: 'Q-2', description: 'A-2', route: '/2' },
  { title: 'Q-3', description: 'A-3', route: '/3' },
  { title: 'Q-4', description: 'A-4', route: '/4' },
];

const VideoPlayerStub = {
  name: 'VideoPlayer',
  template: '<video ref="video"></video>',
};

const AssetWrapperStub = {
  name: 'AssetWrapper',
  props: ['type', 'assetKey'],
  components: { VideoPlayer: VideoPlayerStub },
  template: '<div ref="assets" class="asset-wrapper-stub"><VideoPlayer ref="videoPlayer" /></div>',
};

const ContentBoxStub = {
  name: 'ContentBox',
  props: ['title', 'route', 'boxType'],
  template: '<div class="content-box-stub" @click="$emit(\'click\')">{{ title }}</div>',
};

const $t = (k) => k;

function makeStore(loadSpy, playVideoStub) {
  return new Vuex.Store({
    modules: {
      [moduleTypes.CONFIGURATION_STORE_MODULE]: {
        namespaced: true,
        actions: {
          [PLTypes.actions.LOAD_FAQ_BOXES]: loadSpy,
        },
      },
      [moduleTypes.VIDEO_STORE_MODULE]: {
        namespaced: true,
        actions: {
          [VideoTypes.actions.PLAY_VIDEO]: playVideoStub,
        },
      },
    },
  });
}

function makeRouterSpy() {
  return { push: sinon.spy(), go: sinon.spy() };
}

describe('FaqPage.vue', () => {
  let localVue, routerSpy, loadSpy, playVideoStub, store;

  const factory = (props = {}) => {
    const wrapper = mount(FaqPage, {
      localVue,
      store,
      stubs: {
        AssetWrapper: AssetWrapperStub,
        ContentBox: ContentBoxStub,
      },
      propsData: {
        pageType: 'powerspinFaq',
        theme: 'powerspin',
        displayLimit: 3,
        ...props,
      },
      mocks: {
        $t,
        $router: routerSpy,
        $root: { $i18n: { locale: () => 'en' } },
      },
      attachTo: document.body,
    });
    return { wrapper };
  };

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    routerSpy = makeRouterSpy();
    loadSpy = sinon.stub().resolves(BOXES);
    playVideoStub = sinon.stub();
    store = makeStore(loadSpy, playVideoStub);
  });

  it('dispatches LOAD_FAQ_BOXES on created()', () => {
    factory();
    expect(loadSpy.calledOnce).to.be.true;
  });

  it('stores boxes returned from the action', async () => {
    const { wrapper } = factory();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.boxes).to.deep.equal(BOXES);
  });

  it('limitedFaqPages slices to displayLimit', async () => {
    const { wrapper } = factory({ displayLimit: 2 });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.limitedFaqPages.length).to.equal(2);
  });
});
