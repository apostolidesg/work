import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconButton from '@/components/base/IconButton.vue';

describe('IconButton', () => {
  const defaultProps = {
    ariaLabel: 'Close',
  };

  it('renders slot content when provided', () => {
    const wrapper = mount(IconButton, {
      props: defaultProps,
      slots: {
        default: '<span>Custom Content</span>',
      },
    });

    expect(wrapper.html()).toContain('Custom Content');
  });

  it('has required aria-label', () => {
    const wrapper = mount(IconButton, {
      props: {
        ariaLabel: 'Delete item',
      },
    });

    expect(wrapper.attributes('aria-label')).toBe('Delete item');
  });

  describe('size prop', () => {
    it('applies small size classes', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          size: 'sm',
        },
      });

      expect(wrapper.classes()).toContain('atw:w-8');
      expect(wrapper.classes()).toContain('atw:h-8');
    });

    it('applies medium size classes (default)', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          size: 'md',
        },
      });

      expect(wrapper.classes()).toContain('atw:w-10');
      expect(wrapper.classes()).toContain('atw:h-10');
    });

    it('applies large size classes', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          size: 'lg',
        },
      });

      expect(wrapper.classes()).toContain('atw:w-12');
      expect(wrapper.classes()).toContain('atw:h-12');
    });
  });

  describe('variant prop', () => {
    it('applies default variant classes', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          variant: 'default',
        },
      });

      expect(wrapper.classes()).toContain('atw:bg-[#F5F5F5]');
      expect(wrapper.classes()).toContain('atw:border-2');
    });

    it('applies ghost variant classes', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          variant: 'ghost',
        },
      });

      expect(wrapper.classes()).toContain('atw:bg-transparent');
    });

    it('applies primary variant classes', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          variant: 'primary',
        },
      });

      expect(wrapper.classes()).toContain('atw:bg-[#1D4757]');
      expect(wrapper.classes()).toContain('atw:text-white');
    });
  });

  describe('ARIA attributes', () => {
    it('sets aria-pressed when provided', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          ariaPressed: true,
        },
      });

      expect(wrapper.attributes('aria-pressed')).toBe('true');
    });

    it('sets aria-expanded when provided', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          ariaExpanded: true,
        },
      });

      expect(wrapper.attributes('aria-expanded')).toBe('true');
    });

    it('sets aria-controls when provided', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          ariaControls: 'menu-dropdown',
        },
      });

      expect(wrapper.attributes('aria-controls')).toBe('menu-dropdown');
    });

    it('sets aria-haspopup when provided', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          ariaHaspopup: 'menu',
        },
      });

      expect(wrapper.attributes('aria-haspopup')).toBe('menu');
    });
  });

  describe('disabled state', () => {
    it('is enabled by default', () => {
      const wrapper = mount(IconButton, {
        props: defaultProps,
      });

      expect(wrapper.attributes('disabled')).toBeUndefined();
    });

    it('applies disabled attribute', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          disabled: true,
        },
      });

      expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('applies disabled styles', () => {
      const wrapper = mount(IconButton, {
        props: {
          ...defaultProps,
          disabled: true,
        },
      });

      expect(wrapper.classes()).toContain('atw:cursor-not-allowed');
      expect(wrapper.classes()).toContain('atw:opacity-50');
    });
  });

  it('emits click event', async () => {
    const wrapper = mount(IconButton, {
      props: defaultProps,
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('has correct default type', () => {
    const wrapper = mount(IconButton, {
      props: defaultProps,
    });

    expect(wrapper.attributes('type')).toBe('button');
  });

  it('is a rounded button', () => {
    const wrapper = mount(IconButton, {
      props: defaultProps,
    });

    expect(wrapper.classes()).toContain('atw:rounded-full');
  });

  it('has focus-visible outline', () => {
    const wrapper = mount(IconButton, {
      props: defaultProps,
    });

    expect(wrapper.classes()).toContain('atw:focus-visible:outline');
  });
});
