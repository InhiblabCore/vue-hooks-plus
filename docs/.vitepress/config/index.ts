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
    outDir: resolve(__dirname, '../dist'),
    registerType: 'prompt',
    includeManifestIcons: false,
    selfDestroying: true,
    manifest: {
      id: '/',
      name: 'VueHooks plus',
      short_name: 'VueHooks plus',
      description: 'Highly customizable hooks for Vue',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/vue-hooks-plus/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/vue-hooks-pluslogo@2.x.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/vue-hooks-pluslogo.svg',
          sizes: '155x155',
          type: 'image/svg',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'jsdelivr-images-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  }
}))