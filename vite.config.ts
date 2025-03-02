import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tutti-frutti/', // Base path for GitHub Pages
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate a manifest file for better asset handling
    manifest: true,
    // Ensure sourcemaps are generated for easier debugging
    sourcemap: true,
    // Optimize asset handling
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
