import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      'vue-hooks-plus': resolve(__dirname, './src/index.ts'),
      '@': resolve(__dirname, './src'),
      'test-utils': resolve(__dirname, './test-utils'),
    },
    dedupe: ['vue', '@vue/runtime-core'],
  },
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  ssr: {
    noExternal: [/vue-hooks-plus\/.*/],
  },
})
