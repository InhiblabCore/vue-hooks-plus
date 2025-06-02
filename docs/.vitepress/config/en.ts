import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vue-hooks-plus/package.json')

function siderbarUseRequestPlugin(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'UseRequest External Plugins',
      items: [
        {
          text: 'global Fetching',
          link: 'useRequest/plugins/fetchsing',
        },
        {
          text: 'broadcastChannel',
          link: 'useRequest/plugins/broadcastChannel',
        }]
    }
  ]
}
function siderbarUseRequest(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'useRequest',
      items: [
        {
          text: 'Quick Start',
          link: 'useRequest/quick-start',
        },
        {
          text: 'Guide',
          link: 'useRequest/guide',
        },
        {
          text: 'Basic',
          link: 'useRequest/basic',
        },
        {
          text: 'Debounce',
          link: 'useRequest/debounce',
        },
        {
          text: 'Throttle',
          link: 'useRequest/throttle',
        },

        {
          text: 'Polling',
          link: 'useRequest/polling',
        },

        {
          text: 'Ready',
          link: 'useRequest/ready',
        },
        {
          text: 'RefreshDeps',
          link: 'useRequest/refreshDeps',
        },

        {
          text: 'Fetchs',
          link: 'useRequest/fetchs',
        },
        {
          text: 'Retry',
          link: 'useRequest/retry',
        },
        {
          text: 'Format Result',
          link: 'useRequest/formatResult',
        },
        {
          text: 'Cache & SWR',
          link: 'useRequest/cache',
        },
        {
          text: 'LoadingDelay',
          link: 'useRequest/loadingDelay',
        },
        {
          text: 'RefreshOnWindowFocus',
          link: 'useRequest/refreshOnWindowFocus',
        },
        {
          text: 'Scroll',
          link: 'useRequest/scroll',
        },
        {
          text: 'Middleware',
          link: 'useRequest/middleware',
        },
        {
          text: 'Plugins Design',
          link: 'useRequest/plugin',
        },
        {
          text: 'Global Option',
          link: 'useRequest/global',
        },
        {
          text: 'DevTools',
          link: 'useRequest/devtools',
        },
      ],
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: "/guide/introduction" },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: '🫶 Migrate to v2 version', link: '/guide/migrate' }
      ],
    }
  ]
}
export const en = defineConfig({
  lang: 'en-US',
  description: 'High performance and powerful hooks for Vue.',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide/': sidebarGuide(),
      '/hooks/': {
        base: '/hooks/', items: [
          ...siderbarUseRequest(),
          ...siderbarUseRequestPlugin(),
          ...sidebarHooks(),
        ]
      },
      '/components/': sidebarComponents(),
    },

    editLink: {
      pattern: 'https://github.com/InhiblabCore/vue-hooks-plus/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright (c) 2022 YongGit'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      activeMatch: '^/guide/',
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: '🫶 Migrate to v2 version', link: '/guide/migrate' }
      ]
    },
    {
      text: 'Hooks',
      link: '/hooks/useRequest/quick-start',
      activeMatch: '/hooks'
    },
    {
      text: "Components",
      link: '/components/guide',
      activeMatch: '/components/'
    },
    {
      text: '🤺 Playground',
      link: 'https://inhiblabcore.github.io/vue-hooks-plus-playground/play',
    },
    {
      text: pkg.version,
      items: [
        {
          text: 'Contributing',
          link: 'https://github.com/InhiblabCore/vue-hooks-plus/blob/master/CONTRIBUTING.md'
        }
      ]
    }
  ]
}



export function sidebarHooks(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'State',
      items: [
        { text: 'useBoolean', link: 'useBoolean' },
        { text: "useControlledState", link: "useControlledState" },
        { text: 'useImmer', link: 'useImmer' },
        { text: 'useUrlState', link: 'useUrlState' },
        { text: 'useFormatResult', link: 'useFormatResult' },
        { text: 'useDebounce', link: 'useDebounce' },
        { text: 'useThrottle', link: 'useThrottle' },
        { text: 'useToggle', link: 'useToggle' },
        { text: 'useCookieState', link: 'useCookieState' },
        { text: 'useLocalStorageState', link: 'useLocalStorageState' },
        { text: 'useSessionStorageState', link: 'useSessionStorageState' },
        { text: 'useMap', link: 'useMap' },
        { text: 'useSet', link: 'useSet' },
        { text: 'usePrevious', link: 'usePrevious' },
        { text: 'useSetState', link: 'useSetState' },
      ],
    },

    {
      text: 'Effect',
      items: [
        { text: 'useDebounceFn', link: 'useDebounceFn' },
        { text: 'useThrottleFn', link: 'useThrottleFn' },
        { text: 'useFetchs', link: 'useFetchs' },
        { text: 'useLockFn', link: 'useLockFn' },
        { text: 'useUpdate', link: 'useUpdate' },
        { text: 'useInterval', link: 'useInterval' },
        { text: 'useTimeout', link: 'useTimeout' },
        { text: 'useWorker', link: 'useWorker' },
      ],
    },
    {
      text: 'Scene',
      items: [
        { text: 'useCounter', link: 'useCounter' },
        { text: 'useInfiniteScroll', link: 'useInfiniteScroll' },
        { text: 'useNetwork', link: 'useNetwork' },
        { text: 'useVirtualList', link: 'useVirtualList' },
        { text: 'useWebSocket', link: 'useWebSocket' },
      ],
    },
    {
      text: 'Dom',
      items: [
        {
          text: 'useEventListener',
          link: 'useEventListener',
        },
        {
          text: 'useExternal',
          link: 'useExternal',
        },
        { text: 'useDrop & useDrag', link: 'useDrop-useDrag' },
        { text: 'useDarkMode', link: 'useDarkMode' },
        { text: 'useFavicon', link: 'useFavicon' },
        { text: 'useFocusWithin', link: 'useFocusWithin' },
        { text: 'useFullscreen', link: 'useFullscreen' },
        { text: 'useHover', link: 'useHover' },
        { text: 'useInViewport', link: 'useInViewport' },
        { text: 'useKeyPress', link: 'useKeyPress' },
        { text: 'useMedia', link: 'useMedia' },
        { text: "useMutationObserver", link: 'useMutationObserver' },
        { text: 'useMouse', link: 'useMouse' },
        { text: 'useSize', link: 'useSize' },
        { text: 'useElementBounding', link: 'useElementBounding' },
        { text: 'useResizeObserver', link: 'useResizeObserver' },
        { text: 'useScroll', link: 'useScroll' },
        { text: 'useTitle', link: 'useTitle' },
        { text: 'useWinResize', link: 'useWinResize' },
        { text: 'useLongPress', link: 'useLongPress' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: 'useEventEmitter', link: 'useEventEmitter' },
        {
          text: 'useAsyncOrder',
          link: 'useAsyncOrder',
        },
        // { text: 'usePreview ⚠️', link: 'usePreview' },
      ],
    },
    {
      text: 'Dev',
      items: [
        { text: 'useTrackedEffect', link: 'useTrackedEffect' },
        { text: 'useWhyDidYouUpdate', link: 'useWhyDidYouUpdate' },
      ],
    },
  ].map((item) => {

    return item
  })
}



export function sidebarComponents(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Components',
      items: [
        {
          text: 'Guide',
          link: '/components/guide',
        },
        { text: 'useRequest', link: '/components/useRequest' },
      ],
    }
  ]
}