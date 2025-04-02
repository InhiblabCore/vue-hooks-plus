---
map:
  # 映射到docs的路径
  path: /useSetState
---

# useSetState

Manage object type responsive Hooks, supporting deconstructing assignments and facilitating maintenance.

## Code demonstration

<demo src="useSetState/demo.vue"
  language="vue"
  title="Basic usage"
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
