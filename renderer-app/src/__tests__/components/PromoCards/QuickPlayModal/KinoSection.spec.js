import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import KinoSection from '../../../../components/PromoCards/QuickPlayModal/KinoSection.vue';

const defaultProps = {
  kinoNumbers: [3, 12, 25, 36, 47, 60],
  selectedKinoNumber: 0.5,
  kinoNumberOptions: [0.5, 1.0, 2.0],
};

const global = {
  mocks: {
    $t: (key) => key,
  },
  stubs: {
    Transition: { template: '<div><slot /></div>' },
  },
};

describe('KinoSection', () => {
  it('renders the kino logo', () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    expect(wrapper.find('img[alt="KINO"]').exists()).toBe(true);
  });

  it('renders the toggle button with aria-checked="false" by default', () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    const toggle = wrapper.find('[role="switch"]');
    expect(toggle.attributes('aria-checked')).toBe('false');
    expect(toggle.classes()).toContain('kino-section__toggle--off');
  });

  it('toggles aria-checked to "true" and applies --on class when clicked', async () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    await wrapper.find('[role="switch"]').trigger('click');
    const toggle = wrapper.find('[role="switch"]');
    expect(toggle.attributes('aria-checked')).toBe('true');
    expect(toggle.classes()).toContain('kino-section__toggle--on');
  });

  it('toggles aria-checked back to "false" when clicked twice', async () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    const toggle = wrapper.find('[role="switch"]');
    await toggle.trigger('click');
    await toggle.trigger('click');
    expect(toggle.attributes('aria-checked')).toBe('false');
    expect(toggle.classes()).toContain('kino-section__toggle--off');
  });

  it('does not show the kino panel by default', () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    expect(wrapper.find('.kino-section__panel').exists()).toBe(false);
  });

  it('shows the kino panel after toggle is clicked', async () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    await wrapper.find('[role="switch"]').trigger('click');
    expect(wrapper.find('.kino-section__panel').exists()).toBe(true);
  });

  it('hides the kino panel after toggle is clicked twice', async () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    const toggle = wrapper.find('[role="switch"]');
    await toggle.trigger('click');
    await toggle.trigger('click');
    expect(wrapper.find('.kino-section__panel').exists()).toBe(false);
  });

  it('renders kino numbers when panel is visible', async () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    await wrapper.find('[role="switch"]').trigger('click');
    const numbers = wrapper.findAll('.kino-section__number');
    expect(numbers).toHaveLength(defaultProps.kinoNumbers.length);
    defaultProps.kinoNumbers.forEach((num, i) => {
      expect(numbers[i].text()).toBe(String(num));
    });
  });

  it('renders price buttons when panel is visible', async () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    await wrapper.find('[role="switch"]').trigger('click');
    const btns = wrapper.findAll('.kino-section__price-btn');
    expect(btns).toHaveLength(defaultProps.kinoNumberOptions.length);
  });

  it('marks the active price button correctly', async () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    await wrapper.find('[role="switch"]').trigger('click');
    const btns = wrapper.findAll('.kino-section__price-btn');
    expect(btns[0].classes()).toContain('kino-section__price-btn--active');
    expect(btns[1].classes()).toContain('kino-section__price-btn--inactive');
  });

  it('emits update:selectedKinoNumber with the selected price when a price button is clicked', async () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    await wrapper.find('[role="switch"]').trigger('click');
    const btns = wrapper.findAll('.kino-section__price-btn');
    await btns[1].trigger('click');
    expect(wrapper.emitted('update:selectedKinoNumber')).toBeTruthy();
    expect(wrapper.emitted('update:selectedKinoNumber')[0]).toEqual([1.0]);
  });

  it('sets aria-pressed correctly on price buttons', async () => {
    const wrapper = mount(KinoSection, { props: defaultProps, global });
    await wrapper.find('[role="switch"]').trigger('click');
    const btns = wrapper.findAll('.kino-section__price-btn');
    expect(btns[0].attributes('aria-pressed')).toBe('true');
    expect(btns[1].attributes('aria-pressed')).toBe('false');
  });
});
