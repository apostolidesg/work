import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { useCmsConfigPolling } from '@/composables/useCmsConfigPolling';

vi.mock('@/util/configLoader', () => ({
  getElectronEnv: vi.fn(() => Promise.resolve('mockEnv')),
}));

const initConfigurationMock = vi.fn(() => Promise.resolve());
const isIdleRef = ref(true);

vi.mock('@/composables/useConfiguration', () => ({
  useConfiguration: () => ({
    initConfiguration: initConfigurationMock,
  }),
}));

vi.mock('@/composables/useSession', () => ({
  useSession: () => ({
    isIdle: isIdleRef,
  }),
}));

describe('useCmsConfigPolling', () => {
  let timers;

  beforeEach(() => {
    timers = vi.useFakeTimers();
    initConfigurationMock.mockClear();
    isIdleRef.value = true;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should call initConfiguration after interval when idle', async () => {
    mount({
      template: '<div />',
      setup() {
        useCmsConfigPolling();
      },
    });
    timers.advanceTimersByTime(1000 * 60 * 60);
    await nextTick();
    await Promise.resolve();
    await Promise.resolve();
    expect(initConfigurationMock).toHaveBeenCalledWith('mockEnv');
  });

  it('should queue call if not idle and execute when idle becomes true', async () => {
    isIdleRef.value = false;
    mount({
      template: '<div />',
      setup() {
        useCmsConfigPolling();
      },
    });
    timers.advanceTimersByTime(1000 * 60 * 60);
    await nextTick();
    await Promise.resolve();
    expect(initConfigurationMock).not.toHaveBeenCalled();

    isIdleRef.value = true;
    await nextTick();
    await Promise.resolve();
    expect(initConfigurationMock).toHaveBeenCalledWith('mockEnv');
  });
});
