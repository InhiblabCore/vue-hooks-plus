# Getting Started
 
::: danger Minimum Node.js Version
Developing, building, and running the documentation for this repository require **Node.js >= 22.18.0**. This requirement comes from the current tsdown build toolchain. Browser usage of the published hooks remains tied to Vue 3 and does not add a Node.js runtime requirement.
:::

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
