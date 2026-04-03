import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React dans son propre chunk (mis en cache séparément)
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Avertissement si un chunk dépasse 500 KiB
    chunkSizeWarningLimit: 500,
  },
})