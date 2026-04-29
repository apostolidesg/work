import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import AnimatedWheel from '@/components/PromoCards/AnimatedWheel.vue';

describe('AnimatedWheel', () => {
  it('renders with default size', () => {
    const wrapper = mount(AnimatedWheel);
    const img = wrapper.find('img');

    expect(img.attributes('width')).toBe('300');
    expect(img.attributes('height')).toBe('300');
  });

  it('uses provided src when available', () => {
    const wrapper = mount(AnimatedWheel, {
      props: { src: 'https://example.com/wheel.png' },
    });

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('https://example.com/wheel.png');
  });

  it('falls back to wheel-new.png when src is missing', () => {
    const wrapper = mount(AnimatedWheel);
    const img = wrapper.find('img');

    expect(img.attributes('src')).toContain('wheel-new.png');
  });

  it('swaps to fallback when image errors', async () => {
    const wrapper = mount(AnimatedWheel, {
      props: {
        src: 'https://example.com/broken.png',
        fallbackSrc: 'https://example.com/fallback.png',
      },
    });

    const img = wrapper.find('img');
    await img.trigger('error');

    expect(img.attributes('src')).toBe('https://example.com/fallback.png');
  });
});
