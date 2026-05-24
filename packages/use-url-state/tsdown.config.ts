import { defineConfig } from 'tsdown'

const external = ['vue', /^vue-hooks-plus/]

export default defineConfig([
  {
    entry: { useUrlState: 'src/index.ts' },
    format: ['esm', 'cjs', 'iife'],
    globalName: 'VueHooks_Plus_useUrlState',
    outDir: 'dist',
    platform: 'browser',
    minify: true,
    clean: true,
    dts: false,
    fixedExtension: false,
    deps: { neverBundle: external },
    outputOptions: (options, format) => ({
      ...options,
      globals: {
        vue: 'Vue',
        'vue-hooks-plus': 'VueHooks_Plus',
        'vue-hooks-plus/es/useLocalStorageState': 'VueHooks_Plus',
        qs: 'Qs',
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
