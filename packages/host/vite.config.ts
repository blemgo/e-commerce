import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import path from 'path';

const shared = {
  react: { singleton: true },
  'react-dom': { singleton: true },
  'react-router-dom': { singleton: true },
  '@mui/material': { singleton: true },
  '@emotion/react': { singleton: true },
  '@emotion/styled': { singleton: true },
  nuqs: { singleton: true },
  'react-toastify': { singleton: true },
};

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        admin: {
          type: 'module',
          name: 'admin',
          entry: 'http://localhost:5174/remoteEntry.js',
        },
      },
      dts: false,
      shared,
    }),
  ],
  build: { target: 'esnext' },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src'),
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
    },
  },
});
