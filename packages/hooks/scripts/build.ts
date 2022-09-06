import path, { resolve } from 'path'
import { UserConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { buildPlugin } from 'vite-plugin-build'
import { movePlugin } from './plugin'

export const buildConfig: UserConfig = {
  plugins: [
    buildPlugin({
      fileBuild: {
        emitDeclaration: true,
        ignoreInputs: [
          'src/*/__tests__/*.spec.*',
          '**/*.tests.*',
          '**/*.d.ts',
          '**/*.vue',
          '**/__tests__',
        ],
      },
      libBuild: {
        buildOptions: {
          rollupOptions: {
            external: ['vue'],
            output: { globals: { vue: 'Vue' } },
          },
          lib: {
            formats: ['es', 'cjs'],
            entry: path.resolve(__dirname, '..', 'src/index.ts'),
            name: 'vue-hooks-plus',
            fileName: format => `js/index.${format}.js`,
          },
        },
      },
    }),
  ],
}

export const buildFullTypesConfig: UserConfig = {
  plugins: [
    movePlugin({
      from: resolve(__dirname, '..', 'types/index.d.ts'),
      to: resolve(__dirname, '..', 'dist/types/index.d.ts'),
    }),
    dts({
      include: ['src/**/*.ts'],
      insertTypesEntry: true,
      rollupTypes: true,
      outputDir: path.resolve(__dirname, '..', 'types'),
    }),
  ],
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, '..', 'src/index.ts'),
      name: 'vue-hooks-plus',
      formats: ['es', 'cjs'],
      fileName: format => {
        return `js/index.${format}.js`
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
}
