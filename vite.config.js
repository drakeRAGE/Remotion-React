import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@remotion/core', '@remotion/player'],
  },
  build: {
    commonjsOptions: {
      include: [/@remotion\/*/],
    },
  },
});
