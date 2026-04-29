import { describe, it, beforeEach, afterEach, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

vi.mock('@/composables/useSession', () => {
  let isZeroBalance = true;
  let accessToken = null;
  const useSession = () => ({
    isZeroBalance: {
      get value() {
        return isZeroBalance;
      },
    },
    accessToken: {
      get value() {
        return accessToken;
      },
    },
  });
  const __setSession = (zeroBalance, token) => {
    isZeroBalance = zeroBalance;
    accessToken = token;
  };
  return { useSession, __setSession };
});

vi.mock('@/util/eventBus', () => {
  return {
    default: { emit: vi.fn() },
  };
});

vi.mock('@/util/handler/EventSenderService', () => {
  return {
    default: { sendAsyncRequest: vi.fn(), sendSyncRequest: vi.fn() },
  };
});

vi.mock('@/constants/EventBusTypes', () => {
  return {
    default: {
      TRIGGER_LOGOUT: 'TRIGGER_LOGOUT',
      BARCODE_STATUS_CHANGE: 'BARCODE_STATUS_CHANGE',
    },
  };
});

vi.mock('@/util/handler/EventTypes', () => {
  return {
    default: {
      SWITCH_APPLICATION_ACK: 'SWITCH_APPLICATION_ACK',
      HAL_INITIALIZED_EVENT_TYPE: 'HAL_INITIALIZED_EVENT_TYPE',
      PRINTER_STATUS_EVENT_TYPE: 'PRINTER_STATUS_EVENT_TYPE',
    },
  };
});

vi.mock('@/composables/useAuth', () => {
  const logOut = vi.fn();
  return {
    useAuth: () => ({ logOut }),
    __mockLogOut: logOut,
  };
});

vi.mock('@/composables/useRequestCallback', () => {
  const handleLogoutResponse = vi.fn();
  return {
    useRequestCallback: () => ({ handleLogoutResponse }),
    __mockHandleLogoutResponse: handleLogoutResponse,
  };
});

vi.mock('@/composables/useBalance', () => {
  const cashOut = vi.fn();
  return {
    useBalance: () => ({ cashOut }),
    __mockCashOut: cashOut,
  };
});

vi.mock('@/util/configLoader', () => {
  return {
    to: async (p) => {
      try {
        const res = await p;
        return [null, res];
      } catch (e) {
        return [e, null];
      }
    },
  };
});

vi.mock('@unify/vuex-i18n', () => ({
  useI18nPlugin: () => ({
    locale: () => 'en',
  }),
}));

vi.mock('@/composables/useModalService', () => {
  const info = vi.fn();
  return { useModalService: () => ({ info }), __mockInfo: info };
});

import HALApplicationTypes from '@/constants/HALApplicationTypes';
import { useEventBusCallback } from '@/composables/useEventBusCallback';
import emitter from '@/util/eventBus';
import EventSenderService from '@/util/handler/EventSenderService';
import EventBusTypes from '@/constants/EventBusTypes';
import EventTypes from '@/util/handler/EventTypes';
import { __setSession } from '@/composables/useSession';
import { __mockLogOut as logOutMock } from '@/composables/useAuth';
import { __mockHandleLogoutResponse as handleLogoutResponseMock } from '@/composables/useRequestCallback';
import { __mockCashOut as cashOutMock } from '@/composables/useBalance';
import { __mockInfo as infoMock } from '@/composables/useModalService';

const getComposables = () => {
  const wrapper = mount(
    {
      template: '<div />',
      setup() {
        return useEventBusCallback();
      },
    },
    {
      global: {
        provide: {
          store: {},
        },
      },
    }
  );
  return wrapper.vm;
};

describe('useEventBusCallback composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    __setSession(true, null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('emits TRIGGER_LOGOUT when canTriggerLogOut is true (isZeroBalance false)', () => {
    __setSession(false, null);

    const { switchApplication } = getComposables();
    const payload = { foo: 'bar' };

    switchApplication(payload);

    expect(emitter.emit).toHaveBeenCalledTimes(1);
    expect(emitter.emit).toHaveBeenCalledWith(EventBusTypes.TRIGGER_LOGOUT, {
      switchApp: true,
      applicationType: payload,
    });
    expect(EventSenderService.sendAsyncRequest).not.toHaveBeenCalled();
  });

  it('calls EventSenderService.sendAsyncRequest when canTriggerLogOut is false (zero balance and no access token)', () => {
    __setSession(true, null);

    const { switchApplication } = getComposables();
    const payload = { baz: 'qux' };

    switchApplication(payload);

    expect(EventSenderService.sendAsyncRequest).toHaveBeenCalledTimes(1);
    expect(EventSenderService.sendAsyncRequest).toHaveBeenCalledWith(EventTypes.SWITCH_APPLICATION_ACK, payload);
    expect(emitter.emit).not.toHaveBeenCalled();
  });

  it('emits TRIGGER_LOGOUT when accessToken is present', () => {
    __setSession(true, 'token-123');

    const { switchApplication } = getComposables();
    const payload = { x: 1 };

    switchApplication(payload);

    expect(emitter.emit).toHaveBeenCalledWith(EventBusTypes.TRIGGER_LOGOUT, {
      switchApp: true,
      applicationType: payload,
    });
    expect(EventSenderService.sendAsyncRequest).not.toHaveBeenCalled();
  });

  it('triggerLogOut calls logOut when accessToken is present', () => {
    __setSession(true, 'token-123');

    const { triggerLogOut } = getComposables();
    triggerLogOut({ switchApp: true, applicationType: HALApplicationTypes.SPORTS });

    expect(logOutMock).toHaveBeenCalledWith('token-123', true, HALApplicationTypes.SPORTS);
    expect(handleLogoutResponseMock).not.toHaveBeenCalled();
  });

  it('triggerLogOut calls handleLogoutResponse when accessToken is absent', () => {
    __setSession(true, null);

    const { triggerLogOut } = getComposables();
    triggerLogOut({ switchApp: false, applicationType: HALApplicationTypes.SPORTS });

    expect(handleLogoutResponseMock).toHaveBeenCalledWith({
      response: null,
      additionalArgs: [false, HALApplicationTypes.SPORTS],
    });
    expect(logOutMock).not.toHaveBeenCalled();
  });

  it('doCashout shows technical problem modal when HAL not connected and still calls cashOut', async () => {
    EventSenderService.sendSyncRequest
      .mockImplementationOnce(() => Promise.resolve(false)) // HAL
      .mockImplementationOnce(() => Promise.resolve(0)) // BCR status
      .mockImplementationOnce(() => Promise.resolve(true)); // printer ok

    const { doCashout } = getComposables();
    await doCashout(true);

    expect(infoMock).toHaveBeenCalledTimes(1);
    expect(emitter.emit).toHaveBeenCalledWith(EventBusTypes.BARCODE_STATUS_CHANGE, 0);
    expect(cashOutMock).toHaveBeenCalledWith(true);
  });

  it('doCashout shows printer error modal when printer status invalid and still calls cashOut', async () => {
    EventSenderService.sendSyncRequest
      .mockImplementationOnce(() => Promise.resolve(true)) // HAL
      .mockImplementationOnce(() => Promise.resolve(false)); // printer invalid

    const { doCashout } = getComposables();
    await doCashout(false);

    expect(infoMock).toHaveBeenCalledTimes(1);
    expect(cashOutMock).toHaveBeenCalledWith(false);
  });
});
