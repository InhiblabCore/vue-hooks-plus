import { defineConfig } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader
} from 'vitepress-plugin-group-icons'
import { search as zhSearch } from './zh'
import { parseProps } from './utils'
import { dirname, resolve } from 'path'
import fsExtra from 'fs-extra'
import { getDemoComponent } from './factory'

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
      const htmlBlock = md.renderer.rules.html_block!
      md.renderer.rules.html_block = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        const content = token.content.trim();
        const { path } = env;
        const props = parseProps(content);

        if (!props?.src) {
          console.error(`miss src props in ${path} demo.`);
          // 必须返回默认渲染结果，否则会导致无限递归
          return htmlBlock(tokens, idx, options, env, self);
        }

        const srcPath = resolve(process.cwd(), "docs", "demo", props.src);
        const code = fsExtra.readFileSync(srcPath, 'utf8');
        const demoScripts = getDemoComponent(md, env, {
          title: props?.title,
          desc: props?.desc,
          path: srcPath,
          code,
        });
        return demoScripts;
      }

      // const htmlInline = md.renderer.rules.html_inline!
      // md.renderer.rules.html_inline = function (tokens, idx, options, env, self) {
      //   const token = tokens[idx];
      //   const content = token.content.trim();
      //   const { path } = env;
      //   const props = parseProps(content);

      //   if (!props?.src) {
      //     console.error(`miss src props in ${path} demo.`);
      //     // 必须返回默认渲染结果，否则会导致无限递归
      //     return htmlInline(tokens, idx, options, env, self);
      //   }

      //   const srcPath = resolve(process.cwd(), "docs", "demo", props.src);
      //   const code = fsExtra.readFileSync(srcPath, 'utf8');
      //   const demoScripts = getDemoComponent(md, env, {
      //     title: props?.title,
      //     desc: props?.desc,
      //     path: srcPath,
      //     code,
      //   });
      //   return demoScripts;
      // }

      // applyPlugins(md)
      // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
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
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${process.env.NODE_ENV === 'production' ? '/vue-hooks-plus/logo.svg' : '/logo.svg'}` }],
    ['link', { rel: 'icon', type: 'image/png', href: `${process.env.NODE_ENV === 'production' ? '/vue-hooks-plus/logo.png' : '/logo.png'}` }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'VueHooks plus | High-performance Hooks Library for Vue' }],
    ['meta', { property: 'og:site_name', content: 'VueHooks plus' }],
    ['meta', { property: 'og:url', content: 'https://inhiblabcore.github.io/vue-hooks-plus/' }],
    ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
  ],

  themeConfig: {
    logo: { src: `/logo.svg`, width: 24, height: 24 },

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