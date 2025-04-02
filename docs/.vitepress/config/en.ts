import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export const en = defineConfig({
  lang: 'en-US',
  description: 'Vite & Vue powered static site generator.',

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/hooks/': { base: '/hooks/', items: sidebarHooks("") },
    },

    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
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
      text: 'Hooks guide',
      link: '/hooks/guide',
      activeMatch: '/hooks/'
    },
    {
      text: '🤺 Playground',
      link: 'https://inhiblabcore.github.io/vue-hooks-plus-playground/play',
    }
    // {
    //   text: pkg.version,
    //   items: [
    //     {
    //       text: 'Changelog',
    //       link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
    //     },
    //     {
    //       text: 'Contributing',
    //       link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
    //     }
    //   ]
    // }
  ]
}

export function sidebarHooks(lang: "" | 'zh'): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: "guide" },
        { text: 'Getting Started', link: 'getting-started' },
        { text: '🫶 Migrate to v2 version', link: 'migrate' }
      ],
    },
    {
      text: 'State',
      items: [
        { text: 'useBoolean', link: 'useBoolean' },
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
        { text: 'useFullscreen', link: 'useFull' },
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
        { text: 'useEventEmitter', link: '/useEventEmitter/' },
        {
          text: 'useAsyncOrder',
          link: 'useAsyncOrder',
        },
        { text: 'usePreview ⚠️', link: 'usePreview' },
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

