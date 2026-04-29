import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '../testUtils';
import SidebarLanguageItem from '@/components/SidebarLanguageItem.vue';

const i18nState = vi.hoisted(() => ({
  locale: 'el',
  set: vi.fn(),
}));

const popoverState = vi.hoisted(() => ({
  isOpen: null,
  close: vi.fn(),
}));

vi.mock('@unify/vuex-i18n', () => ({
  useI18nPlugin: () => ({
    locale: () => i18nState.locale,
    set: i18nState.set,
  }),
}));

vi.mock('@/assets/icons/Right.svg', () => ({ default: 'right.svg' }));
vi.mock('@/assets/icons/sidebarIcons/NavLanguageEl.png', () => ({ default: 'nav-language-el.png' }));
vi.mock('@/assets/icons/sidebarIcons/NavLanguageEn.png', () => ({ default: 'nav-language-en.png' }));

vi.mock('@/components/base/BasePopover.vue', async () => {
  const { defineComponent, h, ref } = await import('vue');

  popoverState.isOpen ??= ref(false);

  return {
    default: defineComponent({
      name: 'BasePopover',
      props: {
        placement: { type: String, default: 'bottom' },
        arrow: { type: Boolean, default: true },
      },
      setup(props, { slots }) {
        return () =>
          h(
            'div',
            {
              class: 'base-popover-stub',
              'data-placement': props.placement,
              'data-arrow': String(props.arrow),
            },
            [
              h('div', { class: 'base-popover-trigger' }, slots.default?.({ isOpen: popoverState.isOpen.value })),
              popoverState.isOpen.value
                ? h('div', { class: 'base-popover-content' }, slots.content?.({ close: popoverState.close }))
                : null,
            ]
          );
      },
    }),
  };
});

const mountComponent = (props = {}, { isOpen = false } = {}) => {
  popoverState.isOpen.value = isOpen;

  return mount(SidebarLanguageItem, {
    props: {
      expanded: true,
      ...props,
    },
  });
};

describe('SidebarLanguageItem', () => {
  let wrapper;

  beforeEach(() => {
    i18nState.locale = 'el';
    popoverState.isOpen.value = false;
    vi.clearAllMocks();
  });

  afterEach(() => {
    wrapper?.unmount();
    wrapper = null;
  });

  it('passes the expected props to BasePopover', () => {
    wrapper = mountComponent();

    const popover = wrapper.get('.base-popover-stub');
    expect(popover.attributes('data-placement')).toBe('right-end');
    expect(popover.attributes('data-arrow')).toBe('false');
  });

  it('renders the language button with the current locale icon', () => {
    i18nState.locale = 'en';
    wrapper = mountComponent({ expanded: false });

    expect(wrapper.get('#nav-language').exists()).toBe(true);
    expect(wrapper.find('.nav-item__icon img').attributes('src')).toBe('nav-language-en.png');
    expect(wrapper.find('.nav-item__label').exists()).toBe(false);
  });

  it('renders the expanded label and arrow icon when expanded is true', () => {
    wrapper = mountComponent({ expanded: true });

    expect(wrapper.find('.nav-item__label').exists()).toBe(true);
    expect(wrapper.text()).toContain('nav.language');
    expect(wrapper.find('img[src="right.svg"]').exists()).toBe(true);
  });

  it('applies the active class when the popover is open', async () => {
    wrapper = mountComponent();

    popoverState.isOpen.value = true;
    await nextTick();

    expect(wrapper.get('#nav-language').classes()).toContain('nav-item__button--active');
  });

  it('renders both language options and marks the current locale as selected', () => {
    i18nState.locale = 'en';
    wrapper = mountComponent({}, { isOpen: true });

    const options = wrapper.findAll('.language-menu__item');

    expect(options).toHaveLength(2);
    expect(options[0].text()).toContain('nav.languageEl');
    expect(options[1].text()).toContain('nav.languageEn');
    expect(options[0].classes()).not.toContain('language-menu__item--selected');
    expect(options[1].classes()).toContain('language-menu__item--selected');
  });

  it('falls back to Greek when the locale is empty', () => {
    i18nState.locale = '';
    wrapper = mountComponent({}, { isOpen: true });

    const options = wrapper.findAll('.language-menu__item');

    expect(wrapper.find('.nav-item__icon img').attributes('src')).toBe('nav-language-el.png');
    expect(options[0].classes()).toContain('language-menu__item--selected');
    expect(options[1].classes()).not.toContain('language-menu__item--selected');
  });

  it('sets a new locale and closes the popover when a different language is selected', async () => {
    i18nState.locale = 'el';
    wrapper = mountComponent({}, { isOpen: true });

    const [, englishOption] = wrapper.findAll('.language-menu__item');
    await englishOption.trigger('click');

    expect(i18nState.set).toHaveBeenCalledWith('en');
    expect(popoverState.close).toHaveBeenCalledTimes(1);
  });

  it('does not call i18n.set when the current language is selected again', async () => {
    i18nState.locale = 'en';
    wrapper = mountComponent({}, { isOpen: true });

    const [, englishOption] = wrapper.findAll('.language-menu__item');
    await englishOption.trigger('click');

    expect(i18nState.set).not.toHaveBeenCalled();
    expect(popoverState.close).toHaveBeenCalledTimes(1);
  });
});
