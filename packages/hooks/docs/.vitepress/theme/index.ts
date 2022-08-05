import DefaultTheme from 'vitepress/theme'
import DemoBlock from '@vfc/vitepress-demo-block'
import '@vfc/vitepress-demo-block/dist/style.css'
import './var.css'

export default {
	...DefaultTheme,

	enhanceApp({ app, router, siteData }) {
		app.component('demo', DemoBlock)
	},
}
