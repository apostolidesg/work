import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import LinkToPlayArea from '../../../../../src/components/digitalAssistant/howTo/LinkToPlayArea.vue';
import Constants from '../../../../../src/util/Constants';
import gtag from '../../../../../src/util/gtag';
import gtmEvents from '../../../../../src/constants/gtmEvents';

chai.use(sinonChai);

describe('LinkToPlayArea.vue', () => {
  let localVue;
  let routerSpy;

  const factory = (props = {}, mocks = {}) =>
    shallowMount(LinkToPlayArea, {
      localVue,
      propsData: {
        game: Constants.THEMES.KINO,
        ...props,
      },
      mocks: {
        $t: (key, params) => {
          if (key === 'learn-more.likeText') {
            return `I like ${params.game}!`;
          }
          return key;
        },
        $router: routerSpy,
        ...mocks,
      },
    });

  beforeEach(() => {
    localVue = createLocalVue();
    routerSpy = { push: sinon.spy() };
    
    sinon.stub(gtag, 'sendEvent');
  });

  afterEach(() => {
    gtag.sendEvent.restore();
  });

  describe('component structure', () => {
    it('renders the component with correct CSS classes', () => {
      const wrapper = factory();
      expect(wrapper.find('.link-to-play-area').exists()).to.be.true;
    });

    it('applies correct CSS class based on game type', () => {
      const kinoWrapper = factory({ game: Constants.THEMES.KINO });
      expect(kinoWrapper.find('.link-to-play-area--kino').exists()).to.be.true;

      const powerspinWrapper = factory({ game: Constants.THEMES.POWERSPIN });
      expect(powerspinWrapper.find('.link-to-play-area--powerspin').exists()).to.be.true;
    });

    it('renders text content with correct class', () => {
      const wrapper = factory({ game: Constants.THEMES.KINO });
      const textElement = wrapper.find('.link-to-play-area__text--kino');
      
      expect(textElement.exists()).to.be.true;
      expect(textElement.find('span').html()).to.include('I like KINO!');
    });
  });

  describe('props validation', () => {
    it('accepts game prop as required string', () => {
      const wrapper = factory({ game: Constants.THEMES.POWERSPIN });
      expect(wrapper.props('game')).to.equal(Constants.THEMES.POWERSPIN);
    });
  });

  describe('computed properties', () => {
    it('computes items correctly with all game configurations', () => {
      const wrapper = factory();
      const items = wrapper.vm.items;
      
      expect(items).to.have.property('kino');
      expect(items).to.have.property('powerspin');
      
      expect(items.kino).to.deep.include({
        alt: 'kino-learn-more',
        event: gtmEvents.SSBT_LOTTERY_PLAY_AREA_KINO,
        cssClass: 'kino',
      });
      
      expect(items.powerspin).to.deep.include({
        alt: 'powerspin-learn-more',
        event: gtmEvents.SSBT_LOTTERY_PLAY_AREA_POWERSPIN,
        cssClass: 'powerspin',
      });
    });

    it('computes currentItem correctly for KINO game', () => {
      const wrapper = factory({ game: Constants.THEMES.KINO });
      const currentItem = wrapper.vm.currentItem;
      
      expect(currentItem.cssClass).to.equal('kino');
      expect(currentItem.alt).to.equal('kino-learn-more');
      expect(currentItem.event).to.equal(gtmEvents.SSBT_LOTTERY_PLAY_AREA_KINO);
    });

    it('computes currentItem correctly for POWERSPIN game', () => {
      const wrapper = factory({ game: Constants.THEMES.POWERSPIN });
      const currentItem = wrapper.vm.currentItem;
      
      expect(currentItem.cssClass).to.equal('powerspin');
      expect(currentItem.alt).to.equal('powerspin-learn-more');
      expect(currentItem.event).to.equal(gtmEvents.SSBT_LOTTERY_PLAY_AREA_POWERSPIN);
    });
  });

  describe('methods', () => {
    describe('likeGame', () => {
      it('sends correct gtag event for KINO game', async () => {
        const wrapper = factory({ game: Constants.THEMES.KINO });
        
        await wrapper.trigger('click');
        
        expect(gtag.sendEvent).to.have.been.calledWith(gtmEvents.SSBT_LOTTERY_PLAY_AREA_KINO);
      });

      it('sends correct gtag event for POWERSPIN game', async () => {
        const wrapper = factory({ game: Constants.THEMES.POWERSPIN });
        
        await wrapper.trigger('click');
        
        expect(gtag.sendEvent).to.have.been.calledWith(gtmEvents.SSBT_LOTTERY_PLAY_AREA_POWERSPIN);
      });
    });
  });

  describe('text rendering', () => {
    it('renders translated text with correct game parameter', () => {
      const wrapper = factory({ game: Constants.THEMES.KINO });
      const textSpan = wrapper.find('.link-to-play-area__text span');
      
      expect(textSpan.html()).to.include('I like KINO!');
    });

    it('handles v-html directive correctly', () => {
      const wrapper = factory({ game: Constants.THEMES.POWERSPIN });
      const textSpan = wrapper.find('.link-to-play-area__text span');
      
      expect(textSpan.html()).to.include('I like POWERSPIN!');
    });
  });
});