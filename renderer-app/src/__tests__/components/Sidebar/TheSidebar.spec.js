import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TheSidebar from '@/components/TheSidebar.vue';

vi.mock('@/config/appConfig', () => ({
  NAV_ITEMS: [
    { translationKey: 'nav.home', svgIcon: '<svg/>', hasDivider: false },
    { translationKey: 'nav.games', svgIcon: '<svg/>', hasDivider: false },
    { translationKey: 'nav.rewards', svgIcon: '<svg/>', hasDivider: true },
    { translationKey: 'nav.help', svgIcon: '<svg/>', hasDivider: false },
    { translationKey: 'nav.settings', svgIcon: '<svg/>', hasDivider: false },
    { translationKey: 'nav.privacy', svgIcon: '<svg/>', hasDivider: true },
  ],
  BOTTOM_NAV_ITEMS: [
    { translationKey: 'nav.pages', svgIcon: '<svg/>', hasDivider: true },
    { translationKey: 'nav.language', svgIcon: '<svg/>', hasDivider: false, showArrow: true },
  ],
  EXTERNAL_ASSETS: {
    allwynLogoFull: 'logo-full.svg',
    allwynLogoSmall: 'logo-small.svg',
  },
  APP_CONFIG: {
    header: { height: '100px' },
  },
}));

vi.mock('@/assets/logos/allywin-logo-text.svg', () => ({ default: 'logo-text.svg' }));
vi.mock('@/assets/icons/Menu.svg', () => ({ default: 'menu.svg' }));

const mountComponent = (props = {}) =>
  mount(TheSidebar, {
    props: {
      expanded: false,
      currentPage: 'nav.home',
      ...props,
    },
    global: {
      mocks: {
        $t: (key) => key,
      },
      stubs: {
        SidebarNavItem: {
          template:
            '<div class="nav-item-stub" :data-key="item.translationKey" :data-active="String(isActive)" @click="$emit(\'click\')" />',
          props: ['item', 'expanded', 'isActive'],
          emits: ['click'],
        },
        SidebarLanguageItem: {
          props: ['expanded'],
          template: '<div class="language-item-stub" :data-expanded="String(expanded)" />',
        },
        FontAwesomeIcon: true,
      },
    },
  });

beforeEach(() => {
  vi.clearAllMocks();
});

describe('TheSidebar', () => {
  describe('rendering', () => {
    it('renders as a nav aside element', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('aside[role="navigation"]').exists()).toBe(true);
    });

    it('renders correct number of main nav items', () => {
      const wrapper = mountComponent();
      const navItems = wrapper.find('nav').findAll('.nav-item-stub');
      expect(navItems).toHaveLength(6);
    });

    it('renders correct number of bottom nav items', () => {
      const wrapper = mountComponent();
      expect(wrapper.findAll('.nav-item-stub')).toHaveLength(8);
    });

    it('renders the allwyn logo', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('img[alt="Allwyn logo"]').exists()).toBe(true);
    });

    it('hides Beta badge when collapsed', () => {
      const wrapper = mountComponent({ expanded: false });
      expect(wrapper.text()).not.toContain('Beta');
    });
  });

  describe('expanded state', () => {
    it('sets aria-label to expanded when expanded', () => {
      const wrapper = mountComponent({ expanded: true });
      expect(wrapper.find('aside').attributes('aria-label')).toBe('Navigation sidebar expanded');
    });

    it('sets aria-label to collapsed when not expanded', () => {
      const wrapper = mountComponent({ expanded: false });
      expect(wrapper.find('aside').attributes('aria-label')).toBe('Navigation sidebar collapsed');
    });

    it('sets aria-pressed on toggle button to match expanded state', () => {
      const expanded = mountComponent({ expanded: true });
      expect(expanded.find('button[aria-label="Toggle navigation sidebar"]').attributes('aria-pressed')).toBe('true');

      const collapsed = mountComponent({ expanded: false });
      expect(collapsed.find('button[aria-label="Toggle navigation sidebar"]').attributes('aria-pressed')).toBe('false');
    });

    it('shows Menu.svg icon when expanded', () => {
      const wrapper = mountComponent({ expanded: true });
      const toggleBtn = wrapper.find('button[aria-label="Toggle navigation sidebar"]');
      expect(toggleBtn.find('img').exists()).toBe(true);
    });
  });

  describe('active page', () => {
    it('marks correct nav item as active', () => {
      const wrapper = mountComponent({ currentPage: 'nav.games' });
      const gamesItem = wrapper.findAll('.nav-item-stub').find((i) => i.attributes('data-key') === 'nav.games');
      expect(gamesItem.attributes('data-active')).toBe('true');
    });

    it('does not mark other items as active', () => {
      const wrapper = mountComponent({ currentPage: 'nav.games' });
      const homeItem = wrapper.findAll('.nav-item-stub').find((i) => i.attributes('data-key') === 'nav.home');
      expect(homeItem.attributes('data-active')).toBe('false');
    });

    it('marks bottom nav item as active when currentPage matches', () => {
      const wrapper = mountComponent({ currentPage: 'nav.language' });
      const langItem = wrapper.findAll('.nav-item-stub').find((i) => i.attributes('data-key') === 'nav.language');
      expect(langItem.attributes('data-active')).toBe('true');
    });
  });

  describe('events', () => {
    it('emits toggle when toggle button is clicked', async () => {
      const wrapper = mountComponent();
      await wrapper.find('button[aria-label="Toggle navigation sidebar"]').trigger('click');
      expect(wrapper.emitted('toggle')).toHaveLength(1);
    });

    it('emits navigate with translationKey when main nav item is clicked', async () => {
      const wrapper = mountComponent();
      const homeItem = wrapper.findAll('.nav-item-stub').find((i) => i.attributes('data-key') === 'nav.home');
      await homeItem.trigger('click');
      expect(wrapper.emitted('navigate')).toEqual([['nav.home']]);
    });

    it('emits navigate with correct key for bottom nav items', async () => {
      const wrapper = mountComponent();
      const langItem = wrapper.findAll('.nav-item-stub').find((i) => i.attributes('data-key') === 'nav.language');
      await langItem.trigger('click');
      expect(wrapper.emitted('navigate')).toEqual([['nav.language']]);
    });
  });
});
