import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PromoCardsPortrait from '@/components/PromoCards/PromoCardsPortrait.vue';

vi.mock('@/composables/useConfigText', () => ({
  useConfigText: () => ({
    tConfig: (key) => key,
  }),
}));

vi.mock('@/components/PromoCards/GameCard.vue', () => ({
  default: {
    name: 'GameCard',
    template: '<div class="game-card-stub" @click="$emit(\'select-slip\', 5, 3)"><slot /></div>',
    props: [
      'gameType',
      'jackpotAmount',
      'priceOptions',
      'backgroundImage',
      'orientation',
      'logoSrc',
      'fallbackLogoSrc',
      'logoAlt',
      'disabled',
    ],
    emits: ['select-slip', 'select-numbers'],
  },
}));

vi.mock('@/components/PromoCards/AnimatedWheel.vue', () => ({
  default: {
    name: 'AnimatedWheel',
    template: '<div class="animated-wheel-stub"></div>',
    props: ['size', 'src', 'fallbackSrc'],
  },
}));

describe('PromoCardsPortrait', () => {
  const mockGames = [
    { id: 'tzoker', jackpotAmount: 1000000, priceOptions: [1, 2, 3], backgroundImage: 'bg1.png', disabled: false },
    { id: 'eurojackpot', jackpotAmount: 2000000, priceOptions: [2, 4, 6], backgroundImage: 'bg2.png', disabled: false },
  ];

  const createWrapper = (props = {}) => {
    return mount(PromoCardsPortrait, {
      props: {
        games: mockGames,
        wheelSrc: 'wheel.png',
        fallbackWheelSrc: 'fallback-wheel.png',
        ...props,
      },
    });
  };

  it('renders promotional text', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('h1').text()).toBe('LOBBY.EASY.VERTICAL.JACKPOT_GAMES_AREA.PROMOTIONAL_TEXT');
  });

  it('renders AnimatedWheel with correct props', () => {
    const wrapper = createWrapper();
    const wheel = wrapper.findComponent({ name: 'AnimatedWheel' });
    expect(wheel.exists()).toBe(true);
    expect(wheel.props('src')).toBe('wheel.png');
    expect(wheel.props('fallbackSrc')).toBe('fallback-wheel.png');
    expect(wheel.props('size')).toBe(300);
  });

  it('renders a GameCard for each game', () => {
    const wrapper = createWrapper();
    const gameCards = wrapper.findAllComponents({ name: 'GameCard' });
    expect(gameCards).toHaveLength(2);
  });

  it('passes correct props to GameCard components', () => {
    const wrapper = createWrapper();
    const gameCards = wrapper.findAllComponents({ name: 'GameCard' });

    expect(gameCards[0].props('gameType')).toBe('tzoker');
    expect(gameCards[0].props('jackpotAmount')).toBe(1000000);
    expect(gameCards[0].props('orientation')).toBe('vertical');

    expect(gameCards[1].props('gameType')).toBe('eurojackpot');
    expect(gameCards[1].props('jackpotAmount')).toBe(2000000);
  });

  it('emits select-slip event when GameCard emits it', async () => {
    const wrapper = createWrapper();
    const gameCard = wrapper.findComponent({ name: 'GameCard' });

    await gameCard.vm.$emit('select-slip', 10, 5);

    expect(wrapper.emitted('select-slip')).toBeTruthy();
    expect(wrapper.emitted('select-slip')[0]).toEqual([10, 5]);
  });

  it('emits select-numbers event when GameCard emits it', async () => {
    const wrapper = createWrapper();
    const gameCard = wrapper.findComponent({ name: 'GameCard' });

    await gameCard.vm.$emit('select-numbers', 15);

    expect(wrapper.emitted('select-numbers')).toBeTruthy();
    expect(wrapper.emitted('select-numbers')[0]).toEqual([15]);
  });

  it('renders empty list when no games provided', () => {
    const wrapper = createWrapper({ games: [] });
    const gameCards = wrapper.findAllComponents({ name: 'GameCard' });
    expect(gameCards).toHaveLength(0);
  });

  it('has correct accessibility attributes on game list', () => {
    const wrapper = createWrapper();
    const list = wrapper.find('[role="list"]');
    expect(list.exists()).toBe(true);
    expect(list.attributes('aria-label')).toBe('promo.a11y.availableGames');
  });
});
