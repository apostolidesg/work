import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useConfiguration } from '@/composables/useConfiguration';
import { PROMO_CARDS_CONFIG } from '@/config/promoCardsConfig';
import {
  GAME_KEY_MAP,
  RESERVED_JACKPOT_KEYS,
  isRecord,
  getConfigRoot,
  getModeFromRoute,
  getLobbyConfig,
} from '@/util/lobbyHelpers';

const GAME_KEY_TO_ID = Object.fromEntries(
  Object.entries(GAME_KEY_MAP)
    .filter(([, v]) => v)
    .map(([id, key]) => [key.toLowerCase(), id])
);
const FALLBACK_GAME_IDS = Object.keys(PROMO_CARDS_CONFIG.games);

export const getGameKey = (id) => (id ? GAME_KEY_MAP[id] || String(id).toUpperCase() : id);

const normalizeGameId = (value) => {
  if (!value) return '';
  const lower = String(value).trim().toLowerCase();
  return GAME_KEY_TO_ID[lower] || GAME_KEY_MAP[lower]
    ? Object.entries(GAME_KEY_MAP).find(([, v]) => v.toLowerCase() === lower)?.[0] || lower
    : lower;
};

const extractGameIds = (config) => {
  if (!isRecord(config)) return [];
  return Object.keys(config)
    .filter((k) => !RESERVED_JACKPOT_KEYS.has(k))
    .map(normalizeGameId)
    .filter((id) => id && FALLBACK_GAME_IDS.includes(id));
};

const findConfigKey = (config, gameId) => {
  if (!isRecord(config)) return null;
  const target = normalizeGameId(gameId);
  if (!target) return null;
  for (const key of Object.keys(config)) {
    if (!RESERVED_JACKPOT_KEYS.has(key) && normalizeGameId(key) === target) return key;
  }
  return null;
};

const normalizeOrder = (order, fallbackOrder, defaults) => {
  for (const source of [order, fallbackOrder]) {
    if (!Array.isArray(source) || !source.length) continue;
    const ids = source
      .map((item) => normalizeGameId(typeof item === 'string' ? item : item?.id || item?.game || item?.GAME || ''))
      .filter((id) => id && FALLBACK_GAME_IDS.includes(id));
    if (ids.length) return ids;
  }
  return defaults;
};

const getAmount = (item) => {
  if (!item) return undefined;
  for (const key of ['amount', 'price', 'value', 'cost', 'tzoker', 'eurojackpot']) {
    if (item[key] != null) return item[key];
  }
  return undefined;
};

const DEFAULT_BETSLIPS = {
  tzoker: [
    { label: 1, description: 'promo.oneColumn', amount: 1, columns: 1 },
    { label: 6, description: 'promo.columns', amount: 6, columns: 6 },
    { label: 1, description: 'promo.allTzoker', amount: 20, columns: 15 },
  ],
  eurojackpot: [
    { label: 2, description: 'promo.columns', amount: 5, columns: 2 },
    { label: 4, description: 'promo.columns', amount: 10, columns: 4 },
    { label: 10, description: 'promo.columns', amount: 25, columns: 10 },
  ],
};

const normalizeBetslips = (betslips) => {
  if (Array.isArray(betslips)) return betslips;
  if (betslips && typeof betslips === 'object') {
    return Object.keys(betslips)
      .sort()
      .map((key) => betslips[key]);
  }
  return [];
};

export const mapReadyBetslips = (betslips, fallbacks = []) => {
  const safeFb = Array.isArray(fallbacks) ? fallbacks.filter(Boolean) : [];
  const items = normalizeBetslips(betslips);
  if (!items.length) return safeFb;

  return items.map((item, i) => {
    const s = item || {};
    const fb = safeFb[i] || {};
    const amount = getAmount(s);
    const columns = s.columns ?? fb.columns ?? 1;
    const rawLabel = Number(s.label ?? s.LABEL ?? columns ?? fb.label);
    return {
      label: Number.isFinite(rawLabel) ? rawLabel : fb.label || columns,
      description: s.text || s.description || fb.description || '',
      amount: amount ?? fb.amount ?? 0,
      columns,
    };
  });
};

const isUsableUrl = (v) =>
  !!v && (v.startsWith('http') || v.startsWith('data:') || v.startsWith('blob:') || v.startsWith('/'));

