---
map:
  # 映射到docs的路径
  path: /useUrlState
---

# useUrlState

通过 url query 来管理 state 的 Hook。

## 代码演示

<demo src="./demo/demo.vue"
language="vue"
title="基本用法"
desc="将状态同步到 url query 中。通过设置值为 undefind, 可以从 url query 上彻底删除某个属性，从而使用默认值。"> </demo>

## API

```typescript
const state = useUrlState(defaultState, {
  localStorageKey: 'localStorageKey',
  routerPushFn,
})

interface UseUrlStateOptions {
  localStorageKey?: string
}
```

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialState | 默认值 | `S` \| `() => S` | - |
| options | 设置`localStorageKey`的话，若 url 没有参数，会使用存在 localStorage 的值 | UseUrlStateOptions | - |
| routerPushFn | 一般来说，传 vue-router 的 `router.push`方法就行 | `function` | - |

## Result

| 参数  | 说明   | 类型 |
| ----- | ------ | ---- |
| state | 状态值 | -    |
