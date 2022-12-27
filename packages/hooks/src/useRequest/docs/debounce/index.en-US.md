---
map:
  # Path mapped to docs
  path: /useRequest/debounce/
---

# Debounce

Enter the debounce mode by setting `options.debounceWait`. At this time, if `run` or `runAsync` is triggered frequently, the request will be executed with the debounce strategy.

## Code demonstration

<demo src="./demo/demo.vue" language="vue" 
title="" 
desc="Quickly enter the text in the input box, trigger the run frequently, and will only wait for 1000ms after the last trigger ends
"> </demo>

## Options

The usage and effect of all debounce property are the same as [lodash.debounce](https://www.lodashjs.com/docs/lodash.debounce/)

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| debounceWait | Debounce delay time, in milliseconds. After setting, enter the debounce mode | `number` | - |
| debounceLeading | Execute the request before the delay starts | `boolean`\|`Ref<boolean>` | `false` |
| debounceTrailing | Execute the request after the delay ends | `boolean`\|`Ref<boolean>` | `true` |
| debounceMaxWait | The maximum time request is allowed to be delayed before it’s executed | `number`\|`Ref<number>` | - |

::: warning Remark

- `options.debounceLeading` support dynamic changes.
- `options.debounceTrailing` support dynamic changes.
- `options.debounceMaxWait` support dynamic changes.
- `runAsync` will return a `Promise` when it is actually executed. When it is not executed, there will be no return.
- `cancel` can abort a function waiting to be executed.

:::
