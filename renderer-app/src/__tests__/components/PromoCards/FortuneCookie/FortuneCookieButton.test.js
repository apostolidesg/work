import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FortuneCookieButton from '@/components/PromoCards/FortuneCookie/FortuneCookieButton.vue';
import { FORTUNE_COOKIE_STYLES } from '@/config/fortuneCookieConfig';

vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

vi.mock('@/constants/gtmEvents', () => ({
  default: {
    SSBT_DGE_APPLICATION_COOKIE_CRACKED: 'SSBT_DGE_APPLICATION_COOKIE_CRACKED',
  },
}));

describe('FortuneCookieButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with action text', () => {
    const wrapper = mount(FortuneCookieButton, {
      props: { actionText: 'Click Me!' },
    });
    expect(wrapper.text()).toContain('Click Me!');
  });

  it('emits crack and sends GA event on click', async () => {
    const { default: gaService } = await import('@/services/gaService');
    const wrapper = mount(FortuneCookieButton, {
      props: { actionText: 'Click' },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('crack')).toHaveLength(1);
    expect(gaService.sendEvent).toHaveBeenCalledWith('SSBT_DGE_APPLICATION_COOKIE_CRACKED', {
      cookie_cracked: true,
    });
  });

  it('emits crack on Enter key', async () => {
    const wrapper = mount(FortuneCookieButton, {
      props: { actionText: 'Click' },
    });
    await wrapper.find('button').trigger('keydown.enter');
    expect(wrapper.emitted('crack')).toHaveLength(1);
  });

  it('emits crack on Space key', async () => {
    const wrapper = mount(FortuneCookieButton, {
      props: { actionText: 'Click' },
    });
    await wrapper.find('button').trigger('keydown.space');
    expect(wrapper.emitted('crack')).toHaveLength(1);
  });

  it('disables button and updates cursor style when disabled prop is true', () => {
    const wrapper = mount(FortuneCookieButton, {
      props: { actionText: 'Click', disabled: true },
    });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
    expect(button.element.style.cursor).toBe('not-allowed');
  });

  it('applies pointer cursor when not disabled', () => {
    const wrapper = mount(FortuneCookieButton, {
      props: { actionText: 'Click', disabled: false },
    });
    expect(wrapper.find('button').element.style.cursor).toBe('pointer');
  });

  it('applies custom aria-label', () => {
    const label = 'Custom label';
    const wrapper = mount(FortuneCookieButton, {
      props: { actionText: 'Click', ariaLabel: label },
    });
    expect(wrapper.find('button').attributes('aria-label')).toBe(label);
  });

  it('exposes focus method', () => {
    const wrapper = mount(FortuneCookieButton, {
      props: { actionText: 'Click' },
      attachTo: document.body,
    });

    const focusSpy = vi.spyOn(wrapper.find('button').element, 'focus');

    wrapper.vm.focus();
    expect(focusSpy).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('applies styles from FORTUNE_COOKIE_STYLES', () => {
    const wrapper = mount(FortuneCookieButton, {
      props: { actionText: 'Test' },
    });
    const button = wrapper.find('button');
    expect(button.element.style.borderRadius).toBe(FORTUNE_COOKIE_STYLES.cookie.borderRadius);
  });
});
