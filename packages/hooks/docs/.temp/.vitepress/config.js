const base = process.env.NODE_ENV === 'production' ? '/vue3-hooks-plus' : ''
const { resolve } = require('path')
// const { kebabCase } = require('lodash')

module.exports = {
	title: 'vue3-hooks-plus',
	description: '_description',
	// // 扫描srcIncludes里面的 *.md文件
	srcIncludes: ['src'],
	alias: {
		'vue3-hooks-plus': resolve('./src'),
	},
	base,
	themeConfig: {
		lang: 'zh-CN',
		title: 'vue3-hooks-plus',
		nav: [
			{ text: '指南', link: '/' },
			{ text: 'Hooks', link: '/useBoolean/' },
		],
		sidebar: {
			'/': getHooksSidebar(),
		},

		search: {
			searchMaxSuggestions: 10,
		},
		lang: 'zh-CN',
		repo: 'InhiblabCore/vue3-hooks-plus-docs',
		repoLabel: 'Github',
		lastUpdated: true,
		prevLink: true,
		nextLink: true,
	},
}

function getGuideSidebar() {
	return [
		{
			text: '阅读指南',
			children: [
				{ text: '介绍', link: '/guide/' },
				{ text: 'hooks安装使用', link: '/guide/start/' },
			],
		},
	]
}

function getHooksSidebar() {
	return [
		{
			text: 'State',
			children: [
				{ text: 'useBoolean', link: '/useBoolean/' },
				// { text: 'useMap', link: '/hooks/useMap/' },
			],
		},
		// {
		// 	text: 'Effect',
		// 	children: [
		// 		{ text: 'useDebounceFn', link: '/hooks/useDebounceFn/' },
		// 		{ text: 'useLockFn', link: '/hooks/useLockFn/' },
		// 		{ text: 'useUpdate', link: '/hooks/useUpdate/' },
		// 	],
		// },
		// {
		// 	text: 'Scene',
		// 	children: [
		// 		{ text: 'useEcharts', link: '/hooks/useEcharts/' },
		// 		{ text: 'useVirtualList', link: '/hooks/useVirtualList/' },
		// 	],
		// },
		// {
		// 	text: 'Dom',
		// 	children: [
		// 		{
		// 			text: 'useEventListener',
		// 			link: '/hooks/useEventListener/',
		// 		},
		// 		{ text: 'useTitle', link: '/hooks/useTitle/' },
		// 		{ text: 'useSize', link: '/hooks/useSize/' },
		// 	],
		// },
	]
}

function getReactBlogSidebar() {
	return [
		{
			text: 'React介绍',
			link: '/blog/React/',
		},
	]
}

function getVueBlogSidebar() {
	return [
		{
			text: 'Vue介绍',
			link: '/blog/Vue/',
		},
	]
}

function getWebpackBlogSidebar() {
	return [
		{
			text: 'Webpack介绍',
			link: '/blog/Webpack/',
		},
	]
}
function getWebGoodBlogSidebar() {
	return [
		{
			text: '性能优化简述',
			link: '/blog/webGood/',
		},
	]
}
