---
map:
  path: /useRequest/throttle/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useThrottlePlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/throttle/demo/demo.vue
---

# Throttle

`useRequest` It provides a `options.throttleWait` parameter into throttling mode, and if the `run` or the `runAsync` is frequently triggered, the request is made by throttling policy.

## Basic usage

<demo src="request-throttle/demo.vue"
  language="vue"
  title=""
  desc="You can quickly enter text in the input box below to experience the effect"> </demo>

## Options

The usage and effects of all throttle property are the same as [lodash-es.throttle](https://www.lodash-esjs.com/docs/lodash-es.throttle/)

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| throttleWait | Throttle wait time, in milliseconds. After setting, enter the throttle mode | `number` | - |
| throttleLeading | Execute the request before throttling starts | `boolean`\|`Ref<boolean>` | `true` |
| throttleTrailing | Execute the request after throttling ends | `boolean`\|`Ref<boolean>` | `true` |

:::warning Remark

- `options.throttleWait` support dynamic changes.
- `options.throttleLeading` support dynamic changes.
- `options.throttleTrailing` support dynamic changes.
- `runAsync` will return a `Promise` when it is actually executed. When it is not executed, there will be no return.
- `cancel` can abort a function waiting to be executed.

:::
