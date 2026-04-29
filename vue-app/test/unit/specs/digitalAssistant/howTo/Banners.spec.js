import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Banners from '../../../../../src/components/digitalAssistant/howTo/Banners.vue';
import Constants from '../../../../../src/util/Constants';

chai.use(sinonChai);

const LearnMoreBannerStub = {
  name: 'LearnMoreBanner',
  props: ['game'],
  template: '<div class="learn-more-banner-stub">Banner for {{ game }}</div>',
};

const LinkToPlayAreaStub = {
  name: 'LinkToPlayArea',
  props: ['game'],
  template: '<div class="learn-more-like-stub">Like for {{ game }}</div>',
};

describe('Banners.vue', () => {
  let localVue;

  const factory = (props = {}) =>
    shallowMount(Banners, {
      localVue,
      propsData: {
        game: Constants.THEMES.KINO,
        ...props,
      },
      stubs: {
        LearnMoreBanner: LearnMoreBannerStub,
        LinkToPlayArea: LinkToPlayAreaStub,
      },
    });

  beforeEach(() => {
    localVue = createLocalVue();
  });

  describe('component structure', () => {
    it('renders the component with correct CSS classes', () => {
      const wrapper = factory();
      expect(wrapper.find('.banners').exists()).to.be.true;
    });

    it('renders LearnMoreBanner component with correct game prop', () => {
      const wrapper = factory({ game: Constants.THEMES.KINO });
      const learnMoreBanner = wrapper.findComponent(LearnMoreBannerStub);
      
      expect(learnMoreBanner.exists()).to.be.true;
      expect(learnMoreBanner.props('game')).to.equal(Constants.THEMES.KINO);
    });

    it('renders LinkToPlayArea component with correct game prop', () => {
      const wrapper = factory({ game: Constants.THEMES.POWERSPIN });
      const linkToPlayArea = wrapper.findComponent(LinkToPlayAreaStub);
      
      expect(linkToPlayArea.exists()).to.be.true;
      expect(linkToPlayArea.props('game')).to.equal(Constants.THEMES.POWERSPIN);
    });

    it('renders separator between components', () => {
      const wrapper = factory();
      const separator = wrapper.find('.banners__separator');
      
      expect(separator.exists()).to.be.true;
      expect(separator.element.tagName).to.equal('HR');
    });
  });

  describe('props validation', () => {
    it('accepts game prop as required string', () => {
      const wrapper = factory({ game: Constants.THEMES.KINO });
      expect(wrapper.props('game')).to.equal(Constants.THEMES.KINO);
    });

    it('passes game prop to both child components', () => {
      const wrapper = factory({ game: Constants.THEMES.POWERSPIN });
      
      const learnMoreBanner = wrapper.findComponent(LearnMoreBannerStub);
      const linkToPlayArea = wrapper.findComponent(LinkToPlayAreaStub);
      
      expect(learnMoreBanner.props('game')).to.equal(Constants.THEMES.POWERSPIN);
      expect(linkToPlayArea.props('game')).to.equal(Constants.THEMES.POWERSPIN);
    });
  });
});