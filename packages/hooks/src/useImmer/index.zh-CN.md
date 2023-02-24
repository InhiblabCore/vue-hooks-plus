---
map:
  # 映射到docs的路径
  path: /useImmer
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/use-immer/src/index.ts
---

# useImmer

一个使用 [immer](https://github.com/mweststrate/immer) 操作状态的 hook。

## 安装

```bash

npm i @vue-hooks-plus/use-immer

```

### 自动引入

```typescript

import { VueHooksPlusUseImmerResolver } from '@vue-hooks-plus/resolvers'

```

[使用方法](https://inhiblabcore.github.io/docs/hooks/guide/#%F0%9F%94%A8-%E4%BD%BF%E7%94%A8)

> 该 `hook` 基于 `immer` 管理状态，会安装 `immer`保证在项目中正常工作
>
> 独立安装 `@vue-hooks-plus/use-immer`

## 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc=""> </demo>

## API

```typescript
const [state, updater] = useImmer(initialValue)
```

## Params

| 参数    | 说明       | 类型            | 默认值 |
| ------- | ---------- | --------------- | ------ |
| state   | 响应式对象 | `ShallowRef<S>` | -      |
| updater | 改变值     | `Updater<S>`    | -      |

## Options

| Property     | Description  | Type         | Default |
| ------------ | ------------ | ------------ | ------- |
| initialValue | hover 时触发 | `() => void` | `any`   |
