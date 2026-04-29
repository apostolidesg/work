import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import TheHeader from '@/components/header/TheHeader.vue';
import { dialogModalMessages, infoModalMessages } from '@/util/modalMessages';

const mockPush = vi.fn();
const mockConfirm = vi.fn();
const mockInfo = vi.fn();
const mockToggleBalanceVisibility = vi.fn();
const mockBalance = ref(0);
const mockIsBalanceVisible = ref(true);
const mockRoute = {
  name: 'easy-home',
};

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => mockRoute,
}));

vi.mock('@/config/appConfig', () => ({
  APP_CONFIG: {
    header: { height: '100px' },
  },
  EXTERNAL_ASSETS: {
    rgBadgeFull: 'rg-badge.png',
  },
}));

vi.mock('@/util/Utilities', async () => {
  const actual = await vi.importActual('@/util/Utilities');

  return {
    default: {
      ...actual.default,
      formatNumber: vi.fn((value) => `formatted-${value}`),
    },
  };
});

vi.mock('@/composables/useModalService', () => ({
  useModalService: () => ({
    confirm: mockConfirm,
    info: mockInfo,
  }),
}));

vi.mock('@/composables/useSession', () => ({
  useSession: () => ({
    balance: mockBalance,
    isBalanceVisible: mockIsBalanceVisible,
    toggleBalanceVisibility: mockToggleBalanceVisibility,
  }),
}));

vi.mock('../../assets/svg/opap-logo.svg', () => ({ default: 'opap-logo.svg' }));

const mountComponent = (props = {}) =>
  mount(TheHeader, {
    props: {
      mode: 'easy',
      sidebarExpanded: false,
      showLogo: false,
      ...props,
    },
    global: {
      mocks: {
        $t: (key) => key,
      },
      stubs: {
        HeaderLogo: {
          name: 'HeaderLogo',
          props: ['logoSrc'],
          emits: ['click'],
          template: '<button class="header-logo-stub" @click="$emit(\'click\')" />',
        },
        ModeToggle: {
          name: 'ModeToggle',
          props: ['modelValue'],
          emits: ['update:modelValue', 'pro-mode-click'],
          template: '<div class="mode-toggle-stub" />',
        },
        PrimaryButton: {
          name: 'PrimaryButton',
          inheritAttrs: false,
          props: ['shape', 'size', 'variant'],
          emits: ['click'],
          template: '<button v-bind="$attrs" @click="$emit(\'click\', $event)"><slot /></button>',
        },
        FontAwesomeIcon: {
          name: 'FontAwesomeIcon',
          props: ['icon'],
          template: '<i class="fa-icon-stub" />',
        },
        BarcodeReaderError: {
          name: 'BarcodeReaderError',
          template: '<div class="barcode-reader-error-stub" />',
        },
        BasePopover: {
          name: 'BasePopover',
          props: ['placement', 'arrow'],
          template: `
            <div class="base-popover-stub">
              <div class="base-popover-trigger"><slot /></div>
              <div class="base-popover-content"><slot name="content" /></div>
            </div>
          `,
        },
      },
    },
  });

beforeEach(() => {
  vi.clearAllMocks();
  mockBalance.value = 0;
  mockIsBalanceVisible.value = true;
  mockRoute.name = 'easy-home';
  mockConfirm.mockResolvedValue(false);
});

