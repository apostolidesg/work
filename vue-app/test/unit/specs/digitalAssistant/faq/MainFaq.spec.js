import { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import MainFaq from '../../../../../src/components/digitalAssistant/faq/MainFaq.vue';
import moduleTypes from '../../../../../src/store/modules/types';
import PLTypes from '../../../../../src/store/modules/ConfigurationStoreModule/types';
import VideoTypes from '../../../../../src/store/modules/VideoStoreModule/types';

chai.use(sinonChai);
const SECTIONS = [
  {
    id: 'kino',
    route: 'kinofaq',
    name: 'kinoFaq',
    image: '/images/kino.png',
    translations: { en: 'Kino FAQ' },
  },
  {
    id: 'powerspin',
    route: 'powerspinfaq',
    name: 'powerspinFaq',
    image: '/images/power.png',
    translations: { en: 'Power Spin FAQ' },
  },
  {
    id: 'help',
    route: 'helpfaq',
    name: 'helpFaq',
    image: '/images/help.png',
    translations: { en: 'Help FAQ' },
  },
];
const AssetWrapperStub = {
  name: 'AssetWrapper',
  props: ['type', 'assetKey'],
  template: '<div ref="assets"></div>',
};
const $t = (k) => k;
describe('MainFaq.vue', () => {
  let localVue;
  let routerSpy;
  let loadActionSpy;
  let playVideoStub;
  let store;
  let wrapper;
  function makeStore() {
    return new Vuex.Store({
      modules: {
        [moduleTypes.CONFIGURATION_STORE_MODULE]: {
          namespaced: true,
          getters: {
            [PLTypes.getters.GET_MAIN_FAQ_SECTIONS]: () => SECTIONS,
          },
          actions: {
            [PLTypes.actions.INITIALIZE_FAQ_DATA]: loadActionSpy,
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
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    routerSpy = makeRouterSpy();
    loadActionSpy = sinon.stub().resolves(SECTIONS);
    playVideoStub = sinon.stub();
    store = makeStore();
  });
  it('renders one FAQ tile per section from the getter', () => {
    wrapper = mount(MainFaq, {
      localVue,
      store,
      stubs: { AssetWrapper: AssetWrapperStub },
      mocks: {
        $t,
        $router: routerSpy,
        $root: { $i18n: { locale: 'en' } },
      },
    });
    const tiles = SECTIONS.map((s) => wrapper.find(`.${s.id}`));
    expect(tiles.every((t) => t.exists())).to.be.true;
  });

  it('navigates to KINO FAQ and tracks it', async () => {
    wrapper = mount(MainFaq, {
      localVue,
      store,
      stubs: { AssetWrapper: AssetWrapperStub },
      mocks: {
        $t,
        $router: routerSpy,
        $root: { $i18n: { locale: 'en' } },
      },
    });
    sinon.stub(wrapper.vm, 'trackFaqNavigation');
    await wrapper.find('.kino__container').trigger('click');
    expect(wrapper.vm.trackFaqNavigation).to.have.been.calledWith('kinofaq');
  });
  it('navigates to POWERSPIN FAQ and tracks it', async () => {
    wrapper = mount(MainFaq, {
      localVue,
      store,
      stubs: { AssetWrapper: AssetWrapperStub },
      mocks: {
        $t,
        $router: routerSpy,
        $root: { $i18n: { locale: 'en' } },
      },
    });
    sinon.stub(wrapper.vm, 'trackFaqNavigation');
    await wrapper.find('.powerspin__container').trigger('click');
    expect(wrapper.vm.trackFaqNavigation).to.have.been.calledWith('powerspinfaq');
  });
  it('navigates to HELP FAQ and tracks it', async () => {
    wrapper = mount(MainFaq, {
      localVue,
      store,
      stubs: { AssetWrapper: AssetWrapperStub },
      mocks: {
        $t,
        $router: routerSpy,
        $root: { $i18n: { locale: 'en' } },
      },
    });
    sinon.stub(wrapper.vm, 'trackFaqNavigation');
    await wrapper.find('.help__container').trigger('click');
    expect(wrapper.vm.trackFaqNavigation).to.have.been.calledWith('helpfaq');
  });
});
