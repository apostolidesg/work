import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import App from '@/App.vue';

const mockPush = vi.fn();
const mockRoutePath = ref('/easy');
const mockRouteName = ref('easy-home');

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => ({
    get path() {
      return mockRoutePath.value;
    },
    get name() {
      return mockRouteName.value;
    },
  }),
}));

vi.mock('@/components/maintenancePanel/MaintenancePanel.vue', () => ({
  default: {
    name: 'MaintenancePanel',
    template: '<div> Maintenance Panel</div>',
  },
}));

vi.mock('@/config/appConfig', () => ({
  EXTERNAL_ASSETS: {
    backgroundLight: 'bg-light.jpg',
    backgroundDark: 'bg-dark.jpg',
  },
  THEME_CONFIG: {
    default: { bgImage: 'bg-light.jpg' },
    light: { bgImage: 'bg-light.jpg' },
    dark: { bgImage: 'bg-dark.jpg' },
    pro: { bgImage: 'bg-dark.jpg' },
    powerspin: { bgImage: 'bg-dark.jpg' },
  },
}));

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({ currentTheme: ref('default') }),
}));

vi.mock('@/composables/useCmsConfigPolling', () => ({ useCmsConfigPolling: vi.fn() }));
vi.mock('@/composables/useIdle', () => ({ useIdle: vi.fn() }));
vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({ getAccessToken: vi.fn() }),
}));
vi.mock('@/util/handler/EventHandlers', () => ({ default: vi.fn() }));
vi.mock('@/util/handler/RequestHandler', () => ({ default: vi.fn() }));
vi.mock('@/util/handler/EventBusHandler', () => ({ default: vi.fn() }));
vi.mock('@/constants/RequestTypes', () => ({ default: { GET_SSBT_TOKEN_AFTER_SWITCH: 'token' } }));
vi.mock('@/constants/routeNames', () => ({
  default: {
    EASY_HOME: 'easy-home',
    EASY_GAMES: 'easy-games',
    EASY_REWARDS: 'easy-rewards',
    EASY_HELP: 'easy-help',
    EASY_SETTINGS: 'easy-settings',
    EASY_PRIVACY: 'easy-privacy',
    PRO_HOME: 'pro-home',
    PRO_GAMES: 'pro-games',
    PRO_REWARDS: 'pro-rewards',
    PRO_HELP: 'pro-help',
    PRO_SETTINGS: 'pro-settings',
    PRO_PRIVACY: 'pro-privacy',
  },
}));

vi.mock('@/composables/useConfiguration', () => ({
  useConfiguration: () => ({ appConfig: ref({}) }),
}));

const mountComponent = () =>
  mount(App, {
    global: {
      stubs: {
        TheSidebar: {
          name: 'TheSidebar',
          template: '<div class="sidebar-stub" />',
          props: ['expanded', 'currentPage'],
          emits: ['toggle', 'navigate'],
        },
        TheHeader: {
          name: 'TheHeader',
          template: '<div class="header-stub" />',
          props: ['isLoggedIn', 'userName', 'mode', 'sidebarExpanded'],
          emits: ['toggleLogin', 'logoClick', 'modeChange'],
        },
        TheFooter: { template: '<div class="footer-stub" />' },
        RouterView: { template: '<div />' },
      },
    },
  });

beforeEach(() => {
  vi.clearAllMocks();
  mockRoutePath.value = '/easy';
  mockRouteName.value = 'easy-home';
});

describe('App', () => {
  describe('rendering', () => {
    it('renders sidebar, header, main and footer', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('.sidebar-stub').exists()).toBe(true);
      expect(wrapper.find('.header-stub').exists()).toBe(true);
      expect(wrapper.find('.footer-stub').exists()).toBe(true);
      expect(wrapper.find('main#main-content').exists()).toBe(true);
    });

    it('renders main with correct aria-label', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('main').attributes('aria-label')).toBe('Main content');
    });
  });

  describe('sidebar toggle', () => {
    it('starts with sidebar collapsed', () => {
      const wrapper = mountComponent();
      expect(wrapper.findComponent({ name: 'TheSidebar' }).props('expanded')).toBe(false);
    });

    it('expands sidebar on toggle event', async () => {
      const wrapper = mountComponent();
      await wrapper.findComponent({ name: 'TheSidebar' }).vm.$emit('toggle');
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent({ name: 'TheSidebar' }).props('expanded')).toBe(true);
    });

    it('collapses sidebar on second toggle', async () => {
      const wrapper = mountComponent();
      const sidebar = wrapper.findComponent({ name: 'TheSidebar' });
      await sidebar.vm.$emit('toggle');
      await sidebar.vm.$emit('toggle');
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent({ name: 'TheSidebar' }).props('expanded')).toBe(false);
    });
  });

  describe('navigation', () => {
    it('navigates to correct easy route when sidebar emits navigate', async () => {
      const wrapper = mountComponent();
      await wrapper.findComponent({ name: 'TheSidebar' }).vm.$emit('navigate', 'nav.games');
      expect(mockPush).toHaveBeenCalledWith({ name: 'easy-games' });
    });

    it('navigates to pro route when in pro mode', () => {
      mockRoutePath.value = '/pro/home';
      mockRouteName.value = 'pro-home';
      const wrapper = mountComponent();
      wrapper.findComponent({ name: 'TheSidebar' }).vm.$emit('navigate', 'nav.games');
      expect(mockPush).toHaveBeenCalledWith({ name: 'pro-games' });
    });

    it('navigates to home when header emits logoClick', async () => {
      const wrapper = mountComponent();
      await wrapper.findComponent({ name: 'TheHeader' }).vm.$emit('logoClick');
      expect(mockPush).toHaveBeenCalledWith({ name: 'easy-home' });
    });
  });

  describe('mode change', () => {
    it('navigates to pro route on mode change', async () => {
      mockRouteName.value = 'easy-home';
      const wrapper = mountComponent();
      await wrapper.findComponent({ name: 'TheHeader' }).vm.$emit('modeChange', 'pro');
      expect(mockPush).toHaveBeenCalledWith({ name: 'pro-home' });
    });

    it('does not navigate if same mode emitted', async () => {
      mockRoutePath.value = '/easy/home';
      mockRouteName.value = 'easy-home';
      const wrapper = mountComponent();
      await wrapper.findComponent({ name: 'TheHeader' }).vm.$emit('modeChange', 'easy');
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('currentPageKey', () => {
    it('maps easy-games route to nav.games', () => {
      mockRoutePath.value = '/easy/games';
      mockRouteName.value = 'easy-games';
      const wrapper = mountComponent();
      expect(wrapper.findComponent({ name: 'TheSidebar' }).props('currentPage')).toBe('nav.games');
    });

    it('maps pro-rewards route to nav.rewards', () => {
      mockRoutePath.value = '/pro/rewards';
      mockRouteName.value = 'pro-rewards';
      const wrapper = mountComponent();
      expect(wrapper.findComponent({ name: 'TheSidebar' }).props('currentPage')).toBe('nav.rewards');
    });

    it('falls back to nav.home for unknown route', () => {
      mockRouteName.value = 'unknown-route';
      const wrapper = mountComponent();
      expect(wrapper.findComponent({ name: 'TheSidebar' }).props('currentPage')).toBe('nav.home');
    });
  });
});
