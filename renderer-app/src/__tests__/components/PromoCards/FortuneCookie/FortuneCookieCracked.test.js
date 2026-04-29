import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FortuneCookieCracked from '../../../../components/PromoCards/FortuneCookie/FortuneCookieCracked.vue';

describe('FortuneCookieCracked', () => {
  it('renders fortune message', () => {
    const message = 'Good luck awaits!';
    const wrapper = mount(FortuneCookieCracked, {
      props: { fortuneMessage: message },
    });
    expect(wrapper.text()).toContain(message);
  });

  it('has correct role attributes', () => {
    const wrapper = mount(FortuneCookieCracked, {
      props: { fortuneMessage: 'Test' },
    });
    const container = wrapper.find('[role="img"]');
    expect(container.exists()).toBe(true);
  });

  it('fortune paper has status role', () => {
    const wrapper = mount(FortuneCookieCracked, {
      props: { fortuneMessage: 'Test fortune' },
    });
    const statusEl = wrapper.find('[role="status"]');
    expect(statusEl.exists()).toBe(true);
  });

  it('computes aria labels correctly', () => {
    const message = 'Your destiny is bright';
    const wrapper = mount(FortuneCookieCracked, {
      props: { fortuneMessage: message },
    });
    const imgLabel = wrapper.find('[role="img"]').attributes('aria-label');
    expect(imgLabel).toContain(message);
  });

  it('renders cookie halves with animations', () => {
    const wrapper = mount(FortuneCookieCracked, {
      props: { fortuneMessage: 'Test' },
    });
    const leftHalf = wrapper.find('.atw\\:animate-cookie-crack-left');
    const rightHalf = wrapper.find('.atw\\:animate-cookie-crack-right');
    expect(leftHalf.exists()).toBe(true);
    expect(rightHalf.exists()).toBe(true);
  });
});
