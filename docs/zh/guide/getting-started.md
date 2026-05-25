::: danger 最低 Node.js 版本
本仓库的开发、构建和文档构建要求使用 **Node.js >= 22.18.0**。该要求来自当前 tsdown 构建工具链。已发布 hooks 在浏览器中的使用仍以 Vue 3 为准，不会额外增加 Node.js 运行时要求。
:::

## 📦 安装

```bash
npm i vue-hooks-plus
```

## 🔨 使用

### 全量引入

```typescript
import { useRequest } from 'vue-hooks-plus'
```

### 按需引入

```typescript
import useRequest from 'vue-hooks-plus/es/useRequest'
```

### 自动引入

使用 `unplugin-auto-import` 的 `resolver`

```bash

npm i -D @vue-hooks-plus/resolvers

```

#### Vite

```typescript
import AutoImport from 'unplugin-auto-import/vite'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'

export const AutoImportDeps = () =>
  AutoImport({
    imports: ['vue', 'vue-router'],
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    dts: 'src/auto-imports.d.ts',
    resolvers: [VueHooksPlusResolver()],
  })
```

#### Webpack

```typescript
const { VueHooksPlusResolver } = require('@vue-hooks-plus/resolvers')
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-auto-import/webpack')({
      imports: ['vue', 'vue-router'],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/auto-imports.d.ts',
      resolvers: [VueHooksPlusResolver()],
    }),
  ],
}
```

其他支持的工具, 更多请看 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

<br />

## 🧩 兼容

::: warning 不兼容 vue2 版本

:::
