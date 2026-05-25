import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  outDir: 'dist',
  platform: 'node',
  target: 'node14',
  clean: true,
  dts: true,
  fixedExtension: false,
  deps: {
    neverBundle: ['local-pkg', 'unplugin-auto-import'],
    onlyBundle: false,
  },
  outExtensions: ({ format }) => ({
    js: format === 'cjs' ? '.cjs' : '.js',
  }),
})
