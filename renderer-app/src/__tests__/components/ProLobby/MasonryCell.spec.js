import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MasonryCell from '@/components/ProLobby/MasonryCell.vue';

const mockTConfig = vi.fn((val) => {
  if (typeof val === 'object') return val.en || '';
  return val;
});

vi.mock('@/composables/useConfigText', () => ({
  useConfigText: () => ({ tConfig: mockTConfig }),
}));

const routerLinkStub = {
  template: '<a :class="$attrs.class"><slot /></a>',
  props: ['to'],
};

const createItem = (overrides = {}) => ({
  order: 1,
  src: 'test.jpg',
  link: { name: 'pro-games-kino' },
  ...overrides,
});

describe('MasonryCell', () => {
  const mountCell = (item = null, centerButton = false) =>
    mount(MasonryCell, {
      props: { item, centerButton },
      global: {
        stubs: { 'router-link': routerLinkStub },
      },
    });

  beforeEach(() => {
    mockTConfig.mockClear();
  });

  it('renders router-link when item has order', () => {
    const wrapper = mountCell(createItem());
    expect(wrapper.find('a').exists()).toBe(true);
  });

  it('passes route object to router-link', () => {
    const wrapper = mountCell(createItem());
    const routerLink = wrapper.findComponent(routerLinkStub);
    expect(routerLink.props('to')).toEqual({ name: 'pro-games-kino' });
  });

  it('renders div with slot when no item', () => {
    const wrapper = mountCell(null);
    expect(wrapper.find('a').exists()).toBe(false);
    expect(wrapper.find('.masonry-cell').exists()).toBe(true);
  });

  it('renders div with slot when order is missing', () => {
    const wrapper = mountCell({ src: 'test.jpg', link: { name: 'pro-games-kino' } });
    expect(wrapper.find('a').exists()).toBe(false);
    expect(wrapper.find('.masonry-cell').exists()).toBe(true);
  });

  it('renders image when src is provided', () => {
    const wrapper = mountCell(createItem());
    const img = wrapper.find('.masonry-cell__img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('test.jpg');
  });

  it('does not render image when src is missing', () => {
    const wrapper = mountCell(createItem({ src: undefined }));
    expect(wrapper.find('.masonry-cell__img').exists()).toBe(false);
  });

  it('renders overlay when item has link', () => {
    const wrapper = mountCell(createItem());
    expect(wrapper.find('.masonry-cell__overlay').exists()).toBe(true);
  });

  it('applies span class when item has span and centerButton is false', () => {
    const wrapper = mountCell(createItem({ span: true }), false);
    expect(wrapper.find('.masonry-cell--span').exists()).toBe(true);
  });

  it('does not apply span class when centerButton is true', () => {
    const wrapper = mountCell(createItem({ span: true }), true);
    expect(wrapper.find('.masonry-cell--span').exists()).toBe(false);
  });

  it('applies alignRight class to overlay when alignRight is true', () => {
    const wrapper = mountCell(createItem({ alignRight: true }));
    expect(wrapper.find('.masonry-cell__overlay--right').exists()).toBe(true);
  });

  it('does not apply alignRight when centerButton is true', () => {
    const wrapper = mountCell(createItem({ alignRight: true }), true);
    expect(wrapper.find('.masonry-cell__overlay--right').exists()).toBe(false);
  });

  it('uses empty alt when alt is not provided', () => {
    const wrapper = mountCell(createItem());
    expect(wrapper.find('.masonry-cell__img').attributes('alt')).toBe('');
  });

  it('uses provided alt text', () => {
    const wrapper = mountCell(createItem({ alt: 'Eurojackpot banner' }));
    expect(wrapper.find('.masonry-cell__img').attributes('alt')).toBe('Eurojackpot banner');
  });
});
