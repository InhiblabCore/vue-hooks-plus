`@ruabick/md-demo-plugins` 与 `@ruabick/vitepress-demo-block` 配合使用在 VirePress 里面支持`demo-block`。

### 步骤 1: 增加 markdown 插件

安装插件 `pnpm add @ruabick/md-demo-plugins -D`

```js
// .vitepress/config.js
import { applyPlugins } from '@vue-hooks-plus/md-demo-plugins'

export default defineConfig({
  markdown: {
    config: md => {
      applyPlugins(md)
    },
  },
})
```

### 步骤 2: 注册 demo 组件

安装插件 `pnpm add @vue-hooks-plus//vitepress-demo-block -D`

```js
// docs/.vitepress/theme/index.ts
import DemoBlock from '@vue-hooks-plus//vitepress-demo-block'
import '@vue-hooks-plus//vitepress-demo-block/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('demo', DemoBlock)
  },
}
```

### 步骤 3: 修改 VitePress `Code Blocks` 样式 （可选）

`VitePress` 默认 `Code Blocks` 是黑色，与 demo 样式不太符合，所以建议修改 `Code Blocks` 样式。
