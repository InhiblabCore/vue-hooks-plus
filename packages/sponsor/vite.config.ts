import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: '../../docs/public/sponsor',
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueHooks_Plus_sponsor',
      formats: ['iife'],
      fileName: format => {
        return `sponsor.${format}.js`
      },
    },
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
