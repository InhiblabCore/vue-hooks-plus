import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      'vue-hooks-plus': resolve(__dirname, './src/index.ts'),
      '@': resolve(__dirname, './src'),
    },
    dedupe: ['vue', '@vue/runtime-core'],
  },
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  test: {
    globals: true,
  },
  ssr: {
    noExternal: [/vue-hooks-plus\/.*/],
  },
})
