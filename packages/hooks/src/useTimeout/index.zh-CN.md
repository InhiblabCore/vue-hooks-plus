---
map:
  # 映射到docs的路径
  path: /useTimeout
---

# useTimeout

处理 setTimeout 的 Hook。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="2000ms后开始执行"> </demo>

## API

```typescript
useTimeout(
  fn: () => void,
  delay?: Ref<number | undefined> | number,
  options?:{
    immediate?: boolean
  }
): fn: () => void;
```

## Params

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| fn | 待执行函数 | `() => void` |
| delay | 定时时间（单位为毫秒）,支持动态变化，，当取值为 `undefined` 时会停止计时器 | `Ref<number` \| `undefined >`\|`number` \| `undefined` |
| immediate | 是否在首次立即执行 | `boolean` |

## Result

| 参数         | 说明       | 类型         |
| ------------ | ---------- | ------------ |
| clearTimeout | 清除定时器 | `() => void` |
