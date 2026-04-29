import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PromoCardsLandscape from '@/components/PromoCards/PromoCardsLandscape.vue';

vi.mock('@/composables/useConfigText', () => ({
  useConfigText: () => ({
    tConfig: (key) => `translated:${key}`,
  }),
}));

vi.mock('@/components/PromoCards/PromoCardsLandscapePanel.vue', () => ({
  default: {
    name: 'PromoCardsLandscapePanel',

    template: '<div class="panel-stub"><slot /></div>',
    props: ['tabs', 'activeTab', 'activeGame', 'title', 'wheelSrc', 'fallbackWheelSrc'],
    emits: ['select-tab', 'select-slip', 'select-numbers'],
  },
}));

describe('PromoCardsLandscape', () => {
  const mockGames = [
    { id: 'tzoker', jackpotAmount: 1000000, priceOptions: [1, 2, 3] },
    { id: 'eurojackpot', jackpotAmount: 2000000, priceOptions: [2, 4, 6] },
  ];

  const createWrapper = (props = {}) => {
    return mount(PromoCardsLandscape, {
      props: {
        games: mockGames,
        wheelSrc: 'wheel.png',
        fallbackWheelSrc: 'fallback-wheel.png',
        ...props,
      },
    });
  };

  it('renders PromoCardsLandscapePanel component', () => {
    const wrapper = createWrapper();
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });
    expect(panel.exists()).toBe(true);
  });

  it('passes correct props to PromoCardsLandscapePanel', () => {
    const wrapper = createWrapper();
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });

    expect(panel.props('tabs')).toEqual(mockGames);
    expect(panel.props('activeTab')).toBe('tzoker');
    expect(panel.props('title')).toBe('translated:promo.promotionalText');
    expect(panel.props('wheelSrc')).toBe('wheel.png');
    expect(panel.props('fallbackWheelSrc')).toBe('fallback-wheel.png');
  });

  it('sets first game as active tab by default', () => {
    const wrapper = createWrapper();
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });
    expect(panel.props('activeTab')).toBe('tzoker');
  });

  it('passes correct active game based on active tab', () => {
    const wrapper = createWrapper();
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });
    expect(panel.props('activeGame')).toEqual(mockGames[0]);
  });

  it('changes active tab when select-tab event is emitted', async () => {
    const wrapper = createWrapper();
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });

    await panel.vm.$emit('select-tab', 'eurojackpot');
    await wrapper.vm.$nextTick();

    expect(panel.props('activeTab')).toBe('eurojackpot');
    expect(panel.props('activeGame')).toEqual(mockGames[1]);
  });

  it('emits select-slip event when panel emits it', async () => {
    const wrapper = createWrapper();
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });

    await panel.vm.$emit('select-slip', 10, 5);

    expect(wrapper.emitted('select-slip')).toBeTruthy();
    expect(wrapper.emitted('select-slip')[0]).toEqual([10, 5]);
  });

  it('emits select-numbers event when panel emits it', async () => {
    const wrapper = createWrapper();
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });

    await panel.vm.$emit('select-numbers', 15);

    expect(wrapper.emitted('select-numbers')).toBeTruthy();
    expect(wrapper.emitted('select-numbers')[0]).toEqual([15]);
  });

  it('handles empty games array', () => {
    const wrapper = createWrapper({ games: [] });
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });
    expect(panel.props('activeGame')).toBeNull();
  });

  it('resets to first tab when active tab is removed from games', async () => {
    const wrapper = createWrapper();
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });

    await panel.vm.$emit('select-tab', 'eurojackpot');
    await wrapper.vm.$nextTick();
    expect(panel.props('activeTab')).toBe('eurojackpot');

    await wrapper.setProps({ games: [{ id: 'tzoker', jackpotAmount: 1000000 }] });
    await wrapper.vm.$nextTick();

    expect(panel.props('activeTab')).toBe('tzoker');
  });

  it('keeps user-selected tab when games update but tab still exists', async () => {
    const wrapper = createWrapper();
    const panel = wrapper.findComponent({ name: 'PromoCardsLandscapePanel' });

    await panel.vm.$emit('select-tab', 'eurojackpot');
    await wrapper.vm.$nextTick();

    await wrapper.setProps({
      games: [
        { id: 'tzoker', jackpotAmount: 500000 },
        { id: 'eurojackpot', jackpotAmount: 3000000 },
      ],
    });
    await wrapper.vm.$nextTick();

    expect(panel.props('activeTab')).toBe('eurojackpot');
  });
});
