---
map:
  # 映射到docs的路径
  path: /useLockFn
---

# useLockFn

Add lock to an async function to prevent parallel executions.

## Code demonstration

<demo src="useLockFn/demo.vue"
  language="vue"
  title="Basic usge,Prevent duplicated submits"
  desc="Before the submit function finishes, the other click actions will be ignored."> </demo>

## API

```typescript
function useLockFn<P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
): fn: (...args: P) => Promise<V | undefined>;
```

## Result

| Property | Description                  | Type                               |
| -------- | ---------------------------- | ---------------------------------- |
| fn       | The async function with lock | `(...args: any[]) => Promise<any>` |

## Params

| Property | Description       | Type                               | Default |
| -------- | ----------------- | ---------------------------------- | ------- |
| fn       | An async function | `(...args: any[]) => Promise<any>` | -       |
