import { defineConfig } from 'tsdown'

const external = ['vue']
const sourceEntries = [
  'src/**/*.ts',
  '!src/**/*.spec.ts',
  '!src/**/*.test.ts',
  '!src/**/__tests__/**',
  '!src/**/demo/**',
  '!src/**/*.d.ts',
  '!src/type.d.ts',
]

export default defineConfig([
  {
    entry: sourceEntries,
    format: 'cjs',
    outDir: 'lib',
    root: 'src',
    platform: 'browser',
    unbundle: true,
    clean: true,
    dts: true,
    fixedExtension: false,
    deps: { neverBundle: external },
    outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
  },
  {
    entry: sourceEntries,
    format: 'esm',
    outDir: 'es',
    root: 'src',
    platform: 'browser',
    unbundle: true,
    clean: true,
    dts: true,
    fixedExtension: false,
    deps: { neverBundle: external },
    outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
  },
  {
    entry: { 'js/index': 'src/index.ts' },
    format: ['esm', 'cjs', 'iife'],
    globalName: 'VueHooks_Plus',
    outDir: 'dist',
    platform: 'browser',
    minify: true,
    clean: true,
    dts: false,
    fixedExtension: false,
    deps: {
      neverBundle: external,
      alwaysBundle: id => id !== 'vue',
    },
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
])
