import { defineConfig } from 'tsdown'

const external = ['vue', 'immer']

export default defineConfig([
  {
    entry: { useImmer: 'src/index.ts' },
    format: ['esm', 'cjs', 'iife'],
    globalName: 'VueHooks_Plus_useImmer',
    outDir: 'dist',
    platform: 'browser',
    minify: true,
    clean: true,
    dts: false,
    fixedExtension: false,
    deps: { neverBundle: external, onlyBundle: false },
    outputOptions: (options, format) => ({
      ...options,
      globals: {
        vue: 'Vue',
        immer: 'immer',
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
    deps: { neverBundle: external, onlyBundle: false },
    outExtensions: () => ({ dts: '.d.ts' }),
  },
])
