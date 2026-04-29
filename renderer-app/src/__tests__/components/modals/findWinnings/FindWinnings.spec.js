import { flushPromises } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@/__tests__/testUtils';
import Constants from '@/util/Constants';
import EventBusTypes from '@/constants/EventBusTypes';
import FindWinnings from '@/components/modals/findWinnings/FindWinnings.vue';

const mocks = vi.hoisted(() => ({
  state: {
    routeName: 'lobby',
    isActiveLiveDrawScreen: false,
    registeredFindWinningsHandler: undefined,
    countdownOptions: undefined,
  },
  push: vi.fn(),
  getIsNotBetslipInSession: vi.fn(() => true),
  setNextDrawIdForImportedBetslip: vi.fn(),
  clearNextDrawIdForImportedBetslip: vi.fn(),
  disableLiveDrawScreen: vi.fn(),
  sendSyncRequest: vi.fn(),
  getNextDraw: vi.fn(),
  logToMainProcess: vi.fn(),
  emitterOn: vi.fn(),
  emitterOff: vi.fn(),
  emitterEmit: vi.fn(),
  countdownStart: vi.fn(),
  countdownStop: vi.fn(),
  createDrawCountdown: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mocks.push }),
  useRoute: () => ({
    get name() {
      return mocks.state.routeName;
    },
  }),
}));

vi.mock('@/composables/usePlayerSession', () => ({
  usePlayerSession: () => ({
    getIsNotBetslipInSession: {
      get value() {
        return mocks.getIsNotBetslipInSession;
      },
    },
    getIsActiveLiveDrawScreen: {
      get value() {
        return mocks.state.isActiveLiveDrawScreen;
      },
    },
    setNextDrawIdForImportedBetslip: mocks.setNextDrawIdForImportedBetslip,
    clearNextDrawIdForImportedBetslip: mocks.clearNextDrawIdForImportedBetslip,
    disableLiveDrawScreen: mocks.disableLiveDrawScreen,
  }),
}));

vi.mock('@/util/handler/EventSenderService', () => ({
  default: {
    sendSyncRequest: mocks.sendSyncRequest,
  },
}));

vi.mock('@/util/configLoader', () => ({
  to: async (promise) => {
    try {
      return [null, await promise];
    } catch (error) {
      return [error, undefined];
    }
  },
}));

vi.mock('@/util/LoggerService', () => ({
  logToMainProcess: mocks.logToMainProcess,
}));

vi.mock('@/util/NextDrawInfoService', () => ({
  default: {
    getNextDraw: mocks.getNextDraw,
  },
}));

vi.mock('@/util/eventBus', () => ({
  default: {
    on: (eventName, handler) => {
      if (eventName === 'FIND_WINNINGS_WAGER_DETAILS') {
        mocks.state.registeredFindWinningsHandler = handler;
      }
      mocks.emitterOn(eventName, handler);
    },
    off: (...args) => mocks.emitterOff(...args),
    emit: (...args) => mocks.emitterEmit(...args),
  },
}));

vi.mock('@/util/Utilities', () => ({
  default: {
    createDrawCountdown: (options) => {
      mocks.state.countdownOptions = options;
      mocks.createDrawCountdown(options);

      return {
        start: mocks.countdownStart,
        stop: mocks.countdownStop,
      };
    },
  },
}));

vi.mock('vue-loading-overlay', () => ({
  default: {
    name: 'Loading',
    props: ['active'],
    template: '<div class="loading-stub" />',
  },
}));

vi.mock('@/config/loaderConfigs', () => ({
  FW_LOADING_CONFIG: {},
  FW_SPINNER_CONFIG: {},
}));

vi.mock('@/components/modals/BaseModal.vue', () => ({
  default: {
    name: 'BaseModal',
    template: '<div class="base-modal-stub"><slot name="header" /><slot /><slot name="footer" /></div>',
  },
}));

vi.mock('@/components/base/IconButton.vue', () => ({
  default: {
    name: 'IconButton',
    emits: ['click'],
    template: '<button class="icon-button-stub" @click="$emit(\'click\')" />',
  },
}));

vi.mock('@/components/base/PrimaryButton.vue', () => ({
  default: {
    name: 'PrimaryButton',
    props: ['disabled'],
    emits: ['click'],
    template: '<button class="primary-button-stub" :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
  },
}));

vi.mock('@/components/modals/findWinnings/WinningScreen.vue', () => ({
  default: {
    name: 'WinningScreen',
    props: [
      'canReplay',
      'gameType',
      'isInsertBetslipToSessionButtonDisabled',
      'isSystem',
      'loadingDrawInfo',
      'shouldDisplayButtons',
      'timeLeftToEnterTimeFrame',
    ],
    emits: ['close', 'rollover', 'rollover-and-replay', 'replay', 'rollover-add-ticket-to-bucket'],
    template: '<div class="winning-screen-stub" />',
  },
}));

const buildPrizeCheck = (overrides = {}) => {
  const { ticketStatus: ticketStatusOverrides = {}, ...rootOverrides } = overrides;
  const { ticket: ticketOverrides = {}, ...restTicketStatusOverrides } = ticketStatusOverrides;

  return {
    isValid: true,
    error: null,
    ticketStatus: {
      tier: 'low',
      ...restTicketStatusOverrides,
      ticket: {
        status: Constants.FIND_WINNINGS.TICKET_STATUS.WON,
        gameType: Constants.GENERAL_GAME_TYPES.KINO,
        serialNumber: '123456789012',
        net: 12.5,
        gross: 15,
        tax: 2.5,
        remainingDraws: 1,
        ...ticketOverrides,
      },
    },
    ...rootOverrides,
  };
};

