---
map:
  # 映射到docs的路径
  path: /useDebounceFn
---

# useDebounceFn

A hook that deal with the debounced function.

## Code demonstration

<demo src="useDebounceFn/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Frequent calls run, but the function is executed only after all the clicks have completed 1000ms."> </demo>

## API

```typescript
const {
  run,
  cancel,
  flush
} = useDebounceFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

## Params

| Property | Description                        | Type                      | Default |
| -------- | ---------------------------------- | ------------------------- | ------- |
| fn       | The function to debounce.          | `(...args: any[]) => any` | -       |
| options  | Config for the debounce behaviors. | `Options`                 | -       |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| wait | The number of milliseconds to delay. | `number` | `1000` |
| leading | Specify invoking on the leading edge of the timeout. | `boolean` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true` |
| maxWait | The maximum time func is allowed to be delayed before it’s invoked. | `number` | - |

## Result

| Property | Description                                            | Type                      |
| -------- | ------------------------------------------------------ | ------------------------- |
| run      | Invode and pass parameters to fn.                      | `(...args: any[]) => any` |
| cancel   | Cancel the invocation of currently debounced function. | `() => void`              |
| flush    | Immediately invoke currently debounced function.       | `() => void`              |
