---
map:
  # 映射到docs的路径
  path: /useDebounce
---

# useDebounce

处理防抖值的 Hook。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="debouncedValue 只会在输入结束 500ms 后变化。"> </demo>

## API

```typescript
const debouncedValue = useDebounce(
  value: any,
  options?: Options
);
```

## Params

| 参数    | 说明           | 类型       | 默认值 |
| ------- | -------------- | ---------- | ------ |
| value   | 需要防抖的值   | `Ref<any>` | -      |
| options | 配置防抖的行为 | `Options`  | -      |

## Options

| 参数     | 说明                     | 类型      | 默认值  |
| -------- | ------------------------ | --------- | ------- |
| wait     | 超时时间，单位为毫秒     | `number`  | `1000`  |
| leading  | 是否在延迟开始前调用函数 | `boolean` | `false` |
| trailing | 是否在延迟开始后调用函数 | `boolean` | `true`  |
| maxWait  | 最大等待时间，单位为毫秒 | `number`  | -       |
