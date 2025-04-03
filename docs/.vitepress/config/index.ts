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
    outDir: resolve(__dirname, '../', 'dist'),
    registerType: 'autoUpdate',
    srcDir: '.vitepress/',
    strategies: 'generateSW', // <== if omitted, defaults to `generateSW`  
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // 添加明确的glob模式
      globDirectory: '../', // 指定glob目录
    },
    experimental: {
      includeAllowlist: true
    }
  }
}))