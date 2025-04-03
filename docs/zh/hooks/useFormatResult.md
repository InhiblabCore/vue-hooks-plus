---
map:
  # 映射到docs的路径
  path: /useFormatResult
---

# useFormatResult

格式化数据的 hook。

## 代码演示

<demo src="useFormatResult/demo.vue"
  language="vue"
  title="基本用法"
  desc="格式化数据"> </demo>

## API

```typescript
const formatData = useFormatResult(data, callback)
```

## Argument

| 参数     | 说明             | 类型                     | 默认值 |
| -------- | ---------------- | ------------------------ | ------ |
| data     | 需要格式化的数据 | `TData` \| `Ref<TData>`  | -      |
| callback | 格式化函数       | `(data: TData) => FData` | -      |

## Result

| 参数       | 说明           | 类型                            |
| ---------- | -------------- | ------------------------------- |
| formatData | 格式化后的数据 | `ComputedRef<FData>` \| `FData` |
