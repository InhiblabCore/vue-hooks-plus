---
map:
  # 映射到docs的路径
  path: /useRequest/loadingDelay/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useLoadingDelayPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/loadingDelay/demo/demo.vue
---

# Loading Delay

By setting `options.loadingDelay`, you can delay the time when `loading` turns to `true`, effectively prevent UI flashing.

## Code demonstration

### Basic usage

If you hit run quickly, the data without loadingDelay will flash.

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="effectively prevent UI flashing"> </demo>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| loadingDelay | Set the delay time for `loading` to become `true` | `number` \| `Ref<number>` | `0` |

## Remark

`options.loadingDelay` supports dynamic changes.
