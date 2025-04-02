---
map:
  # 映射到docs的路径
  path: /useThrottle
---

# useThrottle

处理节流值的 Hook。

## 代码演示

<demo src="useThrottle/demo.vue"
  language="vue"
  title="基本用法"
  desc="throttledValue 每隔 500ms 变化一次。"> </demo>

## API

```typescript
const throttledValue = useThrottle(
  value: any,
  options?: Options
);
```

## Params

| 参数    | 说明           | 类型       | 默认值 |
| ------- | -------------- | ---------- | ------ |
| value   | 需要节流的值   | `Ref<any>` | -      |
| options | 配置节流的行为 | `Options`  | -      |

## Options

| 参数     | 说明                     | 类型      | 默认值 |
| -------- | ------------------------ | --------- | ------ |
| wait     | 等待时间，单位为毫秒     | `number`  | `1000` |
| leading  | 是否在延迟开始前调用函数 | `boolean` | `true` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `true` |
