import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@types': path.resolve(__dirname, 'src/types/index.ts'),
    },
  },
});
