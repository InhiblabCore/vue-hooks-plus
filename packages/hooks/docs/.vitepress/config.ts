import { defineConfig } from 'vitepress'
import { applyPlugins } from '@vue-hooks-plus/md-demo-plugins'
import { genTemp } from '@ruabick/vite-plugin-gen-temp'
import { resolve } from 'path'
import { svg } from './theme/home/iconBase64'
import { getRouterConfig } from './router'
// import { ref } from 'vue'

const base =
  process.env.NODE_ENV === 'production'
    ? process.env?.BASE_URL
      ? process.env.BASE_URL
      : '/vue-hooks-plus/docs'
    : ''

const isGithub = process.env.FLOW === 'github'

// const version = ref()

// fetch('https://api.github.com/repos/InhiblabCore/vue-hooks-plus/releases/latest')
//   .then(response => response.json())
//   .then(data => {
//     version.value = data?.name
//   })

export default defineConfig({
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: svg,
      },
    ],
  ],
  description: 'High-quality & Reliable 🧲 Vue3 Hooks library',
  base,
  locales: {
    '/': {
      label: '中文',
      lang: 'zh-CN',
      title: 'VueHook Plus',
      description: 'vue hooks',
    },
    '/en/': {
      label: 'English',
      lang: 'en-US',
      title: 'VueHook Plus',
      description: 'vue hooks',
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    algolia: {
      appId: 'F75E9UQXRX',
      apiKey: '268129e44d6b58950b4626bf86e8bd1e',
      indexName: 'vue-hooks-plus-search',
    },
    localeLinks: {
      text: '',
      items: [
        {
          link: '/',
          text: '简体中文',
        },

        {
          link: '/en/',
          text: 'English',
        },
      ],
    },
    // @ts-ignore
    locales: {
      '/': {
        nav: [
          { text: 'Hooks', link: '/useRequest/' },
          {
            text: '演武场',
            link: 'http://43.138.187.142:9000/vue-hooks-plus/vhp-playground/',
          },
          isGithub
            ? {
                text: '国内镜像 🇨🇳',
                link: 'https://inhiblab-core.gitee.io/docs/hooks/',
              }
            : null,
          // {
          //     text: 'Github 站点',
          //     link: 'https://inhiblabcore.github.io/docs/hooks/',
          //   },
          {
            text: '发行版本',
            link: 'https://github.com/InhiblabCore/vue-hooks-plus/releases/',
          },
        ].filter(Boolean),
        sidebar: getRouterConfig(),
      },
      '/en/': {
        nav: [
          { text: 'Hooks', link: '/en/useRequest/' },
          {
            text: 'Playground',
            link: 'http://43.138.187.142:9000/vue-hooks-plus/vhp-playground/',
          },
          isGithub
            ? {
                text: 'Gitee Mirror 🇨🇳',
                link: 'https://inhiblab-core.gitee.io/docs/hooks/',
              }
            : null,
          {
            text: 'Releases',
            link: 'https://github.com/InhiblabCore/vue-hooks-plus/releases/',
          },
        ].filter(Boolean),
        sidebar: getRouterConfig('/en/'),
      },
    },
    repo: '/InhiblabCore/vue-hooks-plus',
    repoLabel: 'Github',
    lastUpdated: '最近更新',
    prevLink: true,
    nextLink: true,
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com//InhiblabCore/vue-hooks-plus',
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/Yong_Git',
      },
    ],
  },

  vite: {
    plugins: [process.env.NODE_ENV === 'production' ? null : genTemp()],
    resolve: {
      alias: {
        'vue-hooks-plus': resolve('./src'),
      },
    },
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
})
