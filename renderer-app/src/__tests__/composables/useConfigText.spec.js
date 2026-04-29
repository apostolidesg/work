import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';

const mockState = {
  i18n: {
    locale: 'en',
    fallback: 'en',
    translations: {},
  },
};

const mockAppConfig = ref({});
const mockRoute = ref({ path: '/easy/home' });

let mockProxy = {};
let mockSetupState = {};
let mockProps = {};

vi.mock('vuex', () => ({
  useStore: () => ({ state: mockState }),
}));

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute.value,
}));

vi.mock('@/composables/useConfiguration', () => ({
  useConfiguration: () => ({ appConfig: mockAppConfig }),
}));

vi.mock('@/constants/routeNames', () => ({
  default: {
    LOBBY_MODE_EASY: 'EASY',
  },
}));

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getCurrentInstance: () => ({
      proxy: mockProxy,
      setupState: mockSetupState,
      props: mockProps,
    }),
  };
});

const { useConfigText } = await import('@/composables/useConfigText');

const reset = () => {
  mockState.i18n = { locale: 'en', fallback: 'en', translations: {} };
  mockAppConfig.value = {};
  mockProxy = {};
  mockSetupState = {};
  mockProps = {};
  mockRoute.value = { path: '/easy/home' };
};

describe('useConfigText', () => {
  beforeEach(reset);

  describe('returned API', () => {
    it('returns tConfig and locale', () => {
      const api = useConfigText();
      expect(api).toHaveProperty('tConfig');
      expect(api).toHaveProperty('locale');
      expect(typeof api.tConfig).toBe('function');
    });
  });

  describe('locale', () => {
    it('uses store i18n locale', () => {
      mockState.i18n.locale = 'el';
      const { locale } = useConfigText();
      expect(locale.value).toBe('el');
    });

    it('falls back to appConfig.DEFAULT_LOCALE when store locale is empty', () => {
      mockState.i18n.locale = '';
      mockAppConfig.value = { DEFAULT_LOCALE: 'fr' };
      const { locale } = useConfigText();
      expect(locale.value).toBe('fr');
    });
  });

  describe('non-string keys', () => {
    it('passes through numbers', () => {
      const { tConfig } = useConfigText();
      expect(tConfig(42)).toBe(42);
    });

    it('passes through booleans', () => {
      const { tConfig } = useConfigText();
      expect(tConfig(true)).toBe(true);
      expect(tConfig(false)).toBe(false);
    });

    it('passes through arrays (not treated as object record)', () => {
      const { tConfig } = useConfigText();
      const arr = ['a', 'b'];
      expect(tConfig(arr)).toBe(arr);
    });
  });

  describe('CMS / config translation roots', () => {
    it('resolves flat key from LOBBY config (Easy mode default)', () => {
      mockAppConfig.value = {
        LOBBY: {
          DEFAULT_MODE: 'EASY',
          EASY: { 'promo.title': 'Welcome' },
        },
      };
      const { tConfig } = useConfigText();

      expect(tConfig('promo.title')).toBe('Welcome');
    });

    it('resolves nested dot-path from LOBBY config', () => {
      mockAppConfig.value = {
        LOBBY: {
          EASY: { promo: { title: 'Nested' } },
        },
      };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.title')).toBe('Nested');
    });

    it('resolves deeply nested path', () => {
      mockAppConfig.value = {
        LOBBY: {
          EASY: { promo: { a11y: { nested: { deep: 'Found' } } } },
        },
      };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.a11y.nested.deep')).toBe('Found');
    });

    it('resolves locale-specific sub-object in root', () => {
      mockState.i18n.locale = 'el';
      mockAppConfig.value = {
        LOBBY: {
          EASY: {
            el: { 'promo.title': 'Καλωσήρθατε' },
            en: { 'promo.title': 'Welcome' },
          },
        },
      };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.title')).toBe('Καλωσήρθατε');
    });

    it('falls back to flat key when locale sub-object misses', () => {
      mockState.i18n.locale = 'el';
      mockAppConfig.value = {
        LOBBY: {
          EASY: {
            el: {},
            'promo.title': 'Flat fallback',
          },
        },
      };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.title')).toBe('Flat fallback');
    });

    it('resolves locale map object stored as key value', () => {
      mockState.i18n.locale = 'el';
      mockAppConfig.value = {
        LOBBY: {
          EASY: {
            'promo.selectSlip': { en: 'Select slip', el: 'Επιλέξτε δελτίο' },
          },
        },
      };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.selectSlip')).toBe('Επιλέξτε δελτίο');
    });
  });

  describe('preserves empty strings and zero', () => {
    it('returns empty string from config — does NOT fall through', () => {
      mockAppConfig.value = { LOBBY: { EASY: { 'promo.hidden': '' } } };
      mockProxy = { $t: () => 'should not reach $t' };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.hidden')).toBe('');
    });

    it('returns 0 from config — does NOT fall through', () => {
      mockAppConfig.value = { LOBBY: { EASY: { 'promo.count': 0 } } };
      mockProxy = { $t: () => 'should not reach $t' };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.count')).toBe(0);
    });

    it('returns false from config — does NOT fall through', () => {
      mockAppConfig.value = { LOBBY: { EASY: { 'promo.flag': false } } };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.flag')).toBe(false);
    });

    it('null from config falls through (not considered "set")', () => {
      mockAppConfig.value = { LOBBY: { EASY: { 'promo.key': null } } };
      mockProxy = { $t: (k) => (k === 'promo.key' ? 'from $t' : k) };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.key')).toBe('from $t');
    });

    it('undefined from config falls through (not considered "set")', () => {
      mockAppConfig.value = { LOBBY: { EASY: { 'promo.key': undefined } } };
      mockProxy = { $t: (k) => (k === 'promo.key' ? 'from $t' : k) };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.key')).toBe('from $t');
    });
  });

  describe('object locale maps passed as key', () => {
    it('resolves using current locale', () => {
      mockState.i18n.locale = 'el';
      const { tConfig } = useConfigText();
      expect(tConfig({ en: 'Hello', el: 'Γεια' })).toBe('Γεια');
    });

    it('falls back to fallback locale', () => {
      mockState.i18n.locale = 'fr';
      mockState.i18n.fallback = 'en';
      const { tConfig } = useConfigText();
      expect(tConfig({ en: 'Hello', el: 'Γεια' })).toBe('Hello');
    });

    it('returns object as-is when no locale matches at all', () => {
      mockState.i18n.locale = 'fr';
      mockState.i18n.fallback = 'de';
      const { tConfig } = useConfigText();
      const obj = { el: 'Γεια', it: 'Ciao' };
      expect(tConfig(obj)).toEqual(obj);
    });

    it('preserves empty string for current locale', () => {
      mockState.i18n.locale = 'el';
      const { tConfig } = useConfigText();
      expect(tConfig({ en: 'Hello', el: '' })).toBe('');
    });

    it('returns the whole object when all values are null', () => {
      const obj = { en: null, el: null };
      const { tConfig } = useConfigText();
      expect(tConfig(obj)).toBe(obj);
    });
  });

  describe('Vue-i18n $t lookup', () => {
    it('uses $t when config has no match', () => {
      mockProxy = { $t: (k) => (k === 'promo.fromPlugin' ? 'Plugin result' : k) };
      const { tConfig } = useConfigText();
      expect(tConfig('promo.fromPlugin')).toBe('Plugin result');
    });
  });

  describe('returns empty string when not found', () => {
    it('returns empty string when key is not in config or $t', () => {
      const { tConfig } = useConfigText();
      expect(tConfig('completely.missing.key')).toBe('');
    });
  });

  describe('full resolution order', () => {
    it('Config > $t > empty string', () => {
      mockAppConfig.value = { LOBBY: { EASY: { 'promo.a': 'CMS' } } };
      mockProxy = { $t: (k) => (k === 'promo.b' ? 'from $t' : k) };

      const { tConfig } = useConfigText();

      expect(tConfig('promo.a')).toBe('CMS');
      expect(tConfig('promo.b')).toBe('from $t');
      expect(tConfig('promo.d')).toBe('');
    });
  });
});
