import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AnimatedGiftIcon from '@/components/base/AnimatedGiftIcon.vue';

describe('AnimatedGiftIcon', () => {
  it('has correct default aria-label', () => {
    const wrapper = mount(AnimatedGiftIcon);

    expect(wrapper.find('[role="img"]').attributes('aria-label')).toBe('Gift reward');
  });

  it('accepts custom aria-label', () => {
    const wrapper = mount(AnimatedGiftIcon, {
      props: {
        ariaLabel: 'Special gift for you',
      },
    });

    expect(wrapper.find('[role="img"]').attributes('aria-label')).toBe('Special gift for you');
  });

  describe('size prop', () => {
    it('applies small size classes', () => {
      const wrapper = mount(AnimatedGiftIcon, {
        props: { size: 'sm' },
      });

      const container = wrapper.find('[role="img"]');
      expect(container.classes()).toContain('atw:h-10');
      expect(container.classes()).toContain('atw:w-10');
    });

    it('applies medium size classes (default)', () => {
      const wrapper = mount(AnimatedGiftIcon, {
        props: { size: 'md' },
      });

      const container = wrapper.find('[role="img"]');
      expect(container.classes()).toContain('atw:h-12');
      expect(container.classes()).toContain('atw:w-12');
    });

    it('applies large size classes', () => {
      const wrapper = mount(AnimatedGiftIcon, {
        props: { size: 'lg' },
      });

      const container = wrapper.find('[role="img"]');
      expect(container.classes()).toContain('atw:h-[120px]');
      expect(container.classes()).toContain('atw:w-[120px]');
    });
  });

  describe('showPing prop', () => {
    it('hides ping animation when showPing is false', () => {
      const wrapper = mount(AnimatedGiftIcon, {
        props: { showPing: false },
      });

      const ping = wrapper.find('.animate-\\[ping_2s_ease-out_infinite\\]');
      expect(ping.exists()).toBe(false);
    });
  });
});
