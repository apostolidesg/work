import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';
import { useConfiguration } from '@/composables/useConfiguration';
import ConfigurationStoreModule from '@/store/modules/ConfigurationStoreModule';
import moduleTypes from '@/store/modules/types/types';

vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex');
  return {
    ...actual,
    useStore: vi.fn(),
  };
});

import { useStore } from 'vuex';

describe('useConfiguration', () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();

    store = createStore({
      modules: {
        [moduleTypes.CONFIGURATION_STORE_MODULE]: {
          ...ConfigurationStoreModule,
          state: () => ({
            config: {
              MODE: 'development',
              SOME_FEATURE: 'enabled',
            },
            voucher: null,
            configurationAssets: { isConfigLoaded: true },
          }),
        },
      },
    });

    useStore.mockReturnValue(store);
  });

  it('returns app configuration', () => {
    const { appConfig } = useConfiguration();

    expect(appConfig.value).toEqual({
      MODE: 'development',
      SOME_FEATURE: 'enabled',
    });
  });



  it('returns development mode status', () => {
    const { isDevelopmentMode } = useConfiguration();

    expect(isDevelopmentMode.value).toBe(true);
  });

  it('updates configuration when setConfiguration is called', async () => {
    const { appConfig, setConfiguration } = useConfiguration();

    await setConfiguration({
      MODE: 'production',
      NEW_SETTING: 'value',
    });

    expect(appConfig.value).toEqual({
      MODE: 'production',
      NEW_SETTING: 'value',
    });
  });

});
