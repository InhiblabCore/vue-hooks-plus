---
map:
  # 映射到docs的路径
  path: /useFetchs
---

# useFetchs

Based on `useRequest`'s ability to implement powerful parallel requests, gracefully manage multiple identical URLs carrying different parameters.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Request status management for multiple requests simultaneously"> </demo>

## API

```typescript
const { fetchRun, fetchs } = useFetchs(service, options, {
  fetchKey: params => string | number,
})
```

## Result

| 参数     | 说明                             | 类型                                  | 默认值 |
| -------- | -------------------------------- | ------------------------------------- | ------ |
| fetchs   | Status of all requests collected | `Readonly<FetchType<TData, TParams>>` | -      |
| fetchRun | Functions that you need to run   | `(...args) => void`                   | -      |

## Params

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| service | Service function | `UseRequestService<TData, ParamsType<TParams>>` | - |
| options | Additional Configuration Items | `useRequest Options` | - |
| self | self options `fetchKey` | `(...args: ParamsType<TParams>) => string` | - |

## Options

Referring to the option of `useRequest`, note that `fetchRun` needs to be `true` in manual mode

| Property | Description                      | Type                            |
| -------- | -------------------------------- | ------------------------------- |
| fetchKey | Get key, cacheKey for useRequest | `(...args) => string \| number` |
