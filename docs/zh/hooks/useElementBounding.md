---
map:
  # 映射到docs的路径
  path: /useElementBounding
---

# useElementBounding

动态获取 Dom 元素的尺寸、坐标。

## 代码演示

<demo src="useElementBounding/demo.vue"
  language="vue"
  title="基本用法"
  desc="使用 ref 设置需要监听的元素。"> </demo>

## API

```typescript
const isHovering = useHover(target, {
  reset?: boolean
  windowResize?: boolean
  windowScroll?: boolean
  immediate?: boolean
})
```

## Params

| 参数    | 说明                  | 类型                                          | 默认值 |
| ------- | --------------------- | --------------------------------------------- | ------ |
| target  | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `JSX.Element` | -      |
| options | 额外的配置项          | `UseElementBoundingOptions`                   | -      |

## Options

| 参数         | 说明                               | 类型      | 默认值 |
| ------------ | ---------------------------------- | --------- | ------ |
| reset        | 当组件为挂载时，将所有值初始化为 0 | `boolean` | true   |
| windowResize | 监听窗口尺寸变化                   | `boolean` | true   |
| windowScroll | 监听窗口滚动变化                   | `boolean` | true   |
| immediate    | 组件挂载时立即执行                 | `boolean` | true   |
