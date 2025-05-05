import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        layanan: resolve(__dirname, 'layanan.html'),
        tentang: resolve(__dirname, 'tentang.html'),
        kontak: resolve(__dirname, 'kontak.html')
      }
    }
  }
});