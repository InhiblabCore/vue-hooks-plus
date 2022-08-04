import { defineConfig } from 'vitepress'
import { applyPlugins } from '@vfc/md-demo-plugins'
import { genTemp } from '@vfc/vite-plugin-gen-temp'

const base =
	process.env.NODE_ENV === 'production' ? '/vue3-hooks-plus/docs-beta' : ''
const { resolve } = require('path')

export default defineConfig({
	head: [
		[
			'link',
			{
				rel: 'icon',
				href: `http://43.138.187.142:9000/assets/vue3-hooks-plus/favicon.ico`,
			},
		],
	],
	title: 'Vue3-hooks-plus',
	description: '_description',
	// // 扫描srcIncludes里面的 *.md文件
	srcIncludes: ['src'],
	alias: {
		'vue3-hooks-plus': resolve('./src'),
	},
	base,
	themeConfig: {
		lang: 'zh-CN',
		title: 'Vue3-hooks-plus',
		logo: `${
			process.env.NODE_ENV === 'production'
				? '/logo.png'
				: '/.vitepress/public/logo.png'
		}`,

		nav: [
			{ text: '指南', link: '/' },
			{ text: 'Hooks', link: '/useRequest/' },
		],
		sidebar: {
			'/': getHooksSidebar(),
		},

		search: {
			searchMaxSuggestions: 10,
		},
		repo: '/InhiblabCore/vue3-hooks-plus',
		repoLabel: 'Github',
		lastUpdated: '最近更新',
		prevLink: true,
		nextLink: true,
	},
	vite: {
		plugins: [genTemp()],
	},
	markdown: {
		config: (md) => {
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
			text: 'useRequest',
			items: [
				{
					text: '快速使用',
					link: '/useRequest/',
				},
				{
					text: '基础用法',
					link: '/useRequest/basic/',
				},
				{
					text: 'loadingDelay',
					link: '/useRequest/loadingDelay/',
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
					text: '屏幕聚焦重新请求',
					link: '/useRequest/refreshOnWindowFocus/',
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
					text: '缓存 & SWR',
					link: '/useRequest/cache/',
				},
				{
					text: '错误重试',
					link: '/useRequest/retry/',
				},
				{
					text: '自定义插件 🌟',
					link: '/useRequest/plugin/',
				},
			],
		},
		{
			text: 'DataDesign·Beta',
			items: [
				{ text: '介绍使用', link: '/useDataDesign/' },
				{ text: 'Type 类型处理', link: '/useDataDesign/typesCheck/' },
				{ text: 'Transform 数据转换', link: '/useDataDesign/transforms/' },
			],
		},
		{
			text: 'State',
			items: [
				{ text: 'useBoolean', link: '/useBoolean/' },
				// { text: 'useUrlState', link: '/useUrlState/' },
				{ text: 'useDebounce', link: '/useDebounce/' },
				{ text: 'useThrottle', link: '/useThrottle/' },
				{ text: 'useToggle', link: '/useToggle/' },
				{ text: 'useCookieState', link: '/useCookieState/' },
				{ text: 'useLocalStorageState', link: '/useLocalStorageState/' },
				{ text: 'useSessionStorageState', link: '/useSessionStorageState/' },
				{ text: 'useMap', link: '/useMap/' },
				{ text: 'useSet', link: '/useSet/' },
			],
		},

		{
			text: 'Effect',
			items: [
				{ text: 'useDebounceFn', link: '/useDebounceFn/' },
				{ text: 'useThrottleFn', link: '/useThrottleFn/' },
				{ text: 'useLockFn', link: '/useLockFn/' },
				{ text: 'useUpdate', link: '/useUpdate/' },
				{ text: 'useInterval', link: '/useInterval/' },
				{ text: 'useTimeout', link: '/useTimeout/' },
			],
		},
		{
			text: 'Scene',
			items: [
				// { text: 'useEcharts', link: '/useEcharts/' },
				{ text: 'useVirtualList', link: '/useVirtualList/' },
				{ text: 'useNetwork', link: '/useNetwork/' },
				{ text: 'useCounter', link: '/useCounter/' },
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
				{ text: 'useTitle', link: '/useTitle/' },
				{ text: 'useSize', link: '/useSize/' },
				{ text: 'useScroll', link: '/useScroll/' },
				{ text: 'useHover', link: '/useHover/' },
				{ text: 'useMedia', link: '/useMedia/' },
				{ text: 'useMouse', link: '/useMouse/' },
				{ text: 'useWinResize', link: '/useWinResize/' },
				{ text: 'useFocusWithin', link: '/useFocusWithin/' },
			],
		},
		{
			text: 'Browser',
			items: [
				{
					text: 'useDisableBrowserBehavior',
					link: '/useDisableBrowserBehavior/',
				},
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
