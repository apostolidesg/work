import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FortuneNumberBall from '../../../../components/PromoCards/FortuneCookie/FortuneNumberBall.vue';

describe('FortuneNumberBall', () => {
  it('renders number correctly', () => {
    const wrapper = mount(FortuneNumberBall, {
      props: { number: 42, index: 0 },
    });
    expect(wrapper.text()).toBe('42');
  });

  it('applies main variant classes by default', () => {
    const wrapper = mount(FortuneNumberBall, {
      props: { number: 5, index: 0 },
    });
    const classes = wrapper.classes().join(' ');
    expect(classes).toContain('atw:w-[28px]');
    expect(classes).toContain('atw:h-[28px]');
  });

  it('applies bonus variant classes', () => {
    const wrapper = mount(FortuneNumberBall, {
      props: { number: 10, index: 0, variant: 'bonus' },
    });
    const classes = wrapper.classes().join(' ');
    expect(classes).toContain('atw:w-[32px]');
    expect(classes).toContain('atw:h-[32px]');
  });

  it('has correct aria-label', () => {
    const wrapper = mount(FortuneNumberBall, {
      props: { number: 7, index: 0, label: 'Lucky' },
    });
    expect(wrapper.attributes('aria-label')).toBe('Lucky 7');
  });

  it('applies animation delay based on index', () => {
    const wrapper = mount(FortuneNumberBall, {
      props: { number: 1, index: 3 },
    });
    const style = wrapper.attributes('style');
    expect(style).toContain('animation-delay');
  });

  it('uses game type for bonus ball styling', () => {
    const wrapper = mount(FortuneNumberBall, {
      props: { number: 5, index: 0, variant: 'bonus', gameType: 'eurojackpot' },
    });
    const style = wrapper.attributes('style');
    expect(style).toBeTruthy();
  });
});
