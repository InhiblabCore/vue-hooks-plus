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

## API

```typescript
const event = useEventEmitter<T>();

```

### Params

| 参数            | 说明             | 类型                                   |默认值                                 |
| --------------- | ---------------- | -------------------------------------- |-------------------------------------- |
| global            | 是否为全局 | `boolean`                     | `false` |


### Result

| 参数            | 说明             | 类型                                   |
| --------------- | ---------------- | -------------------------------------- |
| emit            | 发送一个事件通知 | `(eventName?:string,val: T) => void`                     |
| useSubscription | 订阅事件         | `(eventName?:string,callback: (val: T) => void) => void` |
