import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Sakura-Brew/', // GitHub Pages base path (repo name)
  build: {
    outDir: 'dist',
  },
});
