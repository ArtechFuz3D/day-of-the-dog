import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4321,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.astro'),  // Your main entry point
        Game: resolve(__dirname, 'game.astro'),
        GameLvl2: resolve(__dirname, 'gamelvl2.astro'),
        DayOfTheDog: resolve(__dirname, 'src/game/day-of-the-dog/dayofthedog.astro'),
        DayOfTheDogLvl2: resolve(__dirname, 'src/game/day-of-the-dog/dayofthedoglvl2.astro'),
        Constellation: resolve(__dirname, 'src/vfx/constellation.astro'),
      }
    },
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  esbuild: {
    loader: 'jsx', // or 'tsx' if you are using TypeScript
    include: [
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
  },
});
