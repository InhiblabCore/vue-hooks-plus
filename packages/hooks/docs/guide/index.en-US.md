---
source:
  show: false
---

<script setup>
import Badge from '@theme/home/Badge.vue'
</script>

# VueHooks Plus

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

## 📝 Latest Version

<Badge />

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

Only `resolver` for `unplugin-auto-import/vite`.

#### Vite

```bash

npm i @vue-hooks-plus/resolvers

```

##### Use

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

<br />

## 🧩 Compatible

::: warning Not compatible with vue2 version

:::
