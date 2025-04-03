import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'
import { sidebarHooks } from './en'

const require = createRequire(import.meta.url)
const pkg = require('vue-hooks-plus/package.json')

function siderbarUseRequestPlugin(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'useRequest 外置插件',
      items: [
        {
          text: '全局请求状态管理',
          link: '/useRequest/plugins/fetchsing/',
        },
        {
          text: '同源跨窗口广播',
          link: '/useRequest/plugins/broadcastChannel/',
        },
      ],
    },
  ]
}
function siderbarUseRequest(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'useRequest',
      items: [
        {
          text: '快速开始',
          link: 'useRequest',
        },
        {
          text: '使用姿势',
          link: '/useRequest/guide',
        },
        {
          text: '基础用法',
          link: '/useRequest/basic',
        },

        {
          text: '防抖',
          link: '/useRequest/debounce',
        },
        {
          text: '节流',
          link: '/useRequest/throttle',
        },

        {
          text: '轮询',
          link: '/useRequest/polling',
        },

        {
          text: 'Ready',
          link: '/useRequest/ready',
        },
        {
          text: '依赖刷新',
          link: '/useRequest/refreshDeps',
        },

        {
          text: '并行请求',
          link: '/useRequest/fetchs',
        },
        {
          text: '错误重试',
          link: '/useRequest/retry',
        },
        {
          text: '格式化数据',
          link: '/useRequest/formatResult',
        },
        {
          text: '缓存 & SWR',
          link: '/useRequest/cache',
        },
        {
          text: 'loadingDelay',
          link: '/useRequest/loadingDelay',
        },
        {
          text: '屏幕聚焦重新请求',
          link: '/useRequest/refreshOnWindowFocus',
        },
        {
          text: '滚动加载 & 分页加载',
          link: '/useRequest/scroll',
        },
        {
          text: '中间件',
          link: '/useRequest/middleware',
        },
        {
          text: '插件设计',
          link: '/useRequest/plugin',
        },
        {
          text: '全局配置',
          link: '/useRequest/global',
        },
        {
          text: '开发者工具',
          link: '/useRequest/devtools',
        },
      ],
    }
  ]
}
function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '指南',
      items: [
        { text: '介绍', link: "guide" },
        { text: '开始使用', link: 'getting-started' },
        { text: '🫶 迁移到 v2 版本', link: 'migrate' }
      ],
    }
  ]
}
export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '由 Vite 和 Vue 驱动的静态站点生成器',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/zh/hooks/': {
        base: '/zh/hooks/', items: [
          ...sidebarGuide(),
          ...siderbarUseRequest(),
          ...sidebarHooks()
        ]
      }
    },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有  © 2022-${new Date().getFullYear()} 杨杰`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Hooks 指南',
      link: '/zh/hooks/guide',
      activeMatch: '/zh/hooks/guide'
    },
    {
      text: '🤺 演武场',
      link: 'https://inhiblabcore.github.io/vue-hooks-plus-playground/play',
    },
    {
      text: pkg.version,
      items: [
        {
          text: '贡献',
          link: 'https://github.com/InhiblabCore/vue-hooks-plus/blob/master/CONTRIBUTING.md'
        }
      ]
    }
  ]
}



export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  zh: {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  }
}