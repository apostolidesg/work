import { computed, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useConfiguration } from '@/composables/useConfiguration';
import { isRecord, exists, pickLocalized, getConfigRoot, getModeFromRoute, getLobbyConfig } from '@/util/lobbyHelpers';
import cmsFallbackEl from '@/locales/el/cms-fallback-el.js';
import cmsFallbackEn from '@/locales/en/cms-fallback-en.js';

const DEFAULT_LOCALE = 'en';
const CMS_FALLBACKS = { el: cmsFallbackEl, en: cmsFallbackEn };

const getByPath = (obj, path) => path?.split('.').reduce((acc, key) => acc?.[key] ?? undefined, obj);

export function useConfigText() {
  const store = useStore();
  const { appConfig } = useConfiguration();
  const route = useRoute();
  const instance = getCurrentInstance();

  const configRoot = computed(() => getConfigRoot(appConfig.value));

  const locale = computed(() => store.state?.i18n?.locale || configRoot.value?.DEFAULT_LOCALE || DEFAULT_LOCALE);
  const fallbackLocale = computed(() => store.state?.i18n?.fallback || DEFAULT_LOCALE);
  const locales = computed(() => [locale.value, fallbackLocale.value, DEFAULT_LOCALE]);

  const lobbyMode = computed(() => getModeFromRoute(route.path) || configRoot.value?.LOBBY?.DEFAULT_MODE || 'easy');
  const lobbyConfig = computed(() => getLobbyConfig(configRoot.value, lobbyMode.value));

  const cmsFallback = computed(() => {
    const fb = CMS_FALLBACKS[locale.value] || CMS_FALLBACKS.en;
    return getLobbyConfig(fb, lobbyMode.value);
  });

  const translationRoots = computed(() =>
    [lobbyConfig.value, configRoot.value, appConfig.value, cmsFallback.value].filter(Boolean)
  );

  const lookupInRoot = (root, key) => {
    if (!root) return undefined;

    const direct = getByPath(root, key) ?? root[key];
    if (exists(direct)) return direct;

    for (const loc of locales.value) {
      const locRoot = loc ? root[loc] : undefined;
      if (!locRoot) continue;
      const val = getByPath(locRoot, key) ?? locRoot[key];
      if (exists(val)) return val;
    }
    return undefined;
  };

  const lookupI18n = (key, params) => {
    const $t = instance?.proxy?.$t;
    if (typeof $t !== 'function') return undefined;
    try {
      const result = $t(key, params);
      return result !== key && exists(result) ? result : undefined;
    } catch {
      return undefined;
    }
  };

  const tConfig = (key, params) => {
    if (isRecord(key)) return pickLocalized(key, locales.value);
    if (key == null) return '';
    if (typeof key !== 'string') return key;

    for (const root of translationRoots.value) {
      const val = lookupInRoot(root, key);
      if (exists(val)) return pickLocalized(val, locales.value);
    }

    return lookupI18n(key, params) ?? '';
  };

  return { tConfig, locale };
}
