---
map:
  # 映射到docs的路径
  path: /useDebounce
---

# useDebounce

A hook that deal with the debounced value.

## Code demonstration

<demo src="useDebounce/demo.vue"
  language="vue"
  title="Default usage"
  desc="DebouncedValue will change after the input ends 500ms."> </demo>

## API

```typescript
const debouncedValue = useDebounce(
  value: any,
  options?: Options
);
```

## Params

| Property | Description                        | Type       | Default |
| -------- | ---------------------------------- | ---------- | ------- |
| value    | The value to debounce.             | `Ref<any>` | -       |
| options  | Config for the debounce behaviors. | `Options`  | -       |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| wait | The number of milliseconds to delay. | `number`\|`Ref<number>` | `1000` |
| leading | Specify invoking on the leading edge of the timeout. | `boolean`\|`Ref<boolean>` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean`\|`Ref<boolean>` | `true` |
| maxWait | The maximum time func is allowed to be delayed before it’s invoked. | `number`\|`Ref<number>` | - |

::: warning Remark

- `options.wait` support dynamic changes.
- `options.leading` support dynamic changes.
- `options.trailing` support dynamic changes.
- `options.maxWait` support dynamic changes.

:::
