import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      'vue-hooks-plus/es': resolve(__dirname, './packages/hooks/src'),
      'vue-hooks-plus': resolve(__dirname, './packages/hooks/src/index.ts'),
      '@': resolve(__dirname, './packages/hooks/src'),
      'test-utils': resolve(__dirname, './packages/hooks/test-utils'),
    },
    dedupe: ['vue', '@vue/runtime-core'],
  },
  // @ts-ignore
  plugins: [vue()],
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      include: ['packages/hooks/src/**'],
      exclude: [
        '**/demo/**',
        '**/docs/**',
        '**/__tests__/**',
        '**/*.d.ts',
        'packages/hooks/src/useRequest/devtools/**',
        'packages/hooks/src/useRequest/plugins/useDevtoolsPlugin.ts',
      ],
      reporter: ['text', 'json-summary'],
      thresholds: { lines: 80 },
    },
  },
  ssr: {
    noExternal: [/vue-hooks-plus\/.*/],
  },
})
