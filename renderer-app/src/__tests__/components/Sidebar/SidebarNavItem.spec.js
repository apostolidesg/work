import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SidebarNavItem from '@/components/SidebarNavItem.vue';

vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

vi.mock('@/constants/gtmEvents', () => ({
  default: {
    SSBT_DGE_APPLICATION_SIDE_BAR_CLICKED: 'ssbt_dge_application_side_bar_clicked',
  },
}));

const mockItem = {
  translationKey: 'nav.home',
  svgIcon: '<svg><path d="M0 0"/></svg>',
  hasDivider: false,
  showArrow: false,
};

const mountComponent = (props = {}) =>
  mount(SidebarNavItem, {
    props: {
      item: mockItem,
      expanded: false,
      isActive: false,
      ...props,
    },
    global: {
      mocks: {
        $t: (key) => key,
      },
      stubs: {
        FontAwesomeIcon: true,
        Transition: false,
      },
    },
  });

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SidebarNavItem', () => {
  describe('rendering', () => {
    it('renders the button with correct id', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('button').attributes('id')).toBe('nav-home');
    });

    it('renders svg icon when svgIcon is provided', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('span[aria-hidden="true"]').exists()).toBe(true);
    });

    it('does not render label text when collapsed', () => {
      const wrapper = mountComponent({ expanded: false });
      expect(wrapper.find('span.atw\\:whitespace-nowrap').exists()).toBe(false);
    });

    it('renders label text when expanded', () => {
      const wrapper = mountComponent({ expanded: true });
      expect(wrapper.text()).toContain('nav.home');
    });

    it('renders divider when hasDivider is true', () => {
      const wrapper = mountComponent({ item: { ...mockItem, hasDivider: true } });
      expect(wrapper.find('[role="separator"]').exists()).toBe(true);
    });

    it('does not render divider when hasDivider is false', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('[role="separator"]').exists()).toBe(false);
    });

    it('does not render arrow when showArrow is false', () => {
      const wrapper = mountComponent({ expanded: true });
      expect(wrapper.text()).not.toContain('›');
    });
  });

  describe('active state', () => {
    it('sets aria-current to page when active', () => {
      const wrapper = mountComponent({ isActive: true });
      expect(wrapper.find('button').attributes('aria-current')).toBe('page');
    });

    it('does not set aria-current when not active', () => {
      const wrapper = mountComponent({ isActive: false });
      expect(wrapper.find('button').attributes('aria-current')).toBeUndefined();
    });
  });

  describe('click handling', () => {
    it('emits click event when button is clicked', async () => {
      const wrapper = mountComponent();
      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('calls gaService.sendEvent with correct menu_item on click', async () => {
      const gaService = (await import('@/services/gaService')).default;
      const wrapper = mountComponent();
      await wrapper.find('button').trigger('click');
      expect(gaService.sendEvent).toHaveBeenCalledWith('ssbt_dge_application_side_bar_clicked', { menu_item: 'home' });
    });

    it('extracts correct menu_item from translationKey', async () => {
      const gaService = (await import('@/services/gaService')).default;
      const wrapper = mountComponent({
        item: { ...mockItem, translationKey: 'nav.games' },
      });
      await wrapper.find('button').trigger('click');
      expect(gaService.sendEvent).toHaveBeenCalledWith('ssbt_dge_application_side_bar_clicked', { menu_item: 'games' });
    });
  });
});
