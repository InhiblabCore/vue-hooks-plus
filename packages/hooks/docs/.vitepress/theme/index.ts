import { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import DemoBlock from '@vue-hooks-plus/vitepress-demo-block'
import VhpButton from '../components/button'
import '@vue-hooks-plus/vitepress-demo-block/dist/style.css'
import './var.less'
import { useRequestDevToolsPlugin } from 'vue-hooks-plus'

import { createPinia } from 'pinia'

const store = createPinia()

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App<Element> }) {
    app.use(store)
    app.use(useRequestDevToolsPlugin)
    app.component('demo', DemoBlock)
    app.component('vhp-button', VhpButton)
  },
} as unknown
