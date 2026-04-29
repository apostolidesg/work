import { beforeEach, describe, expect, it, vi } from 'vitest';
import gaService from '@/services/gaService';
import axios from 'axios';
import store from '@/store/store';
import gtmEvents from '@/constants/gtmEvents';

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock('@/store/store', () => ({
  default: {
    getters: {},
  },
}));

const mockSessionStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

beforeEach(() => {
  vi.clearAllMocks();
  mockSessionStorage.clear();
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('gtmService (Server-Side)', () => {
  describe('sendEvent - Core Functionality', () => {
    it('should include custom parameters in event', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
        'CONFIGURATION_STORE_MODULE/IS_DEVELOPMENT_MODE': false,
        'SESSION_STORE_MODULE/GET_SSBT_ID': '123456789012',
      };

      axios.post.mockResolvedValue({ data: {} });

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_KINO_MANUAL_SUBMIT, {
        bet_amount: 5.0,
        selected_numbers: 8,
      });

      expect(axios.post).toHaveBeenCalled();
      const payload = axios.post.mock.calls[0][1];
      expect(payload.events[0].params).toMatchObject({
        bet_amount: 5.0,
        selected_numbers: 8,
      });
    });

    it('should include retailerId and terminalId from SSBT ID', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
        'CONFIGURATION_STORE_MODULE/IS_DEVELOPMENT_MODE': false,
        'SESSION_STORE_MODULE/GET_SSBT_ID': '123456789012',
      };

      axios.post.mockResolvedValue({ data: {} });

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);

      const payload = axios.post.mock.calls[0][1];
      expect(payload.events[0].params).toMatchObject({
        retailerId: '123456',
        terminalId: '789012',
      });
    });

    it('should not send event when measurement ID not configured', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            API_SECRET: 'test-api-secret',
          },
        },
        'CONFIGURATION_STORE_MODULE/IS_DEVELOPMENT_MODE': false,
      };

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);

      expect(axios.post).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        '[GTM Service] GA_MEASUREMENT_ID not configured. Event not sent:',
        'ssbt_lottery_lobby'
      );
    });

    it('should not send event when API secret not configured', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
          },
        },
        'CONFIGURATION_STORE_MODULE/IS_DEVELOPMENT_MODE': false,
      };

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);

      expect(axios.post).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        '[GTM Service] GA_API_SECRET not configured. Event not sent:',
        'ssbt_lottery_lobby'
      );
    });

    it('should reject invalid event names not in gtmEvents', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
        'CONFIGURATION_STORE_MODULE/IS_DEVELOPMENT_MODE': false,
      };

      await gaService.sendEvent('invalid_event_name');

      expect(axios.post).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it('should not send event when no event name is provided', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
      };

      await gaService.sendEvent();

      expect(axios.post).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle null retailerId and terminalId when SSBT ID is too short', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
        'SESSION_STORE_MODULE/GET_SSBT_ID': '123',
      };

      axios.post.mockResolvedValue({ data: {} });

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);

      const payload = axios.post.mock.calls[0][1];
      expect(payload.events[0].params).toMatchObject({
        retailerId: null,
        terminalId: null,
      });
    });

    it('should generate and reuse client ID from session storage', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
        'SESSION_STORE_MODULE/GET_SSBT_ID': '123456789012',
      };

      axios.post.mockResolvedValue({ data: {} });

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);
      const firstPayload = axios.post.mock.calls[0][1];
      const firstClientId = firstPayload.client_id;

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);
      const secondPayload = axios.post.mock.calls[1][1];
      const secondClientId = secondPayload.client_id;

      expect(firstClientId).toBe(secondClientId);
      expect(firstClientId).toBeTruthy();
    });

    it('should handle axios post errors gracefully', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
        'SESSION_STORE_MODULE/GET_SSBT_ID': '123456789012',
      };

      axios.post.mockRejectedValue(new Error('Network error'));

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);

      expect(console.error).toHaveBeenCalledWith('[GTM Service] Failed to send event:', expect.any(Error));
    });

    it('should include app name and mode in event params', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
        'SESSION_STORE_MODULE/GET_SSBT_ID': '123456789012',
      };

      axios.post.mockResolvedValue({ data: {} });

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);

      const payload = axios.post.mock.calls[0][1];
      expect(payload.events[0].params).toMatchObject({
        app: 'ssbt_dge_application',
        mode: expect.any(String),
      });
    });

    it('should include timestamp in event params', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
        'SESSION_STORE_MODULE/GET_SSBT_ID': '123456789012',
      };

      axios.post.mockResolvedValue({ data: {} });

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);

      const payload = axios.post.mock.calls[0][1];
      expect(payload.events[0].params.timestamp).toBeDefined();
      expect(typeof payload.events[0].params.timestamp).toBe('string');
    });

    it('should send correct endpoint URL with measurement ID and API secret', async () => {
      store.getters = {
        'CONFIGURATION_STORE_MODULE/GET_CONFIGURATION': {
          GTAG: {
            MEASUREMENT_ID: 'G-XXXXXXXXXX',
            API_SECRET: 'test-api-secret',
          },
        },
        'SESSION_STORE_MODULE/GET_SSBT_ID': '123456789012',
      };

      axios.post.mockResolvedValue({ data: {} });

      await gaService.sendEvent(gtmEvents.SSBT_LOTTERY_LOBBY);

      expect(axios.post).toHaveBeenCalledWith(
        'https://www.google-analytics.com/mp/collect?measurement_id=G-XXXXXXXXXX&api_secret=test-api-secret',
        expect.any(Object),
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });
  });
});
