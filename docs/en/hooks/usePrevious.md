---
map:
  # 映射到docs的路径
  path: /usePrevious
---

# usePrevious

A Hook to return the previous state.

## Basic usage

<demo src="usePrevious/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Record the previous value"> </demo>

## Custom shouldUpdate function

<demo src="usePrevious/demo1.vue"
  language="vue"
  title="Custom shouldUpdate function"
  desc="Previous value update only when the shouldUpdate function return true"> </demo>

## Result

| Property    | Description        | Type               |
| ----------- | ------------------ | ------------------ |
| previousRef | The previous value | `Readonly<Ref<T>>` |

## Params

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| currentRef | The state that needs to be tracked | `Ref<T>` \| `ComputedRef<T>` | - |
| shouldUpdate | Optional. Customize whether the state value should be updated | `(prev: T \| undefined, next: T) => boolean` | `(a, b) => a !== b` |
