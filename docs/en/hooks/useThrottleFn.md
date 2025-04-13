---
map:
  # 映射到docs的路径
  path: /useThrottleFn
---

# useThrottleFn

A hook that deal with the throttled function.

## Code demonstration

<demo src="useThrottleFn/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Frequent calls run, but the function is only executed every 1000ms."> </demo>

## API

```typescript
const {
  run,
  cancel,
  flush
} = useThrottleFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

## Params

| Property | Description                       | Type                      | Default |
| -------- | --------------------------------- | ------------------------- | ------- |
| fn       | The function to throttle.         | `(...args: any[]) => any` | -       |
| options  | Config for the throttle behaviors | `Options`                 | -       |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| wait | The number of milliseconds to delay. | `number`\|`Ref<number>` | `1000` |
| leading | Specify invoking on the leading edge of the timeout. | `boolean`\|`Ref<boolean>` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean`\|`Ref<boolean>` | `true` |

## Result

| Property | Description                                            | Type                      |
| -------- | ------------------------------------------------------ | ------------------------- |
| run      | Invoke and pass parameters to fn.                      | `(...args: any[]) => any` |
| cancel   | Cancel the invocation of currently throttled function. | `() => void`              |
| flush    | Immediately invoke currently throttled function        | `() => void`              |

::: warning Remark

- `options.wait` support dynamic changes.
- `options.leading` support dynamic changes.
- `options.trailing` support dynamic changes.

:::
