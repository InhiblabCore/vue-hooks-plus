---
map:
  # 映射到docs的路径
  path: /useLockFn
---

# useLockFn

给异步函数加竞争锁的 Hook

## 代码演示

<demo src="useLockFn/demo.vue"
  language="vue"
  title="基本用法"
  desc="在 submit 函数执行完成前，其余的点击动作都会被忽略。场景：对于表单提交可以限制其多次提交"> </demo>

## API

```typescript
function useLockFn<P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
): fn: (...args: P) => Promise<V | undefined>;
```

## Result

| 参数 | 说明               | 类型                               |
| ---- | ------------------ | ---------------------------------- |
| fn   | 增加了竞态锁的函数 | `(...args: any[]) => Promise<any>` |

## Params

| 参数 | 说明                 | 类型                               | 默认值 |
| ---- | -------------------- | ---------------------------------- | ------ |
| fn   | 需要增加竞态锁的函数 | `(...args: any[]) => Promise<any>` | -      |
