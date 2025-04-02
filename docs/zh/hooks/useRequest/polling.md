---
map:
  # 映射到docs的路径
  path: /useRequest/polling/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/usePollingPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/polling/demo/demo.vue
---

# 轮询

通过设置 `options.pollingInterval`，进入轮询模式，`useRequest` 会定时触发 `service` 执行。

## 代码演示

<demo src="request-polling/demo.vue"
  language="vue"
  title=""
  desc="轮询"> </demo>

## Return

| 参数     | 说明     | 类型                                     |
| -------- | -------- | ---------------------------------------- |
| run      | 启动轮询 | `(...params: TParams) => void`           |
| runAsync | 启动轮询 | `(...params: TParams) => Promise<TData>` |
| cancel   | 停止轮询 | `() => void`                             |

## Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pollingInterval | 轮询间隔，单位为毫秒。如果值大于 0，则启动轮询模式。 | `number`\|`Ref<number>` | `0` |
| pollingWhenHidden | 在页面隐藏时，是否继续轮询。如果设置为 false，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。 | `boolean` | `true` |
| pollingErrorRetryCount | 轮询错误重试次数。如果设置为 -1，则无限次 | `number` | `-1` |

:::warning 注意

- `options.pollingInterval` 支持动态变化。
- `options.pollingWhenHidden` 支持动态变化。
- 如果设置 `options.manual = true`，则初始化不会启动轮询，需要通过 `run/runAsync` 触发开始。
- 轮询原理是在每次请求完成后，等待 `pollingInterval` 时间，发起下一次请求。

:::
