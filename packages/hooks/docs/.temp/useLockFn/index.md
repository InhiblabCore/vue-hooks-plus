---
map:
  path: /useLockFn
  realPath: src/useLockFn/index.md
---

# useLockFn

给异步函数加竞争锁的 Hook

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="在 submit 函数执行完成前，其余的点击动作都会被忽略。场景：对于表单提交可以限制其多次提交">
</demo>
