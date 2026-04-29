import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const createdInstances = [];
  const state = {
    appConfigRef: { value: { env: 'test' } },
    accessTokenRef: { value: 'access-token-xyz' },
  };

  class PamApiElectronImpl {
    constructor(config) {
      this.config = config;
      this.getBalance = vi.fn();
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
    useSession: () => ({ accessToken: mocks.state.accessTokenRef }),
  };
});

import { useBalance } from '@/composables/useBalance';

describe('useBalance composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createdInstances.length = 0;
    mocks.state.appConfigValue = { env: 'test' };
    mocks.state.accessTokenValue = 'access-token-xyz';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('constructs PamApiElectron with appConfig.value', () => {
    useBalance();
    expect(mocks.PamApiElectron).toHaveBeenCalledTimes(1);
    expect(mocks.PamApiElectron).toHaveBeenCalledWith(mocks.state.appConfigValue);
    expect(mocks.createdInstances.length).toBe(1);
    expect(mocks.createdInstances[0].config).toEqual(mocks.state.appConfigValue);
  });

  it('updateBalance calls getBalance with accessToken and sets flags', () => {
    const { updateBalance, shouldTriggerPlaceBetToSessionIM, isInstantWin } = useBalance();

    updateBalance({ triggerPlaceBetToSessionIM: true, instantWin: true });

    const instance = mocks.createdInstances[0];
    expect(instance.getBalance).toHaveBeenCalledTimes(1);
    expect(instance.getBalance).toHaveBeenCalledWith(mocks.state.accessTokenValue);

    expect(shouldTriggerPlaceBetToSessionIM.value).toBe(true);
    expect(isInstantWin.value).toBe(true);
  });

  it('checkShouldTriggerPlaceBetToSessionIM resets shouldTrigger when balance > 0', () => {
    const { updateBalance, checkShouldTriggerPlaceBetToSessionIM, shouldTriggerPlaceBetToSessionIM } = useBalance();

    updateBalance({ triggerPlaceBetToSessionIM: true, instantWin: false });
    expect(shouldTriggerPlaceBetToSessionIM.value).toBe(true);

    checkShouldTriggerPlaceBetToSessionIM({ balance: 10 });
    expect(shouldTriggerPlaceBetToSessionIM.value).toBe(false);
  });
});
