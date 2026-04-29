import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue, mount } from '@vue/test-utils';
import HelpSection from '../../../../../src/components/digitalAssistant/howTo/HelpSection.vue';
import Constants from '../../../../../src/util/Constants';

chai.use(sinonChai);

const VideoPlayerStub = {
  name: 'VideoPlayer',
  template: '<video ref="video"></video>',
};

const AssetWrapperStub = {
  name: 'AssetWrapper',
  props: ['type', 'assetKey'],
  components: { VideoPlayer: VideoPlayerStub },
  template: '<div class="asset-wrapper-stub"><VideoPlayer ref="videoPlayer" /></div>',
};

const $t = (k) => k;

function makeRouterSpy() {
  return { push: sinon.spy() };
}

describe('HelpSection.vue', () => {
  let localVue;
  let routerSpy;

  const factory = (mountOpts = {}) =>
    mount(HelpSection, {
      localVue,
      stubs: {
        AssetWrapper: AssetWrapperStub,
      },
      mocks: { $t, $router: routerSpy },
      attachToDocument: true,
      ...mountOpts,
    });

  beforeEach(() => {
    localVue = createLocalVue();
    routerSpy = makeRouterSpy();
  });

  it('binds faq images from component data', () => {
    const wrapper = factory();

    const firstImg = wrapper.findAll('img').at(0).attributes('src');
    const secondImg = wrapper.findAll('img').at(1).attributes('src');

    expect(firstImg).to.equal(wrapper.vm.faqFirst);
    expect(secondImg).to.equal(wrapper.vm.group);
  });
});
