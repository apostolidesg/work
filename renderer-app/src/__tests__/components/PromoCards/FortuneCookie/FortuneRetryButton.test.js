import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FortuneRetryButton from '../../../../components/PromoCards/FortuneCookie/FortuneRetryButton.vue';

// Mock gaService
vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

import gaService from '@/services/gaService';
import gtmEvents from '@/constants/gtmEvents';

describe('FortuneRetryButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders button text', () => {
    const wrapper = mount(FortuneRetryButton, {
      props: { text: 'Try Again' },
    });
    expect(wrapper.text()).toBe('Try Again');
  });

  it('emits retry event on click', async () => {
    const wrapper = mount(FortuneRetryButton, {
      props: { text: 'Retry' },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('retry')).toHaveLength(1);
  });

  it('uses custom aria-label', () => {
    const label = 'Generate new numbers';
    const wrapper = mount(FortuneRetryButton, {
      props: { text: 'Retry', ariaLabel: label },
    });
    expect(wrapper.find('button').attributes('aria-label')).toBe(label);
  });

  it('exposes focus method', () => {
    const wrapper = mount(FortuneRetryButton, {
      props: { text: 'Retry' },
      attachTo: document.body,
    });
    const focusSpy = vi.spyOn(wrapper.vm.buttonRef, 'focus');
    wrapper.vm.focus();
    expect(focusSpy).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('has fade-in animation class', () => {
    const wrapper = mount(FortuneRetryButton, {
      props: { text: 'Retry' },
    });
    expect(wrapper.find('button').classes()).toContain('atw:animate-fortune-fade-in');
  });

  it('sends GA event on retry click', async () => {
    const wrapper = mount(FortuneRetryButton, {
      props: { text: 'Retry' },
    });
    await wrapper.find('button').trigger('click');

    expect(gaService.sendEvent).toHaveBeenCalledWith(gtmEvents.SSBT_DGE_APPLICATION_RETRY_COOKIE_CRACKED, {
      retry_cookie_clicked: true,
    });
    expect(gaService.sendEvent).toHaveBeenCalledTimes(1);
  });

  it('sends GA event and emits retry event together', async () => {
    const wrapper = mount(FortuneRetryButton, {
      props: { text: 'Retry' },
    });
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('retry')).toHaveLength(1);
    expect(gaService.sendEvent).toHaveBeenCalledWith(gtmEvents.SSBT_DGE_APPLICATION_RETRY_COOKIE_CRACKED, {
      retry_cookie_clicked: true,
    });
  });
});
