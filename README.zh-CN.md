<p align="center">
  <a href="https://inhiblabcore.github.io/vue-hooks-plus">
     <img width="216" src="https://inhiblabcore.github.io/vue-hooks-plus/logo@2x.png">
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-hooks-plus"><img src="https://img.shields.io/npm/v/vue-hooks-plus.svg" alt="npm package"></a>
  <a href="https://github.com/InhiblabCore/vue-hooks-plus/actions/workflows/node-ci.yml"><img src="https://github.com/InhiblabCore/vue-hooks-plus/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>
  <a href="#badge"><img src="https://img.shields.io/github/languages/top/InhiblabCore/vue-hooks-plus" alt="language"></a>
  <!-- <a href="https://img.badgesize.io/https:/unpkg.com/vue-hooks-plus/dist/js/index.es.js?label=gzip%20size&compression=gzip"><img src="https://img.badgesize.io/https:/unpkg.com/vue-hooks-plus/dist/js/index.es.js?label=gzip%20size&compression=gzip" alt="gzip"></a> -->
  <a href="#badge"><img src="https://img.shields.io/librariesio/github/InhiblabCore/vue-hooks-plus" alt="librariesio"></a>
  <a href="https://github.com/InhiblabCore/vue-hooks-plus/blob/master/LICENSE"><img src="https://img.shields.io/github/license/InhiblabCore/vue-hooks-plus" alt="LICENSE"></a>
  <a href="https://deepwiki.com/InhiblabCore/vue-hooks-plus"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
</p>

<div align="center">

# VueHooks Plus

[English](https://github.com/InhiblabCore/vue-hooks-plus/tree/master/README.md) | 简体中文

高性能 & 简约的 Vue3 Hooks 库

</div>

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

> [!IMPORTANT]
> 本仓库的开发、构建和文档构建现在要求使用 **Node.js >= 22.18.0**。已发布的 hooks 仍面向 Vue 3 应用，在浏览器运行时不会额外要求 Node.js。

```bash
npm i vue-hooks-plus
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vue-hooks-plus/dist/js/index.iife.js"></script>
```

它会导出一个全局的变量 `VueHooks_Plus`

## 🤹‍♀️ 使用

```typescript
import { useRequest } from 'vue-hooks-plus'
```

按需加载

```typescript
import useRequest from 'vue-hooks-plus/es/useRequest'
```

自动引入

<details>
<summary>Vite</summary><br>

```ts
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

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
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

<br></details>

其他支持的工具, 更多请看 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

### 国际化文档

- [English Documentations](https://inhiblabcore.github.io/vue-hooks-plus)
- [中文文档](https://inhiblabcore.github.io/vue-hooks-plus/zh/)

### 例子

- [Vue Admin Novel](https://github.com/NelsonYong/vue-admin-novel)
- [Nuxt 3](https://github.com/InhiblabCore/vue-hooks-plus-example/tree/main/nuxt3)
- [Vite + Vue 3](https://github.com/InhiblabCore/vue-hooks-plus-example/tree/main/vite-vue3)
- [Webpack + Vue 3](https://github.com/InhiblabCore/vue-hooks-plus-example/tree/main/webpack-vue3)

## 🤩 惊叹的 Used by

### 模版

- [Ray Template](https://github.com/XiaoDaiGua-Ray/ray-template)

## 🪴 项目活动

![Alt](https://repobeats.axiom.co/api/embed/35dbca2274542c0144993be92cc51762227543d9.svg 'Repobeats analytics image')

### 贡献

欢迎你的加入！你可以查阅 [贡献指南](./CONTRIBUTING.md) 了解如何开始。

### 贡献者

感谢他们的所做的一切贡献 🐝 ！

<a href="https://github.com/InhiblabCore/vue-hooks-plus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=InhiblabCore/vue-hooks-plus" />
</a>

## 🌸 感谢

这个项目的灵感主要来自于以下这些很棒的项目。

- [ahooks](https://ahooks.js.org/)
- [@koale/useworker](https://github.com/alewin/useWorker)

## 📄 证书

[MIT License](https://github.com/InhiblabCore/vue-hooks-plus/blob/master/LICENSE) © 2022-PRESENT [YongGit](https://github.com/NelsonYong)
