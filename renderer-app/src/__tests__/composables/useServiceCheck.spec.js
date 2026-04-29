import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createStore } from 'vuex';
import { useServiceCheck } from '@/composables/useServiceCheck';
import ServiceCheckStoreModule from '@/store/modules/ServiceCheckStoreModule';
import moduleTypes from '@/store/modules/types/types';

vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex');
  return {
    ...actual,
    useStore: vi.fn(),
  };
});

import { useStore } from 'vuex';

describe('useServiceCheck', () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();

    store = createStore({
      modules: {
        [moduleTypes.SERVICE_CHECK_STORE_MODULE]: {
          ...ServiceCheckStoreModule,
          state: () => ({ maintenance: false, cashout: true }),
        },
      },
    });

    useStore.mockReturnValue(store);
  });

  it('returns maintenance status', () => {
    const { isMaintenance } = useServiceCheck();

    expect(isMaintenance.value).toBe(false);
  });

  it('returns cashout availability', () => {
    const { isCashoutAvailable } = useServiceCheck();

    expect(isCashoutAvailable.value).toBe(true);
  });

  it('updates service availability', async () => {
    const { isMaintenance, isCashoutAvailable, changeServiceAvailability } = useServiceCheck();

    await changeServiceAvailability({ maintenance: true, cashout: false });

    expect(isMaintenance.value).toBe(true);
    expect(isCashoutAvailable.value).toBe(false);
  });

  it('handles partial updates correctly', async () => {
    const { isMaintenance, isCashoutAvailable, changeServiceAvailability } = useServiceCheck();

    await changeServiceAvailability({ maintenance: true, cashout: true });

    expect(isMaintenance.value).toBe(true);
    expect(isCashoutAvailable.value).toBe(true);
  });
});
