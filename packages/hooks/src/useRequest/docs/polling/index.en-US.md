---
map:
  # 映射到docs的路径
  path: /useRequest/polling/
---

# Polling

By setting `options.pollingInterval`, enter the polling mode, `useRequest` will periodically trigger service execution.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="polling"> </demo>

## Return

| Property | Description   | Type                                     |
| -------- | ------------- | ---------------------------------------- |
| run      | Start polling | `(...params: TParams) => void`           |
| runAsync | Start polling | `(...params: TParams) => Promise<TData>` |
| cancel   | Stop polling  | `() => void`                             |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| pollingInterval | Polling interval, in milliseconds. If the value is greater than 0, the polling mode is activated. | `number`\|`Ref<number>` | `0` |
| pollingWhenHidden | Whether to continue polling when the page is hidden. If set to false, polling will be temporarily paused when the page is hidden, and resume when the page is visible again. | `boolean` | `true` |
| pollingErrorRetryCount | Number of polling error retries. If set to -1, an infinite number of times | `number` | `-1` |

:::warning Remark

- `options.pollingInterval` support dynamic changes.
- `options.pollingWhenHidden` support dynamic changes.
- If you set `options.manual = true`, the initialization will not start polling, you need start it by `run/runAsync`.
- The polling logic is to wait for `pollingInterval` time after each request is completed, and then initiate the next request.

:::
