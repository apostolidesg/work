import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import FortuneCookieCard from '../../../../components/PromoCards/FortuneCookie/FortuneCookieCard.vue';
import FortuneCookieButton from '../../../../components/PromoCards/FortuneCookie/FortuneCookieButton.vue';
import FortuneCookieCracked from '../../../../components/PromoCards/FortuneCookie/FortuneCookieCracked.vue';
import FortuneNumbersDisplay from '../../../../components/PromoCards/FortuneCookie/FortuneNumbersDisplay.vue';
import FortuneRetryButton from '../../../../components/PromoCards/FortuneCookie/FortuneRetryButton.vue';

vi.mock('../../../../composables/useLobbyPromoConfig', () => ({
  useLobbyPromoConfig: () => ({
    horizontalJackpot: { value: {} },
    resolveAsset: vi.fn((img) => img),
  }),
  getGameKey: vi.fn((id) => id),
}));

vi.mock('../../../../composables/useConfigText', () => ({
  useConfigText: () => ({
    tConfig: vi.fn((key) => key),
  }),
}));

describe('FortuneCookieCard', () => {
  let wrapper;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    wrapper?.unmount();
  });

  const createWrapper = (props = {}) => {
    return mount(FortuneCookieCard, {
      props: {
        gameType: 'tzoker',
        ...props,
      },
    });
  };

  it('renders logo image', () => {
    wrapper = createWrapper();
    expect(wrapper.find('img').exists()).toBe(true);
  });

  it('shows fortune cookie button initially', () => {
    wrapper = createWrapper();
    expect(wrapper.findComponent(FortuneCookieButton).exists()).toBe(true);
    expect(wrapper.findComponent(FortuneCookieCracked).exists()).toBe(false);
  });

  it('shows cracked cookie after clicking button', async () => {
    wrapper = createWrapper();
    await wrapper.findComponent(FortuneCookieButton).vm.$emit('crack');
    await nextTick();

    expect(wrapper.findComponent(FortuneCookieCracked).exists()).toBe(true);
    expect(wrapper.findComponent(FortuneCookieButton).exists()).toBe(false);
  });

  it('generates and displays numbers after animation', async () => {
    wrapper = createWrapper();
    await wrapper.findComponent(FortuneCookieButton).vm.$emit('crack');

    vi.advanceTimersByTime(2000);
    await flushPromises();

    expect(wrapper.findComponent(FortuneNumbersDisplay).exists()).toBe(true);
  });

  it('shows retry button after numbers are displayed', async () => {
    wrapper = createWrapper();
    await wrapper.findComponent(FortuneCookieButton).vm.$emit('crack');

    vi.advanceTimersByTime(2000);
    await flushPromises();

    expect(wrapper.findComponent(FortuneRetryButton).exists()).toBe(true);
  });

  it('resets to initial state when retry clicked', async () => {
    wrapper = createWrapper();

    await wrapper.findComponent(FortuneCookieButton).vm.$emit('crack');
    vi.advanceTimersByTime(2000);
    await flushPromises();

    await wrapper.findComponent(FortuneRetryButton).vm.$emit('retry');
    await nextTick();

    expect(wrapper.findComponent(FortuneCookieButton).exists()).toBe(true);
    expect(wrapper.findComponent(FortuneCookieCracked).exists()).toBe(false);
  });

  it('emits submit-slip event with correct data', async () => {
    wrapper = createWrapper({ gameType: 'tzoker' });

    await wrapper.findComponent(FortuneCookieButton).vm.$emit('crack');
    vi.advanceTimersByTime(2000);
    await flushPromises();

    await wrapper.findComponent(FortuneNumbersDisplay).vm.$emit('submit');

    expect(wrapper.emitted('submit-slip')).toBeTruthy();
    const emittedData = wrapper.emitted('submit-slip')[0][0];
    expect(emittedData.gameType).toBe('tzoker');
    expect(Array.isArray(emittedData.mainNumbers)).toBe(true);
    expect(Array.isArray(emittedData.bonusNumbers)).toBe(true);
  });

  it('updates announcement for screen readers', async () => {
    wrapper = createWrapper();
    const liveRegion = wrapper.find('[aria-live="polite"]');
    expect(liveRegion.exists()).toBe(true);
  });

  it('sets aria-busy during animation', async () => {
    wrapper = createWrapper();
    const container = wrapper.find('[role="region"]');

    await wrapper.findComponent(FortuneCookieButton).vm.$emit('crack');
    await nextTick();

    expect(container.attributes('aria-busy')).toBe('true');
  });

  it('respects disabled prop', () => {
    wrapper = createWrapper({ disabled: true });
    const button = wrapper.findComponent(FortuneCookieButton);
    expect(button.props('disabled')).toBe(true);
  });

  it('validates gameType prop', () => {
    const validator = FortuneCookieCard.props.gameType.validator;
    expect(validator('tzoker')).toBe(true);
    expect(validator('EUROJACKPOT')).toBe(true);
    expect(validator('')).toBe(true);
  });

  it('resets state when gameType changes', async () => {
    wrapper = createWrapper({ gameType: 'tzoker' });

    await wrapper.findComponent(FortuneCookieButton).vm.$emit('crack');
    vi.advanceTimersByTime(2000);
    await flushPromises();

    await wrapper.setProps({ gameType: 'eurojackpot' });
    await nextTick();

    expect(wrapper.findComponent(FortuneCookieButton).exists()).toBe(true);
  });
});
