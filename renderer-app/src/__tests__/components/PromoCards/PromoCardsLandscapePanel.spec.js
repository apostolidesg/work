import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PromoCardsLandscapePanel from '@/components/PromoCards/PromoCardsLandscapePanel.vue';

vi.mock('@/composables/useConfigText', () => {
  return {
    useConfigText: () => ({
      tConfig: (key) => key,
    }),
  };
});

vi.mock('@/util/resolveBackgroundImage', () => ({
  default: (image) => (image ? `url(${image})` : undefined),
}));

vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

vi.mock('@/constants/gtmEvents', () => ({
  default: {
    SSBT_DGE_APPLICATION_TAB_SELECTED: 'SSBT_DGE_APPLICATION_TAB_SELECTED',
    SSBT_DGE_APPLICATION_OPEN_SLIP_MODAL: 'SSBT_DGE_APPLICATION_OPEN_SLIP_MODAL',
  },
}));

const mockTabs = [{ id: 'tzoker' }, { id: 'eurojackpot' }];

const mockActiveGame = {
  id: 'tzoker',
  jackpotAmount: '1.000.000€',
  priceOptions: [
    { label: '1€', description: 'promo.oneColumn', amount: 1, columns: 1 },
    { label: '2€', description: 'promo.columns', amount: 2, columns: 2 },
  ],
  disabled: false,
  backgroundImage: '/path/to/background.jpg',
};

const mountPanel = (props = {}) =>
  mount(PromoCardsLandscapePanel, {
    props: {
      tabs: mockTabs,
      activeTab: 'tzoker',
      activeGame: mockActiveGame,
      title: 'Promo title',
      wheelSrc: '/wheel.png',
      fallbackWheelSrc: '/fallback-wheel.png',
      ...props,
    },
    global: {
      stubs: {
        AnimatedWheel: {
          name: 'AnimatedWheel',
          template: '<div class="animated-wheel"></div>',
          props: ['size', 'src', 'fallbackSrc'],
        },
        FortuneCookieCard: {
          name: 'FortuneCookieCard',
          template: '<div class="fortune-cookie"></div>',
          props: ['gameType', 'logoSrc', 'disabled'],
        },
        PriceButton: {
          name: 'PriceButton',
          template: '<button class="price-button"></button>',
          props: ['gameType', 'label', 'descriptionLabel', 'description', 'amount', 'columns', 'disabled'],
        },
      },
    },
  });

