import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ProHome from '@/pages/ProHome.vue';

const mockTConfig = vi.fn();

vi.mock('@/composables/useConfigText', () => ({
  useConfigText: () => ({ tConfig: mockTConfig }),
}));

vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

vi.mock('@/constants/routeNames', () => ({
  default: {
    PRO_GAME_EUROJACKPOT: 'pro-games-eurojackpot',
    PRO_GAME_TZOKER: 'pro-games-tzoker',
    PRO_GAME_KINO: 'pro-games-kino',
    PRO_GAME_POWERSPIN: 'pro-games-powerspin',
    PRO_GAME_FIREBLAZE: 'pro-games-fireblaze',
  },
}));

const createRawImages = (count = 8) => {
  const games = [
    'EUROJACKPOT',
    'TZOKER',
    'PAMESTOIXIMA',
    'KINO',
    'FIREBLAZE',
    'POWERSPIN',
    'POWERSPIN_ON_FIRE',
    'BANNER_ZONE',
    'EXTRA_GAME',
  ];
  const result = {};
  for (let i = 0; i < count; i++) {
    result[games[i]] = {
      order: i + 1,
      src: `test-${i + 1}.jpg`,
    };
  }
  return result;
};

describe('ProHome', () => {
  beforeEach(() => {
    mockTConfig.mockReset();
  });

  const mountPage = (rawImages = createRawImages()) => {
    mockTConfig.mockReturnValue(rawImages);
    return mount(ProHome, {
      global: {
        stubs: { MasonryGrid: true },
      },
    });
  };

  it('renders MasonryGrid component', () => {
    const wrapper = mountPage();
    expect(wrapper.findComponent({ name: 'MasonryGrid' }).exists()).toBe(true);
  });

  it('calls tConfig with correct path', () => {
    mountPage();
    expect(mockTConfig).toHaveBeenCalledWith('HORIZONTAL.LOBBY_IMAGES');
  });

  it('passes sorted items to MasonryGrid', () => {
    const rawImages = createRawImages();
    rawImages.TZOKER.order = 5;
    rawImages.FIREBLAZE.order = 2;
    const wrapper = mountPage(rawImages);
    const items = wrapper.findComponent({ name: 'MasonryGrid' }).props('items');
    expect(items[0].gameId).toBe('EUROJACKPOT');
    expect(items[1].gameId).toBe('FIREBLAZE');
    expect(items[4].gameId).toBe('TZOKER');
  });

  it('filters out hidden items', () => {
    const rawImages = createRawImages();
    rawImages.TZOKER.hide = true;
    const wrapper = mountPage(rawImages);
    const items = wrapper.findComponent({ name: 'MasonryGrid' }).props('items');
    expect(items.find((i) => i.gameId === 'TZOKER')).toBeUndefined();
    expect(items).toHaveLength(7);
  });

  it('maps gameId from object key', () => {
    const wrapper = mountPage();
    const items = wrapper.findComponent({ name: 'MasonryGrid' }).props('items');
    expect(items[0].gameId).toBe('EUROJACKPOT');
    expect(items[1].gameId).toBe('TZOKER');
  });

  it('resolves route name for known games', () => {
    const wrapper = mountPage();
    const items = wrapper.findComponent({ name: 'MasonryGrid' }).props('items');
    const eurojackpot = items.find((i) => i.gameId === 'EUROJACKPOT');
    expect(eurojackpot.link).toEqual({ name: 'pro-games-eurojackpot' });
  });

  it('sets link to null for unknown games', () => {
    const wrapper = mountPage();
    const items = wrapper.findComponent({ name: 'MasonryGrid' }).props('items');
    const banner = items.find((i) => i.gameId === 'BANNER_ZONE');
    expect(banner.link).toBeNull();
  });

  it('adds span to 4th item when 8 items', () => {
    const wrapper = mountPage(createRawImages(8));
    const items = wrapper.findComponent({ name: 'MasonryGrid' }).props('items');
    expect(items[3].span).toBe(true);
    expect(items[0].span).toBeUndefined();
  });

  it('does not add span when 9 items', () => {
    const wrapper = mountPage(createRawImages(9));
    const items = wrapper.findComponent({ name: 'MasonryGrid' }).props('items');
    expect(items[3].span).toBeUndefined();
  });

  it('handles empty config gracefully', () => {
    const wrapper = mountPage({});
    const items = wrapper.findComponent({ name: 'MasonryGrid' }).props('items');
    expect(items).toHaveLength(0);
  });
});
