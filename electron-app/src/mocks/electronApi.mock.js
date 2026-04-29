import { vi } from 'vitest';

export const mockElectronAPI = {
  connectWebSocket: vi.fn(),
  sendMessage: vi.fn(),
  disconnectWebSocket: vi.fn(),
  onWebSocketStatus: vi.fn(_cb => {
    // Simulates adding a listener and returns an unsubscribe function
    return () => {};
  }),
  onWebSocketMessage: vi.fn(_cb => () => {}),
  onWebSocketHalResponse: vi.fn(_cb => () => {}),
  onMainProcessEvent: vi.fn((_channel, _cb) => () => {}),
  onWebSocketError: vi.fn(_cb => () => {}),
  wsRequest: vi.fn(() => Promise.resolve({ status: 200 })),
  invokeMain: vi.fn(() => Promise.resolve('mock-response')),
  sendMain: vi.fn(),
};
