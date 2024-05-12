const Router = [
  {
    text: 'State',
    items: [
      { text: 'useBoolean', link: '/useBoolean/' },
      { text: 'useImmer', link: '/useImmer/' },
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
      { text: 'usePrevious', link: '/usePrevious/' },
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
      { text: 'useWorker', link: '/useWorker/' },
    ],
  },
  {
    text: 'Scene',
    items: [
      { text: 'useCounter', link: '/useCounter/' },
      { text: 'useInfiniteScroll', link: '/useInfiniteScroll/' },
      { text: 'useNetwork', link: '/useNetwork/' },
      { text: 'useVirtualList', link: '/useVirtualList/' },
      { text: 'useWebSocket', link: '/useWebSocket/' },
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
      { text: 'useFullscreen', link: '/useFull/' },
      { text: 'useHover', link: '/useHover/' },
      { text: 'useInViewport', link: '/useInViewport/' },
      { text: 'useKeyPress', link: '/useKeyPress/' },
      { text: 'useMedia', link: '/useMedia/' },
      { text: "useMutationObserver", link: '/useMutationObserver/' },
      { text: 'useMouse', link: '/useMouse/' },
      { text: 'useSize', link: '/useSize/' },
      { text: 'useElementBounding', link: '/useElementBounding/' },
      { text: 'useResizeObserver', link: '/useResizeObserver/' },
      { text: 'useScroll', link: '/useScroll/' },
      { text: 'useTitle', link: '/useTitle/' },
      { text: 'useWinResize', link: '/useWinResize/' },
      { text: 'useLongPress', link: '/useLongPress/' },
    ],
  },
  {
    text: 'Advanced',
    items: [
      { text: 'useEventEmitter', link: '/useEventEmitter/' },
      {
        text: 'useAsyncOrder',
        link: '/useAsyncOrder/',
      },
      { text: 'usePreview ⚠️', link: '/usePreview/' },
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

const useRequestRouter = [
  {
    text: 'useRequest',
    items: [
      {
        text: '快速开始',
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
        text: '格式化数据',
        link: '/useRequest/formatResult/',
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
        text: '中间件',
        link: '/useRequest/middleware/',
      },
      {
        text: '插件设计',
        link: '/useRequest/plugin/',
      },
      {
        text: '全局配置',
        link: '/useRequest/global/',
      },
      {
        text: '开发者工具',
        link: '/useRequest/devtools/',
      },
    ],
  },
]

const useRequestPlugins = [
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

const useRequestPluginsEN = [
  {
    text: 'UseRequest External Plugins',
    items: [
      {
        text: 'global Fetching',
        link: '/en/useRequest/plugins/fetchsing/',
      },
      {
        text: 'broadcastChannel',
        link: '/en/useRequest/plugins/broadcastChannel/',
      },
    ],
  },
]

const useRequestRouterEN = [
  {
    text: 'useRequest',
    items: [
      {
        text: 'Quick Start',
        link: '/en/useRequest/',
      },
      {
        text: 'Basic',
        link: '/en/useRequest/basic/',
      },

      {
        text: 'Debounce',
        link: '/en/useRequest/debounce/',
      },
      {
        text: 'Throttle',
        link: '/en/useRequest/throttle/',
      },

      {
        text: 'Polling',
        link: '/en/useRequest/polling/',
      },

      {
        text: 'Ready',
        link: '/en/useRequest/ready/',
      },
      {
        text: 'RefreshDeps',
        link: '/en/useRequest/refreshDeps/',
      },

      {
        text: 'Fetchs',
        link: '/en/useRequest/fetchs/',
      },
      {
        text: 'Retry',
        link: '/en/useRequest/retry/',
      },
      {
        text: 'Format Result',
        link: '/en/useRequest/formatResult/',
      },
      {
        text: 'Cache & SWR',
        link: '/en/useRequest/cache/',
      },
      {
        text: 'LoadingDelay',
        link: '/en/useRequest/loadingDelay/',
      },
      {
        text: 'RefreshOnWindowFocus',
        link: '/en/useRequest/refreshOnWindowFocus/',
      },
      {
        text: 'Scroll',
        link: '/en/useRequest/scroll/',
      },
      {
        text: 'Middleware',
        link: '/en/useRequest/middleware/',
      },
      {
        text: 'Plugins Design',
        link: '/en/useRequest/plugin/',
      },
      {
        text: 'Global Option',
        link: '/en/useRequest/global/',
      },
      {
        text: 'DevTools',
        link: '/en/useRequest/devtools/',
      },
    ],
  },
]

const getUseRequestRouter = (langPrefix = '/') => {
  if (langPrefix === '/') return useRequestRouter
  else return useRequestRouterEN
}

const getUseRequestPlugins = (langPrefix = '/') => {
  if (langPrefix === '/') return useRequestPlugins
  else return useRequestPluginsEN
}

export function getRouterConfig(langPrefix = '/') {
  return [
    {
      text: langPrefix === '/' ? '介绍' : 'Getting started',
      items: [
        {
          text: langPrefix === '/' ? '🪧 入手指南' : '🪧 Guide',
          link: `${langPrefix}guide/`,
        },
        {
          text: langPrefix === '/' ? '📐 UseRequest规范' : '📐 UseRequest specification',
          link: `${langPrefix}useRequest/guide/`,
        },
        {
          text: langPrefix === '/' ? '🫶 迁移到 v2 版本' : '🫶 Migrate to v2 version',
          link: `${langPrefix}migrate/`,
        },

        // {
        //   text: langPrefix === '/' ? '🧑‍🏫 在线教程' : '🧑‍🏫 Online Teaching',
        //   link: `${langPrefix}onlineTeaching/`,
        // },
      ],
    },
    ...getUseRequestRouter(langPrefix),
    ...getUseRequestPlugins(langPrefix),
    ...Router.map(item => ({
      text: item.text,
      items: item.items?.map(i => ({
        text: i.text,
        link: `${langPrefix}${i.link.replace('/', '')}`,
      })),
    })),
  ]
}
