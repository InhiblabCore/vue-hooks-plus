---
map:
  # 映射到docs的路径
  path: /useRequest/retry/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useRetryPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/retry/demo/demo.vue
---

# 错误重试

`useRequest` 提供了一个 `options.retryCount` 参数，指定错误重试次数，则 `useRequest` 在失败后会进行重试

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="请求错误重试三次,加上首次请求失败，所以最后为四次错误"> </demo>

## API

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| retryCount | 错误重试次数。如果设置为 `-1`，则无限次重试。 | `number` | - |
| retryInterval | <ul><li>重试时间间隔，单位为毫秒。</li><li>如果不设置，默认采用简易的指数退避算法，取 `1000 * 2 ** retryCount`，也就是第一次重试等待 2s，第二次重试等待 4s，以此类推，如果大于 30s，则取 30s </li></ul> | `number` | - |

:::warning 注意

- `cancel` 可以取消正在进行的重试行为。

:::
