import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Optional: cleaner import paths
    },
  },
  server: {
    historyApiFallback: true, // Fixes 404 on refresh
  },
  build: {
    outDir: 'dist',
    assetsDir: 'static',
  },
});
