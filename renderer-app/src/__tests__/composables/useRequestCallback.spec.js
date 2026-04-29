import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const setAccessToken = vi.fn();
  const resetAccessToken = vi.fn();
  const setBalance = vi.fn();
  const resetBalance = vi.fn();
  return { setAccessToken, resetAccessToken, setBalance, resetBalance };
});

vi.mock('@/composables/useSession', () => {
  return {
    useSession: () => ({
      setAccessToken: mocks.setAccessToken,
      resetAccessToken: mocks.resetAccessToken,
      setBalance: mocks.setBalance,
      resetBalance: mocks.resetBalance,
    }),
  };
});

const emitterMock = vi.hoisted(() => ({ emit: vi.fn() }));
vi.mock('@/util/eventBus', () => ({ default: emitterMock }));

const balanceMocks = vi.hoisted(() => {
  const updateBalance = vi.fn();
  const checkShouldTriggerPlaceBetToSessionIM = vi.fn();
  const shouldTriggerPlaceBetToSessionIM = { value: false };
  const zeroBalanceOnCashOutOrSwitchApp = { value: false };
  return {
    updateBalance,
    checkShouldTriggerPlaceBetToSessionIM,
    shouldTriggerPlaceBetToSessionIM,
    zeroBalanceOnCashOutOrSwitchApp,
  };
});
vi.mock('@/composables/useBalance', () => ({
  useBalance: () => ({
    updateBalance: balanceMocks.updateBalance,
    checkShouldTriggerPlaceBetToSessionIM: balanceMocks.checkShouldTriggerPlaceBetToSessionIM,
    shouldTriggerPlaceBetToSessionIM: balanceMocks.shouldTriggerPlaceBetToSessionIM,
    zeroBalanceOnCashOutOrSwitchApp: balanceMocks.zeroBalanceOnCashOutOrSwitchApp,
  }),
}));

const authMocks = vi.hoisted(() => ({ getAccessToken: vi.fn() }));
vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({ getAccessToken: authMocks.getAccessToken }),
}));

const loaderMocks = vi.hoisted(() => ({ hide: vi.fn() }));
vi.mock('@/composables/useGlobalLoader', () => ({
  useGlobalLoader: () => ({ hide: loaderMocks.hide }),
}));

const modalMocks = vi.hoisted(() => ({
  info: vi.fn(),
  open: vi.fn(),
}));
vi.mock('@/composables/useModalService', () => ({
  useModalService: () => ({
    info: modalMocks.info,
    open: modalMocks.open,
  }),
}));

const findWinningsMocks = vi.hoisted(() => ({
  doFindWinnings: vi.fn(),
}));
vi.mock('@/composables/useFindWinnings', () => ({
  useFindWinnings: () => ({
    doFindWinnings: findWinningsMocks.doFindWinnings,
  }),
}));

vi.mock('@/composables/useConfiguration', () => ({
  useConfiguration: () => ({
    appConfig: { value: {} },
    getVoucherMessage: { value: { en: 'voucher-text', el: 'voucher-text' } },
  }),
}));

vi.mock('@unify/vuex-i18n', () => ({
  useI18nPlugin: () => ({
    locale: () => 'en',
  }),
}));

import { useRequestCallback } from '@/composables/useRequestCallback';
import HttpStatus from 'http-status';
import EventBusTypes from '@/constants/EventBusTypes';

