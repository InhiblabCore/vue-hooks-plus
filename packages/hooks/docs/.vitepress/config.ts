import { defineConfig } from 'vitepress'
import { applyPlugins } from '@vue-hooks-plus/md-demo-plugins'
import { genTemp } from '@ruabick/vite-plugin-gen-temp'
import { resolve } from 'path'
import { svg } from './theme/home/iconBase64'

const base =
  process.env.NODE_ENV === 'production'
    ? process.env?.BASE_URL
      ? process.env.BASE_URL
      : '/vue-hooks-plus/docs'
    : ''

const isGithub = process.env.FLOW === 'github'

// const url = process.env.NODE_ENV === 'production' ? '/docs/hooks/logo.svg' : '/logo.svg'

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
  title: 'VueHook Plus',
  description: '_description',
  base,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: 'Hooks', link: '/useRequest/' },
      {
        text: 'Playground',
        link: 'http://43.138.187.142:9000/vue-hooks-plus/vhp-playground/',
      },
      isGithub
        ? {
            text: '国内镜像',
            link: 'https://inhiblab-core.gitee.io/docs/hooks/',
          }
        : {
            text: 'Github 站点',
            link: 'https://inhiblabcore.github.io/docs/hooks/',
          },
      {
        text: '更新日志',
        link: 'https://github.com/InhiblabCore/vue-hooks-plus/releases/',
      },
    ],
    sidebar: {
      '/': getHooksSidebar(),
    },

    // @ts-ignore
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
      dark: 'github-dark',
    },
  },
})

function getHooksSidebar() {
  return [
    {
      text: '介绍',
      items: [
        {
          text: '入手指南',
          link: '/guide/',
        },
      ],
    },
    {
      text: 'useRequest',
      items: [
        {
          text: '介绍',
          link: '/useRequest/',
        },
        {
          text: '基础用法',
          link: '/useRequest/basic/',
        },

        {
          text: '防抖',
          link: '/useRequest/debounce/',
        },
        {
          text: '节流',
          link: '/useRequest/throttle/',
        },

        {
          text: '轮询',
          link: '/useRequest/polling/',
        },

        {
          text: 'Ready',
          link: '/useRequest/ready/',
        },
        {
          text: '依赖刷新',
          link: '/useRequest/refreshDeps/',
        },

        {
          text: '并行请求',
          link: '/useRequest/fetchs/',
        },
        {
          text: '错误重试',
          link: '/useRequest/retry/',
        },

        {
          text: '缓存 & SWR',
          link: '/useRequest/cache/',
        },
        {
          text: 'loadingDelay',
          link: '/useRequest/loadingDelay/',
        },
        {
          text: '屏幕聚焦重新请求',
          link: '/useRequest/refreshOnWindowFocus/',
        },
        {
          text: '滚动加载 & 分页加载',
          link: '/useRequest/scroll/',
        },
        {
          text: '🌟 开发插件',
          link: '/useRequest/plugin/',
        },
        {
          text: '📐 业务开发规范',
          link: '/useRequest/guide/',
        },
      ],
    },
    {
      text: 'State',
      items: [
        { text: 'useBoolean', link: '/useBoolean/' },
        { text: 'useUrlState', link: '/useUrlState/' },
        { text: 'useFormatResult', link: '/useFormatResult/' },
        { text: 'useDebounce', link: '/useDebounce/' },
        { text: 'useThrottle', link: '/useThrottle/' },
        { text: 'useToggle', link: '/useToggle/' },
        { text: 'useCookieState', link: '/useCookieState/' },
        { text: 'useLocalStorageState', link: '/useLocalStorageState/' },
        { text: 'useSessionStorageState', link: '/useSessionStorageState/' },
        { text: 'useMap', link: '/useMap/' },
        { text: 'useSet', link: '/useSet/' },
        { text: 'useSetState', link: '/useSetState/' },
      ],
    },

    {
      text: 'Effect',
      items: [
        { text: 'useDebounceFn', link: '/useDebounceFn/' },
        { text: 'useThrottleFn', link: '/useThrottleFn/' },
        { text: 'useFetchs', link: '/useFetchs/' },
        { text: 'useLockFn', link: '/useLockFn/' },
        { text: 'useUpdate', link: '/useUpdate/' },
        { text: 'useInterval', link: '/useInterval/' },
        { text: 'useTimeout', link: '/useTimeout/' },
      ],
    },
    {
      text: 'Scene',
      items: [
        { text: 'useCounter', link: '/useCounter/' },
        { text: 'useInfiniteScroll', link: '/useInfiniteScroll/' },
        { text: 'useNetwork', link: '/useNetwork/' },
        { text: 'useVirtualList', link: '/useVirtualList/' },
      ],
    },
    {
      text: 'Dom',
      items: [
        {
          text: 'useEventListener',
          link: '/useEventListener/',
        },
        {
          text: 'useExternal',
          link: '/useExternal/',
        },
        { text: 'useDrop & useDrag', link: '/useDrop/' },
        { text: 'useDarkMode', link: '/useDarkMode/' },
        { text: 'useFavicon', link: '/useFavicon/' },
        { text: 'useFocusWithin', link: '/useFocusWithin/' },
        { text: 'useFullscreen', link: '/useFullscreen/' },
        { text: 'useHover', link: '/useHover/' },
        { text: 'useInViewport', link: '/useInViewport/' },
        { text: 'useKeyPress', link: '/useKeyPress/' },
        { text: 'useMedia', link: '/useMedia/' },
        { text: 'useMouse', link: '/useMouse/' },
        { text: 'useSize', link: '/useSize/' },
        { text: 'useScroll', link: '/useScroll/' },
        { text: 'useTitle', link: '/useTitle/' },
        { text: 'useWinResize', link: '/useWinResize/' },
      ],
    },
    // {
    // 	text: 'Browser',
    // 	items: [
    // 		{
    // 			text: 'useDisableBrowserBehavior',
    // 			link: '/useDisableBrowserBehavior/',
    // 		},
    // 	],
    // },
    {
      text: 'Advanced',
      items: [
        { text: 'useEventEmitter', link: '/useEventEmitter/' },
        {
          text: 'useAsyncOrder',
          link: '/useAsyncOrder/',
        },
        { text: 'usePreview', link: '/usePreview/' },
      ],
    },
    {
      text: 'Dev',
      items: [
        { text: 'useTrackedEffect', link: '/useTrackedEffect/' },
        { text: 'useWhyDidYouUpdate', link: '/useWhyDidYouUpdate/' },
      ],
    },
  ]
}
