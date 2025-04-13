---
map:
  # 映射到docs的路径
  path: /useThrottle
---

# useThrottle

A hook that deal with the throttled value.

## Code demonstration

<demo src="useThrottle/demo.vue"
  language="vue"
  title="Default usage"
  desc="ThrottledValue will change every 500ms."> </demo>

## API

```typescript
const throttledValue = useThrottle(
  value: any,
  options?: Options
);
```

## Params

| Property | Description                        | Type       | Default |
| -------- | ---------------------------------- | ---------- | ------- |
| value    | The value to throttle.             | `Ref<any>` | -       |
| options  | Config for the throttle behaviors. | `Options`  | -       |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| wait | The number of milliseconds to delay. | `number`\|`Ref<number>` | `1000` |
| leading | Specify invoking on the leading edge of the timeout. | `boolean`\|`Ref<boolean>` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean`\|`Ref<boolean>` | `true` |

::: warning Remark

- `options.wait` support dynamic changes.
- `options.leading` support dynamic changes.
- `options.trailing` support dynamic changes.

:::
