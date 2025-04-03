---
map:
  # 映射到docs的路径
  path: /useImmer
---

# useImmer

A hook to use [immer](https://github.com/mweststrate/immer) as a Vue hook to manipulate state.

## Install

```bash

npm i @vue-hooks-plus/use-immer

```

### Auto Import

```typescript
import { VueHooksPlusUseImmerResolver } from '@vue-hooks-plus/resolvers'
```

[How to use](https://inhiblabcore.github.io/docs/hooks/en/guide/#%F0%9F%94%A8-usage)

> The `hook` is based on `immer` management status, `immer` will be installed to ensure normal work in the project
>
> Independent installation `@vue-hooks-plus/use-immer`

## Basic Usage

<demo src="useImmer/demo.vue"
  language="vue"
  title="basic Usage"
  desc=""> </demo>

## Params

| Property | Description | Type                      | Default |
| -------- | ----------- | ------------------------- | ------- |
| state    | ShallowRef  | `Readonly<ShallowRef<S>>` | -       |
| updater  | -           | `Updater<S>`              | -       |

## Options

| 参数         | 说明 | 类型         | 默认值 |
| ------------ | ---- | ------------ | ------ |
| initialValue | -    | `() => void` | `any`  |
