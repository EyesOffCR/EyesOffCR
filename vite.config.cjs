const { defineConfig } = require('vite')

module.exports = defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'assets/main.css';
          return `assets/[name].[hash][extname]`;
        }
      }
    }
  }
}) 