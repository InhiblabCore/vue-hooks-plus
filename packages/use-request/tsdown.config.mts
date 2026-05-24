import { defineConfig } from 'tsdown'

const external = ['vue']

export default defineConfig([
  {
    entry: { useRequest: 'src/index.ts' },
    format: ['esm', 'cjs', 'iife'],
    globalName: 'VueHooks_Plus_useRequest',
    outDir: 'dist',
    platform: 'browser',
    minify: true,
    clean: true,
    dts: false,
    fixedExtension: false,
    deps: { neverBundle: external, alwaysBundle: [/^es-toolkit/], onlyBundle: false },
    outputOptions: (options, format) => ({
      ...options,
      exports: 'named',
      globals: { vue: 'Vue' },
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
