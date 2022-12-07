---
map:
  # 映射到docs的路径
  path: /useTrackedEffect
---

# useTrackedEffect

Tracking which dependence changes.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Console to view the print results"> </demo>

## API

```typescript
useTrackedEffect(
  effect: (changes: [], previousDeps: [], currentDeps: []) => (void | (() => void | undefined)),
  deps?: deps,
)
```
