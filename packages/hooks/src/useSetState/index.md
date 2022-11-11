---
map:
  # 映射到docs的路径
  path: /useSetState
---

# useSetState

管理 object 类型 响应式 的 Hooks，支持解构赋值，更方便维护。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc=""> </demo>

## API

```typescript
const [state, setState] = useSetState<S extends Record<string, any>>
(initialState: StateType<S>)
:[
  [S] extends [Ref<any>] ? S : Ref<UnwrapRef<S>>,
   (patch: Record<string, any>) => void
 ]
```
