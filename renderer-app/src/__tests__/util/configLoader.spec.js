import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import axios from 'axios';

import EventSenderService from '@/util/handler/EventSenderService';

import EventTypes from '@/util/handler/EventTypes';

import { fetchCmsConfiguration, loadConfiguration } from '@/util/configLoader';

vi.mock('axios');
vi.mock('@/util/LoggerService', () => ({ logToMainProcess: vi.fn() }));

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  delete globalThis.window;
});

describe('configLoader', () => {
  describe('fetchCmsConfiguration', () => {
    it('returns null and warns when VITE_CMS_CONFIG_URL is not defined', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      vi.stubGlobal('import', { meta: { env: {} } });

      const result = await fetchCmsConfiguration();

      expect(consoleWarnSpy).toHaveBeenCalledWith('VITE_CMS_CONFIG_URL is not defined');
      expect(result).toBeNull();
      expect(axios.get).not.toHaveBeenCalled();
    });
  });

  describe('loadConfiguration', () => {
    it('merges electron configuration when electron API is available', async () => {
      globalThis.window = { electronAPI: { invokeMain: vi.fn() } };

      vi.spyOn(EventSenderService, 'sendSyncRequest').mockResolvedValue({
        vue: {
          FEATURE_FLAG: true,

          nested: { a: 1 },
        },

        test: {
          voucher: 'V-123',
        },
      });

      const result = await loadConfiguration();

      expect(EventSenderService.sendSyncRequest).toHaveBeenCalledWith(EventTypes.LOAD_CONFIGURATION);

      expect(result.configuration.FEATURE_FLAG).toBe(true);
      expect(result.configuration.nested).toEqual({ a: 1 });
      expect(result.voucher).toBe('V-123');
    });

    it('skips electron load when electron API is not available', async () => {
      vi.spyOn(EventSenderService, 'sendSyncRequest');

      const result = await loadConfiguration();
      expect(EventSenderService.sendSyncRequest).not.toHaveBeenCalled();
      expect(result.voucher).toBeNull();
    });

    it('handles electron API error gracefully', async () => {
      globalThis.window = { electronAPI: { invokeMain: vi.fn() } };

      vi.spyOn(EventSenderService, 'sendSyncRequest').mockRejectedValue(new Error('IPC error'));

      const result = await loadConfiguration();
      expect(result.configuration).toBeDefined();
      expect(result.voucher).toBeNull();
    });
  });
});
