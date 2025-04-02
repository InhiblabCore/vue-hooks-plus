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
      '/hooks/': { base: '/hooks/', items: sidebarHooks() },
      '/reference/': { base: '/reference/', items: sidebarReference() }
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
      text: 'Hooks',
      link: '/hooks/guide',
      activeMatch: '/hooks/'
    },
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

function sidebarHooks(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: 'guide' },
        { text: 'Getting Started', link: 'getting-started' },
        { text: 'Routing', link: 'routing' },
        { text: 'Deploy', link: 'deploy' },
      ],
    },
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
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Reference',
      items: [
        { text: 'Site Config', link: 'site-config' },
        { text: 'Frontmatter Config', link: 'frontmatter-config' },
        { text: 'Runtime API', link: 'runtime-api' },
        { text: 'CLI', link: 'cli' },
        {
          text: 'Default Theme',
          base: '/reference/default-theme-',
          items: [
            { text: 'Overview', link: 'config' },
            { text: 'Nav', link: 'nav' },
            { text: 'Sidebar', link: 'sidebar' },
            { text: 'Home Page', link: 'home-page' },
            { text: 'Footer', link: 'footer' },
            { text: 'Layout', link: 'layout' },
            { text: 'Badge', link: 'badge' },
            { text: 'Team Page', link: 'team-page' },
            { text: 'Prev / Next Links', link: 'prev-next-links' },
            { text: 'Edit Link', link: 'edit-link' },
            { text: 'Last Updated Timestamp', link: 'last-updated' },
            { text: 'Search', link: 'search' }
          ]
        }
      ]
    }
  ]
}