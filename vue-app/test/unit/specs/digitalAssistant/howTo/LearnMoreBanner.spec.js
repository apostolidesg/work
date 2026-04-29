import { expect } from 'chai';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';

import LearnMoreBanner from '../../../../../src/components/digitalAssistant/howTo/LearnMoreBanner.vue';
import moduleTypes from '../../../../../src/store/modules/types';
import PropertiesTypes from '../../../../../src/store/modules/ConfigurationStoreModule/types';
import Constants from '../../../../../src/util/Constants';

chai.use(sinonChai);

function buildStore() {
  return new Vuex.Store({
    modules: {
      [moduleTypes.CONFIGURATION_STORE_MODULE]: {
        namespaced: true,
        getters: {
          [PropertiesTypes.getters.GET_ASSET_URL]: () => (section, key) => `/assets/${section}/${key}`,
          [PropertiesTypes.getters.GET_CONFIGURATION]: () => ({
            DIGITAL_ASSISTANT: {
              KINO_BANNER_IMAGE: 'kino-banner.jpg',
              POWERSPIN_BANNER_IMAGE: 'powerspin-banner.jpg',
            },
          }),
        },
      },
    },
  });
}

describe('LearnMoreBanner.vue', () => {
  let localVue;
  let store;

  const factory = (props = {}, mocks = {}) =>
    shallowMount(LearnMoreBanner, {
      localVue,
      store,
      propsData: {
        game: Constants.THEMES.KINO,
        ...props,
      },
      mocks: {
        $root: {
          $i18n: {
            locale: () => 'en',
          },
        },
        ...mocks,
      },
    });

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = buildStore();
  });

  describe('component structure', () => {
    it('renders the component with correct CSS classes', () => {
      const wrapper = factory();
      expect(wrapper.find('.learn-more-banner').exists()).to.be.true;
    });

    it('renders image when isImageLoaded is true', () => {
      const wrapper = factory();
      const image = wrapper.find('.learn-more-banner__image');

      expect(image.exists()).to.be.true;
      expect(image.attributes('alt')).to.equal('kino-learn-more');
    });
  });

  describe('props validation', () => {
    it('accepts game prop as required string', () => {
      const wrapper = factory({ game: Constants.THEMES.POWERSPIN });
      expect(wrapper.props('game')).to.equal(Constants.THEMES.POWERSPIN);
    });
  });

  describe('computed properties', () => {
    it('computes locale correctly', () => {
      const wrapper = factory(
        {},
        {
          $root: {
            $i18n: {
              locale: () => 'el',
            },
          },
        }
      );

      expect(wrapper.vm.locale).to.equal('el');
    });

    it('computes imgSource for KINO game correctly', () => {
      const wrapper = factory({ game: Constants.THEMES.KINO });

      expect(wrapper.vm.imgSource).to.equal('/assets/images/KINO_BANNER_IMAGE');
    });

    it('computes imgSource for POWERSPIN game correctly', () => {
      const wrapper = factory({ game: Constants.THEMES.POWERSPIN });

      expect(wrapper.vm.imgSource).to.equal('/assets/images/POWERSPIN_BANNER_IMAGE');
    });

    it('uses correct image source in img element', () => {
      const wrapper = factory({ game: Constants.THEMES.KINO });
      const image = wrapper.find('.learn-more-banner__image');

      expect(image.attributes('src')).to.equal('/assets/images/KINO_BANNER_IMAGE');
    });
  });

  describe('image error handling', () => {
    it('sets isImageLoaded to false when image fails to load', async () => {
      const wrapper = factory();
      const image = wrapper.find('.learn-more-banner__image');

      expect(wrapper.vm.isImageLoaded).to.be.true;

      await image.trigger('error');

      expect(wrapper.vm.isImageLoaded).to.be.false;
    });

    it('hides image after error event', async () => {
      const wrapper = factory();
      const image = wrapper.find('.learn-more-banner__image');

      await image.trigger('error');
      await wrapper.vm.$nextTick();

      const imageAfterError = wrapper.find('.learn-more-banner__image');
      expect(imageAfterError.exists()).to.be.false;
    });
  });

  describe('data initialization', () => {
    it('initializes with isImageLoaded as true', () => {
      const wrapper = factory();
      expect(wrapper.vm.isImageLoaded).to.be.true;
    });
  });
});
