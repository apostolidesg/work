import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PriceButton from '@/components/PromoCards/PriceButton.vue';
import { routeLocationKey, routerKey } from 'vue-router';

vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

vi.mock('@/constants/gtmEvents', () => ({
  default: {
    SSBT_DGE_APPLICATION_PRICE_BUTTON_CLICKED: 'price_button_clicked',
  },
}));

vi.mock('@/components/PromoCards/composables/useConfigText', () => ({
  useConfigText: () => ({
    tConfig: vi.fn(() => ''),
    locale: { value: 'el' },
  }),
}));

const mockStore = {
  state: {},
  getters: {},
  dispatch: vi.fn(),
  commit: vi.fn(),
};

const mockRoute = {
  path: '/',
  params: {},
  query: {},
  name: 'home',
  fullPath: '/',
  hash: '',
  matched: [],
  meta: {},
  redirectedFrom: undefined,
};

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  currentRoute: { value: mockRoute },
  options: {},
  install: vi.fn(),
};

const mountButton = (overrides = {}) =>
  mount(PriceButton, {
    props: {
      label: '1€',
      amount: 1,
      columns: 1,
      description: '1 column',
      gameType: 'tzoker',
      ...overrides,
    },
    global: {
      provide: {
        store: mockStore,
        [routeLocationKey]: mockRoute,
        [routerKey]: mockRouter,
      },
      mocks: {
        $store: mockStore,
        $route: mockRoute,
        $router: mockRouter,
      },
      stubs: {
        RouterLink: true,
      },
    },
  });

describe('PriceButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders amount with euro symbol', () => {
      const wrapper = mountButton({ amount: 25 });
      expect(wrapper.text()).toContain('25€');
    });
  });

  describe('click events', () => {
    it('does not emit when disabled', async () => {
      const { default: gaService } = await import('@/services/gaService');
      const wrapper = mountButton({ disabled: true });
      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('select')).toBeFalsy();
      expect(gaService.sendEvent).not.toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('applies disabled attribute to button', () => {
      const wrapper = mountButton({ disabled: true });
      const button = wrapper.find('button');

      expect(button.attributes('disabled')).toBeDefined();
      expect(button.attributes('aria-disabled')).toBe('true');
    });

    it('applies opacity class when disabled', () => {
      const wrapper = mountButton({ disabled: true });
      const button = wrapper.find('button');

      expect(button.classes()).toContain('atw:opacity-50');
    });

    it('does not have disabled classes when enabled', () => {
      const wrapper = mountButton({ disabled: false });
      const button = wrapper.find('button');

      expect(button.classes()).not.toContain('atw:opacity-50');
    });
  });

  describe('size variations', () => {
    it('applies compact size classes', () => {
      const wrapper = mountButton({ compact: true });
      const button = wrapper.find('button');

      expect(button.classes().join(' ')).toContain('atw:w-[clamp(110px,30vw,130px)]');
    });

    it('applies fluid size classes', () => {
      const wrapper = mountButton({ fluid: true });
      const button = wrapper.find('button');

      expect(button.classes()).toContain('atw:flex-1');
      expect(button.classes()).toContain('atw:min-w-0');
    });

    it('applies default size when not compact or fluid', () => {
      const wrapper = mountButton({ compact: false, fluid: false });
      const button = wrapper.find('button');

      expect(button.classes().join(' ')).toContain('atw:w-[clamp(150px,40vw,250px)]');
    });

    it('applies compact text size to amount', () => {
      const wrapper = mountButton({ compact: true });
      const amountSpan = wrapper.findAll('span')[1];

      expect(amountSpan.classes()).toContain('atw:text-5xl');
    });

    it('applies default text size to amount when not compact', () => {
      const wrapper = mountButton({ compact: false });
      const amountSpan = wrapper.findAll('span')[1];

      expect(amountSpan.classes()).toContain('atw:text-[65px]');
    });
  });

  describe('variant styles', () => {
    it('uses landscape label style when variant is landscape', () => {
      const wrapper = mountButton({ variant: 'landscape', textColor: '#111111' });
      const label = wrapper.findAll('span')[1];
      const style = label.attributes('style');

      expect(style).toContain('background: none');
      expect(style).toContain('color');
    });
  });

  describe('custom styling props', () => {
    it('applies custom background image', () => {
      const customBg = 'linear-gradient(90deg, red, blue)';
      const wrapper = mountButton({ backgroundImage: customBg });
      const button = wrapper.find('button');

      expect(button.attributes('style')).toContain(customBg);
    });
  });

  describe('accessibility', () => {
    it('button is focusable when not disabled', () => {
      const wrapper = mountButton({ disabled: false });
      const button = wrapper.find('button');

      expect(button.attributes('type')).toBe('button');
    });
  });
});
