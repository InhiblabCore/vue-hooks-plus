---
source:
  show: false
---

<script setup>
import Badge from '@theme/home/Badge.vue'
</script>

<Badge />

通过该章节，你将了解到如何快速开始使用 VueHooks Plus。

## ✨ 特性

- 🏄🏼‍♂️ 易学易用
- 🔋 支持 SSR
- 🛸 丰富的 Hooks
- 🏟️ 覆盖大部分业务场景
- 🦾 首选 useRequest，强大的请求中间层
- 🎪 交互式 demo，身临其境
- 🎯 使用 TypeScript 构建，提供完整的类型定义文件
- 🪄 支持按需加载，减少打包体积
- 🤺 演练场，大有用武之地
- 🔐 测试完善，安全可靠

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

::: details Vite

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

:::

::: details Webpack

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

:::

其他支持的工具, 更多请看 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

<br />

## 🧩 兼容

::: warning 不兼容 vue2 版本

:::
