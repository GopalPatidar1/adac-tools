import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: [
        '**/.git/**',
        '**/.vite/**',
        '**/coverage/**',
        '**/dist/**',
        '**/node_modules/**',
        '**/public/assets/**',
        '**/packages/icons-aws/assets/**',
        '**/packages/icons-gcp/assets/**',
        '**/packages/icons-azure/assets/**',
      ],
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
});
