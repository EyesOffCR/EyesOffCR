const { defineConfig } = require('vite')
const { resolve } = require('path')

module.exports = defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        media_package: './media_package.html',
        blog: './blog/index.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'main.css') {
            return 'assets/main.css';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss')]
    }
  },
  publicDir: 'public',
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
}) 