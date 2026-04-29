import { expect } from 'chai';
import getters from '../../../../../src/store/modules/ConfigurationStoreModule/getters';
import { FALLBACK_VIDEO } from '../../../../../src/constants/stringConstants';
import types from '../../../../../src/store/modules/ConfigurationStoreModule/types';

describe('getters', () => {
  let state;
  let rootState;

  beforeEach(() => {
    state = {
      config: {
        DIGITAL_ASSISTANT: {
          ASSET_URL: 'http://example.com/base',
          ASSETS: {
            SOME_ASSET: 'asset.mp4',
          },
        },

        assetsUrls: {
          video: {
            myVideo: 'http://example.com/video.mp4',
          },
        },
      },
    };

    rootState = { i18n: { locale: 'en' } };
  });

  describe('GET_ASSET_URL', () => {
    it('returns the fallback when required keys are missing', () => {
      const customState = {
        config: {
          DIGITAL_ASSISTANT: {},
        },
      };

      const result = getters[types.getters.GET_ASSET_URL](customState, {}, { i18n: { locale: 'en' } })('video', '');
      expect(result).to.equal(FALLBACK_VIDEO);
    });

    it('returns the fallback when key is missing', () => {
      const customState = {
        config: {
          DIGITAL_ASSISTANT: {
            ASSET_URL: 'http://example.com/assets',
            ASSETS: {},
          },
        },
      };

      const result = getters[types.getters.GET_ASSET_URL](
        customState,
        {},
        { i18n: { locale: 'en' } }
      )('video', 'MISSING_KEY');
      expect(result).to.equal(FALLBACK_VIDEO);
    });

    it('returns the fallback when DIGITAL_ASSISTANT is missing', () => {
      const customState = {
        config: {},
      };
      const result = getters[types.getters.GET_ASSET_URL](
        customState,
        {},
        { i18n: { locale: 'en' } }
      )('video', 'SOME_ASSET');
      expect(result).to.equal(FALLBACK_VIDEO);
    });

    it('returns the fallback when assetFilename is not a string', () => {
      const customState = {
        config: {
          DIGITAL_ASSISTANT: {
            ASSET_URL: 'http://example.com/assets',

            ASSETS: {
              SOME_ASSET: { invalid: 'object' },
            },
          },
        },
      };
      const result = getters[types.getters.GET_ASSET_URL](
        customState,
        {},
        { i18n: { locale: 'en' } }
      )('video', 'SOME_ASSET');
      expect(result).to.equal(FALLBACK_VIDEO);
    });

    it('returns empty string for non-video types when keys are missing', () => {
      const customState = {
        config: {
          DIGITAL_ASSISTANT: {},
        },
      };

      const result = getters[types.getters.GET_ASSET_URL](customState, {}, { i18n: { locale: 'en' } })('image', '');
      expect(result).to.equal('');
    });

    it('constructs a proper URL with locale for http URLs', () => {
      const customState = {
        config: {
          DIGITAL_ASSISTANT: {
            ASSET_URL: 'http://example.com/assets',

            ASSETS: {
              SOME_ASSET: 'asset.mp4',
            },
          },
        },
      };

      const result = getters[types.getters.GET_ASSET_URL](
        customState,
        {},
        { i18n: { locale: 'en' } }
      )('video', 'SOME_ASSET');

      expect(result).to.equal('http://example.com/assets/en/asset.mp4');
      const resultEl = getters[types.getters.GET_ASSET_URL](
        customState,
        {},
        { i18n: { locale: 'el' } }
      )('video', 'SOME_ASSET');
      expect(resultEl).to.equal('http://example.com/assets/el/asset.mp4');
    });

    it('constructs a proper URL with locale for file system paths', () => {
      const customState = {
        config: {
          DIGITAL_ASSISTANT: {
            ASSET_URL: 'C:/KinoSSBT/Assets',
            ASSETS: {
              SOME_ASSET: 'asset.mp4',
            },
          },
        },
      };

      const result = getters[types.getters.GET_ASSET_URL](
        customState,
        {},
        { i18n: { locale: 'en' } }
      )('video', 'SOME_ASSET');

      expect(result).to.equal('C:/KinoSSBT/Assets/en/asset.mp4');
      const resultEl = getters[types.getters.GET_ASSET_URL](
        customState,
        {},
        { i18n: { locale: 'el' } }
      )('video', 'SOME_ASSET');
      expect(resultEl).to.equal('C:/KinoSSBT/Assets/el/asset.mp4');
    });
  });
});
