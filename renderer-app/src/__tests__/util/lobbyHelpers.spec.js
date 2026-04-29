import { isRecord, exists, getConfigRoot, getModeFromRoute, getLobbyConfig, pickLocalized } from '@/util/lobbyHelpers';
import { describe, expect, it } from 'vitest';

describe('lobbyHelpers', () => {
  describe('isRecord', () => {
    it('returns true for object literals', () => {
      expect(isRecord({})).toBe(true);
      expect(isRecord({ a: 1 })).toBe(true);
    });

    it('returns false for non-records', () => {
      expect(isRecord(null)).toBe(false);
      expect(isRecord(undefined)).toBe(false);
      expect(isRecord([])).toBe(false);
      expect(isRecord('string')).toBe(false);
      expect(isRecord(123)).toBe(false);
    });
  });

  describe('exists', () => {
    it('returns true for values other than null/undefined', () => {
      expect(exists(false)).toBe(true);
      expect(exists(0)).toBe(true);
      expect(exists('')).toBe(true);
    });

    it('returns false for null/undefined', () => {
      expect(exists(null)).toBe(false);
      expect(exists(undefined)).toBe(false);
    });
  });

  describe('getConfigRoot', () => {
    it('returns root if LOBBY exists', () => {
      const config = { LOBBY: { some: 'config' } };
      expect(getConfigRoot(config)).toBe(config);
    });

    it('returns vue prop if it is a record', () => {
      const config = { vue: { LOBBY: {} } };
      expect(getConfigRoot(config)).toBe(config.vue);
    });

    it('returns config itself as fallback', () => {
      const config = { other: 'stuff' };
      expect(getConfigRoot(config)).toBe(config);
    });

    it('returns empty object if config is not a record', () => {
      expect(getConfigRoot(null)).toEqual({});
    });
  });

  describe('getModeFromRoute', () => {
    it('detects pro mode', () => {
      expect(getModeFromRoute('/pro/dashboard')).toBe('pro');
    });

    it('detects easy mode', () => {
      expect(getModeFromRoute('/easy/home')).toBe('easy');
    });

    it('returns empty string for others', () => {
      expect(getModeFromRoute('/other')).toBe('');
      expect(getModeFromRoute(null)).toBe('');
    });
  });

  describe('getLobbyConfig', () => {
    const root = {
      LOBBY: {
        DEFAULT_MODE: 'easy',
        EASY: { id: 'easy-conf' },
        PRO: { id: 'pro-conf' },
        other: { id: 'other' },
      },
    };

    it('finds config by explicit mode', () => {
      expect(getLobbyConfig(root, 'pro')).toEqual({ id: 'pro-conf' });
    });

    it('falls back to DEFAULT_MODE if mode not found or provided', () => {
      expect(getLobbyConfig(root, undefined)).toEqual({ id: 'easy-conf' });
    });

    it('falls back to "easy" hardcoded if default missing', () => {
      const noDef = { LOBBY: { EASY: { id: 'found-easy' } } };
      expect(getLobbyConfig(noDef, 'unknown')).toEqual({ id: 'found-easy' });
    });
  });

  describe('pickLocalized', () => {
    it('returns value if not record', () => {
      expect(pickLocalized('test', [])).toBe('test');
    });

    it('picks preferred locale', () => {
      const val = { en: 'Hello', el: 'Yassas' };
      expect(pickLocalized(val, ['el', 'en'])).toBe('Yassas');
    });

    it('falls back to secondary locale', () => {
      const val = { en: 'Hello' };
      expect(pickLocalized(val, ['el', 'en'])).toBe('Hello');
    });

    it('returns data object as-is when no locale keys present', () => {
      const val = { order: 1, src: 'test.jpg', gameId: 'KINO' };
      expect(pickLocalized(val, ['el', 'en'])).toEqual(val);
    });

    it('returns keyed config object as-is', () => {
      const val = { IMAGE_1: { order: 1 }, IMAGE_2: { order: 2 } };
      expect(pickLocalized(val, ['el', 'en'])).toEqual(val);
    });

    it('returns object with unknown locale as-is', () => {
      const val = { fr: 'Bonjour' };
      expect(pickLocalized(val, ['el', 'en'])).toEqual(val);
    });
  });
});
