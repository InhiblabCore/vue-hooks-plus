---
map:
  # 映射到docs的路径
  path: /useFetchs
---

# useFetchs

基于 `useRequest` 实现强大的并行请求的能力，优雅的管理多个相同 URL 携带不同参数的请求。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="多个请求同时进行的请求状态管理"> </demo>

## API

```typescript
const { fetchRun, fetchs } = useFetchs(service, options, {
  fetchKey: params => string | number,
})
```

## Result

| 参数     | 说明               | 类型                                  | 默认值 |
| -------- | ------------------ | ------------------------------------- | ------ |
| fetchs   | 收集的所有请求状态 | `Readonly<FetchType<TData, TParams>>` | -      |
| fetchRun | 需要运行的函数     | `(...args) => void`                   | -      |

## Params

| 参数    | 说明                | 类型                                            | 默认值 |
| ------- | ------------------- | ----------------------------------------------- | ------ |
| service | 请求函数            | `UseRequestService<TData, ParamsType<TParams>>` | -      |
| options | 额外的配置项        | `useRequest Options`                            | -      |
| self    | 自身配置 `fetchKey` | `(...args: ParamsType<TParams>) => string`      | -      |

## Options

参考 `useRequest` 的 option，注意，`fetchRun` 需要在手动模式下 `manual` 强制为 `true`

| 参数     | 说明                                      | 类型                            |
| -------- | ----------------------------------------- | ------------------------------- |
| fetchKey | 获取 key，用于注入 useRequest 的 cacheKey | `(...args) => string \| number` |
