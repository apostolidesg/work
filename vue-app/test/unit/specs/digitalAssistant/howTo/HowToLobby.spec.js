import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue, mount } from '@vue/test-utils';

import HowToLobby from '../../../../../src/components/digitalAssistant/howTo/HowToLobby.vue';
import Constants from '@/util/Constants';

chai.use(sinonChai);

const VideoPlayerStub = {
  name: 'VideoPlayer',
  template: '<video ref="video"></video>',
};

const AssetWrapperStub = {
  name: 'AssetWrapper',
  props: ['type', 'assetKey', 'videoProps'],
  components: { VideoPlayer: VideoPlayerStub },
  template: '<div class="asset-wrapper-stub"><VideoPlayer ref="videoPlayer" /></div>',
};

const GameCardStub = {
  name: 'GameCard',
  props: ['theme', 'buttonText'],
  template: '<div class="game-card-stub" :data-theme="theme">{{ buttonText }}</div>',
};

const $t = (k) => k;

function makeRouterSpy() {
  return { push: sinon.spy() };
}

describe('HowToLobby.vue', () => {
  let localVue;
  let routerSpy;

  const factory = (opts = {}) =>
    mount(HowToLobby, {
      localVue,
      stubs: {
        AssetWrapper: AssetWrapperStub,
        GameCard: GameCardStub,
      },
      mocks: { $t, $router: routerSpy },
      attachToDocument: true,
      ...opts,
    });

  beforeEach(() => {
    localVue = createLocalVue();
    routerSpy = makeRouterSpy();
  });
});
