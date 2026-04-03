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
    // 🟢 Nettoyage du dossier dist avant chaque build
    emptyOutDir: true,
    // 🟢 Compression maximale des assets
    assetsInlineLimit: 4096, // Inline les petits SVG < 4kb pour éviter des requêtes HTTP inutiles
    
    rollupOptions: {
      output: {
        // 🟢 Stratégie de spliting avancée pour le cache navigateur
        manualChunks(id) {
          // On sépare toutes les grosses bibliothèques externes dans un fichier "vendor"
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'ui-icons';
            if (id.includes('framer-motion')) return 'animations';
            return 'vendor'; 
          }
        },
        // 🟢 On s'assure que les noms de fichiers sont propres pour le cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
    },
    chunkSizeWarningLimit: 600, // Augmenté légèrement car Lucide et Framer sont denses
  },
})