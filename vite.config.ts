import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    host: true,
    allowedHosts: true,
    proxy: {
      '/storefront-proxy': {
        target: 'https://api.nile.ng',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/storefront-proxy/, '/storefront/v1'),
        secure: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
