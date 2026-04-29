import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HeaderDepositButton from '@/components/header/HeaderDepositButton.vue';

const translations = {
  'header.deposit': 'Κατάθεση',
};

const mountComponent = () =>
  mount(HeaderDepositButton, {
    global: {
      mocks: {
        $t: (key) => translations[key] ?? key,
      },
    },
  });

describe('Header Gift Banner', () => {
  it('renders a button element', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('has correct aria-label', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('button').attributes('aria-label')).toBe('Deposit');
  });

  it('renders the Greek deposit text', () => {
    const wrapper = mountComponent();
    expect(wrapper.text()).toContain('Κατάθεση');
  });

  it('renders the SVG icon', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('emits click event when button is clicked', async () => {
    const wrapper = mountComponent();
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('emits click only once per click', async () => {
    const wrapper = mountComponent();
    await wrapper.find('button').trigger('click');
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(2);
  });
});
