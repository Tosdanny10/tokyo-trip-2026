import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' 讓所有資源使用相對路徑，
// 因此同一份 dist/ 可以直接部署到 GitHub Pages 的子路徑
// （例如 https://<user>.github.io/tokyo-trip-2026/）而不會 404。
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
