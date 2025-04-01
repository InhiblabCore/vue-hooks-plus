import { defineConfig } from 'vitepress'
import { applyPlugins } from '@vue-hooks-plus/md-demo-plugins'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue hooks plus",
  description: "High performance & Simplicity 🧲 Vue 3 Hooks library",
  themeConfig: {
    logo: './public/logo.svg',
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
    plugins: [],
  },
  markdown: {
    config: md => {
      applyPlugins(md)
    },
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/'
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/'
    }
  }
})
