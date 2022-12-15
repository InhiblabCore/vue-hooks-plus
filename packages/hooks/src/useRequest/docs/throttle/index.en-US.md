---
map:
  path: /useRequest/throttle/
---

# Throttle

`useRequest` It provides a `options.throttleWait` parameter into throttling mode, and if the `run` or the `runAsync` is frequently triggered, the request is made by throttling policy.

## Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="You can quickly enter text in the input box below to experience the effect"> </demo>

## Options

The usage and effects of all throttle property are the same as [lodash.throttle](https://www.lodashjs.com/docs/lodash.throttle/)

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| throttleWait | Throttle wait time, in milliseconds. After setting, enter the throttle mode | `number` | - |
| throttleLeading | Execute the request before throttling starts | `boolean`\|`Ref<boolean>` | `true` |
| throttleTrailing | Execute the request after throttling ends | `boolean`\|`Ref<boolean>` | `true` |

## Remark

- `options.throttleWait` support dynamic changes.
- `options.throttleLeading` support dynamic changes.
- `options.throttleTrailing` support dynamic changes.
- `runAsync` will return a `Promise` when it is actually executed. When it is not executed, there will be no return.
- `cancel` can abort a function waiting to be executed.
