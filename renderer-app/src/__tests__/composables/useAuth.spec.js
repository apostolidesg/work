import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const createdInstances = [];
  const state = {
    appConfigRef: { value: { env: 'test' } },
    ssbtIdRef: { value: 'ssbt-123' },
  };

  class PamApiElectronImpl {
    constructor(config) {
      this.config = config;
      this.getAccessToken = vi.fn();
      this.logOut = vi.fn();
      createdInstances.push(this);
    }
  }

  const PamApiElectron = vi.fn(PamApiElectronImpl);

  return { state, createdInstances, PamApiElectron };
});

vi.mock('@/apis/pam-api-electron', () => {
  return { default: mocks.PamApiElectron };
});

vi.mock('@/composables/useConfiguration', () => {
  return {
    useConfiguration: () => ({ appConfig: mocks.state.appConfigRef }),
  };
});

vi.mock('@/composables/useSession', () => {
  return {
    useSession: () => ({ ssbtId: mocks.state.ssbtIdRef }),
  };
});

import { useAuth } from '@/composables/useAuth';

describe('useAuth composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createdInstances.length = 0;
    mocks.state.appConfigValue = { env: 'test' };
    mocks.state.ssbtIdValue = 'ssbt-123';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('constructs PamApiElectron with appConfig.value', () => {
    useAuth();
    expect(mocks.PamApiElectron).toHaveBeenCalledTimes(1);
    expect(mocks.PamApiElectron).toHaveBeenCalledWith(mocks.state.appConfigValue);
    expect(mocks.createdInstances.length).toBe(1);
    expect(mocks.createdInstances[0].config).toEqual(mocks.state.appConfigValue);
  });

  it('getAccessToken forwards ssbtId and args to PamApiElectron.getAccessToken', () => {
    const { getAccessToken } = useAuth();
    const gameType = 'POWERSPIN';
    const betslip = { id: 1 };

    getAccessToken('REQUEST_TYPE', gameType, betslip);

    const instance = mocks.createdInstances[0];
    expect(instance.getAccessToken).toHaveBeenCalledTimes(1);
    expect(instance.getAccessToken).toHaveBeenCalledWith(mocks.state.ssbtIdValue, 'REQUEST_TYPE', gameType, betslip);
  });

  it('logOut forwards arguments to PamApiElectron.logOut', () => {
    const { logOut } = useAuth();
    logOut('access-token-xyz', true, 'SOME_APP');

    const instance = mocks.createdInstances[0];
    expect(instance.logOut).toHaveBeenCalledTimes(1);
    expect(instance.logOut).toHaveBeenCalledWith('access-token-xyz', true, 'SOME_APP');
  });
});
