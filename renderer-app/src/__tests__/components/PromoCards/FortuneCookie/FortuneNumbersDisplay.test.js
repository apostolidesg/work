import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FortuneNumbersDisplay from '../../../../components/PromoCards/FortuneCookie/FortuneNumbersDisplay.vue';
import FortuneNumberBall from '../../../../components/PromoCards/FortuneCookie/FortuneNumberBall.vue';

vi.mock('@/composables/useConfigText', () => ({
  useConfigText: () => ({
    tConfig: (key, params, fallback) => {
      const translations = {
        'promo.a11y.generatedLotteryNumbers': 'Generated lottery numbers',
        'promo.a11y.luckyNumbersWithBonus': `Lucky numbers: ${params?.numbers}. ${params?.bonusLabel}: ${params?.bonusNumbers}`,
        'promo.a11y.mainNumbers': `Main numbers: ${params?.numbers}`,
        'promo.a11y.bonusNumbers': `${params?.bonusLabel} numbers: ${params?.numbers}`,
      };
      return translations[key] || fallback || key;
    },
    locale: { value: 'el' },
  }),
}));

vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

import gaService from '@/services/gaService';

describe('FortuneNumbersDisplay', () => {
  const defaultProps = {
    mainNumbers: [5, 12, 23, 34, 45],
    gameType: 'tzoker',
    bonusLabel: 'Tzoker',
    title: 'Your Lucky Numbers',
    submitText: 'Play These Numbers',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders main numbers', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: defaultProps,
    });
    const balls = wrapper.findAllComponents(FortuneNumberBall);
    expect(balls.length).toBeGreaterThanOrEqual(5);
  });

  it('renders bonus numbers when provided', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: { ...defaultProps, bonusNumbers: [7, 9] },
    });
    const balls = wrapper.findAllComponents(FortuneNumberBall);
    expect(balls.length).toBe(7);
  });

  it('shows separator when bonus numbers exist', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: { ...defaultProps, bonusNumbers: [7] },
    });
    const separator = wrapper.find('[role="separator"]');
    expect(separator.exists()).toBe(true);
  });

  it('hides separator when no bonus numbers', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: { ...defaultProps, bonusNumbers: [] },
    });
    const separator = wrapper.find('[role="separator"]');
    expect(separator.exists()).toBe(false);
  });

  it('emits submit event when button clicked', async () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: defaultProps,
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('submit')).toHaveLength(1);
  });

  it('disables submit button when disabled prop is true', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: { ...defaultProps, disabled: true },
    });
    const button = wrapper.find('button');
    expect(button.element.disabled).toBe(true);
  });

  it('enables submit button when disabled prop is false', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: { ...defaultProps, disabled: false },
    });
    const button = wrapper.find('button');
    expect(button.element.disabled).toBe(false);
  });

  it('renders title text', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: defaultProps,
    });
    expect(wrapper.text()).toContain('Your Lucky Numbers');
  });

  it('exposes focus method that focuses the submit button', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: defaultProps,
      attachTo: document.body,
    });

    wrapper.vm.focus();

    const button = wrapper.find('button').element;
    expect(document.activeElement).toBe(button);

    wrapper.unmount();
  });

  it('renders custom submit aria label', () => {
    const customAriaLabel = 'Click to submit your lucky numbers';
    const wrapper = mount(FortuneNumbersDisplay, {
      props: { ...defaultProps, submitAriaLabel: customAriaLabel },
    });
    expect(wrapper.find('button').attributes('aria-label')).toBe(customAriaLabel);
  });

  it('uses default submit aria label when not provided', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: defaultProps,
    });
    expect(wrapper.find('button').attributes('aria-label')).toBe('Submit these numbers to play');
  });

  it('does not send GA event on mount', () => {
    mount(FortuneNumbersDisplay, {
      props: defaultProps,
    });
    expect(gaService.sendEvent).not.toHaveBeenCalled();
  });

  it('does not emit submit when button is disabled', async () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: { ...defaultProps, disabled: true },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('renders bonus label correctly', () => {
    const wrapper = mount(FortuneNumbersDisplay, {
      props: { ...defaultProps, bonusNumbers: [7], bonusLabel: 'Super Ball' },
    });
    expect(wrapper.text()).toContain('Super Ball');
  });
});
