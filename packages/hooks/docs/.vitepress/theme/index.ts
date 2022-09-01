import DefaultTheme from 'vitepress/theme'
import DemoBlock from '@vue-hooks-plus/vitepress-demo-block'
import '@vue-hooks-plus/vitepress-demo-block/dist/style.css'
import './var.less'

export default {
  ...DefaultTheme,

  enhanceApp({ app, router, siteData }) {
    app.component('demo', DemoBlock)
  },
}
