---
map:
  # 映射到docs的路径
  path: /useMouse
---

# useMouse

优雅监听鼠标位置的 Hook。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="监听鼠标位置">
</demo>

### 获取鼠标相对于元素的位置

<demo src="./demo/demo1.vue"
  language="vue"
  title="获取鼠标相对于元素的位置"
  desc="通过传入目标元素，可以获取鼠标相对于元素的位置">
</demo>


## API

```typescript
const state: {
  screenX: number,
  screenY: number,
  clientX: number,
  clientY: number,
  pageX: number,
  pageY: number,
  elementX: number,
  elementY: number,
  elementH: number,
  elementW: number,
  elementPosX: number,
  elementPosY: number,
} = useMouse(target?: Target);
```

### Params

| 参数   | 说明             | 类型                                                        |
| ------ | ---------------- | ----------------------------------------------------------- |
| target | DOM 节点或者 Ref | `Element` \| `() => Element` \| `JSX.Element` |

### Result

| 参数        | 说明                           | 类型     |
| ----------- | ------------------------------ | -------- |
| screenX     | 距离显示器左侧的距离           | `number` |
| screenY     | 距离显示器顶部的距离           | `number` |
| clientX     | 距离当前视窗左侧的距离         | `number` |
| clientY     | 距离当前视窗顶部的距离         | `number` |
| pageX       | 距离完整页面左侧的距离         | `number` |
| pageY       | 距离完整页面顶部的距离         | `number` |
| elementX    | 距离指定元素左侧的距离         | `number` |
| elementY    | 距离指定元素顶部的距离         | `number` |
| elementH    | 指定元素的高                   | `number` |
| elementW    | 指定元素的宽                   | `number` |
| elementPosX | 指定元素距离完整页面左侧的距离 | `number` |
| elementPosY | 指定元素距离完整页面顶部的距离 | `number` |
