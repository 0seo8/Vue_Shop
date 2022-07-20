import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: '~', replacement: `${__dirname}/src` }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/scss/main.scss";'
      }
    }
  },
  build: { 
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]' //정적파일
      }
    }
  }
})
