import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PrimaryButton from '@/components/base/PrimaryButton.vue';

describe('PrimaryButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(PrimaryButton, {
      slots: {
        default: 'Click Me',
      },
    });

    expect(wrapper.text()).toBe('Click Me');
  });

  it('has correct default type', () => {
    const wrapper = mount(PrimaryButton);

    expect(wrapper.attributes('type')).toBe('button');
  });

  it('accepts custom type prop', () => {
    const wrapper = mount(PrimaryButton, {
      props: { type: 'submit' },
    });

    expect(wrapper.attributes('type')).toBe('submit');
  });

  describe('variant prop', () => {
    it('applies primary variant classes (default)', () => {
      const wrapper = mount(PrimaryButton, {
        props: { variant: 'primary' },
      });

      expect(wrapper.classes()).toContain('primary-button--primary');
    });

    it('applies secondary variant classes', () => {
      const wrapper = mount(PrimaryButton, {
        props: { variant: 'secondary' },
      });

      expect(wrapper.classes()).toContain('primary-button--secondary');
    });

    it('applies success variant classes', () => {
      const wrapper = mount(PrimaryButton, {
        props: { variant: 'success' },
      });

      expect(wrapper.classes()).toContain('primary-button--success');
    });

    it('applies ghost variant classes', () => {
      const wrapper = mount(PrimaryButton, {
        props: { variant: 'ghost' },
      });

      expect(wrapper.classes()).toContain('primary-button--ghost');
    });
  });

  describe('size prop', () => {
    it('applies small size classes', () => {
      const wrapper = mount(PrimaryButton, {
        props: { size: 'sm' },
      });

      expect(wrapper.classes()).toContain('primary-button--sm');
    });

    it('applies medium size classes (default)', () => {
      const wrapper = mount(PrimaryButton, {
        props: { size: 'md' },
      });

      expect(wrapper.classes()).toContain('primary-button--md');
    });

    it('applies large size classes', () => {
      const wrapper = mount(PrimaryButton, {
        props: { size: 'lg' },
      });

      expect(wrapper.classes()).toContain('primary-button--lg');
    });
  });

  describe('shape prop', () => {
    it('applies rounded shape (default)', () => {
      const wrapper = mount(PrimaryButton, {
        props: { shape: 'rounded' },
      });

      expect(wrapper.classes()).toContain('primary-button--rounded');
    });

    it('applies pill shape', () => {
      const wrapper = mount(PrimaryButton, {
        props: { shape: 'pill' },
      });

      expect(wrapper.classes()).toContain('primary-button--pill');
    });
  });

  describe('disabled state', () => {
    it('is enabled by default', () => {
      const wrapper = mount(PrimaryButton);

      expect(wrapper.attributes('disabled')).toBeUndefined();
      expect(wrapper.classes()).not.toContain('primary-button--disabled');
    });

    it('applies disabled attribute when disabled', () => {
      const wrapper = mount(PrimaryButton, {
        props: { disabled: true },
      });

      expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('applies disabled styles when disabled', () => {
      const wrapper = mount(PrimaryButton, {
        props: { disabled: true },
      });

      expect(wrapper.classes()).toContain('primary-button--disabled');
    });

    it('emits click event when enabled', async () => {
      const wrapper = mount(PrimaryButton);

      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });
  });

  it('has focus-visible outline classes', () => {
    const wrapper = mount(PrimaryButton);

    expect(wrapper.classes()).toContain('primary-button');
  });

  it('has transition classes', () => {
    const wrapper = mount(PrimaryButton);

    expect(wrapper.classes()).toContain('primary-button');
  });

  it('renders with icon and text', () => {
    const wrapper = mount(PrimaryButton, {
      slots: {
        default: '<span>Icon</span> <span>Text</span>',
      },
    });

    expect(wrapper.html()).toContain('<span>Icon</span>');
    expect(wrapper.html()).toContain('<span>Text</span>');
  });
});
