---
map:
  # 映射到docs的路径
  path: /useHover
---

# useHover

监听 DOM 元素是否有鼠标悬停。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="使用 ref 设置需要监听的元素。"> </demo>

## API

```javascript
const isHovering = useHover(target, {
  onEnter,
  onLeave,
  onChange,
})
```

## Params

| 参数    | 说明                  | 类型                                          | 默认值 |
| ------- | --------------------- | --------------------------------------------- | ------ |
| target  | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `JSX.Element` | -      |
| options | 额外的配置项          | `Options`                                     | -      |

## Options

| 参数     | 说明                 | 类型                            | 默认值 |
| -------- | -------------------- | ------------------------------- | ------ |
| onEnter  | hover 时触发         | `() => void`                    | -      |
| onLeave  | 取消 hover 时触发    | `() => void`                    | -      |
| onChange | hover 状态变化时触发 | `(isHovering: boolean) => void` | -      |

## Result

| 参数       | 说明                   | 类型                     |
| ---------- | ---------------------- | ------------------------ |
| isHovering | 鼠标元素是否处于 hover | `Readonly<Ref<boolean>>` |
