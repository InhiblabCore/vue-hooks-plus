---
map:
  path: /useTimeout
  realPath: src/useTimeout/index.md
---

# useTimeout

处理 setTimeout 的 Hook。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="2000ms后开始执行">
</demo>

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: number | null
): fn: () => void;
```

### Params

| 参数  | 说明                                                                       | 类型                    |
| ----- | -------------------------------------------------------------------------- | ----------------------- |
| fn    | 待执行函数                                                                 | `() => void`            |
| delay | 定时时间（单位为毫秒）,支持动态变化，，当取值为 `undefined` 时会停止计时器 | `number` \| `undefined` |

### Result

| 参数         | 说明       | 类型         |
| ------------ | ---------- | ------------ |
| clearTimeout | 清除定时器 | `() => void` |
