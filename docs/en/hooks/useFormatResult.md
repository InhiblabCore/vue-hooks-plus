---
map:
  # 映射到docs的路径
  path: /useFormatResult
---

# useFormatResult

Format the data of hook.

## Code demonstration

<demo src="useFormatResult/demo.vue"
  language="vue"
  title="Default usage"
  desc="format the data"> </demo>

## API

```typescript
const formatData = useFormatResult(data, callback)
```

## Argument

| Property | Description                     | Type                     | Default |
| -------- | ------------------------------- | ------------------------ | ------- |
| data     | Data that needs to be formatted | `TData`\｜`Ref<TData>`   | -       |
| callback | Formatt function                | `(data: TData) => FData` | -       |

## Result

| Property   | Description        | Type                            |
| ---------- | ------------------ | ------------------------------- |
| formatData | The formatted data | `ComputedRef<FData>` \| `FData` |
