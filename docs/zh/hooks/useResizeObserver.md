---
map:
  # 映射到docs的路径
  path: /useResizeObserver
---

# useResizeObserver

监听元素尺寸的变化。

## 代码演示

<demo src="useResizeObserver/demo.vue"
  language="vue"
  title="基本用法"
  desc="使用 ref 设置需要监听的元素。"> </demo>

## API

```typescript
useResizeObserver(target, callback, {
  box: ResizeObserverBoxOptions,
})
```

## Params

| 参数    | 说明                  | 类型                                          | 默认值 |
| ------- | --------------------- | --------------------------------------------- | ------ |
| target  | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `JSX.Element` | -      |
| options | 额外的配置项          | `UseResizeObserverOptions`                    | -      |

## Options

| 参数 | 说明       | 类型                       | 默认值      |
| ---- | ---------- | -------------------------- | ----------- |
| box  | 盒模型模式 | `ResizeObserverBoxOptions` | content-box |
