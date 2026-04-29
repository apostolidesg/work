import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '../../testUtils';
import ModeToggle from '@/components/header/ModeToggle.vue';

describe('ModeToggle', () => {
  beforeEach(() => {
    vi.mock('@unify/vuex-i18n', () => ({
      useI18nPlugin: () => ({
        translate: (key) => key,
      }),
    }));
  });

  it('renders both mode buttons', () => {
    const wrapper = mount(ModeToggle);

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(2);
  });

  it('displays translated labels for both options', () => {
    const wrapper = mount(ModeToggle);

    expect(wrapper.text()).toContain('mode.easy');
    expect(wrapper.text()).toContain('mode.pro');
  });

  it('emits update:modelValue when easy mode is clicked', async () => {
    const wrapper = mount(ModeToggle, {
      props: {
        modelValue: 'pro',
      },
    });

    const easyButton = wrapper.findAll('button')[0];
    await easyButton.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['easy']);
  });

  it('emits pro-mode-click when pro mode is clicked', async () => {
    const wrapper = mount(ModeToggle, {
      props: {
        modelValue: 'easy',
      },
    });

    const proButton = wrapper.findAll('button')[1];
    await proButton.trigger('click');

    expect(wrapper.emitted('pro-mode-click')).toBeTruthy();
    expect(wrapper.emitted('pro-mode-click')).toHaveLength(1);
  });

  it('does not emit update:modelValue for pro mode', async () => {
    const wrapper = mount(ModeToggle, {
      props: {
        modelValue: 'easy',
      },
    });

    const proButton = wrapper.findAll('button')[1];
    await proButton.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  describe('styling', () => {
    it('applies active classes to selected mode', () => {
      const wrapper = mount(ModeToggle, {
        props: {
          modelValue: 'easy',
        },
      });

      const easyButton = wrapper.findAll('button')[0];
      const proButton = wrapper.findAll('button')[1];

      expect(easyButton.classes()).toContain('mode-toggle__option--active');
      expect(proButton.classes()).toContain('mode-toggle__option--inactive');
    });

    it('applies inactive classes to non-selected mode', () => {
      const wrapper = mount(ModeToggle, {
        props: {
          modelValue: 'pro',
        },
      });

      const easyButton = wrapper.findAll('button')[0];
      const proButton = wrapper.findAll('button')[1];

      expect(easyButton.classes()).toContain('mode-toggle__option--inactive');
      expect(proButton.classes()).toContain('mode-toggle__option--active');
    });

    it('applies disabled classes when disabled prop is true', () => {
      const wrapper = mount(ModeToggle, {
        props: {
          disabled: true,
        },
      });

      const buttons = wrapper.findAll('button');
      buttons.forEach((button) => {
        expect(button.classes()).toContain('mode-toggle__option--disabled');
      });
    });
  });

  describe('accessibility', () => {
    it('has role="group" with aria-label', () => {
      const wrapper = mount(ModeToggle);

      const group = wrapper.find('[role="group"]');
      expect(group.exists()).toBe(true);
      expect(group.attributes('aria-label')).toBe('Mode selection');
    });

    it('buttons have aria-pressed attribute', () => {
      const wrapper = mount(ModeToggle, {
        props: {
          modelValue: 'easy',
        },
      });

      const easyButton = wrapper.findAll('button')[0];
      const proButton = wrapper.findAll('button')[1];

      expect(easyButton.attributes('aria-pressed')).toBe('true');
      expect(proButton.attributes('aria-pressed')).toBe('false');
    });

    it('all buttons have type="button"', () => {
      const wrapper = mount(ModeToggle);

      const buttons = wrapper.findAll('button');
      buttons.forEach((button) => {
        expect(button.attributes('type')).toBe('button');
      });
    });

    it('buttons have aria-label with mode name', () => {
      const wrapper = mount(ModeToggle);

      const easyButton = wrapper.findAll('button')[0];
      const proButton = wrapper.findAll('button')[1];

      expect(easyButton.attributes('aria-label')).toContain('mode.easy');
      expect(proButton.attributes('aria-label')).toContain('mode.pro');
    });
  });

  describe('default props', () => {
    it('defaults to easy mode', () => {
      const wrapper = mount(ModeToggle);

      const easyButton = wrapper.findAll('button')[0];
      expect(easyButton.classes()).toContain('mode-toggle__option--active');
    });

    it('defaults to not disabled', () => {
      const wrapper = mount(ModeToggle);

      const buttons = wrapper.findAll('button');
      buttons.forEach((button) => {
        expect(button.classes()).not.toContain('mode-toggle__option--disabled');
      });
    });
  });
});
