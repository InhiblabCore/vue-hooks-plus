import { defineConfig } from 'tsdown'

const external = ['vue', '@vue-hooks-plus/use-request', 'pinia', 'broadcast-channel']

export default defineConfig([
  {
    entry: { useRequest_plugins: 'src/index.ts' },
    format: ['esm', 'cjs', 'iife'],
    globalName: 'VueHooks_Plus_useRequestPlugins',
    outDir: 'dist',
    platform: 'browser',
    minify: true,
    clean: true,
    dts: false,
    fixedExtension: false,
    deps: { neverBundle: external },
    outputOptions: (options, format) => ({
      ...options,
      exports: 'named',
      globals: {
        vue: 'Vue',
        '@vue-hooks-plus/use-request': 'VueHooks_Plus_useRequest',
        pinia: 'Pinia',
        'broadcast-channel': 'BroadcastChannel',
      },
      entryFileNames:
        format === 'cjs'
          ? '[name].cjs.js'
          : format === 'iife'
            ? '[name].iife.js'
            : '[name].es.js',
    }),
  },
  {
    entry: { index: 'src/index.ts' },
    format: 'esm',
    outDir: 'dist/types',
    clean: false,
    dts: { emitDtsOnly: true },
    deps: { neverBundle: external },
    outExtensions: () => ({ dts: '.d.ts' }),
  },
])
