import { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import FaqText from '../../../../../src/components/digitalAssistant/faq/FaqText.vue';
import moduleTypes from '../../../../../src/store/modules/types';
import PLTypes from '../../../../../src/store/modules/ConfigurationStoreModule/types';
import VideoTypes from '../../../../../src/store/modules/VideoStoreModule/types';
import { DIGITAL_ASSISTANT_MAIN } from '../../../../../src/constants/digitalAssistantRoutes';

chai.use(sinonChai);

const VideoPlayerStub = { name: 'VideoPlayer', template: '<video></video>' };

const AssetWrapperStub = {
  name: 'AssetWrapper',
  props: ['type', 'assetKey'],
  components: { VideoPlayer: VideoPlayerStub },
  template: '<div ref="assets"></div>',
};

const CTAButtonStub = {
  name: 'CTAButton',
  props: ['theme', 'route'],
  template: '<button></button>',
};

const BOX = { title: 'Box-Title-EN', content: 'Box-Content-EN' };
const $t = (k) => k;

function makeStore(loadSpy, playVideoStub) {
  return new Vuex.Store({
    modules: {
      [moduleTypes.CONFIGURATION_STORE_MODULE]: {
        namespaced: true,
        actions: { [PLTypes.actions.LOAD_FAQ_BOX]: loadSpy },
      },
      [moduleTypes.VIDEO_STORE_MODULE]: {
        namespaced: true,
        actions: { [VideoTypes.actions.PLAY_VIDEO]: playVideoStub },
      },
    },
  });
}

describe('FaqText.vue', () => {
  let localVue, store, router, loadSpy, playVideoStub;

  const initialRoute = {
    name: 'faqText',
    path: `/digital-assistant/${DIGITAL_ASSISTANT_MAIN.KINO}`,
    params: { type: 'kinoFaq', id: 'default1' },
  };

  const factory = () =>
    mount(FaqText, {
      localVue,
      store,
      stubs: { AssetWrapper: AssetWrapperStub, CTAButton: CTAButtonStub },
      router,
      mocks: {
        $t,
        $root: { $i18n: { locale: () => 'en' } },
      },
      attachTo: document.body,
    });

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);

    loadSpy = sinon.stub().resolves(BOX);
    playVideoStub = sinon.stub();
    store = makeStore(loadSpy, playVideoStub);

    router = new VueRouter({ mode: 'abstract' });
    router.push(initialRoute);
  });

  it('dispatches LOAD_FAQ_BOX on created() and sets data', async () => {
    const wrapper = factory();
    await wrapper.vm.$nextTick();
    expect(loadSpy.calledOnce).to.be.true;
    expect(wrapper.vm.boxTitle).to.equal(BOX.title);
    expect(wrapper.vm.boxContent).to.equal(BOX.content);
  });

  it('computes currentTheme & dynamicRoute for Kino', () => {
    const wrapper = factory();
    expect(wrapper.vm.currentTheme).to.equal(DIGITAL_ASSISTANT_MAIN.KINO);
    expect(wrapper.vm.dynamicRoute).to.equal(`/${DIGITAL_ASSISTANT_MAIN.KINO}`);
  });
});
