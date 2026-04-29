import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@/__tests__/testUtils';
import Constants from '@/util/Constants';
import WinningScreen from '@/components/modals/findWinnings/WinningScreen.vue';

const mocks = vi.hoisted(() => ({
  state: {
    isVertical: false,
  },
}));

vi.mock('@/composables/useOrientation', async () => {
  const { computed } = await vi.importActual('vue');

  return {
    useOrientation: () => ({
      isVertical: computed(() => mocks.state.isVertical),
    }),
  };
});

vi.mock('vue-loading-overlay', () => ({
  default: {
    name: 'Loading',
    props: ['active'],
    template: '<div class="loading-stub" :data-active="active" />',
  },
}));

vi.mock('@/config/loaderConfigs', () => ({
  FW_LOADING_CONFIG: {},
  FW_SPINNER_CONFIG: {},
}));

const createProps = (overrides = {}) => ({
  getNetAmount: '12.50',
  getGrossAmount: '15.00',
  getTaxAmount: '2.50',
  hasFutureDraws: false,
  isSpecialWinnings: false,
  isHighWinnings: false,
  isPrinterAvailable: true,
  canRollover: false,
  isRolloverAvailable: false,
  isRolloverAndReplayAvailable: false,
  canReplay: true,
  loadingDrawInfo: false,
  showTimeLeftToEnterTimeFrame: false,
  timeLeftToEnterTimeFrame: '00:45',
  shouldEnableCountdownComponent: false,
  isRolloverAndInsertBetslipToSessionAvailable: false,
  isInsertBetslipToSessionButtonDisabled: false,
  shouldDisplayButtons: true,
  loading: false,
  isSystem: false,
  gameType: Constants.GENERAL_GAME_TYPES.KINO,
  ...overrides,
});

const mountComponent = (overrides = {}) =>
  mount(WinningScreen, {
    props: createProps(overrides),
  });

const findButtonByText = (wrapper, text) => {
  const button = wrapper.findAll('button').find((candidate) => candidate.text().trim() === text);

  if (!button) {
    throw new Error('Button "' + text + '" not found');
  }

  return button;
};

beforeEach(() => {
  mocks.state.isVertical = false;
  vi.clearAllMocks();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('WinningScreen', () => {
  it('renders winning amounts and KINO styling for a supported game type', () => {
    const wrapper = mountComponent({
      gameType: Constants.GENERAL_GAME_TYPES.KINO,
    });

    expect(wrapper.text()).toContain('findWinnings.header.WON');
    expect(wrapper.text()).toContain('findWinnings.totalWon');
    expect(wrapper.text()).toContain('12.50');
    expect(wrapper.text()).toContain('15.00');
    expect(wrapper.text()).toContain('2.50');
    expect(wrapper.find('.fwCloseButton--KINO').exists()).toBe(true);
    expect(wrapper.find('.winnings-amount--KINO').exists()).toBe(true);
  });

  it('falls back to DEFAULT styling for an unknown game type', () => {
    const wrapper = mountComponent({
      gameType: 'UNKNOWN_GAME',
    });

    expect(wrapper.find('.fwCloseButton--DEFAULT').exists()).toBe(true);
    expect(wrapper.find('.find-winnings-header--DEFAULT').exists()).toBe(true);
  });

  it('shows the special winnings message and hides the normal totals block', () => {
    const wrapper = mountComponent({
      isSpecialWinnings: true,
    });

    expect(wrapper.text()).toContain(Constants.FIND_WINNINGS.MESSAGES.SPECIAL_WIN);
    expect(wrapper.text()).not.toContain('findWinnings.totalWon');
    expect(wrapper.find('.winnings-amount').exists()).toBe(false);
  });

  it('shows printer and system warnings when applicable', () => {
    const wrapper = mountComponent({
      isPrinterAvailable: false,
      canRollover: true,
      isSystem: true,
    });

    expect(wrapper.text()).toContain('findWinnings.rolloverPrinterError');
    expect(wrapper.text()).toContain('kinoSystemMessage');
  });

  it('emits close, rollover, rolloverAndReplay, and rolloverAddTicketToBucket from their buttons', async () => {
    const wrapper = mountComponent({
      canRollover: true,
      isRolloverAvailable: true,
      isRolloverAndReplayAvailable: true,
      isRolloverAndInsertBetslipToSessionAvailable: true,
      showTimeLeftToEnterTimeFrame: true,
    });

    await wrapper.find('.fwCloseButton').trigger('click');
    await findButtonByText(wrapper, 'rollover').trigger('click');
    await findButtonByText(wrapper, 'rolloverAndReplay').trigger('click');
    await findButtonByText(wrapper, 'addWagerToSession').trigger('click');

    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.emitted('rollover')).toHaveLength(1);
    expect(wrapper.emitted('rolloverAndReplay')).toHaveLength(1);
    expect(wrapper.emitted('rolloverAddTicketToBucket')).toHaveLength(1);
  });

  it('shows replay in landscape and emits replay when clicked', async () => {
    const wrapper = mountComponent({
      canReplay: true,
      isRolloverAvailable: false,
      isRolloverAndReplayAvailable: false,
    });

    await findButtonByText(wrapper, 'replayWager').trigger('click');

    expect(wrapper.emitted('replay')).toHaveLength(1);
  });

  it('hides the replay button in vertical mode', () => {
    mocks.state.isVertical = true;

    const wrapper = mountComponent({
      canReplay: true,
      isRolloverAvailable: false,
      isRolloverAndReplayAvailable: false,
    });

    expect(wrapper.text()).not.toContain('replayWager');
  });

  it('shows the add-to-session toast and disables the primary button when requested', () => {
    const wrapper = mountComponent({
      isRolloverAndInsertBetslipToSessionAvailable: true,
      showTimeLeftToEnterTimeFrame: true,
      timeLeftToEnterTimeFrame: '00:45',
      isInsertBetslipToSessionButtonDisabled: true,
    });

    expect(wrapper.text()).toContain('addBetslipToSessionAvailableIn');
    expect(wrapper.text()).toContain('00:45');
    expect(findButtonByText(wrapper, 'addWagerToSession').attributes('disabled')).toBeDefined();
  });
});