describe('TheHeader', () => {
  describe('rendering', () => {
    it('renders header element with banner role', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('[role="banner"]').exists()).toBe(true);
    });

    it('always renders the responsible gaming badge', () => {
      const wrapper = mountComponent();
      expect(wrapper.find('img[alt="Responsible Gaming badge"]').exists()).toBe(true);
    });

    it('renders the logo only when showLogo is true', () => {
      expect(mountComponent().find('.header-logo-stub').exists()).toBe(false);
      expect(mountComponent({ showLogo: true }).find('.header-logo-stub').exists()).toBe(true);
    });

    it('renders the deposit button when balance is zero', () => {
      mockBalance.value = 0;

      const wrapper = mountComponent();

      expect(wrapper.find('button[aria-label="header.deposit"]').exists()).toBe(true);
      expect(wrapper.find('button[aria-label="header.cashOut"]').exists()).toBe(false);
      expect(wrapper.find('.base-popover-stub').exists()).toBe(false);
    });

    it('renders cash out and the balance popover when balance is greater than zero', () => {
      mockBalance.value = 123.45;

      const wrapper = mountComponent();

      expect(wrapper.find('button[aria-label="header.cashOut"]').exists()).toBe(true);
      expect(wrapper.find('.base-popover-stub').exists()).toBe(true);
      expect(wrapper.text()).toContain('formatted-123.45');
      expect(wrapper.find('.base-popover-content').text()).toContain('shownBalanceText');
      expect(wrapper.find('.base-popover-content').text()).toContain('balanceRenewal');
    });

    it('adds blur styling to the balance when visibility is turned off', () => {
      mockBalance.value = 50;
      mockIsBalanceVisible.value = false;

      const wrapper = mountComponent();

      expect(wrapper.find('.app-header__balance').exists()).toBe(true);
    });
  });

  describe('sidebar expanded class', () => {
    it('applies left-60 class when sidebar is expanded', () => {
      const wrapper = mountComponent({ sidebarExpanded: true });
      expect(wrapper.find('header').classes()).toContain('atw:left-60');
    });

    it('applies left-20 class when sidebar is collapsed', () => {
      const wrapper = mountComponent({ sidebarExpanded: false });
      expect(wrapper.find('header').classes()).toContain('atw:left-20');
    });
  });

  describe('events', () => {
    it('emits logoClick when the logo is clicked', async () => {
      const wrapper = mountComponent({ showLogo: true });

      await wrapper.find('.header-logo-stub').trigger('click');

      expect(wrapper.emitted('logoClick')).toEqual([[]]);
    });

    it('emits switchApplication when the zero-balance deposit button is clicked', async () => {
      mockBalance.value = 0;

      const wrapper = mountComponent();

      await wrapper.find('button[aria-label="header.deposit"]').trigger('click');

      expect(wrapper.emitted('switchApplication')).toEqual([[]]);
    });

    it('calls info with the responsible gaming modal payload when the RG badge is clicked', async () => {
      const wrapper = mountComponent();

      await wrapper.find('.app-header__rg-badge').trigger('click');

      expect(mockInfo).toHaveBeenCalledWith({
        ...infoModalMessages.responsibleGaming,
        width: 800,
      });
    });

    it('calls toggleBalanceVisibility from the popover menu', async () => {
      mockBalance.value = 100;

      const wrapper = mountComponent();
      const menuItems = wrapper.findAll('.base-popover-content > div > div');

      await menuItems[0].trigger('click');

      expect(mockToggleBalanceVisibility).toHaveBeenCalledTimes(1);
    });

    it('emits switchApplication from the popover renewal action', async () => {
      mockBalance.value = 100;

      const wrapper = mountComponent();
      const menuItems = wrapper.findAll('.base-popover-content > div > div');

      await menuItems[1].trigger('click');

      expect(wrapper.emitted('switchApplication')).toEqual([[]]);
    });

    it('does not emit cashOut when confirm resolves false', async () => {
      mockBalance.value = 100;
      mockConfirm.mockResolvedValue(false);

      const wrapper = mountComponent();

      await wrapper.find('button[aria-label="header.cashOut"]').trigger('click');
      await flushPromises();

      expect(mockConfirm).toHaveBeenCalledWith(dialogModalMessages.cashOut);
      expect(wrapper.emitted('cashOut')).toBeFalsy();
    });

    it('emits cashOut when confirm resolves true', async () => {
      mockBalance.value = 100;
      mockConfirm.mockResolvedValue(true);

      const wrapper = mountComponent();

      await wrapper.find('button[aria-label="header.cashOut"]').trigger('click');
      await flushPromises();

      expect(mockConfirm).toHaveBeenCalledWith(dialogModalMessages.cashOut);
      expect(wrapper.emitted('cashOut')).toEqual([[]]);
    });

    it('does not emit modeChange when the same mode is selected', async () => {
      const wrapper = mountComponent({ mode: 'easy' });
      const modeToggle = wrapper.findComponent({ name: 'ModeToggle' });

      await modeToggle.vm.$emit('update:modelValue', 'easy');

      expect(wrapper.emitted('modeChange')).toBeFalsy();
    });

    it('emits modeChange when a different mode is selected', async () => {
      const wrapper = mountComponent({ mode: 'pro' });
      const modeToggle = wrapper.findComponent({ name: 'ModeToggle' });

      await modeToggle.vm.$emit('update:modelValue', 'easy');

      expect(wrapper.emitted('modeChange')).toEqual([['easy']]);
    });

    it('emits modeChange when pro mode is clicked outside a pro game', async () => {
      const wrapper = mountComponent({ mode: 'easy' });
      const modeToggle = wrapper.findComponent({ name: 'ModeToggle' });

      await modeToggle.vm.$emit('pro-mode-click');

      expect(wrapper.emitted('modeChange')).toEqual([['pro']]);
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('navigates to /pro when pro mode is clicked inside a pro game', async () => {
      mockRoute.name = 'pro-games-foo';

      const wrapper = mountComponent({ mode: 'pro' });
      const modeToggle = wrapper.findComponent({ name: 'ModeToggle' });

      await modeToggle.vm.$emit('pro-mode-click');

      expect(wrapper.emitted('modeChange')).toBeFalsy();
      expect(mockPush).toHaveBeenCalledWith('/pro');
    });
  });
});