const mountComponent = (prizeCheck = buildPrizeCheck()) =>
  mount(FindWinnings, {
    props: { prizeCheck },
  });

const findPrimaryButton = (wrapper, text) => {
  const button = wrapper.findAll('.primary-button-stub').find((candidate) => candidate.text().includes(text));

  if (!button) {
    throw new Error('Button "' + text + '" not found');
  }

  return button;
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-04-15T12:00:00.000Z'));
  vi.clearAllMocks();

  mocks.state.registeredFindWinningsHandler = undefined;
  mocks.state.countdownOptions = undefined;
  mocks.state.routeName = Constants.ROUTE_NAMES.LOBBY;
  mocks.state.isActiveLiveDrawScreen = false;

  mocks.push.mockResolvedValue(undefined);
  mocks.getIsNotBetslipInSession.mockReturnValue(true);
  mocks.sendSyncRequest.mockResolvedValue(true);
  mocks.getNextDraw.mockResolvedValue({
    timeToNextDraw: Date.now() + 5 * 60 * 1000,
    nextDrawId: 42,
  });
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

describe('FindWinnings', () => {
  it('loads printer status, subscribes to wager details, requests the wager and fetches next draw on mount', async () => {
    const wrapper = mountComponent();

    await flushPromises();

    expect(mocks.sendSyncRequest).toHaveBeenCalledTimes(1);
    expect(mocks.emitterOn).toHaveBeenCalledWith(EventBusTypes.FIND_WINNINGS_WAGER_DETAILS, expect.any(Function));
    expect(mocks.emitterEmit).toHaveBeenCalledWith(EventBusTypes.GET_WAGER, {
      barcode: '123456789012',
      addWagerToPlayerBetslipSession: false,
      forFindWinnings: true,
    });
    expect(mocks.createDrawCountdown).toHaveBeenCalledTimes(1);
    expect(mocks.countdownStart).toHaveBeenCalledTimes(1);
    expect(mocks.clearNextDrawIdForImportedBetslip).toHaveBeenCalledTimes(1);
    expect(mocks.getNextDraw).toHaveBeenCalledWith(
      expect.objectContaining({
        gameType: Constants.GENERAL_GAME_TYPES.KINO,
      })
    );
    expect(mocks.setNextDrawIdForImportedBetslip).toHaveBeenCalledWith(42);

    wrapper.unmount();

    expect(mocks.emitterOff).toHaveBeenCalledWith(EventBusTypes.FIND_WINNINGS_WAGER_DETAILS);
    expect(mocks.countdownStop).toHaveBeenCalledTimes(1);
  });

  it('updates the rendered game type when wager details come back with a different game and marks system tickets', async () => {
    const wrapper = mountComponent();

    await flushPromises();

    mocks.state.registeredFindWinningsHandler({
      gameType: Constants.GENERAL_GAME_TYPES.POWERSPIN,
      kinoSystemEnabled: true,
    });

    await flushPromises();

    const winningScreen = wrapper.findComponent({ name: 'WinningScreen' });

    expect(winningScreen.props('gameType')).toBe(Constants.GENERAL_GAME_TYPES.POWERSPIN);
    expect(winningScreen.props('canReplay')).toBe(false);
    expect(mocks.getNextDraw).toHaveBeenCalledTimes(1);
    expect(mocks.getNextDraw).toHaveBeenLastCalledWith(
      expect.objectContaining({
        gameType: Constants.GENERAL_GAME_TYPES.KINO,
      })
    );
  });

  it('navigates to the mapped route on replay when opened from the lobby and closes the modal', async () => {
    mocks.state.isActiveLiveDrawScreen = true;

    const wrapper = mountComponent();

    await flushPromises();

    wrapper.findComponent({ name: 'WinningScreen' }).vm.$emit('replay');
    await flushPromises();

    expect(mocks.push).toHaveBeenCalledWith({
      name: Constants.ROUTE_NAMES.KINO,
      params: { wagerId: '123456789012' },
    });
    expect(mocks.disableLiveDrawScreen).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('enables add to session after the countdown enters the allowed window and routes the ticket import from the lobby', async () => {
    mocks.getNextDraw.mockResolvedValue({
      timeToNextDraw: Date.now() + 60 * 1000,
      nextDrawId: 77,
    });

    const wrapper = mountComponent(
      buildPrizeCheck({
        ticketStatus: {
          ticket: {
            status: Constants.FIND_WINNINGS.TICKET_STATUS.BLOCKED,
          },
        },
      })
    );

    await flushPromises();

    mocks.state.countdownOptions.onTick();
    await wrapper.vm.$nextTick();

    const addButton = findPrimaryButton(wrapper, 'addWagerToSession');

    expect(addButton.attributes('disabled')).toBeUndefined();

    await addButton.trigger('click');
    await flushPromises();

    expect(mocks.push).toHaveBeenCalledWith({
      name: Constants.ROUTE_NAMES.KINO,
      params: {
        addWagerToPlayerBetslipSession: true,
        wagerId: '123456789012',
      },
    });
    expect(wrapper.emitted('close')).toHaveLength(1);
  });
});
