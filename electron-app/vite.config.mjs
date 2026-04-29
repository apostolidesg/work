import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__setup__/setupTests.js'],
    include: ['src/__tests__/*.{js,ts}'],
    coverage: {
      include: ['src/**/*.{js,ts}'],
      exclude: ['src/__tests__', 'src/__setup__', 'src/mocks', 'src/config'],
      reportsDirectory: path.resolve(__dirname, 'test/unit/coverage'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
