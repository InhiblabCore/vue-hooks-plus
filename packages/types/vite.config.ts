import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: ['../hooks/src/**/*.ts'],
      outputDir: path.resolve(__dirname),
      rollupTypes: true,
    }),
  ],
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, '..', 'hooks/src/index.ts'),
      name: 'VueHooks_Plus',
      formats: ['es'],
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
})
