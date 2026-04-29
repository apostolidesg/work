import { describe, it, expect } from 'vitest';
import { mount } from '../../testUtils';
import HeaderLogo from '@/components/header/HeaderLogo.vue';

describe('HeaderLogo', () => {
  const defaultProps = {
    logoSrc: '/test-logo.svg',
  };
  it('has correct accessibility attributes', () => {
    const wrapper = mount(HeaderLogo, {
      props: defaultProps,
    });

    const button = wrapper.find('button');
    expect(button.attributes('aria-label')).toBe('Go to home');
    expect(button.attributes('type')).toBe('button');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(HeaderLogo, {
      props: defaultProps,
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('has loading and decoding attributes for performance', () => {
    const wrapper = mount(HeaderLogo, {
      props: defaultProps,
    });

    const img = wrapper.find('img');
    expect(img.attributes('loading')).toBe('lazy');
    expect(img.attributes('decoding')).toBe('async');
  });
});
