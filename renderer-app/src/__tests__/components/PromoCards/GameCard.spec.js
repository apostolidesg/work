import { beforeAll, describe, expect, it, vi, beforeEach } from 'vitest';
import { computed } from 'vue';
import { mount } from '@vue/test-utils';

vi.mock('@/composables/useConfigText', () => {
  return {
    useConfigText: () => ({
      tConfig: (key) => key,
    }),
  };
});

vi.mock('@/composables/useLobbyPromoConfig', () => {
  return {
    useLobbyPromoConfig: () => ({
      verticalJackpot: computed(() => ({
        TZOKER: {
          READY_BETSLIPS_TEXT: 'Select slip',
          MANUAL_BETSLIP_BUTTON_TEXT: 'Select numbers',
          READY_BETSLIPS: [
            { columns: 1, tzoker: 1, text: '1 column' },
            { columns: 6, tzoker: 6, text: '6 columns' },
          ],
        },
      })),
    }),
    mapReadyBetslips: (readyBetslips) =>
      readyBetslips.map((item) => ({
        label: `${item.tzoker}€`,
        description: item.text,
        amount: item.tzoker,
        columns: item.columns,
      })),
    getGameKey: (id) => (id === 'tzoker' ? 'TZOKER' : id?.toUpperCase?.()),
  };
});

vi.mock('@/services/gaService', () => ({
  default: {
    sendEvent: vi.fn(),
  },
}));

vi.mock('@/constants/gtmEvents', () => ({
  default: {
    SSBT_DGE_APPLICATION_OPEN_SLIP_MODAL: 'open_slip_modal',
  },
}));

let GameCard;

beforeAll(async () => {
  GameCard = (await import('@/components/PromoCards/GameCard.vue')).default;
});

const mountGameCard = (overrides = {}) =>
  mount(GameCard, {
    props: {
      gameType: 'tzoker',
      logoSrc: 'https://example.com/logo.png',
      fallbackLogoSrc: 'https://example.com/fallback.png',
      logoAlt: 'Tzoker',
      jackpotAmount: '1.000.000€',
      priceOptions: [],
      backgroundImage: 'https://example.com/bg.png',
      selectSlipText: '',
      manualButtonText: '',
      disabled: false,
      ...overrides,
    },
    global: {
      stubs: {
        PriceButton: {
          template: '<button class="price-button" @click="$emit(\'select\', 1, 2)">price</button>',
        },
      },
    },
  });

describe('GameCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('emits select-numbers when button is clicked', async () => {
    const { default: gaService } = await import('@/services/gaService');
    const { default: gtmEvents } = await import('@/constants/gtmEvents');
    const wrapper = mountGameCard();
    await wrapper.find('button[type="button"]').trigger('click');

    expect(wrapper.emitted('select-numbers')).toEqual([[1]]);
    expect(gaService.sendEvent).toHaveBeenCalledWith(gtmEvents.SSBT_DGE_APPLICATION_OPEN_SLIP_MODAL, {
      method: 'opening_slip_modal_from_select_numbers_button',
    });
  });

  it('falls back to fallback logo on error', async () => {
    const wrapper = mountGameCard();
    const img = wrapper.find('img');

    await img.trigger('error');
    expect(img.attributes('src')).toBe('https://example.com/fallback.png');
  });

  it('applies background image when provided', () => {
    const wrapper = mountGameCard();
    const article = wrapper.find('article');

    expect(article.attributes('style')).toContain('background-image');
  });
});