describe('useRequestCallback composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    balanceMocks.zeroBalanceOnCashOutOrSwitchApp.value = false;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls setAccessToken when response.success is true and status is OK', () => {
    const { handleGetTokenAfterAppSwitchResponse } = useRequestCallback();
    const response = { success: true, status: HttpStatus.OK, data: { access_token: 'token-123' } };
    handleGetTokenAfterAppSwitchResponse({ response });
    expect(mocks.setAccessToken).toHaveBeenCalledTimes(1);
    expect(mocks.setAccessToken).toHaveBeenCalledWith('token-123');
    expect(balanceMocks.updateBalance).toHaveBeenCalledTimes(1);
    expect(loaderMocks.hide).toHaveBeenCalledTimes(1);
  });

  it('does not call setAccessToken when success is true but status is not OK', () => {
    const { handleGetTokenAfterAppSwitchResponse } = useRequestCallback();
    const response = { success: true, status: HttpStatus.CREATED, data: { access_token: 'token-123' } };
    handleGetTokenAfterAppSwitchResponse({ response });
    expect(mocks.setAccessToken).not.toHaveBeenCalled();
    expect(balanceMocks.updateBalance).not.toHaveBeenCalled();
    expect(loaderMocks.hide).toHaveBeenCalledTimes(1);
  });

  it('logs a warning and does not call setAccessToken when success is false', () => {
    const { handleGetTokenAfterAppSwitchResponse } = useRequestCallback();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const response = { success: false };
    handleGetTokenAfterAppSwitchResponse({ response });
    expect(warnSpy).toHaveBeenCalled();
    expect(mocks.setAccessToken).not.toHaveBeenCalled();
    expect(loaderMocks.hide).toHaveBeenCalledTimes(1);
  });

  it('calls resetBalance, resetAccessToken and emits SWITCH_TO_APPLICATION_OK when switchApp is true', () => {
    const { handleLogoutResponse } = useRequestCallback();
    const response = {};
    const appType = 'some-app';
    handleLogoutResponse({ response, additionalArgs: [true, appType] });
    expect(balanceMocks.zeroBalanceOnCashOutOrSwitchApp.value).toBe(true);
    expect(mocks.resetBalance).toHaveBeenCalledTimes(1);
    expect(mocks.resetAccessToken).toHaveBeenCalledTimes(1);
    expect(emitterMock.emit).toHaveBeenCalledWith(EventBusTypes.SWITCH_TO_APPLICATION_OK, appType);
  });

  it('calls resetBalance and resetAccessToken and does not emit when switchApp is false', () => {
    const { handleLogoutResponse } = useRequestCallback();
    handleLogoutResponse({ response: {}, additionalArgs: [false, 'ignored'] });
    expect(balanceMocks.zeroBalanceOnCashOutOrSwitchApp.value).toBe(false);
    expect(mocks.resetBalance).toHaveBeenCalledTimes(1);
    expect(mocks.resetAccessToken).toHaveBeenCalledTimes(1);
    expect(emitterMock.emit).not.toHaveBeenCalled();
  });

  it('calls setAccessToken with token and updates balance when getTokenResponseForBalance succeeds', () => {
    const { getTokenResponseForBalance } = useRequestCallback();
    const response = { success: true, status: HttpStatus.OK, data: { access_token: 'token-xyz' } };
    getTokenResponseForBalance({ response, additionalArgs: [true] });
    expect(mocks.setAccessToken).toHaveBeenCalledWith('token-xyz');
    expect(balanceMocks.updateBalance).toHaveBeenCalledWith({ triggerPlaceBetToSessionIM: true });
  });

  it('sets zero balance, hides loader, emits TRIGGER_LOGOUT and updates balance on successful cashout', () => {
    const { handleCashoutResponse } = useRequestCallback();
    const response = { success: true, status: 200, data: {} };
    handleCashoutResponse({ response, additionalArgs: [true] });
    expect(balanceMocks.zeroBalanceOnCashOutOrSwitchApp.value).toBe(true);
    expect(emitterMock.emit).toHaveBeenCalledWith(EventBusTypes.TRIGGER_LOGOUT, {
      switchApp: true,
    });
    expect(balanceMocks.updateBalance).toHaveBeenCalledTimes(1);
  });

  it('stores the refreshed token object and retries find winnings', () => {
    const { handleGetAccessTokenResponse } = useRequestCallback();
    const response = { success: true, data: { access_token: 'token-xyz' } };

    handleGetAccessTokenResponse({ response, additionalArgs: ['barcode-123'] });

    expect(mocks.setAccessToken).toHaveBeenCalledWith({ accessToken: 'token-xyz' });
    expect(findWinningsMocks.doFindWinnings).toHaveBeenCalledWith('barcode-123');
  });
});
