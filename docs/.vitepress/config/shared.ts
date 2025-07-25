import { defineConfig } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader
} from 'vitepress-plugin-group-icons'
import { search as zhSearch } from './zh'

import { applyMdPlugin } from '../plugins/applyMdPlugin'
import { applyFooterLinkPlugin } from '../plugins/applyFooterLinkPlugin'


export const shared = defineConfig({
  title: 'Vue hooks plus',
  base: process.env.NODE_ENV === 'production' ? '/vue-hooks-plus/' : '',
  rewrites: {
    'en/:rest*': ':rest*'
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],
    config(md) {
      applyMdPlugin(md)
      // md.renderer.rules.softbreak
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case 'es':
              return 'Copiar código'
            case 'fa':
              return 'کپی کد'
            case 'ko':
              return '코드 복사'
            case 'pt':
              return 'Copiar código'
            case 'ru':
              return 'Скопировать код'
            case 'zh':
              return '复制代码'
            default:
              return 'Copy code'
          }
        })()
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        )
      }
      md.use(groupIconMdPlugin)
    }
  },

  sitemap: {
    hostname: 'https://inhiblabcore.github.io/vue-hooks-plus/',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  /* prettier-ignore */
  head: [
    // base
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${process.env.NODE_ENV === 'production' ? '/vue-hooks-plus/logo.svg' : '/logo.svg'}` }],
    ['link', { rel: 'icon', type: 'image/png', href: `${process.env.NODE_ENV === 'production' ? '/vue-hooks-plus/logo.png' : '/logo.png'}` }],
    ['meta', { name: 'theme-color', content: '#000000' }],

    // seo
    ['meta', { name: 'description', content: 'High performance & Simplicity Vue3 Hooks library.' }],
    ['meta', { name: 'keywords', content: 'vue, hooks, vue-hooks, vue-hooks-plus, composition-api, vue3, frontend, web, javascript, typescript, SSR' }],
    
    // og
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'VueHooks plus | High-performance Hooks Library for Vue' }],
    ['meta', { property: 'og:description', content: 'A high-performance, comprehensive, and reliable Vue 3 hooks library.' }],
    ['meta', { property: 'og:site_name', content: 'VueHooks plus' }],
    ['meta', { property: 'og:url', content: 'https://inhiblabcore.github.io/vue-hooks-plus/' }],
    ['meta', { property: 'og:image', content: 'https://inhiblabcore.github.io/vue-hooks-plus/logo.png' }],

    // twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@Yong_Git' }],
    ['meta', { name: 'twitter:image', content: 'https://inhiblabcore.github.io/vue-hooks-plus/logo.png' }],

    // hreflang
    ['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://inhiblabcore.github.io/vue-hooks-plus/' }],
    ['link', { rel: 'alternate', hreflang: 'en-us', href: 'https://inhiblabcore.github.io/vue-hooks-plus/' }],
    ['link', { rel: 'alternate', hreflang: 'zh-cn', href: 'https://inhiblabcore.github.io/vue-hooks-plus/zh/' }],

    // script
    ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }],
    [
      'script',
      {
        src: process.env.NODE_ENV === 'production' ? '/vue-hooks-plus/sponsor/sponsor.iife.js' : '/sponsor/sponsor.iife.js',
        defer: ''
      }
    ],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'VueHooks plus',
        'url': 'https://inhiblabcore.github.io/vue-hooks-plus/',
        'description': 'A high-performance, comprehensive, and reliable Vue 3 hooks library.',
        'keywords': ['vue', 'hooks', 'vue-hooks', 'vue-hooks-plus', 'composition-api', 'vue3', 'frontend', 'web', 'javascript', 'typescript', 'SSR'],
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://inhiblabcore.github.io/vue-hooks-plus/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'InhiblabCore',
          'url': 'https://github.com/InhiblabCore',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://inhiblabcore.github.io/vue-hooks-plus/logo.png'
          }
        }
      })
    ]
  ],

  themeConfig: {
    logo: { src: `/logo.svg`, width: 24, height: 24 },
    editLink: {
      pattern: 'https://inhiblabcore.github.io/vue-hooks-plus/edit/main/docs/:path'
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com//InhiblabCore/vue-hooks-plus',
      },
      {
        icon: 'discord',
        link: 'https://discord.gg/z5Ve5r9Kwp',
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/Yong_Git',
      },
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: 'NE21OY6MBZ',
        apiKey: '0474c01f9e1f5eed051d2c2b905a3cc9',
        indexName: 'vue-hooks-plus-search',
        locales: {
          ...zhSearch
        }
      }
    }
  },
  vite: {
    resolve: {
      alias: {
        "vue-hooks-plus": "../../../packages/hooks/src/index.ts",
      }
    },
    plugins: [
      // @ts-ignore
      applyFooterLinkPlugin(),
      // @ts-ignore
      groupIconVitePlugin({
        customIcon: {
          vitepress: localIconLoader(
            import.meta.url,
            '../../public/logo.svg'
          ),
          firebase: 'logos:firebase'
        }
      })
    ]
  }
})
