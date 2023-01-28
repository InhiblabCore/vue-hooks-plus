<p align="center">
  <a href="https://inhiblabcore.github.io/docs/hooks">
    <img width="216" src="https://raw.githubusercontent.com/InhiblabCore/vue-hooks-plus/master/packages/hooks/docs/public/logo@2x.png">
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-hooks-plus"><img src="https://img.shields.io/npm/v/vue-hooks-plus.svg" alt="npm package"></a>
  <a href="https://github.com/InhiblabCore/vue-hooks-plus/actions/workflows/node-ci.yml"><img src="https://github.com/InhiblabCore/vue-hooks-plus/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>
  <a href="#badge"><img src="https://img.shields.io/github/languages/top/InhiblabCore/vue-hooks-plus" alt="language"></a>
  <a href="https://img.badgesize.io/https:/unpkg.com/vue-hooks-plus/dist/js/index.es.js?label=gzip%20size&compression=gzip"><img src="https://img.badgesize.io/https:/unpkg.com/vue-hooks-plus/dist/js/index.es.js?label=gzip%20size&compression=gzip" alt="gzip"></a>
  <a href="#badge"><img src="https://img.shields.io/librariesio/github/InhiblabCore/vue-hooks-plus" alt="librariesio"></a>
  <a href="https://github.com/InhiblabCore/vue-hooks-plus/blob/master/LICENSE"><img src="https://img.shields.io/github/license/InhiblabCore/vue-hooks-plus" alt="LICENSE"></a>
</p>

<div align="center">

# VueHooks Plus

English | [简体中文](https://github.com/InhiblabCore/vue-hooks-plus/tree/master/README.zh-CN.md)

High performance & Simplicity Vue3 Hooks library

</div>

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

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/vue-hooks-plus/dist/js/index.iife.js"></script>
```

It will be exposed to global as `VueHooks_Plus`

## 🤹‍♀️ Usage

```typescript
import { useRequest } from 'vue-hooks-plus'
```

Introduced on demand

```typescript
import useRequest from 'vue-hooks-plus/es/useRequest'
```

Auto Import

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

For other supported tools, please see [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

### Globalization Documentations

- [English Documentations](https://inhiblabcore.github.io/docs/hooks/en)
- [中文文档](https://inhiblabcore.github.io/docs/hooks)

### Example

- [Vue Admin Novel](https://vue-admin-novel.vercel.app)
- [Nuxt3](https://github.com/InhiblabCore/vue-hooks-plus-example/tree/main/nuxt3)
- [Vite + Vue3](https://github.com/InhiblabCore/vue-hooks-plus-example/tree/main/vite-vue3)
- [Webpack + Vue3](https://github.com/InhiblabCore/vue-hooks-plus-example/tree/main/webpack-vue3)

## 🪴 Project Activity

![Alt](https://repobeats.axiom.co/api/embed/35dbca2274542c0144993be92cc51762227543d9.svg 'Repobeats analytics image')

### Contributing

Welcome to join us! You can check out the [Contributing Guide](./CONTRIBUTING.md) to learn how to get started.

### Contributors

Thanks for all their contributions 🐝 !

<a href="https://github.com/InhiblabCore/vue-hooks-plus/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=InhiblabCore/vue-hooks-plus" />
</a>

## 🌸 Thanks

This project is heavily inspired by the following awesome projects.

- [ahooks](https://ahooks.js.org/)
- [@koale/useworker](https://github.com/alewin/useWorker)

## 📄 License

[MIT License](https://github.com/InhiblabCore/vue-hooks-plus/blob/master/LICENSE) © 2022-PRESENT [YongGit](https://github.com/NelsonYong)
