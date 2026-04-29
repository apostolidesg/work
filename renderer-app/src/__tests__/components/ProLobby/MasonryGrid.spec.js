import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MasonryGrid from '@/components/ProLobby/MasonryGrid.vue';

const mockTConfig = vi.fn((val) => {
  if (typeof val === 'object') return val.en || '';
  return val;
});

vi.mock('@/composables/useConfigText', () => ({
  useConfigText: () => ({ tConfig: mockTConfig }),
}));

const createItems = (count) =>
  Array.from({ length: count }, (_, i) => ({
    src: `https://picsum.photos/seed/cell${i + 1}/600/400`,
    link: `/pro/games/game${i + 1}`,
    order: i + 1,
  }));

describe('MasonryGrid', () => {
  const mountGrid = (items) =>
    mount(MasonryGrid, {
      props: { items },
      global: {
        stubs: { MasonryCell: true },
      },
    });

  it('renders the masonry container and grid', () => {
    const wrapper = mountGrid(createItems(8));
    expect(wrapper.find('.masonry-container').exists()).toBe(true);
    expect(wrapper.find('.masonry-grid').exists()).toBe(true);
  });

  it('renders 3 rows for 8 items', () => {
    const wrapper = mountGrid(createItems(8));
    const rows = wrapper.findAll('.masonry-grid__row');
    expect(rows).toHaveLength(3);
  });

  it('renders 3 rows for 9 items', () => {
    const wrapper = mountGrid(createItems(9));
    const rows = wrapper.findAll('.masonry-grid__row');
    expect(rows).toHaveLength(3);
  });

  it('renders 6 cells for 8 items (single left in row 2)', () => {
    const wrapper = mountGrid(createItems(8));
    const cells = wrapper.findAll('.masonry-grid__cell');
    expect(cells).toHaveLength(6);
  });

  it('renders 6 cells for 9 items', () => {
    const wrapper = mountGrid(createItems(9));
    const cells = wrapper.findAll('.masonry-grid__cell');
    expect(cells).toHaveLength(6);
  });

  it('has one sub-row with single item for 8-item layout row 2', () => {
    const wrapper = mountGrid(createItems(8));
    const subRows = wrapper.findAll('.masonry-grid__sub-row');
    // Row 1: sub-row (2 items), Row 2: sub-row (1 item), Row 3: sub-row (2 items)
    expect(subRows).toHaveLength(3);
  });

  it('has three sub-rows with two items each for 9-item layout', () => {
    const wrapper = mountGrid(createItems(9));
    const subRows = wrapper.findAll('.masonry-grid__sub-row');
    expect(subRows).toHaveLength(3);
  });

  it('passes centerButton as true when 9 items', () => {
    const wrapper = mountGrid(createItems(9));
    const cells = wrapper.findAllComponents({ name: 'MasonryCell' });
    cells.forEach((cell) => {
      expect(cell.props('centerButton')).toBe(true);
    });
  });

  it('passes centerButton as false when 8 items', () => {
    const wrapper = mountGrid(createItems(8));
    const cells = wrapper.findAllComponents({ name: 'MasonryCell' });
    cells.forEach((cell) => {
      expect(cell.props('centerButton')).toBe(false);
    });
  });

  it('renders with empty items array', () => {
    const wrapper = mountGrid([]);
    expect(wrapper.find('.masonry-container').exists()).toBe(true);
  });
});
