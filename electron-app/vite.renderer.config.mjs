import { join } from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  server: {
    hmr: false,
  },
  build: {
    rollupOptions: {
      input: join(__dirname, 'dist', 'renderer', 'index.html'),
    },
  },
});
