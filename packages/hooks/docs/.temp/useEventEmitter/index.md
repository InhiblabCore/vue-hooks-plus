---
map:
  path: /useEventEmitter
  realPath: src/useEventEmitter/index.md
---

# useEventEmitter

优雅的进行多个组件之间进行事件通知。

> 在组件多次渲染时，每次渲染调用 `useEventEmitter` 得到的返回值会保持不变，不会重复创建 EventEmitter 的实例。
>
> 也可创建全局共享的实例。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="">
</demo>
