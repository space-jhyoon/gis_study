import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/v
export default defineConfig({
  plugins: [vue()],
  base: '/gis_study/',
})