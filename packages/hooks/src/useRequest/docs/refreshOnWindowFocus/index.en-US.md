---
map:
  # 映射到docs的路径
  path: /useRequest/refreshOnWindowFocus/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useRefreshOnWindowFocusPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/refreshOnWindowFocus/demo/demo.vue
---

# RefreshOnWindowFocus

By setting `options.refreshOnWindowFocus`, the request will be refreshed when the browser is `refocus` and `revisible`.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="ou can click outside the browser, and then click the current page to experience the effect (or hide the current page and redisplay). If the interval from the previous request is greater than 5000ms, it will be requested again."> </demo>

## API

### Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| refreshOnWindowFocus | Whether to re-initiate the request when the screen refocus or revisible. | `boolean`\|`Ref<boolean>` | `false` |
| focusTimespan | Re-request interval, in milliseconds | `number`\| `Ref<number>` | `5000` |

:::warning Remark

- `options.refreshOnWindowFocus`、`options.focusTimespan` support dynamic changes.。
- Listen for browser events `visibilitychange` and `focus`.

:::
