import { resolve } from 'path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VueHooks Plus",
  description: "A VitePress Site",
  locales: {
    root: {
      label: 'English',
      lang: 'en-US'
    },
    fr: {
      label: '简体中文',
      lang: 'zh-US', // optional, will be added  as `lang` attribute on `html` tag
      link: '/zh-CN/foo' // default /fr/ -- shows on navbar translations menu, can be external

      // other locale specific properties...
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    resolve: {
      alias: {
        'vue-hooks-plus': resolve('packages/hooks/src'),
      },
    },
  },
})