describe('PromoCardsLandscapePanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the component with all main elements', () => {
      const wrapper = mountPanel();

      expect(wrapper.find('.animated-wheel').exists()).toBe(true);
      expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
      expect(wrapper.find('[role="tabpanel"]').exists()).toBe(true);
      expect(wrapper.find('.fortune-cookie').exists()).toBe(true);
    });

    it('renders title with correct text from tConfig', () => {
      const wrapper = mountPanel();
      const title = wrapper.find('h2');

      expect(title.text()).toBe('LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.PROMOTIONAL_TEXT');
    });

    it('renders jackpot content correctly', () => {
      const wrapper = mountPanel();

      expect(wrapper.text()).toContain('LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.TZOKER.JACKPOT_TEXT');
      expect(wrapper.text()).toContain('1.000.000€');
      expect(wrapper.text()).toContain('LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.TZOKER.READY_BETSLIPS_TEXT');
    });

    it('renders manual button with correct text from tConfig', () => {
      const wrapper = mountPanel();
      const button = wrapper.find('button[aria-label="promo.a11y.selectYourNumbers"]');

      expect(button.text()).toBe('LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.TZOKER.MANUAL_BETSLIP_BUTTON_TEXT');
    });

    it('renders eurojackpot content when activeGame is eurojackpot', () => {
      const wrapper = mountPanel({
        activeTab: 'eurojackpot',
        activeGame: { ...mockActiveGame, id: 'eurojackpot' },
      });

      expect(wrapper.text()).toContain('LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.EUROJACKPOT.JACKPOT_TEXT');
      expect(wrapper.text()).toContain('LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.EUROJACKPOT.READY_BETSLIPS_TEXT');
    });

    it('renders AnimatedWheel with correct props', () => {
      const wrapper = mountPanel();
      const wheel = wrapper.findComponent({ name: 'AnimatedWheel' });

      expect(wheel.exists()).toBe(true);
      expect(wheel.props('size')).toBe(200);
      expect(wheel.props('src')).toBe('/wheel.png');
      expect(wheel.props('fallbackSrc')).toBe('/fallback-wheel.png');
    });

    it('renders all tabs from tabs prop', () => {
      const wrapper = mountPanel();
      const tabs = wrapper.findAll('[role="tab"]');

      expect(tabs).toHaveLength(2);
    });
    it('renders FortuneCookieCard with correct props', () => {
      const wrapper = mountPanel();
      const fortuneCookie = wrapper.findComponent({ name: 'FortuneCookieCard' });

      expect(fortuneCookie.exists()).toBe(true);
      expect(fortuneCookie.props('gameType')).toBe('tzoker');
      expect(fortuneCookie.props('disabled')).toBe(false);
      expect(fortuneCookie.props('logoSrc')).toBeTruthy();
    });

    it('renders "or" text between sections', () => {
      const wrapper = mountPanel();

      expect(wrapper.text()).toContain('common.or');
    });
  });

  describe('Tab Navigation', () => {
    it('emits select-tab when a tab is clicked', async () => {
      const { default: gaService } = await import('@/services/gaService');
      const wrapper = mountPanel();
      const tabs = wrapper.findAll('[role="tab"]');

      await tabs[0].trigger('click');
      expect(wrapper.emitted('select-tab')).toBeTruthy();
      expect(wrapper.emitted('select-tab')[0]).toEqual(['tzoker']);
      expect(gaService.sendEvent).toHaveBeenCalledWith('SSBT_DGE_APPLICATION_TAB_SELECTED', {
        game_type: 'tzoker',
      });

      await tabs[1].trigger('click');
      expect(wrapper.emitted('select-tab')[1]).toEqual(['eurojackpot']);
      expect(gaService.sendEvent).toHaveBeenCalledWith('SSBT_DGE_APPLICATION_TAB_SELECTED', {
        game_type: 'eurojackpot',
      });
    });

    it('sets correct aria attributes on active tab', () => {
      const wrapper = mountPanel();
      const tabs = wrapper.findAll('[role="tab"]');

      expect(tabs[0].attributes('aria-selected')).toBe('true');
      expect(tabs[0].attributes('tabindex')).toBe('0');
      expect(tabs[1].attributes('aria-selected')).toBe('false');
      expect(tabs[1].attributes('tabindex')).toBe('-1');
    });

    it('sets correct aria-controls attribute on tabs', () => {
      const wrapper = mountPanel();
      const tabs = wrapper.findAll('[role="tab"]');

      expect(tabs[0].attributes('aria-controls')).toBe('tabpanel-tzoker');
      expect(tabs[1].attributes('aria-controls')).toBe('tabpanel-eurojackpot');
    });

    it('applies active tab styles correctly', () => {
      const wrapper = mountPanel();
      const firstTab = wrapper.findAll('[role="tab"]')[0];

      expect(firstTab.attributes('style')).toContain('background');
    });
  });

  describe('User Interactions', () => {
    it('emits select-slip when PriceButton emits select', async () => {
      const wrapper = mountPanel();
      const priceButtons = wrapper.findAllComponents({ name: 'PriceButton' });

      await priceButtons[0].vm.$emit('select');
      expect(wrapper.emitted('select-slip')).toBeTruthy();
      expect(wrapper.emitted('select-slip')[0]).toEqual([1, 1]);
    });

    it('emits select-numbers with correct payload', async () => {
      const { default: gaService } = await import('@/services/gaService');
      const wrapper = mountPanel();
      const button = wrapper.find('button[aria-label="promo.a11y.selectYourNumbers"]');

      await button.trigger('click');
      expect(wrapper.emitted('select-numbers')).toEqual([[1]]);
      expect(gaService.sendEvent).toHaveBeenCalledWith('SSBT_DGE_APPLICATION_OPEN_SLIP_MODAL', {
        method: 'opening_slip_modal_from_select_numbers_button',
      });
    });

    it('emits submit-fortune with correct payload', async () => {
      const wrapper = mountPanel();
      // Need to find Vue component instance to emit event
      const fortuneCookie = wrapper.findComponent({ name: 'FortuneCookieCard' });

      await fortuneCookie.vm.$emit('submit-slip', { mainNumbers: [1, 2, 3], bonusNumbers: [4] });
      expect(wrapper.emitted('submit-fortune')).toEqual([[{ mainNumbers: [1, 2, 3], bonusNumbers: [4] }]]);
    });

    it('emits select-slip with correct amount and columns for each price option', async () => {
      const wrapper = mountPanel();
      const priceButtons = wrapper.findAllComponents({ name: 'PriceButton' });

      await priceButtons[1].vm.$emit('select');
      expect(wrapper.emitted('select-slip')[0]).toEqual([2, 2]);
    });
  });

  describe('Disabled State', () => {
    it('does not emit select-numbers when disabled', async () => {
      const wrapper = mountPanel({
        activeGame: { ...mockActiveGame, disabled: true },
      });
      const button = wrapper.find('button[aria-label="promo.a11y.selectYourNumbers"]');

      await button.trigger('click');
      expect(wrapper.emitted('select-numbers')).toBeFalsy();
    });

    it('passes disabled prop to PriceButton components', () => {
      const wrapper = mountPanel({
        activeGame: { ...mockActiveGame, disabled: true },
      });
      const priceButtons = wrapper.findAllComponents({ name: 'PriceButton' });

      priceButtons.forEach((btn) => {
        expect(btn.props('disabled')).toBe(true);
      });
    });

    it('passes disabled prop to FortuneCookieCard', () => {
      const wrapper = mountPanel({
        activeGame: { ...mockActiveGame, disabled: true },
      });
      const fortuneCookie = wrapper.findComponent({ name: 'FortuneCookieCard' });

      expect(fortuneCookie.props('disabled')).toBe(true);
    });
  });

  describe('No Active Game', () => {
    it('does not render tabpanel when activeGame is null', () => {
      const wrapper = mountPanel({
        activeGame: null,
      });

      expect(wrapper.find('[role="tabpanel"]').exists()).toBe(false);
      expect(wrapper.find('.fortune-cookie').exists()).toBe(false);
    });

    it('renders tabs even when activeGame is null', () => {
      const wrapper = mountPanel({
        activeGame: null,
      });

      expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
      expect(wrapper.findAll('[role="tab"]')).toHaveLength(2);
    });
  });

  describe('Logo Handling', () => {
    it('renders tab logos with correct src', () => {
      const wrapper = mountPanel();
      const logos = wrapper.findAll('[role="tab"] img');

      expect(logos).toHaveLength(2);
      logos.forEach((logo) => {
        expect(logo.attributes('src')).toBeTruthy();
      });
    });

    it('handles logo error with fallback', async () => {
      const wrapper = mountPanel();
      const logo = wrapper.findAll('[role="tab"] img')[0];

      await logo.trigger('error');

      expect(logo.element.src).toBeTruthy();
    });

    it('passes correct logo to FortuneCookieCard for tzoker', () => {
      const wrapper = mountPanel({
        activeTab: 'tzoker',
        activeGame: { ...mockActiveGame, id: 'tzoker' },
      });
      const fortuneCookie = wrapper.findComponent({ name: 'FortuneCookieCard' });

      expect(fortuneCookie.props('logoSrc')).toBeTruthy();
    });

    it('passes correct logo to FortuneCookieCard for eurojackpot', () => {
      const wrapper = mountPanel({
        activeTab: 'eurojackpot',
        activeGame: { ...mockActiveGame, id: 'eurojackpot' },
      });
      const fortuneCookie = wrapper.findComponent({ name: 'FortuneCookieCard' });

      expect(fortuneCookie.props('logoSrc')).toBeTruthy();
    });

    it('renders logos with lazy loading and async decoding', () => {
      const wrapper = mountPanel();
      const logos = wrapper.findAll('[role="tab"] img');

      logos.forEach((logo) => {
        expect(logo.attributes('loading')).toBe('lazy');
        expect(logo.attributes('decoding')).toBe('async');
      });
    });

    it('renders tab logos with correct alt text', () => {
      const wrapper = mountPanel();
      const logos = wrapper.findAll('[role="tab"] img');

      expect(logos[0].attributes('alt')).toBe('promo.tzokerLogo');
      expect(logos[1].attributes('alt')).toBe('promo.eurojackpotLogo');
    });
  });

  describe('Accessibility', () => {
    it('sets correct aria-label on tablist', () => {
      const wrapper = mountPanel();
      const tablist = wrapper.find('[role="tablist"]');

      expect(tablist.attributes('aria-label')).toBe('promo.a11y.selectGame');
    });

    it('sets correct aria-labelledby on tabpanel', () => {
      const wrapper = mountPanel();
      const tabpanel = wrapper.find('[role="tabpanel"]');

      expect(tabpanel.attributes('id')).toBe('tabpanel-tzoker');
      expect(tabpanel.attributes('aria-labelledby')).toBe('tab-tzoker');
    });

    it('marks wheel as aria-hidden', () => {
      const wrapper = mountPanel();
      const wheel = wrapper.find('.game-card__wheel');

      expect(wheel.attributes('aria-hidden')).toBe('true');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty tabs array', () => {
      const wrapper = mountPanel({
        tabs: [],
        activeGame: null,
      });

      expect(wrapper.findAll('[role="tab"]')).toHaveLength(0);
    });

    it('handles price options without label', () => {
      const wrapper = mountPanel({
        activeGame: {
          ...mockActiveGame,
          priceOptions: [{ amount: 1, columns: 1 }],
        },
      });
      const priceButton = wrapper.findComponent({ name: 'PriceButton' });

      expect(priceButton.props('label')).toBe('');
    });

    it('handles price options without description', () => {
      const wrapper = mountPanel({
        activeGame: {
          ...mockActiveGame,
          priceOptions: [{ label: '1€', amount: 1, columns: 1 }],
        },
      });
      const priceButton = wrapper.findComponent({ name: 'PriceButton' });

      expect(priceButton.props('description')).toBe('');
    });
  });
});
