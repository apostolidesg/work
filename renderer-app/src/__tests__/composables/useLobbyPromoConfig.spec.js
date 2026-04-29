import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, ref } from 'vue';
import { useLobbyPromoConfig, getGameKey, mapReadyBetslips } from '@/composables/useLobbyPromoConfig';

let mockConfig = ref({});
let mockRoute = ref({ path: '/easy' });

vi.mock('@/composables/useConfiguration', () => {
  return {
    useConfiguration: () => ({
      appConfig: computed(() => mockConfig.value),
    }),
  };
});

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute.value,
}));

describe('useLobbyPromoConfig helpers', () => {
  it('getGameKey maps keys correctly', () => {
    expect(getGameKey('tzoker')).toBe('TZOKER');
    expect(getGameKey('eurojackpot')).toBe('EUROJACKPOT');
    expect(getGameKey('kino')).toBe('KINO');
    expect(getGameKey('TZOKER')).toBe('TZOKER');
    expect(getGameKey('')).toBe('');
    expect(getGameKey(null)).toBe(null);
  });

  it('mapReadyBetslips transforms config items', () => {
    const input = [{ label: '5', amount: 10, columns: 2, text: 'Custom' }];
    const result = mapReadyBetslips(input);
    expect(result[0]).toEqual({
      label: 5,
      amount: 10,
      columns: 2,
      description: 'Custom',
    });
  });

  it('mapReadyBetslips handles various amount fields', () => {
    expect(mapReadyBetslips([{ tzoker: 5, columns: 1 }])[0].amount).toBe(5);
    expect(mapReadyBetslips([{ price: 10, columns: 1 }])[0].amount).toBe(10);
    expect(mapReadyBetslips([{ value: 15, columns: 1 }])[0].amount).toBe(15);
    expect(mapReadyBetslips([{ cost: 20, columns: 1 }])[0].amount).toBe(20);
  });
});

describe('useLobbyPromoConfig', () => {
  beforeEach(() => {
    mockRoute.value = { path: '/easy' };
    mockConfig.value = {
      LOBBY: {
        DEFAULT_MODE: 'EASY',
        EASY: {
          HORIZONTAL: {
            JACKPOT_GAMES_AREA: {
              ORDER: ['EUROJACKPOT', 'TZOKER'],
              TZOKER: {},
              EUROJACKPOT: {
                DISABLED: true,
              },
            },
            ASSET_URL: 'http://assets.com/',
          },
          VERTICAL: {
            JACKPOT_GAMES_AREA: {
              ORDER: ['TZOKER', 'EUROJACKPOT'],
              TZOKER: {},
              EUROJACKPOT: {},
            },
            PROMOTIONAL_TEXT: 'Vertical Title',
            PROMOTIONAL_IMAGE: 'v-promo.png',
            ASSET_URL: 'http://assets.com/',
          },
        },
        PRO: {
          HORIZONTAL: { JACKPOT_GAMES_AREA: { ORDER: ['TZOKER'], TZOKER: {} } },
        },
      },
    };
  });

  it('uses ORDER to set landscape and portrait game order', () => {
    const { landscapeGames, portraitGames } = useLobbyPromoConfig();

    expect(landscapeGames.value.map((game) => game.id)).toEqual(['eurojackpot', 'tzoker']);
    expect(portraitGames.value.map((game) => game.id)).toEqual(['tzoker', 'eurojackpot']);
  });

  it('accepts ORDER entries as objects', () => {
    mockConfig.value.LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.ORDER = [{ id: 'TZOKER' }, { game: 'EUROJACKPOT' }];

    const { landscapeGames } = useLobbyPromoConfig();
    expect(landscapeGames.value.map((game) => game.id)).toEqual(['tzoker', 'eurojackpot']);
  });

  it('accepts ORDER entries with GAME property', () => {
    mockConfig.value.LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.ORDER = [{ GAME: 'TZOKER' }, { GAME: 'EUROJACKPOT' }];
    const { landscapeGames } = useLobbyPromoConfig();
    expect(landscapeGames.value.map((game) => game.id)).toEqual(['tzoker', 'eurojackpot']);
  });

  it('normalizes game IDs to lowercase', () => {
    mockConfig.value.LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.ORDER = ['TZOKER', 'eurojackpot'];
    const { landscapeGames } = useLobbyPromoConfig();
    expect(landscapeGames.value.map((game) => game.id)).toEqual(['tzoker', 'eurojackpot']);
  });

  it('handles short game ID map', () => {
    mockConfig.value.LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.ORDER = ['t', 'e'];
    const { landscapeGames } = useLobbyPromoConfig();
    expect(landscapeGames.value.map((game) => game.id)).toEqual(['tzoker', 'eurojackpot']);
  });

  it('falls back to config keys when ORDER is missing', () => {
    mockConfig.value.LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA = {
      EUROJACKPOT: {},
      TZOKER: {},
    };
    delete mockConfig.value.LOBBY.EASY.VERTICAL.JACKPOT_GAMES_AREA.ORDER;

    const { landscapeGames } = useLobbyPromoConfig();
    expect(landscapeGames.value.map((game) => game.id)).toEqual(['eurojackpot', 'tzoker']);
  });

  it('filters out invalid game IDs from ORDER', () => {
    mockConfig.value.LOBBY.EASY.HORIZONTAL.JACKPOT_GAMES_AREA.ORDER = ['TZOKER', 'INVALID_GAME', '', null];
    const { landscapeGames } = useLobbyPromoConfig();
    expect(landscapeGames.value.map((game) => game.id)).toEqual(['tzoker']);
  });

  it('uses default mode when route mode is not found', () => {
    mockRoute.value.path = '/unknown';
    const { landscapeGames } = useLobbyPromoConfig();
    expect(landscapeGames.value.map((g) => g.id)).toEqual(['eurojackpot', 'tzoker']);
  });

  it('resolves absolute paths without base URL', () => {
    const { resolveAsset } = useLobbyPromoConfig();
    expect(resolveAsset('/absolute/path.png')).toBe('/absolute/path.png');
  });

  it('handles data URIs and blob URLs', () => {
    const { resolveAsset } = useLobbyPromoConfig();
    expect(resolveAsset('data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
    expect(resolveAsset('blob:http://test.com/123')).toBe('blob:http://test.com/123');
  });

  it('returns empty string for empty asset values', () => {
    const { resolveAsset } = useLobbyPromoConfig();
    expect(resolveAsset('')).toBe('');
    expect(resolveAsset(null)).toBe('');
    expect(resolveAsset('  ')).toBe('');
  });

  it('handles missing ASSET_URL gracefully', () => {
    delete mockConfig.value.LOBBY.EASY.HORIZONTAL.ASSET_URL;
    delete mockConfig.value.LOBBY.EASY.VERTICAL.ASSET_URL;
    const { resolveAsset } = useLobbyPromoConfig();
    expect(resolveAsset('test.png')).toBe('test.png');
  });
});
