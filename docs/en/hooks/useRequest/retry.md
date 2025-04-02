---
map:
  # 映射到docs的路径
  path: /useRequest/retry/
---

# Error Retry

By setting `options.retryCount`, set the number of error retries, useRequest will retry after it fails.

## Code demonstration

<demo src="request-retry/demo.vue"
  language="vue"
  title=""
  desc="Request error retries three times, plus the first request fails, so the last is four errors"> </demo>

## API

### Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| retryCount | The number of retries. If set to `-1`, it will try again indefinitely. | `number` | - |
| retryInterval | <ul><li>Retry interval in milliseconds.</li><li>If not set, the simple exponential backoff algorithm will be used by default, taking `1000 * 2 ** retryCount`, that is, waiting for 2s for the first retry, and 4s for the second retry. By analogy, if it is greater than 30s, take 30s</li></ul> | `number` | - |

:::warning Remark

- `cancel` can cancel the ongoing retry behavior.

:::
