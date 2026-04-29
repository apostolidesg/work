import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { useFortuneCookie } from '@/composables/useFortuneCookie';
import * as useConfigTextModule from '@/composables/useConfigText';
import * as useLobbyPromoConfigModule from '@/composables/useLobbyPromoConfig';
import * as fortuneConfig from '@/config/fortuneCookieConfig';

vi.mock('@/composables/useConfigText');
vi.mock('@/composables/useLobbyPromoConfig');
vi.mock('@/util/resolveBackgroundImage', () => ({ default: (val) => val }));
vi.mock('@/assets/images/cookieBG.jpg', () => ({ default: 'mock-bg.jpg' }));

describe('useFortuneCookie', () => {
  let mockTConfig;
  let mockHorizontalJackpot;
  let mockEmit;
  let mockProps;
  let mockRefs;

  // Helper function to create a test wrapper component
  const createWrapper = (props = {}, emit = vi.fn(), refs = {}) => {
    return mount({
      setup() {
        return useFortuneCookie(props, emit, refs);
      },
      template: '<div></div>',
    });
  };

  beforeEach(() => {
    vi.useFakeTimers();
    mockTConfig = vi.fn((key, params, fallback) => fallback || key);
    vi.spyOn(useConfigTextModule, 'useConfigText').mockReturnValue({ tConfig: mockTConfig });

    mockHorizontalJackpot = ref({
      LOTTO: { PROMOTION: { DESCRIPTION: 'Lotto Desc', MESSAGES: ['Fortune 1'] } },
    });
    vi.spyOn(useLobbyPromoConfigModule, 'useLobbyPromoConfig').mockReturnValue({
      horizontalJackpot: mockHorizontalJackpot,
      resolveAsset: vi.fn((val) => val),
    });
    vi.spyOn(useLobbyPromoConfigModule, 'getGameKey').mockImplementation((val) => val);

    mockEmit = vi.fn();
    mockProps = { gameType: 'LOTTO', disabled: false };
    mockRefs = {
      cookieButtonRef: ref({ focus: vi.fn() }),
      numbersDisplayRef: ref({ focus: vi.fn() }),
      retryButtonRef: ref({ focus: vi.fn() }),
      liveRegionRef: ref(null),
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should initialize with default states', () => {
    const wrapper = createWrapper(mockProps, mockEmit, mockRefs);
    const { isCracked, isAnimating, announcement } = wrapper.vm;

    expect(isCracked).toBe(false);
    expect(isAnimating).toBe(false);
    expect(announcement).toBe('');

    wrapper.unmount();
  });

  it('should reset state on handleReset', async () => {
    const wrapper = createWrapper(mockProps, mockEmit, mockRefs);
    const { handleCrackCookie, handleReset, isCracked, mainNumbers } = wrapper.vm;

    handleCrackCookie();
    vi.runAllTimers();
    await nextTick();

    handleReset();
    await nextTick();

    expect(isCracked).toBe(false);
    expect(mainNumbers).toEqual([]);

    await nextTick();
    expect(mockRefs.cookieButtonRef.value.focus).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should prevent cracking when disabled', () => {
    const disabledProps = { ...mockProps, disabled: true };
    const wrapper = createWrapper(disabledProps, mockEmit, mockRefs);
    const { handleCrackCookie, isCracked } = wrapper.vm;

    handleCrackCookie();
    expect(isCracked).toBe(false);

    wrapper.unmount();
  });

  it('should clean up timers on unmount', () => {
    const wrapper = createWrapper(mockProps, mockEmit, mockRefs);
    const { handleCrackCookie } = wrapper.vm;

    handleCrackCookie();

    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    wrapper.unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
