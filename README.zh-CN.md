<p align="center">
  <a href="http://43.138.187.142:9000/vue-hooks-plus/docs/">
    <img width="216" src="http://43.138.187.142:9000/assets/vue-hooks-plus/logo@2x.png">
  </a>
</p>

<div align="center">

[ahooks](https://ahooks.js.org/zh-CN/) Vue 的实现.

<h1 style="background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff); background-clip: text;
-webkit-background-clip: text;-webkit-text-fill-color: transparent;">Vue-hooks-plus</h1>

[English](https://github.com/InhiblabCore/vue-hooks-plus/tree/master/README.md) | 简体中文
</div>

## 📚 文档

[在线文档📒](http://43.138.187.142:9000/vue-hooks-plus/docs/)

## ✨ 特性

- 易学易用
- 支持 SSR
- 丰富的 Hooks
- 覆盖大部分业务场景
- 使用 TypeScript 构建，提供完整的类型定义文件
- 支持按需加载，减少打包体积

## 📦 安装

```
$ npm install --save vue-hooks-plus
# or
$ yarn add vue-hooks-plus
```

## 🔨  使用

```typescript
import { useRequest } from 'vue-hooks-plus'

// or 按需引入

import useRequest from 'vue-hooks-plus/es/useRequest'
```

## 🏃 启动文档

hooks 目录下

```
npm run initial
npm run docs:dev

```

注意： 需要先初始化再启动文档项目，由于插件原因 `useAsyncOrder`、`useBoolean` 、 `useCookieState` 初始化会出现空缺状态，需要手动去到当前文件夹内的md文件中进行保存，插件会监听保存操作，后续会进行修复。