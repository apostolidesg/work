import { beforeAll, describe, expect, it, vi } from 'vitest';
import { computed } from 'vue';
import { mount } from '@vue/test-utils';

vi.mock('@/composables/useConfigText', () => ({
  useConfigText: () => ({
    tConfig: (key) => key,
  }),
}));

vi.mock('@/composables/useLobbyPromoConfig', () => {
  return {
    useLobbyPromoConfig: () => ({
      portraitGames: computed(() => [
        { id: 'tzoker', jackpotAmount: '1.000.000€', priceOptions: [], disabled: false },
        { id: 'eurojackpot', jackpotAmount: '10.000.000€', priceOptions: [], disabled: true },
      ]),
      landscapeGames: computed(() => [
        { id: 'tzoker', jackpotAmount: '1.000.000€', priceOptions: [], disabled: false },
        { id: 'eurojackpot', jackpotAmount: '10.000.000€', priceOptions: [], disabled: true },
      ]),
      portraitPromotionalImage: computed(() => '/portrait-wheel.png'),
      landscapePromotionalImage: computed(() => '/landscape-wheel.png'),
    }),
  };
});

let PromoCards;

beforeAll(async () => {
  PromoCards = (await import('@/components/PromoCards/PromoCards.vue')).default;
});

const mountPromoCards = () =>
  mount(PromoCards, {
    global: {
      stubs: {
        PromoCardsPortrait: {
          name: 'PromoCardsPortrait',
          template: '<div class="portrait-stub"><slot /></div>',
          props: ['games', 'wheelSrc', 'fallbackWheelSrc'],
          emits: ['select-slip', 'select-numbers'],
        },
        PromoCardsLandscape: {
          name: 'PromoCardsLandscape',
          template: '<div class="landscape-stub"><slot /></div>',
          props: ['games', 'wheelSrc', 'fallbackWheelSrc'],
          emits: ['select-slip', 'select-numbers'],
        },
      },
    },
  });

describe('PromoCards', () => {
  it('renders both portrait and landscape components', () => {
    const wrapper = mountPromoCards();
    expect(wrapper.findComponent({ name: 'PromoCardsPortrait' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'PromoCardsLandscape' }).exists()).toBe(true);
  });

  it('passes correct props to PromoCardsPortrait', () => {
    const wrapper = mountPromoCards();
    const portrait = wrapper.findComponent({ name: 'PromoCardsPortrait' });

    expect(portrait.props('games')).toHaveLength(2);
    expect(portrait.props('games')[0].id).toBe('tzoker');
    expect(portrait.props('wheelSrc')).toBe('/portrait-wheel.png');
    expect(portrait.props('fallbackWheelSrc')).toBeTruthy();
  });

  it('passes correct props to PromoCardsLandscape', () => {
    const wrapper = mountPromoCards();
    const landscape = wrapper.findComponent({ name: 'PromoCardsLandscape' });

    expect(landscape.props('games')).toHaveLength(2);
    expect(landscape.props('games')[0].id).toBe('tzoker');
    expect(landscape.props('wheelSrc')).toBe('/landscape-wheel.png');
    expect(landscape.props('fallbackWheelSrc')).toBeTruthy();
  });

  it('emits open-slip-modal when PromoCardsPortrait emits select-slip', async () => {
    const wrapper = mountPromoCards();
    const portrait = wrapper.findComponent({ name: 'PromoCardsPortrait' });

    await portrait.vm.$emit('select-slip', 1, 2);

    expect(wrapper.emitted('open-slip-modal')).toBeTruthy();
    expect(wrapper.emitted('open-slip-modal')[0]).toEqual([1, 2]);
  });

  it('emits open-slip-modal when PromoCardsLandscape emits select-slip', async () => {
    const wrapper = mountPromoCards();
    const landscape = wrapper.findComponent({ name: 'PromoCardsLandscape' });

    await landscape.vm.$emit('select-slip', 3, 4);

    expect(wrapper.emitted('open-slip-modal')).toBeTruthy();
    expect(wrapper.emitted('open-slip-modal')[0]).toEqual([3, 4]);
  });

  it('emits open-slip-modal when PromoCardsPortrait emits select-numbers', async () => {
    const wrapper = mountPromoCards();
    const portrait = wrapper.findComponent({ name: 'PromoCardsPortrait' });

    await portrait.vm.$emit('select-numbers', 5);

    expect(wrapper.emitted('open-slip-modal')).toBeTruthy();
    expect(wrapper.emitted('open-slip-modal')[0]).toEqual([5]);
  });

  it('emits open-slip-modal when PromoCardsLandscape emits select-numbers', async () => {
    const wrapper = mountPromoCards();
    const landscape = wrapper.findComponent({ name: 'PromoCardsLandscape' });

    await landscape.vm.$emit('select-numbers', 10);

    expect(wrapper.emitted('open-slip-modal')).toBeTruthy();
    expect(wrapper.emitted('open-slip-modal')[0]).toEqual([10]);
  });
});
