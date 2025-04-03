---
map:
  # 映射到docs的路径
  path: /useTrackedEffect
---

# useTrackedEffect

追踪是哪个依赖发生变化。

## 代码演示

### 基础用法

<demo src="useTrackedEffect/demo.vue"
  language="vue"
  title="基本用法"
  desc="控制台查看打印结果">
</demo>

## API

```typescript
useTrackedEffect(
  effect: (changes: [], previousDeps: [], currentDeps: []) => (void | (() => void | undefined)),
  deps?: deps,
)
```
