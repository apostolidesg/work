import { mockElectronAPI } from '@/mocks/electronApi.mock.js';
import { vi } from 'vitest';

Object.defineProperty(window, 'electronAPI', {
  value: mockElectronAPI,
  configurable: false,
  writable: false,
  enumerable: true,
});

vi.mock('electron', () => ({
  app: {
    getPath: vi.fn().mockReturnValue('/mock/home'),
  },
}));

vi.mock('@/util/LoggerFoldersGenerator', () => ({
  default: {
    loggerPaths: {
      general: '/tmp/test-logs',
      frontend: '/tmp/test-logs/frontend',
    },
    triggerGenerator: vi.fn(),
  },
}));

vi.mock('@/util/Logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));
