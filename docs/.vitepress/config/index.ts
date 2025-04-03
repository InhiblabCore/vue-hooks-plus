import { defineConfig } from 'vitepress'
import { shared } from './shared'
import { en } from './en'
import { zh } from './zh'
import { withPwa } from '@vite-pwa/vitepress'
import { resolve } from 'path'

export default withPwa(defineConfig({
  ...shared,
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh }
  },
  pwa: {
    // outDir: resolve(__dirname, '../', 'dist'),
    // registerType: 'autoUpdate',
    // srcDir: '.vitepress/',
    strategies: 'generateSW', // <== if omitted, defaults to `generateSW`  
    workbox: {
    },
    experimental: {
      includeAllowlist: true
    }
  }
}))