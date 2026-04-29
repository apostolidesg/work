export const GAME_KEY_MAP = {
  tzoker: 'TZOKER',
  t: 'TZOKER',
  eurojackpot: 'EUROJACKPOT',
  e: 'EUROJACKPOT',
};

export const RESERVED_JACKPOT_KEYS = new Set(['ORDER', 'PROMOTIONAL_TEXT', 'PROMOTIONAL_IMAGE']);

export const isRecord = (v) => v != null && typeof v === 'object' && !Array.isArray(v);
export const exists = (v) => v !== undefined && v !== null;

export const getConfigRoot = (config) => {
  if (!isRecord(config)) return {};
  if (isRecord(config.LOBBY)) return config;
  return isRecord(config.vue) ? config.vue : config;
};

export const getModeFromRoute = (path) => {
  const p = String(path || '');
  if (p.startsWith('/pro')) return 'pro';
  if (p.startsWith('/easy')) return 'easy';
  return '';
};

export const getLobbyConfig = (root, mode) => {
  const lobby = root?.LOBBY;
  if (!lobby) return undefined;

  const m = String(mode || '').trim();
  const def = String(lobby.DEFAULT_MODE || '').trim();

  for (const candidate of [m, def, 'easy']) {
    if (!candidate) continue;
    const found = lobby[candidate.toUpperCase()] || lobby[candidate.toLowerCase()];
    if (found) return found;
  }
  return undefined;
};

export const pickLocalized = (value, locales) => {
  if (!isRecord(value)) return value;

  const localeKeys = new Set(locales.filter(Boolean));
  const keys = Object.keys(value);
  const hasLocaleKeys = keys.some((key) => localeKeys.has(key));
  if (!hasLocaleKeys) return value;
  for (const loc of locales) {
    if (loc && exists(value[loc])) return value[loc];
  }
  return Object.values(value).find(exists) ?? value;
};
