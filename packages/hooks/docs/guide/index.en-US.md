---
source:
  show: false
---

<script setup>
import Badge from '@theme/home/Badge.vue'
</script>

<Badge />

Through this chapter, you will know how to quickly start using VueHooks Plus.

## ✨ Features

- 🏄🏼‍♂️ Easy to learn and use
- 🔋 Supports SSR
- 🛸 Contains a comprehensive collection of basic Hooks
- 🏟️ A wide range of application scenarios
- 🦾 Preferred useRequest, Powerful request middle tier
- 🎪 Interactive demo, immersive
- 🎯 Written in TypeScript with predictable static types
- 🪄 Support the on-demand load, and reduce the packing volume
- 🤺 Playground, there's ample scope for one's abilities
- 🔐 Perfect test, safe and reliable

## 📦 Install

```bash
npm i vue-hooks-plus
```

## 🔨 Usage

### All

```typescript
import { useRequest } from 'vue-hooks-plus'
```

### Introduced on demand

```typescript
import useRequest from 'vue-hooks-plus/es/useRequest'
```

### Auto Import

Use `unplugin-auto-import`'s `resolver`

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

For other supported tools, please see [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

<br />

## 🧩 Compatible

::: warning Not compatible with vue2 version

:::