const buildGame = (primary, fallbackCfg, gameId, resolveAsset, orientationConfig = {}) => {
  const fallback = PROMO_CARDS_CONFIG.games[gameId];
  const defaultPriceOptions = DEFAULT_BETSLIPS[gameId] || [];
  const pKey = findConfigKey(primary, gameId);
  const fKey = findConfigKey(fallbackCfg, gameId);
  const primaryGame = pKey ? primary[pKey] : null;
  const fallbackGame = fKey ? fallbackCfg[fKey] : null;

  if (!fallback && !primaryGame && !fallbackGame) return null;

  const configGame = { ...(fallbackGame || {}), ...(primaryGame || {}) };

  let backgroundImage = resolveAsset(configGame.BACKGROUND_IMAGE);
  if (!isUsableUrl(backgroundImage)) {
    const orientationBg = resolveAsset(orientationConfig.BACKGROUND_IMAGE);
    if (isUsableUrl(orientationBg)) {
      backgroundImage = orientationBg;
    }
  }

  const betslips = configGame.READY_BETSLIPS;

  return {
    id: gameId,
    backgroundImage,
    jackpotAmount: configGame.JACKPOT_AMOUNT || fallback?.jackpotAmount || '',
    priceOptions: mapReadyBetslips(betslips, defaultPriceOptions),
    disabled: configGame.DISABLED ?? fallback?.disabled ?? false,
  };
};

export function useLobbyPromoConfig() {
  const { appConfig } = useConfiguration();
  const route = useRoute();

  const configRoot = computed(() => getConfigRoot(appConfig.value));
  const lobbyMode = computed(() => getModeFromRoute(route.path) || configRoot.value?.LOBBY?.DEFAULT_MODE || 'easy');
  const lobbyConfig = computed(() => getLobbyConfig(configRoot.value, lobbyMode.value) || {});

  const hJackpot = computed(() => lobbyConfig.value?.HORIZONTAL?.JACKPOT_GAMES_AREA || {});
  const vJackpot = computed(() => lobbyConfig.value?.VERTICAL?.JACKPOT_GAMES_AREA || {});

  const assetBase = computed(
    () =>
      lobbyConfig.value?.ASSET_URL ||
      lobbyConfig.value?.HORIZONTAL?.ASSET_URL ||
      lobbyConfig.value?.VERTICAL?.ASSET_URL ||
      configRoot.value?.LOBBY?.ASSET_URL ||
      configRoot.value?.ASSET_URL ||
      appConfig.value?.LOBBY?.ASSET_URL ||
      appConfig.value?.ASSET_URL ||
      ''
  );

  const resolveAsset = (value) => {
    if (!value) return '';
    const trimmed = String(value).trim();
    if (!trimmed) return '';
    if (
      /^(https?:)?\/\//i.test(trimmed) ||
      trimmed.startsWith('data:') ||
      trimmed.startsWith('blob:') ||
      trimmed.startsWith('/')
    ) {
      return trimmed;
    }
    const base = assetBase.value;
    if (!base) return trimmed;
    return `${String(base).replace(/[/\\]+$/, '')}/${trimmed.replace(/^[/\\]+/, '')}`;
  };

  const defaultIds = computed(() => {
    const ids = [...new Set([...extractGameIds(hJackpot.value), ...extractGameIds(vJackpot.value)])];
    return ids.length ? ids : FALLBACK_GAME_IDS;
  });

  const getOrder = (cfg) => cfg?.ORDER ?? cfg?.order ?? cfg?.Order;

  const buildGames = (jackpotConfig, fallbackCfg, orientationConfig, orientation) => {
    const order = normalizeOrder(getOrder(jackpotConfig), getOrder(fallbackCfg), defaultIds.value);
    return order
      .map((id) => buildGame(jackpotConfig, fallbackCfg, id, resolveAsset, orientationConfig, orientation))
      .filter(Boolean);
  };

  const portraitGames = computed(() =>
    buildGames(
      vJackpot.value,
      hJackpot.value,
      lobbyConfig.value?.VERTICAL || lobbyConfig.value?.HORIZONTAL || {},
      'vertical'
    )
  );
  const landscapeGames = computed(() =>
    buildGames(
      hJackpot.value,
      vJackpot.value,
      lobbyConfig.value?.HORIZONTAL || lobbyConfig.value?.VERTICAL || {},
      'horizontal'
    )
  );

  const portraitPromotionalImage = computed(() =>
    resolveAsset(vJackpot.value?.PROMOTIONAL_IMAGE || hJackpot.value?.PROMOTIONAL_IMAGE)
  );
  const landscapePromotionalImage = computed(() =>
    resolveAsset(hJackpot.value?.PROMOTIONAL_IMAGE || vJackpot.value?.PROMOTIONAL_IMAGE)
  );

  return {
    portraitGames,
    landscapeGames,
    portraitPromotionalImage,
    landscapePromotionalImage,
    horizontalJackpot: hJackpot,
    verticalJackpot: vJackpot,
    resolveAsset,
  };
}
